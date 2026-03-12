type WanStatus = 'connected' | 'disabled' | 'pending';

export const getWanStatusKind = (wan: {
  status?: string | null;
  enabled?: boolean;
}): WanStatus => {
  const statusText = (wan.status || '').toLowerCase();

  if (statusText.includes('connected')) {
    return 'connected';
  }

  if (statusText.includes('disabled') || wan.enabled === false) {
    return 'disabled';
  }

  return 'pending';
};
