const fs = require('fs')
const main = require('../../src/whatsapp/initBrowser')
const { Client } = require('whatsapp-web.js')

async  function init() {
  const SESSION_FILE_PATH = "./session.json";
  let sessionData;
  if (fs.existsSync(SESSION_FILE_PATH)) {
      sessionData = require(SESSION_FILE_PATH);
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

module.exports = { init }



