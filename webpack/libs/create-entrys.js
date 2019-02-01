const dirModule = './src/templates/modules';
const dirComponents = './src/templates/components';

const fs = require('fs');

let modules = [];
let components = [];

const webpackEntryObj = {};

let webpackEntryDefault = ['./src/js/base.js'];
let webpackEntryDefaultPreview = ['./src/js/base.js', './src/js/preview.js'];

// store modules
fs.readdirSync(dirModule).forEach((file) => {
  modules.push(file);
});

// store components
fs.readdirSync(dirComponents).forEach((file) => {
  components.push(file);
});

modules.forEach((mod) => {
  const path = './src/templates/modules/' + mod + '/main.js';
  let name = 'modules/' + mod + '/' + mod;
  webpackEntryObj[name] = [];

  // check if js entry file exist
  try {
    if (fs.existsSync(path)) {

      // add to default preview entrys
      let entry = webpackEntryDefaultPreview.slice(0);
      entry.push(path);

      webpackEntryDefault.push(path);
      webpackEntryObj[name] = entry;

    } else {
      webpackEntryObj[name] = webpackEntryDefaultPreview;
    }
  } catch(err) {
    console.error("darvin# can't read fs: module");
  }
});

components.forEach((component) => {
  const path = './src/templates/components/' + component + '/main.js';
  let name = 'components/' + component + '/' + component;
  webpackEntryObj[name] = [];

  // check if js entry file exist
  try {
    if (fs.existsSync(path)) {

      // add to default preview entrys
      let entry = webpackEntryDefaultPreview.slice(0);
      entry.push(path);

      webpackEntryDefault.push(path);
      webpackEntryObj[name] = entry;

    } else {
      webpackEntryObj[name] = webpackEntryDefaultPreview;
    }
  } catch(err) {
    console.error("darvin# can't read fs: components");
  }
});

// add default main and preview entry
webpackEntryObj['js/main'] = webpackEntryDefault;
webpackEntryObj['js/preview'] = webpackEntryDefaultPreview;

module.exports = webpackEntryObj;
