import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths';
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), flowbiteReact()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});