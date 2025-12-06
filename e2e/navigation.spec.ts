import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open and close mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Find and click the menu button
    const menuButton = page.getByRole('button', { name: /menu/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Mobile menu should be visible
    await expect(page.getByRole('link', { name: 'Início' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contato' })).toBeVisible();

    // Click to close
    const closeButton = page.getByRole('button', { name: /fechar/i });
    await closeButton.click();
  });

  test('should scroll to sections when clicking nav links', async ({ page }) => {
    // Click on Services
    await page.getByRole('link', { name: 'Serviços' }).first().click();
    await expect(page.locator('#servicos')).toBeInViewport();

    // Click on Equipment
    await page.getByRole('link', { name: 'Equipamentos' }).first().click();
    await expect(page.locator('#equipamentos')).toBeInViewport();

    // Click on Contact
    await page.getByRole('link', { name: 'Contato' }).first().click();
    await expect(page.locator('#contato')).toBeInViewport();
  });

  test('should have skip to content link for accessibility', async ({ page }) => {
    // Tab to the skip link
    await page.keyboard.press('Tab');

    // The skip link should be focused
    const skipLink = page.getByRole('link', { name: /pular para/i });
    await expect(skipLink).toBeFocused();

    // Click and check we're at main content
    await skipLink.click();
    await expect(page.locator('#main-content')).toBeFocused();
  });
});
