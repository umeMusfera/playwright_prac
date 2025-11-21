// import { test, expect } from '@playwright/test';



// test('visible', async ({ page }) => {
//   // Step 1: Open the page
//   await page.goto('https://www.borjan.com.pk/collections/all-women-shoes');

//   // Step 2: Verify heading text
//   await expect(page.locator('h1.collection-hero__title')).toHaveText(/Collection:\s*Women/i);

//   // Step 3: Select the product card by ID
//   const card = page.locator('#CardLink-template--17873929011375__product-grid-8317305782447');



//   // Step 5: Click the link inside that card
//   await card.getByRole('link', { name: 'Women Moccasin-IVORY' }).click();
// });


// test('Add to Cart', async ({ page }) => {
//   await page.goto('https://www.borjan.com.pk/collections/all-women-shoes/products/bw10732-tan-women-moccasin');

//    // Step 3: Wait for the Add to Cart button to appear
//   const addToCartButton = page.getByRole('button', { name: 'Add to cart' });
//   await expect(addToCartButton).toBeVisible();

//   // Step 4: Click the Add to Cart button
//   await addToCartButton.click();
//   await expect(page.getByRole('heading', { name: 'Your cart' })).toBeVisible();
  
// });




import { test, expect } from '@playwright/test';

// Increase default timeout for all actions (20 seconds)
test.use({ timeout: 60000 }); // 60s per test

test('visible', async ({ page }) => {
  // Step 1: Open the page
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://www.borjan.com.pk/collections/all-women-shoes', {
  waitUntil: 'commit',
  timeout: 90000
});


  // Step 2: Verify heading text
  const heading = page.locator('h1.collection-hero__title');
  await expect(heading).toHaveText(/Collection:\s*Women/i, { timeout: 20000 });

  // Step 3: Select the product card by ID
  const card = page.locator('#CardLink-template--17873929011375__product-grid-8317305782447');

  // Step 4: Wait for the product link inside card
  const productLink = card.getByRole('link', { name: 'Women Moccasin-IVORY' });
  await expect(productLink).toBeVisible({ timeout: 20000 });

  // Step 5: Click the link
  await productLink.click();
});


test('Add to Cart', async ({ page }) => {
  await page.goto('https://www.borjan.com.pk/collections/all-women-shoes/products/bw10732-tan-women-moccasin', {
    waitUntil: 'load',
    timeout: 45000
  });

  // Step 3: Wait for the Add to Cart button
  const addToCartButton = page.getByRole('button', { name: 'Add to cart' });
  await expect(addToCartButton).toBeVisible({ timeout: 20000 });

  // Step 4: Click Add to Cart
  await addToCartButton.click();

  // Step 5: Verify cart opens
  await expect(page.getByRole('heading', { name: 'Your cart' })).toBeVisible({ timeout: 20000 });
});
