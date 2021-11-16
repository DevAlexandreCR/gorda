const { app } = require('electron')
const { loadWhatsApp } = require('./src/window');
const { createTrayIconFor } = require('./src/tray');
const { clearServiceWorkers } = require('./src/session');
const { Client } = require("whatsapp-web.js");


let window;
let tray;

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
  const client = new Client({
    puppeteer: window,
});
client.on("message", message => {
  if (message.body === "Si a Bueno") {
      message.reply('pong');
  }
});
}



app.on('ready', startApp);
app.on('before-quit', clearServiceWorkers);
app.on('window-all-closed', () => app.quit());



  


