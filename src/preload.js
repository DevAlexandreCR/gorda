const { init } = require('./whatsapp/whatsappClient')
async function unregisterServiceWorkers() {
  const registrations = await window.navigator.serviceWorker.getRegistrations()
  for (const registration of registrations) {
    registration.unregister();
  }
}

function isLoadFailed() {
  const titleEl = document.querySelector('.landing-title');
  return titleEl && titleEl.innerHTML.includes('Google Chrome');
}

window.onload = async () => {
  if (isLoadFailed()) {
    await unregisterServiceWorkers();
    window.location.reload();
  }
}
window.addEventListener('DOMContentLoaded', async () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }

  await init()
})