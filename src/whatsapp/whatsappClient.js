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

const SESSION_FILE_PATH = "./sessions/session.json"

async  function init() {
    let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH)
}
const browser = await main()

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
          console.error(err)
      }
    })
  })

  client.on('message', msg => {
    if (msg.body === 'hola') {
      client.sendMessage(msg.from, 'hola bebe')
    }
  })
  await client.initialize()
}

document.getElementById("myButton").addEventListener("click", init);
