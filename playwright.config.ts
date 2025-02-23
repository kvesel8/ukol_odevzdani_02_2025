import { defineConfig, devices } from '@playwright/test';


const TIMEOUTS = {
    TEST_TIMEOUT: 90_000,
    GLOBAL_TIMEOUT: 180_000,
    ACTION_TIMEOUT: 60_000
};

const DEFAULT_VIEWPORT = {
    width: 1920,
    height: 1080
}

export default defineConfig({
    timeout: TIMEOUTS.TEST_TIMEOUT,
    globalTimeout: TIMEOUTS.GLOBAL_TIMEOUT,
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : 1,
    reporter: [
        ['html'],
        ['list'],
    ],

    use: {
      
        trace: 'retain-on-first-failure',

        testIdAttribute: 'data-testId',
        viewport: DEFAULT_VIEWPORT,
        actionTimeout: TIMEOUTS.ACTION_TIMEOUT,
        navigationTimeout: TIMEOUTS.ACTION_TIMEOUT,
        video: 'off',
        headless: true,
        ignoreHTTPSErrors: true
    },

    projects: [
        {
            name: 'chromium',
            use: { 
                ...devices['Desktop Chrome'],
             
            },      
        },
       
    ],
    
});
