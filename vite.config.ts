import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        exportType: 'default',
        icon: true,
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: [...configDefaults.exclude, '**/e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.test.*',
        '**/*.spec.*',
        '**/.*', // hidden files
        '**/vite.config.*',
        '**/eslint.config.*',
        '**/tailwind.config.*',
        '**/vitest.workspace.*',
        '**/postcss.config.*',
        '**/storybook.config.*',
        '**/webpack.config.*',
        '**/tsconfig.*',
        '**/global.d.ts',
        '**/vite-env.d.ts',
        '**/*.stories.tsx'
      ],
    },
  },
});
