import { test, expect } from '@playwright/test';




test('Add to Cart', async ({ page }) => {
  await page.goto('https://www.borjan.com.pk/collections/all-women-shoes/products/bw10732-tan-women-moccasin');

   // Step 3: Wait for the Add to Cart button to appear
  const addToCartButton = page.getByRole('button', { name: 'Add to cart' });
  await expect(addToCartButton).toBeVisible();

  // Step 4: Click the Add to Cart button
  await addToCartButton.click();
  await page.getByRole('button', { name: 'Check out' }).click();
  await expect(page.getByRole("heading",{name:"Contact"})).toBeVisible();
  
});


