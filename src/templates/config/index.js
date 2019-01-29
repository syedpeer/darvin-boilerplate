/* eslint-disable */
const glob = require('glob');
const path = require('path');
let fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const basePath = process.cwd();
const isDev = (process.env.NODE_ENV === 'dev');

let indexObj = {
  modules: [],
  components: [],
  pagetypes: [],
  assets: []
}

let dynamicSort = (property) => {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

const getFileUpdatedDate = (path) => {
  const stats = fs.statSync(path)
  return stats.mtime
}


const htmlTemplates = glob.sync('**/*.preview*.njk', {
  cwd: path.join(basePath, 'src/templates/'),
  root: '/',
  realpath: true
}).map(page => {

    let type = 'pagetype',
        chunkName = 'js/main',
        modulePath = page.split('src/templates/')[1],
        fileName = modulePath.replace(/^.*[\\\/]/, ''),
        modulePathOutput = modulePath.replace('.preview', '').replace('njk', 'html'),
        fileNameOutput = modulePathOutput.replace(/^.*[\\\/]/, ''),
        moduleName = fileNameOutput.split('.')[0]; // get string in [string].preview.[number].[ext]

    let file = page;

    if(modulePath.includes('modules/')) {
      file = file.replace('.preview', '');
      if(file.split('.')[2]) {
        let split = file.split('.');
        file = split[0] + '.' + split[2];
      }
    }

    let lastUpdated = new Date(getFileUpdatedDate(file));
    let lastUpdatedPrintDate = lastUpdated.getDate() +'-' + (lastUpdated.getMonth()+1) + '-' + lastUpdated.getFullYear();
    let lastUpdatedPrintTime = lastUpdated.getHours() + ':' + lastUpdated.getMinutes();

    let variant = '0';
    let dotSplit = fileName.split('.');

    if(dotSplit[3]) {
      variant = fileName.split('.')[2]; // get nummber in [string].preview.[number].[ext]
    }

    // set specific chunk
    if(modulePath.includes('modules/')||modulePath.includes('components/')) {
      chunkName = modulePath.replace(/.preview.[0-9]{1,3}.njk+$/, '').replace(/.preview.njk+$/, '');
    }

    if(modulePath.includes('index.preview.njk')) {
      chunkName = 'js/preview';
    }

    if(modulePath.includes('modules/')) {
      type = 'module';
    }

    if(modulePath.includes('components/')) {
      type = 'component';
    }

    if(modulePath.includes('page/')) {
      type = 'pagetype';
    }

    /*try {
      config = require(modulePath + '/config.json');
      console.log(JSON.stringify(config));
    } catch (e) {
      if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
        console.log("Can't load config!");
      else
        throw e;
    }*/

    return new HtmlWebpackPlugin({
      filename: modulePathOutput,
      template: `src/templates/${modulePath}`,
      hash: true,
      cache: true,
      chunks: [chunkName],
      templateParameters: {
        'modulePath': modulePath,
        'modulePathOutput': modulePathOutput,
        'filename': fileName,
        'filenameOutput': fileNameOutput,
        'moduleName': moduleName,
        'variant': variant,
        'chunk': chunkName,
        'links': [],
        'type': type,
        'lastUpdateDate': lastUpdatedPrintDate,
        'lastUpdateTime': lastUpdatedPrintTime
      }
    })
});

htmlTemplates.forEach((htmlTemplate) => {
  let actualModule = htmlTemplate.options.templateParameters.moduleName;
  let actualModuleVariant = htmlTemplate.options.templateParameters.variant;

  htmlTemplate.options.templateParameters.links.push({
    name: htmlTemplate.options.templateParameters.moduleName,
    path: htmlTemplate.options.templateParameters.filenameOutput,
    variant: htmlTemplate.options.templateParameters.variant,
    active: false
  });

  if(htmlTemplate.options.templateParameters.type == 'module') {
    indexObj.modules.push(htmlTemplate.options.templateParameters);
  } else if(htmlTemplate.options.templateParameters.type == 'component') {
    indexObj.components.push(htmlTemplate.options.templateParameters);
  } else if(htmlTemplate.options.templateParameters.type == 'pagetype') {
    indexObj.pagetypes.push(htmlTemplate.options.templateParameters);
  }

  htmlTemplates.forEach((htmlTemplateToCheck) => {
    // check if same element in different variant
    if(htmlTemplateToCheck!==htmlTemplate&&htmlTemplateToCheck.options.templateParameters.moduleName==actualModule&&htmlTemplateToCheck.options.templateParameters.variant!=actualModuleVariant) {
      htmlTemplate.options.templateParameters.links.push({
        name: htmlTemplateToCheck.options.templateParameters.moduleName,
        path: htmlTemplateToCheck.options.templateParameters.filenameOutput,
        variant: htmlTemplateToCheck.options.templateParameters.variant,
        active: true
      });
    }
  });
});

// sort by variants
htmlTemplates.forEach((htmlTemplate) => {
  htmlTemplate.options.templateParameters.links.sort(dynamicSort("variant"));
});

module.exports = {
  imageSrc: '../../assets/images/renditions/',
  htmlTemplates: htmlTemplates,
  index: indexObj
};
