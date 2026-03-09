export const getWanStatusKind = (wan) => {
  const statusText = String(wan?.status ?? '').toLowerCase();
  const statusLed = String(wan?.statusLed ?? '').toLowerCase();

  if (statusText.includes('connected') || statusLed === 'green') {
    return 'connected';
  }

  if (statusText.includes('disabled') || statusLed === 'gray' || wan?.enabled === false) {
    return 'disabled';
  }

  return 'pending';
};
