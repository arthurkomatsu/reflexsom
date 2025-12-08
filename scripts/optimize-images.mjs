#!/usr/bin/env node

/**
 * Image Optimization Script
 * Optimizes images in public/assets folder:
 * - Converts large PNGs to optimized WebP
 * - Optimizes JPEGs with quality reduction
 * - Generates WebP versions of all images
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '..', 'public', 'assets');

// Configuration
const JPEG_QUALITY = 80; // Good balance between quality and size
const WEBP_QUALITY = 80;
const MAX_WIDTH = 1920; // Max width for images

async function getFileSize(filePath) {
  const stats = await fs.stat(filePath);
  return stats.size;
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const dir = path.dirname(filePath);
  
  const originalSize = await getFileSize(filePath);
  console.log(`\nProcessing: ${path.basename(filePath)} (${formatBytes(originalSize)})`);
  
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Resize if too large
    const needsResize = metadata.width > MAX_WIDTH;
    
    if (ext === '.png') {
      // For PNGs, convert to WebP and also optimize the PNG
      const webpPath = path.join(dir, `${baseName}.webp`);
      const optimizedPngPath = path.join(dir, `${baseName}-optimized.png`);
      
      // Create WebP version (much smaller)
      let pipeline = sharp(filePath);
      if (needsResize) {
        pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
      }
      await pipeline
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpPath);
      
      const webpSize = await getFileSize(webpPath);
      console.log(`  → WebP: ${formatBytes(webpSize)} (${((1 - webpSize/originalSize) * 100).toFixed(1)}% smaller)`);
      
      // Also create optimized PNG (for fallback)
      pipeline = sharp(filePath);
      if (needsResize) {
        pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
      }
      await pipeline
        .png({ 
          quality: 80,
          compressionLevel: 9,
          palette: true 
        })
        .toFile(optimizedPngPath);
      
      const optPngSize = await getFileSize(optimizedPngPath);
      
      // Replace original with optimized version if smaller
      if (optPngSize < originalSize) {
        await fs.unlink(filePath);
        await fs.rename(optimizedPngPath, filePath);
        console.log(`  → PNG optimized: ${formatBytes(optPngSize)} (${((1 - optPngSize/originalSize) * 100).toFixed(1)}% smaller)`);
      } else {
        await fs.unlink(optimizedPngPath);
        console.log(`  → PNG already optimal`);
      }
      
    } else if (ext === '.jpg' || ext === '.jpeg') {
      // For JPEGs, optimize in place and create WebP
      const webpPath = path.join(dir, `${baseName}.webp`);
      const optimizedPath = path.join(dir, `${baseName}-optimized.jpg`);
      
      // Create WebP version
      let pipeline = sharp(filePath);
      if (needsResize) {
        pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
      }
      await pipeline
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpPath);
      
      const webpSize = await getFileSize(webpPath);
      console.log(`  → WebP: ${formatBytes(webpSize)} (${((1 - webpSize/originalSize) * 100).toFixed(1)}% smaller)`);
      
      // Optimize JPEG
      pipeline = sharp(filePath);
      if (needsResize) {
        pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
      }
      await pipeline
        .jpeg({ 
          quality: JPEG_QUALITY,
          progressive: true,
          mozjpeg: true 
        })
        .toFile(optimizedPath);
      
      const optSize = await getFileSize(optimizedPath);
      
      // Replace original with optimized version if smaller
      if (optSize < originalSize) {
        await fs.unlink(filePath);
        await fs.rename(optimizedPath, filePath);
        console.log(`  → JPEG optimized: ${formatBytes(optSize)} (${((1 - optSize/originalSize) * 100).toFixed(1)}% smaller)`);
      } else {
        await fs.unlink(optimizedPath);
        console.log(`  → JPEG already optimal`);
      }
    }
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
  }
}

async function getAllImageFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllImageFiles(fullPath));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name) && !entry.name.includes('-optimized')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function main() {
  console.log('='.repeat(50));
  console.log('Image Optimization Script');
  console.log('='.repeat(50));
  
  const imageFiles = await getAllImageFiles(ASSETS_DIR);
  
  console.log(`\nFound ${imageFiles.length} images to optimize in ${ASSETS_DIR} (including subdirectories)\n`);
  
  // Calculate initial total size
  let initialTotal = 0;
  for (const file of imageFiles) {
    initialTotal += await getFileSize(file);
  }
  console.log(`Initial total size: ${formatBytes(initialTotal)}`);
  
  // Process each image
  for (const file of imageFiles) {
    await optimizeImage(file);
  }
  
  // Calculate final sizes (including subdirectories)
  async function getAllFinalImages(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...await getAllFinalImages(fullPath));
      } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
        files.push(fullPath);
      }
    }
    return files;
  }
  
  const allImages = await getAllFinalImages(ASSETS_DIR);
  
  let finalTotal = 0;
  for (const file of allImages) {
    finalTotal += await getFileSize(file);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('Summary');
  console.log('='.repeat(50));
  console.log(`Original images: ${formatBytes(initialTotal)}`);
  console.log(`Final (including WebP): ${formatBytes(finalTotal)}`);
  console.log(`\nWebP files created for modern browser support.`);
  console.log('Use <picture> element to serve WebP with fallback.\n');
}

main().catch(console.error);
