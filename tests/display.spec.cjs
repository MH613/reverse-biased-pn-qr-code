const { test, expect } = require('@playwright/test');
for (const [name, width, height] of [['laptop', 1440, 900], ['tablet', 1024, 768], ['portrait tablet', 768, 1024], ['phone', 390, 844]]) {
  test(`${name}: cards, QR assets and responsive layout`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await expect(page.getByRole('heading')).toHaveCount(0);
    await expect(page.locator('header, footer, .intro, .how-to')).toHaveCount(0);
    await expect(page.locator('.card')).toHaveCount(2);
    for (const image of await page.locator('.qr-link img').all()) {
      expect(await image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const group = await page.locator('.experiences').boundingBox();
    if (group.height < height - 64) {
      expect(Math.abs(group.y + group.height / 2 - height / 2)).toBeLessThan(1);
    } else {
      expect(group.y).toBeGreaterThanOrEqual(0);
    }
    const cards = await page.locator('.card').evaluateAll(nodes => nodes.map(n => ({ x: n.offsetLeft, y: n.offsetTop })));
    expect(width > 580 ? cards[0].y === cards[1].y : cards[1].y > cards[0].y).toBe(true);
    await expect(page.getByRole('link', { name: 'Open the interactive web laboratory' })).toHaveAttribute('href', 'https://mh613.github.io/reverse-biased-pn/');
    await expect(page.getByRole('link', { name: 'Open the AR simulation' })).toHaveAttribute('href', 'https://mh613.github.io/reverse-biased-pn/teammate/xr/ar.html');
    if (name === 'laptop') await page.screenshot({ path: '/tmp/pn-laptop.png', fullPage: true });
    if (name === 'phone') await page.screenshot({ path: '/tmp/pn-phone.png', fullPage: true });
  });
}
