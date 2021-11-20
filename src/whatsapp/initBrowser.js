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

  module.exports = main