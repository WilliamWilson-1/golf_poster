const canvas = document.getElementById("posterCanvas");
const ctx = canvas.getContext("2d");

const elements = {
  photoInput: document.getElementById("photoInput"),
  languageSelect: document.getElementById("languageSelect"),
  landscapeTemplate: document.getElementById("landscapeTemplate"),
  portraitTemplate: document.getElementById("portraitTemplate"),
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

const posterSize = 1080;
const topBarHeight = 72;
const posterTemplates = {
  tour: {
    defaultOrientation: "landscape",
    scoreStyle: "solid",
    preset: {
      scoreTableColor: "#006337",
      totalColor: "#083728",
      nicknameColor: "#ffffff",
      clubColor: "#ffffff",
      extraColor: "#ffffff",
      englishFont: "arial",
      numberFont: "arialBlack",
      nicknameFontSize: "34",
      clubFontSize: "34",
      extraFontSize: "21",
      totalFontSize: "335",
      totalOpacity: "88"
    },
    layouts: {
      landscape: {
        width: 1080,
        height: 1080,
        totalY: 300,
        scoreDirection: "horizontal",
        scoreBox: { x: 128, y: 840, w: 824, h: 168 },
        positions: {
          total: { x: 540 },
          nickname: { x: 140, y: 810 },
          club: { x: 940, y: 810 },
          extra: { x: 540, y: 1047 }
        }
      },
      portrait: {
        width: 1080,
        height: 1440,
        totalY: 850,
        scoreDirection: "horizontal",
        nicknameAlign: "center",
        clubAlign: "center",
        scoreBox: { x: 150, y: 190, w: 780, h: 180 },
        positions: {
          total: { x: 540 },
          nickname: { x: 540, y: 158 },
          club: { x: 540, y: 414 },
          extra: { x: 540, y: 455 }
        }
      }
    }
  },
  heritage: {
    defaultOrientation: "portrait",
    scoreStyle: "grid",
    preset: {
      scoreTableColor: "#08754b",
      totalColor: "#08754b",
      nicknameColor: "#08754b",
      clubColor: "#08754b",
      extraColor: "#08754b",
      englishFont: "playfairDisplay",
      numberFont: "playfairDisplay",
      nicknameFontSize: "48",
      clubFontSize: "25",
      extraFontSize: "19",
      totalFontSize: "390",
      totalOpacity: "94"
    },
    layouts: {
      landscape: {
        width: 1080,
        height: 1080,
        totalY: 340,
        scoreDirection: "horizontal",
        nicknameAlign: "left",
        clubAlign: "left",
        scoreBox: { x: 115, y: 655, w: 850, h: 170 },
        positions: {
          total: { x: 540 },
          nickname: { x: 120, y: 900 },
          club: { x: 690, y: 895 },
          extra: { x: 760, y: 945 }
        }
      },
      portrait: {
        width: 1080,
        height: 1440,
        totalY: 420,
        scoreDirection: "horizontal",
        nicknameAlign: "left",
        clubAlign: "left",
        scoreBox: { x: 145, y: 690, w: 790, h: 190 },
        positions: {
          total: { x: 540 },
          nickname: { x: 80, y: 970 },
          club: { x: 665, y: 965 },
          extra: { x: 775, y: 1015 }
        }
      }
    }
  },
  victory: {
    defaultOrientation: "portrait",
    scoreStyle: "solid",
    preset: {
      scoreTableColor: "#a9252d",
      totalColor: "#d43842",
      nicknameColor: "#ffffff",
      clubColor: "#ffffff",
      extraColor: "#ffffff",
      englishFont: "playfairDisplay",
      numberFont: "playfairDisplay",
      nicknameFontSize: "38",
      clubFontSize: "22",
      extraFontSize: "18",
      totalFontSize: "410",
      totalOpacity: "92"
    },
    layouts: {
      landscape: {
        width: 1080,
        height: 1080,
        totalY: 305,
        scoreDirection: "horizontal",
        nicknameAlign: "center",
        clubAlign: "center",
        scoreBox: { x: 145, y: 805, w: 790, h: 170 },
        positions: {
          total: { x: 540 },
          nickname: { x: 540, y: 775 },
          club: { x: 540, y: 1018 },
          extra: { x: 540, y: 1055 }
        }
      },
      portrait: {
        width: 1080,
        height: 1440,
        totalY: 400,
        scoreDirection: "horizontal",
        nicknameAlign: "center",
        clubAlign: "center",
        scoreBox: { x: 145, y: 1090, w: 790, h: 185 },
        positions: {
          total: { x: 540 },
          nickname: { x: 540, y: 1050 },
          club: { x: 540, y: 1335 },
          extra: { x: 540, y: 1380 }
        }
      }
    }
  },
  editorial: {
    defaultOrientation: "portrait",
    scoreStyle: "sidebar",
    preset: {
      scoreTableColor: "#1f351d",
      totalColor: "#ffffff",
      nicknameColor: "#ffffff",
      clubColor: "#ffffff",
      extraColor: "#ef4d57",
      englishFont: "playfairDisplay",
      numberFont: "playfairDisplay",
      nicknameFontSize: "42",
      clubFontSize: "24",
      extraFontSize: "18",
      totalFontSize: "335",
      totalOpacity: "94"
    },
    layouts: {
      landscape: {
        width: 1080,
        height: 1080,
        totalY: 285,
        scoreDirection: "vertical",
        nicknameAlign: "center",
        clubAlign: "center",
        extraVertical: true,
        scoreBox: { x: 760, y: 410, w: 250, h: 580 },
        positions: {
          total: { x: 840 },
          nickname: { x: 835, y: 145 },
          club: { x: 835, y: 198 },
          extra: { x: 1040, y: 700 }
        }
      },
      portrait: {
        width: 1080,
        height: 1440,
        totalY: 510,
        scoreDirection: "vertical",
        nicknameAlign: "center",
        clubAlign: "center",
        extraVertical: true,
        scoreBox: { x: 690, y: 710, w: 276, h: 650 },
        positions: {
          total: { x: 820 },
          nickname: { x: 825, y: 240 },
          club: { x: 825, y: 310 },
          extra: { x: 1025, y: 1040 }
        }
      }
    }
  }
};
let activePosterTemplate = "tour";
let templateOrientation = "landscape";
const scoreBox = { ...posterTemplates.tour.layouts.landscape.scoreBox };
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
    posterFormat: "海报版式",
    templateLibrary: "选择模板",
    templateTour: "赛事经典",
    templateHeritage: "白场纪念",
    templateVictory: "暗场夺冠",
    templateEditorial: "杂志侧栏",
    landscapeTemplate: "横版",
    portraitTemplate: "竖版",
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
    posterFormat: "Poster format",
    templateLibrary: "Choose template",
    templateTour: "Tournament",
    templateHeritage: "Heritage",
    templateVictory: "Victory",
    templateEditorial: "Editorial",
    landscapeTemplate: "LANDSCAPE",
    portraitTemplate: "PORTRAIT",
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
let subjectCutoutMaskSource = null;
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
  return posterTemplates[activePosterTemplate] || posterTemplates.tour;
}

function getActiveLayout(orientation = templateOrientation) {
  const template = getActiveTemplate();
  return template.layouts[orientation] || template.layouts[template.defaultOrientation];
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

function setTemplateOrientation(orientation) {
  const nextOrientation = orientation === "portrait" ? "portrait" : "landscape";
  templateOrientation = nextOrientation;
  const layout = getActiveLayout(nextOrientation);
  canvas.width = layout.width;
  canvas.height = layout.height;
  canvas.classList.toggle("is-portrait", nextOrientation === "portrait");
  elements.landscapeTemplate.classList.toggle("is-active", nextOrientation === "landscape");
  elements.portraitTemplate.classList.toggle("is-active", nextOrientation === "portrait");
  elements.landscapeTemplate.setAttribute("aria-pressed", String(nextOrientation === "landscape"));
  elements.portraitTemplate.setAttribute("aria-pressed", String(nextOrientation === "portrait"));
  imageState = { scale: 1, offsetX: 0, offsetY: 0 };
  elements.zoomRange.value = "100";
  resetElementPositions();
  resetStickerPositions();
  updateZoomOutput();
  renderPoster();
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
  updateTemplateSelection();
  updateFontPreviews();
  updateStyleOutputs();
  setTemplateOrientation(template.defaultOrientation);
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
  const isolatedHeritage =
    activePosterTemplate === "heritage" &&
    segmentationState === "person" &&
    (subjectCutoutMaskSource || subjectMaskSource);

  if (isolatedHeritage) {
    context.fillStyle = "#f3f2ed";
    context.fillRect(0, topBarHeight, posterSize, posterHeight - topBarHeight);

    context.save();
    context.globalAlpha = 0.1;
    context.filter = `blur(${Math.max(18, blur)}px) brightness(1.2) saturate(0.32)`;
    drawCoverAsset(context, uploadedImage, 0, topBarHeight, posterSize, posterHeight - topBarHeight);
    context.restore();

    context.fillStyle = "rgba(247, 246, 241, 0.64)";
    context.fillRect(0, topBarHeight, posterSize, posterHeight - topBarHeight);

    context.save();
    context.strokeStyle = "rgba(8, 117, 75, 0.045)";
    context.lineWidth = 2;
    for (let y = topBarHeight + 70; y < posterHeight; y += 92) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(posterSize, y);
      context.stroke();
    }
    context.restore();
    return;
  }

  context.save();
  const filters = [];
  if (blur > 0) {
    filters.push(`blur(${blur}px)`);
  }
  if (activePosterTemplate === "heritage") {
    filters.push("brightness(1.16)", "saturate(0.65)");
  } else if (activePosterTemplate === "victory") {
    filters.push("brightness(0.64)", "saturate(0.88)");
  } else if (activePosterTemplate === "editorial") {
    filters.push("brightness(0.78)", "saturate(0.82)");
  }
  if (filters.length) {
    context.filter = filters.join(" ");
  }
  drawCoverAsset(context, uploadedImage, 0, topBarHeight, posterSize, posterHeight - topBarHeight);
  context.restore();

  if (activePosterTemplate === "heritage") {
    context.fillStyle = "rgba(247, 246, 241, 0.58)";
    context.fillRect(0, topBarHeight, posterSize, posterHeight - topBarHeight);
  } else if (activePosterTemplate === "victory") {
    context.fillStyle = "rgba(0, 0, 0, 0.18)";
    context.fillRect(0, topBarHeight, posterSize, posterHeight - topBarHeight);
  }
}

function drawPlaceholder(context) {
  const posterHeight = getPosterHeight();
  const horizonY = templateOrientation === "portrait" ? 860 : 660;
  const backgrounds = {
    tour: ["#082e4c", "#0d3c5e", "#ffd100"],
    heritage: ["#f3f2ed", "#e9e7df", "#08754b"],
    victory: ["#111713", "#080b09", "#d43842"],
    editorial: ["#26351f", "#172316", "#ef4d57"]
  };
  const [topColor, bottomColor, accent] = backgrounds[activePosterTemplate] || backgrounds.tour;
  context.fillStyle = topColor;
  context.fillRect(0, topBarHeight, posterSize, posterHeight - topBarHeight);

  context.fillStyle = bottomColor;
  context.fillRect(0, horizonY, posterSize, posterHeight - horizonY);
  context.fillStyle = accent;
  context.fillRect(74, horizonY - 42, 160, 7);
  context.fillStyle = activePosterTemplate === "heritage"
    ? "rgba(8,117,75,0.18)"
    : "rgba(255,255,255,0.12)";
  context.fillRect(74, horizonY - 22, 330, 3);
}

function drawBrand(context) {
  const brand = elements.brandText.value.trim() || "GOLFBROTHERS";
  const isHeritage = activePosterTemplate === "heritage";
  const isVictory = activePosterTemplate === "victory";
  const isEditorial = activePosterTemplate === "editorial";
  context.fillStyle = isHeritage ? "#f3f2ed" : "#000";
  context.fillRect(0, 0, posterSize, topBarHeight);

  if (activePosterTemplate === "tour") {
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

    const splitPoint = brand.toUpperCase().startsWith("GOLF")
      ? 4
      : Math.max(4, Math.floor(brand.length * 0.45));
    const first = brand.slice(0, splitPoint).toUpperCase();
    const second = brand.slice(splitPoint).toUpperCase();
    context.textBaseline = "middle";
    context.textAlign = "left";
    context.font = "italic 900 40px Arial, sans-serif";
    context.fillStyle = "#fff";
    context.fillText(first, 146, 37);
    context.fillStyle = "#c99c32";
    context.fillText(second, 146 + context.measureText(first).width, 37);
    return;
  }

  const brandColor = isHeritage ? "#08754b" : "#ffffff";
  context.textBaseline = "middle";
  context.fillStyle = brandColor;
  context.font = `800 ${isVictory ? 31 : 28}px ${getEnglishFont()}`;

  if (isVictory) {
    context.textAlign = "center";
    const width = context.measureText(brand).width;
    context.fillText(brand, posterSize / 2, 38);
    context.strokeStyle = "rgba(255,255,255,0.6)";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(38, 38);
    context.lineTo(posterSize / 2 - width / 2 - 30, 38);
    context.moveTo(posterSize / 2 + width / 2 + 30, 38);
    context.lineTo(posterSize - 38, 38);
    context.stroke();
    return;
  }

  context.textAlign = "left";
  const brandX = isEditorial ? 44 : 50;
  context.fillText(brand, brandX, 38);
  const brandWidth = context.measureText(brand).width;
  context.strokeStyle = isHeritage ? "rgba(8,117,75,0.55)" : "rgba(255,255,255,0.62)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(brandX + brandWidth + 28, 38);
  context.lineTo(posterSize - 45, 38);
  context.stroke();
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

  const maskSource =
    activePosterTemplate === "heritage"
      ? subjectCutoutMaskSource || subjectMaskSource
      : subjectMaskSource;
  const layerCanvas = document.createElement("canvas");
  layerCanvas.width = posterSize;
  layerCanvas.height = getPosterHeight();
  const layerCtx = layerCanvas.getContext("2d");
  drawCoverAsset(layerCtx, uploadedImage, 0, topBarHeight, posterSize, getPosterHeight() - topBarHeight);
  layerCtx.globalCompositeOperation = "destination-in";
  drawCoverAsset(layerCtx, maskSource, 0, topBarHeight, posterSize, getPosterHeight() - topBarHeight);

  if (activePosterTemplate === "heritage") {
    context.save();
    context.shadowColor = "rgba(13, 47, 34, 0.14)";
    context.shadowBlur = 18;
    context.shadowOffsetY = 7;
    context.drawImage(layerCanvas, 0, 0);
    context.restore();
    return;
  }

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
  const nicknameAlign = layout.nicknameAlign || (templateOrientation === "portrait" ? "center" : "left");
  const clubAlign = layout.clubAlign || (templateOrientation === "portrait" ? "center" : "right");
  const editorialName = activePosterTemplate === "editorial";
  const serifItalic = activePosterTemplate === "heritage" || activePosterTemplate === "victory";

  context.save();
  if (activePosterTemplate !== "heritage") {
    context.shadowColor = "rgba(0,0,0,0.38)";
    context.shadowBlur = 10;
    context.shadowOffsetY = 2;
  }
  context.textBaseline = "alphabetic";

  if (nickname) {
    const position = elementPositions.nickname;
    const text = editorialName ? nickname.toUpperCase() : nickname;
    context.fillStyle = elements.nicknameColor.value;
    context.textAlign = nicknameAlign;
    const maxWidth = layout.nicknameMaxWidth || (nicknameAlign === "center" ? 500 : 460);
    const fontSize = fitText(context, text, maxWidth, Number(elements.nicknameFontSize.value), 14, getEnglishFont());
    if (serifItalic) {
      context.font = `italic 800 ${fontSize}px ${getEnglishFont()}`;
    }
    const textWidth = context.measureText(text).width;
    context.fillText(text, position.x, position.y);
    const left = nicknameAlign === "center"
      ? position.x - textWidth / 2
      : nicknameAlign === "right"
        ? position.x - textWidth
        : position.x;
    elementBounds.nickname = {
      x: left - 10,
      y: position.y - fontSize - 10,
      w: textWidth + 20,
      h: fontSize + 20
    };
  }

  if (club) {
    const position = elementPositions.club;
    context.fillStyle = elements.clubColor.value;
    context.textAlign = clubAlign;
    const maxWidth = layout.clubMaxWidth || (clubAlign === "center" ? 500 : 400);
    const fontSize = fitText(context, club, maxWidth, Number(elements.clubFontSize.value), 14, getEnglishFont());
    const textWidth = context.measureText(club).width;
    context.fillText(club, position.x, position.y);
    const left = clubAlign === "center"
      ? position.x - textWidth / 2
      : clubAlign === "right"
        ? position.x - textWidth
        : position.x;
    elementBounds.club = {
      x: left - 10,
      y: position.y - fontSize - 10,
      w: textWidth + 20,
      h: fontSize + 20
    };
  }

  if (extra) {
    const position = elementPositions.extra;
    const text = extra.toUpperCase();
    context.fillStyle = elements.extraColor.value;
    const maxWidth = layout.extraMaxWidth || (layout.extraVertical ? 560 : 860);
    const fontSize = fitText(context, text, maxWidth, Number(elements.extraFontSize.value), 12, getEnglishFont());
    const textWidth = context.measureText(text).width;
    context.globalAlpha = 0.9;
    context.textAlign = "center";
    if (layout.extraVertical) {
      context.save();
      context.translate(position.x, position.y);
      context.rotate(Math.PI / 2);
      context.fillText(text, 0, 0);
      context.restore();
      elementBounds.extra = {
        x: position.x - fontSize / 2 - 10,
        y: position.y - textWidth / 2 - 10,
        w: fontSize + 20,
        h: textWidth + 20
      };
    } else {
      context.fillText(text, position.x, position.y);
      elementBounds.extra = {
        x: position.x - textWidth / 2 - 10,
        y: position.y - fontSize - 10,
        w: textWidth + 20,
        h: fontSize + 20
      };
    }
  }
  context.restore();
}

function drawScoreCard(context) {
  const scores = parseScores();
  const highlights = parseHighlights();
  const badge = elements.badgeText.value.trim();
  const hasScoreContent = scores.some(Boolean) || Boolean(badge);
  const template = getActiveTemplate();
  const layout = getActiveLayout();
  const vertical = layout.scoreDirection === "vertical";
  const gridStyle = template.scoreStyle === "grid";

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
  if (!gridStyle) {
    context.globalAlpha = template.scoreStyle === "sidebar" ? 0.68 : 0.88;
    context.fillStyle = elements.scoreTableColor.value;
    context.fillRect(scoreBox.x, scoreBox.y, scoreBox.w, scoreBox.h);
    context.globalAlpha = 1;
  }

  const lineColor = gridStyle
    ? elements.scoreTableColor.value
    : activePosterTemplate === "tour"
      ? "rgba(255, 209, 0, 0.9)"
      : "rgba(255, 255, 255, 0.9)";
  context.strokeStyle = lineColor;
  context.lineWidth = gridStyle ? 2 : 3;
  context.beginPath();
  if (vertical) {
    context.moveTo(scoreBox.x + scoreBox.w / 2, scoreBox.y);
    context.lineTo(scoreBox.x + scoreBox.w / 2, scoreBox.y + scoreBox.h);
  } else {
    context.moveTo(scoreBox.x, scoreBox.y + scoreBox.h / 2);
    context.lineTo(scoreBox.x + scoreBox.w, scoreBox.y + scoreBox.h / 2);
  }
  context.stroke();

  if (gridStyle && !vertical) {
    const columnWidth = scoreBox.w / 9;
    for (let column = 1; column < 9; column += 1) {
      const x = scoreBox.x + columnWidth * column;
      context.beginPath();
      context.moveTo(x, scoreBox.y);
      context.lineTo(x, scoreBox.y + scoreBox.h);
      context.stroke();
    }
  }

  const cellW = vertical ? scoreBox.w / 2 : scoreBox.w / 9;
  const cellH = vertical ? scoreBox.h / 9 : scoreBox.h / 2;
  const scoreFontSize = Math.floor(Math.min(vertical ? 48 : 44, cellH * 0.55, cellW * 0.58));
  const highlightColor = activePosterTemplate === "heritage"
    ? elements.scoreTableColor.value
    : activePosterTemplate === "editorial"
      ? "#ef4d57"
      : activePosterTemplate === "victory"
        ? "#ffffff"
        : "#ffd100";
  const scoreColor = gridStyle ? elements.scoreTableColor.value : "#ffffff";

  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `900 ${scoreFontSize}px ${getNumberFont()}`;

  scores.forEach((score, index) => {
    const firstHalf = index < 9;
    const slot = index % 9;
    const col = vertical ? (firstHalf ? 0 : 1) : slot;
    const row = vertical ? slot : (firstHalf ? 0 : 1);
    const x = scoreBox.x + cellW * col + cellW / 2;
    const y = scoreBox.y + cellH * row + cellH / 2;
    const hole = index + 1;
    const markerRadius = Math.min(29, cellW * 0.34, cellH * 0.36);

    if (score && highlights.has(hole)) {
      context.strokeStyle = highlightColor;
      context.lineWidth = 3;
      if (gridStyle || activePosterTemplate !== "tour" || vertical) {
        context.beginPath();
        context.arc(x, y, markerRadius, 0, Math.PI * 2);
        context.stroke();
      } else {
        context.strokeRect(x - 28, y - 31, 56, 62);
      }
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
      context.fillStyle = scoreColor;
      context.font = `900 ${Math.max(22, scoreFontSize - 10)}px ${getNumberFont()}`;
      context.fillText(badge, x, y + 1);
      context.font = `900 ${scoreFontSize}px ${getNumberFont()}`;
      return;
    }

    if (score) {
      context.fillStyle = scoreColor;
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

  if (activePosterTemplate === "heritage") {
    context.save();
    context.strokeStyle = "rgba(8,117,75,0.22)";
    context.lineWidth = 2;
    context.strokeRect(28, topBarHeight + 28, posterSize - 56, posterHeight - topBarHeight - 56);
    context.restore();
    return;
  }

  const startRatio = activePosterTemplate === "victory"
    ? 0.46
    : activePosterTemplate === "editorial"
      ? 0.38
      : 0.56;
  const endAlpha = activePosterTemplate === "victory"
    ? 0.72
    : activePosterTemplate === "editorial"
      ? 0.58
      : 0.44;
  const gradientStart = posterHeight * startRatio;
  const bottomGradient = context.createLinearGradient(0, gradientStart, 0, posterHeight);
  bottomGradient.addColorStop(0, "rgba(0,0,0,0)");
  bottomGradient.addColorStop(1, `rgba(0,0,0,${endAlpha})`);
  context.fillStyle = bottomGradient;
  context.fillRect(0, gradientStart, posterSize, posterHeight - gradientStart);

  if (activePosterTemplate === "editorial") {
    context.fillStyle = "rgba(0,0,0,0.13)";
    context.fillRect(scoreBox.x - 24, scoreBox.y - 22, scoreBox.w + 48, scoreBox.h + 44);
  }
}

function renderPoster({ exporting = false } = {}) {
  const posterHeight = getPosterHeight();
  Object.keys(elementBounds).forEach((key) => delete elementBounds[key]);
  ctx.clearRect(0, 0, posterSize, posterHeight);
  ctx.save();
  roundedRect(ctx, 0, 0, posterSize, posterHeight, 26);
  ctx.clip();

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

  ctx.strokeStyle = activePosterTemplate === "heritage"
    ? "rgba(8,117,75,0.55)"
    : "rgba(255,255,255,0.8)";
  ctx.lineWidth = 4;
  roundedRect(ctx, 2, 2, posterSize - 4, posterHeight - 4, 26);
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

function createCutoutMask(maskCanvas) {
  const maxSide = 720;
  const scale = Math.min(1, maxSide / Math.max(maskCanvas.width, maskCanvas.height));
  const width = Math.max(1, Math.round(maskCanvas.width * scale));
  const height = Math.max(1, Math.round(maskCanvas.height * scale));
  const sample = document.createElement("canvas");
  sample.width = width;
  sample.height = height;
  const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
  sampleCtx.drawImage(maskCanvas, 0, 0, width, height);
  const imageData = sampleCtx.getImageData(0, 0, width, height);
  const pixels = imageData.data;

  let varyingAlpha = false;
  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] < 250) {
      varyingAlpha = true;
      break;
    }
  }

  const lowConfidence = 0.48;
  const highConfidence = 0.76;
  for (let i = 0; i < pixels.length; i += 4) {
    const confidence = varyingAlpha
      ? pixels[i + 3] / 255
      : (pixels[i] + pixels[i + 1] + pixels[i + 2]) / (255 * 3);
    const normalized = Math.max(
      0,
      Math.min(1, (confidence - lowConfidence) / (highConfidence - lowConfidence))
    );
    const feathered = normalized * normalized * (3 - 2 * normalized);
    pixels[i] = 255;
    pixels[i + 1] = 255;
    pixels[i + 2] = 255;
    pixels[i + 3] = Math.round(feathered * 255);
  }

  sampleCtx.putImageData(imageData, 0, 0);
  return sample;
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
      subjectCutoutMaskSource = createCutoutMask(mask);
      updateRecognitionStatus("person", "personRatio", {
        percent: Math.round(metrics.strongRatio * 100)
      });
    } else {
      subjectMaskSource = null;
      subjectCutoutMaskSource = null;
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
    subjectCutoutMaskSource = null;
    updateRecognitionStatus("fallback", "recognitionUnavailable");
  }
}

function requestSegmentation() {
  const token = ++segmentationToken;
  subjectMaskSource = null;
  subjectCutoutMaskSource = null;
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
  subjectCutoutMaskSource = null;
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
elements.landscapeTemplate.addEventListener("click", () => {
  setTemplateOrientation("landscape");
});
elements.portraitTemplate.addEventListener("click", () => {
  setTemplateOrientation("portrait");
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
applyPosterTemplate("tour");
updateAutoTotal();
updateZoomOutput();
updateBackgroundBlurOutput();
updateStyleOutputs();
updateStickerControls();
applyLanguage(currentLanguage, false);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(renderPoster);
}
