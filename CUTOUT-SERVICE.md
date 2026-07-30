# 高清抠图服务接入

网页和微信小程序现在共用同一套高清人物抠图契约。网页未配置服务时会继续使用本地双层 MediaPipe 识别、彩色 alpha 精修和边缘去污染；小程序未配置服务时使用完整照片，海报流程不会中断。

## 网页配置

在 `index.html` 的 `window.GOLF_POSTER_CONFIG` 中填写服务地址：

```html
<script>
  window.GOLF_POSTER_CONFIG = {
    segmentationEndpoint: "https://api.example.com/person-cutout",
    segmentationHeaders: {},
    quality: "hd"
  };
</script>
```

静态网页直接请求跨域 HTTPS 服务，服务端必须允许当前网页来源的 CORS。不要把长期 API 密钥写进可分发的 HTML；正式环境应由业务后端或云函数代转。

## 请求

`POST multipart/form-data`

| 字段 | 值 |
| --- | --- |
| `image` | 原始照片 |
| `output` | `full-frame-transparent-png` |
| `quality` | `hd` |
| `matting` | `alpha` |
| `refineEdges` | `true` |
| `preserveFineDetails` | `hair,club,limbs` |
| `edgeDecontamination` | `true` |

服务应返回与原照片宽高比一致的完整画幅透明 PNG。不要返回裁紧后的人像，否则人物层无法和背景层保持相同缩放与位置。

## 响应

URL：

```json
{
  "hasPerson": true,
  "cutoutUrl": "https://cdn.example.com/result.png"
}
```

Base64：

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

网页也接受直接返回 `image/png`。小程序接口应返回 JSON；相关域名需加入 `uploadFile` 和 `downloadFile` 合法域名。
