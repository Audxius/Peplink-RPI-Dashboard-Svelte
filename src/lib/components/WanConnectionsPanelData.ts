import type { WanConnection } from '$lib/polling/polling';

type WanStatus = 'connected' | 'disabled' | 'pending';

export const getWanStatusKind = (wan: WanConnection): WanStatus => {
  const statusText = (wan.status || '').toLowerCase();

  if (statusText.includes('connected')) {
    return 'connected';
  }

  if (statusText.includes('disabled') || wan.enabled === false) {
    return 'disabled';
  }

  return 'pending';
};
