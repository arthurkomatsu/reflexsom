#!/usr/bin/env node

/**
 * Internal Links Validator
 * Checks that internal links in HTML files point to valid destinations
 */

import fs from 'fs';
import path from 'path';

let cheerio;
try {
    const cheerioModule = await import('cheerio');
    cheerio = cheerioModule.default || cheerioModule;
} catch {
    console.error('Error: cheerio is not installed.');
    console.error('Run: npm install cheerio');
    process.exit(1);
}

const DIST_DIR = path.join(process.cwd(), 'dist');

const results = {
    errors: [],
    warnings: [],
    passed: [],
};

function logError(message) {
    results.errors.push(message);
    console.error(`  ✗ ERROR: ${message}`);
}

function logWarning(message) {
    results.warnings.push(message);
    console.warn(`  ⚠ WARNING: ${message}`);
}

function logPass(message) {
    results.passed.push(message);
    console.log(`  ✓ ${message}`);
}

function findHtmlFiles(dir) {
    const files = [];
    if (!fs.existsSync(dir)) return files;

    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            files.push(...findHtmlFiles(fullPath));
        } else if (item.endsWith('.html')) {
            files.push(fullPath);
        }
    }
    return files;
}

function validateLinks() {
    console.log('🔍 Internal Links Validator\n');
    console.log('='.repeat(60));

    if (!fs.existsSync(DIST_DIR)) {
        console.log('\n⚠️  dist/ folder not found. Run "npm run build" first.');
        process.exit(0);
    }

    const htmlFiles = findHtmlFiles(DIST_DIR);
    console.log(`\nFound ${htmlFiles.length} HTML file(s) to check\n`);

    // Collect all existing files for validation
    const existingFiles = new Set();
    const collectFiles = (dir) => {
        if (!fs.existsSync(dir)) return;
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const relativePath = '/' + path.relative(DIST_DIR, fullPath);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                collectFiles(fullPath);
            } else {
                existingFiles.add(relativePath);
                existingFiles.add(relativePath.replace('/index.html', '/'));
                existingFiles.add(relativePath.replace('/index.html', ''));
            }
        }
    };
    collectFiles(DIST_DIR);

    let totalLinks = 0;
    let brokenLinks = 0;

    for (const htmlFile of htmlFiles) {
        const relativePath = path.relative(DIST_DIR, htmlFile);
        console.log(`📄 Checking: ${relativePath}`);

        const content = fs.readFileSync(htmlFile, 'utf-8');
        const $ = cheerio.load(content);

        $('a[href]').each((_, el) => {
            const href = $(el).attr('href');
            if (!href) return;

            // Skip external links, anchors, mailto, tel, javascript
            if (
                href.startsWith('http://') ||
                href.startsWith('https://') ||
                href.startsWith('#') ||
                href.startsWith('mailto:') ||
                href.startsWith('tel:') ||
                href.startsWith('javascript:') ||
                href.startsWith('data:')
            ) {
                return;
            }

            totalLinks++;

            // Normalize the path
            let targetPath = href.split('#')[0].split('?')[0];
            if (!targetPath.startsWith('/')) {
                const currentDir = path.dirname('/' + relativePath);
                targetPath = path.join(currentDir, targetPath);
            }

            // Check if the file exists
            const fullTargetPath = path.join(DIST_DIR, targetPath);
            const indexPath = path.join(fullTargetPath, 'index.html');

            if (
                !fs.existsSync(fullTargetPath) &&
                !fs.existsSync(indexPath) &&
                !existingFiles.has(targetPath)
            ) {
                brokenLinks++;
                logError(`Broken link in ${relativePath}: ${href}`);
            }
        });

        // Also check images
        $('img[src]').each((_, el) => {
            const src = $(el).attr('src');
            if (!src) return;

            if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
                return;
            }

            let targetPath = src;
            if (!targetPath.startsWith('/')) {
                const currentDir = path.dirname('/' + relativePath);
                targetPath = path.join(currentDir, targetPath);
            }

            const fullTargetPath = path.join(DIST_DIR, targetPath);
            if (!fs.existsSync(fullTargetPath)) {
                logWarning(`Missing image in ${relativePath}: ${src}`);
            }
        });
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 Summary:\n');
    console.log(`  📝 Total internal links checked: ${totalLinks}`);
    console.log(`  ✓ Passed: ${results.passed.length}`);
    console.log(`  ⚠ Warnings: ${results.warnings.length}`);
    console.log(`  ✗ Broken links: ${brokenLinks}`);

    if (brokenLinks > 0) {
        console.log('\n❌ Link validation FAILED\n');
        process.exit(1);
    }

    logPass(`All ${totalLinks} internal links are valid`);
    console.log('\n✅ Link validation passed!\n');
}

validateLinks();
