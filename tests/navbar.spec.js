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
        // const menuButton = page.locator('button[aria-label="Open Menu"]');
        
        // Override to use a mobile viewport
        await page.setViewportSize({ width: 375, height: 812});

        await page.waitForFunction(() => document.readyState === 'complete');
        const menuButton = page.locator('button[aria-label="Open Menu"]');
        await expect(menuButton).toBeVisible();

        await menuButton.click();

        const mobileMenu = page.locator('.mobile-menu');
        await expect(mobileMenu).toBeVisible();

        // await expect(page.locator('nav')).toContainText('Tools');

        // Close the menu
        const closeButton = page.locator('button[aria-label="Close Menu"]');
        await expect(closeButton).toBeVisible();
        await closeButton.click();

        await page.waitForTimeout(500);
        await expect(mobileMenu).toBeHidden();
    });
     
});
