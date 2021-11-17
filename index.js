// const { app } = require('electron')
// const { loadWhatsApp } = require('./src/window');
// const { createTrayIconFor } = require('./src/tray');
// const { clearServiceWorkers } = require('./src/session');
const { Client } = require("whatsapp-web.js");


// let window;
// let tray;

// const isFirstInstance = app.requestSingleInstanceLock();

// if (!isFirstInstance) {
//   app.quit();
//   return;
// }

// app.on('second-instance', () => {
//   if (window) {
//     if (window.isMinimized()) { window.restore(); }
//     window.focus();
//   }
// });

// const startApp = () => {
//   window = loadWhatsApp();
//   console.log(app.get)
//   tray = createTrayIconFor(window, app);
//   const client = new Client({
//     puppeteer: window,
// });
// client.on("message", message => {
//   if (message.body === "Si a Bueno") {
//       message.reply('pong');
//   }
// });
// }



// app.on('ready', startApp);
// app.on('before-quit', clearServiceWorkers);
// app.on('window-all-closed', () => app.quit());


const puppeteer = require("puppeteer");

  async function main() {
    const browser = await puppeteer.launch({
      defaultViewport: {
        width: 720,
        height: 1280
      },
      headless: false,
    });
    
  const SESSION_FILE_PATH = "./session.json";
  const fs = require("fs");


  let sessionData;
  if (fs.existsSync(SESSION_FILE_PATH)) {
      sessionData = require(SESSION_FILE_PATH);
  }

  // const page = await browser.newPage();
  const client = new Client({
    session: sessionData,
    puppeteer: {
      browserWSEndpoint: browser.wsEndpoint()
    }
  });
  
  client.on("authenticated", (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });

});


    client.on('message', msg => {
      if (msg.body == 'hola') {
          msg.reply('holo');
      }
  });

    client.initialize();

   
    // await page.goto('https://web.whatsapp.com/');
  }

  main();
  


    

  



