import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    dir: resolve(__dirname, './tests'),
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
