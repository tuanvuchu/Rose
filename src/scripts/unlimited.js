if (window.unlimitedScript) {
} else {
  window.unlimitedScript = true;
  const targetUrl =
    "https://api.azota.vn/ai/api/v1/student-practice/can-attempt-exam";
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (method, url, ...rest) {
    this._isTargetApi = url.startsWith(targetUrl);
    return originalOpen.call(this, method, url, ...rest);
  };

  XMLHttpRequest.prototype.send = function (...args) {
    const originalOnReadyStateChange = this.onreadystatechange;
    this.onreadystatechange = function (...cbArgs) {
      if (this._isTargetApi && this.readyState === 4 && this.status === 200) {
        try {
          const json = JSON.parse(this.responseText);
          if (json && typeof json.value !== "undefined") {
            json.value = true;
            Object.defineProperty(this, "responseText", {
              value: JSON.stringify(json),
            });
            Object.defineProperty(this, "response", { value: json });
          }
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
