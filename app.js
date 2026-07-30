const POSTER_WIDTH = 1000;
const POSTER_HEIGHT = 1265;
const BRAND_HEIGHT = 70;
const MAX_STICKERS = 5;
const MASK_MAX_DIMENSION = 1080;
const CUTOUT_CONFIG = {
  segmentationEndpoint: "",
  segmentationHeaders: {},
  quality: "hd",
  ...(window.GOLF_POSTER_CONFIG || {})
};

const paletteCatalog = {
  forestGold: {
    zh: "松柏金",
    en: "Forest Gold",
    total: "#d8bd55",
    card: "#15533a",
    line: "#ead36d",
    scoreText: "#ffffff",
    text: "#ffffff"
  },
  roseMist: {
    zh: "粉红淡灰",
    en: "Rose Mist",
    total: "#f28aa5",
    card: "#77777d",
    line: "#f7bccb",
    scoreText: "#ffffff",
    text: "#fff7f8"
  },
  sapphireTan: {
    zh: "宝石蓝浅棕",
    en: "Sapphire Tan",
    total: "#1c5fa8",
    card: "#b89568",
    line: "#ead9bf",
    scoreText: "#ffffff",
    text: "#f8f2e9"
  },
  crimsonInk: {
    zh: "赤红墨黑",
    en: "Crimson Ink",
    total: "#dc3f4d",
    card: "#a92331",
    line: "#f4dadd",
    scoreText: "#ffffff",
    text: "#ffffff"
  },
  mastersYellow: {
    zh: "大师黄绿",
    en: "Masters Yellow",
    total: "#f4df3b",
    card: "#24733f",
    line: "#f4df3b",
    scoreText: "#ffffff",
    text: "#ffffff"
  },
  pineCoral: {
    zh: "松绿珊瑚",
    en: "Pine Coral",
    total: "#f0eee8",
    card: "#183a28",
    line: "#ef5e68",
    scoreText: "#f7f3ed",
    text: "#ffffff"
  },
  navySilver: {
    zh: "海军蓝银",
    en: "Navy Silver",
    total: "#e8edf0",
    card: "#173b59",
    line: "#b9c8d2",
    scoreText: "#ffffff",
    text: "#ffffff"
  },
  wineBlush: {
    zh: "酒红浅粉",
    en: "Wine Blush",
    total: "#f3b5bd",
    card: "#772d3b",
    line: "#f1c9ce",
    scoreText: "#ffffff",
    text: "#fff7f7"
  }
};

const fixedColorOptions = [
  { value: "#ffffff", zh: "白色", en: "White" },
  { value: "#101820", zh: "墨黑", en: "Black" },
  { value: "#dc3f4d", zh: "巡回红", en: "Tour Red" },
  { value: "#f28aa5", zh: "玫瑰粉", en: "Rose" },
  { value: "#f2b321", zh: "老鹰金", en: "Eagle Gold" },
  { value: "#f4df3b", zh: "大师黄", en: "Yellow" },
  { value: "#15533a", zh: "松柏绿", en: "Green" },
  { value: "#1c75bc", zh: "巡回蓝", en: "Tour Blue" }
];

const sharedBrand = { x: 0, y: 0, w: 1000, h: 70 };

const posterTemplates = {
  academy: {
    zh: "学院经典",
    en: "Academy Classic",
    descriptionZh: "通透网格与巨型总分",
    descriptionEn: "Open grid and oversized total",
    tone: "soft",
    scoreStyle: "grid",
    highlightShape: "mixed",
    paletteIds: ["forestGold", "roseMist", "sapphireTan"],
    defaults: { totalSize: 470, totalOpacity: 88, nicknameSize: 42, courseSize: 22, dateSize: 18 },
    layout: {
      brand: sharedBrand,
      total: { x: 100, y: 145, w: 800, h: 500 },
      score: { x: 130, y: 640, w: 740, h: 190, direction: "horizontal" },
      nickname: { x: 55, y: 855, w: 455, h: 68, align: "left", italic: true },
      course: { x: 585, y: 850, w: 355, h: 72, align: "left" },
      date: { x: 585, y: 925, w: 355, h: 34, align: "left" },
      extra: { x: 55, y: 930, w: 455, h: 34, align: "left" },
      subject: { x: 285, y: 345, w: 430, h: 810 }
    }
  },
  duo: {
    zh: "冠军红场",
    en: "Victory Red",
    descriptionZh: "暗场照片与红色成绩板",
    descriptionEn: "Dark photo with a red scorecard",
    tone: "dark",
    scoreStyle: "solid",
    highlightShape: "circle",
    paletteIds: ["crimsonInk", "roseMist", "sapphireTan"],
    defaults: { totalSize: 500, totalOpacity: 92, nicknameSize: 38, courseSize: 18, dateSize: 18 },
    layout: {
      brand: sharedBrand,
      total: { x: 110, y: 130, w: 780, h: 520 },
      nickname: { x: 170, y: 865, w: 660, h: 62, align: "center", italic: true },
      score: { x: 150, y: 945, w: 700, h: 190, direction: "horizontal" },
      course: { x: 150, y: 1152, w: 500, h: 40, align: "left" },
      date: { x: 665, y: 1152, w: 185, h: 40, align: "right" },
      extra: { x: 150, y: 1205, w: 700, h: 30, align: "center" },
      subject: { x: 90, y: 370, w: 820, h: 850 }
    }
  },
  masters: {
    zh: "大师赛黄标",
    en: "Masters Mark",
    descriptionZh: "顶部成绩板与黄色总分",
    descriptionEn: "Top scorecard and yellow total",
    tone: "natural",
    scoreStyle: "solid",
    highlightShape: "mixed",
    paletteIds: ["mastersYellow", "sapphireTan", "roseMist"],
    defaults: { totalSize: 610, totalOpacity: 86, nicknameSize: 42, courseSize: 20, dateSize: 18 },
    layout: {
      brand: sharedBrand,
      nickname: { x: 230, y: 98, w: 540, h: 60, align: "center", italic: true },
      score: { x: 230, y: 170, w: 540, h: 195, direction: "horizontal" },
      course: { x: 230, y: 382, w: 390, h: 40, align: "left" },
      date: { x: 635, y: 382, w: 135, h: 40, align: "right" },
      extra: { x: 230, y: 425, w: 540, h: 34, align: "center" },
      total: { x: 28, y: 500, w: 944, h: 650 },
      subject: { x: 250, y: 470, w: 560, h: 735 }
    }
  },
  sidebar: {
    zh: "杂志侧栏",
    en: "Editorial Sidebar",
    descriptionZh: "右侧纵向成绩与赛事信息",
    descriptionEn: "Vertical score and event sidebar",
    tone: "editorial",
    scoreStyle: "sidebar",
    highlightShape: "circle",
    paletteIds: ["pineCoral", "sapphireTan", "wineBlush"],
    defaults: { totalSize: 230, totalOpacity: 96, nicknameSize: 38, courseSize: 17, dateSize: 17 },
    layout: {
      brand: sharedBrand,
      nickname: { x: 605, y: 112, w: 350, h: 105, align: "center" },
      total: { x: 620, y: 245, w: 320, h: 235 },
      score: {
        x: 635,
        y: 500,
        w: 255,
        h: 650,
        direction: "vertical",
        dividerWidth: 4,
        columns: [
          { x: 650, y: 515, w: 95, h: 620 },
          { x: 780, y: 515, w: 95, h: 620 }
        ]
      },
      course: { x: 920, y: 500, w: 35, h: 650, align: "center", vertical: true },
      extra: { x: 40, y: 1185, w: 550, h: 32, align: "left" },
      subject: { x: 20, y: 330, w: 630, h: 865 }
    }
  },
  client1: {
    zh: "巡回典藏",
    en: "Tour Edition",
    descriptionZh: "横向两行成绩卡",
    descriptionEn: "Two-row horizontal scorecard",
    tone: "standard",
    scoreStyle: "solid",
    highlightShape: "mixed",
    paletteIds: ["forestGold", "sapphireTan", "roseMist"],
    defaults: { totalSize: 500, totalOpacity: 90, nicknameSize: 40, courseSize: 22, dateSize: 18 },
    layout: {
      brand: sharedBrand,
      nickname: { x: 230, y: 115, w: 540, h: 60, align: "center" },
      score: { x: 230, y: 190, w: 540, h: 200, direction: "horizontal" },
      course: { x: 230, y: 400, w: 540, h: 40, align: "center", combinesDate: true },
      extra: { x: 230, y: 450, w: 540, h: 34, align: "center" },
      total: { x: 60, y: 540, w: 880, h: 580 },
      subject: { x: 215, y: 360, w: 570, h: 850 }
    }
  },
  client2: {
    zh: "赛场纵章",
    en: "Matchday Column",
    descriptionZh: "左侧纵向成绩卡",
    descriptionEn: "Left vertical scorecard",
    tone: "editorial",
    scoreStyle: "sidebar",
    highlightShape: "circle",
    paletteIds: ["pineCoral", "navySilver", "wineBlush"],
    defaults: { totalSize: 180, totalOpacity: 92, nicknameSize: 40, courseSize: 20, dateSize: 18 },
    layout: {
      brand: sharedBrand,
      nickname: { x: 45, y: 150, w: 540, h: 60, align: "left" },
      total: { x: 85, y: 235, w: 290, h: 200 },
      score: {
        x: 85,
        y: 465,
        w: 290,
        h: 760,
        direction: "vertical",
        dividerWidth: 6,
        columns: [
          { x: 130, y: 500, w: 82, h: 675 },
          { x: 252, y: 500, w: 82, h: 675 }
        ]
      },
      course: { x: 49, y: 465, w: 35, h: 750, align: "center", vertical: true, combinesDate: true },
      extra: { x: 390, y: 1180, w: 560, h: 34, align: "right" },
      subject: { x: 360, y: 280, w: 600, h: 910 }
    }
  }
};

const fontOptions = [
  { id: "arial", label: "Arial", stack: 'Arial, "Helvetica Neue", sans-serif' },
  { id: "arialBlack", label: "Arial Black", stack: '"Arial Black", Impact, sans-serif' },
  { id: "impact", label: "Impact", stack: 'Impact, "Arial Narrow Bold", sans-serif' },
  { id: "georgia", label: "Georgia", stack: 'Georgia, "Times New Roman", serif' },
  { id: "times", label: "Times New Roman", stack: '"Times New Roman", Times, serif' },
  { id: "baskerville", label: "Baskerville", stack: 'Baskerville, Georgia, serif' },
  { id: "didot", label: "Didot", stack: 'Didot, "Times New Roman", serif' },
  { id: "trebuchet", label: "Trebuchet MS", stack: '"Trebuchet MS", Arial, sans-serif' },
  { id: "verdana", label: "Verdana", stack: 'Verdana, Geneva, sans-serif' },
  { id: "courier", label: "Courier New", stack: '"Courier New", Courier, monospace' }
];

const translations = {
  zh: {
    chooseTemplate: "选择海报模板",
    chooseTemplateHint: "点击模板可放大查看，选择后进入编辑。",
    next: "下一步",
    back: "上一步",
    confirmChange: "确认修改",
    preview: "预览",
    useTemplate: "选择此模板",
    templatePreview: "模板预览",
    posterPreview: "完整海报预览",
    photoStep: "照片",
    photoStepHint: "当前画布手势仅调整照片。",
    uploadPhoto: "上传照片",
    resetPhoto: "复位画布",
    photoScale: "照片大小",
    backgroundBlur: "背景模糊",
    edgeShrink: "边缘收缩",
    edgeFeather: "边缘柔化",
    subjectDepth: "人物景深",
    waitingPhoto: "等待上传照片",
    analyzingPhoto: "正在进行双层识别并精修人物边缘",
    personDetected: "人物已识别，本地精细边缘已生成",
    personDetectedHd: "人物已识别，高清模型抠图已生成",
    noPerson: "未识别到人物，按普通照片生成",
    retryRecognition: "重新识别",
    scorecardStep: "成绩卡",
    scorecardStepHint: "当前画布手势仅调整成绩卡。",
    palette: "模板配色",
    scoreMode: "成绩类型",
    strokesMode: "逐洞总杆",
    relativeMode: "杆差成绩",
    scoringStyle: "记分方式",
    scoresStrokes: "逐洞成绩",
    scoresRelative: "逐洞杆差",
    highlightHoles: "高亮洞号",
    badge: "首洞标记",
    scoreFont: "成绩字体",
    cardColor: "底板",
    lineColor: "分隔线",
    scoreTextColor: "数字",
    underMarkerColor: "小鸟标记",
    eagleMarkerColor: "老鹰及更好",
    overMarkerColor: "柏忌标记",
    doubleBogeyMarkerColor: "双柏忌及更差",
    scorecardScale: "成绩卡大小",
    totalStep: "总成绩",
    totalStepHint: "当前画布手势仅调整总成绩。",
    totalScore: "总杆",
    autoTotal: "自动统计",
    totalHintEmptyStrokes: "录入逐洞成绩后自动合计",
    totalHintEmptyRelative: "录入杆差并设置标准杆合计后换算总杆",
    totalHintManual: "自动统计已关闭，可手动输入",
    totalHintCount: "已统计 {count} 洞 · 总杆 {total}",
    totalHintRelativeCount: "标准杆 {par}，杆差 {difference}，总杆 {total}",
    roundParTotal: "本轮 / 已完成球洞标准杆合计",
    roundParHint: "18洞通常为72，9洞通常为36；用于把杆差换算成总杆。",
    numberFont: "数字字体",
    totalColor: "总成绩颜色",
    totalOpacity: "透明度",
    totalSize: "总成绩大小",
    totalAboveSubject: "总成绩置于人物上方",
    identityStep: "文字信息",
    identityStepHint: "选择一个文字元素后在画布中移动。",
    nickname: "昵称",
    course: "球场",
    date: "日期",
    extraInfo: "补充信息",
    textFont: "文字字体",
    textColor: "文字颜色",
    textSize: "当前文字大小",
    brandText: "品牌文字",
    stickerStep: "贴纸",
    stickerStepHint: "上传后选择贴纸，在画布中移动或缩放。",
    uploadSticker: "上传贴纸",
    stickerScale: "贴纸大小",
    removeSticker: "删除选中贴纸",
    summaryStep: "完成海报",
    summaryStepHint: "可直接跳回任意步骤修改，确认后自动返回这里。",
    summaryFreeEdit: "大图自由编辑",
    summaryFreeEditHint: "进入大图预览，直接点选并调整元素。",
    summaryElementSize: "当前元素大小",
    summaryNoSelection: "未选择",
    editTemplate: "修改模板",
    editPhoto: "修改照片",
    editScorecard: "修改成绩卡",
    editTotal: "修改总成绩",
    editIdentity: "修改文字",
    editStickers: "修改贴纸",
    downloadPoster: "下载完整海报",
    photoGesture: "拖动移动照片，双指缩放",
    scorecardGesture: "拖动移动成绩卡，双指缩放",
    totalGesture: "拖动移动总成绩，双指缩放",
    identityGesture: "拖动移动当前文字，双指缩放",
    stickerGesture: "拖动移动选中贴纸，双指缩放",
    summaryGesture: "完整预览",
    summaryEditGesture: "点选并拖动元素，下方滑杆调整大小",
    selectTemplateFirst: "请先选择模板"
  },
  en: {
    chooseTemplate: "Choose a poster template",
    chooseTemplateHint: "Tap a template to inspect it, then continue.",
    next: "NEXT",
    back: "BACK",
    confirmChange: "CONFIRM",
    preview: "PREVIEW",
    useTemplate: "USE TEMPLATE",
    templatePreview: "Template preview",
    posterPreview: "Full poster preview",
    photoStep: "Photo",
    photoStepHint: "Canvas gestures adjust only the photo.",
    uploadPhoto: "UPLOAD PHOTO",
    resetPhoto: "RESET LAYOUT",
    photoScale: "Photo size",
    backgroundBlur: "Background blur",
    edgeShrink: "Edge contract",
    edgeFeather: "Edge feather",
    subjectDepth: "Subject depth",
    waitingPhoto: "Waiting for a photo",
    analyzingPhoto: "Running two-pass subject detection and edge refinement",
    personDetected: "Subject detected; locally refined edges are ready",
    personDetectedHd: "Subject detected; HD model cutout is ready",
    noPerson: "No subject detected; using the full photo",
    retryRecognition: "RETRY",
    scorecardStep: "Scorecard",
    scorecardStepHint: "Canvas gestures adjust only the scorecard.",
    palette: "Template palette",
    scoreMode: "Score input",
    strokesMode: "Strokes",
    relativeMode: "To par",
    scoringStyle: "Scoring style",
    scoresStrokes: "Hole scores",
    scoresRelative: "Hole-by-hole to par",
    highlightHoles: "Highlight holes",
    badge: "First-hole badge",
    scoreFont: "Score font",
    cardColor: "Board",
    lineColor: "Rules",
    scoreTextColor: "Numbers",
    underMarkerColor: "Birdie",
    eagleMarkerColor: "Eagle or better",
    overMarkerColor: "Bogey",
    doubleBogeyMarkerColor: "Double bogey +",
    scorecardScale: "Scorecard size",
    totalStep: "Total",
    totalStepHint: "Canvas gestures adjust only the total.",
    totalScore: "Total strokes",
    autoTotal: "Auto total",
    totalHintEmptyStrokes: "Hole scores will be totaled automatically",
    totalHintEmptyRelative: "Enter scores to par and a par total to calculate strokes",
    totalHintManual: "Auto total is off; enter a value",
    totalHintCount: "{count} holes counted · {total} strokes",
    totalHintRelativeCount: "Par {par}, {difference} to par, {total} strokes",
    roundParTotal: "Round / completed-hole par total",
    roundParHint: "Usually 72 for 18 holes or 36 for 9; converts scores to par into strokes.",
    numberFont: "Number font",
    totalColor: "Total color",
    totalOpacity: "Opacity",
    totalSize: "Total size",
    totalAboveSubject: "Total above player",
    identityStep: "Text",
    identityStepHint: "Choose one text element, then move it on canvas.",
    nickname: "Name",
    course: "Course",
    date: "Date",
    extraInfo: "Additional info",
    textFont: "Text font",
    textColor: "Text color",
    textSize: "Active text size",
    brandText: "Brand text",
    stickerStep: "Stickers",
    stickerStepHint: "Select a sticker, then move or scale it on canvas.",
    uploadSticker: "UPLOAD STICKER",
    stickerScale: "Sticker size",
    removeSticker: "REMOVE STICKER",
    summaryStep: "Poster complete",
    summaryStepHint: "Jump directly to any step; confirm to return here.",
    summaryFreeEdit: "LARGE PREVIEW EDIT",
    summaryFreeEditHint: "Open the full-size poster to select, drag and resize elements.",
    summaryElementSize: "Active element size",
    summaryNoSelection: "Nothing selected",
    editTemplate: "EDIT TEMPLATE",
    editPhoto: "EDIT PHOTO",
    editScorecard: "EDIT SCORECARD",
    editTotal: "EDIT TOTAL",
    editIdentity: "EDIT TEXT",
    editStickers: "EDIT STICKERS",
    downloadPoster: "DOWNLOAD POSTER",
    photoGesture: "Drag to move photo; pinch to scale",
    scorecardGesture: "Drag to move scorecard; pinch to scale",
    totalGesture: "Drag to move total; pinch to scale",
    identityGesture: "Drag active text; pinch to scale",
    stickerGesture: "Drag selected sticker; pinch to scale",
    summaryGesture: "Full preview",
    summaryEditGesture: "Select and drag an element; use the slider below to resize",
    selectTemplateFirst: "Choose a template first"
  }
};

const stepOrder = ["template", "photo", "scorecard", "total", "identity", "stickers", "summary"];
const editorStepTitles = {
  photo: "photoStep",
  scorecard: "scorecardStep",
  total: "totalStep",
  identity: "identityStep",
  stickers: "stickerStep",
  summary: "summaryStep"
};
const gestureKeys = {
  photo: "photoGesture",
  scorecard: "scorecardGesture",
  total: "totalGesture",
  identity: "identityGesture",
  stickers: "stickerGesture",
  summary: "summaryGesture"
};

const elements = Object.fromEntries(
  [
    "app", "languageSelect", "resetPoster", "templateScreen", "templateGallery",
    "templateNext", "editorScreen", "stepCounter", "stepTitle", "openPosterPreview",
    "posterCanvas", "gestureHint", "controlScroller", "photoInput", "resetPhoto",
    "photoScale", "photoScaleValue", "backgroundBlur", "backgroundBlurValue",
    "edgeShrink", "edgeShrinkValue", "edgeFeather", "edgeFeatherValue",
    "recognitionDetail", "retrySegmentation", "paletteList", "scoreStyleControl",
    "scoreInputLabel", "scoreInput", "highlightControl", "highlightInput",
    "badgeText", "scoreFont", "cardColorOptions", "lineColorOptions",
    "scoreTextColorOptions", "underMarkerColorOptions", "eagleMarkerColorOptions",
    "overMarkerColorOptions", "doubleBogeyMarkerColorOptions",
    "scorecardScale", "scorecardScaleValue", "totalScore",
    "autoTotal", "totalHint", "roundParControl", "roundParInput",
    "numberFont", "totalColorOptions", "totalOpacity",
    "totalOpacityValue", "totalSize", "totalSizeValue", "totalAboveSubject",
    "nickname", "course", "dateInput", "extraInfo", "textFont", "textColor",
    "identitySize", "identitySizeValue", "brandText", "stickerUploadButton",
    "stickerInput", "stickerCount", "stickerList", "stickerScale",
    "stickerScaleValue", "removeSticker", "downloadPoster", "backButton",
    "openFreeEdit", "summarySelectedLabel", "summaryElementScale",
    "summaryElementScaleValue",
    "nextButton", "previewModal", "closePreviewModal", "previewModalTitle",
    "previewDialog", "modalCanvas", "modalEditControls", "useTemplateButton"
  ].map((id) => [id, document.getElementById(id)])
);

const canvas = elements.posterCanvas;
const ctx = canvas.getContext("2d");
const modalCtx = elements.modalCanvas.getContext("2d");

let language = "zh";
let selectedTemplateId = null;
let currentStep = "template";
let returnToSummary = false;
let activeIdentityTarget = "nickname";
let summaryEditEnabled = false;
let summaryEditTarget = null;
let modalMode = "template";
let modalTemplateId = null;
let state = createModel("academy", false);
let stickerIdCounter = 0;
let segmentationToken = 0;
let selfieSegmenter = null;
let segmentationLibraryPromise = null;
let pendingSegmentationResolve = null;
let segmentationQueue = Promise.resolve();
let maskTuningTimer = null;
let sourcePhotoFile = null;
let gestureTarget = null;
const activePointers = new Map();
let lastGestureCenter = null;
let lastGestureDistance = 0;
let sceneBounds = {};
let modalSceneBounds = {};
let activeGestureCanvas = null;

function translate(key, params = {}) {
  const dictionary = translations[language] || translations.zh;
  let text = dictionary[key] || translations.zh[key] || key;
  Object.entries(params).forEach(([name, value]) => {
    text = text.split(`{${name}}`).join(String(value));
  });
  return text;
}

function templateName(template) {
  return language === "en" ? template.en : template.zh;
}

function templateDescription(template) {
  return language === "en" ? template.descriptionEn : template.descriptionZh;
}

function paletteName(palette) {
  return language === "en" ? palette.en : palette.zh;
}

function fontStack(id) {
  return fontOptions.find((font) => font.id === id)?.stack || fontOptions[0].stack;
}

function centerOf(region) {
  return { x: region.x + region.w / 2, y: region.y + region.h / 2 };
}

function createModel(templateId, sample) {
  const template = posterTemplates[templateId];
  const paletteId = template.paletteIds[0];
  const palette = paletteCatalog[paletteId];
  const nickname = centerOf(template.layout.nickname);
  const course = centerOf(template.layout.course);
  const date = template.layout.date ? centerOf(template.layout.date) : centerOf(template.layout.course);
  const extra = centerOf(template.layout.extra);
  const total = centerOf(template.layout.total);
  const scorecard = centerOf(template.layout.score);
  return {
    templateId,
    photo: null,
    subjectMaskBase: null,
    subjectCutout: null,
    segmentationState: "idle",
    segmentationSource: "none",
    image: { scale: 1, x: 0, y: 0, blur: 0 },
    edge: { shrink: 1, feather: 1 },
    scoreMode: "relative",
    scoreSets: {
      strokes: sample
        ? ["4", "4", "5", "3", "4", "3", "4", "4", "5", "4", "3", "4", "4", "4", "3", "4", "3", "5"]
        : Array(18).fill(""),
      relative: sample
        ? ["-1", "0", "0", "+1", "-1", "-2", "0", "+1", "0", "0", "-1", "+1", "0", "0", "-1", "0", "+1", "0"]
        : Array(18).fill("")
    },
    scoringStyle: "pga",
    highlights: sample ? new Set([3, 6, 14]) : new Set(),
    badge: "",
    autoTotal: true,
    roundPar: 72,
    total: {
      value: sample ? "70" : "",
      x: total.x,
      y: total.y,
      size: template.defaults.totalSize,
      opacity: template.defaults.totalOpacity,
      aboveSubject: false
    },
    scorecard: { x: scorecard.x, y: scorecard.y, scale: 1 },
    identity: {
      nickname: {
        value: sample ? (templateId === "duo" ? "PLAYER ONE & PLAYER TWO" : "PLAYER NAME") : "",
        x: nickname.x,
        y: nickname.y,
        size: template.defaults.nicknameSize,
        color: palette.text,
        font: "georgia"
      },
      course: {
        value: sample ? "GOLF CLUB / CHAMPIONSHIP" : "",
        x: course.x,
        y: course.y,
        size: template.defaults.courseSize,
        color: palette.text,
        font: "georgia"
      },
      date: {
        value: sample ? "2026.07.29" : "",
        x: date.x,
        y: date.y,
        size: template.defaults.dateSize,
        color: palette.text,
        font: "georgia"
      },
      extra: {
        value: sample ? "ROUND ONE" : "",
        x: extra.x,
        y: extra.y,
        size: template.defaults.dateSize,
        color: palette.text,
        font: "georgia"
      },
      brand: "GOLFBROTHERS"
    },
    paletteId,
    style: {
      total: palette.total,
      card: palette.card,
      line: palette.line,
      scoreText: palette.scoreText,
      text: palette.text,
      underMarker: "#dc3f4d",
      eagleMarker: "#f2b321",
      overMarker: "#101820",
      doubleBogeyMarker: "#1c75bc"
    },
    fonts: {
      score: templateId === "client1" ? "arialBlack" : "georgia",
      total: templateId === "client1" ? "arialBlack" : "georgia"
    },
    stickers: [],
    selectedStickerId: null,
    previewSubject: sample
  };
}

function preserveContent(next, previous) {
  next.photo = previous.photo;
  next.subjectMaskBase = previous.subjectMaskBase;
  next.subjectCutout = previous.subjectCutout;
  next.segmentationState = previous.segmentationState;
  next.segmentationSource = previous.segmentationSource;
  next.image = { ...previous.image };
  next.edge = { ...previous.edge };
  next.scoreMode = previous.scoreMode;
  next.scoreSets = {
    strokes: [...previous.scoreSets.strokes],
    relative: [...previous.scoreSets.relative]
  };
  next.scoringStyle = previous.scoringStyle;
  next.highlights = new Set(previous.highlights);
  next.badge = previous.badge;
  next.autoTotal = previous.autoTotal;
  next.roundPar = previous.roundPar;
  next.total.value = previous.total.value;
  next.total.aboveSubject = previous.total.aboveSubject;
  next.identity.nickname.value = previous.identity.nickname.value;
  next.identity.course.value = previous.identity.course.value;
  next.identity.date.value = previous.identity.date.value;
  next.identity.extra.value = previous.identity.extra.value;
  next.identity.brand = previous.identity.brand;
  next.stickers = previous.stickers.map((sticker) => ({ ...sticker }));
  next.selectedStickerId = previous.selectedStickerId;
  return next;
}

function activateTemplate(templateId, preserve = true) {
  const next = createModel(templateId, false);
  state = preserve ? preserveContent(next, state) : next;
  selectedTemplateId = templateId;
  if (activeIdentityTarget === "date" && !posterTemplates[templateId].layout.date) {
    activeIdentityTarget = "course";
  }
  syncAllControls();
  renderTemplateGallery();
  renderMain();
}

function applyPalette(paletteId) {
  const palette = paletteCatalog[paletteId];
  if (!palette) return;
  state.paletteId = paletteId;
  state.style = {
    total: palette.total,
    card: palette.card,
    line: palette.line,
    scoreText: palette.scoreText,
    text: palette.text,
    underMarker: "#dc3f4d",
    eagleMarker: "#f2b321",
    overMarker: "#101820",
    doubleBogeyMarker: "#1c75bc"
  };
  ["nickname", "course", "date", "extra"].forEach((key) => {
    state.identity[key].color = palette.text;
  });
  syncColorControls();
  renderPaletteList();
  renderMain();
}

function populateFontSelect(select) {
  select.innerHTML = "";
  fontOptions.forEach((font) => {
    const option = document.createElement("option");
    option.value = font.id;
    option.textContent = font.label;
    select.appendChild(option);
  });
}

function renderTemplateGallery() {
  elements.templateGallery.innerHTML = "";
  Object.entries(posterTemplates).forEach(([id, template]) => {
    const button = document.createElement("button");
    button.className = "template-card";
    button.type = "button";
    button.dataset.templateId = id;
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", String(selectedTemplateId === id));

    const thumb = document.createElement("canvas");
    thumb.width = 260;
    thumb.height = Math.round(260 * POSTER_HEIGHT / POSTER_WIDTH);
    thumb.setAttribute("aria-hidden", "true");

    const meta = document.createElement("span");
    meta.className = "template-card__meta";
    const name = document.createElement("strong");
    name.textContent = templateName(template);
    const description = document.createElement("span");
    description.textContent = templateDescription(template);
    meta.append(name, description);

    const check = document.createElement("span");
    check.className = "template-check";
    check.textContent = "✓";
    check.setAttribute("aria-hidden", "true");
    button.append(thumb, meta, check);
    button.addEventListener("click", () => {
      activateTemplate(id, true);
      elements.templateNext.disabled = false;
      openTemplatePreview(id);
    });
    elements.templateGallery.appendChild(button);
    renderTemplateThumbnail(thumb, id);
  });
}

function renderTemplateThumbnail(canvasElement, templateId) {
  const previewCtx = canvasElement.getContext("2d");
  const scale = canvasElement.width / POSTER_WIDTH;
  previewCtx.setTransform(scale, 0, 0, scale, 0, 0);
  renderScene(previewCtx, createModel(templateId, true), { showGuide: false });
  previewCtx.setTransform(1, 0, 0, 1, 0, 0);
}

function renderPaletteList() {
  elements.paletteList.innerHTML = "";
  const template = posterTemplates[state.templateId];
  template.paletteIds.forEach((id) => {
    const palette = paletteCatalog[id];
    const button = document.createElement("button");
    button.type = "button";
    button.className = `palette-option${state.paletteId === id ? " is-active" : ""}`;
    const swatches = document.createElement("span");
    swatches.className = "palette-swatches";
    [palette.total, palette.card, palette.line].forEach((color) => {
      const swatch = document.createElement("i");
      swatch.style.background = color;
      swatches.appendChild(swatch);
    });
    const label = document.createElement("strong");
    label.textContent = paletteName(palette);
    button.append(swatches, label);
    button.addEventListener("click", () => applyPalette(id));
    elements.paletteList.appendChild(button);
  });
}

function renderStickerList() {
  elements.stickerList.innerHTML = "";
  state.stickers.forEach((sticker, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `sticker-item${state.selectedStickerId === sticker.id ? " is-active" : ""}`;
    button.title = `${translate("stickerStep")} ${index + 1}`;
    const image = document.createElement("img");
    image.src = sticker.url;
    image.alt = "";
    button.appendChild(image);
    button.addEventListener("click", () => {
      state.selectedStickerId = sticker.id;
      syncStickerControls();
      renderStickerList();
      renderMain();
    });
    elements.stickerList.appendChild(button);
  });
  elements.stickerCount.textContent = `${state.stickers.length} / ${MAX_STICKERS}`;
  elements.stickerUploadButton.classList.toggle("is-disabled", state.stickers.length >= MAX_STICKERS);
}

function fixedColorName(option) {
  return language === "en" ? option.en : option.zh;
}

function renderFixedColorOptions(container, styleKey, whiteLocked = false) {
  container.innerHTML = "";
  const current = state.style[styleKey].toLowerCase();
  const hasCurrent = fixedColorOptions.some((option) => option.value.toLowerCase() === current);
  const options = whiteLocked || hasCurrent
    ? fixedColorOptions
    : [{ value: current, zh: "当前配色", en: "Current palette" }, ...fixedColorOptions];
  options.forEach((option) => {
    const optionValue = option.value.toLowerCase();
    const lockedWhite = whiteLocked && optionValue === "#ffffff";
    const button = document.createElement("button");
    button.type = "button";
    button.className = [
      "fixed-color-option",
      optionValue === current && !whiteLocked ? "is-active" : "",
      lockedWhite ? "is-active is-locked-white" : "",
      whiteLocked && !lockedWhite ? "is-unavailable" : ""
    ].filter(Boolean).join(" ");
    button.style.background = option.value;
    if (whiteLocked) {
      button.disabled = true;
      const status = language === "en"
        ? lockedWhite ? "locked" : "unavailable on this board"
        : lockedWhite ? "已锁定" : "当前底板不可用";
      button.title = `${fixedColorName(option)} · ${status}`;
      button.setAttribute("aria-label", `${fixedColorName(option)}，${status}`);
      if (lockedWhite) {
        const lock = document.createElement("span");
        lock.className = "color-lock-icon";
        lock.setAttribute("aria-hidden", "true");
        button.appendChild(lock);
      }
    } else {
      button.title = fixedColorName(option);
      button.setAttribute("aria-label", fixedColorName(option));
      button.addEventListener("click", () => {
        state.paletteId = "custom";
        state.style[styleKey] = option.value;
        renderFixedColorControls();
        renderPaletteList();
        renderMain();
      });
    }
    container.appendChild(button);
  });
}

function renderFixedColorControls() {
  const whiteOnlyStyleKeys = new Set([
    "scoreText",
    "underMarker",
    "eagleMarker",
    "overMarker",
    "doubleBogeyMarker"
  ]);
  const lockScoreColors = !isLightNeutralBoard(state.style.card);
  [
    [elements.cardColorOptions, "card"],
    [elements.lineColorOptions, "line"],
    [elements.scoreTextColorOptions, "scoreText"],
    [elements.underMarkerColorOptions, "underMarker"],
    [elements.eagleMarkerColorOptions, "eagleMarker"],
    [elements.overMarkerColorOptions, "overMarker"],
    [elements.doubleBogeyMarkerColorOptions, "doubleBogeyMarker"],
    [elements.totalColorOptions, "total"]
  ].forEach(([container, styleKey]) => {
    const field = container.closest(".color-choice-field");
    if (field) field.hidden = false;
    renderFixedColorOptions(
      container,
      styleKey,
      lockScoreColors && whiteOnlyStyleKeys.has(styleKey)
    );
  });
}

function syncColorControls() {
  renderFixedColorControls();
  elements.textColor.value = state.identity[effectiveIdentityTarget()].color;
}

function syncIdentityControls() {
  elements.nickname.value = state.identity.nickname.value;
  elements.course.value = state.identity.course.value;
  elements.dateInput.value = /^\d{4}-\d{2}-\d{2}$/.test(state.identity.date.value)
    ? state.identity.date.value
    : "";
  elements.extraInfo.value = state.identity.extra.value;
  elements.brandText.value = state.identity.brand;
  syncIdentitySelectionControls();
}

function syncIdentitySelectionControls() {
  const target = effectiveIdentityTarget();
  elements.textFont.value = state.identity[target].font;
  elements.textColor.value = state.identity[target].color;
  elements.identitySize.value = String(state.identity[target].size);
  elements.identitySizeValue.textContent = `${Math.round(state.identity[target].size)}px`;
  document.querySelectorAll(".identity-target").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.target === activeIdentityTarget);
    if (button.dataset.target === "date") {
      button.disabled = !posterTemplates[state.templateId].layout.date;
    }
  });
}

function activateIdentityTarget(target, render = true) {
  const layout = posterTemplates[state.templateId].layout;
  activeIdentityTarget = target === "date" && !layout.date ? "course" : target;
  syncIdentitySelectionControls();
  if (render) renderMain();
}

function commitIdentityInputs() {
  state.identity.nickname.value = elements.nickname.value;
  state.identity.course.value = elements.course.value;
  state.identity.date.value = elements.dateInput.value;
  state.identity.extra.value = elements.extraInfo.value;
}

function syncStickerControls() {
  const sticker = selectedSticker();
  elements.stickerScale.disabled = !sticker;
  elements.removeSticker.disabled = !sticker;
  if (sticker) {
    elements.stickerScale.value = String(Math.round(sticker.scale * 100));
    elements.stickerScaleValue.textContent = `${Math.round(sticker.scale * 100)}%`;
  } else {
    elements.stickerScale.value = "100";
    elements.stickerScaleValue.textContent = "100%";
  }
}

function syncTotalControls() {
  elements.totalScore.value = state.total.value;
  elements.totalScore.readOnly = state.autoTotal;
  elements.totalScore.classList.toggle("is-auto", state.autoTotal);
  elements.autoTotal.checked = state.autoTotal;
  elements.roundParInput.value = Number.isFinite(state.roundPar) ? String(state.roundPar) : "";
  elements.totalOpacity.value = String(state.total.opacity);
  elements.totalOpacityValue.textContent = `${Math.round(state.total.opacity)}%`;
  elements.totalSize.value = String(Math.round(state.total.size));
  elements.totalSizeValue.textContent = `${Math.round(state.total.size)}px`;
  elements.totalAboveSubject.checked = state.total.aboveSubject;
  updateTotalHint();
}

function activeScores(model = state) {
  return model.scoreSets[model.scoreMode];
}

function syncScoreModeControls() {
  const relative = state.scoreMode === "relative";
  elements.scoreInput.value = activeScores().filter(Boolean).join(" ");
  elements.scoreInputLabel.textContent = translate(
    relative ? "scoresRelative" : "scoresStrokes"
  );
  elements.scoreInput.placeholder = language === "en"
    ? relative
      ? "Example: -1 0 +1, separated by spaces or commas"
      : "Example: 4 5 3, separated by spaces or commas"
    : relative
      ? "例如：-1 0 +1，用空格或逗号分隔"
      : "例如：4 5 3，用空格或逗号分隔";
  elements.scoreStyleControl.hidden = !relative;
  elements.roundParControl.hidden = !relative;
  elements.highlightControl.hidden = relative;
  elements.highlightInput.value = [...state.highlights].join(",");
  document.querySelectorAll(".score-mode-target").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.scoreMode === state.scoreMode);
  });
  document.querySelectorAll(".score-style-target").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.scoreStyle === state.scoringStyle);
  });
}

function syncAllControls() {
  elements.photoScale.value = String(Math.round(state.image.scale * 100));
  elements.photoScaleValue.textContent = `${Math.round(state.image.scale * 100)}%`;
  elements.backgroundBlur.value = String(state.image.blur);
  elements.backgroundBlurValue.textContent = `${state.image.blur}px`;
  elements.edgeShrink.value = String(state.edge.shrink);
  elements.edgeShrinkValue.textContent = `${state.edge.shrink > 0 ? "+" : ""}${state.edge.shrink}px`;
  elements.edgeFeather.value = String(state.edge.feather);
  elements.edgeFeatherValue.textContent = `${state.edge.feather}px`;
  elements.badgeText.value = state.badge;
  elements.scoreFont.value = state.fonts.score;
  elements.numberFont.value = state.fonts.total;
  elements.scorecardScale.value = String(Math.round(state.scorecard.scale * 100));
  elements.scorecardScaleValue.textContent = `${Math.round(state.scorecard.scale * 100)}%`;
  syncScoreModeControls();
  syncColorControls();
  syncTotalControls();
  syncIdentityControls();
  syncStickerControls();
  syncSummaryEditControls();
  renderPaletteList();
  renderStickerList();
  updateRecognitionUi();
}

function parseScores(value, mode = state.scoreMode) {
  const scores = value
    .split(/[\s,，、]+/)
    .map((item) => mode === "relative" ? scoreDifference(item) : strokeScore(item))
    .filter((score) => score !== null)
    .map((score) => mode === "relative" ? formatRelativeScore(score) : String(score))
    .slice(0, 18);
  while (scores.length < 18) scores.push("");
  return scores;
}

function strokeScore(value) {
  const normalized = String(value ?? "").trim();
  if (!/^\d{1,2}$/.test(normalized)) return null;
  const number = Number.parseInt(normalized, 10);
  return number >= 1 && number <= 20 ? number : null;
}

function scoreDifference(value) {
  const normalized = String(value ?? "")
    .trim()
    .toUpperCase()
    .replace(/[−–—]/g, "-");
  if (!normalized) return null;
  if (normalized === "E" || normalized === "EVEN") return 0;
  if (!/^[+-]?\d+$/.test(normalized)) return null;
  const number = Number.parseInt(normalized, 10);
  return Number.isFinite(number) && number >= -9 && number <= 9 ? number : null;
}

function formatRelativeScore(value) {
  if (!Number.isFinite(value)) return "";
  if (value === 0) return "0";
  return value > 0 ? `+${value}` : String(value).replace("-", "−");
}

function rgbFromHex(value) {
  const normalized = String(value || "").trim().replace("#", "");
  const hex = normalized.length === 3
    ? normalized.split("").map((character) => character + character).join("")
    : normalized;
  if (!/^[0-9a-f]{6}$/i.test(hex)) return null;
  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16)
  };
}

function colorLuminance(value) {
  const rgb = rgbFromHex(value);
  if (!rgb) return 0;
  const channels = [rgb.r, rgb.g, rgb.b].map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function colorContrast(first, second) {
  const light = Math.max(colorLuminance(first), colorLuminance(second));
  const dark = Math.min(colorLuminance(first), colorLuminance(second));
  return (light + 0.05) / (dark + 0.05);
}

function readableScoreColor(background, preferred) {
  if (colorLuminance(background) < 0.28) return "#ffffff";
  if (colorContrast(background, preferred) >= 3) return preferred;
  return colorContrast(background, "#ffffff") >= colorContrast(background, "#101820")
    ? "#ffffff"
    : "#101820";
}

function isLightNeutralBoard(value) {
  const rgb = rgbFromHex(value);
  if (!rgb) return false;
  const channels = [rgb.r, rgb.g, rgb.b];
  const channelSpread = Math.max(...channels) - Math.min(...channels);
  return colorLuminance(value) >= 0.68 && channelSpread <= 32;
}

function scorecardTextColor(modelStyle) {
  if (!isLightNeutralBoard(modelStyle.card)) return "#ffffff";
  return readableScoreColor(modelStyle.card, modelStyle.scoreText);
}

function parseHighlights(value) {
  return new Set(
    value
      .split(/[\s,，、]+/)
      .map((item) => Number.parseInt(item, 10))
      .filter((number) => Number.isFinite(number) && number >= 1 && number <= 18)
  );
}

function updateAutoTotal() {
  if (state.autoTotal) {
    const relative = state.scoreMode === "relative";
    const numeric = activeScores()
      .map(relative ? scoreDifference : strokeScore)
      .filter((score) => score !== null);
    if (!numeric.length) {
      state.total.value = "";
    } else if (relative) {
      state.total.value = Number.isFinite(state.roundPar)
        ? String(state.roundPar + numeric.reduce((sum, score) => sum + score, 0))
        : "";
    } else {
      state.total.value = String(numeric.reduce((sum, score) => sum + score, 0));
    }
  }
  syncTotalControls();
  renderMain();
}

function updateTotalHint() {
  const relative = state.scoreMode === "relative";
  const numeric = activeScores()
    .map(relative ? scoreDifference : strokeScore)
    .filter((score) => score !== null);
  const count = numeric.length;
  if (!state.autoTotal) {
    elements.totalHint.textContent = translate("totalHintManual");
  } else if (count) {
    if (relative) {
      if (Number.isFinite(state.roundPar)) {
        const difference = numeric.reduce((sum, score) => sum + score, 0);
        elements.totalHint.textContent = translate("totalHintRelativeCount", {
          par: state.roundPar,
          difference: formatRelativeScore(difference),
          total: state.total.value
        });
      } else {
        elements.totalHint.textContent = translate("totalHintEmptyRelative");
      }
    } else {
      elements.totalHint.textContent = translate("totalHintCount", {
        count,
        total: state.total.value
      });
    }
  } else {
    elements.totalHint.textContent = translate(
      relative ? "totalHintEmptyRelative" : "totalHintEmptyStrokes"
    );
  }
}

function drawCover(context, asset, model) {
  const width = asset.naturalWidth || asset.width;
  const height = asset.naturalHeight || asset.height;
  const cover = Math.max(POSTER_WIDTH / width, (POSTER_HEIGHT - BRAND_HEIGHT) / height) * model.image.scale;
  const drawWidth = width * cover;
  const drawHeight = height * cover;
  const x = (POSTER_WIDTH - drawWidth) / 2 + model.image.x;
  const y = BRAND_HEIGHT + (POSTER_HEIGHT - BRAND_HEIGHT - drawHeight) / 2 + model.image.y;
  context.drawImage(asset, x, y, drawWidth, drawHeight);
}

function drawPlaceholder(context, template, model) {
  const palette = model.style;
  const gradient = context.createLinearGradient(0, BRAND_HEIGHT, POSTER_WIDTH, POSTER_HEIGHT);
  if (template.tone === "dark") {
    gradient.addColorStop(0, "#25372b");
    gradient.addColorStop(1, "#080b09");
  } else if (template.tone === "soft") {
    gradient.addColorStop(0, "#799c83");
    gradient.addColorStop(1, "#294e37");
  } else {
    gradient.addColorStop(0, "#5f8f70");
    gradient.addColorStop(1, "#183a29");
  }
  context.fillStyle = gradient;
  context.fillRect(0, BRAND_HEIGHT, POSTER_WIDTH, POSTER_HEIGHT - BRAND_HEIGHT);
  context.fillStyle = "rgba(255,255,255,0.08)";
  context.beginPath();
  context.moveTo(0, 830);
  context.lineTo(420, 590);
  context.lineTo(1000, 760);
  context.lineTo(1000, 1265);
  context.lineTo(0, 1265);
  context.closePath();
  context.fill();
  context.fillStyle = palette.line;
  context.globalAlpha = 0.22;
  context.fillRect(0, 600, POSTER_WIDTH, 4);
  context.globalAlpha = 1;
}

function drawBackground(context, template, model) {
  if (!model.photo) {
    drawPlaceholder(context, template, model);
    return;
  }
  context.save();
  const filters = [];
  if (model.image.blur > 0) filters.push(`blur(${model.image.blur}px)`);
  if (template.tone === "dark") filters.push("brightness(0.62)", "saturate(0.82)", "contrast(1.08)");
  if (template.tone === "soft") filters.push("brightness(1.04)", "saturate(0.78)");
  if (template.tone === "editorial") filters.push("brightness(0.76)", "saturate(0.84)");
  if (template.tone === "natural") filters.push("brightness(0.9)", "saturate(0.94)");
  if (filters.length) context.filter = filters.join(" ");
  drawCover(context, model.photo, model);
  context.restore();
  if (template.tone === "soft") {
    context.fillStyle = "rgba(242,240,233,0.18)";
    context.fillRect(0, BRAND_HEIGHT, POSTER_WIDTH, POSTER_HEIGHT - BRAND_HEIGHT);
  }
}

function drawAtmosphere(context, template) {
  if (template.tone === "dark") {
    const gradient = context.createLinearGradient(0, 420, 0, POSTER_HEIGHT);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,0.74)");
    context.fillStyle = gradient;
    context.fillRect(0, 420, POSTER_WIDTH, POSTER_HEIGHT - 420);
  } else if (template.tone === "editorial") {
    const gradient = context.createLinearGradient(0, 0, 480, 0);
    gradient.addColorStop(0, "rgba(0,0,0,0.48)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = gradient;
    context.fillRect(0, BRAND_HEIGHT, 480, POSTER_HEIGHT - BRAND_HEIGHT);
  } else {
    const gradient = context.createLinearGradient(0, 520, 0, POSTER_HEIGHT);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,0.36)");
    context.fillStyle = gradient;
    context.fillRect(0, 520, POSTER_WIDTH, POSTER_HEIGHT - 520);
  }
}

function drawBrand(context, model) {
  context.fillStyle = "#000";
  context.fillRect(0, 0, POSTER_WIDTH, BRAND_HEIGHT);
  context.save();
  context.translate(54, 18);
  context.fillStyle = "#fff";
  context.fillRect(0, -3, 5, 40);
  context.fillStyle = "#c9a13d";
  context.beginPath();
  context.moveTo(7, -1);
  context.lineTo(48, 11);
  context.lineTo(7, 23);
  context.closePath();
  context.fill();
  context.restore();
  const brand = (model.identity.brand || "GOLFBROTHERS").toUpperCase();
  const split = brand.startsWith("GOLF") ? 4 : Math.max(3, Math.floor(brand.length * 0.45));
  const first = brand.slice(0, split);
  const second = brand.slice(split);
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.font = 'italic 900 37px Arial, sans-serif';
  context.fillStyle = "#fff";
  context.fillText(first, 120, 35);
  const firstWidth = context.measureText(first).width;
  context.fillStyle = "#c9a13d";
  context.fillText(second, 120 + firstWidth, 35);
  const brandEnd = 120 + firstWidth + context.measureText(second).width;
  const lineStart = brandEnd + 32;
  const lineEnd = POSTER_WIDTH - 48;
  if (lineEnd - lineStart >= 28) {
    context.save();
    context.beginPath();
    context.moveTo(lineStart, 35);
    context.lineTo(lineEnd, 35);
    context.strokeStyle = "rgba(226,232,236,0.72)";
    context.lineWidth = 1.5;
    context.stroke();
    context.restore();
  }
}

function drawPreviewSubject(context, template) {
  const region = template.layout.subject;
  if (!region) return;
  const cx = region.x + region.w / 2;
  context.save();
  context.fillStyle = "rgba(235,239,236,0.94)";
  context.beginPath();
  context.arc(cx, region.y + region.h * 0.12, region.w * 0.11, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.moveTo(cx - region.w * 0.18, region.y + region.h * 0.23);
  context.quadraticCurveTo(cx, region.y + region.h * 0.15, cx + region.w * 0.18, region.y + region.h * 0.23);
  context.lineTo(cx + region.w * 0.27, region.y + region.h * 0.72);
  context.lineTo(cx + region.w * 0.1, region.y + region.h);
  context.lineTo(cx - region.w * 0.1, region.y + region.h);
  context.lineTo(cx - region.w * 0.27, region.y + region.h * 0.72);
  context.closePath();
  context.fill();
  context.restore();
}

function drawSubject(context, template, model) {
  if (model.previewSubject) {
    drawPreviewSubject(context, template);
    return;
  }
  if (!model.subjectCutout || model.segmentationState !== "person") return;
  drawCover(context, model.subjectCutout, model);
}

function transformedRect(base, transform) {
  const scale = transform.scale || 1;
  return {
    x: transform.x - base.w * scale / 2,
    y: transform.y - base.h * scale / 2,
    w: base.w * scale,
    h: base.h * scale
  };
}

function transformSubRect(rect, base, transform) {
  const scale = transform.scale || 1;
  const baseCenter = centerOf(base);
  const rectCenter = centerOf(rect);
  return {
    x: transform.x + (rectCenter.x - baseCenter.x) * scale - rect.w * scale / 2,
    y: transform.y + (rectCenter.y - baseCenter.y) * scale - rect.h * scale / 2,
    w: rect.w * scale,
    h: rect.h * scale
  };
}

function fitFont(context, text, maxWidth, startSize, minSize, fontId, weight = 900, italic = false) {
  let size = startSize;
  const style = italic ? "italic " : "";
  while (size > minSize) {
    context.font = `${style}${weight} ${size}px ${fontStack(fontId)}`;
    if (context.measureText(text).width <= maxWidth) break;
    size -= 2;
  }
  context.font = `${style}${weight} ${size}px ${fontStack(fontId)}`;
  return size;
}

function drawTotal(context, template, model, bounds) {
  if (!model.total.value) return;
  context.save();
  context.globalAlpha = model.total.opacity / 100;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = model.style.total;
  context.font = `900 ${model.total.size}px ${fontStack(model.fonts.total)}`;
  const metrics = context.measureText(model.total.value);
  context.fillText(model.total.value, model.total.x, model.total.y);
  context.restore();
  const base = template.layout.total;
  const width = Math.max(base.w, metrics.width);
  const height = Math.max(base.h, model.total.size * 0.9);
  bounds.total = {
    x: model.total.x - width / 2,
    y: model.total.y - height / 2,
    w: width,
    h: height
  };
}

function scoreGeometry(template, model) {
  const base = template.layout.score;
  const transform = model.scorecard;
  const board = transformedRect(base, transform);
  let columns = null;
  if (base.columns) {
    columns = base.columns.map((column) => transformSubRect(column, base, transform));
  }
  return { base, board, columns, scale: transform.scale };
}

function drawScoreMarker(context, x, y, radius, difference, scoringStyle, modelStyle, scale) {
  const regularScoreColor = scorecardTextColor(modelStyle);
  if (difference === 0) return regularScoreColor;
  const markerCount = Math.min(2, Math.abs(difference));
  context.save();

  if (scoringStyle === "dp" && isLightNeutralBoard(modelStyle.card)) {
    const markerColor = difference < -1
      ? modelStyle.eagleMarker
      : difference < 0
        ? modelStyle.underMarker
        : difference > 1
          ? modelStyle.doubleBogeyMarker
          : modelStyle.overMarker;
    context.fillStyle = markerColor;
    context.beginPath();
    if (difference < 0) {
      context.arc(x, y, radius, 0, Math.PI * 2);
    } else {
      context.rect(x - radius, y - radius, radius * 2, radius * 2);
    }
    context.fill();
    if (colorContrast(markerColor, modelStyle.card) < 1.7) {
      context.strokeStyle = readableScoreColor(modelStyle.card, "#ffffff");
      context.lineWidth = Math.max(2, 2.5 * scale);
      context.stroke();
    }
    context.restore();
    return readableScoreColor(markerColor, "#ffffff");
  }

  context.strokeStyle = regularScoreColor;
  context.lineWidth = Math.max(2, 2.5 * scale);
  const ringGap = Math.max(3, 4 * scale);
  for (let ring = 0; ring < markerCount; ring += 1) {
    const size = Math.max(radius * 0.72, radius - ring * ringGap);
    context.beginPath();
    if (difference < 0) context.arc(x, y, size, 0, Math.PI * 2);
    else context.rect(x - size, y - size, size * 2, size * 2);
    context.stroke();
  }
  context.restore();
  return regularScoreColor;
}

function drawScorecard(context, template, model, bounds) {
  const geometry = scoreGeometry(template, model);
  const { board, columns, scale } = geometry;
  bounds.scorecard = board;
  context.save();
  if (template.scoreStyle === "grid") {
    context.globalAlpha = 0.16;
    context.fillStyle = model.style.card;
    context.fillRect(board.x, board.y, board.w, board.h);
    context.globalAlpha = 1;
  } else {
    context.globalAlpha = template.scoreStyle === "sidebar" ? 0.68 : 0.88;
    context.fillStyle = model.style.card;
    context.fillRect(board.x, board.y, board.w, board.h);
    context.globalAlpha = 1;
  }

  context.strokeStyle = model.style.line;
  context.fillStyle = model.style.line;
  const vertical = geometry.base.direction === "vertical";
  if (vertical) {
    const dividerWidth = (geometry.base.dividerWidth || 4) * scale;
    context.fillRect(board.x + board.w / 2 - dividerWidth / 2, board.y, dividerWidth, board.h);
  } else {
    context.lineWidth = Math.max(2, 3 * scale);
    context.beginPath();
    context.moveTo(board.x, board.y + board.h / 2);
    context.lineTo(board.x + board.w, board.y + board.h / 2);
    context.stroke();
    if (template.scoreStyle === "grid") {
      for (let index = 1; index < 9; index += 1) {
        const x = board.x + board.w / 9 * index;
        context.beginPath();
        context.moveTo(x, board.y);
        context.lineTo(x, board.y + board.h);
        context.stroke();
      }
    }
  }

  const cellWidth = vertical
    ? (columns ? columns[0].w : board.w / 2)
    : board.w / 9;
  const cellHeight = vertical
    ? (columns ? columns[0].h / 9 : board.h / 9)
    : board.h / 2;
  const fontSize = Math.floor(Math.min(vertical ? 48 * scale : 44 * scale, cellHeight * 0.55, cellWidth * 0.58));
  context.font = `900 ${fontSize}px ${fontStack(model.fonts.score)}`;
  context.textAlign = "center";
  context.textBaseline = "middle";

  activeScores(model).forEach((score, index) => {
    const firstHalf = index < 9;
    const slot = index % 9;
    let x;
    let y;
    if (vertical) {
      const column = columns ? columns[firstHalf ? 0 : 1] : {
        x: board.x + (firstHalf ? 0 : board.w / 2),
        y: board.y,
        w: board.w / 2,
        h: board.h
      };
      x = column.x + column.w / 2;
      y = column.y + column.h / 9 * slot + column.h / 18;
    } else {
      x = board.x + board.w / 9 * slot + board.w / 18;
      y = board.y + board.h / 2 * (firstHalf ? 0 : 1) + board.h / 4;
    }
    const hole = index + 1;
    const radius = Math.min(34 * scale, cellWidth * 0.41, cellHeight * 0.4);
    let label;
    let markerDifference = null;
    let scoreColor = scorecardTextColor(model.style);
    if (model.scoreMode === "relative") {
      const difference = scoreDifference(score);
      if (difference === null) return;
      markerDifference = difference;
      scoreColor = drawScoreMarker(
        context,
        x,
        y,
        radius,
        difference,
        model.scoringStyle,
        model.style,
        scale
      );
      label = hole === 1 && model.badge
        ? model.badge
        : formatRelativeScore(difference);
    } else {
      const strokes = strokeScore(score);
      if (strokes === null) return;
      label = hole === 1 && model.badge ? model.badge : String(strokes);
      context.strokeStyle = scoreColor;
      context.lineWidth = Math.max(2, 3 * scale);
      if (hole === 1 && model.badge) {
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.stroke();
        context.beginPath();
        context.arc(x, y, radius * 0.68, 0, Math.PI * 2);
        context.stroke();
      } else if (model.highlights.has(hole)) {
        if (template.highlightShape === "mixed" && hole % 2 === 0) {
          context.strokeRect(x - radius, y - radius, radius * 2, radius * 2);
        } else {
          context.beginPath();
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.stroke();
        }
      }
    }
    const adjustedFontSize = label.length >= 3 ? fontSize * 0.72 : fontSize;
    const markerTextWidth = markerDifference !== null && markerDifference !== 0
      ? Math.max(20, (radius - Math.max(4, 5 * scale)) * 1.55)
      : cellWidth * 0.78;
    fitFont(
      context,
      label,
      markerTextWidth,
      Math.floor(adjustedFontSize),
      Math.max(14, Math.floor(fontSize * 0.5)),
      model.fonts.score,
      900
    );
    context.fillStyle = scoreColor;
    context.fillText(label, x, y);
  });
  context.restore();
}

function formattedDate(value) {
  return value ? value.replaceAll("-", ".") : "";
}

function drawIdentityItem(context, region, item, text, model, bounds, key) {
  if (!region || !text) return;
  const actualRegion = {
    x: item.x - region.w / 2,
    y: item.y - region.h / 2,
    w: region.w,
    h: region.h
  };
  bounds[key] = actualRegion;
  context.save();
  context.fillStyle = item.color;
  context.textBaseline = "middle";
  context.textAlign = region.align || "center";
  const drawX = region.align === "left"
    ? actualRegion.x
    : region.align === "right"
      ? actualRegion.x + actualRegion.w
      : item.x;
  fitFont(
    context,
    text,
    region.vertical ? region.h : region.w,
    Math.min(item.size, region.vertical ? region.w : region.h),
    10,
    item.font,
    key === "nickname" ? 800 : 700,
    Boolean(region.italic)
  );
  if (region.vertical) {
    context.translate(item.x, item.y);
    context.rotate(Math.PI / 2);
    context.textAlign = "center";
    context.fillText(text, 0, 0);
  } else {
    context.fillText(text, drawX, item.y);
  }
  context.restore();
}

function drawIdentity(context, template, model, bounds) {
  const layout = template.layout;
  drawIdentityItem(
    context,
    layout.nickname,
    model.identity.nickname,
    model.identity.nickname.value,
    model,
    bounds,
    "nickname"
  );

  const courseParts = [model.identity.course.value].filter(Boolean);
  if (layout.course?.combinesDate && model.identity.date.value) {
    courseParts.push(formattedDate(model.identity.date.value));
  }
  drawIdentityItem(
    context,
    layout.course,
    model.identity.course,
    courseParts.join(" · "),
    model,
    bounds,
    "course"
  );
  if (layout.date) {
    drawIdentityItem(
      context,
      layout.date,
      model.identity.date,
      formattedDate(model.identity.date.value),
      model,
      bounds,
      "date"
    );
  }
  drawIdentityItem(
    context,
    layout.extra,
    model.identity.extra,
    model.identity.extra.value,
    model,
    bounds,
    "extra"
  );
}

function drawStickers(context, model, bounds) {
  model.stickers.forEach((sticker) => {
    const width = sticker.baseWidth * sticker.scale;
    const height = sticker.baseHeight * sticker.scale;
    context.drawImage(sticker.image, sticker.x - width / 2, sticker.y - height / 2, width, height);
    bounds[`sticker:${sticker.id}`] = {
      x: sticker.x - width / 2,
      y: sticker.y - height / 2,
      w: width,
      h: height
    };
  });
}

function drawGuide(context, bounds, target) {
  const region = bounds[target];
  if (!region) return;
  context.save();
  context.strokeStyle = "rgba(0,31,56,0.95)";
  context.lineWidth = 8;
  context.strokeRect(region.x - 5, region.y - 5, region.w + 10, region.h + 10);
  context.setLineDash([14, 9]);
  context.strokeStyle = "#ffd100";
  context.lineWidth = 4;
  context.strokeRect(region.x - 5, region.y - 5, region.w + 10, region.h + 10);
  context.restore();
}

function renderScene(context, model, options = {}) {
  const template = posterTemplates[model.templateId];
  const bounds = {};
  context.clearRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT);
  drawBackground(context, template, model);
  if (model.photo) {
    bounds.photo = {
      x: 0,
      y: BRAND_HEIGHT,
      w: POSTER_WIDTH,
      h: POSTER_HEIGHT - BRAND_HEIGHT
    };
  }
  drawAtmosphere(context, template);
  if (model.total.aboveSubject) {
    drawSubject(context, template, model);
    drawTotal(context, template, model, bounds);
  } else {
    drawTotal(context, template, model, bounds);
    drawSubject(context, template, model);
  }
  drawIdentity(context, template, model, bounds);
  drawScorecard(context, template, model, bounds);
  drawBrand(context, model);
  drawStickers(context, model, bounds);
  if (options.showGuide && options.guideTarget) {
    drawGuide(context, bounds, options.guideTarget);
  }
  return bounds;
}

function currentGuideTarget() {
  if (currentStep === "scorecard") return "scorecard";
  if (currentStep === "total") return "total";
  if (currentStep === "identity") return effectiveIdentityTarget();
  if (currentStep === "stickers" && state.selectedStickerId) return `sticker:${state.selectedStickerId}`;
  return null;
}

function renderMain(exporting = false) {
  if (!selectedTemplateId) return;
  sceneBounds = renderScene(ctx, state, {
    showGuide: !exporting && currentStep !== "summary",
    guideTarget: currentGuideTarget()
  });
}

function configurePreviewDialog(editing) {
  elements.previewModal.classList.toggle("is-editing", editing);
  elements.previewDialog.classList.toggle("is-editing", editing);
  elements.modalEditControls.hidden = !editing;
  elements.useTemplateButton.hidden = editing || modalMode !== "template";
}

function openTemplatePreview(templateId) {
  summaryEditEnabled = false;
  modalMode = "template";
  modalTemplateId = templateId;
  const template = posterTemplates[templateId];
  elements.previewModalTitle.textContent = `${translate("templatePreview")} · ${templateName(template)}`;
  configurePreviewDialog(false);
  renderScene(modalCtx, createModel(templateId, true), { showGuide: false });
  elements.previewModal.hidden = false;
}

function openFullPreview() {
  if (!selectedTemplateId) return;
  summaryEditEnabled = false;
  modalMode = "poster";
  elements.previewModalTitle.textContent = translate("posterPreview");
  configurePreviewDialog(false);
  renderScene(modalCtx, state, { showGuide: false });
  elements.previewModal.hidden = false;
}

function renderEditModal() {
  if (modalMode !== "edit") return;
  modalSceneBounds = renderScene(modalCtx, state, {
    showGuide: true,
    guideTarget: summaryEditTarget
  });
}

function openFreeEdit() {
  if (!selectedTemplateId) return;
  modalMode = "edit";
  summaryEditEnabled = true;
  if (!summaryTargetExists(summaryEditTarget)) {
    summaryEditTarget = state.total.value ? "total" : "scorecard";
  }
  elements.previewModalTitle.textContent = translate("summaryFreeEdit");
  configurePreviewDialog(true);
  elements.previewModal.hidden = false;
  syncSummaryEditControls();
  renderEditModal();
}

function closePreview() {
  summaryEditEnabled = false;
  activePointers.clear();
  gestureTarget = null;
  activeGestureCanvas = null;
  lastGestureCenter = null;
  lastGestureDistance = 0;
  configurePreviewDialog(false);
  elements.previewModal.hidden = true;
  renderMain();
}

function effectiveIdentityTarget() {
  const layout = posterTemplates[state.templateId].layout;
  return activeIdentityTarget === "date" && !layout.date ? "course" : activeIdentityTarget;
}

function selectedSticker() {
  return state.stickers.find((sticker) => sticker.id === state.selectedStickerId) || null;
}

function summaryTargetExists(target) {
  if (!target) return false;
  if (target === "photo") return Boolean(state.photo);
  if (target === "scorecard") return true;
  if (target === "total") return Boolean(state.total.value);
  if (["nickname", "course", "date", "extra"].includes(target)) {
    if (target === "date" && !posterTemplates[state.templateId].layout.date) return false;
    if (target === "course") {
      const layout = posterTemplates[state.templateId].layout.course;
      return Boolean(state.identity.course.value || (layout?.combinesDate && state.identity.date.value));
    }
    return Boolean(state.identity[target].value);
  }
  if (target.startsWith("sticker:")) {
    return state.stickers.some((sticker) => `sticker:${sticker.id}` === target);
  }
  return false;
}

function summaryTargetName(target) {
  const keys = {
    photo: "photoStep",
    scorecard: "scorecardStep",
    total: "totalStep",
    nickname: "nickname",
    course: "course",
    date: "date",
    extra: "extraInfo"
  };
  if (target?.startsWith("sticker:")) {
    const index = state.stickers.findIndex((sticker) => `sticker:${sticker.id}` === target);
    return index >= 0 ? `${translate("stickerStep")} ${index + 1}` : translate("stickerStep");
  }
  return target && keys[target] ? translate(keys[target]) : translate("summaryNoSelection");
}

function summaryScaleConfig(target) {
  if (target === "photo") {
    return { min: 80, max: 260, step: 1, value: state.image.scale * 100, suffix: "%" };
  }
  if (target === "scorecard") {
    return { min: 55, max: 180, step: 1, value: state.scorecard.scale * 100, suffix: "%" };
  }
  if (target === "total") {
    return { min: 100, max: 1600, step: 5, value: state.total.size, suffix: "px" };
  }
  if (["nickname", "course", "date", "extra"].includes(target)) {
    return { min: 12, max: 100, step: 1, value: state.identity[target].size, suffix: "px" };
  }
  if (target?.startsWith("sticker:")) {
    const sticker = state.stickers.find((item) => `sticker:${item.id}` === target);
    if (sticker) {
      return { min: 10, max: 260, step: 1, value: sticker.scale * 100, suffix: "%" };
    }
  }
  return null;
}

function setSummaryTargetScale(target, value) {
  if (target === "photo") {
    state.image.scale = clamp(value / 100, 0.8, 2.6);
  } else if (target === "scorecard") {
    state.scorecard.scale = clamp(value / 100, 0.55, 1.8);
  } else if (target === "total") {
    state.total.size = clamp(value, 100, 1600);
  } else if (["nickname", "course", "date", "extra"].includes(target)) {
    state.identity[target].size = clamp(value, 12, 100);
  } else if (target?.startsWith("sticker:")) {
    const sticker = state.stickers.find((item) => `sticker:${item.id}` === target);
    if (sticker) sticker.scale = clamp(value / 100, 0.1, 2.6);
  }
}

function syncSummaryEditControls() {
  if (!summaryTargetExists(summaryEditTarget)) summaryEditTarget = null;
  const config = summaryScaleConfig(summaryEditTarget);
  const available =
    modalMode === "edit" &&
    summaryEditEnabled &&
    !elements.previewModal.hidden &&
    Boolean(config);
  elements.summarySelectedLabel.textContent = summaryTargetName(summaryEditTarget);
  elements.summaryElementScale.disabled = !available;
  if (config) {
    elements.summaryElementScale.min = String(config.min);
    elements.summaryElementScale.max = String(config.max);
    elements.summaryElementScale.step = String(config.step);
    elements.summaryElementScale.value = String(Math.round(config.value));
    elements.summaryElementScaleValue.textContent =
      `${Math.round(config.value)}${config.suffix}`;
  } else {
    elements.summaryElementScale.min = "10";
    elements.summaryElementScale.max = "260";
    elements.summaryElementScale.step = "1";
    elements.summaryElementScale.value = "100";
    elements.summaryElementScaleValue.textContent = "--";
  }
}

function selectSummaryTarget(target) {
  summaryEditTarget = summaryTargetExists(target) ? target : null;
  if (["nickname", "course", "date", "extra"].includes(summaryEditTarget)) {
    activeIdentityTarget = summaryEditTarget;
    syncIdentityControls();
  } else if (summaryEditTarget?.startsWith("sticker:")) {
    state.selectedStickerId = summaryEditTarget.slice("sticker:".length);
    renderStickerList();
    syncStickerControls();
  }
  syncSummaryEditControls();
  renderMain();
  renderEditModal();
}

function pointInsideRegion(point, region, padding = 10) {
  return Boolean(region) &&
    point.x >= region.x - padding &&
    point.x <= region.x + region.w + padding &&
    point.y >= region.y - padding &&
    point.y <= region.y + region.h + padding;
}

function hitTestSummaryTarget(point, bounds = sceneBounds) {
  const targets = [
    ...state.stickers.slice().reverse().map((sticker) => `sticker:${sticker.id}`),
    "scorecard",
    "extra",
    "date",
    "course",
    "nickname",
    "total"
  ];
  const matched = targets.find((target) => pointInsideRegion(point, bounds[target]));
  if (matched) return matched;
  return state.photo ? "photo" : null;
}

function setStep(step) {
  currentStep = step;
  elements.app.dataset.step = step;
  const isTemplate = step === "template";
  elements.templateScreen.hidden = !isTemplate;
  elements.editorScreen.hidden = isTemplate;
  if (isTemplate) {
    elements.templateNext.querySelector("span").textContent = translate(returnToSummary ? "confirmChange" : "next");
    return;
  }

  document.querySelectorAll(".control-panel").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === step);
  });
  const index = stepOrder.indexOf(step);
  elements.stepCounter.textContent = `0${index + 1} / 07`;
  elements.stepTitle.textContent = translate(editorStepTitles[step]);
  elements.gestureHint.textContent = translate(gestureKeys[step]);
  elements.editorScreen.classList.toggle("is-summary", step === "summary");
  elements.editorScreen.querySelector(".wizard-nav").hidden = step === "summary";
  elements.nextButton.querySelector("span").textContent = translate(returnToSummary ? "confirmChange" : "next");
  elements.controlScroller.scrollTop = 0;
  syncSummaryEditControls();
  renderMain();
}

function nextStep() {
  if (returnToSummary && currentStep !== "summary") {
    returnToSummary = false;
    setStep("summary");
    return;
  }
  const index = stepOrder.indexOf(currentStep);
  setStep(stepOrder[Math.min(index + 1, stepOrder.length - 1)]);
}

function previousStep() {
  if (returnToSummary) {
    returnToSummary = false;
    setStep("summary");
    return;
  }
  const index = stepOrder.indexOf(currentStep);
  setStep(stepOrder[Math.max(0, index - 1)]);
}

function applyLanguage(nextLanguage, persist = true) {
  language = nextLanguage === "en" ? "en" : "zh";
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  elements.languageSelect.value = language;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = translate(node.dataset.i18n);
  });
  syncScoreModeControls();
  renderTemplateGallery();
  renderPaletteList();
  renderFixedColorControls();
  renderStickerList();
  syncTotalControls();
  if (!elements.previewModal.hidden) {
    if (modalMode === "edit") {
      elements.previewModalTitle.textContent = translate("summaryFreeEdit");
      syncSummaryEditControls();
      renderEditModal();
    } else if (modalMode === "poster") {
      elements.previewModalTitle.textContent = translate("posterPreview");
    } else if (modalTemplateId) {
      const template = posterTemplates[modalTemplateId];
      elements.previewModalTitle.textContent =
        `${translate("templatePreview")} · ${templateName(template)}`;
    }
  }
  setStep(currentStep);
  if (persist) {
    try {
      localStorage.setItem("golfPosterLanguage", language);
    } catch {
      // Language still applies when storage is unavailable.
    }
  }
}

function loadLanguage() {
  try {
    return localStorage.getItem("golfPosterLanguage") || "zh";
  } catch {
    return "zh";
  }
}

function canvasPoint(event, targetCanvas = canvas) {
  const rect = targetCanvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) / rect.width * POSTER_WIDTH,
    y: (event.clientY - rect.top) / rect.height * POSTER_HEIGHT
  };
}

function gestureCenter(points) {
  return points.reduce(
    (center, point) => ({ x: center.x + point.x / points.length, y: center.y + point.y / points.length }),
    { x: 0, y: 0 }
  );
}

function distanceBetween(points) {
  if (points.length < 2) return 0;
  return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
}

function targetForStep() {
  if (currentStep === "photo") return "photo";
  if (currentStep === "scorecard") return "scorecard";
  if (currentStep === "total") return "total";
  if (currentStep === "identity") return effectiveIdentityTarget();
  if (currentStep === "stickers" && state.selectedStickerId) return `sticker:${state.selectedStickerId}`;
  return null;
}

function translateGestureTarget(target, dx, dy) {
  if (target === "photo") {
    state.image.x += dx;
    state.image.y += dy;
  } else if (target === "scorecard") {
    state.scorecard.x += dx;
    state.scorecard.y += dy;
  } else if (target === "total") {
    state.total.x += dx;
    state.total.y += dy;
  } else if (["nickname", "course", "date", "extra"].includes(target)) {
    state.identity[target].x += dx;
    state.identity[target].y += dy;
  } else if (target?.startsWith("sticker:")) {
    const sticker = state.stickers.find((item) => `sticker:${item.id}` === target);
    if (sticker) {
      sticker.x += dx;
      sticker.y += dy;
    }
  }
}

function scaleGestureTarget(target, ratio) {
  if (!Number.isFinite(ratio) || ratio <= 0) return;
  if (target === "photo") {
    state.image.scale = clamp(state.image.scale * ratio, 0.8, 2.6);
  } else if (target === "scorecard") {
    state.scorecard.scale = clamp(state.scorecard.scale * ratio, 0.55, 1.8);
  } else if (target === "total") {
    state.total.size = clamp(state.total.size * ratio, 100, 1600);
  } else if (["nickname", "course", "date", "extra"].includes(target)) {
    state.identity[target].size = clamp(state.identity[target].size * ratio, 12, 100);
  } else if (target?.startsWith("sticker:")) {
    const sticker = state.stickers.find((item) => `sticker:${item.id}` === target);
    if (sticker) sticker.scale = clamp(sticker.scale * ratio, 0.1, 2.6);
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function syncGestureOutputs() {
  elements.photoScale.value = String(Math.round(state.image.scale * 100));
  elements.photoScaleValue.textContent = `${Math.round(state.image.scale * 100)}%`;
  elements.scorecardScale.value = String(Math.round(state.scorecard.scale * 100));
  elements.scorecardScaleValue.textContent = `${Math.round(state.scorecard.scale * 100)}%`;
  elements.totalSize.value = String(Math.round(state.total.size));
  elements.totalSizeValue.textContent = `${Math.round(state.total.size)}px`;
  syncIdentityControls();
  syncStickerControls();
  syncSummaryEditControls();
}

function resetGestureBaseline() {
  const points = [...activePointers.values()];
  lastGestureCenter = points.length ? gestureCenter(points) : null;
  lastGestureDistance = points.length >= 2 ? distanceBetween(points) : 0;
}

function startPointer(event) {
  const sourceCanvas = event.currentTarget;
  const editingModal =
    sourceCanvas === elements.modalCanvas &&
    modalMode === "edit" &&
    summaryEditEnabled;
  if (sourceCanvas === elements.modalCanvas && !editingModal) return;
  if (activeGestureCanvas && activeGestureCanvas !== sourceCanvas) return;

  if (editingModal && !activePointers.size) {
    selectSummaryTarget(
      hitTestSummaryTarget(canvasPoint(event, sourceCanvas), modalSceneBounds)
    );
    gestureTarget = summaryEditTarget;
  } else {
    gestureTarget = gestureTarget || targetForStep();
  }
  if (!gestureTarget) return;
  event.preventDefault();
  activeGestureCanvas = sourceCanvas;
  sourceCanvas.setPointerCapture(event.pointerId);
  activePointers.set(event.pointerId, canvasPoint(event, sourceCanvas));
  resetGestureBaseline();
}

function movePointer(event) {
  if (!activePointers.has(event.pointerId) || !gestureTarget) return;
  const sourceCanvas = activeGestureCanvas || event.currentTarget;
  activePointers.set(event.pointerId, canvasPoint(event, sourceCanvas));
  const points = [...activePointers.values()];
  const center = gestureCenter(points);
  if (lastGestureCenter) {
    translateGestureTarget(gestureTarget, center.x - lastGestureCenter.x, center.y - lastGestureCenter.y);
  }
  if (points.length >= 2) {
    const distance = distanceBetween(points);
    if (lastGestureDistance > 0) scaleGestureTarget(gestureTarget, distance / lastGestureDistance);
    lastGestureDistance = distance;
  }
  lastGestureCenter = center;
  syncGestureOutputs();
  if (sourceCanvas === elements.modalCanvas && modalMode === "edit") {
    renderEditModal();
  } else {
    renderMain();
  }
}

function endPointer(event) {
  activePointers.delete(event.pointerId);
  if (!activePointers.size) {
    gestureTarget = null;
    activeGestureCanvas = null;
    lastGestureCenter = null;
    lastGestureDistance = 0;
  } else {
    resetGestureBaseline();
  }
}

function resetPhoto() {
  const defaults = createModel(state.templateId, false);
  state.image = { ...defaults.image };
  state.edge = { ...defaults.edge };
  state.scorecard.x = defaults.scorecard.x;
  state.scorecard.y = defaults.scorecard.y;
  state.total.x = defaults.total.x;
  state.total.y = defaults.total.y;
  ["nickname", "course", "date", "extra"].forEach((key) => {
    state.identity[key].x = defaults.identity[key].x;
    state.identity[key].y = defaults.identity[key].y;
  });
  state.stickers.forEach((sticker, index) => {
    sticker.x = 500 + (index % 3 - 1) * 90;
    sticker.y = 630 + (index % 2) * 90;
    sticker.scale = 1;
  });
  if (state.subjectMaskBase) rebuildSubjectAssets();
  syncAllControls();
  renderMain();
}

function loadPhoto(file) {
  if (!file) return;
  sourcePhotoFile = file;
  const reader = new FileReader();
  reader.onload = () => {
    const image = new Image();
    image.onload = () => {
      state.photo = image;
      state.subjectMaskBase = null;
      state.subjectCutout = null;
      state.segmentationState = "loading";
      state.segmentationSource = "none";
      state.image = { scale: 1, x: 0, y: 0, blur: state.image.blur };
      syncAllControls();
      renderMain();
      requestSegmentation();
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function copyMask(mask, sourceWidth, sourceHeight) {
  const width = sourceWidth || state.photo.naturalWidth || state.photo.width;
  const height = sourceHeight || state.photo.naturalHeight || state.photo.height;
  const scale = Math.min(1, MASK_MAX_DIMENSION / Math.max(width, height));
  const canvasElement = document.createElement("canvas");
  canvasElement.width = Math.max(1, Math.round(width * scale));
  canvasElement.height = Math.max(1, Math.round(height * scale));
  const context = canvasElement.getContext("2d", { willReadFrequently: true });
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(mask, 0, 0, canvasElement.width, canvasElement.height);
  return canvasElement;
}

function confidenceBounds(confidence, width, height, threshold = 0.35) {
  let left = width;
  let right = -1;
  let top = height;
  let bottom = -1;
  for (let index = 0; index < confidence.length; index += 1) {
    if (confidence[index] < threshold) continue;
    const x = index % width;
    const y = Math.floor(index / width);
    left = Math.min(left, x);
    right = Math.max(right, x);
    top = Math.min(top, y);
    bottom = Math.max(bottom, y);
  }
  return right > left && bottom > top ? { left, right, top, bottom } : null;
}

function createSubjectCrop(photo, confidence, width, height) {
  const bounds = confidenceBounds(confidence, width, height);
  if (!bounds) return null;
  const subjectWidth = bounds.right - bounds.left + 1;
  const subjectHeight = bounds.bottom - bounds.top + 1;
  const paddingX = Math.max(subjectWidth * 0.18, width * 0.04);
  const paddingY = Math.max(subjectHeight * 0.14, height * 0.04);
  const left = clamp(Math.floor(bounds.left - paddingX), 0, width - 1);
  const right = clamp(Math.ceil(bounds.right + paddingX), 0, width - 1);
  const top = clamp(Math.floor(bounds.top - paddingY), 0, height - 1);
  const bottom = clamp(Math.ceil(bounds.bottom + paddingY), 0, height - 1);
  const cropWidth = right - left + 1;
  const cropHeight = bottom - top + 1;
  if (
    cropWidth < 64 ||
    cropHeight < 64 ||
    cropWidth * cropHeight > width * height * 0.9
  ) return null;

  const photoWidth = photo.naturalWidth || photo.width;
  const photoHeight = photo.naturalHeight || photo.height;
  const sourceX = left / width * photoWidth;
  const sourceY = top / height * photoHeight;
  const sourceWidth = cropWidth / width * photoWidth;
  const sourceHeight = cropHeight / height * photoHeight;
  const cropScale = Math.min(
    1,
    MASK_MAX_DIMENSION / Math.max(sourceWidth, sourceHeight)
  );
  const canvasElement = document.createElement("canvas");
  canvasElement.width = Math.max(64, Math.round(sourceWidth * cropScale));
  canvasElement.height = Math.max(64, Math.round(sourceHeight * cropScale));
  const context = canvasElement.getContext("2d");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(
    photo,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );
  return {
    canvas: canvasElement,
    left,
    top,
    width: cropWidth,
    height: cropHeight
  };
}

function bilinearConfidence(confidence, width, height, x, y) {
  const x0 = clamp(Math.floor(x), 0, width - 1);
  const y0 = clamp(Math.floor(y), 0, height - 1);
  const x1 = Math.min(width - 1, x0 + 1);
  const y1 = Math.min(height - 1, y0 + 1);
  const tx = clamp(x - x0, 0, 1);
  const ty = clamp(y - y0, 0, 1);
  const top = confidence[y0 * width + x0] * (1 - tx) +
    confidence[y0 * width + x1] * tx;
  const bottom = confidence[y1 * width + x0] * (1 - tx) +
    confidence[y1 * width + x1] * tx;
  return top * (1 - ty) + bottom * ty;
}

function mergeSubjectCrop(base, cropConfidence, cropWidth, cropHeight, crop) {
  const merged = new Float32Array(base.confidence);
  const endX = Math.min(base.width, crop.left + crop.width);
  const endY = Math.min(base.height, crop.top + crop.height);
  for (let y = crop.top; y < endY; y += 1) {
    const v = (y - crop.top) / Math.max(1, crop.height - 1);
    const cropY = v * (cropHeight - 1);
    for (let x = crop.left; x < endX; x += 1) {
      const u = (x - crop.left) / Math.max(1, crop.width - 1);
      const cropX = u * (cropWidth - 1);
      const edgeDistance = Math.min(u, 1 - u, v, 1 - v);
      const edgeWeight = smoothStep(0.015, 0.11, edgeDistance);
      if (edgeWeight <= 0) continue;
      const index = y * base.width + x;
      const detail = bilinearConfidence(
        cropConfidence,
        cropWidth,
        cropHeight,
        cropX,
        cropY
      );
      if (detail > merged[index] && merged[index] < 0.04) continue;
      const detailWeight = detail < merged[index] ? 0.82 : 0.66;
      const weight = edgeWeight * detailWeight;
      merged[index] = merged[index] * (1 - weight) + detail * weight;
    }
  }
  return merged;
}

function extractMaskConfidence(mask) {
  const context = mask.getContext("2d", { willReadFrequently: true });
  const pixels = context.getImageData(0, 0, mask.width, mask.height).data;
  let varyingAlpha = false;
  for (let index = 3; index < pixels.length; index += 4) {
    if (pixels[index] < 250) {
      varyingAlpha = true;
      break;
    }
  }
  const confidence = new Float32Array(mask.width * mask.height);
  for (let index = 0; index < confidence.length; index += 1) {
    const pixel = index * 4;
    confidence[index] = varyingAlpha
      ? pixels[pixel + 3] / 255
      : (pixels[pixel] + pixels[pixel + 1] + pixels[pixel + 2]) / (255 * 3);
  }
  return confidence;
}

function measureMask(confidence) {
  let strong = 0;
  let mean = 0;
  const stride = Math.max(1, Math.floor(confidence.length / (160 * 160)));
  let count = 0;
  for (let index = 0; index < confidence.length; index += stride) {
    const value = confidence[index];
    mean += value;
    if (value >= 0.55) strong += 1;
    count += 1;
  }
  return { strongRatio: strong / count, meanConfidence: mean / count };
}

function createPhotoAnalysis(photo, width, height) {
  const canvasElement = document.createElement("canvas");
  canvasElement.width = width;
  canvasElement.height = height;
  const context = canvasElement.getContext("2d", { willReadFrequently: true });
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(photo, 0, 0, width, height);
  const pixels = context.getImageData(0, 0, width, height).data;
  const guidance = new Float32Array(width * height);
  for (let index = 0; index < guidance.length; index += 1) {
    const pixel = index * 4;
    guidance[index] = (
      pixels[pixel] * 0.2126 +
      pixels[pixel + 1] * 0.7152 +
      pixels[pixel + 2] * 0.0722
    ) / 255;
  }
  return { guidance, pixels };
}

function boxMean(input, width, height, radius, integral) {
  const integralWidth = width + 1;
  integral.fill(0);
  for (let y = 1; y <= height; y += 1) {
    let rowSum = 0;
    const sourceOffset = (y - 1) * width;
    const integralOffset = y * integralWidth;
    const previousOffset = (y - 1) * integralWidth;
    for (let x = 1; x <= width; x += 1) {
      rowSum += input[sourceOffset + x - 1];
      integral[integralOffset + x] = integral[previousOffset + x] + rowSum;
    }
  }

  const output = new Float32Array(input.length);
  for (let y = 0; y < height; y += 1) {
    const top = Math.max(0, y - radius);
    const bottom = Math.min(height - 1, y + radius);
    for (let x = 0; x < width; x += 1) {
      const left = Math.max(0, x - radius);
      const right = Math.min(width - 1, x + radius);
      const area = (right - left + 1) * (bottom - top + 1);
      const sum =
        integral[(bottom + 1) * integralWidth + right + 1] -
        integral[top * integralWidth + right + 1] -
        integral[(bottom + 1) * integralWidth + left] +
        integral[top * integralWidth + left];
      output[y * width + x] = sum / area;
    }
  }
  return output;
}

function guidedFilter(guidance, confidence, width, height) {
  const radius = Math.max(2, Math.round(Math.min(width, height) / 150));
  const epsilon = 0.006;
  const integral = new Float64Array((width + 1) * (height + 1));
  const meanGuidance = boxMean(guidance, width, height, radius, integral);
  const meanConfidence = boxMean(confidence, width, height, radius, integral);
  const products = new Float32Array(confidence.length);

  for (let index = 0; index < products.length; index += 1) {
    products[index] = guidance[index] * guidance[index];
  }
  const guidanceCorrelation = boxMean(products, width, height, radius, integral);
  for (let index = 0; index < products.length; index += 1) {
    products[index] = guidance[index] * confidence[index];
  }
  const crossCorrelation = boxMean(products, width, height, radius, integral);
  const coefficientA = new Float32Array(confidence.length);
  const coefficientB = new Float32Array(confidence.length);

  for (let index = 0; index < confidence.length; index += 1) {
    const variance = guidanceCorrelation[index] - meanGuidance[index] * meanGuidance[index];
    const covariance = crossCorrelation[index] - meanGuidance[index] * meanConfidence[index];
    coefficientA[index] = covariance / (variance + epsilon);
    coefficientB[index] = meanConfidence[index] - coefficientA[index] * meanGuidance[index];
  }

  const meanA = boxMean(coefficientA, width, height, radius, integral);
  const meanB = boxMean(coefficientB, width, height, radius, integral);
  const refined = new Float32Array(confidence.length);
  for (let index = 0; index < refined.length; index += 1) {
    refined[index] = clamp(meanA[index] * guidance[index] + meanB[index], 0, 1);
  }
  return refined;
}

function refineAlphaMatte(confidence, pixels, width, height) {
  const refined = new Float32Array(confidence);
  const radius = clamp(Math.round(Math.min(width, height) / 130), 5, 9);
  const foregroundThreshold = 0.9;
  const backgroundThreshold = 0.1;

  for (let index = 0; index < confidence.length; index += 1) {
    const base = confidence[index];
    if (base <= 0.012) {
      refined[index] = 0;
      continue;
    }
    if (base >= 0.988) {
      refined[index] = 1;
      continue;
    }

    const x = index % width;
    const y = Math.floor(index / width);
    let foregroundIndex = -1;
    let backgroundIndex = -1;

    for (
      let distance = 1;
      distance <= radius && (foregroundIndex < 0 || backgroundIndex < 0);
      distance += 1
    ) {
      for (let dy = -distance; dy <= distance; dy += 1) {
        const sampleY = y + dy;
        if (sampleY < 0 || sampleY >= height) continue;
        for (let dx = -distance; dx <= distance; dx += 1) {
          if (Math.abs(dx) !== distance && Math.abs(dy) !== distance) continue;
          const sampleX = x + dx;
          if (sampleX < 0 || sampleX >= width) continue;
          const sampleIndex = sampleY * width + sampleX;
          const sample = confidence[sampleIndex];
          if (foregroundIndex < 0 && sample >= foregroundThreshold) {
            foregroundIndex = sampleIndex;
          }
          if (backgroundIndex < 0 && sample <= backgroundThreshold) {
            backgroundIndex = sampleIndex;
          }
        }
      }
    }

    if (foregroundIndex < 0 || backgroundIndex < 0) continue;
    const pixel = index * 4;
    const foregroundPixel = foregroundIndex * 4;
    const backgroundPixel = backgroundIndex * 4;
    let numerator = 0;
    let denominator = 0;
    for (let channel = 0; channel < 3; channel += 1) {
      const foreground = pixels[foregroundPixel + channel] / 255;
      const background = pixels[backgroundPixel + channel] / 255;
      const current = pixels[pixel + channel] / 255;
      const difference = foreground - background;
      numerator += (current - background) * difference;
      denominator += difference * difference;
    }
    if (denominator < 0.008) continue;

    const colorAlpha = clamp(numerator / denominator, 0, 1);
    const separation = clamp(Math.sqrt(denominator) / 0.8, 0, 1);
    const uncertainty = 1 - Math.abs(base - 0.5) * 2;
    const weight = clamp(0.28 + separation * 0.42 + uncertainty * 0.18, 0.28, 0.78);
    const guardedAlpha = clamp(colorAlpha, base - 0.42, base + 0.42);
    refined[index] = base * (1 - weight) + guardedAlpha * weight;
  }
  return refined;
}

function colorSignature(red, green, blue) {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const luma = r * 0.299 + g * 0.587 + b * 0.114;
  return [luma, (b - luma) * 0.565, (r - luma) * 0.713];
}

function sampleBackgroundSignature(pixels, confidence, width, y, startX, endX) {
  let red = 0;
  let green = 0;
  let blue = 0;
  let count = 0;
  const from = clamp(Math.min(startX, endX), 0, width - 1);
  const to = clamp(Math.max(startX, endX), 0, width - 1);
  for (let x = from; x <= to; x += 1) {
    const index = y * width + x;
    if (confidence[index] > 0.35) continue;
    const pixel = index * 4;
    red += pixels[pixel];
    green += pixels[pixel + 1];
    blue += pixels[pixel + 2];
    count += 1;
  }
  return count ? colorSignature(red / count, green / count, blue / count) : null;
}

function colorDistanceSquared(pixels, index, leftReference, rightReference) {
  const pixel = index * 4;
  const signature = colorSignature(
    pixels[pixel],
    pixels[pixel + 1],
    pixels[pixel + 2]
  );
  const distanceTo = (reference) => {
    if (!reference) return Number.POSITIVE_INFINITY;
    const luma = signature[0] - reference[0];
    const blue = signature[1] - reference[1];
    const red = signature[2] - reference[2];
    return luma * luma * 0.2 + blue * blue * 0.8 + red * red * 0.8;
  };
  return Math.min(distanceTo(leftReference), distanceTo(rightReference));
}

// Reopen narrow, background-colored channels that the low-resolution person mask filled in.
function recoverInteriorBackground(confidence, pixels, width, height) {
  let left = width;
  let right = -1;
  let top = height;
  let bottom = -1;
  for (let index = 0; index < confidence.length; index += 1) {
    if (confidence[index] < 0.55) continue;
    const x = index % width;
    const y = Math.floor(index / width);
    left = Math.min(left, x);
    right = Math.max(right, x);
    top = Math.min(top, y);
    bottom = Math.max(bottom, y);
  }
  if (right <= left || bottom <= top) return confidence;

  const subjectWidth = right - left + 1;
  const subjectHeight = bottom - top + 1;
  const startY = clamp(Math.round(top + subjectHeight * 0.55), 0, height - 1);
  const endY = clamp(bottom + 2, 0, height - 1);
  const roiLeft = clamp(left - 2, 0, width - 1);
  const roiRight = clamp(right + 2, 0, width - 1);
  const backgroundWindow = clamp(Math.round(subjectWidth * 0.08), 10, 48);
  const maxGapWidth = clamp(Math.round(subjectWidth * 0.16), 10, Math.round(width * 0.12));
  const backgroundThreshold = 0.075 * 0.075;
  const foregroundThreshold = 0.085 * 0.085;
  const candidates = new Uint8Array(confidence.length);
  const blockers = new Uint8Array(width);
  const leftBlocker = new Int32Array(width);
  const rightBlocker = new Int32Array(width);

  for (let y = startY; y <= endY; y += 1) {
    let rowLeft = width;
    let rowRight = -1;
    const rowOffset = y * width;
    for (let x = roiLeft; x <= roiRight; x += 1) {
      if (confidence[rowOffset + x] < 0.55) continue;
      rowLeft = Math.min(rowLeft, x);
      rowRight = Math.max(rowRight, x);
    }
    if (rowRight - rowLeft < 6) continue;

    const leftReference = sampleBackgroundSignature(
      pixels,
      confidence,
      width,
      y,
      rowLeft - backgroundWindow,
      rowLeft - 2
    );
    const rightReference = sampleBackgroundSignature(
      pixels,
      confidence,
      width,
      y,
      rowRight + 2,
      rowRight + backgroundWindow
    );
    if (!leftReference && !rightReference) continue;

    blockers.fill(0);
    leftBlocker.fill(-1);
    rightBlocker.fill(-1);
    for (let x = rowLeft; x <= rowRight; x += 1) {
      const index = rowOffset + x;
      const distance = colorDistanceSquared(pixels, index, leftReference, rightReference);
      if (confidence[index] >= 0.55 && distance > foregroundThreshold) blockers[x] = 1;
    }

    let nearest = -1;
    for (let x = rowLeft; x <= rowRight; x += 1) {
      if (blockers[x]) nearest = x;
      leftBlocker[x] = nearest;
    }
    nearest = -1;
    for (let x = rowRight; x >= rowLeft; x -= 1) {
      if (blockers[x]) nearest = x;
      rightBlocker[x] = nearest;
    }

    for (let x = rowLeft + 1; x < rowRight; x += 1) {
      const before = leftBlocker[x];
      const after = rightBlocker[x];
      if (before < rowLeft || after < 0 || after - before > maxGapWidth) continue;
      const index = rowOffset + x;
      const distance = colorDistanceSquared(pixels, index, leftReference, rightReference);
      if (distance < backgroundThreshold) candidates[index] = 1;
    }
  }

  const visited = new Uint8Array(confidence.length);
  const queue = new Int32Array((roiRight - roiLeft + 1) * (endY - startY + 1));
  let queueStart = 0;
  let queueEnd = 0;
  const enqueue = (index) => {
    if (visited[index]) return;
    visited[index] = 1;
    queue[queueEnd] = index;
    queueEnd += 1;
  };
  const tryEnqueue = (index) => {
    if (
      !visited[index] &&
      (confidence[index] < 0.22 || candidates[index])
    ) enqueue(index);
  };
  for (let x = roiLeft; x <= roiRight; x += 1) {
    const index = endY * width + x;
    if (confidence[index] < 0.22) enqueue(index);
  }
  for (let y = startY; y <= endY; y += 1) {
    const leftIndex = y * width + roiLeft;
    const rightIndex = y * width + roiRight;
    if (confidence[leftIndex] < 0.22) enqueue(leftIndex);
    if (confidence[rightIndex] < 0.22) enqueue(rightIndex);
  }

  const output = new Float32Array(confidence);
  while (queueStart < queueEnd) {
    const index = queue[queueStart];
    queueStart += 1;
    const x = index % width;
    const y = Math.floor(index / width);
    if (candidates[index]) output[index] = Math.min(output[index], 0.04);
    if (x > roiLeft) tryEnqueue(index - 1);
    if (x < roiRight) tryEnqueue(index + 1);
    if (y > startY) tryEnqueue(index - width);
    if (y < endY) tryEnqueue(index + width);
  }
  return output;
}

function extremeFilter(input, width, height, radius, minimum) {
  if (!radius) return input;
  const horizontal = new Float32Array(input.length);
  const output = new Float32Array(input.length);
  const initial = minimum ? 1 : 0;
  for (let y = 0; y < height; y += 1) {
    const offset = y * width;
    for (let x = 0; x < width; x += 1) {
      let value = initial;
      for (let dx = -radius; dx <= radius; dx += 1) {
        const sampleX = clamp(x + dx, 0, width - 1);
        const sample = input[offset + sampleX];
        value = minimum ? Math.min(value, sample) : Math.max(value, sample);
      }
      horizontal[offset + x] = value;
    }
  }
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let value = initial;
      for (let dy = -radius; dy <= radius; dy += 1) {
        const sampleY = clamp(y + dy, 0, height - 1);
        const sample = horizontal[sampleY * width + x];
        value = minimum ? Math.min(value, sample) : Math.max(value, sample);
      }
      output[y * width + x] = value;
    }
  }
  return output;
}

function smoothStep(low, high, value) {
  const position = clamp((value - low) / Math.max(0.0001, high - low), 0, 1);
  return position * position * (3 - 2 * position);
}

function buildAlphaMask(base, edge) {
  const radius = Math.abs(Math.round(edge.shrink));
  let confidence = radius
    ? extremeFilter(base.confidence, base.width, base.height, radius, edge.shrink > 0)
    : base.confidence;
  if (edge.feather > 0) {
    const featherRadius = clamp(Math.ceil(edge.feather / 2), 1, 4);
    confidence = boxMean(
      confidence,
      base.width,
      base.height,
      featherRadius,
      new Float64Array((base.width + 1) * (base.height + 1))
    );
  }
  const alpha = new Float32Array(confidence.length);
  for (let index = 0; index < confidence.length; index += 1) {
    let value = edge.feather === 0
      ? Number(confidence[index] >= 0.5)
      : smoothStep(0.035, 0.965, confidence[index]);
    if (value < 0.006) value = 0;
    if (value > 0.994) value = 1;
    alpha[index] = value;
  }
  return alpha;
}

function createSubjectCutout(photo, width, height, alpha) {
  const canvasElement = document.createElement("canvas");
  canvasElement.width = width;
  canvasElement.height = height;
  const context = canvasElement.getContext("2d", { willReadFrequently: true });
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(photo, 0, 0, width, height);
  const imageData = context.getImageData(0, 0, width, height);
  const source = new Uint8ClampedArray(imageData.data);
  const searchRadius = 9;

  for (let index = 0; index < alpha.length; index += 1) {
    const value = alpha[index];
    const pixel = index * 4;
    if (value > 0.015 && value < 0.985) {
      const x = index % width;
      const y = Math.floor(index / width);
      let foregroundIndex = -1;
      let backgroundIndex = -1;
      for (
        let radius = 1;
        radius <= searchRadius && (foregroundIndex < 0 || backgroundIndex < 0);
        radius += 1
      ) {
        for (let dy = -radius; dy <= radius; dy += 1) {
          const sampleY = y + dy;
          if (sampleY < 0 || sampleY >= height) continue;
          for (let dx = -radius; dx <= radius; dx += 1) {
            if (Math.abs(dx) !== radius && Math.abs(dy) !== radius) continue;
            const sampleX = x + dx;
            if (sampleX < 0 || sampleX >= width) continue;
            const sampleIndex = sampleY * width + sampleX;
            if (foregroundIndex < 0 && alpha[sampleIndex] >= 0.985) {
              foregroundIndex = sampleIndex;
            }
            if (backgroundIndex < 0 && alpha[sampleIndex] <= 0.015) {
              backgroundIndex = sampleIndex;
            }
          }
        }
      }
      if (foregroundIndex >= 0) {
        const foregroundPixel = foregroundIndex * 4;
        const backgroundPixel = backgroundIndex >= 0 ? backgroundIndex * 4 : -1;
        for (let channel = 0; channel < 3; channel += 1) {
          const original = source[pixel + channel];
          const foreground = source[foregroundPixel + channel];
          let target = foreground;
          if (backgroundPixel >= 0 && value >= 0.22) {
            const background = source[backgroundPixel + channel];
            target = clamp(
              (original - (1 - value) * background) / Math.max(value, 0.22),
              0,
              255
            );
            target = target * 0.78 + foreground * 0.22;
          }
          const blend = clamp((1 - value) * 0.82, 0.08, 0.78);
          imageData.data[pixel + channel] = Math.round(
            original * (1 - blend) + target * blend
          );
        }
      }
    }
    imageData.data[pixel + 3] = Math.round(value * 255);
  }
  context.putImageData(imageData, 0, 0);
  return canvasElement;
}

function refineSegmentationMask(mask, photo, confidence = extractMaskConfidence(mask)) {
  const analysis = createPhotoAnalysis(photo, mask.width, mask.height);
  const guided = guidedFilter(
    analysis.guidance,
    confidence,
    mask.width,
    mask.height
  );
  const recovered = recoverInteriorBackground(
    guided,
    analysis.pixels,
    mask.width,
    mask.height
  );
  return {
    width: mask.width,
    height: mask.height,
    confidence: refineAlphaMatte(
      recovered,
      analysis.pixels,
      mask.width,
      mask.height
    )
  };
}

function rebuildSubjectAssets() {
  if (!state.photo || !state.subjectMaskBase) return;
  const alpha = buildAlphaMask(state.subjectMaskBase, state.edge);
  state.subjectCutout = createSubjectCutout(
    state.photo,
    state.subjectMaskBase.width,
    state.subjectMaskBase.height,
    alpha
  );
}

function scheduleMaskTuning() {
  clearTimeout(maskTuningTimer);
  maskTuningTimer = setTimeout(() => {
    rebuildSubjectAssets();
    renderMain();
  }, 70);
}

function loadCutoutImage(source, revokeAfterLoad = false) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      if (revokeAfterLoad) URL.revokeObjectURL(source);
      resolve(image);
    };
    image.onerror = () => {
      if (revokeAfterLoad) URL.revokeObjectURL(source);
      reject(new Error("cutout-image-load-failed"));
    };
    image.src = source;
  });
}

async function imageFromCutoutResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.startsWith("image/")) {
    const objectUrl = URL.createObjectURL(await response.blob());
    return { hasPerson: true, image: await loadCutoutImage(objectUrl, true) };
  }

  const payload = await response.json();
  const data = payload.data || payload;
  if (payload.hasPerson === false || data.hasPerson === false) {
    return { hasPerson: false, image: null };
  }
  const base64 = data.cutoutBase64 || data.subjectBase64;
  if (base64) {
    const source = /^data:image\//.test(base64)
      ? base64
      : `data:image/png;base64,${base64}`;
    return { hasPerson: true, image: await loadCutoutImage(source) };
  }

  const cutoutUrl = data.cutoutUrl || data.subjectUrl;
  if (!cutoutUrl) throw new Error("cutout-payload-missing");
  const cutoutResponse = await fetch(cutoutUrl);
  if (!cutoutResponse.ok) throw new Error(`cutout-download-${cutoutResponse.status}`);
  const objectUrl = URL.createObjectURL(await cutoutResponse.blob());
  return { hasPerson: true, image: await loadCutoutImage(objectUrl, true) };
}

async function requestHdCutout(file) {
  if (!CUTOUT_CONFIG.segmentationEndpoint || !file) return null;
  const form = new FormData();
  form.append("image", file, file.name || "photo.jpg");
  form.append("output", "full-frame-transparent-png");
  form.append("quality", CUTOUT_CONFIG.quality || "hd");
  form.append("matting", "alpha");
  form.append("refineEdges", "true");
  form.append("preserveFineDetails", "hair,club,limbs");
  form.append("edgeDecontamination", "true");
  const response = await fetch(CUTOUT_CONFIG.segmentationEndpoint, {
    method: "POST",
    headers: CUTOUT_CONFIG.segmentationHeaders || {},
    body: form
  });
  if (!response.ok) throw new Error(`cutout-request-${response.status}`);
  const result = await imageFromCutoutResponse(response);
  if (!result.hasPerson) return { hasPerson: false };

  const photoWidth = state.photo.naturalWidth || state.photo.width;
  const photoHeight = state.photo.naturalHeight || state.photo.height;
  const cutoutWidth = result.image.naturalWidth || result.image.width;
  const cutoutHeight = result.image.naturalHeight || result.image.height;
  const aspectDifference = Math.abs(
    photoWidth / photoHeight - cutoutWidth / cutoutHeight
  );
  if (aspectDifference > 0.03) throw new Error("cutout-must-use-full-frame");
  return result;
}

function ensureSegmentationLibrary() {
  if (typeof window.SelfieSegmentation === "function") return Promise.resolve();
  if (segmentationLibraryPromise) return segmentationLibraryPromise;
  segmentationLibraryPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.1/selfie_segmentation.js";
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return segmentationLibraryPromise;
}

function getSegmenter() {
  if (selfieSegmenter) return selfieSegmenter;
  selfieSegmenter = new window.SelfieSegmentation({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.1/${file}`
  });
  selfieSegmenter.setOptions({ modelSelection: 0, selfieMode: false });
  selfieSegmenter.onResults((results) => {
    if (pendingSegmentationResolve) {
      const resolve = pendingSegmentationResolve;
      pendingSegmentationResolve = null;
      resolve(results);
    }
  });
  return selfieSegmenter;
}

async function runSegmentationPass(image, timeout = 30000) {
  let timeoutId;
  try {
    const resultPromise = new Promise((resolve, reject) => {
      timeoutId = setTimeout(() => {
        pendingSegmentationResolve = null;
        reject(new Error("timeout"));
      }, timeout);
      pendingSegmentationResolve = (results) => {
        clearTimeout(timeoutId);
        resolve(results);
      };
    });
    await getSegmenter().send({ image });
    return await resultPromise;
  } catch (error) {
    clearTimeout(timeoutId);
    pendingSegmentationResolve = null;
    throw error;
  }
}

async function runSegmentation(token) {
  if (!state.photo || token !== segmentationToken) return;
  state.segmentationState = "loading";
  updateRecognitionUi();
  try {
    if (CUTOUT_CONFIG.segmentationEndpoint && sourcePhotoFile) {
      try {
        const hdResult = await requestHdCutout(sourcePhotoFile);
        if (token !== segmentationToken) return;
        if (hdResult?.hasPerson && hdResult.image) {
          state.subjectMaskBase = null;
          state.subjectCutout = hdResult.image;
          state.segmentationState = "person";
          state.segmentationSource = "hd";
          updateRecognitionUi();
          renderMain();
          return;
        }
      } catch (error) {
        console.warn("HD cutout unavailable; using local refinement.", error);
      }
    }

    await ensureSegmentationLibrary();
    const results = await runSegmentationPass(state.photo);
    if (token !== segmentationToken) return;
    const mask = copyMask(results.segmentationMask);
    const confidence = extractMaskConfidence(mask);
    const metrics = measureMask(confidence);
    const person = metrics.strongRatio >= 0.012 &&
      metrics.strongRatio <= 0.82 &&
      metrics.meanConfidence >= 0.018;
    if (person) {
      let refinedConfidence = confidence;
      const crop = createSubjectCrop(
        state.photo,
        confidence,
        mask.width,
        mask.height
      );
      if (crop) {
        try {
          await new Promise((resolve) => requestAnimationFrame(resolve));
          const cropResults = await runSegmentationPass(crop.canvas, 20000);
          if (token !== segmentationToken) return;
          const cropMask = copyMask(
            cropResults.segmentationMask,
            crop.canvas.width,
            crop.canvas.height
          );
          refinedConfidence = mergeSubjectCrop(
            {
              width: mask.width,
              height: mask.height,
              confidence
            },
            extractMaskConfidence(cropMask),
            cropMask.width,
            cropMask.height,
            crop
          );
        } catch {
          pendingSegmentationResolve = null;
          if (selfieSegmenter?.close) selfieSegmenter.close();
          selfieSegmenter = null;
        }
      }
      await new Promise((resolve) => requestAnimationFrame(resolve));
      const refinedMask = refineSegmentationMask(
        mask,
        state.photo,
        refinedConfidence
      );
      if (token !== segmentationToken) return;
      state.subjectMaskBase = refinedMask;
      rebuildSubjectAssets();
      state.segmentationSource = "local";
    } else {
      state.subjectMaskBase = null;
      state.subjectCutout = null;
      state.segmentationSource = "none";
    }
    state.segmentationState = person ? "person" : "fallback";
  } catch {
    if (token !== segmentationToken) return;
    state.subjectMaskBase = null;
    state.subjectCutout = null;
    state.segmentationState = "fallback";
    state.segmentationSource = "none";
    pendingSegmentationResolve = null;
    if (selfieSegmenter?.close) selfieSegmenter.close();
    selfieSegmenter = null;
  }
  updateRecognitionUi();
  renderMain();
}

function requestSegmentation() {
  if (!state.photo) return;
  const token = ++segmentationToken;
  state.segmentationState = "loading";
  state.subjectMaskBase = null;
  state.subjectCutout = null;
  state.segmentationSource = "none";
  updateRecognitionUi();
  segmentationQueue = segmentationQueue.catch(() => undefined).then(() => runSegmentation(token));
}

function updateRecognitionUi() {
  const keys = {
    idle: "waitingPhoto",
    loading: "analyzingPhoto",
    person: "personDetected",
    fallback: "noPerson"
  };
  const statusKey = state.segmentationState === "person" && state.segmentationSource === "hd"
    ? "personDetectedHd"
    : keys[state.segmentationState] || "waitingPhoto";
  elements.recognitionDetail.textContent = translate(statusKey);
  elements.retrySegmentation.disabled = !state.photo || state.segmentationState === "loading";
  const unavailable = state.segmentationState !== "person" || !state.subjectMaskBase;
  elements.edgeShrink.disabled = unavailable;
  elements.edgeFeather.disabled = unavailable;
}

function addStickerFiles(files) {
  const available = MAX_STICKERS - state.stickers.length;
  [...files].slice(0, available).forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxSide = 220;
        const scale = Math.min(maxSide / image.naturalWidth, maxSide / image.naturalHeight, 1);
        const sticker = {
          id: String(++stickerIdCounter),
          image,
          url: reader.result,
          baseWidth: image.naturalWidth * scale,
          baseHeight: image.naturalHeight * scale,
          x: 500 + (state.stickers.length % 3 - 1) * 90,
          y: 630 + (state.stickers.length % 2) * 90,
          scale: 1
        };
        state.stickers.push(sticker);
        state.selectedStickerId = sticker.id;
        renderStickerList();
        syncStickerControls();
        renderMain();
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
  elements.stickerInput.value = "";
}

function removeSelectedSticker() {
  if (!state.selectedStickerId) return;
  state.stickers = state.stickers.filter((sticker) => sticker.id !== state.selectedStickerId);
  state.selectedStickerId = state.stickers.at(-1)?.id || null;
  renderStickerList();
  syncStickerControls();
  renderMain();
}

function downloadPoster() {
  if (!selectedTemplateId) return;
  renderMain(true);
  const link = document.createElement("a");
  link.download = `golf-poster-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png", 1);
  link.click();
  renderMain();
}

function resetAll() {
  segmentationToken += 1;
  clearTimeout(maskTuningTimer);
  sourcePhotoFile = null;
  selectedTemplateId = null;
  state = createModel("academy", false);
  returnToSummary = false;
  activeIdentityTarget = "nickname";
  summaryEditEnabled = false;
  summaryEditTarget = null;
  sceneBounds = {};
  elements.photoInput.value = "";
  elements.stickerInput.value = "";
  elements.templateNext.disabled = true;
  syncAllControls();
  renderTemplateGallery();
  setStep("template");
}

function bindEvents() {
  elements.templateNext.addEventListener("click", () => {
    if (!selectedTemplateId) return;
    if (returnToSummary) {
      returnToSummary = false;
      setStep("summary");
    } else {
      setStep("photo");
    }
  });
  elements.backButton.addEventListener("click", previousStep);
  elements.nextButton.addEventListener("click", nextStep);
  elements.languageSelect.addEventListener("change", (event) => applyLanguage(event.target.value));
  elements.resetPoster.addEventListener("click", resetAll);
  elements.openPosterPreview.addEventListener("click", openFullPreview);
  elements.closePreviewModal.addEventListener("click", closePreview);
  elements.previewModal.querySelector(".modal-backdrop").addEventListener("click", closePreview);
  elements.useTemplateButton.addEventListener("click", () => {
    if (modalMode === "template" && modalTemplateId) activateTemplate(modalTemplateId, true);
    closePreview();
  });

  elements.photoInput.addEventListener("change", (event) => loadPhoto(event.target.files[0]));
  elements.resetPhoto.addEventListener("click", resetPhoto);
  elements.photoScale.addEventListener("input", () => {
    state.image.scale = Number(elements.photoScale.value) / 100;
    elements.photoScaleValue.textContent = `${elements.photoScale.value}%`;
    renderMain();
  });
  elements.backgroundBlur.addEventListener("input", () => {
    state.image.blur = Number(elements.backgroundBlur.value);
    elements.backgroundBlurValue.textContent = `${state.image.blur}px`;
    renderMain();
  });
  elements.edgeShrink.addEventListener("input", () => {
    state.edge.shrink = Number(elements.edgeShrink.value);
    elements.edgeShrinkValue.textContent =
      `${state.edge.shrink > 0 ? "+" : ""}${state.edge.shrink}px`;
    scheduleMaskTuning();
  });
  elements.edgeFeather.addEventListener("input", () => {
    state.edge.feather = Number(elements.edgeFeather.value);
    elements.edgeFeatherValue.textContent = `${state.edge.feather}px`;
    scheduleMaskTuning();
  });
  elements.retrySegmentation.addEventListener("click", requestSegmentation);

  elements.scoreInput.addEventListener("input", () => {
    state.scoreSets[state.scoreMode] = parseScores(
      elements.scoreInput.value,
      state.scoreMode
    );
    updateAutoTotal();
  });
  document.querySelectorAll(".score-mode-target").forEach((button) => {
    button.addEventListener("click", () => {
      state.scoreMode = button.dataset.scoreMode;
      syncScoreModeControls();
      updateAutoTotal();
    });
  });
  document.querySelectorAll(".score-style-target").forEach((button) => {
    button.addEventListener("click", () => {
      state.scoringStyle = button.dataset.scoreStyle;
      document.querySelectorAll(".score-style-target").forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });
      renderMain();
    });
  });
  elements.highlightInput.addEventListener("input", () => {
    state.highlights = parseHighlights(elements.highlightInput.value);
    renderMain();
  });
  elements.badgeText.addEventListener("input", () => {
    state.badge = elements.badgeText.value.trim();
    renderMain();
  });
  elements.scoreFont.addEventListener("change", () => {
    state.fonts.score = elements.scoreFont.value;
    renderMain();
  });
  elements.scorecardScale.addEventListener("input", () => {
    state.scorecard.scale = Number(elements.scorecardScale.value) / 100;
    elements.scorecardScaleValue.textContent = `${elements.scorecardScale.value}%`;
    renderMain();
  });
  elements.textColor.addEventListener("input", () => {
    state.paletteId = "custom";
    state.identity[effectiveIdentityTarget()].color = elements.textColor.value;
    renderPaletteList();
    renderMain();
  });

  elements.autoTotal.addEventListener("change", () => {
    state.autoTotal = elements.autoTotal.checked;
    updateAutoTotal();
  });
  elements.roundParInput.addEventListener("input", () => {
    const value = Number.parseInt(elements.roundParInput.value, 10);
    state.roundPar = Number.isFinite(value) ? clamp(value, 1, 180) : null;
    updateAutoTotal();
  });
  elements.totalScore.addEventListener("input", () => {
    if (!state.autoTotal) {
      state.total.value = elements.totalScore.value;
      renderMain();
    }
  });
  elements.numberFont.addEventListener("change", () => {
    state.fonts.total = elements.numberFont.value;
    renderMain();
  });
  elements.totalOpacity.addEventListener("input", () => {
    state.total.opacity = Number(elements.totalOpacity.value);
    elements.totalOpacityValue.textContent = `${elements.totalOpacity.value}%`;
    renderMain();
  });
  elements.totalSize.addEventListener("input", () => {
    state.total.size = Number(elements.totalSize.value);
    elements.totalSizeValue.textContent = `${elements.totalSize.value}px`;
    renderMain();
  });
  elements.totalAboveSubject.addEventListener("change", () => {
    state.total.aboveSubject = elements.totalAboveSubject.checked;
    renderMain();
  });

  document.querySelectorAll(".identity-target").forEach((button) => {
    button.addEventListener("click", () => {
      activateIdentityTarget(button.dataset.target);
    });
  });
  [
    [elements.nickname, "nickname"],
    [elements.course, "course"],
    [elements.dateInput, "date"],
    [elements.extraInfo, "extra"]
  ].forEach(([input, target]) => {
    input.addEventListener("focus", () => activateIdentityTarget(target));
  });
  elements.nickname.addEventListener("input", () => {
    activateIdentityTarget("nickname", false);
    state.identity.nickname.value = elements.nickname.value;
    renderMain();
  });
  elements.course.addEventListener("input", () => {
    activateIdentityTarget("course", false);
    state.identity.course.value = elements.course.value;
    renderMain();
  });
  elements.dateInput.addEventListener("input", () => {
    activateIdentityTarget("date", false);
    state.identity.date.value = elements.dateInput.value;
    renderMain();
  });
  elements.dateInput.addEventListener("change", () => {
    activateIdentityTarget("date", false);
    state.identity.date.value = elements.dateInput.value;
    renderMain();
  });
  elements.extraInfo.addEventListener("input", () => {
    activateIdentityTarget("extra", false);
    state.identity.extra.value = elements.extraInfo.value;
    renderMain();
  });
  elements.brandText.addEventListener("input", () => {
    state.identity.brand = elements.brandText.value;
    renderMain();
  });
  elements.textFont.addEventListener("change", () => {
    state.identity[effectiveIdentityTarget()].font = elements.textFont.value;
    renderMain();
  });
  elements.identitySize.addEventListener("input", () => {
    const target = effectiveIdentityTarget();
    state.identity[target].size = Number(elements.identitySize.value);
    elements.identitySizeValue.textContent = `${elements.identitySize.value}px`;
    renderMain();
  });

  elements.stickerInput.addEventListener("change", (event) => addStickerFiles(event.target.files));
  elements.stickerScale.addEventListener("input", () => {
    const sticker = selectedSticker();
    if (!sticker) return;
    sticker.scale = Number(elements.stickerScale.value) / 100;
    elements.stickerScaleValue.textContent = `${elements.stickerScale.value}%`;
    renderMain();
  });
  elements.removeSticker.addEventListener("click", removeSelectedSticker);
  elements.downloadPoster.addEventListener("click", downloadPoster);
  elements.openFreeEdit.addEventListener("click", openFreeEdit);
  elements.summaryElementScale.addEventListener("input", () => {
    if (modalMode !== "edit" || !summaryEditEnabled || !summaryEditTarget) return;
    setSummaryTargetScale(summaryEditTarget, Number(elements.summaryElementScale.value));
    syncGestureOutputs();
    renderEditModal();
  });

  document.querySelectorAll(".summary-edit").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.editStep === "identity") commitIdentityInputs();
      returnToSummary = true;
      setStep(button.dataset.editStep);
    });
  });

  canvas.addEventListener("pointerdown", startPointer);
  canvas.addEventListener("pointermove", movePointer);
  canvas.addEventListener("pointerup", endPointer);
  canvas.addEventListener("pointercancel", endPointer);
  elements.modalCanvas.addEventListener("pointerdown", startPointer);
  elements.modalCanvas.addEventListener("pointermove", movePointer);
  elements.modalCanvas.addEventListener("pointerup", endPointer);
  elements.modalCanvas.addEventListener("pointercancel", endPointer);
}

function initialize() {
  populateFontSelect(elements.scoreFont);
  populateFontSelect(elements.numberFont);
  populateFontSelect(elements.textFont);
  bindEvents();
  language = loadLanguage();
  applyLanguage(language, false);
  syncAllControls();
  renderTemplateGallery();
  setStep("template");
}

initialize();
