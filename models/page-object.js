function PageObject(name, url) {
  if (name === undefined) throw new TypeError('Name for this page object is not defined');
  if (url === undefined) throw new TypeError('URL for this page object is not defined');
  this.name = name;
  this.URL = url;
}

module.exports = PageObject;
