import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the hero section', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('Reflex Som')).toBeVisible();
  });

  test('should have a working navigation', async ({ page }) => {
    // Check navbar is visible
    await expect(page.getByRole('navigation')).toBeVisible();

    // Click on Sobre link
    await page.getByRole('link', { name: 'Sobre' }).first().click();

    // Should scroll to the about section
    await expect(page.locator('#sobre')).toBeInViewport();
  });

  test('should display all main sections', async ({ page }) => {
    // Hero
    await expect(page.locator('#inicio')).toBeVisible();

    // About
    await expect(page.locator('#sobre')).toBeVisible();

    // Services
    await expect(page.locator('#servicos')).toBeVisible();

    // Equipment
    await expect(page.locator('#equipamentos')).toBeVisible();

    // Gallery
    await expect(page.locator('#galeria')).toBeVisible();

    // Testimonials
    await expect(page.locator('#depoimentos')).toBeVisible();

    // FAQ
    await expect(page.locator('#faq')).toBeVisible();

    // Contact
    await expect(page.locator('#contato')).toBeVisible();
  });

  test('should have WhatsApp floating button', async ({ page }) => {
    const whatsappButton = page.getByRole('link', { name: /whatsapp/i });
    await expect(whatsappButton).toBeVisible();
    await expect(whatsappButton).toHaveAttribute('href', /wa\.me/);
  });
});
