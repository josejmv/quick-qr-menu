// types
import type { MetadataRoute } from 'next'

/**
 * This function returns the manifest for the app
 */
const manifest = (): MetadataRoute.Manifest => ({
  start_url: '/',
  name: 'QuickMenü',
  display: 'fullscreen',
  theme_color: '#000000',
  short_name: 'QuickMenü',
  background_color: '#000000',
  description: 'QuickMenü is a restaurant menu app',
  icons: [
    { sizes: '192x192', type: 'image/png', src: '/logo/icon-192x192.png' },
    { sizes: '256x256', type: 'image/png', src: '/logo/icon-256x256.png' },
    { sizes: '384x384', type: 'image/png', src: '/logo/icon-384x384.png' },
    { sizes: '512x512', type: 'image/png', src: '/logo/icon-512x512.png' },
  ],
})

export default manifest
