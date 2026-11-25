import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build:single` збирає весь застосунок в один index.html
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: {
    outDir: mode === 'single' ? 'dist-single' : 'dist',
    // в однофайловій збірці шрифти вбудовуються прямо в HTML
    ...(mode === 'single' ? { assetsInlineLimit: 100_000_000 } : {}),
  },
}));
