import { test, expect } from '@playwright/test';

test.describe('Navbar Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Navbar should be visible on page load', async ({ page }) => {
        await expect(page.locator('nav')).toBeVisible();
    });

    test('Navbar links should navigate correctly', async ({ page }) => {
        await page.click('text=About');
        await expect(page).toHaveURL(/#about/);

        await page.click('text=Tools');
        await expect(page).toHaveURL('/tools');

        await page.click('text=Contact');
        await expect(page).toHaveURL(/#contact/);
    });

    test('Dark mode toggle should work', async ({ page }) => {
        await page.click('button >> text="🌙 Dark Mode"');
        await expect(page.locator('html')).toHaveClass(/dark/);
    });

    test('Mobile menu should open and close', async ({ page }) => {
        // Set mobile viewport before navigation
        await page.setViewportSize({ width: 375, height: 812});

        // Reload page with mobile viewport
        await page.goto('/');

        // Wait for page to be ready
        await page.waitForLoadState('domcontentloaded');

        const menuButton = page.locator('button[aria-label="Open Menu"]');
        await expect(menuButton).toBeVisible();

        // Open menu
        await menuButton.click();

        // Wait for animation and verify menu is visible
        const mobileMenu = page.locator('.mobile-menu');
        await expect(mobileMenu).toBeVisible({ timeout: 1000 });

        // Verify menu contains navigation links
        await expect(mobileMenu).toContainText('About');
        await expect(mobileMenu).toContainText('Tools');
        await expect(mobileMenu).toContainText('Contact');

        // Close the menu
        const closeButton = page.locator('button[aria-label="Close Menu"]');
        await expect(closeButton).toBeVisible();
        await closeButton.click();

        // Wait for exit animation and verify menu is hidden
        await page.waitForTimeout(500);
        await expect(mobileMenu).toBeHidden();
    });
     
});
