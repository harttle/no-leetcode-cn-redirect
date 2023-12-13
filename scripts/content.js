navigation.addEventListener('navigate', navigateEvent => {
  const url = new URL(navigateEvent.destination.url);

  if (url.host === 'leetcode.cn') {
    log("stopping", navigateEvent.destination.url);
    navigateEvent.preventDefault();
  }
});

log("loaded")

function log(...args) {
    console.log("[no-leetcode-cn-redirect]", ...args)
}
