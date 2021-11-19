import fs from 'fs'
import main from './initBrowser'
import Client from 'whatsapp-web.js'

const SESSION_FILE_PATH = "./session.json"
const browser = main()

function init() {
    let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH)
}

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
  client.initialize()
}


  module.exports = init