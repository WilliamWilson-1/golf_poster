const fs = require("fs");
const path = require("path");
const vm = require("vm");

const submitRoot = path.resolve(__dirname, "..");
const miniRoot = path.join(submitRoot, "miniprogram");
const componentRoot = path.join(miniRoot, "components", "golf-poster");

const requiredFiles = [
  "project.config.json",
  "VERSION.json",
  "README.md",
  "SOURCE-MAP.md",
  "miniprogram/app.js",
  "miniprogram/app.json",
  "miniprogram/app.wxss",
  "miniprogram/sitemap.json",
  "miniprogram/config.js",
  "miniprogram/pages/poster/index.js",
  "miniprogram/pages/poster/index.json",
  "miniprogram/pages/poster/index.wxml",
  "miniprogram/pages/poster/index.wxss",
  "miniprogram/components/golf-poster/index.js",
  "miniprogram/components/golf-poster/index.json",
  "miniprogram/components/golf-poster/index.wxml",
  "miniprogram/components/golf-poster/index.wxss",
  "miniprogram/services/segmentation.js",
  "miniprogram/utils/poster-data.js",
  "miniprogram/utils/poster-engine.js",
  "miniprogram/utils/score.js"
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(submitRoot, relativePath), "utf8");
}

function validateRequiredFiles() {
  requiredFiles.forEach((relativePath) => {
    assert(fs.existsSync(path.join(submitRoot, relativePath)), `Missing ${relativePath}`);
  });
}

function validateJson() {
  const jsonFiles = [];
  function collect(directory) {
    fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) collect(fullPath);
      else if (entry.name.endsWith(".json")) jsonFiles.push(fullPath);
    });
  }
  collect(submitRoot);
  jsonFiles.forEach((filePath) => {
    JSON.parse(fs.readFileSync(filePath, "utf8"));
  });
}

function validateJavaScriptSyntax() {
  const jsFiles = [];
  function collect(directory) {
    fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) collect(fullPath);
      else if (entry.name.endsWith(".js")) jsFiles.push(fullPath);
    });
  }
  collect(submitRoot);
  jsFiles.forEach((filePath) => {
    new vm.Script(fs.readFileSync(filePath, "utf8"), { filename: filePath });
  });
}

function validateScoreModel() {
  const data = require(path.join(miniRoot, "utils", "poster-data"));
  const score = require(path.join(miniRoot, "utils", "score"));
  assert(Object.keys(data.TEMPLATES).length === 6, "Expected six templates");
  Object.keys(data.TEMPLATES).forEach((id) => {
    const template = data.TEMPLATES[id];
    assert(template.layout.brand, `${id}: missing brand layout`);
    assert(template.layout.score, `${id}: missing score layout`);
    assert(template.layout.total, `${id}: missing total layout`);
    assert(template.layout.nickname, `${id}: missing nickname layout`);
  });

  const model = data.createPosterModel("duo", false, "GOLFBROTHERS");
  model.scoreSets.relative = score.parseScoreInput("-1 0 +1 -2", "relative");
  let result = score.calculateTotal(model);
  assert(result.count === 4, "Relative score count failed");
  assert(result.relative === -2, "Relative sum failed");
  assert(result.total === 70, "Relative-to-gross conversion failed");
  model.scoreMode = "strokes";
  model.scoreSets.strokes = score.parseScoreInput("4 4 5 3", "strokes");
  result = score.calculateTotal(model);
  assert(result.total === 16, "Stroke total failed");
}

function mockContext() {
  return {
    fillStyle: "",
    strokeStyle: "",
    font: "",
    textAlign: "",
    textBaseline: "",
    lineWidth: 1,
    globalAlpha: 1,
    imageSmoothingEnabled: true,
    save() {},
    restore() {},
    clearRect() {},
    fillRect() {},
    strokeRect() {},
    beginPath() {},
    moveTo() {},
    lineTo() {},
    closePath() {},
    fill() {},
    stroke() {},
    arc() {},
    rect() {},
    quadraticCurveTo() {},
    translate() {},
    rotate() {},
    setLineDash() {},
    drawImage() {},
    createLinearGradient() {
      return { addColorStop() {} };
    },
    measureText(text) {
      const match = String(this.font).match(/(\d+(?:\.\d+)?)px/);
      const size = match ? Number(match[1]) : 16;
      return { width: String(text).length * size * 0.58 };
    },
    fillText() {}
  };
}

function validateRenderer() {
  const data = require(path.join(miniRoot, "utils", "poster-data"));
  const engine = require(path.join(miniRoot, "utils", "poster-engine"));
  Object.keys(data.TEMPLATES).forEach((id) => {
    const model = data.createPosterModel(id, true, "GOLFBROTHERS");
    const bounds = engine.renderPoster(mockContext(), model, {
      showGuide: true,
      guideTarget: "scorecard"
    });
    assert(bounds.scorecard, `${id}: scorecard was not rendered`);
    assert(bounds.total, `${id}: total was not rendered`);
  });
}

function validateWxml() {
  const wxml = read("miniprogram/components/golf-poster/index.wxml");
  const componentJs = read("miniprogram/components/golf-poster/index.js");
  const handlers = [...wxml.matchAll(
    /\b(?:bind|catch)(?:tap|input|change|changing|touchstart|touchmove|touchend|touchcancel)="([A-Za-z_$][\w$]*)"/g
  )].map((match) => match[1]);
  const missing = [...new Set(handlers)].filter((name) => {
    return !new RegExp(`\\n\\s*(?:async\\s+)?${name}\\s*\\(`).test(componentJs);
  });
  assert(!missing.length, `Missing WXML handlers: ${missing.join(", ")}`);

  const stack = [];
  for (const match of wxml.matchAll(/<\/?([a-zA-Z][\w-]*)(?:\s[^<>]*?)?\/?\s*>/g)) {
    const raw = match[0];
    const tag = match[1];
    if (raw.startsWith("</")) {
      const expected = stack.pop();
      assert(expected === tag, `WXML tag mismatch: expected ${expected}, got ${tag}`);
    } else if (!raw.endsWith("/>")) {
      stack.push(tag);
    }
  }
  assert(!stack.length, `Unclosed WXML tags: ${stack.join(", ")}`);
}

function validateComponentMethodGraph() {
  const source = read("miniprogram/components/golf-poster/index.js");
  const calls = [...source.matchAll(/this\.(_[A-Za-z_$][\w$]*)\s*\(/g)].map((match) => match[1]);
  const definitions = [...source.matchAll(/\n\s*(?:async\s+)?(_[A-Za-z_$][\w$]*)\s*\(/g)].map((match) => match[1]);
  const missing = [...new Set(calls)].filter((name) => definitions.indexOf(name) < 0);
  assert(!missing.length, `Missing component methods: ${missing.join(", ")}`);
}

function validateComponentLifecycle() {
  let definition = null;
  global.Component = (value) => {
    definition = value;
  };
  const componentPath = path.join(componentRoot, "index.js");
  delete require.cache[require.resolve(componentPath)];
  require(componentPath);
  delete global.Component;
  assert(definition, "Component registration was not captured");

  const instance = {
    properties: {
      brand: "GOLFBROTHERS",
      initialLanguage: "zh",
      segmentationEndpoint: "",
      segmentationHeaders: {},
      segmentationQuality: "hd",
      saveToAlbum: false
    },
    data: JSON.parse(JSON.stringify(definition.data)),
    setData(patch, callback) {
      Object.entries(patch).forEach(([key, value]) => {
        const parts = key.split(".");
        let current = this.data;
        for (let index = 0; index < parts.length - 1; index += 1) {
          current = current[parts[index]];
        }
        current[parts[parts.length - 1]] = value;
      });
      if (callback) callback();
    },
    triggerEvent() {},
    createSelectorQuery() {
      throw new Error("Canvas query must not run during attached lifecycle");
    }
  };
  Object.assign(instance, definition.methods);
  definition.lifetimes.created.call(instance);
  definition.lifetimes.attached.call(instance);
  assert(instance.data.templates.length === 6, "Component templates were not initialized");
  assert(instance.data.scoreColorRows.length === 5, "Component score color rows were not initialized");
  instance.onScoreInput({ detail: { value: "-1 0 +1 -2" } });
  assert(instance.posterState.total.value === "70", "Component automatic total failed");
  instance.posterState.style.card = "#a92331";
  instance._rebuildColorControls();
  assert(instance.data.scoreColorRows.every((row) => {
    return row.options[0].locked && row.options.slice(1).every((option) => option.disabled);
  }), "Component white-only color lock failed");
}

function validateSegmentationContract() {
  const config = require(path.join(miniRoot, "config"));
  const source = read("miniprogram/services/segmentation.js");
  assert(config.segmentationQuality === "hd", "Expected HD segmentation quality");
  [
    'output: "full-frame-transparent-png"',
    'matting: "alpha"',
    'preserveFineDetails: "hair,club,limbs"',
    'edgeDecontamination: "true"'
  ].forEach((field) => {
    assert(source.includes(field), `Missing segmentation contract field: ${field}`);
  });
}

function validatePackageSize() {
  let bytes = 0;
  function collect(directory) {
    fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) collect(fullPath);
      else bytes += fs.statSync(fullPath).size;
    });
  }
  collect(miniRoot);
  assert(bytes < 2 * 1024 * 1024, `Mini Program package exceeds 2 MiB: ${bytes} bytes`);
  return bytes;
}

validateRequiredFiles();
validateJson();
validateJavaScriptSyntax();
validateScoreModel();
validateRenderer();
validateWxml();
validateComponentMethodGraph();
validateComponentLifecycle();
validateSegmentationContract();
const packageBytes = validatePackageSize();

console.log(`Validation passed. Mini Program source size: ${packageBytes} bytes.`);
