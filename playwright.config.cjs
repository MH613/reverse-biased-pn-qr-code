const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({ testDir: './tests', use: { baseURL: 'http://127.0.0.1:5173', launchOptions: { executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] } } });
