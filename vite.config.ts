import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Ścieżki względne – aplikacja działa pod dowolnym adresem (np. GitHub Pages /fiszki/).
  base: './',
  plugins: [
    react(),
    VitePWA({
      // Nowa wersja instaluje się w tle; aplikacja pokazuje pasek "Odśwież".
      registerType: 'prompt',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Fiszki – nauka słówek',
        short_name: 'Fiszki',
        description: 'Fiszki do nauki angielskich słówek z powtórkami rozłożonymi w czasie.',
        lang: 'pl',
        start_url: './',
        scope: './',
        display: 'standalone',
        background_color: '#f6f5f1',
        theme_color: '#2f6fdb',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png}'],
      },
    }),
  ],
});
