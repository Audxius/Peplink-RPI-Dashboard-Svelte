import type { RouterClient } from '$lib/polling/polling';

export const isClientOnline = (client: RouterClient): boolean => Boolean(client?.active);

export const getClientStateLabel = (client: RouterClient): string =>
  client?.state ?? (client?.active ? 'online' : 'offline');
