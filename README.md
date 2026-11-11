# Junction Lab display

A dark, responsive, single-page companion to the PN junction lab. Vanilla HTML/CSS, original SVG illustrations, and local QR assets. The forest backdrop is an original generated image, optimized as `assets/woodland.webp`; the dark cards use a translucent surface over it. The two cards form an alternating horizontal layout: laboratory diagram on the left in the top card, AR diagram on the right in the bottom card, with QR descriptions underneath each code. On phones, each card stacks its diagram above its QR. No runtime dependencies or build step; suitable for GitHub Pages.

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

The QR assets use ivory modules on a transparent background, with four modules of quiet space preserved. The dark card supplies the contrasting background.

The web QR encodes https://mh613.github.io/reverse-biased-pn/.

The AR QR encodes https://mh613.github.io/reverse-biased-pn/teammate/xr/ar.html. Both codes also act as clickable links.

To regenerate both QR assets with their current destinations:

```sh
npm ci --cache /tmp/pn-npm-cache
npm run generate:qr
```

To change the AR destination, update the default in `scripts/generate-qr.cjs` and the AR link in `index.html`, then regenerate. `AR_URL` can override the destination for a single generation. Check generated codes with a phone before exhibition use.

If the AR simulation needs a particular marker, provide its image or link separately. Neither QR on this page is an AR tracking marker. The illustration depicts a marker-based AR experience; use the marker expected by the real simulation.

## Validation

```sh
npm ci --cache /tmp/pn-npm-cache
npm test
```

Browser tests cover alternating card layouts across six laptop, tablet, and phone viewports, loaded diagrams and QR assets, and text placement. A separate test decodes screenshots of both light-on-dark QR codes and checks their destination URLs. The configuration uses Chromium at `/usr/bin/chromium`; adjust `executablePath` for a different machine. Manrope is self-hosted in `assets/fonts` (Fontsource 5.3.0, SIL Open Font License included). No external fonts, images, or scripts are needed at runtime.
