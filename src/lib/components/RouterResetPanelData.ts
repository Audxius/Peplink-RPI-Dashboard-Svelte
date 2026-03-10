import { apiPost } from '$lib/api/ApiPostGet';
import { endpoints } from '$lib/api/endpoints';
import { goto } from '$app/navigation';

export const Reset = async () => {
  if (!confirm('Are you sure you want to reset the router?')) return;

  await apiPost(endpoints.reset, {}).catch(() => null);
  await goto('/restarting');
};
