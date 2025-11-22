import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Profile image should load with correct resolution', async ({ page }) => {
        const profileImage = page.locator('img[alt="Profile Image"]');
        await expect(profileImage).toBeVisible();
        await expect(profileImage).toHaveAttribute('src', /profile-300.avif/);
    });

    test('Animations should execute smoothly', async ({ page }) => {
        const animatedText = page.locator('text=I specialize in test automation');
        await expect(animatedText).toBeVisible();
    });
});
