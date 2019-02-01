const dirModule = './src/templates/modules';
const dirComponents = './src/templates/components';

const fs = require('fs');

let modules = [];
let components = [];

const mainObj = {};

let allElements = ['./src/js/base.js'];
let previewDefault = ['./src/js/base.js', './src/js/preview.js'];

// store modules
fs.readdirSync(dirModule).forEach((file) => {
  modules.push(file);
});

// store modules
fs.readdirSync(dirComponents).forEach((file) => {
  components.push(file);
});

modules.forEach((mod) => {
  const path = './src/templates/modules/' + mod + '/main.js';
  let name = 'modules/' + mod + '/' + mod;
  mainObj[name] = [];

  try {
    if (fs.existsSync(path)) {
      // add to default preview entrys
      let entry = previewDefault.slice(0);
      entry.push(path);
      allElements.push(path);

      mainObj[name] = entry;

    } else {
      mainObj[name] = previewDefault;
    }
  } catch(err) {
    console.error("darvin# can't read fs: module");
  }
});

components.forEach((component) => {
  const path = './src/templates/components/' + component + '/main.js';
  let name = 'components/' + component + '/' + component;
  mainObj[name] = [];

  try {
    if (fs.existsSync(path)) {
      // add to default preview entrys
      let entry = previewDefault.slice(0);
      entry.push(path);
      allElements.push(path);

      mainObj[name].entry = entry;

    } else {
      mainObj[name] = previewDefault;
    }
  } catch(err) {
    console.error("darvin# can't read fs: components");
  }
});

mainObj['js/main'] = allElements;
mainObj['js/preview'] = previewDefault;

module.exports = mainObj;
