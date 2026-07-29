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
  stickerInput: document.getElementById("stickerInput"),
  stickerUploadButton: document.getElementById("stickerUploadButton"),
  stickerCount: document.getElementById("stickerCount"),
  stickerList: document.getElementById("stickerList"),
  stickerScale: document.getElementById("stickerScale"),
  stickerScaleValue: document.getElementById("stickerScaleValue"),
  removeSticker: document.getElementById("removeSticker"),
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

const posterSize = 1000;
const topBarHeight = 70;
const posterTemplates = {
  template1: {
    preset: {
      scoreTableColor: "#006337",
      totalColor: "#083728",
      nicknameColor: "#ffffff",
      clubColor: "#ffffff",
      extraColor: "#ffffff",
      englishFont: "playfairDisplay",
      numberFont: "playfairDisplay",
      nicknameFontSize: "40",
      clubFontSize: "22",
      extraFontSize: "22",
      totalFontSize: "500",
      totalOpacity: "90"
    },
    layout: {
      width: 1000,
      height: 1265,
      scoreDirection: "horizontal",
      logoRegion: { x: 0, y: 0, w: 1000, h: 70 },
      nicknameRegion: { x: 230, y: 115, w: 540, h: 60, align: "center" },
      scoreBox: { x: 230, y: 190, w: 540, h: 200 },
      infoRegion: { x: 230, y: 400, w: 540, h: 40, align: "center" },
      totalRegion: { x: 60, y: 540, w: 880, h: 580 },
      positions: {
        total: { x: 500 },
        nickname: { x: 500, y: 145 },
        club: { x: 500, y: 420 }
      },
      totalY: 830
    }
  },
  template2: {
    preset: {
      scoreTableColor: "#173b2c",
      totalColor: "#ffffff",
      nicknameColor: "#ffffff",
      clubColor: "#ffffff",
      extraColor: "#ffffff",
      englishFont: "playfairDisplay",
      numberFont: "playfairDisplay",
      nicknameFontSize: "40",
      clubFontSize: "20",
      extraFontSize: "20",
      totalFontSize: "180",
      totalOpacity: "92"
    },
    layout: {
      width: 1000,
      height: 1265,
      scoreDirection: "vertical",
      logoRegion: { x: 0, y: 0, w: 1000, h: 70 },
      nicknameRegion: { x: 45, y: 150, w: 540, h: 60, align: "left" },
      totalRegion: { x: 85, y: 235, w: 290, h: 200 },
      scoreBox: { x: 85, y: 465, w: 290, h: 760 },
      scoreDivider: { x: 227, y: 465, w: 6, h: 760 },
      scoreColumns: [
        { x: 130, y: 500, w: 82, h: 675 },
        { x: 252, y: 500, w: 82, h: 675 }
      ],
      infoRegion: { x: 49, y: 465, w: 35, h: 750, align: "center", vertical: true },
      positions: {
        total: { x: 230 },
        nickname: { x: 45, y: 180 },
        club: { x: 66.5, y: 840 }
      },
      totalY: 335
    }
  }
};
let activePosterTemplate = "template1";
const scoreBox = { ...posterTemplates.template1.layout.scoreBox };
const fontStacks = {
  english: {
    arial: 'Arial, "Helvetica Neue", sans-serif',
    impact: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
    arialBlack: '"Arial Black", Impact, sans-serif',
    bebasNeue: '"Bebas Neue", Impact, "Arial Narrow", sans-serif',
    oswald: 'Oswald, "Arial Narrow", Impact, sans-serif',
    montserrat: 'Montserrat, "Helvetica Neue", Arial, sans-serif',
    playfairDisplay: '"Playfair Display", Georgia, "Times New Roman", serif',
    georgia: 'Georgia, "Times New Roman", serif',
    timesNewRoman: '"Times New Roman", Times, serif',
    franklinGothic: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
    arialRounded: '"Arial Rounded MT Bold", "Trebuchet MS", sans-serif',
    spaceMono: '"Space Mono", Consolas, "Courier New", monospace',
    courierNew: '"Courier New", Courier, monospace'
  },
  number: {
    arialBlack: '"Arial Black", Impact, sans-serif',
    impact: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
    bebasNeue: '"Bebas Neue", Impact, "Arial Narrow", sans-serif',
    oswald: 'Oswald, "Arial Narrow", Impact, sans-serif',
    montserrat: 'Montserrat, "Helvetica Neue", Arial, sans-serif',
    playfairDisplay: '"Playfair Display", Georgia, "Times New Roman", serif',
    georgia: 'Georgia, "Times New Roman", serif',
    timesNewRoman: '"Times New Roman", Times, serif',
    spaceMono: '"Space Mono", Consolas, "Courier New", monospace',
    courierNew: '"Courier New", Courier, monospace'
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
    templateLibrary: "选择模板",
    templateOne: "模板 1",
    templateTwo: "模板 2",
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
    club: "球场信息 / 赛事名称",
    clubSize: "赛事信息字号",
    clubColor: "赛事信息颜色",
    scoreTable: "成绩表",
    scorePlaceholder: "输入最多 18 洞成绩，用空格或逗号分隔",
    badge: "圆形标记",
    highlightHoles: "高亮洞号",
    highlightPlaceholder: "例如 3,6",
    scoreTableColor: "成绩表颜色",
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
    stickers: "贴纸",
    uploadSticker: "上传贴纸",
    removeSticker: "删除选中贴纸",
    stickerList: "贴纸列表",
    stickerScale: "贴纸大小",
    stickerItem: "贴纸 {index}",
    brandText: "品牌文字",
    englishFont: "英文字体",
    numberFont: "数字字体",
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
    templateLibrary: "Choose template",
    templateOne: "Template 1",
    templateTwo: "Template 2",
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
    club: "Course / event",
    clubSize: "Info size",
    clubColor: "Info color",
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
    stickers: "Stickers",
    uploadSticker: "UPLOAD STICKER",
    removeSticker: "Remove selected sticker",
    stickerList: "Sticker list",
    stickerScale: "Sticker size",
    stickerItem: "Sticker {index}",
    brandText: "Brand text",
    englishFont: "Text font",
    numberFont: "Number font",
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
let activeEditorTab = "photo";
let currentLanguage = "zh";
let recognitionDetailState = { key: "waitingPhoto", params: {} };
let elementPositions = createDefaultElementPositions();
const elementBounds = {};
const maxStickerCount = 5;
let stickers = [];
let selectedStickerId = null;
let stickerIdCounter = 0;
let stickerLoadToken = 0;
let imageState = {
  scale: 1,
  offsetX: 0,
  offsetY: 0
};

function getActiveTemplate() {
  return posterTemplates[activePosterTemplate] || posterTemplates.template1;
}

function getActiveLayout() {
  return getActiveTemplate().layout;
}

function createDefaultElementPositions() {
  const positions = getActiveLayout().positions;
  return Object.fromEntries(
    Object.entries(positions).map(([key, value]) => [key, { ...value }])
  );
}

function resetElementPositions() {
  const layout = getActiveLayout();
  elementPositions = createDefaultElementPositions();
  Object.assign(scoreBox, layout.scoreBox);
  elements.totalY.value = String(layout.totalY);
  elements.totalY.min = "-420";
  elements.totalY.max = String(layout.height + 420);
  selectedElement = null;
}

function stickerElementKey(id) {
  return `sticker:${id}`;
}

function getStickerById(id) {
  return stickers.find((sticker) => sticker.id === id) || null;
}

function getStickerFromElementKey(key) {
  if (!key || !key.startsWith("sticker:")) {
    return null;
  }
  return getStickerById(key.slice("sticker:".length));
}

function getStickerBounds(sticker) {
  const width = sticker.baseWidth * sticker.scale;
  const height = sticker.baseHeight * sticker.scale;
  return {
    x: sticker.x - width / 2,
    y: sticker.y - height / 2,
    w: width,
    h: height
  };
}

function setStickerDefaultPosition(sticker, index) {
  const offset = (index - 2) * 28;
  sticker.x = posterSize / 2 + offset;
  sticker.y = getPosterHeight() * 0.52 + (index % 2) * 26;
  sticker.scale = 1;
}

function resetStickerPositions() {
  stickers.forEach((sticker, index) => setStickerDefaultPosition(sticker, index));
  updateStickerControls();
}

function renderStickerList() {
  elements.stickerList.replaceChildren();
  stickers.forEach((sticker, index) => {
    const button = document.createElement("button");
    button.className = "sticker-thumbnail";
    button.type = "button";
    button.classList.toggle("is-active", sticker.id === selectedStickerId);
    button.setAttribute("aria-label", translate("stickerItem", { index: index + 1 }));

    const image = document.createElement("img");
    image.src = sticker.image.src;
    image.alt = "";
    image.draggable = false;

    const number = document.createElement("span");
    number.textContent = String(index + 1);

    button.append(image, number);
    button.addEventListener("click", () => {
      selectSticker(sticker.id);
      renderPoster();
    });
    elements.stickerList.appendChild(button);
  });
}

function updateStickerControls() {
  const selectedSticker = getStickerById(selectedStickerId);
  const isFull = stickers.length >= maxStickerCount;
  elements.stickerCount.textContent = `${stickers.length}/${maxStickerCount}`;
  elements.stickerInput.disabled = isFull;
  elements.stickerUploadButton.classList.toggle("is-disabled", isFull);
  elements.removeSticker.disabled = !selectedSticker;
  elements.stickerScale.disabled = !selectedSticker;
  elements.stickerScale.value = selectedSticker
    ? String(Math.round(selectedSticker.scale * 100))
    : "100";
  elements.stickerScaleValue.textContent = `${elements.stickerScale.value}%`;
  renderStickerList();
}

function selectSticker(id) {
  const sticker = getStickerById(id);
  selectedStickerId = sticker ? sticker.id : null;
  if (sticker) {
    selectedElement = stickerElementKey(sticker.id);
  } else if (getStickerFromElementKey(selectedElement)) {
    selectedElement = null;
  }
  updateStickerControls();
}

function loadStickerImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => resolve(image);
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function addStickerFiles(fileList) {
  const token = ++stickerLoadToken;
  const available = maxStickerCount - stickers.length;
  const files = Array.from(fileList)
    .filter((file) => file.type.startsWith("image/"))
    .slice(0, available);

  for (const file of files) {
    try {
      const image = await loadStickerImage(file);
      if (token !== stickerLoadToken || stickers.length >= maxStickerCount) {
        return;
      }
      const maxBaseSize = 230;
      const ratio = Math.min(maxBaseSize / image.naturalWidth, maxBaseSize / image.naturalHeight);
      const sticker = {
        id: String(++stickerIdCounter),
        image,
        baseWidth: image.naturalWidth * ratio,
        baseHeight: image.naturalHeight * ratio,
        x: 0,
        y: 0,
        scale: 1
      };
      setStickerDefaultPosition(sticker, stickers.length);
      stickers.push(sticker);
      selectedStickerId = sticker.id;
      selectedElement = stickerElementKey(sticker.id);
    } catch (error) {
      // Skip unreadable image files and continue with the remaining selection.
    }
  }

  elements.stickerInput.value = "";
  updateStickerControls();
  renderPoster();
}

function removeSelectedSticker() {
  const index = stickers.findIndex((sticker) => sticker.id === selectedStickerId);
  if (index === -1) {
    return;
  }
  stickers.splice(index, 1);
  const nextSticker = stickers[Math.min(index, stickers.length - 1)] || null;
  selectedStickerId = nextSticker ? nextSticker.id : null;
  selectedElement = nextSticker ? stickerElementKey(nextSticker.id) : null;
  updateStickerControls();
  renderPoster();
}

function getPosterHeight() {
  return canvas.height;
}

function updateTemplateSelection() {
  document.querySelectorAll(".template-option").forEach((button) => {
    const active = button.dataset.template === activePosterTemplate;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function applyPosterTemplate(templateId) {
  if (!posterTemplates[templateId]) {
    return;
  }

  activePosterTemplate = templateId;
  const template = getActiveTemplate();
  const preset = template.preset;
  elements.scoreTableColor.value = preset.scoreTableColor;
  elements.totalColor.value = preset.totalColor;
  elements.nicknameColor.value = preset.nicknameColor;
  elements.clubColor.value = preset.clubColor;
  elements.extraColor.value = preset.extraColor;
  elements.englishFont.value = preset.englishFont;
  elements.numberFont.value = preset.numberFont;
  elements.nicknameFontSize.value = preset.nicknameFontSize;
  elements.clubFontSize.value = preset.clubFontSize;
  elements.extraFontSize.value = preset.extraFontSize;
  elements.totalFontSize.value = preset.totalFontSize;
  elements.totalOpacity.value = preset.totalOpacity;
  const layout = getActiveLayout();
  canvas.width = layout.width;
  canvas.height = layout.height;
  updateTemplateSelection();
  updateFontPreviews();
  updateStyleOutputs();
  imageState = { scale: 1, offsetX: 0, offsetY: 0 };
  elements.zoomRange.value = "100";
  resetElementPositions();
  resetStickerPositions();
  updateZoomOutput();
  renderPoster();
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
  updateStickerControls();
  renderPoster();
}

function getEnglishFont() {
  return fontStacks.english[elements.englishFont.value] || fontStacks.english.arial;
}

function getNumberFont() {
  return fontStacks.number[elements.numberFont.value] || fontStacks.number.arialBlack;
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
  const posterHeight = getPosterHeight();
  const blur = Number(elements.backgroundBlur.value);

  context.save();
  const filters = [];
  if (blur > 0) {
    filters.push(`blur(${blur}px)`);
  }
  if (activePosterTemplate === "template2") {
    filters.push("brightness(0.82)", "saturate(0.88)");
  }
  if (filters.length) {
    context.filter = filters.join(" ");
  }
  drawCoverAsset(context, uploadedImage, 0, topBarHeight, posterSize, posterHeight - topBarHeight);
  context.restore();
}

function drawPlaceholder(context) {
  const posterHeight = getPosterHeight();
  const gradient = context.createLinearGradient(0, topBarHeight, 0, posterHeight);
  if (activePosterTemplate === "template2") {
    gradient.addColorStop(0, "#315e44");
    gradient.addColorStop(1, "#122e22");
  } else {
    gradient.addColorStop(0, "#46785a");
    gradient.addColorStop(1, "#173b2c");
  }
  context.fillStyle = gradient;
  context.fillRect(0, topBarHeight, posterSize, posterHeight - topBarHeight);
}

function drawBrand(context) {
  const brand = elements.brandText.value.trim() || "GOLFBROTHERS";
  context.fillStyle = "#000";
  context.fillRect(0, 0, posterSize, topBarHeight);

  context.save();
  context.translate(56, 18);
  context.fillStyle = "#fff";
  context.fillRect(0, -3, 5, 40);
  context.fillStyle = "#c59c35";
  context.beginPath();
  context.moveTo(7, -1);
  context.lineTo(49, 11);
  context.lineTo(7, 23);
  context.closePath();
  context.fill();
  context.restore();

  const splitPoint = brand.toUpperCase().startsWith("GOLF")
    ? 4
    : Math.max(4, Math.floor(brand.length * 0.45));
  const first = brand.slice(0, splitPoint).toUpperCase();
  const second = brand.slice(splitPoint).toUpperCase();
  context.textBaseline = "middle";
  context.textAlign = "left";
  context.font = "italic 900 38px Arial, sans-serif";
  context.fillStyle = "#fff";
  context.fillText(first, 124, 35);
  context.fillStyle = "#c99c32";
  context.fillText(second, 124 + context.measureText(first).width, 35);
}

function drawTotalScore(context) {
  const score = elements.totalScore.value.trim();
  if (!score) {
    return;
  }

  const opacity = Number(elements.totalOpacity.value) / 100;
  const x = elementPositions.total.x;
  const y = Number(elements.totalY.value);
  const fontSize = Number(elements.totalFontSize.value);

  context.save();
  context.globalAlpha = opacity;
  context.fillStyle = elements.totalColor.value;
  context.font = `950 ${fontSize}px ${getNumberFont()}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(score, x, y);
  const region = getActiveLayout().totalRegion;
  elementBounds.total = {
    x: x - region.w / 2,
    y: y - region.h / 2,
    w: region.w,
    h: region.h
  };
  context.restore();
}

function drawSubjectOverlay(context) {
  if (!uploadedImage || segmentationState !== "person" || !subjectMaskSource) {
    return;
  }

  const layerCanvas = document.createElement("canvas");
  layerCanvas.width = posterSize;
  layerCanvas.height = getPosterHeight();
  const layerCtx = layerCanvas.getContext("2d");
  drawCoverAsset(layerCtx, uploadedImage, 0, topBarHeight, posterSize, getPosterHeight() - topBarHeight);
  layerCtx.globalCompositeOperation = "destination-in";
  drawCoverAsset(layerCtx, subjectMaskSource, 0, topBarHeight, posterSize, getPosterHeight() - topBarHeight);
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
  const layout = getActiveLayout();

  context.save();
  context.shadowColor = "rgba(0,0,0,0.38)";
  context.shadowBlur = 10;
  context.shadowOffsetY = 2;
  context.textBaseline = "middle";

  if (nickname) {
    const position = elementPositions.nickname;
    const region = layout.nicknameRegion;
    context.fillStyle = elements.nicknameColor.value;
    context.textAlign = region.align;
    fitText(
      context,
      nickname,
      region.w,
      Math.min(Number(elements.nicknameFontSize.value), region.h),
      14,
      getEnglishFont()
    );
    context.fillText(nickname, position.x, position.y);
    elementBounds.nickname = {
      x: region.align === "center" ? position.x - region.w / 2 : position.x,
      y: position.y - region.h / 2,
      w: region.w,
      h: region.h
    };
  }

  const info = [club, extra].filter(Boolean).join(" · ");
  if (info) {
    const position = elementPositions.club;
    const region = layout.infoRegion;
    const infoColor = club ? elements.clubColor.value : elements.extraColor.value;
    const requestedSize = club
      ? Number(elements.clubFontSize.value)
      : Number(elements.extraFontSize.value);
    context.fillStyle = infoColor;
    context.textAlign = "center";
    const maxTextWidth = region.vertical ? region.h : region.w;
    fitText(
      context,
      info,
      maxTextWidth,
      Math.min(requestedSize, region.vertical ? region.w : region.h),
      12,
      getEnglishFont()
    );

    if (region.vertical) {
      context.save();
      context.translate(position.x, position.y);
      context.rotate(Math.PI / 2);
      context.fillText(info, 0, 0);
      context.restore();
    } else {
      context.fillText(info, position.x, position.y);
    }

    elementBounds.club = {
      x: position.x - region.w / 2,
      y: position.y - region.h / 2,
      w: region.w,
      h: region.h
    };
  }
  context.restore();
}

function drawScoreCard(context) {
  const scores = parseScores();
  const highlights = parseHighlights();
  const badge = elements.badgeText.value.trim();
  const hasScoreContent = scores.some(Boolean) || Boolean(badge);
  const layout = getActiveLayout();
  const vertical = layout.scoreDirection === "vertical";

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
  context.globalAlpha = 0.82;
  context.fillStyle = elements.scoreTableColor.value;
  context.fillRect(scoreBox.x, scoreBox.y, scoreBox.w, scoreBox.h);
  context.globalAlpha = 1;

  const offsetX = scoreBox.x - layout.scoreBox.x;
  const offsetY = scoreBox.y - layout.scoreBox.y;
  if (vertical) {
    const divider = layout.scoreDivider;
    context.fillStyle = "rgba(255,255,255,0.76)";
    context.fillRect(
      divider.x + offsetX,
      divider.y + offsetY,
      divider.w,
      divider.h
    );
  } else {
    context.strokeStyle = "rgba(255,255,255,0.78)";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(scoreBox.x, scoreBox.y + scoreBox.h / 2);
    context.lineTo(scoreBox.x + scoreBox.w, scoreBox.y + scoreBox.h / 2);
    context.stroke();
  }

  const cellW = vertical ? layout.scoreColumns[0].w : scoreBox.w / 9;
  const cellH = vertical ? layout.scoreColumns[0].h / 9 : scoreBox.h / 2;
  const scoreFontSize = Math.floor(Math.min(vertical ? 48 : 44, cellH * 0.55, cellW * 0.58));
  const highlightColor = activePosterTemplate === "template1" ? "#ffd100" : "#ffffff";

  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `900 ${scoreFontSize}px ${getNumberFont()}`;

  scores.forEach((score, index) => {
    const firstHalf = index < 9;
    const slot = index % 9;
    const row = firstHalf ? 0 : 1;
    const column = vertical ? layout.scoreColumns[firstHalf ? 0 : 1] : null;
    const x = vertical
      ? column.x + offsetX + column.w / 2
      : scoreBox.x + cellW * slot + cellW / 2;
    const y = vertical
      ? column.y + offsetY + cellH * slot + cellH / 2
      : scoreBox.y + cellH * row + cellH / 2;
    const hole = index + 1;
    const markerRadius = Math.min(29, cellW * 0.34, cellH * 0.36);

    if (score && highlights.has(hole)) {
      context.strokeStyle = highlightColor;
      context.lineWidth = 3;
      context.beginPath();
      context.arc(x, y, markerRadius, 0, Math.PI * 2);
      context.stroke();
    }

    if (hole === 1 && badge) {
      context.strokeStyle = highlightColor;
      context.lineWidth = 3;
      context.beginPath();
      context.arc(x, y, markerRadius, 0, Math.PI * 2);
      context.stroke();
      context.beginPath();
      context.arc(x, y, markerRadius * 0.68, 0, Math.PI * 2);
      context.stroke();
      context.fillStyle = "#ffffff";
      context.font = `900 ${Math.max(22, scoreFontSize - 10)}px ${getNumberFont()}`;
      context.fillText(badge, x, y + 1);
      context.font = `900 ${scoreFontSize}px ${getNumberFont()}`;
      return;
    }

    if (score) {
      context.fillStyle = "#ffffff";
      context.fillText(score, x, y);
    }
  });

  context.restore();
}

function drawStickers(context) {
  stickers.forEach((sticker) => {
    const bounds = getStickerBounds(sticker);
    context.drawImage(sticker.image, bounds.x, bounds.y, bounds.w, bounds.h);
    elementBounds[stickerElementKey(sticker.id)] = bounds;
  });
}

function drawSelectionGuide(context) {
  if (activeEditorTab !== "photo" || !selectedElement || !elementBounds[selectedElement]) {
    return;
  }

  const bounds = elementBounds[selectedElement];
  const x = bounds.x - 5;
  const y = bounds.y - 5;
  const w = bounds.w + 10;
  const h = bounds.h + 10;

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

function drawTemplateAtmosphere(context) {
  const posterHeight = getPosterHeight();

  if (activePosterTemplate === "template2") {
    const sideShade = context.createLinearGradient(0, 0, 430, 0);
    sideShade.addColorStop(0, "rgba(0,0,0,0.48)");
    sideShade.addColorStop(0.86, "rgba(0,0,0,0.12)");
    sideShade.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = sideShade;
    context.fillRect(0, topBarHeight, 430, posterHeight - topBarHeight);
    return;
  }

  const gradientStart = 500;
  const bottomGradient = context.createLinearGradient(0, gradientStart, 0, posterHeight);
  bottomGradient.addColorStop(0, "rgba(0,0,0,0)");
  bottomGradient.addColorStop(1, "rgba(0,0,0,0.4)");
  context.fillStyle = bottomGradient;
  context.fillRect(0, gradientStart, posterSize, posterHeight - gradientStart);
}

function renderPoster({ exporting = false } = {}) {
  const posterHeight = getPosterHeight();
  Object.keys(elementBounds).forEach((key) => delete elementBounds[key]);
  ctx.clearRect(0, 0, posterSize, posterHeight);

  if (uploadedImage) {
    drawBackgroundImage(ctx);
  } else {
    drawPlaceholder(ctx);
  }

  drawTemplateAtmosphere(ctx);

  drawTotalScore(ctx);
  drawSubjectOverlay(ctx);
  drawLabels(ctx);
  drawScoreCard(ctx);
  drawBrand(ctx);
  drawStickers(ctx);

  if (!exporting) {
    drawSelectionGuide(ctx);
  }
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
    modelSelection: 0,
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
    y: ((event.clientY - rect.top) / rect.height) * getPosterHeight()
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
  const stickerHitOrder = stickers
    .slice()
    .reverse()
    .map((sticker) => stickerElementKey(sticker.id));
  const hitOrder = [...stickerHitOrder, "nickname", "club", "extra", "scoreCard", "total"];
  return hitOrder.find((key) => elementBounds[key] && pointInsideBounds(point, elementBounds[key])) || null;
}

function getElementAnchor(key) {
  const sticker = getStickerFromElementKey(key);
  if (sticker) {
    return { x: sticker.x, y: sticker.y };
  }
  if (key === "scoreCard") {
    return { x: scoreBox.x, y: scoreBox.y };
  }
  if (key === "total") {
    return { x: elementPositions.total.x, y: Number(elements.totalY.value) };
  }
  return { ...elementPositions[key] };
}

function setElementAnchor(key, x, y) {
  const sticker = getStickerFromElementKey(key);
  if (sticker) {
    sticker.x = x;
    sticker.y = y;
    return;
  }
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
  if (activeEditorTab !== "photo") {
    return;
  }

  const point = canvasPoint(event);

  const target = hitTestElement(point);
  if (target) {
    canvas.setPointerCapture(event.pointerId);
    selectedElement = target;
    elementDragState = {
      target,
      x: point.x,
      y: point.y,
      anchor: getElementAnchor(target)
    };
    dragState = null;
    const sticker = getStickerFromElementKey(target);
    if (sticker) {
      selectedStickerId = sticker.id;
      updateStickerControls();
    }
    renderPoster();
    return;
  }
  selectedElement = null;

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
  if (activeEditorTab !== "photo") {
    return;
  }

  if (elementDragState) {
    const point = canvasPoint(event);
    const deltaX = point.x - elementDragState.x;
    const deltaY = point.y - elementDragState.y;
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
  resetStickerPositions();
  updateZoomOutput();
  updateBackgroundBlurOutput();
  if (render) {
    renderPoster();
  }
}

function resetPoster() {
  segmentationToken += 1;
  stickerLoadToken += 1;
  uploadedImage = null;
  subjectMaskSource = null;
  stickers = [];
  selectedStickerId = null;
  elements.photoInput.value = "";
  elements.stickerInput.value = "";
  Object.entries(emptyValues).forEach(([key, value]) => {
    elements[key].value = value;
  });
  elements.totalOpacity.value = "88";
  elements.autoTotal.checked = true;
  resetCanvasLayout({ render: false });
  updateStickerControls();
  updateAutoTotal();
  updateRecognitionStatus("idle", "waitingPhoto");
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    activeEditorTab = target;
    dragState = null;
    elementDragState = null;
    if (target !== "photo") {
      selectedElement = null;
    } else if (selectedStickerId) {
      selectedElement = stickerElementKey(selectedStickerId);
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
document.querySelectorAll(".template-option").forEach((button) => {
  button.addEventListener("click", () => {
    applyPosterTemplate(button.dataset.template);
  });
});
elements.englishFont.addEventListener("change", () => {
  updateFontPreviews();
  renderPoster();
});
elements.numberFont.addEventListener("change", () => {
  updateFontPreviews();
  renderPoster();
});
elements.stickerInput.addEventListener("change", (event) => {
  addStickerFiles(event.target.files);
});
elements.stickerScale.addEventListener("input", () => {
  const sticker = getStickerById(selectedStickerId);
  if (!sticker) {
    return;
  }
  sticker.scale = Number(elements.stickerScale.value) / 100;
  elements.stickerScaleValue.textContent = `${elements.stickerScale.value}%`;
  renderPoster();
});
elements.removeSticker.addEventListener("click", removeSelectedSticker);
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
applyPosterTemplate("template1");
updateAutoTotal();
updateZoomOutput();
updateBackgroundBlurOutput();
updateStyleOutputs();
updateStickerControls();
applyLanguage(currentLanguage, false);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(renderPoster);
}
