import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: process.env.CI 
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: true,  // Avoid starting another instance if one is running
        timeout: 60 * 1000,  // Wait up to 60s for the server to start
      },
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',  // Ensure Playwright knows where to navigate
    headless: true,  // Run tests in headless mode
    viewport: { width: 1280, height: 720 },  // Set default viewport size
    ignoreHTTPSErrors: true,  // Ignore HTTPS errors if any
    deviceScaleFactor: 1, // Ensure screenshots are consistent
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium'}
    },
  ],
  reporter: [
    ['list'],
    ['./playwright.debug-reporter.js']
  ],

  // CI/CD Enhancements
  timeout: 30 * 1000,  // Reduce timeout to 30s for faster feedback
  retries: process.env.CI ? 2 : 0,  // Retry failed tests in CI
  workers: process.env.CI ? 1 : undefined, // Limit workers to 1 in CI
});
