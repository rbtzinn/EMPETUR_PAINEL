import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('framer-motion')) {
            return 'vendor-motion'
          }
          if (id.includes('@tremor') || id.includes('@radix-ui') || id.includes('recharts')) {
            return 'vendor-ui'
          }
          if (id.includes('react-simple-maps') || id.includes('d3-geo')) {
            return 'vendor-maps'
          }
          if (id.includes('gsap')) {
            return 'vendor-gsap'
          }
          if (id.includes('jspdf') || id.includes('html-to-image') || id.includes('html2canvas')) {
            return 'vendor-pdf'
          }
        },
      },
    },
  },
})
