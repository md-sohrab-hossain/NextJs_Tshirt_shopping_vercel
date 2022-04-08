const changeCase = require('change-case');
const path = require('path');

module.exports = {
  templates: `${__dirname}/_templates`,
  helpers: {
    toPascalCase(text) {
      return changeCase.pascalCase(text);
    },
    toLowercase(text) {
      return text.toLowerCase();
    },
    toUppercase(text) {
      console.log(typeof text);
      return text.toUpperCase();
    },
    toPageFunctionName(name) {
      return name.replace(/-/g, '');
    },
    createBaseClassName(component, name) {
      const atomicPrefix = `${component.slice(0, 1)}-`;
      return `${atomicPrefix}${name}`;
    },
    normalizePath(url) {
      return path.normalize(url);
    },
  },
};
