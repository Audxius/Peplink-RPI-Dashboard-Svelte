import { goto } from '$app/navigation';
import { get, writable } from 'svelte/store';
import { apiPost } from '$lib/api/ApiPostGet';
import { endpoints } from '$lib/api/endpoints';

export const username = writable('');
export const password = writable('');
export const error = writable('Invalid username or password');
export const showError = writable(false);

export const showPassword = writable(false);
export const showKeyboard = writable(false);
export const keyboardTarget = writable<'username' | 'password' | null>(null);
export const caps = writable(false);

export const keyboardKeys: string[][] = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['', 'Caps', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace', ''],
  ['', '', '', 'Space', '', '', '']
];

type Field = 'username' | 'password';

const login = async (user: string, pass: string): Promise<boolean> => {
  const data = await apiPost(endpoints.login, {
    username: user,
    password: pass
  }).catch(() => null);

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

export async function handleAuthenticate(): Promise<void> {
  await authenticate(() => goto('/'));
}

export function openKeyboard(target: Field): void {
  showKeyboard.set(true);
  keyboardTarget.set(target);
}

export function handleFocus(target: Field): void {
  openKeyboard(target);
}

export function closeKeyboard(): void {
  showKeyboard.set(false);
  keyboardTarget.set(null);
}

export function handleOutsideClick(event: MouseEvent): void {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const clickedKeyboard = target.closest('[data-login-surface="keyboard"]');
  const clickedField = target.closest('[data-login-field]');

  if (!clickedKeyboard && !clickedField) {
    closeKeyboard();
  }
}

export function toggleCaps(): void {
  caps.update((value) => !value);
}

export function resolveDisplayKey(key: string, isCaps: boolean): string {
  if (key === 'Caps') {
    return isCaps ? 'Caps On' : 'Caps';
  }

  if (isCaps && /^[a-z]$/i.test(key)) {
    return key.toUpperCase();
  }

  return key;
}

function updateFieldValue(store: typeof username | typeof password, key: string): void {
  const isCaps = get(caps);

  store.update((value) => {
    if (key === 'Backspace') return value.slice(0, -1);
    if (key === 'Space') return value + ' ';
    if (key === 'Caps') return value;

    const nextKey = isCaps && /^[a-z]$/i.test(key) ? key.toUpperCase() : key;
    return value + nextKey;
  });
}

export function handleKeyboardInput(key: string): void {
  const target = get(keyboardTarget);

  if (!target) return;

  if (key === 'Caps') {
    toggleCaps();
    return;
  }

  if (target === 'username') {
    updateFieldValue(username, key);
    return;
  }

  if (target === 'password') {
    updateFieldValue(password, key);
  }
}
