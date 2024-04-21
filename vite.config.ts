import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from "vite-plugin-eslint";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint({ exclude: ['/virtual: /**', 'node_modules/**'] })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './app/utils/test/setupTests.js'
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, 'src')  }]
  }
})
