# GOLFBROTHERS 海报工具 - 微信小程序交付包

`submit/` 是原生微信小程序代码，不使用 `web-view`，也不依赖网页的 HTML、CSS、DOM 或 CDN。可直接作为独立项目导入微信开发者工具，也可将海报编辑器组件复制到甲方已有小程序中。

## 直接导入

1. 打开微信开发者工具，选择“导入项目”。
2. 项目目录选择本仓库的 `submit/`。
3. 将 `project.config.json` 中的 `touristappid` 替换为甲方小程序 AppID。
4. 选择当前稳定基础库；交付配置的最低测试基线为 `3.3.5`。
5. 编译后默认进入 `pages/poster/index` 示例页。

项目不需要执行 `npm install`。

## 集成进已有小程序

复制这些目录和文件：

```text
miniprogram/
  components/golf-poster/
  services/segmentation.js
  utils/poster-data.js
  utils/poster-engine.js
  utils/score.js
  config.js
```

在目标页面 JSON 中注册组件：

```json
{
  "usingComponents": {
    "golf-poster": "/components/golf-poster/index"
  }
}
```

在目标页面 WXML 中使用：

```xml
<golf-poster
  id="golfPoster"
  brand="GOLFBROTHERS"
  initial-language="zh"
  segmentation-endpoint="https://api.example.com/person-cutout"
  save-to-album="{{true}}"
  bindexport="onPosterExport"
/>
```

页面接收导出结果：

```js
Page({
  onPosterExport(event) {
    const { tempFilePath } = event.detail;
    console.info("Poster generated:", tempFilePath);
  }
});
```

## 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `brand` | String | `GOLFBROTHERS` | 海报顶部品牌文字 |
| `initial-language` | String | `zh` | `zh` 或 `en` |
| `segmentation-endpoint` | String | 空 | 可选人物抠图 HTTPS 地址 |
| `segmentation-headers` | Object | `{}` | 抠图请求的认证请求头 |
| `save-to-album` | Boolean | `true` | 导出后是否直接保存到相册 |

## 组件事件

| 事件 | `event.detail` | 说明 |
| --- | --- | --- |
| `export` | `{ tempFilePath }` | 1000 x 1265 PNG 已生成 |
| `segmentationstart` | `{ filePath }` | 开始人物识别 |
| `segmentationend` | `{ status }` | `person` 或 `fallback` |

## 人物抠图接口

微信小程序原生运行环境不能直接加载网页版的 MediaPipe CDN 脚本。本交付包使用可配置 HTTPS 服务，同时在服务未配置、识别失败或照片无人时自动回退为完整照片，海报生成不会中断。

请求：

- 方法：`multipart/form-data`
- 文件字段：`image`
- 附加字段：
  - `output=full-frame-transparent-png`
  - `refineEdges=true`

成功响应可使用 URL：

```json
{
  "hasPerson": true,
  "cutoutUrl": "https://cdn.example.com/cutout.png"
}
```

也可直接返回 Base64：

```json
{
  "hasPerson": true,
  "cutoutBase64": "iVBORw0KGgoAAA..."
}
```

无人像：

```json
{
  "hasPerson": false
}
```

抠图结果必须是与原图相同画幅、背景透明的 PNG，这样人物图层与背景缩放、位移可以保持完全一致。

如甲方使用云函数而非普通 HTTPS 接口，也可以监听 `segmentationstart` 事件自行处理，完成后调用组件公开方法：

```js
const poster = this.selectComponent("#golfPoster");
await poster.applySubjectCutout(cutoutTempFilePath, true);
```

## 域名与权限

- 在微信公众平台把抠图地址加入 `uploadFile` 合法域名。
- 把抠图结果所在域名加入 `downloadFile` 合法域名。
- 正式发布前按甲方主体的隐私保护指引声明“选择图片”和“保存到相册”等用途。
- 保存失败时组件会引导用户打开设置；实际权限文案由甲方小程序主体配置。

## 功能范围

- 6 个可扩展海报模板。
- 7 步固定预览区编辑流程。
- 照片上传、拖动、双指缩放、背景模糊和一键复位。
- 总杆与杆差两种逐洞录入方式。
- 自动统计总杆；总成绩始终按总杆显示。
- PGA TOUR 与 DP World Tour 两种记分标记。
- 彩色成绩板自动锁定白字；白色成绩板启用巡回赛标记色。
- 总成绩、成绩卡、昵称、球场、日期、补充信息独立移动和缩放。
- 最多 5 张贴纸，可移动、缩放和删除。
- 总结页直接跳回任一步骤。
- 大图自由编辑和 1000 x 1265 PNG 导出。
- 中英文界面。

## 字体说明

小程序 Canvas 使用设备系统字体。Arial、Georgia、Times New Roman、Baskerville、Didot、Impact 等选项会在设备缺少对应字体时自动回退。若甲方要求所有手机像素级一致，需要将已获授权的字体文件放到合法 HTTPS 地址，并在小程序启动时通过字体加载接口统一加载。

## 验证

仓库根目录执行：

```powershell
node submit/scripts/validate.js
```

该脚本检查 JSON、JavaScript、模板数据、计分逻辑、Canvas 渲染冒烟测试、WXML 标签和事件绑定。最终交付前仍应在微信开发者工具及至少一台 iOS、一台 Android 真机上预览。

## 后续同步

网页与小程序源码对应关系见 [SOURCE-MAP.md](./SOURCE-MAP.md)。仓库根目录的 `AGENTS.md` 已要求后续改动同时更新 `submit/`、`VERSION.json` 和 `CHANGELOG.md`。
