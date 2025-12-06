import { test, expect } from '@playwright/test';

test.describe('Contact and WhatsApp', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('WhatsApp button should have correct link', async ({ page }) => {
    const whatsappButton = page.getByRole('link', { name: /whatsapp/i }).first();
    const href = await whatsappButton.getAttribute('href');

    expect(href).toContain('wa.me');
    expect(href).toContain('5561983033900');
  });

  test('should display contact information', async ({ page }) => {
    // Navigate to contact section
    await page.locator('#contato').scrollIntoViewIfNeeded();

    // Check contact info is visible (use first() to avoid strict mode violation)
    await expect(page.getByText('(61) 98303-3900').first()).toBeVisible();
    await expect(page.getByText('Brasília - DF').first()).toBeVisible();
  });

  test('should have Instagram link', async ({ page }) => {
    const instagramLink = page.getByRole('link', { name: /instagram/i }).first();
    await expect(instagramLink).toBeVisible();
    await expect(instagramLink).toHaveAttribute('href', /instagram\.com/);
  });
});
