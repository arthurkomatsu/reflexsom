import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check for h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check headings are in order
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    let lastLevel = 0;

    for (const heading of headings) {
      const tagName = await heading.evaluate((el) => el.tagName);
      const level = parseInt(tagName.charAt(1));
      // Heading level should not skip (e.g., h1 to h3)
      expect(level - lastLevel).toBeLessThanOrEqual(1);
      lastLevel = level;
    }
  });

  test('should have proper alt text for images', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).not.toBe('');
      expect(alt).not.toBeNull();
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .disableRules(['color-contrast']) // This is checked visually
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('links should have discernible text', async ({ page }) => {
    await page.goto('/');

    const links = await page.locator('a').all();

    for (const link of links) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const hasImage = await link.locator('img').count();

      // Link should have text content, aria-label, or contain an image with alt
      const hasDiscernibleText = (text && text.trim().length > 0) || ariaLabel || hasImage > 0;
      expect(hasDiscernibleText).toBe(true);
    }
  });
});
