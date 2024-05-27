import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  build: { sourcemap: true },
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      pages: '/src/pages',
      assets: '/src/assets',
      // helpers: '/src/helpers',
      // services: '/src/services',
      // reduxState: '/src/redux',
    },
  },
  base: '/nanny-services/',
});
