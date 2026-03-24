import { goto } from '$app/navigation';

export function toggleTheme(): void {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

export function restoreTheme(): void {
  const theme = localStorage.getItem('theme');

  if (theme === 'light') {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }
}

export function logout(): Promise<void> {
  return goto('/login');
}
