const readDirectory = require('./directory-reader');

global.pageMap = {};

async function pageObjectFinder() {
  const suffix = '-page.js';
  const pageObjectFiles = await readDirectory(process.env.CUCUMBER_PAGE_OBJECT_DIRECTORY, suffix);

  for (const pageObjectFilePath of pageObjectFiles) {
    const PageObjectClass = require(`../../../page_objects/${pageObjectFilePath}`);
    const pageObjectInstance = new PageObjectClass();
    pageMap[pageObjectInstance.name] = pageObjectInstance;
  }
}

module.exports = pageObjectFinder;
