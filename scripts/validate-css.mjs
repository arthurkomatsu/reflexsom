#!/usr/bin/env node

/**
 * CSS Validator
 * Checks for undefined CSS variables and duplicate declarations
 * Adapted for Tailwind CSS projects
 */

import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');
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

function findCssFiles(dir) {
    const files = [];
    if (!fs.existsSync(dir)) return files;

    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        try {
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory() && !item.includes('node_modules')) {
                files.push(...findCssFiles(fullPath));
            } else if (item.endsWith('.css')) {
                files.push(fullPath);
            }
        } catch {
            // Skip files we can't read
        }
    }
    return files;
}

function extractCssVariables(content) {
    const defined = new Set();
    const used = new Set();

    // Find defined variables: --variable-name: value;
    const definePattern = /--([\w-]+)\s*:/g;
    let match;
    while ((match = definePattern.exec(content)) !== null) {
        defined.add('--' + match[1]);
    }

    // Find used variables: var(--variable-name)
    const usePattern = /var\(\s*--([\w-]+)/g;
    while ((match = usePattern.exec(content)) !== null) {
        used.add('--' + match[1]);
    }

    return { defined, used };
}

function findDuplicateProperties(content, file) {
    const duplicates = [];
    const blocks = content.match(/\{[^}]+\}/g) || [];

    for (const block of blocks) {
        const properties = {};
        // Match property declarations (simplified)
        const propPattern = /^\s*([\w-]+)\s*:/gm;
        let match;
        while ((match = propPattern.exec(block)) !== null) {
            const prop = match[1];
            if (properties[prop]) {
                properties[prop]++;
            } else {
                properties[prop] = 1;
            }
        }

        for (const [prop, count] of Object.entries(properties)) {
            if (count > 1 && !prop.startsWith('--')) {
                duplicates.push(prop);
            }
        }
    }

    return [...new Set(duplicates)];
}

function validateCss() {
    console.log('🔍 CSS Validator\n');
    console.log('='.repeat(60));

    const cssFiles = findCssFiles(SRC_DIR);
    console.log(`\nFound ${cssFiles.length} CSS file(s) to check\n`);

    const allDefined = new Set();
    const allUsed = new Set();
    let totalDuplicates = 0;

    for (const file of cssFiles) {
        const relativePath = path.relative(process.cwd(), file);
        console.log(`📄 Checking: ${relativePath}`);

        const content = fs.readFileSync(file, 'utf-8');
        const { defined, used } = extractCssVariables(content);

        for (const v of defined) allDefined.add(v);
        for (const v of used) allUsed.add(v);

        // Check for duplicates
        const duplicates = findDuplicateProperties(content, relativePath);
        if (duplicates.length > 0) {
            logWarning(
                `${relativePath}: Duplicate properties found: ${duplicates.slice(0, 3).join(', ')}${duplicates.length > 3 ? '...' : ''}`
            );
            totalDuplicates += duplicates.length;
        }
    }

    // Check for undefined variables (excluding Tailwind's internal variables)
    const tailwindVars = [
        '--tw-',
        '--color-',
        '--font-',
        '--shadow-',
        '--ring-',
        '--spacing-',
        '--radius-',
        '--animate-',
        '--backdrop-',
        '--blur-',
        '--brightness-',
        '--gradient-',
        '--scale-',
        '--translate-',
        '--rotate-',
        '--skew-',
    ];

    const undefinedVars = [];
    for (const v of allUsed) {
        const isTailwindVar = tailwindVars.some((prefix) => v.startsWith(prefix));
        if (!allDefined.has(v) && !isTailwindVar) {
            undefinedVars.push(v);
        }
    }

    if (undefinedVars.length > 0) {
        logWarning(
            `Potentially undefined CSS variables: ${undefinedVars.slice(0, 5).join(', ')}${undefinedVars.length > 5 ? '...' : ''}`
        );
    } else {
        logPass('All CSS variables are defined');
    }

    if (totalDuplicates === 0) {
        logPass('No duplicate property declarations found');
    }

    // Check dist CSS if it exists
    const distCssFiles = findCssFiles(path.join(DIST_DIR, 'assets'));
    if (distCssFiles.length > 0) {
        logPass(`Found ${distCssFiles.length} built CSS file(s) in dist/`);
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 Summary:\n');
    console.log(`  📝 CSS files checked: ${cssFiles.length}`);
    console.log(`  🔤 Variables defined: ${allDefined.size}`);
    console.log(`  🔗 Variables used: ${allUsed.size}`);
    console.log(`  ✓ Passed: ${results.passed.length}`);
    console.log(`  ⚠ Warnings: ${results.warnings.length}`);
    console.log(`  ✗ Errors: ${results.errors.length}`);

    if (results.errors.length > 0) {
        console.log('\n❌ CSS validation FAILED\n');
        process.exit(1);
    }

    console.log('\n✅ CSS validation passed!\n');
}

validateCss();
