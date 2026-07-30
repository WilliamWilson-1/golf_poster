# Repository Delivery Rule

The web editor and the native WeChat Mini Program delivery must stay aligned.

When changing `app.js`, `index.html`, or `styles.css`, review and update the corresponding files under `submit/miniprogram/` in the same change:

- Template geometry, palettes, score rules, and defaults:
  `submit/miniprogram/utils/poster-data.js`
- Canvas composition and score marker rendering:
  `submit/miniprogram/utils/poster-engine.js`
- Score parsing and automatic totals:
  `submit/miniprogram/utils/score.js`
- Workflow, controls, gestures, uploads, stickers, and export:
  `submit/miniprogram/components/golf-poster/`
- Person segmentation integration:
  `submit/miniprogram/services/segmentation.js`

Update `submit/VERSION.json` and `submit/CHANGELOG.md`, then run:

```powershell
node submit/scripts/validate.js
```

Do not replace the native Mini Program delivery with a `web-view`.
