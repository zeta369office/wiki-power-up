chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "wpus_explain",
    title: "WPUS: 秒懂這個術語",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "wpus_explain") {
    chrome.storage.local.get('grok_key', (res) => {
      const userKey = res.grok_key || "";
      chrome.tabs.sendMessage(tab.id, { action: "show", text: "🧠 WPUS 正在啟動 Grok 能量..." });

      fetch("http://127.0.0.1:8000/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term: info.selectionText, api_key: userKey })
      })
      .then(r => r.json())
      .then(data => {
        chrome.tabs.sendMessage(tab.id, { action: "show", text: data.explanation });
      })
      .catch(() => {
        chrome.tabs.sendMessage(tab.id, { action: "show", text: "❌ 後端斷開，請重啟 Thonny。" });
      });
    });
  }
});