import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static, single-page invitation — no routing, no backend.
// GitHub Pages serves a project site under /<repo>/, so the production build
// needs that base path. Local dev (and other root-served hosts) stay at '/'.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/mobile-invitation-hs/' : '/',
  server: { port: 5173, open: true },
}))
