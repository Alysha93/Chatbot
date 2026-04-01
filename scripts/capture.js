const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

(async () => {
  console.log('Starting puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();

  // Wait for localhost:3000 to be totally ready
  console.log('Capturing Landing Page...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(publicDir, 'landing.png') });

  console.log('Capturing Dashboard Overview...');
  await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(publicDir, 'dashboard.png') });

  console.log('Capturing Dashboard New Tenant...');
  await page.goto('http://localhost:3000/dashboard/new', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(publicDir, 'dashboard-new.png') });

  console.log('Screenshots captured successfully!');
  await browser.close();
})();
