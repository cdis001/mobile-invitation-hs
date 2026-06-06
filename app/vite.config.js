import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static, single-page invitation — no routing, no backend.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },
})
