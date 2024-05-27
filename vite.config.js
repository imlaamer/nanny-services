import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      assets: '/src/assets',
      // styles: '/src/assets/styles',
      pages: '/src/pages',
      components: '/src/components',
      service: '/src/services',
      base: '/nanny-services/',
      build: {
        rollupOptions: {
          external: ['@chatscope/chat-ui-kit-styles'],
        },
      },
    },
  },
});
