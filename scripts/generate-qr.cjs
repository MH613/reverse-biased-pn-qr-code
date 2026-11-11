const QRCode = require('qrcode');
const fs = require('node:fs/promises');
const webUrl = 'https://mh613.github.io/reverse-biased-pn/';
const arUrl = process.env.AR_URL || 'https://mh613.github.io/reverse-biased-pn/teammate/xr/ar.html';
(async () => {
  for (const [name, url] of [['web', webUrl], ['ar', arUrl]]) {
    if (!/^https:\/\//.test(url)) throw new Error('QR destinations must use HTTPS');
    await fs.writeFile(`assets/${name}-qr.svg`, await QRCode.toString(url, {
      type: 'svg', errorCorrectionLevel: 'M', margin: 4, color: { dark: '#e7eadc', light: '#00000000' }
    }));
  }
})();
