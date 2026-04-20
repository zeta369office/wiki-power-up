document.getElementById('save').addEventListener('click', () => {
    const k = document.getElementById('key').value.trim();
    chrome.storage.local.set({ grok_key: k }, () => {
        const s = document.getElementById('status');
        s.style.display = 'block';
        setTimeout(() => { s.style.display = 'none'; }, 2000);
    });
});
chrome.storage.local.get('grok_key', (data) => {
    if (data.grok_key) document.getElementById('key').value = data.grok_key;
});