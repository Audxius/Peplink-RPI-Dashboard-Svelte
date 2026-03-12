export const isClientOnline = (client: { active?: boolean }): boolean => Boolean(client?.active);

export const getClientStateLabel = (client: { state?: string | null; active?: boolean }): string =>
  client?.state ?? (client?.active ? 'online' : 'offline');
