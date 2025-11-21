

import { test, expect } from '@playwright/test';

test('Login and verify dashboard', async ({ page }) => {
  // Step 1: Load the login page
  await page.goto('https://urbangents2.yeetonline.com', {
    waitUntil: 'networkidle', // wait until network is quiet
    timeout: 80000 // 60 seconds max for page load
  });

  // Step 2: Click Login link
  await page.locator('#navbarSupportedContent').getByRole('link', { name: 'Login' }).click();

  // Step 3: Fill credentials
  await page.getByRole('textbox', { name: 'Email address *' }).fill('johnalyy@gmail.com');
  await page.getByRole('textbox', { name: 'Password *' }).fill('12345678');

  // Step 4: Click Login button
  await page.getByRole('button', { name: 'Login' }).click();

  // Step 5: Wait for post-login navigation (dashboard or user image)
  const dashboardImage = page.locator('img[src="/_ipx/q_80/dashboard_place_holder.png"]');
  await dashboardImage.waitFor({ state: 'visible', timeout: 60000 }); // wait up to 40s

  // Step 6: Verify dashboard link is visible
  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible({ timeout: 30000 });

  console.log('✅ Successfully logged in and dashboard verified');
});

