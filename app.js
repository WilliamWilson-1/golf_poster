const canvas = document.getElementById("posterCanvas");
const ctx = canvas.getContext("2d");

const elements = {
  photoInput: document.getElementById("photoInput"),
  languageSelect: document.getElementById("languageSelect"),
  nickname: document.getElementById("nickname"),
  nicknameFontSize: document.getElementById("nicknameFontSize"),
  nicknameFontSizeValue: document.getElementById("nicknameFontSizeValue"),
  nicknameColor: document.getElementById("nicknameColor"),
  club: document.getElementById("club"),
  clubFontSize: document.getElementById("clubFontSize"),
  clubFontSizeValue: document.getElementById("clubFontSizeValue"),
  clubColor: document.getElementById("clubColor"),
  scoreInput: document.getElementById("scoreInput"),
  badgeText: document.getElementById("badgeText"),
  highlightInput: document.getElementById("highlightInput"),
  scoreTableColor: document.getElementById("scoreTableColor"),
  totalScore: document.getElementById("totalScore"),
  totalFontSize: document.getElementById("totalFontSize"),
  totalFontSizeValue: document.getElementById("totalFontSizeValue"),
  totalColor: document.getElementById("totalColor"),
  autoTotal: document.getElementById("autoTotal"),
  totalHint: document.getElementById("totalHint"),
  totalOpacity: document.getElementById("totalOpacity"),
  totalY: document.getElementById("totalY"),
  extraInfo: document.getElementById("extraInfo"),
  extraFontSize: document.getElementById("extraFontSize"),
  extraFontSizeValue: document.getElementById("extraFontSizeValue"),
  extraColor: document.getElementById("extraColor"),
  brandText: document.getElementById("brandText"),
  englishFont: document.getElementById("englishFont"),
  numberFont: document.getElementById("numberFont"),
  zoomRange: document.getElementById("zoomRange"),
  zoomValue: document.getElementById("zoomValue"),
  backgroundBlur: document.getElementById("backgroundBlur"),
  backgroundBlurValue: document.getElementById("backgroundBlurValue"),
  resetZoom: document.getElementById("resetZoom"),
  downloadPoster: document.getElementById("downloadPoster"),
  resetPoster: document.getElementById("resetPoster"),
  segmentationStatus: document.getElementById("segmentationStatus"),
  recognitionDetail: document.getElementById("recognitionDetail"),
  retrySegmentation: document.getElementById("retrySegmentation")
};

const posterSize = 1080;
const topBarHeight = 72;
const defaultScoreBox = { x: 128, y: 840, w: 824, h: 168 };
const scoreBox = { ...defaultScoreBox };
const fontStacks = {
  english: {
    clean: '"Trebuchet MS", ui-sans-serif, system-ui, Arial, sans-serif',
    sport: 'Impact, Haettenschweiler, "Arial Narrow Bold", fantasy',
    rounded: '"Arial Rounded MT Bold", ui-rounded, "Trebuchet MS", sans-serif',
    classic: 'Georgia, "Times New Roman", ui-serif, serif',
    mono: 'Consolas, "Courier New", ui-monospace, monospace'
  },
  number: {
    power: '"Arial Black", Impact, ui-sans-serif, sans-serif',
    condensed: 'Impact, Haettenschweiler, "Arial Narrow Bold", fantasy',
    geometric: '"Trebuchet MS", ui-rounded, ui-sans-serif, sans-serif',
    classic: 'Georgia, "Times New Roman", ui-serif, serif',
    mono: 'Consolas, "Courier New", ui-monospace, monospace'
  }
};
const translations = {
  zh: {
    pageTitle: "GOLFBROTHERS 海报工作室",
    pageDescription: "上传照片并生成可下载的高尔夫成绩海报",
    languageLabel: "界面语言",
    posterPreview: "海报预览",
    posterCanvas: "海报预览画布",
    posterEditor: "海报编辑",
    editorSections: "编辑项目",
    resetPoster: "清空海报",
    uploadPhoto: "上传照片",
    downloadPoster: "下载海报",
    statusIdle: "上传照片后自动识别人像",
    statusLoading: "正在自动识别人像…",
    statusPerson: "已识别人像，总成绩将置于人物后方",
    statusFallback: "未识别到人物，总成绩将直接覆盖照片",
    tabProfile: "昵称",
    tabScores: "成绩表",
    tabTotal: "总成绩",
    tabExtra: "额外信息",
    tabPhoto: "图片",
    nickname: "昵称",
    nicknameSize: "昵称字号",
    nicknameColor: "昵称颜色",
    club: "俱乐部",
    clubSize: "俱乐部字号",
    clubColor: "俱乐部颜色",
    scoreTable: "成绩表",
    scorePlaceholder: "输入最多 18 洞成绩，用空格或逗号分隔",
    badge: "圆形标记",
    highlightHoles: "高亮洞号",
    highlightPlaceholder: "例如 3,6",
    scoreTableColor: "成绩表底色",
    totalScore: "总成绩",
    autoTotal: "自动统计",
    totalHintEmpty: "录入成绩后自动合计",
    totalHintManual: "自动统计已关闭，可手动输入",
    totalHintCount: "已统计 {count} 洞",
    totalSize: "总分字号",
    totalColor: "总分颜色",
    totalOpacity: "总成绩透明度",
    totalHeight: "总成绩高度",
    extraInfo: "额外信息",
    extraSize: "额外信息字号",
    extraColor: "信息颜色",
    brandText: "品牌文字",
    englishFont: "英文字体",
    fontClean: "清晰无衬线",
    fontSport: "竞技窄体",
    fontRounded: "轻快圆体",
    fontClassic: "经典衬线",
    fontMono: "等宽字形",
    numberFont: "数字字体",
    numberPower: "力量黑体",
    numberCondensed: "紧凑比分",
    numberGeometric: "几何数字",
    numberClassic: "经典数字",
    numberMono: "等宽记分",
    backgroundSize: "背景大小",
    resetLayout: "复位背景与海报元素",
    backgroundBlur: "背景模糊",
    subjectDepth: "人物景深",
    waitingPhoto: "等待上传照片",
    retryRecognition: "重新识别",
    analyzingPhoto: "正在分析照片中的人物主体",
    personRatio: "人物占画面约 {percent}%",
    noClearPerson: "画面中没有足够清晰的人物主体",
    recognitionUnavailable: "自动识别不可用，已切换为普通叠加"
  },
  en: {
    pageTitle: "GOLFBROTHERS Poster Studio",
    pageDescription: "Upload a photo and create a downloadable golf score poster",
    languageLabel: "Interface language",
    posterPreview: "Poster preview",
    posterCanvas: "Poster preview canvas",
    posterEditor: "Poster editor",
    editorSections: "Editor sections",
    resetPoster: "Clear poster",
    uploadPhoto: "UPLOAD PHOTO",
    downloadPoster: "DOWNLOAD",
    statusIdle: "Upload a photo to detect the subject",
    statusLoading: "Detecting subject…",
    statusPerson: "Subject detected; total score will sit behind the player",
    statusFallback: "No subject detected; total score will overlay the photo",
    tabProfile: "PLAYER",
    tabScores: "SCORES",
    tabTotal: "TOTAL",
    tabExtra: "DETAILS",
    tabPhoto: "IMAGE",
    nickname: "Player name",
    nicknameSize: "Name size",
    nicknameColor: "Name color",
    club: "Club",
    clubSize: "Club size",
    clubColor: "Club color",
    scoreTable: "Scorecard",
    scorePlaceholder: "Enter up to 18 scores, separated by spaces or commas",
    badge: "Round badge",
    highlightHoles: "Highlight holes",
    highlightPlaceholder: "e.g. 3,6",
    scoreTableColor: "Scorecard color",
    totalScore: "Total score",
    autoTotal: "Auto total",
    totalHintEmpty: "Scores will be totaled automatically",
    totalHintManual: "Auto total is off; enter a total manually",
    totalHintCount: "{count} holes counted",
    totalSize: "Total size",
    totalColor: "Total color",
    totalOpacity: "Total opacity",
    totalHeight: "Total position",
    extraInfo: "Additional info",
    extraSize: "Info size",
    extraColor: "Info color",
    brandText: "Brand text",
    englishFont: "Text font",
    fontClean: "Clean Sans",
    fontSport: "Sport Condensed",
    fontRounded: "Rounded",
    fontClassic: "Classic Serif",
    fontMono: "Monospace",
    numberFont: "Number font",
    numberPower: "Power Black",
    numberCondensed: "Condensed Score",
    numberGeometric: "Geometric",
    numberClassic: "Classic Numerals",
    numberMono: "Monospace Score",
    backgroundSize: "Background size",
    resetLayout: "Reset background and poster elements",
    backgroundBlur: "Background blur",
    subjectDepth: "Subject depth",
    waitingPhoto: "Waiting for a photo",
    retryRecognition: "RETRY",
    analyzingPhoto: "Analyzing the subject in this photo",
    personRatio: "Subject covers about {percent}% of the frame",
    noClearPerson: "No clear person was found in the frame",
    recognitionUnavailable: "Subject detection unavailable; using standard overlay"
  }
};
const emptyValues = {
  nickname: "",
  club: "",
  scoreInput: "",
  badgeText: "",
  highlightInput: "",
  totalScore: "",
  extraInfo: ""
};

let uploadedImage = null;
let subjectMaskSource = null;
let segmentationState = "idle";
let segmentationToken = 0;
let selfieSegmenter = null;
let segmentationLibraryPromise = null;
let pendingSegmentationResolve = null;
let segmentationQueue = Promise.resolve();
let dragState = null;
let elementDragState = null;
let selectedElement = null;
let activeEditorTab = "profile";
let currentLanguage = "zh";
let recognitionDetailState = { key: "waitingPhoto", params: {} };
let elementPositions = createDefaultElementPositions();
const elementBounds = {};
let imageState = {
  scale: 1,
  offsetX: 0,
  offsetY: 0
};

function createDefaultElementPositions() {
  return {
    total: { x: posterSize / 2 },
    nickname: { x: defaultScoreBox.x + 12, y: defaultScoreBox.y - 30 },
    club: { x: defaultScoreBox.x + defaultScoreBox.w - 12, y: defaultScoreBox.y - 30 },
    extra: { x: posterSize / 2, y: defaultScoreBox.y + defaultScoreBox.h + 39 }
  };
}

function resetElementPositions() {
  elementPositions = createDefaultElementPositions();
  scoreBox.x = defaultScoreBox.x;
  scoreBox.y = defaultScoreBox.y;
  elements.totalY.value = "300";
  selectedElement = null;
}

function translate(key, params = {}) {
  const dictionary = translations[currentLanguage] || translations.zh;
  let value = dictionary[key] || translations.zh[key] || key;
  Object.entries(params).forEach(([name, replacement]) => {
    value = value.split(`{${name}}`).join(String(replacement));
  });
  return value;
}

function loadLanguagePreference() {
  try {
    const stored = window.localStorage.getItem("golf-poster-language");
    return stored === "en" ? "en" : "zh";
  } catch (error) {
    return "zh";
  }
}

function applyLanguage(language, persist = true) {
  currentLanguage = language === "en" ? "en" : "zh";
  document.documentElement.lang = currentLanguage === "en" ? "en" : "zh-CN";
  elements.languageSelect.value = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = translate(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const value = translate(element.dataset.i18nTitle);
    element.title = value;
    element.setAttribute("aria-label", value);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", translate(element.dataset.i18nAria));
  });

  document.title = translate("pageTitle");
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = translate("pageDescription");
  }

  if (persist) {
    try {
      window.localStorage.setItem("golf-poster-language", currentLanguage);
    } catch (error) {
      // Language switching still works when local storage is unavailable.
    }
  }

  updateTotalHintText();
  refreshRecognitionText();
  updateFontPreviews();
  renderPoster();
}

function getEnglishFont() {
  return fontStacks.english[elements.englishFont.value] || fontStacks.english.clean;
}

function getNumberFont() {
  return fontStacks.number[elements.numberFont.value] || fontStacks.number.power;
}

function updateFontPreviews() {
  elements.englishFont.style.fontFamily = getEnglishFont();
  elements.numberFont.style.fontFamily = getNumberFont();
}

function updateStyleOutputs() {
  elements.nicknameFontSizeValue.textContent = `${elements.nicknameFontSize.value}px`;
  elements.clubFontSizeValue.textContent = `${elements.clubFontSize.value}px`;
  elements.totalFontSizeValue.textContent = `${elements.totalFontSize.value}px`;
  elements.extraFontSizeValue.textContent = `${elements.extraFontSize.value}px`;
}

function roundedRect(context, x, y, w, h, radius) {
  const r = Math.min(radius, w / 2, h / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + w, y, x + w, y + h, r);
  context.arcTo(x + w, y + h, x, y + h, r);
  context.arcTo(x, y + h, x, y, r);
  context.arcTo(x, y, x + w, y, r);
  context.closePath();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function parseScores() {
  const values = elements.scoreInput.value
    .split(/[\s,，、|]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 18);

  while (values.length < 18) {
    values.push("");
  }

  return values;
}

function getNumericScores() {
  return elements.scoreInput.value
    .split(/[\s,，、|]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 18)
    .map((item) => Number(item))
    .filter((score) => Number.isFinite(score));
}

function updateTotalHintText() {
  if (!elements.autoTotal.checked) {
    elements.totalHint.textContent = translate("totalHintManual");
    return;
  }
  const count = getNumericScores().length;
  elements.totalHint.textContent = count
    ? translate("totalHintCount", { count })
    : translate("totalHintEmpty");
}

function updateAutoTotal() {
  const automatic = elements.autoTotal.checked;
  elements.totalScore.readOnly = automatic;
  elements.totalScore.classList.toggle("is-auto", automatic);

  if (!automatic) {
    updateTotalHintText();
    renderPoster();
    return;
  }

  const numericScores = getNumericScores();
  const total = numericScores.reduce((sum, score) => sum + score, 0);
  elements.totalScore.value = numericScores.length ? String(Math.round(total * 10) / 10) : "";
  updateTotalHintText();
  renderPoster();
}

function updateZoomOutput() {
  elements.zoomValue.textContent = `${elements.zoomRange.value}%`;
}

function updateBackgroundBlurOutput() {
  elements.backgroundBlurValue.textContent = `${elements.backgroundBlur.value}px`;
}

function parseHighlights() {
  return new Set(
    elements.highlightInput.value
      .split(/[\s,，、|]+/)
      .map((item) => Number.parseInt(item, 10))
      .filter((num) => Number.isFinite(num) && num >= 1 && num <= 18)
  );
}

function drawCoverAsset(context, asset, x, y, w, h) {
  const assetWidth = asset.naturalWidth || asset.videoWidth || asset.width;
  const assetHeight = asset.naturalHeight || asset.videoHeight || asset.height;
  const cover = Math.max(w / assetWidth, h / assetHeight) * imageState.scale;
  const drawW = assetWidth * cover;
  const drawH = assetHeight * cover;
  const drawX = x + (w - drawW) / 2 + imageState.offsetX;
  const drawY = y + (h - drawH) / 2 + imageState.offsetY;
  context.drawImage(asset, drawX, drawY, drawW, drawH);
}

function drawBackgroundImage(context) {
  const blur = Number(elements.backgroundBlur.value);
  context.save();
  if (blur > 0) {
    context.filter = `blur(${blur}px)`;
  }
  drawCoverAsset(context, uploadedImage, 0, topBarHeight, posterSize, posterSize - topBarHeight);
  context.restore();
}

function drawPlaceholder(context) {
  context.fillStyle = "#082e4c";
  context.fillRect(0, topBarHeight, posterSize, posterSize - topBarHeight);

  context.fillStyle = "#0d3c5e";
  context.fillRect(0, 660, posterSize, posterSize - 660);
  context.fillStyle = "#ffd100";
  context.fillRect(74, 618, 160, 7);
  context.fillStyle = "rgba(255,255,255,0.12)";
  context.fillRect(74, 638, 330, 3);
}

function drawBrand(context) {
  context.fillStyle = "#000";
  context.fillRect(0, 0, posterSize, topBarHeight);

  context.save();
  context.translate(74, 20);
  context.fillStyle = "#fff";
  context.fillRect(0, -4, 5, 43);
  context.fillStyle = "#c59c35";
  context.beginPath();
  context.moveTo(7, -2);
  context.lineTo(52, 11);
  context.lineTo(7, 24);
  context.closePath();
  context.fill();
  context.restore();

  const brand = elements.brandText.value.trim() || "GOLFBROTHERS";
  const splitPoint = brand.toUpperCase().startsWith("GOLF") ? 4 : Math.max(4, Math.floor(brand.length * 0.45));
  const first = brand.slice(0, splitPoint).toUpperCase();
  const second = brand.slice(splitPoint).toUpperCase();

  context.textBaseline = "middle";
  context.textAlign = "left";
  context.font = "italic 900 40px Arial, sans-serif";
  context.fillStyle = "#fff";
  context.fillText(first, 146, 37);
  context.fillStyle = "#c99c32";
  context.fillText(second, 146 + context.measureText(first).width, 37);
}

function drawTotalScore(context) {
  const score = elements.totalScore.value.trim();
  if (!score) {
    return;
  }

  const opacity = Number(elements.totalOpacity.value) / 100;
  const x = elementPositions.total.x;
  const y = Number(elements.totalY.value);
  let fontSize = Number(elements.totalFontSize.value);

  context.save();
  context.globalAlpha = opacity;
  context.fillStyle = elements.totalColor.value;
  context.font = `950 ${fontSize}px ${getNumberFont()}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  while (fontSize > 120 && context.measureText(score).width > posterSize - 140) {
    fontSize -= 4;
    context.font = `950 ${fontSize}px ${getNumberFont()}`;
  }
  const textWidth = context.measureText(score).width;
  context.fillText(score, x, y);
  elementBounds.total = {
    x: x - textWidth / 2 - 18,
    y: y - fontSize * 0.52 - 18,
    w: textWidth + 36,
    h: fontSize * 1.04 + 36
  };
  context.restore();
}

function drawSubjectOverlay(context) {
  if (!uploadedImage || segmentationState !== "person" || !subjectMaskSource) {
    return;
  }

  const layerCanvas = document.createElement("canvas");
  layerCanvas.width = posterSize;
  layerCanvas.height = posterSize;
  const layerCtx = layerCanvas.getContext("2d");
  drawCoverAsset(layerCtx, uploadedImage, 0, topBarHeight, posterSize, posterSize - topBarHeight);
  layerCtx.globalCompositeOperation = "destination-in";
  drawCoverAsset(layerCtx, subjectMaskSource, 0, topBarHeight, posterSize, posterSize - topBarHeight);
  context.drawImage(layerCanvas, 0, 0);
}

function fitText(context, text, maxWidth, startingSize, minimumSize, fontFamily) {
  let size = startingSize;
  while (size > minimumSize) {
    context.font = `900 ${size}px ${fontFamily}`;
    if (context.measureText(text).width <= maxWidth) {
      break;
    }
    size -= 2;
  }
  context.font = `900 ${size}px ${fontFamily}`;
  return size;
}

function drawLabels(context) {
  const nickname = elements.nickname.value.trim();
  const club = elements.club.value.trim();
  const extra = elements.extraInfo.value.trim();

  context.save();
  context.shadowColor = "rgba(0,0,0,0.38)";
  context.shadowBlur = 10;
  context.shadowOffsetY = 2;
  context.textBaseline = "alphabetic";

  if (nickname) {
    const position = elementPositions.nickname;
    context.fillStyle = elements.nicknameColor.value;
    context.textAlign = "left";
    const fontSize = fitText(context, nickname, 270, Number(elements.nicknameFontSize.value), 14, getEnglishFont());
    const textWidth = context.measureText(nickname).width;
    context.fillText(nickname, position.x, position.y);
    elementBounds.nickname = {
      x: position.x - 10,
      y: position.y - fontSize - 10,
      w: textWidth + 20,
      h: fontSize + 20
    };
  }

  if (club) {
    const position = elementPositions.club;
    context.fillStyle = elements.clubColor.value;
    context.textAlign = "right";
    const fontSize = fitText(context, club, 460, Number(elements.clubFontSize.value), 14, getEnglishFont());
    const textWidth = context.measureText(club).width;
    context.fillText(club, position.x, position.y);
    elementBounds.club = {
      x: position.x - textWidth - 10,
      y: position.y - fontSize - 10,
      w: textWidth + 20,
      h: fontSize + 20
    };
  }

  if (extra) {
    const position = elementPositions.extra;
    const text = extra.toUpperCase();
    context.fillStyle = elements.extraColor.value;
    const fontSize = fitText(context, text, 860, Number(elements.extraFontSize.value), 12, getEnglishFont());
    const textWidth = context.measureText(text).width;
    context.globalAlpha = 0.9;
    context.textAlign = "center";
    context.fillText(text, position.x, position.y);
    elementBounds.extra = {
      x: position.x - textWidth / 2 - 10,
      y: position.y - fontSize - 10,
      w: textWidth + 20,
      h: fontSize + 20
    };
  }
  context.restore();
}

function drawScoreCard(context) {
  const scores = parseScores();
  const highlights = parseHighlights();
  const badge = elements.badgeText.value.trim();
  const hasScoreContent = scores.some(Boolean) || Boolean(badge);

  if (!hasScoreContent) {
    return;
  }

  elementBounds.scoreCard = {
    x: scoreBox.x,
    y: scoreBox.y,
    w: scoreBox.w,
    h: scoreBox.h
  };

  context.save();
  context.globalAlpha = 0.84;
  context.fillStyle = elements.scoreTableColor.value;
  context.fillRect(scoreBox.x, scoreBox.y, scoreBox.w, scoreBox.h);
  context.globalAlpha = 1;

  context.strokeStyle = "rgba(215, 197, 75, 0.92)";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(scoreBox.x, scoreBox.y + scoreBox.h / 2);
  context.lineTo(scoreBox.x + scoreBox.w, scoreBox.y + scoreBox.h / 2);
  context.stroke();

  const cellW = scoreBox.w / 9;
  const rowYs = [scoreBox.y + 55, scoreBox.y + 136];
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `900 42px ${getNumberFont()}`;

  scores.forEach((score, index) => {
    const row = index < 9 ? 0 : 1;
    const col = index % 9;
    const x = scoreBox.x + cellW * col + cellW / 2;
    const y = rowYs[row];
    const hole = index + 1;

    if (score && highlights.has(hole)) {
      context.strokeStyle = "rgba(215, 197, 75, 0.95)";
      context.lineWidth = 3;
      context.strokeRect(x - 28, y - 31, 56, 62);
    }

    if (hole === 1 && badge) {
      context.strokeStyle = "rgba(221, 226, 78, 0.95)";
      context.lineWidth = 3;
      context.beginPath();
      context.arc(x, y, 29, 0, Math.PI * 2);
      context.stroke();
      context.beginPath();
      context.arc(x, y, 20, 0, Math.PI * 2);
      context.stroke();
      context.fillStyle = "#fff";
      context.font = `900 30px ${getNumberFont()}`;
      context.fillText(badge, x, y + 1);
      context.font = `900 42px ${getNumberFont()}`;
      return;
    }

    if (score) {
      context.fillStyle = "#fff";
      context.fillText(score, x, y);
    }
  });

  context.restore();
}

function drawSelectionGuide(context) {
  if (activeEditorTab !== "photo" || !selectedElement || !elementBounds[selectedElement]) {
    return;
  }

  const bounds = elementBounds[selectedElement];
  const x = Math.max(5, bounds.x - 5);
  const y = Math.max(topBarHeight + 5, bounds.y - 5);
  const w = Math.min(posterSize - x - 5, bounds.w + 10);
  const h = Math.min(posterSize - y - 5, bounds.h + 10);

  context.save();
  context.strokeStyle = "rgba(0,29,55,0.88)";
  context.lineWidth = 8;
  context.strokeRect(x, y, w, h);
  context.setLineDash([16, 10]);
  context.strokeStyle = "#ffd100";
  context.lineWidth = 4;
  context.strokeRect(x, y, w, h);
  context.restore();
}

function renderPoster({ exporting = false } = {}) {
  Object.keys(elementBounds).forEach((key) => delete elementBounds[key]);
  ctx.clearRect(0, 0, posterSize, posterSize);
  ctx.save();
  roundedRect(ctx, 0, 0, posterSize, posterSize, 26);
  ctx.clip();

  if (uploadedImage) {
    drawBackgroundImage(ctx);
  } else {
    drawPlaceholder(ctx);
  }

  const bottomGradient = ctx.createLinearGradient(0, 610, 0, posterSize);
  bottomGradient.addColorStop(0, "rgba(0,0,0,0)");
  bottomGradient.addColorStop(1, "rgba(0,0,0,0.44)");
  ctx.fillStyle = bottomGradient;
  ctx.fillRect(0, 610, posterSize, 470);

  drawTotalScore(ctx);
  drawSubjectOverlay(ctx);
  drawLabels(ctx);
  drawScoreCard(ctx);
  drawBrand(ctx);

  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.lineWidth = 4;
  roundedRect(ctx, 2, 2, posterSize - 4, posterSize - 4, 26);
  ctx.stroke();
  if (!exporting) {
    drawSelectionGuide(ctx);
  }
  ctx.restore();
}

function refreshRecognitionText() {
  const statusKeys = {
    idle: "statusIdle",
    loading: "statusLoading",
    person: "statusPerson",
    fallback: "statusFallback"
  };
  elements.segmentationStatus.textContent = translate(statusKeys[segmentationState]);
  elements.recognitionDetail.textContent = translate(
    recognitionDetailState.key,
    recognitionDetailState.params
  );
}

function updateRecognitionStatus(state, detailKey, params = {}) {
  segmentationState = state;
  recognitionDetailState = { key: detailKey, params };
  elements.segmentationStatus.dataset.state = state;
  refreshRecognitionText();
  elements.retrySegmentation.disabled = !uploadedImage || state === "loading";
  renderPoster();
}

function copySegmentationMask(mask) {
  const source = document.createElement("canvas");
  source.width = mask.width || uploadedImage.naturalWidth;
  source.height = mask.height || uploadedImage.naturalHeight;
  source.getContext("2d").drawImage(mask, 0, 0, source.width, source.height);
  return source;
}

function measureMask(maskCanvas) {
  const sample = document.createElement("canvas");
  sample.width = 160;
  sample.height = 160;
  const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
  sampleCtx.drawImage(maskCanvas, 0, 0, sample.width, sample.height);
  const pixels = sampleCtx.getImageData(0, 0, sample.width, sample.height).data;

  let varyingAlpha = false;
  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] < 250) {
      varyingAlpha = true;
      break;
    }
  }

  let strongPixels = 0;
  let weightedTotal = 0;
  const pixelCount = pixels.length / 4;
  for (let i = 0; i < pixels.length; i += 4) {
    const confidence = varyingAlpha
      ? pixels[i + 3] / 255
      : (pixels[i] + pixels[i + 1] + pixels[i + 2]) / (255 * 3);
    weightedTotal += confidence;
    if (confidence >= 0.55) {
      strongPixels += 1;
    }
  }

  return {
    strongRatio: strongPixels / pixelCount,
    meanConfidence: weightedTotal / pixelCount
  };
}

function ensureSegmentationLibrary() {
  if (typeof window.SelfieSegmentation === "function") {
    return Promise.resolve();
  }
  if (segmentationLibraryPromise) {
    return segmentationLibraryPromise;
  }

  segmentationLibraryPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.1/selfie_segmentation.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      if (typeof window.SelfieSegmentation === "function") {
        resolve();
        return;
      }
      segmentationLibraryPromise = null;
      reject(new Error("segmentation library unavailable"));
    };
    script.onerror = () => {
      script.remove();
      segmentationLibraryPromise = null;
      reject(new Error("segmentation library unavailable"));
    };
    document.head.appendChild(script);
  });

  return segmentationLibraryPromise;
}

function getSelfieSegmenter() {
  if (selfieSegmenter) {
    return selfieSegmenter;
  }
  if (typeof window.SelfieSegmentation !== "function") {
    throw new Error("segmentation library unavailable");
  }

  selfieSegmenter = new window.SelfieSegmentation({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.1/${file}`
  });
  selfieSegmenter.setOptions({
    modelSelection: 1,
    selfieMode: false
  });
  selfieSegmenter.onResults((results) => {
    if (pendingSegmentationResolve) {
      const resolve = pendingSegmentationResolve;
      pendingSegmentationResolve = null;
      resolve(results);
    }
  });
  return selfieSegmenter;
}

async function runSegmentation(token) {
  if (!uploadedImage || token !== segmentationToken) {
    return;
  }

  updateRecognitionStatus("loading", "analyzingPhoto");

  try {
    await ensureSegmentationLibrary();
    const segmenter = getSelfieSegmenter();
    const resultsPromise = new Promise((resolve) => {
      pendingSegmentationResolve = resolve;
    });
    await segmenter.send({ image: uploadedImage });
    const results = await Promise.race([
      resultsPromise,
      new Promise((_, reject) => window.setTimeout(() => reject(new Error("segmentation timeout")), 30000))
    ]);

    if (token !== segmentationToken) {
      return;
    }

    const mask = copySegmentationMask(results.segmentationMask);
    const metrics = measureMask(mask);
    const looksLikePerson =
      metrics.strongRatio >= 0.012 &&
      metrics.strongRatio <= 0.82 &&
      metrics.meanConfidence >= 0.018;

    if (looksLikePerson) {
      subjectMaskSource = mask;
      updateRecognitionStatus("person", "personRatio", {
        percent: Math.round(metrics.strongRatio * 100)
      });
    } else {
      subjectMaskSource = null;
      updateRecognitionStatus("fallback", "noClearPerson");
    }
  } catch (error) {
    if (token !== segmentationToken) {
      return;
    }
    pendingSegmentationResolve = null;
    if (selfieSegmenter && typeof selfieSegmenter.close === "function") {
      selfieSegmenter.close();
    }
    selfieSegmenter = null;
    subjectMaskSource = null;
    updateRecognitionStatus("fallback", "recognitionUnavailable");
  }
}

function requestSegmentation() {
  const token = ++segmentationToken;
  subjectMaskSource = null;
  segmentationQueue = segmentationQueue
    .catch(() => undefined)
    .then(() => runSegmentation(token));
}

function canvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * posterSize,
    y: ((event.clientY - rect.top) / rect.height) * posterSize
  };
}

function pointInsideBounds(point, bounds) {
  return (
    point.x >= bounds.x &&
    point.x <= bounds.x + bounds.w &&
    point.y >= bounds.y &&
    point.y <= bounds.y + bounds.h
  );
}

function hitTestElement(point) {
  const hitOrder = ["nickname", "club", "extra", "scoreCard", "total"];
  return hitOrder.find((key) => elementBounds[key] && pointInsideBounds(point, elementBounds[key])) || null;
}

function getElementAnchor(key) {
  if (key === "scoreCard") {
    return { x: scoreBox.x, y: scoreBox.y };
  }
  if (key === "total") {
    return { x: elementPositions.total.x, y: Number(elements.totalY.value) };
  }
  return { ...elementPositions[key] };
}

function setElementAnchor(key, x, y) {
  if (key === "scoreCard") {
    scoreBox.x = x;
    scoreBox.y = y;
    return;
  }
  if (key === "total") {
    elementPositions.total.x = x;
    elements.totalY.value = String(Math.round(y));
    return;
  }
  elementPositions[key].x = x;
  elementPositions[key].y = y;
}

function startPointer(event) {
  const point = canvasPoint(event);

  if (activeEditorTab === "photo") {
    const target = hitTestElement(point);
    if (target) {
      canvas.setPointerCapture(event.pointerId);
      selectedElement = target;
      elementDragState = {
        target,
        x: point.x,
        y: point.y,
        anchor: getElementAnchor(target),
        bounds: { ...elementBounds[target] }
      };
      dragState = null;
      renderPoster();
      return;
    }
    selectedElement = null;
  }

  if (!uploadedImage) {
    renderPoster();
    return;
  }

  canvas.setPointerCapture(event.pointerId);
  dragState = {
    x: point.x,
    y: point.y,
    offsetX: imageState.offsetX,
    offsetY: imageState.offsetY
  };
}

function movePointer(event) {
  if (elementDragState) {
    const point = canvasPoint(event);
    const bounds = elementDragState.bounds;
    const rawX = point.x - elementDragState.x;
    const rawY = point.y - elementDragState.y;
    const deltaX = clamp(rawX, 8 - bounds.x, posterSize - 8 - bounds.x - bounds.w);
    const deltaY = clamp(rawY, topBarHeight + 8 - bounds.y, posterSize - 8 - bounds.y - bounds.h);
    setElementAnchor(
      elementDragState.target,
      elementDragState.anchor.x + deltaX,
      elementDragState.anchor.y + deltaY
    );
    renderPoster();
    return;
  }

  if (!dragState) {
    return;
  }

  const point = canvasPoint(event);
  imageState.offsetX = dragState.offsetX + point.x - dragState.x;
  imageState.offsetY = dragState.offsetY + point.y - dragState.y;
  renderPoster();
}

function endPointer() {
  dragState = null;
  elementDragState = null;
}

function loadImage(file) {
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      uploadedImage = img;
      imageState = {
        scale: Number(elements.zoomRange.value) / 100,
        offsetX: 0,
        offsetY: 0
      };
      renderPoster();
      requestSegmentation();
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function downloadPoster() {
  renderPoster({ exporting: true });
  const link = document.createElement("a");
  const safeName = (elements.nickname.value.trim() || "golf").replace(/[^\w\u4e00-\u9fa5-]+/g, "-");
  link.download = `${safeName}-golf-poster.png`;
  link.href = canvas.toDataURL("image/png");
  renderPoster();
  link.click();
}

function resetCanvasLayout({ render = true } = {}) {
  elements.zoomRange.value = "100";
  elements.backgroundBlur.value = "0";
  imageState = { scale: 1, offsetX: 0, offsetY: 0 };
  resetElementPositions();
  updateZoomOutput();
  updateBackgroundBlurOutput();
  if (render) {
    renderPoster();
  }
}

function resetPoster() {
  segmentationToken += 1;
  uploadedImage = null;
  subjectMaskSource = null;
  elements.photoInput.value = "";
  Object.entries(emptyValues).forEach(([key, value]) => {
    elements[key].value = value;
  });
  elements.totalOpacity.value = "88";
  elements.autoTotal.checked = true;
  resetCanvasLayout({ render: false });
  updateAutoTotal();
  updateRecognitionStatus("idle", "waitingPhoto");
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    activeEditorTab = target;
    if (target !== "photo") {
      selectedElement = null;
    }
    canvas.classList.toggle("is-layout-mode", target === "photo");
    document.querySelectorAll(".tab").forEach((item) => item.classList.toggle("is-active", item === tab));
    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === target);
    });
    renderPoster();
  });
});

[
  elements.nickname,
  elements.club,
  elements.badgeText,
  elements.highlightInput,
  elements.totalScore,
  elements.totalOpacity,
  elements.totalY,
  elements.extraInfo,
  elements.brandText
].forEach((element) => {
  element.addEventListener("input", renderPoster);
});

elements.scoreInput.addEventListener("input", updateAutoTotal);
elements.autoTotal.addEventListener("change", updateAutoTotal);
elements.languageSelect.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
});
elements.englishFont.addEventListener("change", () => {
  updateFontPreviews();
  renderPoster();
});
elements.numberFont.addEventListener("change", () => {
  updateFontPreviews();
  renderPoster();
});
[
  elements.nicknameFontSize,
  elements.clubFontSize,
  elements.totalFontSize,
  elements.extraFontSize
].forEach((element) => {
  element.addEventListener("input", () => {
    updateStyleOutputs();
    renderPoster();
  });
});
[
  elements.nicknameColor,
  elements.clubColor,
  elements.totalColor,
  elements.extraColor,
  elements.scoreTableColor
].forEach((element) => {
  element.addEventListener("input", renderPoster);
});
elements.zoomRange.addEventListener("input", () => {
  imageState.scale = Number(elements.zoomRange.value) / 100;
  updateZoomOutput();
  renderPoster();
});
elements.backgroundBlur.addEventListener("input", () => {
  updateBackgroundBlurOutput();
  renderPoster();
});
elements.resetZoom.addEventListener("click", () => {
  resetCanvasLayout();
});

elements.photoInput.addEventListener("change", (event) => loadImage(event.target.files[0]));
elements.downloadPoster.addEventListener("click", downloadPoster);
elements.resetPoster.addEventListener("click", resetPoster);
elements.retrySegmentation.addEventListener("click", requestSegmentation);
canvas.addEventListener("pointerdown", startPointer);
canvas.addEventListener("pointermove", movePointer);
canvas.addEventListener("pointerup", endPointer);
canvas.addEventListener("pointercancel", endPointer);

currentLanguage = loadLanguagePreference();
updateAutoTotal();
updateZoomOutput();
updateBackgroundBlurOutput();
updateStyleOutputs();
applyLanguage(currentLanguage, false);
