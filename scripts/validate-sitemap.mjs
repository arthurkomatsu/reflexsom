#!/usr/bin/env node

/**
 * Sitemap Validator
 * Validates sitemap.xml structure and content
 */

import fs from 'fs';
import path from 'path';

const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');
const DIST_SITEMAP_PATH = path.join(process.cwd(), 'dist', 'sitemap.xml');

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

function validateSitemap() {
    console.log('🔍 Sitemap Validator\n');
    console.log('='.repeat(60));

    // Check if sitemap exists
    const sitemapPath = fs.existsSync(DIST_SITEMAP_PATH)
        ? DIST_SITEMAP_PATH
        : SITEMAP_PATH;

    if (!fs.existsSync(sitemapPath)) {
        logError('sitemap.xml not found in public/ or dist/');
        return;
    }

    console.log(`\n📄 Validating: ${path.relative(process.cwd(), sitemapPath)}\n`);

    const content = fs.readFileSync(sitemapPath, 'utf-8');

    // Check XML declaration
    if (!content.startsWith('<?xml')) {
        logError('Missing XML declaration');
    } else {
        logPass('XML declaration present');
    }

    // Check urlset element
    if (!content.includes('<urlset')) {
        logError('Missing <urlset> element');
    } else {
        logPass('<urlset> element present');
    }

    // Check for xmlns
    if (!content.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
        logWarning('Missing standard sitemap xmlns');
    } else {
        logPass('Standard sitemap xmlns present');
    }

    // Count URLs
    const urlMatches = content.match(/<url>/g);
    const urlCount = urlMatches ? urlMatches.length : 0;

    if (urlCount === 0) {
        logError('No <url> entries found in sitemap');
    } else {
        logPass(`Found ${urlCount} URL entries`);
    }

    // Check each URL has required elements
    const locMatches = content.match(/<loc>/g);
    const locCount = locMatches ? locMatches.length : 0;

    if (locCount !== urlCount) {
        logError(`URL count (${urlCount}) doesn't match <loc> count (${locCount})`);
    } else {
        logPass('All URLs have <loc> elements');
    }

    // Check for valid URLs (https)
    const locTags = content.match(/<loc>([^<]+)<\/loc>/g) || [];
    let invalidUrls = 0;

    for (const loc of locTags) {
        const url = loc.replace(/<\/?loc>/g, '');
        if (!url.startsWith('https://')) {
            logWarning(`Non-HTTPS URL found: ${url}`);
            invalidUrls++;
        }
    }

    if (invalidUrls === 0) {
        logPass('All URLs use HTTPS');
    }

    // Check for priority values
    if (!content.includes('<priority>')) {
        logWarning('Consider adding <priority> elements for better SEO');
    } else {
        logPass('Priority elements present');
    }

    // Check for lastmod
    if (!content.includes('<lastmod>')) {
        logWarning('Consider adding <lastmod> elements');
    } else {
        logPass('Last modified dates present');
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 Summary:\n');
    console.log(`  ✓ Passed: ${results.passed.length}`);
    console.log(`  ⚠ Warnings: ${results.warnings.length}`);
    console.log(`  ✗ Errors: ${results.errors.length}`);

    if (results.errors.length > 0) {
        console.log('\n❌ Sitemap validation FAILED\n');
        process.exit(1);
    }

    console.log('\n✅ Sitemap validation passed!\n');
}

validateSitemap();
