const fs = require('fs');
const path = require('path');

async function getFilesFromDir(dir, suffix) {
  const filesToReturn = [];

  async function searchFilesInDirectory(currentPath) {
    const filesArray = fs.readdirSync(currentPath);
    for (const file in filesArray) {
      const currentFile = path.join(currentPath, filesArray[file]);
      if (fs.statSync(currentFile).isFile() && currentFile.indexOf(suffix) !== -1) {
        filesToReturn.push(currentFile.replace(dir, ''));
      } else if (fs.statSync(currentFile).isDirectory()) {
        searchFilesInDirectory(currentFile);
      }
    }
  }

  searchFilesInDirectory(dir);
  return filesToReturn;
}

module.exports = getFilesFromDir;
