if (window.downloadScript) {
} else {
  window.downloadScript = true;
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (method, url, ...rest) {
    this._targetType = null;
    if (
      url.startsWith(
        "https://api.azota.vn/ai/api/v1/support-tool/request-export-docx",
      )
    ) {
      this._targetType = "DOCX";
    } else if (
      url.startsWith(
        "https://api.azota.vn/ai/api/v1/support-tool/check-using-resource",
      )
    ) {
      this._targetType = "EXCEL";
    }

    return originalOpen.call(this, method, url, ...rest);
  };

  XMLHttpRequest.prototype.send = function (...args) {
    const originalOnReadyStateChange = this.onreadystatechange;
    this.onreadystatechange = function (...cbArgs) {
      if (this.readyState === 4 && this.status === 200 && this._targetType) {
        try {
          let json = JSON.parse(this.responseText);
          if (json && typeof json !== "undefined") {
            if (this._targetType === "DOCX") {
              json.value = true;
            } else if (this._targetType === "EXCEL") {
              json.currentPoint = 1000;
              json.canUsing = true;
            }
          }

          Object.defineProperty(this, "responseText", {
            value: JSON.stringify(json),
            configurable: true,
          });
          Object.defineProperty(this, "response", {
            value: json,
            configurable: true,
          });
        } catch (error) {
          console.error(error);
        }
      }
      if (originalOnReadyStateChange) {
        return originalOnReadyStateChange.apply(this, cbArgs);
      }
    };

    return originalSend.apply(this, args);
  };
}
