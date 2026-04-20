chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "show") {
    console.log("收到顯示請求：", msg.text); // 除錯用
    
    let card = document.getElementById('wpus-ui');
    
    // 如果卡片不存在，就生一個出來
    if (!card) {
      card = document.createElement('div');
      card.id = 'wpus-ui';
      Object.assign(card.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '350px',
        maxHeight: '70vh',
        overflowY: 'auto',
        backgroundColor: '#0d1117',
        color: '#c9d1d9',
        border: '2px solid #58a6ff',
        borderRadius: '12px',
        padding: '20px',
        zIndex: '999999', // 絕對最上層
        boxShadow: '0 0 30px rgba(88, 166, 255, 0.3)',
        fontFamily: 'sans-serif'
      });
      document.body.appendChild(card);
    }

    // 填入內容
    card.innerHTML = `
      <div style="font-weight:bold; margin-bottom:12px; border-bottom:1px solid #30363d; padding-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
        <span style="color:#58a6ff;">🚀 WPUS 知識引導</span>
        <button id="wpus-close" style="background:none; border:none; color:#f85149; cursor:pointer; font-size:20px; font-weight:bold;">✕</button>
      </div>
      <div id="wpus-body" style="font-size:15px; line-height:1.6; white-space:pre-wrap;">${msg.text}</div>
    `;

    // 綁定關閉按鈕
    document.getElementById('wpus-close').onclick = () => {
      card.remove();
    };
  }
});