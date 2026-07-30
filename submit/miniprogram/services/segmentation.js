function parseResponse(data) {
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch (error) {
      throw new Error("抠图服务返回的不是有效 JSON");
    }
  }
  return data || {};
}

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url,
      success(result) {
        if (result.statusCode >= 200 && result.statusCode < 300) {
          resolve(result.tempFilePath);
        } else {
          reject(new Error(`抠图文件下载失败：HTTP ${result.statusCode}`));
        }
      },
      fail: reject
    });
  });
}

function writeBase64File(base64) {
  return new Promise((resolve, reject) => {
    const filePath = `${wx.env.USER_DATA_PATH}/golf-subject-${Date.now()}.png`;
    wx.getFileSystemManager().writeFile({
      filePath,
      data: base64.replace(/^data:image\/\w+;base64,/, ""),
      encoding: "base64",
      success() {
        resolve(filePath);
      },
      fail: reject
    });
  });
}

async function resolveCutout(payload) {
  const cutoutUrl = payload.cutoutUrl
    || payload.subjectUrl
    || payload.data && (payload.data.cutoutUrl || payload.data.subjectUrl);
  const cutoutBase64 = payload.cutoutBase64
    || payload.data && payload.data.cutoutBase64;
  if (cutoutBase64) return writeBase64File(cutoutBase64);
  if (cutoutUrl) return downloadFile(cutoutUrl);
  throw new Error("抠图服务未返回 cutoutUrl 或 cutoutBase64");
}

function requestSubjectCutout(options) {
  const settings = options || {};
  if (!settings.endpoint) {
    return Promise.resolve({
      status: "fallback",
      reason: "segmentation-endpoint-empty"
    });
  }

  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: settings.endpoint,
      filePath: settings.filePath,
      name: "image",
      header: settings.headers || {},
      formData: {
        output: "full-frame-transparent-png",
        refineEdges: "true"
      },
      success: async (result) => {
        try {
          if (result.statusCode < 200 || result.statusCode >= 300) {
            throw new Error(`抠图服务请求失败：HTTP ${result.statusCode}`);
          }
          const payload = parseResponse(result.data);
          const hasPerson = payload.hasPerson !== false
            && (!payload.data || payload.data.hasPerson !== false);
          if (!hasPerson) {
            resolve({ status: "fallback", reason: "no-person" });
            return;
          }
          const filePath = await resolveCutout(payload);
          resolve({ status: "person", filePath });
        } catch (error) {
          reject(error);
        }
      },
      fail: reject
    });
  });
}

module.exports = {
  requestSubjectCutout
};
