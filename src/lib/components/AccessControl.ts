// Checks if the user it authenticated by attempting an API call, if it fails, they're redirected to the login page
import { apiGet } from '$lib/api/ApiPostGet';
import { goto } from '$app/navigation';
import { endpoints } from '$lib/api/endpoints';

export const accessControl = async () => {
  const data = await apiGet(endpoints.client);

  if (data.stat === 'fail') {
    await goto('/login');
  }
};
