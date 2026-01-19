import { test, expect } from '@playwright/test';

test.describe('404 Page SEO', () => {
  test('should have noindex meta tag on 404 page', async ({ page }) => {
    // Navigate to a non-existent page
    await page.goto('/non-existent-page-for-test');

    // Check if the noindex meta tag exists
    const metaRobots = await page.locator('meta[name="robots"][content="noindex"]');
    await expect(metaRobots).toHaveCount(1);

    // Additional check to ensure we are actually on the 404 page (visual confirmation)
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText('Página não encontrada')).toBeVisible();
  });

  test('should have noindex meta tag on offline.html', async ({ page }) => {
    // Navigate strictly to the static offline.html file
    await page.goto('/offline.html');

    // Check if the noindex meta tag exists
    const metaRobots = await page.locator('meta[name="robots"][content="noindex"]');
    await expect(metaRobots).toHaveCount(1);
  });

  test('should remove noindex meta tag when navigating away from 404', async ({ page }) => {
    // Start at 404 page
    await page.goto('/another-missing-page');
    await expect(page.locator('meta[name="robots"][content="noindex"]')).toHaveCount(1);

    // Navigate to home page
    await page.getByRole('link', { name: 'Ir para Início' }).click();
    await expect(page).toHaveURL('/');

    // Check that the noindex tag is gone
    // Note: The original robots tag in index.html is <meta name="robots" content="index, follow" />
    // Our injected tag was separate. We just need to ensure the "noindex" one is gone.
    await expect(page.locator('meta[name="robots"][content="noindex"]')).toHaveCount(0);

    // Verify the default robots tag is present (optional but good practice)
    await expect(page.locator('meta[name="robots"][content="index, follow"]')).toHaveCount(1);
  });
});
