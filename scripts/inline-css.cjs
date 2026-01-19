
const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html not found. Run build first.');
    process.exit(1);
}

let html = fs.readFileSync(indexHtmlPath, 'utf8');

// Find the CSS file
// Look for <link rel="stylesheet" crossorigin href="/assets/index-B-q0ANXS.css">
// Regex to catch dynamic hash
const cssLinkRegex = /<link rel="stylesheet" crossorigin href="\/assets\/index-([^"]+)\.css">/;
const match = html.match(cssLinkRegex);

if (match) {
    const cssFileName = `index-${match[1]}.css`;
    const cssPath = path.join(distDir, 'assets', cssFileName);

    if (fs.existsSync(cssPath)) {
        console.log(`Inlining CSS: ${cssFileName}`);
        const cssContent = fs.readFileSync(cssPath, 'utf8');

        // Replace link with style tag
        const styleTag = `<style>${cssContent}</style>`;
        html = html.replace(match[0], styleTag);

        // Write updated HTML
        fs.writeFileSync(indexHtmlPath, html);
        console.log('CSS inlined successfully.');

        // Optional: Delete the original CSS file if you want to ensure it's not requested
        // But usually keeping it doesn't hurt, except for cleanup. 
        // Wait, if it's referenced in JS (e.g. import), it might break?
        // Vite usually injects CSS via JS in dev, but in build it extracts it.
        // If I replace the link in HTML, browser won't request it.

    } else {
        console.warn(`CSS file found in HTML but not in filesystem: ${cssPath}`);
    }
} else {
    console.warn('No main CSS link found in index.html to inline.');

    // Try safer regex (sometimes attributes order differs)
    // <link rel="stylesheet" href="/assets/index-....css">
    const simpleRegex = /<link rel="stylesheet" href="\/assets\/index-([^"]+)\.css">/;
    const match2 = html.match(simpleRegex);
    if (match2) {
        // Logic would be same... but let's assume the build output is standard
    }
}
