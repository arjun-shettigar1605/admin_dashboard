import { getPage } from '../utils/browser.js';

export async function login(email, password) {
  const page = getPage();
  await page.goto(process.env.WEBSITE_URL);
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  console.log('Logged in successfully');
}
