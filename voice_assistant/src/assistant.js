import dotenv from 'dotenv';
dotenv.config();

import { initBrowser, closeBrowser } from './utils/browser.js';
import { login } from './actions/login.js';

async function main() {
  try {
    await initBrowser();
    await login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);

    // Placeholder for voice command processing
    console.log('Assistant is running. Say a command!');

    // Keep the browser open for a while for demonstration
    await new Promise(resolve => setTimeout(resolve, 10000));

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await closeBrowser();
  }
}

main();
