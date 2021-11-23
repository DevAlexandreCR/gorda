const { app } = require('electron')
const { loadWhatsApp } = require('./src/window');
const { createTrayIconFor } = require('./src/tray');

let window;

const isFirstInstance = app.requestSingleInstanceLock();

if (!isFirstInstance) {
  app.quit();
  return;
}

app.on('second-instance', () => {
  if (window) {
    if (window.isMinimized()) { window.restore(); }
    window.focus();
  }
});

const startApp = () => {
  window = loadWhatsApp();
  tray = createTrayIconFor(window, app);
}
app.whenReady().then(() => {
  startApp()
})
app.on('window-all-closed', () => app.quit());
// app.on('before-quit', clearServiceWorkers);
