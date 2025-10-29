chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status !== "complete") {
    return;
  }
  if (tab.url.startsWith("https://azota.vn/")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["assets/content.js"],
      world: "MAIN",
    });
  }
});
