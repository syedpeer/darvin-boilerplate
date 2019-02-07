/* eslint-disable */
const basePath = process.cwd();

const dirModule = './src/templates/modules';
const dirComponents = './src/templates/components';
const dirPages = './src/templates/pages';

const fs = require('fs');
const simpleGit = require('simple-git')(basePath);

const nunjucks = require('nunjucks');
const { parseFile } = require('nunjucks-parser');

const webpackEntryObj = {};

let modules = [],
    components = [],
    pages = [],
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

console.log('create entrypoints..');

// store modules
fs.readdirSync(dirModule).forEach((file) => {
  modules.push(file);
});

// store components
fs.readdirSync(dirComponents).forEach((file) => {
  components.push(file);
});

// store components
fs.readdirSync(dirPages).forEach((file) => {
  pages.push(file);
});

modules.forEach((mod) => {
  const path = `./src/templates/modules/${mod}/main.js`;
  let name = 'modules/' + mod + '/' + mod;
  webpackEntryObj[name] = [];

  async function prepareDependencies() {
    let env = nunjucks.configure(`./src/templates`);
    let {dependencies} = await parseFile(env, `modules/${mod}/${mod}.njk`);
    let obj = {
      dependencies: dependencies
    }
    fs.writeFile(`./src/templates/modules/${mod}/meta/dependencies.json`, JSON.stringify(obj), 'utf8', () => {});
  }

  prepareDependencies();

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
  simpleGit.log({'file': `./src/templates/modules/${mod}/${mod}.njk`}, (err, log) => {
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

  // write git commits from page main template file
  simpleGit.log({'file': `./src/templates/components/${component}/${component}.njk`}, (err, log) => {
    let filteredCommits = filterCommitsInDateRange(startDate, endDate, log.all);
    log.all = filteredCommits;

    fs.writeFile(`./src/templates/components/${component}/meta/activity.json`, JSON.stringify(log), 'utf8', () => {});
  });
});

pages.forEach((page) => {

  // write git commits from page main template file
  simpleGit.log({'file': `./src/templates/pages/${page}/${page}.njk`}, (err, log) => {
    let filteredCommits = filterCommitsInDateRange(startDate, endDate, log.all);
    log.all = filteredCommits;

    fs.writeFile(`./src/templates/pages/${page}/meta/activity.json`, JSON.stringify(log), 'utf8', () => {});
  });
});

// add default main and preview entry
webpackEntryObj['js/main'] = webpackEntryDefault;
webpackEntryObj['js/preview'] = webpackEntryDefaultPreview;

module.exports = webpackEntryObj;
