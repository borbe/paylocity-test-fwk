/* eslint-disable func-names,no-buffer-constructor */
const { After, Before } = require('cucumber');
const { setDefaultTimeout } = require('cucumber');
const LocalStorage = require('node-localstorage').LocalStorage;
const fs = require('fs');

After(async function (scenario) {
  global.localStorage._deleteLocation();
  const world = this;
  if (scenario.result.status === 'failed') {
    const stream = await browser.takeScreenshot();
    const decodedImage = new Buffer(stream.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
    world.attach(decodedImage, 'image/png');
  }
});

Before(async () => {
  const dir = `${__dirname}/../../../node-storage`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  setDefaultTimeout(60000);
  browser.manage().timeouts().setScriptTimeout(60000);
  browser.manage().window().maximize();
});
