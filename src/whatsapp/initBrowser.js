import puppeteer  from 'puppeteer'


  async function main() {
    const browser = await puppeteer.launch({
      defaultViewport: {
        width: 720,
        height: 1280
      },
      headless: false,
    })
    return browser
  }

  module.exports = main