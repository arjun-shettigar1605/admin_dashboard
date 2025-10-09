import { chromium } from 'playwright';

let browser;
let page;

export async function initBrowser() {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  return { browser, page };
}

export async function closeBrowser() {
  if (browser) {
    await browser.close();
  }
}

export function getPage() {
  return page;
}
