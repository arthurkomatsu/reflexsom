# PWA Icons

This directory should contain the PWA icons for the Reflex Som app.

## Required Icons

Generate these icons from your logo image (preferably starting with a 1024x1024 source):

### Standard Icons
- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-192x192.png`
- `icon-256x256.png`
- `icon-384x384.png`
- `icon-512x512.png`

### Maskable Icons (for Android adaptive icons)
- `icon-maskable-192x192.png`
- `icon-maskable-512x512.png`

## How to Generate Icons

### Option 1: Online Tools
- [Real Favicon Generator](https://realfavicongenerator.net/)
- [PWA Asset Generator](https://pwa-asset-generator.nicksheikh.com/)

### Option 2: Using Sharp (Node.js)
```bash
npm install sharp
```

```javascript
const sharp = require('sharp');

const sizes = [72, 96, 128, 144, 192, 256, 384, 512];

sizes.forEach(size => {
  sharp('logo-source.png')
    .resize(size, size)
    .toFile(`icon-${size}x${size}.png`);
});
```

### Maskable Icons Tips
For maskable icons, ensure your logo has padding (at least 10% on each side) to prevent clipping on different device shapes. The "safe zone" is the center 80% of the icon.

## Screenshots

The `screenshots` folder should contain:
- `screenshot-wide.png` (1280x720) - Desktop/tablet screenshot
- `screenshot-mobile.png` (720x1280) - Mobile screenshot

These are used when the PWA is installed and shown in app stores.
