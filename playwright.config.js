import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,  // Avoid starting another instance if one is running
    timeout: 60 * 1000,  // Wait up to 60s for the server to start
  },
  use: {
    baseURL: 'http://localhost:3000',  // Ensure Playwright knows where to navigate
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
});
