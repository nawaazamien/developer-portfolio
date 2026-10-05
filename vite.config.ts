import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/*
 * Public base path. Local dev and previews use "/". The GitHub Pages workflow
 * sets VITE_BASE_PATH (e.g. "/developer-portfolio/") from the Pages metadata,
 * so moving to a custom domain needs no code change: Pages then reports an
 * empty base path and the build falls back to "/".
 */
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [react()],
})
