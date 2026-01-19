#!/usr/bin/env node

/**
 * Robots.txt Validator
 * Validates robots.txt structure and content
 */

import fs from 'fs';
import path from 'path';

const ROBOTS_PATH = path.join(process.cwd(), 'public', 'robots.txt');
const DIST_ROBOTS_PATH = path.join(process.cwd(), 'dist', 'robots.txt');

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

function validateRobots() {
    console.log('🔍 Robots.txt Validator\n');
    console.log('='.repeat(60));

    // Check if robots.txt exists
    const robotsPath = fs.existsSync(DIST_ROBOTS_PATH)
        ? DIST_ROBOTS_PATH
        : ROBOTS_PATH;

    if (!fs.existsSync(robotsPath)) {
        logError('robots.txt not found in public/ or dist/');
        return;
    }

    console.log(`\n📄 Validating: ${path.relative(process.cwd(), robotsPath)}\n`);

    const content = fs.readFileSync(robotsPath, 'utf-8');
    const lines = content.split('\n').map((l) => l.trim());

    // Check for User-agent directive
    if (!content.toLowerCase().includes('user-agent:')) {
        logError('Missing User-agent directive');
    } else {
        const userAgents = lines.filter((l) =>
            l.toLowerCase().startsWith('user-agent:')
        );
        logPass(`Found ${userAgents.length} User-agent directive(s)`);
    }

    // Check for Sitemap directive
    if (!content.toLowerCase().includes('sitemap:')) {
        logWarning('Missing Sitemap directive - add one for better SEO');
    } else {
        const sitemapLine = lines.find((l) =>
            l.toLowerCase().startsWith('sitemap:')
        );
        if (sitemapLine) {
            const sitemapUrl = sitemapLine.split(':').slice(1).join(':').trim();
            if (!sitemapUrl.startsWith('https://')) {
                logWarning('Sitemap URL should use HTTPS');
            } else {
                logPass(`Sitemap directive present: ${sitemapUrl}`);
            }
        }
    }

    // Check for Allow or Disallow
    const hasAllow = content.toLowerCase().includes('allow:');
    const hasDisallow = content.toLowerCase().includes('disallow:');

    if (!hasAllow && !hasDisallow) {
        logWarning('No Allow or Disallow directives found');
    } else {
        if (hasAllow) {
            const allows = lines.filter((l) => l.toLowerCase().startsWith('allow:'));
            logPass(`Found ${allows.length} Allow directive(s)`);
        }
        if (hasDisallow) {
            const disallows = lines.filter((l) =>
                l.toLowerCase().startsWith('disallow:')
            );
            logPass(`Found ${disallows.length} Disallow directive(s)`);
        }
    }

    // Check for crawl-delay (optional)
    if (content.toLowerCase().includes('crawl-delay:')) {
        logPass('Crawl-delay directive present');
    }

    // Check file size (should be reasonable)
    const fileSize = Buffer.byteLength(content, 'utf-8');
    if (fileSize > 500000) {
        // 500KB
        logWarning(`robots.txt is very large (${fileSize} bytes)`);
    } else {
        logPass(`File size is reasonable (${fileSize} bytes)`);
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 Summary:\n');
    console.log(`  ✓ Passed: ${results.passed.length}`);
    console.log(`  ⚠ Warnings: ${results.warnings.length}`);
    console.log(`  ✗ Errors: ${results.errors.length}`);

    if (results.errors.length > 0) {
        console.log('\n❌ Robots.txt validation FAILED\n');
        process.exit(1);
    }

    console.log('\n✅ Robots.txt validation passed!\n');
}

validateRobots();
