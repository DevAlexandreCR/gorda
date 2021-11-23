const fs = require('fs')
// const main = require('../../src/whatsapp/initBrowser')
const { Client } = require('whatsapp-web.js')
const puppeteer = require('puppeteer')


async function main() {
  return await puppeteer.launch({
    defaultViewport: {
      width: 720,
      height: 1280
    },
    headless: false,
  })
}



async  function init() {

  const SESSION_FILE_PATH = './session.json';

  let sessionCfg;
  if (fs.existsSync(SESSION_FILE_PATH)) {
      sessionCfg = require(SESSION_FILE_PATH);
  }

const browser = await main()

const client = new Client({
  session: sessionCfg,
  puppeteer: {
    browserWSEndpoint: browser.wsEndpoint(),
  }
});

client.on('authenticated', (session) => {
  console.log('AUTHENTICATED', session);
  sessionCfg=session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
      if (err) {
          console.error(err);
      }
  });
});

  client.on('message', msg => {
    if (msg.body === 'hola') {
      client.sendMessage(msg.from, 'hola bebe')
    }
  })
 await client.initialize()
}

module.exports = { init }



