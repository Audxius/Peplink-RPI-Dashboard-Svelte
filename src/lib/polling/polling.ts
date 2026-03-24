import { get, writable } from 'svelte/store';
import { apiGet } from '$lib/api/ApiPostGet';
import { endpoints } from '$lib/api/endpoints';
import { goto } from '$app/navigation';

export type RouterClient = {
  name?: string | null;
  active?: boolean;
  ip?: string | null;
  connectionType?: string | null;
  state?: string | null;
};

export type LanProfile = {
  id: string | number;
  ip: string;
  mask: string;
};

export type WanConnection = {
  id: string | number;
  name: string;
  status: string;
  enabled: boolean;
  ip: string;
  type: string;
  uptime: number;
};

export type WanAllowance = {
  wanId: string | number;
  wanName: string;
  target: string;
  enabled: boolean;
};

export const apState = writable<boolean | null>(null);
export const clients = writable<RouterClient[]>([]);
export const lanProfiles = writable<LanProfile[]>([]);
export const wanConnections = writable<WanConnection[]>([]);
export const wanAllowances = writable<WanAllowance[]>([]);

export const pollAccessControl = async () => {
  // The client status endpoint is available on every dashboard load, so it
  // doubles as a lightweight "session still valid?" check.
  const data = await apiGet(endpoints.client).catch(() => ({ stat: 'fail' }));

  if (data.stat === 'fail') {
    await goto('/login');
  }
};

export const pollApState = async () => {
  const data = await apiGet(endpoints.ap);
  apState.set(data?.response?.enable ?? null);
};

export const pollClients = async () => {
  const data = await apiGet(endpoints.client);
  clients.set(data?.response?.list ?? []);
};

export const pollLanProfiles = async () => {
  const data = await apiGet(endpoints.lanProfile);
  const response = data?.response ?? {};
  const order: Array<string | number> = Array.isArray(response.order) ? response.order : [];

  // Peplink returns LAN profiles as an object keyed by ID plus a separate
  // `order` array. We rebuild that into a render-friendly list here.
  const parsed: LanProfile[] = order.flatMap((id) => {
    const profile = response[String(id)];
    return profile ? [{ id, ip: profile.ip ?? '-', mask: profile.mask ?? '-' }] : [];
  });

  lanProfiles.set(parsed);
};

export const pollWanConnections = async () => {
  const data = await apiGet(endpoints.wanConnection);
  const response = data?.response ?? {};
  const order: Array<string | number> = Array.isArray(response.order) ? response.order : [];

  // WAN responses follow the same "lookup object + order array" pattern as LAN
  // profiles, so the dashboard normalizes them once before storing them.
  const parsed: WanConnection[] = order.flatMap((id) => {
    const connection = response[String(id)];
    return connection
      ? [
          {
            id,
            name: connection.name ?? `WAN ${id}`,
            status: connection.message ?? '-',
            enabled: connection.enable ?? false,
            ip: connection.ip ?? '-',
            type: connection.type ?? '-',
            uptime: connection.uptime ?? 0
          }
        ]
      : [];
  });

  wanConnections.set(parsed);
};

const getWanNameById = (wanId: string | number): string => {
  const match = get(wanConnections).find((wan) => String(wan.id) === String(wanId));
  return match?.name ?? `WAN ${wanId}`;
};

export const pollWanAllowances = async () => {
  const data = await apiGet(endpoints.wanAllowance);
  const response = data?.response ?? {};
  const order: Array<string | number> = Array.isArray(response.order) ? response.order : [];

  // Allowance data is inconsistent across WAN types: some entries expose a
  // single boolean, while cellular WANs can expose nested SIM targets.
  const parsed: WanAllowance[] = order.flatMap((wanId) => {
    const entry = response[String(wanId)];
    if (!entry || typeof entry !== 'object') return [];

    const wanName = getWanNameById(wanId);

    if (typeof entry.enable === 'boolean') {
      return [{ wanId, wanName, target: '-', enabled: entry.enable }];
    }

    return Object.keys(entry).flatMap((target) => {
      const nested = entry[target];
      return nested && typeof nested.enable === 'boolean'
        ? [{ wanId, wanName, target: `SIM ${target}`, enabled: nested.enable }]
        : [];
    });
  });

  wanAllowances.set(parsed);
};
