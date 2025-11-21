import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://urbangents2.yeetonline.com/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: 'First Name *' }).click();
  await page.getByRole('textbox', { name: 'First Name *' }).fill('john');
  await page.getByRole('textbox', { name: 'Last Name *' }).click();
  await page.getByRole('textbox', { name: 'Last Name *' }).fill('alyy');
  await page.getByRole('textbox', { name: 'Email address *' }).click();
  await page.getByRole('textbox', { name: 'Email address *' }).fill('johnalyy@gmail.com');
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('12345678');
 
  await page.getByRole('button', { name: 'Country Code Selector' }).click();
  await page.locator('#mobile').click();
  await page.locator('#mobile').fill('+1S23456677788');
  await page.locator('#signup-country').click();
  await page.getByRole('option', { name: 'Afghanistan' }).click();
  await page.locator('#signup-state').click();
  await page.getByRole('option', { name: 'Badghis' }).click();
// signup_city
  await page.locator('#signup-city').click();
  await page.getByRole('option', { name: 'Ghormach' }).click();

  await page.getByRole('button', { name: 'REGISTER' }).click();
  // await page.goto('https://urbangents2.yeetonline.com/');
  await expect(page.locator('.alert-success')).toBeVisible({ timeout: 40000 })
  await page.goto('https://urbangents2.yeetonline.com/my-account/dashboard');;
});