// const cookieName = 'security_context';

/** 监听点击事件 */
const debug_btn = document.getElementById('debug_btn');

/** 重定向 */
const redirectTo = (url) => {
  window.open(url);
}

/** 获取地址栏 */
const getUrl = () => {
  return new Promise((resolve) => {
    chrome.tabs.getSelected(null, resolve)
  })
}

/** 获取Cookie */
const getCookie = () => {
  return new Promise(async (resolve) => {
    const tab = await getUrl();
    // alert('tab' + JSON.stringify(tab))
    chrome.cookies.getAll({ url: tab.url }, resolve)
  })
}

/** 设置Cookie */
const setCookie = () => {
  return new Promise(async () => {
    const cookies = await getCookie();
    // alert('cookie' + JSON.stringify(cookie))
    const url = document.getElementById('redirect_url').value;
    const url_reg = /^https?:\/\/*\/*/;
    if (url_reg.test(url)) {
      cookies.forEach((cookie) => {
        const { name, value, path, secure, expirationDate, storeId } = cookie;
        chrome.cookies.set({ url, name, value, path, secure, expirationDate, storeId, domain: 'localhost' });
      })
      redirectTo(url);
    } else {
      alert('输入url不正确!')
    }
  })
}

/** 监听点击事件 */
debug_btn.addEventListener('click', async () => {
  setCookie();
})