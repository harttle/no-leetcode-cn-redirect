navigation.addEventListener('navigate', navigateEvent => {
  const url = new URL(navigateEvent.destination.url);

  if (url.host === 'leetcode.cn') {
    log("stopping", navigateEvent.destination.url);
    navigateEvent.preventDefault();
  }
});

log("loaded")

let bannerRemoved = false
let timer = setTimeout(removeBanner, 1e3)
removeBanner()

function removeBanner() {
  const navbar = document.querySelector("#navbar-container")
  for (const child of navbar.children) {
    if (child.id === "leetcode-navbar") {
      continue
    } else if (child.querySelector("a[href*='//leetcode.cn']")){
      log('removing banner')
      navbar.removeChild(child)
      bannerRemoved = true
    }
  }
  bannerRemoved && clearInterval(timer)
}

function log(...args) {
    console.log("[no-leetcode-cn-redirect]", ...args)
}

