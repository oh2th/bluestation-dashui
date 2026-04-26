import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/status':      'http://localhost:3001',
      '/subscribers': 'http://localhost:3001',
      '/timeslots':   'http://localhost:3001',
      '/talkgroups':  'http://localhost:3001',
      '/control':     'http://localhost:3001',
    },
  },
});
