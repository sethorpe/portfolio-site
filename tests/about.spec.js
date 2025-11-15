import { test, expect } from '@playwright/test';

test.describe('About Section Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('About section should be visible', async ({ page }) => {
        const aboutSection = page.locator('#about');
        await expect(aboutSection).toBeVisible();
    });

    test('Should display profile name from JSON data', async ({ page }) => {
        const heading = page.locator('h2:has-text("Hi, I\'m")');
        await expect(heading).toBeVisible();
        await expect(heading).toContainText('Segun');
    });

    test('Should load and display profile image', async ({ page }) => {
        const profileImage = page.locator('img[alt="Profile Image"]');
        await expect(profileImage).toBeVisible();

        // Verify image has loaded
        const isLoaded = await profileImage.evaluate((img) => img.complete && img.naturalHeight !== 0);
        expect(isLoaded).toBeTruthy();
    });

    test('Should display description text', async ({ page }) => {
        const description = page.locator('#about p:has-text("I specialize in")');
        await expect(description).toBeVisible();
        await expect(description).toContainText('test automation');
    });

    test('Should display Technical Skills section', async ({ page }) => {
        const skillsHeading = page.locator('h3:has-text("Technical Skills")');
        await expect(skillsHeading).toBeVisible();

        // Check that skills list is rendered
        const skillsList = page.locator('#about ul li');
        await expect(skillsList.first()).toBeVisible();
    });

    test('Should display Interests section', async ({ page }) => {
        const interestsHeading = page.locator('h3:has-text("Interests")');
        await expect(interestsHeading).toBeVisible();

        // Check that at least one interest tag is rendered
        const interestTags = page.locator('#about span:has-text("Test Automation"), #about span:has-text("Cloud Computing"), #about span:has-text("DevOps")');
        await expect(interestTags.first()).toBeVisible();
    });

    test('Should handle JSON data loading gracefully', async ({ page }) => {
        // Wait for the data to load - should not show "Loading..." for long
        await page.waitForTimeout(2000);

        // Loading text should not be visible after data loads
        const loadingText = page.locator('text=Loading...');
        await expect(loadingText).toBeHidden();
    });
});
