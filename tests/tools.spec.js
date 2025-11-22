import { test, expect } from '@playwright/test';

test.describe('Tools Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/tools');
    });

    test('Password Generator should function', async ({ page }) => {
        await page.fill('input[type="range"]', '16');
        await page.click('button:has-text("Generate Password")');
        const passwordField = page.locator('input[readonly]');
        await expect(passwordField).not.toBeEmpty();
    });

    test('Currency Converter should fetch exchange rates', async ({ page }) => {
        const fromCurrencyDropdown = page.locator('.currency-converter select').first();
        const toCurrencyDropdown = page.locator('.currency-converter select').nth(1);
        const exchangeRateText = page.locator('text=Last updated');
    
        // Ensure dropdowns exist in the DOM
        await fromCurrencyDropdown.waitFor({ state: "attached", timeout: 15000 });
        await toCurrencyDropdown.waitFor({ state: "attached", timeout: 15000 });
    
        // Click dropdown to ensure options are rendered
        await fromCurrencyDropdown.click();
        await toCurrencyDropdown.click();
    
        // Wait for exchange rate API to update the page content
        await exchangeRateText.waitFor({ state: "visible", timeout: 15000 });
    
        // Retry logic: Ensure dropdown options become visible & selectable
        await page.waitForTimeout(5000); // Give API time to update options
    
        await page.waitForSelector('select option[value="USD"]', { state: "attached", timeout: 15000 });
        await page.waitForSelector('select option[value="NGN"]', { state: "attached", timeout: 15000 });
    
        // Perform selection once options are fully available
        await fromCurrencyDropdown.selectOption({ value: "USD" });
        await toCurrencyDropdown.selectOption({ value: "NGN" });
    
        // Ensure exchange rate data is displayed
        await expect(exchangeRateText).toBeVisible({ timeout: 15000 });
    });
});
