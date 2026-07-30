# Web / Mini Program Source Map

This package is a native port, not an embedded webpage. Shared behavior must be updated in both implementations.

| Web source | Mini Program source | Responsibility |
| --- | --- | --- |
| `../app.js` template and palette constants | `miniprogram/utils/poster-data.js` | Template names, geometry, defaults, palettes, fonts |
| `../app.js` score parsing | `miniprogram/utils/score.js` | Strokes, to-par values, automatic gross total |
| `../app.js` `renderScene` and drawing helpers | `miniprogram/utils/poster-engine.js` | Canvas layers, scorecard, markers, brand, stickers |
| `../app.js` controls and gestures | `miniprogram/components/golf-poster/index.js` | Workflow, state, touch targets, uploads, export |
| `../index.html` | `miniprogram/components/golf-poster/index.wxml` | Editor structure |
| `../styles.css` | `miniprogram/components/golf-poster/index.wxss` | Mobile interface styling |
| MediaPipe browser loader | `miniprogram/services/segmentation.js` | Native HTTPS segmentation adapter |

After every synchronized update:

1. Increase `packageVersion` in `VERSION.json`.
2. Update `updatedAt` and `webBaselineCommit`.
3. Add a changelog entry.
4. Run `node submit/scripts/validate.js`.
5. Import `submit/` in WeChat DevTools and perform one device preview before delivery.
