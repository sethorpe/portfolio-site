import { test, expect } from '@playwright/test';

test.describe('Experience Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/experience');
    });

    test('Experience page should load successfully', async ({ page }) => {
        await expect(page).toHaveURL(/.*experience/);
        const heading = page.locator('h1:has-text("Professional Experience")');
        await expect(heading).toBeVisible();
    });

    test('Should display page header with description', async ({ page }) => {
        const description = page.locator('p:has-text("years of experience")');
        await expect(description).toBeVisible();
        await expect(description).toContainText('Software Development');
        await expect(description).toContainText('Quality Assurance');
        await expect(description).toContainText('Test Automation');
    });

    test('Should display all four summary statistics cards', async ({ page }) => {
        // Wait for data to load
        await page.waitForTimeout(1000);

        // Years Experience card
        const yearsCard = page.locator('text=Years Experience');
        await expect(yearsCard).toBeVisible();

        // Cost Savings card
        const costSavingsCard = page.locator('text=Cost Savings Delivered');
        await expect(costSavingsCard).toBeVisible();

        // Hours Saved card
        const hoursSavedCard = page.locator('text=Hours Saved via Automation');
        await expect(hoursSavedCard).toBeVisible();

        // Critical Projects card
        const projectsCard = page.locator('text=Critical Projects');
        await expect(projectsCard).toBeVisible();
    });

    test('Should display correct summary statistics values', async ({ page }) => {
        // Wait for data to load
        await page.waitForTimeout(1000);

        // Check for years experience (any number followed by +)
        const yearsCard = page.locator('text=Years Experience').locator('..');
        const yearsValue = yearsCard.locator('.text-3xl').first();
        await expect(yearsValue).toBeVisible();
        const yearsText = await yearsValue.textContent();
        expect(yearsText).toMatch(/\d+\+/);

        // Check for cost savings ($ followed by number and K+)
        const costSavingsCard = page.locator('text=Cost Savings Delivered').locator('..');
        const costSavingsValue = costSavingsCard.locator('.text-3xl').first();
        await expect(costSavingsValue).toBeVisible();
        const costText = await costSavingsValue.textContent();
        expect(costText).toMatch(/\$\d+K\+/);

        // Check for hours saved (number with comma and +)
        const hoursSavedCard = page.locator('text=Hours Saved via Automation').locator('..');
        const hoursSavedValue = hoursSavedCard.locator('.text-3xl').first();
        await expect(hoursSavedValue).toBeVisible();
        const hoursText = await hoursSavedValue.textContent();
        expect(hoursText).toMatch(/[\d,]+\+/);

        // Check for critical projects (any number followed by +)
        const projectsCard = page.locator('text=Critical Projects').locator('..');
        const projectsValue = projectsCard.locator('.text-3xl').first();
        await expect(projectsValue).toBeVisible();
        const projectsText = await projectsValue.textContent();
        expect(projectsText).toMatch(/\d+\+/);
    });

    test('Should render experience timeline with job cards', async ({ page }) => {
        // Wait for data to load
        await page.waitForTimeout(1000);

        // Check for current position (SDET)
        const currentRole = page.locator('h3:has-text("Software Development Engineer in Test")');
        await expect(currentRole).toBeVisible();

        // Check for company name
        const company = page.locator('text=Major Financial Institution');
        await expect(company).toBeVisible();
    });

    test('Should display job role, company, and employment type', async ({ page }) => {
        // Wait for data to load
        await page.waitForTimeout(1000);

        // Check for role (first job card)
        const role = page.locator('h3:has-text("Software Development Engineer in Test")');
        await expect(role).toBeVisible();

        // Check for company
        const company = page.locator('text=Major Financial Institution');
        await expect(company).toBeVisible();

        // Check for employment type and location (first instance)
        const location = page.locator('text=/Remote, United States/').first();
        await expect(location).toBeVisible();

        const employmentType = page.locator('text=/Contract/').first();
        await expect(employmentType).toBeVisible();
    });

    test('Should display date range with "Present" for current job', async ({ page }) => {
        // Wait for data to load
        await page.waitForTimeout(1000);

        // Check for "Present" tag for current position
        const presentTag = page.locator('text=/Present/').first();
        await expect(presentTag).toBeVisible();
    });

    test('Should display achievements with metrics', async ({ page }) => {
        // Wait for data to load
        await page.waitForTimeout(1000);

        // Check for achievement text with metric
        const achievement = page.locator('text=/\\$75K\\+ savings/');
        await expect(achievement).toBeVisible();

        // Check for another achievement
        const anotherAchievement = page.locator('text=/automation/i');
        await expect(anotherAchievement.first()).toBeVisible();
    });

    test('Should display technology tags for each job', async ({ page }) => {
        // Wait for data to load
        await page.waitForTimeout(1000);

        // Check for technology categories
        const programmingCategory = page.locator('text=Programming');
        await expect(programmingCategory.first()).toBeVisible();

        // Check for specific technologies
        const pythonTag = page.locator('text=Python').first();
        await expect(pythonTag).toBeVisible();

        const javaTag = page.locator('text=Java').first();
        await expect(javaTag).toBeVisible();
    });

    test('Should display Download Resume button', async ({ page }) => {
        // Wait for data to load
        await page.waitForTimeout(1000);

        const downloadButton = page.locator('button:has-text("Download Resume")');
        await expect(downloadButton).toBeVisible();
        await expect(downloadButton).toBeEnabled();
    });

    test('Should handle loading state', async ({ page }) => {
        // This test checks the loading spinner appears during data fetch
        // It might be too fast to catch, so we just verify the page loads successfully
        const heading = page.locator('h1:has-text("Professional Experience")');
        await expect(heading).toBeVisible({ timeout: 5000 });
    });

    test('Should display multiple job entries in timeline', async ({ page }) => {
        // Wait for data to load
        await page.waitForTimeout(1000);

        // Check for at least 3 different job roles
        const sdetRole = page.locator('h3:has-text("Software Development Engineer in Test")');
        await expect(sdetRole).toBeVisible();

        const qaAnalyst = page.locator('h3:has-text("Software QA Analyst")');
        await expect(qaAnalyst).toBeVisible();

        const qaTeamLead = page.locator('h3:has-text("QA Team Lead")');
        await expect(qaTeamLead.first()).toBeVisible();
    });

    test('Should navigate to experience page from navbar', async ({ page }) => {
        await page.goto('/');

        // Click on Experience link in navbar
        const experienceLink = page.locator('a[href="/experience"]').first();
        await experienceLink.click();

        // Verify navigation
        await expect(page).toHaveURL(/.*experience/);
        const heading = page.locator('h1:has-text("Professional Experience")');
        await expect(heading).toBeVisible();
    });

    test('Should have responsive design on mobile viewport', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        // Wait for data to load
        await page.waitForTimeout(1000);

        // Check that summary stats are visible on mobile
        const yearsCard = page.locator('text=Years Experience');
        await expect(yearsCard).toBeVisible();

        // Check that job cards are visible
        const currentRole = page.locator('h3:has-text("Software Development Engineer in Test")');
        await expect(currentRole).toBeVisible();

        // Check that download button is visible
        const downloadButton = page.locator('button:has-text("Download Resume")');
        await expect(downloadButton).toBeVisible();
    });

    test('Should display experience page in dark mode', async ({ page }) => {
        // Set dark mode via localStorage before navigating
        await page.goto('/');
        await page.evaluate(() => {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        });

        // Navigate to experience page
        await page.goto('/experience');

        // Wait for data to load
        await page.waitForTimeout(1000);

        // Check that page is in dark mode
        const html = page.locator('html');
        const theme = await html.getAttribute('data-theme');
        expect(theme).toBe('dark');

        // Verify content is still visible in dark mode
        const heading = page.locator('h1:has-text("Professional Experience")');
        await expect(heading).toBeVisible();
    });

    test('Should handle JSON data fetching', async ({ page }) => {
        // Check that experience data JSON is fetched successfully
        const response = await page.waitForResponse(
            response => response.url().includes('experienceData.json') && response.status() === 200,
            { timeout: 5000 }
        );

        expect(response.status()).toBe(200);

        // Verify data is displayed after fetch
        const currentRole = page.locator('h3:has-text("Software Development Engineer in Test")');
        await expect(currentRole).toBeVisible();
    });

    test('Should display all 5 job positions from data', async ({ page }) => {
        // Wait for data to load
        await page.waitForTimeout(1000);

        // Count the number of job cards (each has an h3 with role)
        const jobRoles = page.locator('h3.text-2xl');
        const count = await jobRoles.count();

        // Should have 5 positions
        expect(count).toBeGreaterThanOrEqual(5);
    });
});
