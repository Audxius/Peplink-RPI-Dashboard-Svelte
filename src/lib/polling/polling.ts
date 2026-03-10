import { get, writable } from 'svelte/store';
import { apiGet } from '$lib/api/ApiPostGet';
import { endpoints } from '$lib/api/endpoints';
import { goto } from '$app/navigation';

export const apState = writable<boolean | null>(null);
export const clients = writable<any[]>([]);
export const lanProfiles = writable<any[]>([]);
export const wanConnections = writable<any[]>([]);
export const wanAllowances = writable<any[]>([]);

export const pollAccessControl = async () => {
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

  const parsed = order.flatMap((id) => {
    const profile = response[String(id)];
    return profile ? [{ id, ip: profile.ip ?? '-', mask: profile.mask ?? '-' }] : [];
  });

  lanProfiles.set(parsed);
};

export const pollWanConnections = async () => {
  const data = await apiGet(endpoints.wanConnection);
  const response = data?.response ?? {};
  const order: Array<string | number> = Array.isArray(response.order) ? response.order : [];

  const parsed = order.flatMap((id) => {
    const connection = response[String(id)];
    return connection
      ? [
          {
            id,
            name: connection.name ?? `WAN ${id}`,
            status: connection.message ?? '-',
            enabled: connection.enable ?? false,
            statusLed: connection.statusLed ?? '',
            ip: connection.ip ?? '-',
            type: connection.type ?? '-',
            uptime: connection.uptime ?? 0
          }
        ]
      : [];
  });

  wanConnections.set(parsed);
};

const getWanNameById = (wanId: string | number) => {
  const match = get(wanConnections).find((wan) => String(wan.id) === String(wanId));
  return match?.name ?? `WAN ${wanId}`;
};

export const pollWanAllowances = async () => {
  const data = await apiGet(endpoints.wanAllowance);
  const response = data?.response ?? {};
  const order: Array<string | number> = Array.isArray(response.order) ? response.order : [];

  const parsed = order.flatMap((wanId) => {
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
