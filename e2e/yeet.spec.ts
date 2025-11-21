
import { test, expect } from '@playwright/test';

test('logging in', async ({ page }) => {
  test.setTimeout(120000);

  // Step 1: Open homepage with minimal waiting
  await page.goto('https://yeetcommerce.com/', { waitUntil: 'commit', timeout: 60000 });
  await page.waitForTimeout(5000); // give it time to render

  // Step 2: Click "Create My Free Store" and handle popup
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Create My Free Store' }).click()
  ]);

  await popup.waitForLoadState('domcontentloaded', { timeout: 60000 });

  // Step 3: Login flow
  await popup.getByRole('button', { name: 'Login' }).click();
  await popup.getByRole('textbox', { name: 'Email*' }).fill('umemasfeera@gmail.com');
  await popup.getByRole('textbox', { name: 'Password*' }).fill('Musfi@next');
  await popup.getByRole('button', { name: 'Login' }).click();
 await popup.waitForLoadState();

  // Then wait for the success heading
  await expect(popup.getByRole('heading', { name: 'Success' }))
    .toBeVisible({ timeout: 60000 });

});
