import { test, expect } from '@playwright/test';



test('Add to Cart', async ({ page }) => {
  await page.goto('https://thapas-technical.myshopify.com/collections/summer-collection', { waitUntil: 'load' });
  await page.getByRole('textbox', { name: 'Enter store password' }).fill('SS');
  await page.getByRole('textbox', { name: 'Enter store password' }).press('Enter');
  await page.waitForSelector('h1.collection-hero__title');
  
  await expect(page.getByText(/Winter collection/i)).toBeVisible();

});





