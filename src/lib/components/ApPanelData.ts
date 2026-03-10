import { get } from 'svelte/store';
import { apiPost } from '$lib/api/ApiPostGet';
import { endpoints } from '$lib/api/endpoints';
import { apState } from '$lib/polling/polling';

export const toggleApState = async () => {
  const newState = !Boolean(get(apState));
  await apiPost(endpoints.ap, { enable: newState });
  apState.set(newState);
};
