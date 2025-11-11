import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'src': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split heavy vendor libraries into separate chunks
          if (id.includes('node_modules')) {
            // Framer Motion - large animation library
            if (id.includes('framer-motion')) {
              return 'vendor-framer-motion';
            }
            // Three.js and related 3D libraries
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three';
            }
            // React router and related
            if (id.includes('react-router') || id.includes('react-router-dom')) {
              return 'vendor-router';
            }
            // Material UI (if used)
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'vendor-mui';
            }
            // Other large libraries
            if (id.includes('leaflet') || id.includes('react-leaflet')) {
              return 'vendor-maps';
            }
            if (id.includes('tsparticles') || id.includes('react-tsparticles')) {
              return 'vendor-particles';
            }
            // Default vendor chunk for remaining node_modules
            return 'vendor';
          }
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable source maps for better debugging (optional, can disable for production)
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'styled-components',
    ],
    exclude: [
      // Exclude heavy libraries from pre-bundling (they'll be code-split)
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },
})
