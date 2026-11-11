# Junction Lab display

A dark, responsive, single-page companion to the PN junction lab. Vanilla HTML/CSS, original SVG illustrations, and local QR assets. The forest backdrop is an original generated image, optimized as `assets/woodland.webp`; the dark cards use a translucent surface over it. No runtime dependencies or build step; suitable for GitHub Pages.

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

The AR QR encodes https://mh613.github.io/reverse-biased-pn/teammate/xr/ar.html. Both codes also act as clickable links.

To regenerate both QR assets with their current destinations:

```sh
npm ci --cache /tmp/pn-npm-cache
npm run generate:qr
```

To change the AR destination, update the default in `scripts/generate-qr.cjs` and the AR link in `index.html`, then regenerate. `AR_URL` can override the destination for a single generation. Check generated codes with a phone before exhibition use.

If the AR simulation needs a particular marker, provide its image or link separately. Neither QR on this page is an AR tracking marker. The introductory AR instructions assume a marker-based experience and should be confirmed against the real simulation.

## Validation

```sh
npm ci --cache /tmp/pn-npm-cache
npm test
```

Browser tests cover laptop, landscape tablet, portrait tablet, and phone layouts, loaded QR images, and the web destination. The configuration uses Chromium at `/usr/bin/chromium`; adjust `executablePath` for a different machine. Manrope is self-hosted in `assets/fonts` (Fontsource 5.3.0, SIL Open Font License included). No external fonts, images, or scripts are needed at runtime.
