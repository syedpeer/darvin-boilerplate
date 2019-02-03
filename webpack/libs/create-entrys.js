/* eslint-disable */
const basePath = process.cwd();

const dirModule = './src/templates/modules';
const dirComponents = './src/templates/components';

const fs = require('fs');
const simpleGit = require('simple-git')(basePath);

const webpackEntryObj = {};

let modules = [],
    components = [],
    webpackEntryDefault = ['./src/js/base.js'],
    webpackEntryDefaultPreview = ['./src/js/base.js', './src/js/preview.js'],
    activityDays = 20,
    endDate = new Date(),
    startDate = new Date(endDate.getTime() - (activityDays * 24 * 60 * 60 * 1000)),

    filterCommitsInDateRange = (startDate, endDate, commitsArr) => {
      let retArr = [];
      let commitsArrDate = commitsArr.map(item => ( new Date(item.date.split(' ')[0]) ));

      // loop all dates
      for (var i = 0; i < commitsArrDate.length; i++) {
          let date = commitsArrDate[i];

          // if date between startDate and endDate range
          if (startDate <= date && date <= endDate) {
            retArr.push(commitsArr[i]);
        }
      }

      return retArr;
    };

// store modules
fs.readdirSync(dirModule).forEach((file) => {
  modules.push(file);
});

// store components
fs.readdirSync(dirComponents).forEach((file) => {
  components.push(file);
});

modules.forEach((mod) => {
  const path = `./src/templates/modules/${mod}/main.js`;
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
  } catch(err) {}

  // write git commits from module dir
  simpleGit.log({'file': `./src/templates/modules/${mod}`}, (err, log) => {
    let filteredCommits = filterCommitsInDateRange(startDate, endDate, log.all);
    log.all = filteredCommits;

    fs.writeFile(`./src/templates/modules/${mod}/meta/activity.json`, JSON.stringify(log), 'utf8', () => {});
  });
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
    console.log(err);
  }
});

// add default main and preview entry
webpackEntryObj['js/main'] = webpackEntryDefault;
webpackEntryObj['js/preview'] = webpackEntryDefaultPreview;

module.exports = webpackEntryObj;
