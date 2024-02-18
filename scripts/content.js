navigation.addEventListener('navigate', navigateEvent => {
  const url = new URL(navigateEvent.destination.url);

  if (url.host === 'leetcode.cn') {
    log("stopping", navigateEvent.destination.url);
    navigateEvent.preventDefault();
  }
});

log("loaded")

let state = 'init'
removeBanner()
document.addEventListener('ready', removeBanner)
document.addEventListener('load', removeBanner)
let timer = setInterval(removeBanner, 1e3)

function removeBanner() {
  if (findZhBanner()) {
    state = 'found'
    log('found banner, removing')
    clickCloseButton()
  } else if (state === 'found') {
    log('banner removed, clearing timer')
    clearInterval(timer)
    state = 'removed'
  }
}

function clickCloseButton() {
  const closeButton = document.evaluate('//div[text()="×"]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
  if (closeButton) {
    closeButton.click()
  }
}

function findZhBanner() {
  const leafDivs = document.querySelectorAll('div:not(:has(div))')
  for (const div of leafDivs) {
    const banner = findZhBannerFrom(div)
    if (banner) { return banner }
  }
  return null
}

function findZhBannerFrom(div) {
  let ans = null
  while (div && isZhContent(div)) {
    ans = div
    div = div.parentNode
  }
  return ans
}

function isZhContent(div) {
  const stat = charStat(div.innerText)
  return stat.zhWidthPercentage > 0.85 && stat.width > 50 && stat.width < 200
}

function hasZhLink() {
  return !!child.querySelector("a[href*='//leetcode.cn']")
}

function log(...args) {
    console.log("[no-leetcode-cn-redirect]", ...args)
}

function charStat(str) {
  let zh = 0, en = 0
  for (let i = 0; i < str.length; i++) {
    if (/[\u3400-\u9FBF]/.test(str[i])) {
      zh++
    } else if (/\w/.test(str[i])) {
      en++
    }
  }
  const zhWidth = zh * 2
  const enWidth = en
  const width = zhWidth + enWidth
  const zhWidthPercentage = width === 0 ? 0 : zhWidth / width
  return {
    zhWidth,
    enWidth,
    zhWidthPercentage,
    width
  }
}
