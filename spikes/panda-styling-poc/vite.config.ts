import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'styled-system': new URL('./styled-system', import.meta.url).pathname,
    },
  },
});
