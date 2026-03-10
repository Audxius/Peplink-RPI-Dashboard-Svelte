type ClientLike = {
  state?: string | null;
  active?: boolean;
};

export const isClientOnline = (client: ClientLike): boolean => Boolean(client?.active);

export const getClientStateLabel = (client: ClientLike): string =>
  client?.state ?? (isClientOnline(client) ? 'online' : 'offline');
