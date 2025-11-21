// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://thapas-technical.myshopify.com/password');
//   await page.getByRole('textbox', { name: 'Enter store password' }).click();
//   await page.getByRole('textbox', { name: 'Enter store password' }).fill('SS');
//   await page.getByRole('textbox', { name: 'Enter store password' }).press('Enter');
  
//   await page.getByRole('button', { name: 'Catalog' }).click();
//   await page.getByRole('link', { name: 'Accessories' }).click();
//   await page.getByRole('button', { name: 'Add to cart' }).click();
//   await page.getByRole('button', { name: 'Check out' }).click();
//   await page.getByRole('textbox', { name: 'Email or mobile phone number' }).fill('');
//   await page.getByRole('textbox', { name: 'Email or mobile phone number' }).press('CapsLock');
//   await page.getByRole('textbox', { name: 'Email or mobile phone number' }).fill('umemusfira33@gmail.com');
//   await page.getByRole('textbox', { name: 'First name (optional)' }).click();
//   await page.getByRole('textbox', { name: 'First name (optional)' }).fill('john');
//   await page.getByRole('textbox', { name: 'Last name' }).click();
//   await page.getByRole('textbox', { name: 'Last name' }).fill('alyyy');
//   await page.getByRole('textbox', { name: 'Address' }).click();
//   await page.getByRole('textbox', { name: 'Address' }).click();
//   await page.getByRole('textbox', { name: 'Address' }).fill('Township lahore');
//   await page.getByRole('textbox', { name: 'Apartment, suite, etc. (' }).click();
//   await page.getByRole('textbox', { name: 'City' }).click();
//   await page.getByRole('textbox', { name: 'City' }).fill('Lahore');
//   await page.getByRole('textbox', { name: 'Postal code (optional)' }).click();
//   await page.getByRole('textbox', { name: 'Postal code (optional)' }).fill('22550');
//   // await page.getByRole('textbox', { name: 'Credit card' }).click();
//   // await page.locator('iframe[name="card-fields-number-4w6m3ws22e900000"]').contentFrame().getByRole('textbox', { name: 'Card number' }).fill('1');
//   // await page.locator('iframe[name="card-fields-expiry-1ij7o5pb4h200000"]').contentFrame().getByRole('textbox', { name: 'Expiration date (MM / YY)' }).click();
//   // await page.locator('iframe[name="card-fields-expiry-1ij7o5pb4h200000"]').contentFrame().getByRole('textbox', { name: 'Expiration date (MM / YY)' }).fill('12 / 25');
//   // await page.locator('iframe[name="card-fields-verification_value-lat2tb8yyt000000"]').contentFrame().getByRole('textbox', { name: 'Security code' }).click();
//   // await page.locator('iframe[name="card-fields-verification_value-lat2tb8yyt000000"]').contentFrame().getByRole('textbox', { name: 'Security code' }).fill('123');
//   // Wait for the iframe to appear
// const cardFrame = page.frameLocator('iframe[name^="card-fields-number"]');

// // Then find and fill the card number inside it
// await cardFrame.getByRole('textbox', { name: 'Card number' }).fill('4111111111111111');

// // Similarly for expiry date and CVC
// const expiryFrame = page.frameLocator('iframe[name^="card-fields-expiry"]');
// await expiryFrame.getByRole('textbox', { name: 'Expiration date (MM / YY)' }).fill('12 / 25');

// const cvcFrame = page.frameLocator('iframe[name^="card-fields-verification"]');
// await cvcFrame.getByRole('textbox', { name: 'Security code' }).fill('123');

//   // await page.locator('div').filter({ hasText: /^Cash on Delivery \(COD\)$/ }).nth(2).click();
//   await page.locator('div').filter({ hasText: /^Credit card$/ }).nth(1).click();
//   // Click "Pay now" and wait for the navigation to the Thank You page

//   page.getByRole('button', { name: 'Pay now' }).click();




// // Option 2: Check that the "Thank you" heading is visible
// await expect(page.getByRole('heading', { name: /Thank you/i })).toBeVisible({ timeout: 20000 });


// });





import { test, expect } from '@playwright/test';

test('Shopify checkout flow', async ({ page }) => {
  // 🔐 Go to password page
  await page.goto('https://thapas-technical.myshopify.com/password');
  await page.getByRole('textbox', { name: 'Enter store password' }).fill('SS');
  await page.getByRole('textbox', { name: 'Enter store password' }).press('Enter');

  // 🛍 Navigate and add to cart
  await page.getByRole('button', { name: 'Catalog' }).click();
  await page.getByRole('link', { name: 'Accessories' }).click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('button', { name: 'Check out' }).click();

  // 🧾 Fill contact & address details
  await page.getByRole('textbox', { name: 'Email or mobile phone number' }).fill('umemusfira33@gmail.com');
  await page.getByRole('textbox', { name: 'First name (optional)' }).fill('john');
  await page.getByRole('textbox', { name: 'Last name' }).fill('alyyy');
  await page.getByRole('textbox', { name: 'Address' }).fill('Township Lahore');
  await page.getByRole('textbox', { name: 'City' }).fill('Lahore');
  await page.getByRole('textbox', { name: 'Postal code (optional)' }).fill('22550');

  // 💳 Fill card info inside iframes
  const cardFrame = page.frameLocator('iframe[name^="card-fields-number"]');
  await cardFrame.getByRole('textbox', { name: 'Card number' }).fill('1');

  const expiryFrame = page.frameLocator('iframe[name^="card-fields-expiry"]');
  await expiryFrame.getByRole('textbox', { name: 'Expiration date (MM / YY)' }).fill('12 / 25');

  const cvcFrame = page.frameLocator('iframe[name^="card-fields-verification"]');
  await cvcFrame.getByRole('textbox', { name: 'Security code' }).fill('123');

  // 🪙 Select credit card option
  await page.locator('div', { hasText: /^Credit card$/ }).nth(1).click();

  // 🕒 Click Pay now and wait for navigation

   // Click "Pay now"
await page.getByRole('button', { name: 'Pay now' }).click();

// Wait until the URL contains "thank-you"
await page.waitForFunction(() => window.location.href.includes('thank-you'), null, { timeout: 40000 });

// Now assert the heading
await expect(page.locator('h2:has-text("Thank you, john!")')).toBeVisible({ timeout: 30000 });

console.log('✅ Order confirmation page loaded successfully!');

});
