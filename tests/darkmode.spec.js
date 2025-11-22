import { test, expect } from '@playwright/test';

test.describe('Dark Mode Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');

        // Reset to light mode before each test
        await page.evaluate(() => {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'light');
        });
    });

    test('Dark mode toggle button should be visible', async ({ page }) => {
        const darkModeButton = page.locator('button:has-text("Dark Mode")');
        await expect(darkModeButton).toBeVisible();
    });

    test('Should toggle to dark mode when button is clicked', async ({ page }) => {
        const darkModeButton = page.locator('button:has-text("Dark Mode")');
        await darkModeButton.click();

        // Check that html element has dark class
        await expect(page.locator('html')).toHaveClass(/dark/);

        // Button text should change to Light Mode
        const lightModeButton = page.locator('button:has-text("Light Mode")');
        await expect(lightModeButton).toBeVisible();
    });

    test('Should toggle back to light mode', async ({ page }) => {
        // First toggle to dark mode
        const darkModeButton = page.locator('button:has-text("Dark Mode")');
        await darkModeButton.click();
        await expect(page.locator('html')).toHaveClass(/dark/);

        // Then toggle back to light mode
        const lightModeButton = page.locator('button:has-text("Light Mode")');
        await lightModeButton.click();

        // Check that html element doesn't have dark class
        const htmlClasses = await page.locator('html').getAttribute('class');
        expect(htmlClasses).not.toContain('dark');

        // Button should show Dark Mode again
        await expect(page.locator('button:has-text("Dark Mode")')).toBeVisible();
    });

    test('Should persist dark mode preference in localStorage', async ({ page }) => {
        const darkModeButton = page.locator('button:has-text("Dark Mode")');
        await darkModeButton.click();

        // Check localStorage
        const theme = await page.evaluate(() => localStorage.getItem('theme'));
        expect(theme).toBe('dark');
    });

    test('Should persist light mode preference in localStorage', async ({ page }) => {
        // Toggle to dark
        await page.locator('button:has-text("Dark Mode")').click();

        // Toggle back to light
        await page.locator('button:has-text("Light Mode")').click();

        // Check localStorage
        const theme = await page.evaluate(() => localStorage.getItem('theme'));
        expect(theme).toBe('light');
    });

    test('Should load with dark mode if preference is set', async ({ page }) => {
        // Set dark mode preference
        await page.evaluate(() => {
            localStorage.setItem('theme', 'dark');
        });

        // Reload page
        await page.reload();

        // Should load in dark mode
        await expect(page.locator('html')).toHaveClass(/dark/);
        await expect(page.locator('button:has-text("Light Mode")')).toBeVisible();
    });

    test('Should set data-theme attribute on html element', async ({ page }) => {
        // Check initial light mode
        let dataTheme = await page.locator('html').getAttribute('data-theme');
        expect(dataTheme).toBe('light');

        // Toggle to dark mode
        await page.locator('button:has-text("Dark Mode")').click();

        // Check dark mode data-theme
        dataTheme = await page.locator('html').getAttribute('data-theme');
        expect(dataTheme).toBe('dark');
    });

    test('Dark mode should work on tools page', async ({ page }) => {
        await page.goto('/tools');

        const darkModeButton = page.locator('button:has-text("Dark Mode")');
        await darkModeButton.click();

        await expect(page.locator('html')).toHaveClass(/dark/);
        await expect(page.locator('button:has-text("Light Mode")')).toBeVisible();
    });
});
