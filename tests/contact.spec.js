import { test, expect } from '@playwright/test';

test.describe('Contact Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/#contact');
    });

    test('LinkedIn button should redirectly correctly', async ({ page, context }) => {
        const linkedInButton = page.getByRole('link', { name: 'LinkedIn' });
        await expect(linkedInButton).toBeVisible();

        let newPage;
        try {
            [newPage] = await Promise.all([
                context.waitForEvent('page', { timeout: 20000 }),
                linkedInButton.click(),
            ]);
        } catch {
            console.warn("Popup not detected, retrying...");
            await linkedInButton.click();
            [newPage] = await context.pages().slice(-1);
        }
        
        await newPage.waitForLoadState('domcontentloaded');
        await expect(newPage).toHaveURL(/linkedin.com/, { timeout: 20000 });
    });

    test('GitHub button should redirect correctly', async ({ page, context }) => {
        const githubButton = page.getByRole('link', { name: 'GitHub' });
        await expect(githubButton).toBeVisible();

        let newPage;
        try {
            [newPage] = await Promise.all([
                context.waitForEvent('page', { timeout: 20000 }),
                githubButton.click(),
            ]);
        } catch {
            console.warn("Popup not detected, retrying...");
            await githubButton.click();
            [newPage] = await context.pages().slice(-1);
        }

        await newPage.waitForLoadState('domcontentloaded');
        await expect(newPage).toHaveURL(/github.com/, { timeout: 20000 });
    });

});
