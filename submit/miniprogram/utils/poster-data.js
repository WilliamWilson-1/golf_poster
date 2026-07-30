const POSTER_WIDTH = 1000;
const POSTER_HEIGHT = 1265;
const BRAND_HEIGHT = 70;
const MAX_STICKERS = 5;

const PALETTES = {
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

const COLOR_OPTIONS = [
  { value: "#ffffff", zh: "白色", en: "White" },
  { value: "#101820", zh: "墨黑", en: "Black" },
  { value: "#dc3f4d", zh: "巡回红", en: "Tour Red" },
  { value: "#f28aa5", zh: "玫瑰粉", en: "Rose" },
  { value: "#f2b321", zh: "老鹰金", en: "Eagle Gold" },
  { value: "#f4df3b", zh: "大师黄", en: "Yellow" },
  { value: "#15533a", zh: "松柏绿", en: "Green" },
  { value: "#1c75bc", zh: "巡回蓝", en: "Tour Blue" }
];

const FONT_OPTIONS = [
  { id: "arial", label: "Arial", family: "Arial" },
  { id: "arialBlack", label: "Arial Black", family: "Arial Black" },
  { id: "impact", label: "Impact", family: "Impact" },
  { id: "georgia", label: "Georgia", family: "Georgia" },
  { id: "times", label: "Times New Roman", family: "Times New Roman" },
  { id: "baskerville", label: "Baskerville", family: "Baskerville" },
  { id: "didot", label: "Didot", family: "Didot" },
  { id: "trebuchet", label: "Trebuchet MS", family: "Trebuchet MS" },
  { id: "verdana", label: "Verdana", family: "Verdana" },
  { id: "courier", label: "Courier New", family: "Courier New" }
];

const SHARED_BRAND = { x: 0, y: 0, w: 1000, h: 70 };

const TEMPLATES = {
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
      brand: SHARED_BRAND,
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
      brand: SHARED_BRAND,
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
      brand: SHARED_BRAND,
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
      brand: SHARED_BRAND,
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
      brand: SHARED_BRAND,
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
      brand: SHARED_BRAND,
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

function centerOf(region) {
  return { x: region.x + region.w / 2, y: region.y + region.h / 2 };
}

function createPosterModel(templateId, sample, brand) {
  const id = TEMPLATES[templateId] ? templateId : "academy";
  const template = TEMPLATES[id];
  const paletteId = template.paletteIds[0];
  const palette = PALETTES[paletteId];
  const nickname = centerOf(template.layout.nickname);
  const course = centerOf(template.layout.course);
  const date = template.layout.date ? centerOf(template.layout.date) : centerOf(template.layout.course);
  const extra = centerOf(template.layout.extra);
  const total = centerOf(template.layout.total);
  const scorecard = centerOf(template.layout.score);

  return {
    templateId: id,
    photo: null,
    photoPath: "",
    subject: null,
    segmentationStatus: "idle",
    image: { scale: 1, x: 0, y: 0, blur: 0 },
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
    highlights: sample ? [3, 6, 14] : [],
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
        value: sample ? (id === "duo" ? "PLAYER ONE & PLAYER TWO" : "PLAYER NAME") : "",
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
        value: sample ? "2026.07.31" : "",
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
      brand: brand || "GOLFBROTHERS"
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
      score: id === "client1" ? "arialBlack" : "georgia",
      total: id === "client1" ? "arialBlack" : "georgia"
    },
    stickers: [],
    selectedStickerId: "",
    previewSubject: Boolean(sample)
  };
}

function applyPalette(model, paletteId) {
  const palette = PALETTES[paletteId];
  if (!palette) return model;
  model.paletteId = paletteId;
  model.style.total = palette.total;
  model.style.card = palette.card;
  model.style.line = palette.line;
  model.style.scoreText = palette.scoreText;
  model.style.text = palette.text;
  ["nickname", "course", "date", "extra"].forEach((key) => {
    model.identity[key].color = palette.text;
  });
  return model;
}

function switchTemplate(previous, templateId, brand) {
  const next = createPosterModel(templateId, false, brand || previous.identity.brand);
  next.photo = previous.photo;
  next.photoPath = previous.photoPath;
  next.subject = previous.subject;
  next.segmentationStatus = previous.segmentationStatus;
  next.image = Object.assign({}, previous.image);
  next.scoreMode = previous.scoreMode;
  next.scoreSets = {
    strokes: previous.scoreSets.strokes.slice(),
    relative: previous.scoreSets.relative.slice()
  };
  next.scoringStyle = previous.scoringStyle;
  next.highlights = previous.highlights.slice();
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
  next.stickers = previous.stickers;
  next.selectedStickerId = previous.selectedStickerId;
  return next;
}

function templateCards(language) {
  return Object.keys(TEMPLATES).map((id) => {
    const template = TEMPLATES[id];
    const palette = PALETTES[template.paletteIds[0]];
    return {
      id,
      name: language === "en" ? template.en : template.zh,
      description: language === "en" ? template.descriptionEn : template.descriptionZh,
      tone: template.tone,
      direction: template.layout.score.direction,
      total: palette.total,
      card: palette.card,
      line: palette.line
    };
  });
}

module.exports = {
  POSTER_WIDTH,
  POSTER_HEIGHT,
  BRAND_HEIGHT,
  MAX_STICKERS,
  PALETTES,
  COLOR_OPTIONS,
  FONT_OPTIONS,
  TEMPLATES,
  centerOf,
  createPosterModel,
  applyPalette,
  switchTemplate,
  templateCards
};
