chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status !== "complete") {
    return;
  }
  if (
    tab.url.includes("https://azota.vn/vi/admin/testbank/exam-results-list")
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["assets/download.js"],
      world: "MAIN",
    });
  } else if (
    tab.url.includes("https://azota.vn/vi/de-thi") ||
    tab.url.includes("https://azota.vn/vi/test")
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["assets/unlimited.js"],
      world: "MAIN",
    });
  }
});
