export const isClientOnline = (client: any) => {
  const rawState = String(client?.state ?? '').toLowerCase();

  if (rawState) {
    if (
      rawState.includes('offline') ||
      rawState.includes('down') ||
      rawState.includes('disconnected')
    ) {
      return false;
    }

    if (rawState.includes('online') || rawState.includes('up') || rawState.includes('connected')) {
      return true;
    }
  }

  // Fallback: active clients usually have connection type and IP assigned.
  return Boolean(client?.connectionType && client?.ip);
};

export const getClientStateLabel = (client: any) => {
  if (client?.state) {
    return client.state;
  }

  return isClientOnline(client) ? 'online' : 'offline';
};
