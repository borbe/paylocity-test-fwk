const { Given } = require('cucumber');
const chai = require('chai');
chai.use(require('chai-string'));

const assert = chai.assert;

Given(/^user is taken to the "(.*)" page$/, async (pageURI) => {
  global.pageID = pageURI;
  browser.sleep(2000);
  const currentUrl = await browser.getCurrentUrl();
  const pageObjectUrl = await (pageMap[global.pageID]).URL;
  assert.endsWith(currentUrl, pageObjectUrl);
});
