const { test, expect } = require('@playwright/test');

const viewports = [
  ['laptop', 1440, 900],
  ['landscape laptop', 1280, 800],
  ['tablet', 1024, 768],
  ['portrait tablet', 768, 1024],
  ['phone', 390, 844],
  ['narrow phone', 320, 740],
];

for (const [name, width, height] of viewports) {
  test(`${name}: alternating cards, loaded diagrams and QR destinations`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    await expect(page.getByRole('heading')).toHaveCount(0);
    await expect(page.locator('header, footer, .intro, .how-to, .scan-label')).toHaveCount(0);
    await expect(page.locator('.card')).toHaveCount(2);
    await expect(page.locator('.qr-link img')).toHaveCount(2);
    await expect(page.locator('.illustration img')).toHaveCount(2);

    for (const image of await page.locator('.qr-link img, .illustration img').all()) {
      expect(await image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    }

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const group = await page.locator('.experiences').boundingBox();
    if (width >= 700) expect(group.height).toBeLessThanOrEqual(height - 48);
    if (group.height < height - 64) {
      expect(Math.abs(group.y + group.height / 2 - height / 2)).toBeLessThan(1);
    } else {
      expect(group.y).toBeGreaterThanOrEqual(0);
    }

    const lab = await page.locator('.lab').boundingBox();
    const ar = await page.locator('.ar').boundingBox();
    expect(ar.y).toBeGreaterThanOrEqual(lab.y + lab.height);
    expect(Math.abs(lab.x - ar.x)).toBeLessThan(1);

    for (const type of ['lab', 'ar']) {
      const card = page.locator(`.${type}`);
      const illustration = await card.locator('.illustration').boundingBox();
      const content = await card.locator('.card-content').boundingBox();
      const qr = await card.locator('.qr-link').boundingBox();
      const description = await card.locator('.card-description').boundingBox();
      expect(description.y).toBeGreaterThanOrEqual(qr.y + qr.height);

      if (width >= 700) {
        if (type === 'lab') {
          expect(illustration.x + illustration.width).toBeLessThanOrEqual(content.x + 1);
        } else {
          expect(content.x + content.width).toBeLessThanOrEqual(illustration.x + 1);
        }
      } else {
        expect(illustration.y + illustration.height).toBeLessThanOrEqual(content.y + 1);
      }
    }

    await expect(page.getByRole('link', { name: 'Open the interactive web laboratory' })).toHaveAttribute('href', 'https://mh613.github.io/reverse-biased-pn/');
    await expect(page.getByRole('link', { name: 'Open the AR simulation' })).toHaveAttribute('href', 'https://mh613.github.io/reverse-biased-pn/teammate/xr/ar.html');
    if (name === 'laptop') await page.screenshot({ path: '/tmp/pn-laptop.png', fullPage: true });
    if (name === 'phone') await page.screenshot({ path: '/tmp/pn-phone.png', fullPage: true });
  });
}

test('transparent light QR codes decode to the intended destinations', async ({ page }) => {
  const { PNG } = require('pngjs');
  const jsQR = require('jsqr');
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  for (const [type, url] of [
    ['lab', 'https://mh613.github.io/reverse-biased-pn/'],
    ['ar', 'https://mh613.github.io/reverse-biased-pn/teammate/xr/ar.html'],
  ]) {
    const screenshot = await page.locator(`.${type} .qr-link`).screenshot();
    const png = PNG.sync.read(screenshot);
    const decoded = jsQR(new Uint8ClampedArray(png.data), png.width, png.height, {
      inversionAttempts: 'attemptBoth',
    });
    expect(decoded, `${type} code should decode from its actual dark card background`).not.toBeNull();
    expect(decoded.data).toBe(url);
  }
});
