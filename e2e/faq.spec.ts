import { test, expect } from '@playwright/test';

test.describe('FAQ Accordion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#faq').scrollIntoViewIfNeeded();
  });

  test('should have first FAQ item open by default', async ({ page }) => {
    const firstAnswer = page.getByText(/Atendemos Brasília, todo o Distrito Federal/);
    await expect(firstAnswer).toBeVisible();
  });

  test('should toggle FAQ items on click', async ({ page }) => {
    // Find second question and click it
    const secondQuestion = page.getByText(
      'Qual a antecedência necessária para reservar os equipamentos?'
    );
    await secondQuestion.click();

    // Answer should be visible
    const secondAnswer = page.getByText(/Recomendamos reservar com pelo menos 15 dias/);
    await expect(secondAnswer).toBeVisible();

    // Click again to close
    await secondQuestion.click();
    await expect(secondAnswer).not.toBeVisible();
  });

  test('FAQ buttons should have aria-expanded attribute', async ({ page }) => {
    const faqButtons = page.locator('#faq button[aria-expanded]');
    const count = await faqButtons.count();
    expect(count).toBeGreaterThan(0);

    // First button should be expanded
    const firstButton = faqButtons.first();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('should be keyboard navigable', async ({ page }) => {
    // Focus on the FAQ section
    await page.locator('#faq button').first().focus();

    // Tab through FAQ items
    await page.keyboard.press('Tab');

    // Enter to toggle
    await page.keyboard.press('Enter');
  });
});
