const { BrowserWindow, shell } = require('electron');
const path = require('path');

function loadWhatsApp() {
  const window = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: path.join(__dirname, '../assets/512x512.png'),
    webPreferences: {
      devTools: true,
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  window.setMenuBarVisibility(false);

  window.on('close', (event) => {
    event.preventDefault();
    window.hide();
  });

  window.webContents.on('new-window', (event, url) => {
    shell.openExternal(url);
    event.preventDefault();
  });

  window.loadFile('index.html')

  return window;
}

module.exports = { loadWhatsApp };