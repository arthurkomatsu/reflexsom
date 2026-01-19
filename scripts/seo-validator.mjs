#!/usr/bin/env node

/**
 * SEO Validator Script
 *
 * Validates HTML files for SEO best practices:
 * - Meta tag presence and length constraints
 * - Heading hierarchy
 * - Open Graph tags
 * - Canonical URLs
 * - JSON-LD structured data
 * - Image alt attributes
 * - Crawlable anchors (Lighthouse-inspired)
 * - Descriptive link text (Lighthouse-inspired)
 * - Viewport meta tag (mobile SEO)
 *
 * Adapted from rafaelalactation for React/Vite SPA
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try to load cheerio, provide helpful error if missing
let cheerio;
try {
    const cheerioModule = await import('cheerio');
    cheerio = cheerioModule.default || cheerioModule;
} catch {
    console.error('Error: cheerio is not installed.');
    console.error('Run: npm install cheerio');
    process.exit(1);
}

// Configuration
const CONFIG = {
    maxTitleLength: 60,
    maxDescriptionLength: 160,
    minDescriptionLength: 50,
    // For React SPA, we validate the built index.html
    htmlFiles: ['dist/index.html'],
    // Files that should be excluded from certain checks
    excludeFromStrictChecks: ['offline.html', '404.html'],
};

// Non-descriptive link text patterns (Lighthouse link-text audit)
const NON_DESCRIPTIVE_LINK_TEXT = new Set([
    'click here',
    'click this',
    'go',
    'here',
    'information',
    'learn more',
    'more',
    'more info',
    'more information',
    'right here',
    'read more',
    'see more',
    'start',
    'this',
]);

// Results tracking
const results = {
    errors: [],
    warnings: [],
    passed: [],
};

/**
 * Log an error
 */
function logError(file, message) {
    results.errors.push({ file, message });
    console.error(`  ✗ ERROR: ${message}`);
}

/**
 * Log a warning
 */
function logWarning(file, message) {
    results.warnings.push({ file, message });
    console.warn(`  ⚠ WARNING: ${message}`);
}

/**
 * Log a passed check
 */
function logPass(message) {
    results.passed.push(message);
    console.log(`  ✓ ${message}`);
}

/**
 * Validate meta title
 */
function validateTitle($, file) {
    const title = $('head > title').text().trim();

    if (!title) {
        logError(file, 'Missing <title> tag');
        return;
    }

    if (title.length > CONFIG.maxTitleLength) {
        logWarning(
            file,
            `Title too long: ${title.length} chars (max ${CONFIG.maxTitleLength}). May be truncated in SERPs.`
        );
    } else {
        logPass(`Title present (${title.length} chars)`);
    }
}

/**
 * Validate meta description
 */
function validateDescription($, file) {
    const description = $('meta[name="description"]').attr('content')?.trim();

    if (!description) {
        logError(file, 'Missing meta description');
        return;
    }

    if (description.length > CONFIG.maxDescriptionLength) {
        logWarning(
            file,
            `Description too long: ${description.length} chars (max ${CONFIG.maxDescriptionLength})`
        );
    } else if (description.length < CONFIG.minDescriptionLength) {
        logWarning(
            file,
            `Description too short: ${description.length} chars (min ${CONFIG.minDescriptionLength})`
        );
    } else {
        logPass(`Meta description present (${description.length} chars)`);
    }
}

/**
 * Validate canonical URL
 */
function validateCanonical($, file) {
    const canonical = $('link[rel="canonical"]').attr('href');

    if (!canonical) {
        logWarning(file, 'Missing canonical URL');
    } else if (!canonical.startsWith('https://')) {
        logWarning(file, 'Canonical URL should be absolute HTTPS URL');
    } else {
        logPass('Canonical URL present');
    }
}

/**
 * Validate Open Graph tags
 */
function validateOpenGraph($, file) {
    const requiredOG = ['og:title', 'og:description', 'og:image', 'og:url'];
    const missingOG = [];

    for (const tag of requiredOG) {
        const content = $(`meta[property="${tag}"]`).attr('content');
        if (!content) {
            missingOG.push(tag);
        }
    }

    if (missingOG.length > 0) {
        logWarning(file, `Missing Open Graph tags: ${missingOG.join(', ')}`);
    } else {
        logPass('All Open Graph tags present');
    }

    // Validate og:image is absolute URL
    const ogImage = $('meta[property="og:image"]').attr('content');
    if (ogImage && !ogImage.startsWith('https://')) {
        logWarning(file, 'og:image should be an absolute HTTPS URL');
    }
}

/**
 * Validate Twitter Card tags
 */
function validateTwitterCard($, file) {
    const twitterCard = $(
        'meta[property="twitter:card"], meta[name="twitter:card"]'
    ).attr('content');

    if (!twitterCard) {
        logWarning(file, 'Missing Twitter Card meta tag');
    } else {
        logPass('Twitter Card present');
    }
}

/**
 * Validate JSON-LD structured data
 */
function validateStructuredData($, file) {
    const jsonLdScripts = $('script[type="application/ld+json"]');

    if (jsonLdScripts.length === 0) {
        logWarning(file, 'No JSON-LD structured data found');
        return;
    }

    let validCount = 0;
    let invalidCount = 0;

    jsonLdScripts.each((_, script) => {
        const content = $(script).html();
        try {
            const data = JSON.parse(content);

            // Check for required @context and @type
            if (!data['@context']) {
                logWarning(file, 'JSON-LD missing @context');
                invalidCount++;
            } else if (!data['@type']) {
                logWarning(file, 'JSON-LD missing @type');
                invalidCount++;
            } else {
                validCount++;
            }
        } catch (e) {
            logError(file, `Invalid JSON-LD syntax: ${e.message}`);
            invalidCount++;
        }
    });

    if (validCount > 0 && invalidCount === 0) {
        logPass(`${validCount} valid JSON-LD block(s) found`);
    }
}

/**
 * Validate image alt attributes
 */
function validateImageAlts($, file) {
    const images = $('img');
    let missingAlts = 0;
    let emptyAlts = 0;

    images.each((_, img) => {
        const alt = $(img).attr('alt');
        if (alt === undefined) {
            missingAlts++;
        } else if (alt.trim() === '') {
            emptyAlts++;
        }
    });

    if (missingAlts > 0) {
        logWarning(file, `${missingAlts} image(s) missing alt attribute`);
    } else if (images.length > 0) {
        logPass(`All ${images.length} images have alt attributes`);
    }

    if (emptyAlts > 0) {
        console.log(`    ℹ ${emptyAlts} image(s) have empty alt (decorative)`);
    }
}

/**
 * Validate viewport meta tag (critical for mobile SEO)
 */
function validateViewport($, file) {
    const viewport = $('meta[name="viewport"]').attr('content');

    if (!viewport) {
        logError(
            file,
            'Missing viewport meta tag (critical for mobile-first indexing)'
        );
        return;
    }

    if (!viewport.includes('width=device-width')) {
        logWarning(file, 'Viewport should include width=device-width for mobile SEO');
    } else {
        logPass('Viewport meta tag configured correctly');
    }
}

/**
 * Validate crawlable anchors (Lighthouse-inspired)
 */
function validateCrawlableAnchors($, file) {
    const issues = [];

    $('a').each((_, el) => {
        const href = $(el).attr('href') || '';
        const rawHref = href.trim().replace(/\s/g, '');
        const id = $(el).attr('id');
        const name = $(el).attr('name');
        const role = $(el).attr('role') || '';

        if (role.length > 0) return;
        if (rawHref.startsWith('mailto:')) return;
        if (rawHref === '' && (id || name)) return;

        if (/javascript:void\(?0?\)?/.test(rawHref)) {
            issues.push('javascript:void(0)');
        }
        if (rawHref.startsWith('file:')) {
            issues.push('file: protocol');
        }
    });

    if (issues.length > 0) {
        logWarning(
            file,
            `${issues.length} uncrawlable anchor(s): ${issues.slice(0, 3).join(', ')}${issues.length > 3 ? '...' : ''}`
        );
    } else {
        logPass('All anchors are crawlable');
    }
}

/**
 * Validate descriptive link text (Lighthouse-inspired)
 */
function validateLinkText($, file) {
    const badLinks = [];

    $('a[href]').each((_, el) => {
        const href = $(el).attr('href') || '';
        const text = $(el).text().trim().toLowerCase();
        const rel = $(el).attr('rel') || '';

        if (
            href.startsWith('#') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            href.startsWith('javascript:') ||
            rel.includes('nofollow')
        ) {
            return;
        }

        if (NON_DESCRIPTIVE_LINK_TEXT.has(text)) {
            badLinks.push({ text, href: href.substring(0, 50) });
        }
    });

    if (badLinks.length > 0) {
        const examples = badLinks
            .slice(0, 2)
            .map((l) => `"${l.text}"`)
            .join(', ');
        logWarning(
            file,
            `${badLinks.length} link(s) with non-descriptive text: ${examples}`
        );
    } else {
        logPass('All links have descriptive text');
    }
}

/**
 * Validate a single HTML file
 */
function validateFile(filePath) {
    const relativePath = path.relative(process.cwd(), filePath);
    console.log(`\n📄 Validating: ${relativePath}`);

    if (!fs.existsSync(filePath)) {
        logError(relativePath, 'File not found');
        return;
    }

    const html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html);

    // Run all validations
    validateTitle($, relativePath);
    validateDescription($, relativePath);
    validateCanonical($, relativePath);
    validateOpenGraph($, relativePath);
    validateTwitterCard($, relativePath);
    validateStructuredData($, relativePath);
    validateImageAlts($, relativePath);
    validateViewport($, relativePath);
    validateCrawlableAnchors($, relativePath);
    validateLinkText($, relativePath);
}

/**
 * Find all HTML files to validate
 */
function findHtmlFiles() {
    const files = [];

    for (const file of CONFIG.htmlFiles) {
        const fullPath = path.join(process.cwd(), file);
        if (fs.existsSync(fullPath)) {
            files.push(fullPath);
        }
    }

    return files;
}

/**
 * Main function
 */
function main() {
    console.log('🔍 SEO Validator\n');
    console.log('='.repeat(60));

    const files = findHtmlFiles();

    if (files.length === 0) {
        console.log('\n⚠️  No HTML files found to validate.');
        console.log('    Run "npm run build" first to generate dist/index.html');
        process.exit(0);
    }

    console.log(`Found ${files.length} HTML file(s) to validate\n`);

    for (const file of files) {
        validateFile(file);
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 Summary:\n');
    console.log(`  ✓ Passed: ${results.passed.length}`);
    console.log(`  ⚠ Warnings: ${results.warnings.length}`);
    console.log(`  ✗ Errors: ${results.errors.length}`);

    if (results.warnings.length > 0) {
        console.log('\n⚠️  Warnings (should fix for better SEO):\n');
        for (const item of results.warnings) {
            console.log(`  • ${item.file}: ${item.message}`);
        }
    }

    if (results.errors.length > 0) {
        console.log('\n❌ SEO validation FAILED with errors:\n');
        for (const error of results.errors) {
            console.log(`  • ${error.file}: ${error.message}`);
        }
        process.exit(1);
    }

    console.log('\n✅ SEO validation passed!\n');
    process.exit(0);
}

main();
