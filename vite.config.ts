import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';

const BUILD_VERSION = `${process.env.GITHUB_RUN_NUMBER || 'local'}-${Date.now().toString(36)}`;

function masarikAutoUpdatePlugin(): Plugin {
  return {
    name: 'masarik-auto-update-plugin',
    configureServer(server) {
      server.middlewares.use('/version.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
        res.end(
          JSON.stringify({
            version: BUILD_VERSION,
            builtAt: new Date().toISOString(),
          })
        );
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: JSON.stringify(
          {
            version: BUILD_VERSION,
            builtAt: new Date().toISOString(),
          },
          null,
          2
        ),
      });

      const swPath = path.resolve(process.cwd(), 'public/sw.js');
      if (fs.existsSync(swPath)) {
        const swContent = fs
          .readFileSync(swPath, 'utf-8')
          .replace(
            "const CACHE_VERSION = 'masarik-cache-v1';",
            `const CACHE_VERSION = 'masarik-cache-${BUILD_VERSION}';`
          );
        this.emitFile({
          type: 'asset',
          fileName: 'sw.js',
          source: swContent,
        });
      }
    },
  };
}

// https://vitejs.dev
export default defineConfig({
  base: '/',
  define: {
    __APP_BUILD_VERSION__: JSON.stringify(BUILD_VERSION),
  },
  plugins: [react(), tailwindcss(), masarikAutoUpdatePlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
