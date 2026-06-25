import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// Dedicated build for the Saltmarsh hero — a SEPARATE product from tide-now,
// published at its own GitHub Pages subpath (/greenfield-design-target/saltmarsh/).
// It needs its own --base, which differs from tide-now's, so it MUST be a separate
// Vite build (Vite's base is per-build). This mirrors how tide-now and Foxglove are
// each staged into their own subpath on the one unified Pages deploy.
// Entry: web/saltmarsh.html -> web/src/saltmarsh/main.jsx (mounts SaltmarshHero).
// The CI deploy stages dist-saltmarsh/saltmarsh.html as _pages/saltmarsh/index.html.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-saltmarsh',
    emptyOutDir: true,
    rollupOptions: {
      input: fileURLToPath(new URL('./saltmarsh.html', import.meta.url)),
    },
  },
})
