import { apiGet } from '$lib/api/ApiPostGet';
import { endpoints } from '$lib/api/endpoints';

const retryIntervalMs = 3000;

type RestartResponse = {
  stat?: unknown;
  response?: unknown;
  message?: unknown;
};

const isTimeoutResponse = (data: RestartResponse): boolean => {
  const stat = String(data.stat ?? '').toLowerCase();
  const responseText = String(data.response ?? '').toLowerCase();
  const messageText = String(data.message ?? '').toLowerCase();

  // During reboot the router can still answer HTTP requests with timeout-style
  // payloads, so we treat those as "still restarting" instead of "recovered".
  return stat === 'fail' && (responseText.includes('timeout') || messageText.includes('timeout'));
};

export const startRestartWatcher = (onRecovered: () => Promise<void> | void): (() => void) => {
  let sawRouterDown = false;

  const checkRouterReady = async () => {
    const data = (await apiGet(endpoints.client).catch(() => null)) as RestartResponse | null;

    if (!data || isTimeoutResponse(data)) {
      sawRouterDown = true;
      return;
    }

    // Redirect only after we have seen the router disappear once; otherwise a
    // fast response on first load would incorrectly count as a completed reboot.
    if (sawRouterDown) {
      clearInterval(intervalId);
      await onRecovered();
    }
  };

  const intervalId = setInterval(() => {
    void checkRouterReady();
  }, retryIntervalMs);

  void checkRouterReady();

  return () => clearInterval(intervalId);
};
