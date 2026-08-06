import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'styled-system': path.resolve(__dirname, 'styled-system'),
    },
  },
  server: { port: 5174, open: true },
});
