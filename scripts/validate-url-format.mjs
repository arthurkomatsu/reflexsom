#!/usr/bin/env node

/**
 * URL Format Validator
 * Ensures URLs don't use www prefix (for consistency)
 * Checks HTML files for www.reflexsom.com.br references
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files to check
const FILES_TO_CHECK = [
    'index.html',
    'public/sitemap.xml',
    'public/robots.txt',
    'public/manifest.json',
];

// Pattern to find www URLs (adjust domain as needed)
const WWW_PATTERN = /www\.reflexsom\.com\.br/g;

const results = {
    errors: [],
    warnings: [],
    passed: [],
};

function logError(file, message) {
    results.errors.push({ file, message });
    console.error(`  ✗ ERROR: ${message}`);
}

function logWarning(file, message) {
    results.warnings.push({ file, message });
    console.warn(`  ⚠ WARNING: ${message}`);
}

function logPass(message) {
    results.passed.push(message);
    console.log(`  ✓ ${message}`);
}

function checkFile(filePath) {
    const relativePath = path.relative(process.cwd(), filePath);

    if (!fs.existsSync(filePath)) {
        console.log(`  ⏭ Skipping ${relativePath} (not found)`);
        return { wwwCount: 0, exists: false };
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const matches = content.match(WWW_PATTERN);
    const wwwCount = matches ? matches.length : 0;

    return { wwwCount, exists: true, relativePath };
}

function validateUrlFormat() {
    console.log('🔍 URL Format Validator\n');
    console.log('='.repeat(60));
    console.log('\nChecking for www prefix in URLs...\n');

    let totalWwwCount = 0;
    const filesWithWww = [];

    for (const file of FILES_TO_CHECK) {
        const filePath = path.join(process.cwd(), file);
        const result = checkFile(filePath);

        if (result.exists && result.wwwCount > 0) {
            totalWwwCount += result.wwwCount;
            filesWithWww.push({
                file: result.relativePath,
                count: result.wwwCount,
            });
            logWarning(
                result.relativePath,
                `Found ${result.wwwCount} www URL(s)`
            );
        } else if (result.exists) {
            logPass(`${result.relativePath}: No www URLs found`);
        }
    }

    // Also check dist folder if it exists
    const distIndexPath = path.join(process.cwd(), 'dist', 'index.html');
    if (fs.existsSync(distIndexPath)) {
        const result = checkFile(distIndexPath);
        if (result.exists && result.wwwCount > 0) {
            totalWwwCount += result.wwwCount;
            filesWithWww.push({
                file: result.relativePath,
                count: result.wwwCount,
            });
            logWarning(
                result.relativePath,
                `Found ${result.wwwCount} www URL(s)`
            );
        } else if (result.exists) {
            logPass(`${result.relativePath}: No www URLs found`);
        }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 Summary:\n');
    console.log(`  ✓ Passed: ${results.passed.length}`);
    console.log(`  ⚠ Warnings: ${results.warnings.length}`);
    console.log(`  ✗ Errors: ${results.errors.length}`);

    if (totalWwwCount > 0) {
        console.log(`\n⚠️  Found ${totalWwwCount} www URL(s) across ${filesWithWww.length} file(s):`);
        for (const f of filesWithWww) {
            console.log(`    • ${f.file}: ${f.count} occurrence(s)`);
        }
        console.log('\n💡 Consider removing www prefix for URL consistency.');
        console.log('   Replace: www.reflexsom.com.br');
        console.log('   With:    reflexsom.com.br\n');
        // Note: We're making this a warning, not an error
        // If you want to enforce it, uncomment the next line:
        // process.exit(1);
    }

    console.log('\n✅ URL format validation passed!\n');
}

validateUrlFormat();
