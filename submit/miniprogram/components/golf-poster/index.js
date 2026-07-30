const defaultConfig = require("../../config");
const {
  POSTER_WIDTH,
  POSTER_HEIGHT,
  MAX_STICKERS,
  PALETTES,
  COLOR_OPTIONS,
  FONT_OPTIONS,
  TEMPLATES,
  createPosterModel,
  applyPalette,
  switchTemplate,
  templateCards
} = require("../../utils/poster-data");
const {
  parseScoreInput,
  formatScoreInput,
  calculateTotal
} = require("../../utils/score");
const {
  renderPoster,
  hitTest,
  isLightNeutralBoard
} = require("../../utils/poster-engine");
const { requestSubjectCutout } = require("../../services/segmentation");

const STEP_KEYS = ["template", "photo", "scorecard", "total", "identity", "stickers", "summary"];
const WHITE_ONLY_STYLE_KEYS = [
  "scoreText",
  "underMarker",
  "eagleMarker",
  "overMarker",
  "doubleBogeyMarker"
];

const COPY = {
  zh: {
    studio: "海报工作室",
    language: "EN",
    reset: "重置",
    chooseTemplate: "选择海报模板",
    chooseTemplateHint: "点击缩略图可放大查看，单选后进入编辑。",
    previewTemplate: "模板预览",
    useTemplate: "使用此模板",
    next: "下一步",
    back: "上一步",
    preview: "预览",
    close: "关闭",
    stepTitles: ["模板", "照片", "成绩卡", "总成绩", "文字信息", "贴纸", "完成海报"],
    gestureHints: [
      "",
      "画布手势仅调整照片",
      "画布手势仅调整成绩卡",
      "画布手势仅调整总成绩",
      "画布手势仅调整当前文字",
      "画布手势仅调整选中贴纸",
      "完整海报预览"
    ],
    uploadPhoto: "上传照片",
    resetLayout: "复位画布",
    photoScale: "照片大小",
    backgroundBlur: "背景模糊",
    subjectDepth: "人物景深",
    waitingPhoto: "等待上传照片",
    segmenting: "正在处理人物边缘",
    personReady: "人物图层已生成",
    fullPhotoFallback: "使用完整照片",
    retry: "重新识别",
    palette: "模板配色",
    scoreMode: "成绩类型",
    strokes: "逐洞总杆",
    relative: "杆差成绩",
    scoringStyle: "记分方式",
    scoreInputStrokes: "逐洞成绩",
    scoreInputRelative: "逐洞杆差",
    scorePlaceholderStrokes: "例如：4 4 5 3，用空格或逗号分隔",
    scorePlaceholderRelative: "例如：-1 0 +1，用空格或逗号分隔",
    badge: "首洞标记",
    scoreFont: "成绩字体",
    board: "底板",
    rules: "分隔线",
    numbers: "数字",
    birdie: "小鸟",
    eagle: "老鹰及更好",
    bogey: "柏忌",
    doubleBogey: "双柏忌及更差",
    scorecardScale: "成绩卡大小",
    locked: "已锁定",
    unavailable: "当前底板不可用",
    totalStrokes: "总杆",
    autoTotal: "自动统计",
    roundPar: "本轮 / 已完成球洞标准杆合计",
    totalFont: "数字字体",
    totalColor: "总成绩颜色",
    totalOpacity: "透明度",
    totalSize: "总成绩大小",
    totalAbove: "总成绩置于人物上方",
    totalEmpty: "录入逐洞成绩后自动合计",
    nickname: "昵称",
    course: "球场 / 赛事",
    date: "日期",
    extra: "补充信息",
    textFont: "文字字体",
    textColor: "文字颜色",
    textSize: "当前文字大小",
    brand: "品牌文字",
    uploadSticker: "上传贴纸",
    stickerSize: "贴纸大小",
    removeSticker: "删除选中贴纸",
    stickerEmpty: "最多上传 5 张透明 PNG 或普通图片",
    freeEdit: "大图自由编辑",
    freeEditHint: "点击元素后直接拖动，下方滑杆调整大小。",
    editTemplate: "修改模板",
    editPhoto: "修改照片",
    editScorecard: "修改成绩卡",
    editTotal: "修改总成绩",
    editIdentity: "修改文字",
    editStickers: "修改贴纸",
    exportPoster: "生成并保存海报",
    activeElement: "当前元素",
    elementSize: "元素大小",
    noSelection: "点击海报元素进行选择",
    saving: "正在生成海报",
    saved: "海报已保存到相册",
    saveFailed: "保存失败，请检查相册权限",
    segmentFailed: "人物识别失败，已使用完整照片"
  },
  en: {
    studio: "POSTER STUDIO",
    language: "中文",
    reset: "RESET",
    chooseTemplate: "Choose a poster template",
    chooseTemplateHint: "Tap a thumbnail to inspect it, then continue.",
    previewTemplate: "Template preview",
    useTemplate: "USE TEMPLATE",
    next: "NEXT",
    back: "BACK",
    preview: "PREVIEW",
    close: "CLOSE",
    stepTitles: ["Template", "Photo", "Scorecard", "Total", "Text", "Stickers", "Complete"],
    gestureHints: [
      "",
      "Canvas gestures adjust only the photo",
      "Canvas gestures adjust only the scorecard",
      "Canvas gestures adjust only the total",
      "Canvas gestures adjust the active text",
      "Canvas gestures adjust the selected sticker",
      "Full poster preview"
    ],
    uploadPhoto: "UPLOAD PHOTO",
    resetLayout: "RESET LAYOUT",
    photoScale: "Photo size",
    backgroundBlur: "Background blur",
    subjectDepth: "Subject depth",
    waitingPhoto: "Waiting for a photo",
    segmenting: "Refining subject edges",
    personReady: "Subject layer is ready",
    fullPhotoFallback: "Using the full photo",
    retry: "RETRY",
    palette: "Template palette",
    scoreMode: "Score input",
    strokes: "Strokes",
    relative: "To par",
    scoringStyle: "Scoring style",
    scoreInputStrokes: "Hole scores",
    scoreInputRelative: "Hole-by-hole to par",
    scorePlaceholderStrokes: "Example: 4 4 5 3, separated by spaces",
    scorePlaceholderRelative: "Example: -1 0 +1, separated by spaces",
    badge: "First-hole badge",
    scoreFont: "Score font",
    board: "Board",
    rules: "Rules",
    numbers: "Numbers",
    birdie: "Birdie",
    eagle: "Eagle or better",
    bogey: "Bogey",
    doubleBogey: "Double bogey +",
    scorecardScale: "Scorecard size",
    locked: "Locked",
    unavailable: "Unavailable on this board",
    totalStrokes: "Total strokes",
    autoTotal: "Auto total",
    roundPar: "Round / completed-hole par total",
    totalFont: "Number font",
    totalColor: "Total color",
    totalOpacity: "Opacity",
    totalSize: "Total size",
    totalAbove: "Total above player",
    totalEmpty: "Hole scores will be totaled automatically",
    nickname: "Name",
    course: "Course / event",
    date: "Date",
    extra: "Additional info",
    textFont: "Text font",
    textColor: "Text color",
    textSize: "Active text size",
    brand: "Brand text",
    uploadSticker: "UPLOAD STICKER",
    stickerSize: "Sticker size",
    removeSticker: "REMOVE STICKER",
    stickerEmpty: "Upload up to five transparent PNGs or regular images",
    freeEdit: "LARGE PREVIEW EDIT",
    freeEditHint: "Tap and drag an element; use the slider below to resize.",
    editTemplate: "EDIT TEMPLATE",
    editPhoto: "EDIT PHOTO",
    editScorecard: "EDIT SCORECARD",
    editTotal: "EDIT TOTAL",
    editIdentity: "EDIT TEXT",
    editStickers: "EDIT STICKERS",
    exportPoster: "GENERATE & SAVE",
    activeElement: "Active element",
    elementSize: "Element size",
    noSelection: "Tap a poster element to select it",
    saving: "Generating poster",
    saved: "Poster saved to Photos",
    saveFailed: "Save failed. Check Photos permission.",
    segmentFailed: "Subject detection failed; using the full photo"
  }
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function distance(points) {
  if (points.length < 2) return 0;
  const dx = points[1].x - points[0].x;
  const dy = points[1].y - points[0].y;
  return Math.sqrt(dx * dx + dy * dy);
}

function center(points) {
  const total = points.reduce((sum, point) => ({
    x: sum.x + point.x,
    y: sum.y + point.y
  }), { x: 0, y: 0 });
  return { x: total.x / points.length, y: total.y / points.length };
}

function fontIndex(fontId) {
  const index = FONT_OPTIONS.findIndex((font) => font.id === fontId);
  return index >= 0 ? index : 0;
}

Component({
  properties: {
    brand: {
      type: String,
      value: "GOLFBROTHERS"
    },
    initialLanguage: {
      type: String,
      value: "zh"
    },
    segmentationEndpoint: {
      type: String,
      value: defaultConfig.segmentationEndpoint
    },
    segmentationHeaders: {
      type: Object,
      value: defaultConfig.segmentationHeaders
    },
    saveToAlbum: {
      type: Boolean,
      value: true
    }
  },

  data: {
    language: "zh",
    copy: COPY.zh,
    step: 0,
    stepCounter: "01 / 07",
    stepTitle: COPY.zh.stepTitles[0],
    gestureHint: "",
    showWizardFooter: false,
    templates: templateCards("zh"),
    selectedTemplateId: "",
    templatePreviewOpen: false,
    largeEdit: false,
    activeIdentity: "nickname",
    activeEditTarget: "",
    activeEditLabel: COPY.zh.noSelection,
    activeElementScale: 100,
    activeElementScaleDisabled: true,
    photoStatus: COPY.zh.waitingPhoto,
    fontOptions: FONT_OPTIONS,
    paletteOptions: [],
    cardColorOptions: [],
    lineColorOptions: [],
    scoreColorRows: [],
    totalColorOptions: [],
    textColorOptions: [],
    stickers: [],
    stickerCount: `0 / ${MAX_STICKERS}`,
    scoreFontIndex: 0,
    totalFontIndex: 0,
    textFontIndex: 0,
    form: {
      photoScale: 100,
      blur: 0,
      scoreMode: "relative",
      scoringStyle: "pga",
      scoreInput: "",
      badge: "",
      scorecardScale: 100,
      autoTotal: true,
      roundPar: 72,
      totalValue: "",
      totalHint: COPY.zh.totalEmpty,
      totalOpacity: 90,
      totalSize: 500,
      totalAbove: false,
      nickname: "",
      course: "",
      date: "",
      extra: "",
      brand: "GOLFBROTHERS",
      identitySize: 38,
      stickerScale: 100
    }
  },

  observers: {
    brand(value) {
      if (!this.posterState) return;
      this.posterState.identity.brand = value || "GOLFBROTHERS";
      this.setData({ "form.brand": this.posterState.identity.brand });
      this._render();
    },

    initialLanguage(value) {
      if (!this.posterState) return;
      this._applyLanguage(value === "en" ? "en" : "zh");
    }
  },

  lifetimes: {
    created() {
      this.posterState = createPosterModel("academy", false, "GOLFBROTHERS");
      this.posterCanvas = null;
      this.posterContext = null;
      this.templateCanvas = null;
      this.templateContext = null;
      this.canvasRect = null;
      this.sceneBounds = {};
      this.gesture = null;
      this.renderPending = false;
      this.returnToSummary = false;
    },

    attached() {
      const language = this.properties.initialLanguage === "en" ? "en" : "zh";
      this.posterState.identity.brand = this.properties.brand || "GOLFBROTHERS";
      this._applyLanguage(language);
      this._syncAllControls();
    }
  },

  methods: {
    toggleLanguage() {
      this._applyLanguage(this.data.language === "zh" ? "en" : "zh");
    },

    _applyLanguage(language) {
      const copy = COPY[language];
      this.setData({
        language,
        copy,
        templates: templateCards(language),
        stepTitle: copy.stepTitles[this.data.step],
        gestureHint: copy.gestureHints[this.data.step],
        photoStatus: this._photoStatusText(this.posterState.segmentationStatus, copy)
      });
      this._rebuildColorControls(language);
      this._rebuildPaletteOptions(language);
    },

    _photoStatusText(status, copyArg) {
      const copy = copyArg || this.data.copy;
      if (status === "loading") return copy.segmenting;
      if (status === "person") return copy.personReady;
      if (status === "fallback") return copy.fullPhotoFallback;
      return copy.waitingPhoto;
    },

    openTemplatePreview(event) {
      const templateId = event.currentTarget.dataset.id;
      this.setData({
        selectedTemplateId: templateId,
        templatePreviewOpen: true
      }, () => {
        this._initTemplateCanvas(templateId);
      });
    },

    closeTemplatePreview() {
      this.setData({ templatePreviewOpen: false });
      this.templateCanvas = null;
      this.templateContext = null;
    },

    confirmPreviewTemplate() {
      this._activateSelectedTemplate();
    },

    useSelectedTemplate() {
      if (!this.data.selectedTemplateId) {
        wx.showToast({ title: this.data.copy.chooseTemplate, icon: "none" });
        return;
      }
      this._activateSelectedTemplate();
    },

    _activateSelectedTemplate() {
      const templateId = this.data.selectedTemplateId;
      if (!templateId) return;
      const hasStarted = this.posterCanvas || this.data.step > 0;
      this.posterState = hasStarted
        ? switchTemplate(this.posterState, templateId, this.properties.brand)
        : createPosterModel(templateId, false, this.properties.brand);
      this.setData({
        templatePreviewOpen: false,
        step: this.returnToSummary ? 6 : 1
      }, () => {
        this.templateCanvas = null;
        this.templateContext = null;
        this._updateStepMeta();
        this._syncAllControls();
        this._initPosterCanvas().then(() => {
          this._renderNow();
          this._refreshCanvasRect();
        });
        this.returnToSummary = false;
      });
    },

    nextStep() {
      if (this.data.step >= 6) return;
      this.setData({ step: this.data.step + 1 }, () => {
        this._updateStepMeta();
        this._syncAllControls();
        this._render();
        this._refreshCanvasRect();
      });
    },

    previousStep() {
      if (this.data.step <= 1) {
        this.setData({ step: 0 }, () => this._updateStepMeta());
        return;
      }
      this.setData({ step: this.data.step - 1 }, () => {
        this._updateStepMeta();
        this._syncAllControls();
        this._render();
        this._refreshCanvasRect();
      });
    },

    _updateStepMeta() {
      const step = this.data.step;
      this.setData({
        stepCounter: `${String(step + 1).padStart(2, "0")} / 07`,
        stepTitle: this.data.copy.stepTitles[step],
        gestureHint: this.data.largeEdit
          ? this.data.copy.freeEditHint
          : this.data.copy.gestureHints[step],
        showWizardFooter: !this.data.largeEdit && step > 0 && step < 6
      });
    },

    jumpToStep(event) {
      const target = event.currentTarget.dataset.step;
      if (target === "template") {
        this.returnToSummary = true;
        this.setData({ step: 0 }, () => this._updateStepMeta());
        return;
      }
      const index = STEP_KEYS.indexOf(target);
      if (index < 1) return;
      this.returnToSummary = true;
      this.setData({ step: index }, () => {
        this._updateStepMeta();
        this._syncAllControls();
        this._render();
        this._refreshCanvasRect();
      });
    },

    openLargeEdit() {
      this.setData({
        largeEdit: true,
        activeEditTarget: this.posterState.total.value ? "total" : "scorecard"
      }, () => {
        this._updateStepMeta();
        this._syncLargeEdit();
        this._refreshCanvasRect();
        this._render();
      });
    },

    closeLargeEdit() {
      this.setData({
        largeEdit: false,
        activeEditTarget: "",
        activeElementScaleDisabled: true
      }, () => {
        this._updateStepMeta();
        this._refreshCanvasRect();
        this._render();
      });
    },

    resetPoster() {
      wx.showModal({
        title: this.data.copy.reset,
        content: this.data.language === "en"
          ? "Reset the poster and return to template selection?"
          : "清空当前海报并返回模板选择？",
        success: (result) => {
          if (!result.confirm) return;
          this.posterState = createPosterModel("academy", false, this.properties.brand);
          this.posterCanvas = null;
          this.posterContext = null;
          this.sceneBounds = {};
          this.returnToSummary = false;
          this.setData({
            step: 0,
            selectedTemplateId: "",
            templatePreviewOpen: false,
            largeEdit: false
          }, () => {
            this._updateStepMeta();
            this._syncAllControls();
          });
        }
      });
    },

    choosePhoto() {
      wx.chooseMedia({
        count: 1,
        mediaType: ["image"],
        sourceType: ["album", "camera"],
        sizeType: ["original", "compressed"],
        success: (result) => {
          const file = result.tempFiles && result.tempFiles[0];
          if (file) this._loadPhoto(file.tempFilePath);
        }
      });
    },

    async _loadPhoto(filePath) {
      try {
        const image = await this._loadCanvasImage(filePath);
        this.posterState.photo = image;
        this.posterState.photoPath = filePath;
        this.posterState.subject = null;
        this.posterState.segmentationStatus = "loading";
        this.posterState.image.scale = 1;
        this.posterState.image.x = 0;
        this.posterState.image.y = 0;
        this.setData({
          photoStatus: this.data.copy.segmenting,
          "form.photoScale": 100
        });
        this._render();
        this.triggerEvent("segmentationstart", { filePath });
        await this._runSegmentation(filePath);
      } catch (error) {
        wx.showToast({ title: this.data.copy.segmentFailed, icon: "none" });
      }
    },

    async _runSegmentation(filePath) {
      try {
        const result = await requestSubjectCutout({
          filePath,
          endpoint: this.properties.segmentationEndpoint,
          headers: this.properties.segmentationHeaders
        });
        if (result.status === "person" && result.filePath) {
          this.posterState.subject = await this._loadCanvasImage(result.filePath);
          this.posterState.segmentationStatus = "person";
        } else {
          this.posterState.subject = null;
          this.posterState.segmentationStatus = "fallback";
        }
      } catch (error) {
        this.posterState.subject = null;
        this.posterState.segmentationStatus = "fallback";
        wx.showToast({ title: this.data.copy.segmentFailed, icon: "none" });
      }
      this.setData({
        photoStatus: this._photoStatusText(this.posterState.segmentationStatus)
      });
      this.triggerEvent("segmentationend", {
        status: this.posterState.segmentationStatus
      });
      this._render();
    },

    retrySegmentation() {
      if (!this.posterState.photoPath) {
        this.choosePhoto();
        return;
      }
      this._runSegmentation(this.posterState.photoPath);
    },

    async applySubjectCutout(filePath, hasPerson) {
      if (!hasPerson || !filePath) {
        this.posterState.subject = null;
        this.posterState.segmentationStatus = "fallback";
      } else {
        this.posterState.subject = await this._loadCanvasImage(filePath);
        this.posterState.segmentationStatus = "person";
      }
      this.setData({
        photoStatus: this._photoStatusText(this.posterState.segmentationStatus)
      });
      this._render();
    },

    resetLayout() {
      const defaults = createPosterModel(this.posterState.templateId, false, this.properties.brand);
      this.posterState.image = Object.assign({}, defaults.image);
      this.posterState.scorecard.x = defaults.scorecard.x;
      this.posterState.scorecard.y = defaults.scorecard.y;
      this.posterState.scorecard.scale = 1;
      this.posterState.total.x = defaults.total.x;
      this.posterState.total.y = defaults.total.y;
      ["nickname", "course", "date", "extra"].forEach((key) => {
        this.posterState.identity[key].x = defaults.identity[key].x;
        this.posterState.identity[key].y = defaults.identity[key].y;
      });
      this.posterState.stickers.forEach((sticker, index) => {
        sticker.x = 500 + (index % 3 - 1) * 90;
        sticker.y = 630 + index % 2 * 90;
        sticker.scale = 1;
      });
      this._syncAllControls();
      this._render();
    },

    onPhotoScale(event) {
      this.posterState.image.scale = Number(event.detail.value) / 100;
      this.setData({ "form.photoScale": Number(event.detail.value) });
      this._render();
    },

    onBlurChange(event) {
      this.posterState.image.blur = Number(event.detail.value);
      this.setData({ "form.blur": Number(event.detail.value) });
      this._render();
    },

    selectPalette(event) {
      applyPalette(this.posterState, event.currentTarget.dataset.id);
      this._rebuildPaletteOptions();
      this._rebuildColorControls();
      this._syncIdentityForm();
      this._render();
    },

    selectScoreMode(event) {
      this.posterState.scoreMode = event.currentTarget.dataset.mode;
      this.setData({
        "form.scoreMode": this.posterState.scoreMode,
        "form.scoreInput": formatScoreInput(this.posterState.scoreSets[this.posterState.scoreMode])
      });
      this._updateAutoTotal();
    },

    selectScoringStyle(event) {
      this.posterState.scoringStyle = event.currentTarget.dataset.style;
      this.setData({ "form.scoringStyle": this.posterState.scoringStyle });
      this._render();
    },

    onScoreInput(event) {
      this.posterState.scoreSets[this.posterState.scoreMode] = parseScoreInput(
        event.detail.value,
        this.posterState.scoreMode
      );
      this.setData({ "form.scoreInput": event.detail.value });
      this._updateAutoTotal();
    },

    onBadgeInput(event) {
      this.posterState.badge = event.detail.value.trim();
      this.setData({ "form.badge": event.detail.value });
      this._render();
    },

    onScoreFontChange(event) {
      const index = Number(event.detail.value);
      this.posterState.fonts.score = FONT_OPTIONS[index].id;
      this.setData({ scoreFontIndex: index });
      this._render();
    },

    onScorecardScale(event) {
      this.posterState.scorecard.scale = Number(event.detail.value) / 100;
      this.setData({ "form.scorecardScale": Number(event.detail.value) });
      this._render();
    },

    selectColor(event) {
      const styleKey = event.currentTarget.dataset.key;
      const value = event.currentTarget.dataset.value;
      const locked = !isLightNeutralBoard(this.posterState.style.card)
        && WHITE_ONLY_STYLE_KEYS.indexOf(styleKey) >= 0;
      if (locked) return;
      this.posterState.paletteId = "custom";
      this.posterState.style[styleKey] = value;
      this._rebuildColorControls();
      this._rebuildPaletteOptions();
      this._render();
    },

    onAutoTotalChange(event) {
      this.posterState.autoTotal = Boolean(event.detail.value);
      this.setData({ "form.autoTotal": this.posterState.autoTotal });
      this._updateAutoTotal();
    },

    onRoundParInput(event) {
      const value = Number.parseInt(event.detail.value, 10);
      this.posterState.roundPar = Number.isFinite(value) ? clamp(value, 1, 180) : null;
      this.setData({ "form.roundPar": event.detail.value });
      this._updateAutoTotal();
    },

    onTotalInput(event) {
      if (this.posterState.autoTotal) return;
      this.posterState.total.value = event.detail.value;
      this.setData({ "form.totalValue": event.detail.value });
      this._render();
    },

    onTotalFontChange(event) {
      const index = Number(event.detail.value);
      this.posterState.fonts.total = FONT_OPTIONS[index].id;
      this.setData({ totalFontIndex: index });
      this._render();
    },

    onTotalOpacity(event) {
      this.posterState.total.opacity = Number(event.detail.value);
      this.setData({ "form.totalOpacity": Number(event.detail.value) });
      this._render();
    },

    onTotalSize(event) {
      this.posterState.total.size = Number(event.detail.value);
      this.setData({ "form.totalSize": Number(event.detail.value) });
      this._render();
    },

    onTotalAboveChange(event) {
      this.posterState.total.aboveSubject = Boolean(event.detail.value);
      this.setData({ "form.totalAbove": this.posterState.total.aboveSubject });
      this._render();
    },

    selectIdentity(event) {
      const key = event.currentTarget.dataset.key;
      this.setData({ activeIdentity: key }, () => this._syncIdentityForm());
      this._render();
    },

    onIdentityInput(event) {
      const key = event.currentTarget.dataset.key;
      this.posterState.identity[key].value = event.detail.value;
      this.setData({ [`form.${key}`]: event.detail.value });
      if (key === "brand") this.posterState.identity.brand = event.detail.value;
      this._render();
    },

    onDateChange(event) {
      this.posterState.identity.date.value = event.detail.value;
      this.setData({ "form.date": event.detail.value });
      this._render();
    },

    onBrandInput(event) {
      this.posterState.identity.brand = event.detail.value;
      this.setData({ "form.brand": event.detail.value });
      this._render();
    },

    onTextFontChange(event) {
      const index = Number(event.detail.value);
      this.posterState.identity[this.data.activeIdentity].font = FONT_OPTIONS[index].id;
      this.setData({ textFontIndex: index });
      this._render();
    },

    selectTextColor(event) {
      const value = event.currentTarget.dataset.value;
      this.posterState.identity[this.data.activeIdentity].color = value;
      this.posterState.paletteId = "custom";
      this._rebuildColorControls();
      this._rebuildPaletteOptions();
      this._render();
    },

    onIdentitySize(event) {
      const value = Number(event.detail.value);
      this.posterState.identity[this.data.activeIdentity].size = value;
      this.setData({ "form.identitySize": value });
      this._render();
    },

    chooseStickers() {
      const remaining = MAX_STICKERS - this.posterState.stickers.length;
      if (remaining <= 0) return;
      wx.chooseMedia({
        count: remaining,
        mediaType: ["image"],
        sourceType: ["album", "camera"],
        sizeType: ["original", "compressed"],
        success: async (result) => {
          for (let index = 0; index < result.tempFiles.length; index += 1) {
            const filePath = result.tempFiles[index].tempFilePath;
            const image = await this._loadCanvasImage(filePath);
            const scale = Math.min(220 / image.width, 220 / image.height, 1);
            const sticker = {
              id: `${Date.now()}-${index}`,
              path: filePath,
              image,
              baseWidth: image.width * scale,
              baseHeight: image.height * scale,
              x: 500 + (this.posterState.stickers.length % 3 - 1) * 90,
              y: 630 + this.posterState.stickers.length % 2 * 90,
              scale: 1
            };
            this.posterState.stickers.push(sticker);
            this.posterState.selectedStickerId = sticker.id;
          }
          this._syncStickerControls();
          this._render();
        }
      });
    },

    selectSticker(event) {
      this.posterState.selectedStickerId = event.currentTarget.dataset.id;
      this._syncStickerControls();
      this._render();
    },

    onStickerScale(event) {
      const sticker = this._selectedSticker();
      if (!sticker) return;
      sticker.scale = Number(event.detail.value) / 100;
      this.setData({ "form.stickerScale": Number(event.detail.value) });
      this._render();
    },

    removeSticker() {
      const selectedId = this.posterState.selectedStickerId;
      if (!selectedId) return;
      this.posterState.stickers = this.posterState.stickers.filter((item) => item.id !== selectedId);
      const last = this.posterState.stickers[this.posterState.stickers.length - 1];
      this.posterState.selectedStickerId = last ? last.id : "";
      this._syncStickerControls();
      this._render();
    },

    onCanvasTouchStart(event) {
      if (!this.canvasRect || !event.touches.length) return;
      const points = this._posterTouchPoints(event.touches);
      let target = this._gestureTarget();
      if (this.data.largeEdit && points.length === 1) {
        const selected = hitTest(this.sceneBounds, points[0]);
        if (selected) {
          target = selected;
          this.setData({ activeEditTarget: selected }, () => this._syncLargeEdit());
        }
      }
      if (!target) return;
      this.gesture = {
        target,
        center: center(points),
        distance: distance(points)
      };
    },

    onCanvasTouchMove(event) {
      if (!this.gesture || !event.touches.length) return;
      const points = this._posterTouchPoints(event.touches);
      const nextCenter = center(points);
      const nextDistance = distance(points);
      this._moveTarget(
        this.gesture.target,
        nextCenter.x - this.gesture.center.x,
        nextCenter.y - this.gesture.center.y
      );
      if (points.length >= 2 && this.gesture.distance > 0) {
        this._scaleTarget(this.gesture.target, nextDistance / this.gesture.distance);
      }
      this.gesture.center = nextCenter;
      this.gesture.distance = nextDistance;
      this._render();
    },

    onCanvasTouchEnd() {
      this.gesture = null;
      this._syncAllControls();
    },

    selectLargeEditTarget(event) {
      const target = event.currentTarget.dataset.target;
      this.setData({ activeEditTarget: target }, () => {
        this._syncLargeEdit();
        this._render();
      });
    },

    onActiveElementScale(event) {
      const percent = Number(event.detail.value);
      this._setTargetScalePercent(this.data.activeEditTarget, percent);
      this.setData({ activeElementScale: percent });
      this._render();
    },

    async exportPoster() {
      if (!this.posterCanvas) return;
      wx.showLoading({ title: this.data.copy.saving, mask: true });
      try {
        this._renderNow(true);
        const tempFilePath = await new Promise((resolve, reject) => {
          wx.canvasToTempFilePath({
            canvas: this.posterCanvas,
            x: 0,
            y: 0,
            width: POSTER_WIDTH,
            height: POSTER_HEIGHT,
            destWidth: POSTER_WIDTH,
            destHeight: POSTER_HEIGHT,
            fileType: "png",
            quality: 1,
            success: (result) => resolve(result.tempFilePath),
            fail: reject
          });
        });
        this.triggerEvent("export", { tempFilePath });
        if (this.properties.saveToAlbum) {
          await new Promise((resolve, reject) => {
            wx.saveImageToPhotosAlbum({
              filePath: tempFilePath,
              success: resolve,
              fail: reject
            });
          });
          wx.showToast({ title: this.data.copy.saved, icon: "success" });
        }
      } catch (error) {
        wx.showModal({
          title: this.data.copy.saveFailed,
          content: this.data.language === "en"
            ? "Open Settings and allow access to Photos."
            : "请在设置中允许保存图片到相册。",
          confirmText: this.data.language === "en" ? "SETTINGS" : "去设置",
          success: (result) => {
            if (result.confirm) wx.openSetting();
          }
        });
      } finally {
        wx.hideLoading();
        this._render();
      }
    },

    _selectedSticker() {
      return this.posterState.stickers.find((item) => item.id === this.posterState.selectedStickerId) || null;
    },

    _gestureTarget() {
      if (this.data.largeEdit) return this.data.activeEditTarget;
      if (this.data.step === 1) return "photo";
      if (this.data.step === 2) return "scorecard";
      if (this.data.step === 3) return "total";
      if (this.data.step === 4) return this.data.activeIdentity;
      if (this.data.step === 5 && this.posterState.selectedStickerId) {
        return `sticker:${this.posterState.selectedStickerId}`;
      }
      return "";
    },

    _moveTarget(target, dx, dy) {
      if (target === "photo") {
        this.posterState.image.x += dx;
        this.posterState.image.y += dy;
      } else if (target === "scorecard") {
        this.posterState.scorecard.x += dx;
        this.posterState.scorecard.y += dy;
      } else if (target === "total") {
        this.posterState.total.x += dx;
        this.posterState.total.y += dy;
      } else if (["nickname", "course", "date", "extra"].indexOf(target) >= 0) {
        this.posterState.identity[target].x += dx;
        this.posterState.identity[target].y += dy;
      } else if (target.indexOf("sticker:") === 0) {
        const sticker = this.posterState.stickers.find((item) => `sticker:${item.id}` === target);
        if (sticker) {
          sticker.x += dx;
          sticker.y += dy;
        }
      }
    },

    _scaleTarget(target, factor) {
      if (!Number.isFinite(factor) || factor <= 0) return;
      if (target === "photo") {
        this.posterState.image.scale = clamp(this.posterState.image.scale * factor, 0.8, 2.6);
      } else if (target === "scorecard") {
        this.posterState.scorecard.scale = clamp(this.posterState.scorecard.scale * factor, 0.55, 1.8);
      } else if (target === "total") {
        this.posterState.total.size = clamp(this.posterState.total.size * factor, 100, 1600);
      } else if (["nickname", "course", "date", "extra"].indexOf(target) >= 0) {
        const item = this.posterState.identity[target];
        item.size = clamp(item.size * factor, 12, 100);
      } else if (target.indexOf("sticker:") === 0) {
        const sticker = this.posterState.stickers.find((item) => `sticker:${item.id}` === target);
        if (sticker) sticker.scale = clamp(sticker.scale * factor, 0.1, 2.6);
      }
    },

    _setTargetScalePercent(target, percent) {
      const template = TEMPLATES[this.posterState.templateId];
      if (target === "photo") {
        this.posterState.image.scale = clamp(percent / 100, 0.8, 2.6);
      } else if (target === "scorecard") {
        this.posterState.scorecard.scale = clamp(percent / 100, 0.55, 1.8);
      } else if (target === "total") {
        this.posterState.total.size = clamp(template.defaults.totalSize * percent / 100, 100, 1600);
      } else if (["nickname", "course", "date", "extra"].indexOf(target) >= 0) {
        const defaultKey = target === "nickname" ? "nicknameSize" : target === "course" ? "courseSize" : "dateSize";
        this.posterState.identity[target].size = clamp(template.defaults[defaultKey] * percent / 100, 12, 100);
      } else if (target.indexOf("sticker:") === 0) {
        const sticker = this.posterState.stickers.find((item) => `sticker:${item.id}` === target);
        if (sticker) sticker.scale = clamp(percent / 100, 0.1, 2.6);
      }
    },

    _targetScalePercent(target) {
      const template = TEMPLATES[this.posterState.templateId];
      if (target === "photo") return Math.round(this.posterState.image.scale * 100);
      if (target === "scorecard") return Math.round(this.posterState.scorecard.scale * 100);
      if (target === "total") return Math.round(this.posterState.total.size / template.defaults.totalSize * 100);
      if (["nickname", "course", "date", "extra"].indexOf(target) >= 0) {
        const defaultKey = target === "nickname" ? "nicknameSize" : target === "course" ? "courseSize" : "dateSize";
        return Math.round(this.posterState.identity[target].size / template.defaults[defaultKey] * 100);
      }
      if (target.indexOf("sticker:") === 0) {
        const sticker = this.posterState.stickers.find((item) => `sticker:${item.id}` === target);
        return sticker ? Math.round(sticker.scale * 100) : 100;
      }
      return 100;
    },

    _targetLabel(target) {
      const copy = this.data.copy;
      const labels = {
        photo: copy.stepTitles[1],
        scorecard: copy.stepTitles[2],
        total: copy.stepTitles[3],
        nickname: copy.nickname,
        course: copy.course,
        date: copy.date,
        extra: copy.extra
      };
      if (target.indexOf("sticker:") === 0) return copy.stepTitles[5];
      return labels[target] || copy.noSelection;
    },

    _syncLargeEdit() {
      const target = this.data.activeEditTarget;
      this.setData({
        activeEditLabel: this._targetLabel(target),
        activeElementScale: this._targetScalePercent(target),
        activeElementScaleDisabled: !target
      });
    },

    _posterTouchPoints(touches) {
      return Array.from(touches).map((touch) => ({
        x: (touch.clientX - this.canvasRect.left) * POSTER_WIDTH / this.canvasRect.width,
        y: (touch.clientY - this.canvasRect.top) * POSTER_HEIGHT / this.canvasRect.height
      }));
    },

    _initPosterCanvas() {
      if (this.posterCanvas && this.posterContext) return Promise.resolve();
      return this._queryCanvas("#posterCanvas").then((result) => {
        this.posterCanvas = result.node;
        this.posterCanvas.width = POSTER_WIDTH;
        this.posterCanvas.height = POSTER_HEIGHT;
        this.posterContext = this.posterCanvas.getContext("2d");
      });
    },

    _initTemplateCanvas(templateId) {
      this._queryCanvas("#templatePreviewCanvas").then((result) => {
        this.templateCanvas = result.node;
        this.templateCanvas.width = POSTER_WIDTH;
        this.templateCanvas.height = POSTER_HEIGHT;
        this.templateContext = this.templateCanvas.getContext("2d");
        const sample = createPosterModel(templateId, true, this.properties.brand);
        renderPoster(this.templateContext, sample, { showGuide: false });
      });
    },

    _queryCanvas(selector) {
      return new Promise((resolve, reject) => {
        this.createSelectorQuery()
          .select(selector)
          .fields({ node: true, size: true })
          .exec((result) => {
            if (!result[0] || !result[0].node) {
              reject(new Error(`Canvas not found: ${selector}`));
              return;
            }
            resolve(result[0]);
          });
      });
    },

    _refreshCanvasRect() {
      if (!this.posterCanvas) return;
      this.createSelectorQuery()
        .select("#posterCanvas")
        .boundingClientRect((rect) => {
          this.canvasRect = rect;
        })
        .exec();
    },

    _loadCanvasImage(filePath) {
      return new Promise((resolve, reject) => {
        if (!this.posterCanvas) {
          reject(new Error("Poster canvas is not initialized"));
          return;
        }
        const image = this.posterCanvas.createImage();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = filePath;
      });
    },

    _guideTarget() {
      if (this.data.largeEdit) return this.data.activeEditTarget;
      return this._gestureTarget();
    },

    _render() {
      if (!this.posterContext || this.renderPending) return;
      this.renderPending = true;
      const draw = () => {
        this.renderPending = false;
        this._renderNow();
      };
      if (this.posterCanvas && typeof this.posterCanvas.requestAnimationFrame === "function") {
        this.posterCanvas.requestAnimationFrame(draw);
      } else {
        setTimeout(draw, 16);
      }
    },

    _renderNow(exporting) {
      if (!this.posterContext) return;
      this.sceneBounds = renderPoster(this.posterContext, this.posterState, {
        showGuide: !exporting && (this.data.largeEdit || this.data.step > 0 && this.data.step < 6),
        guideTarget: this._guideTarget()
      });
    },

    _updateAutoTotal() {
      if (this.posterState.autoTotal) {
        const result = calculateTotal(this.posterState);
        this.posterState.total.value = result.total === null ? "" : String(result.total);
        const hint = result.total === null
          ? this.data.copy.totalEmpty
          : this.posterState.scoreMode === "relative"
            ? `${result.count} · ${result.relative > 0 ? "+" : ""}${result.relative} · ${result.total}`
            : `${result.count} · ${result.total}`;
        this.setData({
          "form.totalValue": this.posterState.total.value,
          "form.totalHint": hint
        });
      }
      this._render();
    },

    _rebuildPaletteOptions(languageArg) {
      const language = languageArg || this.data.language;
      const template = TEMPLATES[this.posterState.templateId];
      const options = template.paletteIds.map((id) => {
        const palette = PALETTES[id];
        return {
          id,
          name: language === "en" ? palette.en : palette.zh,
          total: palette.total,
          card: palette.card,
          line: palette.line,
          active: this.posterState.paletteId === id
        };
      });
      this.setData({ paletteOptions: options });
    },

    _colorOptions(styleKey, whiteLocked, language) {
      const current = this.posterState.style[styleKey].toLowerCase();
      const source = COLOR_OPTIONS.some((item) => item.value === current) || whiteLocked
        ? COLOR_OPTIONS
        : [{ value: current, zh: "当前配色", en: "Current palette" }].concat(COLOR_OPTIONS);
      return source.map((item) => {
        const lockedWhite = whiteLocked && item.value === "#ffffff";
        return {
          value: item.value,
          name: language === "en" ? item.en : item.zh,
          active: whiteLocked ? lockedWhite : item.value === current,
          locked: lockedWhite,
          disabled: whiteLocked
        };
      });
    },

    _rebuildColorControls(languageArg) {
      const language = languageArg || this.data.language;
      const whiteLocked = !isLightNeutralBoard(this.posterState.style.card);
      const copy = COPY[language];
      const rowDefinitions = [
        ["scoreText", copy.numbers],
        ["underMarker", copy.birdie],
        ["eagleMarker", copy.eagle],
        ["overMarker", copy.bogey],
        ["doubleBogeyMarker", copy.doubleBogey]
      ];
      const scoreColorRows = rowDefinitions.map(([key, label]) => ({
        key,
        label,
        options: this._colorOptions(key, whiteLocked, language)
      }));
      const activeTextColor = this.posterState.identity[this.data.activeIdentity].color.toLowerCase();
      const textSource = COLOR_OPTIONS.some((item) => item.value === activeTextColor)
        ? COLOR_OPTIONS
        : [{ value: activeTextColor, zh: "当前配色", en: "Current palette" }].concat(COLOR_OPTIONS);
      this.setData({
        cardColorOptions: this._colorOptions("card", false, language),
        lineColorOptions: this._colorOptions("line", false, language),
        scoreColorRows,
        totalColorOptions: this._colorOptions("total", false, language),
        textColorOptions: textSource.map((item) => ({
          value: item.value,
          name: language === "en" ? item.en : item.zh,
          active: item.value === activeTextColor
        }))
      });
    },

    _syncStickerControls() {
      const selected = this._selectedSticker();
      this.setData({
        stickers: this.posterState.stickers.map((item) => ({
          id: item.id,
          path: item.path,
          selected: item.id === this.posterState.selectedStickerId
        })),
        stickerCount: `${this.posterState.stickers.length} / ${MAX_STICKERS}`,
        "form.stickerScale": selected ? Math.round(selected.scale * 100) : 100
      });
      this._syncLargeEdit();
    },

    _syncIdentityForm() {
      const item = this.posterState.identity[this.data.activeIdentity];
      this.setData({
        "form.identitySize": Math.round(item.size),
        textFontIndex: fontIndex(item.font)
      });
      this._rebuildColorControls();
    },

    _syncAllControls() {
      const model = this.posterState;
      const calculation = calculateTotal(model);
      if (model.autoTotal) model.total.value = calculation.total === null ? "" : String(calculation.total);
      const hint = calculation.total === null
        ? this.data.copy.totalEmpty
        : model.scoreMode === "relative"
          ? `${calculation.count} · ${calculation.relative > 0 ? "+" : ""}${calculation.relative} · ${calculation.total}`
          : `${calculation.count} · ${calculation.total}`;
      this.setData({
        photoStatus: this._photoStatusText(model.segmentationStatus),
        scoreFontIndex: fontIndex(model.fonts.score),
        totalFontIndex: fontIndex(model.fonts.total),
        form: {
          photoScale: Math.round(model.image.scale * 100),
          blur: model.image.blur,
          scoreMode: model.scoreMode,
          scoringStyle: model.scoringStyle,
          scoreInput: formatScoreInput(model.scoreSets[model.scoreMode]),
          badge: model.badge,
          scorecardScale: Math.round(model.scorecard.scale * 100),
          autoTotal: model.autoTotal,
          roundPar: model.roundPar,
          totalValue: model.total.value,
          totalHint: hint,
          totalOpacity: Math.round(model.total.opacity),
          totalSize: Math.round(model.total.size),
          totalAbove: model.total.aboveSubject,
          nickname: model.identity.nickname.value,
          course: model.identity.course.value,
          date: model.identity.date.value,
          extra: model.identity.extra.value,
          brand: model.identity.brand,
          identitySize: Math.round(model.identity[this.data.activeIdentity].size),
          stickerScale: this._selectedSticker() ? Math.round(this._selectedSticker().scale * 100) : 100
        },
        textFontIndex: fontIndex(model.identity[this.data.activeIdentity].font)
      });
      this._rebuildPaletteOptions();
      this._rebuildColorControls();
      this._syncStickerControls();
      if (this.data.largeEdit) this._syncLargeEdit();
    }
  }
});
