# Junction Lab display

A dark, responsive, single-page companion to the PN junction lab. Vanilla HTML/CSS, original SVG illustrations, and local QR assets. No runtime dependencies or build step; suitable for GitHub Pages.

## Run

From this repository:

```sh
npm start
```

Serve on port 5173. Alternatively, use any static web server.

## Publish

The `Deploy to GitHub Pages` workflow publishes the static page on pushes to `main` and supports manual runs from the Actions tab. It uploads only the HTML, CSS, and assets; no dependency install or build is required.

In repository Settings → Pages → Build and deployment, select **GitHub Actions** as the source. If the initial run failed before this was configured, rerun it from the Actions tab.

Published address: https://mh613.github.io/reverse-biased-pn-qr-code/

## QR codes

The web QR already encodes https://mh613.github.io/reverse-biased-pn/.

The AR QR is explicitly marked **PREVIEW CODE** and currently encodes https://example.com/ar-placeholder. It does not launch a simulation.

To use your supplied AR QR image, save the original as `assets/ar-qr.png`, change the AR image `src` in `index.html` to that path, update its alt text, and remove the `PREVIEW CODE` span and `placeholder` class. Keep a white quiet zone around the QR. The chat image was visible but was not available as a filesystem attachment during implementation.

Alternatively, scan your image with a phone and copy the destination URL. Generate a crisp SVG with:

```sh
npm ci --cache /tmp/pn-npm-cache
AR_URL='https://your-real-ar-url' npm run generate:qr
```

Then remove the preview span/class and update the AR alt text in `index.html`. If desired, wrap the AR QR in an anchor to that destination, like the web QR. Regenerating without `AR_URL` resets the AR QR to the placeholder. Check generated codes with a phone before exhibition use.

If the AR simulation needs a particular marker, provide its image or link separately. Neither QR on this page is an AR tracking marker. The introductory AR instructions assume a marker-based experience and should be confirmed against the real simulation.

## Validation

```sh
npm ci --cache /tmp/pn-npm-cache
npm test
```

Browser tests cover laptop, landscape tablet, portrait tablet, and phone layouts, loaded QR images, and the web destination. The configuration uses Chromium at `/usr/bin/chromium`; adjust `executablePath` for a different machine. No external fonts, images, or scripts are needed at runtime.
