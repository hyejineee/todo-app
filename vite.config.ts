import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: [
          // 데코레이터 과련
          ['@babel/plugin-syntax-decorators', { legacy: true }],
          '@babel/plugin-syntax-class-properties',

          // emotion
          '@emotion/babel-plugin',
        ],
      },
    }),
    tsconfigPaths(),
  ],
});
