const { Given } = require('cucumber');

Given(/^user clicks on the "(.*)" button$/, async (buttonText) => {
  const buttonID = buttonText.replace(/ /g, '_').toUpperCase();
  await pageMap[global.pageID][buttonID].click();
});

Given(/^user clicks on the "([^"]*)" element containing "([^"]*)" text$/, async (elementType, elementText) => {
  await element(by.xpath(`//${elementType}[contains(text(),'${elementText}')]`)).click();
});

Given(/^user goes to "(.*)" page$/, async (url) => {
  await browser.get(url);
});

Given(/^user enters "(.*)" into the "(.*)" field$/, async (text, textField) => {
  const fieldID = textField.replace(/ /g, '_').toUpperCase();
  await pageMap[global.pageID][fieldID].clear();
  global.localStorage.setItem(textField.replace(/ /g, '').toUpperCase(), text);
  await pageMap[global.pageID][fieldID].sendKeys(text);
});

Given(/^user waits for element containing text: "([^"]*)" to be present$/, async (elementText) => {
  const elementID = elementText.replace(/ /g, '_').toUpperCase();
  await browser.wait(until.presenceOf(pageMap[global.pageID][elementID]));
});
