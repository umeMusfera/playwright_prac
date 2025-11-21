import { test, expect } from '@playwright/test';
import { MailSlurp } from 'mailslurp-client';
import * as dotenv from 'dotenv';
dotenv.config();


test('Signup and handle verification only if required', async ({ page })=> {
  test.setTimeout(60000); // total timeout = 3 min
const apiKey="cb3f97ba41758f01cca8f3129abf9a1932b5454ae3f742b37b30192017cac598";
  // Step 1️⃣: Setup MailSlurp (for possible verification)
  const mailslurp = new MailSlurp({ apiKey });
  const inbox = await mailslurp.createInbox();
  console.log('📧 Using temp inbox:', inbox.emailAddress);

  // Step 2️⃣: Open YeetCommerce and navigate to signup popup
  await page.goto('https://yeetcommerce.com/', { waitUntil: 'commit', timeout: 120000 });
  await page.waitForTimeout(4000);

  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Create My Free Store' }).click(),
  ]);

  await popup.waitForLoadState('domcontentloaded', { timeout: 60000 });

  // Step 3️⃣: Fill signup or login form
  await popup.getByRole('textbox', { name: 'Email*' }).fill(inbox.emailAddress);
  await popup.getByRole('button', { name: "Next" }).click();

  // Step 4️⃣: Check if verification required
  let verificationRequired = false;

  try {
    // Wait briefly to see if verification message appears
    await popup.getByText(/verification required|verify your email|enter code/i).waitFor({ timeout: 5000 });
    verificationRequired = true;
    console.log('⚠️ Verification required.');
  } catch {
    console.log('✅ No verification required, continuing...');
  }

  // Step 5️⃣: If verification required → handle OTP via MailSlurp
  if (verificationRequired) {
    console.log('⏳ Waiting for verification code email...');
    const email = await mailslurp.waitForLatestEmail(inbox.id, 60000);

    if (!email) throw new Error('❌ No verification email received.');
    console.log('📩 Email received:', email.subject);

    // Extract 4-digit code
    const otpCode = email.body?.match(/\b\d{4}\b/)?.[0];
    console.log('🔢 Extracted code:', otpCode);

    if (!otpCode) throw new Error('❌ Could not find 4-digit code in email.');

    // Fill code and verify
    await popup.getByRole('textbox', { name: /code|verification/i }).fill(otpCode);
    await popup.getByRole('button', { name: /verify|submit/i }).click();

    // Expect success message
    await expect(popup.getByText(/verified|success/i)).toBeVisible({ timeout: 60000 });
    console.log('🎉 Verification completed successfully!');
  } else {
    // If no verification, just confirm normal success flow
    await expect(popup.getByText(/success|dashboard|welcome/i)).toBeVisible({ timeout: 60000 });
    console.log('🎉 Signup completed without verification.');
  }
});
