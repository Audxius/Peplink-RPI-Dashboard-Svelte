import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    proxy: {
      '^/api(?:/|$)': {
        target: 'https://192.168.50.1',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: 'localhost'
      }
    }
  }
});
