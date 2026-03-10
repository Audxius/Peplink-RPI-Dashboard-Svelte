type WanStatus = 'connected' | 'disabled' | 'pending';

type WanLike = {
  status?: string | null;
  statusLed?: string | null;
  enabled?: boolean;
};

export const getWanStatusKind = (wan: WanLike): WanStatus => {
  const statusText = (wan.status || '').toLowerCase();
  const statusLed = (wan.statusLed || '').toLowerCase();

  if (statusText.includes('connected') || statusLed === 'green') {
    return 'connected';
  }

  if (statusText.includes('disabled') || statusLed === 'gray' || wan?.enabled === false) {
    return 'disabled';
  }

  return 'pending';
};
