import { test, expect } from '@playwright/test';
import fs from 'fs';
console.log(fs.existsSync('brac.webp'));

test('test', async ({ page }) => {
  await page.goto('https://yeetcommerce.com/', {timeout:6000,  waitUntil: 'commit'});
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Create My Free Store' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Login' }).click();
  await page1.getByRole('textbox', { name: 'Email*' }).click();
  await page1.getByRole('textbox', { name: 'Email*' }).fill('umemasfeera@gmail.com');
  await page1.getByRole('textbox', { name: 'Password*' }).click();
  await page1.getByRole('textbox', { name: 'Password*' }).fill('Musfi@next');
  await page1.getByRole('button', { name: 'Login' }).click();
  await expect(page1.getByRole('heading', { name: 'Success' })).toBeVisible({ waitUntil: "networkidle" });
  await page1.getByRole('link').filter({ hasText: /^$/ }).nth(1).click();
  await page1.locator('.tableScrollWrap').click();
  await page1.locator('#add-new-dropDown').click();
  await page1.getByRole('button', { name: 'Add New Category' }).click();
  await page1.getByRole('textbox', { name: 'Name*' }).fill('bags');
  await page1.locator('.ql-editor').fill('bags');


  await page1.getByRole('button', { name: 'Save' }).click();
  await expect(page1.getByText('The category has been')).toBeVisible();
});