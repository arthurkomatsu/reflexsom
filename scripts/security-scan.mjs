/**
 * Security Scan Script
 * Scans the codebase for potentially exposed secrets
 *
 * Adapted from rafaelalactation/rafaelalactation
 */

import fs from 'fs';
import path from 'path';

// Patterns that may indicate exposed secrets
const SECRET_PATTERNS = [
    {
        name: 'AWS Access Key',
        pattern: /AKIA[0-9A-Z]{16}/g,
    },
    {
        name: 'AWS Secret Key',
        pattern: /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/g,
        contextRequired: ['aws', 'secret', 'key'],
    },
    {
        name: 'Generic API Key',
        pattern: /['"]?(?:api[_-]?key|apikey)['"]?\s*[:=]\s*['"][A-Za-z0-9_\-]{20,}['"]/gi,
    },
    {
        name: 'Generic Secret',
        pattern: /['"]?(?:secret|password|passwd|pwd)['"]?\s*[:=]\s*['"][^'"]{8,}['"]/gi,
    },
    {
        name: 'Private Key',
        pattern: /-----BEGIN (?:RSA |DSA |EC )?PRIVATE KEY-----/g,
    },
    {
        name: 'GitHub Token',
        pattern: /gh[pousr]_[A-Za-z0-9_]{36,}/g,
    },
    {
        name: 'Google API Key',
        pattern: /AIza[0-9A-Za-z\-_]{35}/g,
    },
    {
        name: 'Slack Token',
        pattern: /xox[baprs]-[0-9]{10,13}-[0-9]{10,13}[a-zA-Z0-9-]*/g,
    },
    {
        name: 'Stripe Key',
        pattern: /(?:sk|pk)_(?:live|test)_[A-Za-z0-9]{24,}/g,
    },
    {
        name: 'JWT Token',
        pattern: /eyJ[A-Za-z0-9_-]*\.eyJ[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*/g,
    },
];

// Directories and files to exclude
const EXCLUDE_PATTERNS = [
    'node_modules',
    '.git',
    'dist',
    'build',
    '.husky',
    'playwright-report',
    'test-results',
    '.reference-repo',
    'package-lock.json',
    '.env.example',
    'security-scan.mjs', // Don't scan self
];

// File extensions to scan
const INCLUDE_EXTENSIONS = [
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '.json',
    '.html',
    '.css',
    '.env',
    '.yml',
    '.yaml',
    '.md',
];

function shouldExclude(filePath) {
    return EXCLUDE_PATTERNS.some(
        (pattern) => filePath.includes(pattern) || filePath.endsWith(pattern)
    );
}

function shouldInclude(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return INCLUDE_EXTENSIONS.includes(ext) || filePath.endsWith('.env');
}

function getAllFiles(dirPath, files = []) {
    try {
        const items = fs.readdirSync(dirPath);

        for (const item of items) {
            const fullPath = path.join(dirPath, item);

            if (shouldExclude(fullPath)) {
                continue;
            }

            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                getAllFiles(fullPath, files);
            } else if (stat.isFile() && shouldInclude(fullPath)) {
                files.push(fullPath);
            }
        }
    } catch {
        // Ignore permission errors
    }

    return files;
}

function scanFile(filePath) {
    const findings = [];

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');

        for (const secret of SECRET_PATTERNS) {
            const matches = content.matchAll(secret.pattern);

            for (const match of matches) {
                // Skip if context is required but not found
                if (secret.contextRequired) {
                    const surroundingText = content
                        .substring(Math.max(0, match.index - 100), match.index + 100)
                        .toLowerCase();
                    const hasContext = secret.contextRequired.some((ctx) =>
                        surroundingText.includes(ctx)
                    );
                    if (!hasContext) continue;
                }

                // Find line number
                let charCount = 0;
                let lineNumber = 1;
                for (const line of lines) {
                    if (charCount + line.length >= match.index) {
                        break;
                    }
                    charCount += line.length + 1; // +1 for newline
                    lineNumber++;
                }

                findings.push({
                    file: filePath,
                    line: lineNumber,
                    type: secret.name,
                    match: match[0].substring(0, 20) + '...', // Truncate for safety
                });
            }
        }
    } catch {
        // Ignore read errors
    }

    return findings;
}

// Main execution
console.log('🔍 Scanning for exposed secrets...\n');

const projectRoot = process.cwd();
const files = getAllFiles(projectRoot);
let allFindings = [];

for (const file of files) {
    const findings = scanFile(file);
    allFindings = allFindings.concat(findings);
}

if (allFindings.length > 0) {
    console.log('❌ Potential secrets found:\n');

    for (const finding of allFindings) {
        console.log(`  ${finding.type}`);
        console.log(`    File: ${finding.file}`);
        console.log(`    Line: ${finding.line}`);
        console.log(`    Preview: ${finding.match}`);
        console.log('');
    }

    console.log(
        '⚠️  Please review these findings and ensure no secrets are exposed.'
    );
    console.log(
        '   If these are false positives, consider adding them to the exclusion list.'
    );
    process.exit(1);
} else {
    console.log('✅ No exposed secrets found.');
    process.exit(0);
}
