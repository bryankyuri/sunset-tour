import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

// Read icons from the icons.json file
const iconsJsonPath = path.resolve(__dirname, 'public/Logo/icons.json');
const iconsData = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf8'));

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'Logo.png'],
      manifest: {
        name: 'Sunset Tour',
        short_name: 'Sunset Tour',
        description: 'Explore beautiful sunset tours around the world',
        theme_color: '#fab978',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          // Add selected important icons for PWA
          {
            src: 'Logo/android/android-launchericon-192-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'Logo/android/android-launchericon-512-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'Logo/android/android-launchericon-512-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'Logo/ios/180.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'apple touch icon'
          }
        ]
      },
      // Enable in development but with no-caching strategy
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html'
      },
      // Configure workbox to handle caching strategies
      workbox: {
        // Development mode: avoid caching during development
        clientsClaim: true,
        skipWaiting: true,
        // Disable navigation preload in development
        navigationPreload: false,
        // Force update on page reload
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        // Custom runtime caching configuration
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images.unsplash.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'external-images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60 // 24 hours
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'js-css-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 // 1 hour
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
});