import { get, writable } from 'svelte/store';
import { apiPost } from '$lib/api/ApiPostGet';
import { endpoints } from '$lib/api/endpoints';

export const username = writable('');
export const password = writable('');
export const error = writable('Invalid username or password');
export const showError = writable(false);

const login = async (user: string, pass: string): Promise<boolean> => {
  const data = await apiPost(endpoints.login, { username: user, password: pass }).catch(() => null);

  return Boolean(data && data.stat === 'ok');
};

export const authenticate = async (onSuccess: () => Promise<void>): Promise<boolean> => {
  showError.set(false);

  const ok = await login(get(username), get(password));

  if (!ok) {
    showError.set(true);
    return false;
  }

  await onSuccess();
  return true;
};
