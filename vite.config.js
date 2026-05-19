import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || '/benable-creator-prototype-v1/',
  server: { host: '127.0.0.1', port: 5188 },
});
