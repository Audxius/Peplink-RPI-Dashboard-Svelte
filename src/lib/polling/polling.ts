import { get, writable } from 'svelte/store';
import { apiGet } from '$lib/api/ApiPostGet';
import { endpoints } from '$lib/api/endpoints';

export const apState = writable<boolean | null>(null);
export const clients = writable<any[]>([]);
export const lanProfiles = writable<any[]>([]);
export const wanConnections = writable<any[]>([]);
export const wanAllowances = writable<any[]>([]);

// Gets AP state
export const pollApState = async () => {
  const data = await apiGet(endpoints.ap);
  apState.set(data?.response?.enable ?? null);
};

export const pollClients = async () => {
  const data = await apiGet(endpoints.client);
  clients.set(data?.response?.list ?? []);
};

// Gets LAN profiles
export const pollLanProfiles = async () => {
  const data = await apiGet(endpoints.lanProfile);
  const response = data?.response ?? {};
  const order: Array<string | number> = Array.isArray(response.order) ? response.order : [];

  const parsed = order
    .map((profileId) => {
      const profile = response[String(profileId)];

      if (!profile) {
        return null;
      }

      return {
        id: profileId,
        ip: profile.ip ?? '-',
        mask: profile.mask ?? '-'
      };
    })
    .filter(Boolean);

  lanProfiles.set(parsed);
};

// Gets WAN connections
export const pollWanConnections = async () => {
  const data = await apiGet(endpoints.wanConnection);
  const response = data?.response ?? {};
  const order: Array<string | number> = Array.isArray(response.order) ? response.order : [];

  const parsed = order
    .map((connectionId) => {
      const connection = response[String(connectionId)];

      if (!connection) {
        return null;
      }

      return {
        id: connectionId,
        name: connection.name ?? `WAN ${connectionId}`,
        status: connection.message ?? '-',
        enabled: connection.enable ?? false,
        statusLed: connection.statusLed ?? '',
        ip: connection.ip ?? '-',
        type: connection.type ?? '-',
        uptime: connection.uptime ?? 0
      };
    })
    .filter(Boolean);

  wanConnections.set(parsed);
};

const getWanNameById = (wanId: string | number) => {
  const match = get(wanConnections).find((wan) => String(wan.id) === String(wanId));
  return match?.name ?? `WAN ${wanId}`;
};

// Gets WAN allowance
export const pollWanAllowances = async () => {
  const data = await apiGet(endpoints.wanAllowance);
  const response = data?.response ?? {};
  const order: Array<string | number> = Array.isArray(response.order) ? response.order : [];
  const parsed = [];

  for (const wanId of order) {
    const entry = response[String(wanId)];

    if (!entry || typeof entry !== 'object') {
      continue;
    }

    if (typeof entry.enable === 'boolean') {
      parsed.push({
        wanId,
        wanName: getWanNameById(wanId),
        target: '-',
        enabled: entry.enable
      });
      continue;
    }

    for (const target of Object.keys(entry)) {
      const nested = entry[target];

      if (nested && typeof nested.enable === 'boolean') {
        parsed.push({
          wanId,
          wanName: getWanNameById(wanId),
          target: `SIM ${target}`,
          enabled: nested.enable
        });
      }
    }
  }

  wanAllowances.set(parsed);
};
