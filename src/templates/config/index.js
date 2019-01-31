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

const getTemplate = (data) => {
 // console.log("** create TEMPLATE! **");
  //console.log(data);

  return new HtmlWebpackPlugin({
    filename: data.targetPathRel,
    template: `src/templates/${data.sourcePathRel}`,
    hash: true,
    cache: true,
    chunks: [data.sourceChunk],
    templateParameters: {
      'sourcePathRel': data.sourcePathRel,
      'sourcePathInc': data.sourcePathInc,
      'sourceFilename': data.sourceFilename,
      'sourceName': data.sourceName,
      'sourceVariant': data.sourceVariant,
      'sourceChunk': data.sourceChunk,
      'sourceVariantLinks': data.sourceVariantLinks,
      'targetPathRel': data.targetPathRel,
      'targetFilename': data.targetFilename,
      'templateType': data.templateType,
      'lastUpdateDate': data.lastUpdatedPrintDate,
      'lastUpdateTime': data.lastUpdatedPrintTime,
      'config': data.config,
      'file': data.file,
    }
  })
}




let htmlTemplates = glob.sync('**/*.preview*.njk', {
  cwd: path.join(basePath, 'src/templates/'),
  root: '/',
  realpath: true
}).map(page => {
    let file = page,
        previewLayout = 'layouts/l00-preview/l00-preview.njk'
        templateType = 'pagetype',
        sourceChunk = 'js/main',
        sourcePathRel = page.split('src/templates/')[1], //  modules/m02-accordion/m02-accordion.preview.2.njk
        sourcePathInc = sourcePathRel.substring(0, sourcePathRel.lastIndexOf("/")), // modules/m02-accordion
        sourceFilename = sourcePathRel.replace(/^.*[\\\/]/, ''), // m02-accordion.preview.2.njk
        targetPathRel = sourcePathRel.replace('.preview', '').replace('njk', 'html'), // modules/m02-accordion/m02-accordion.2.html
        targetFilename = targetPathRel.replace(/^.*[\\\/]/, ''), // m02-accordion.2.html
        sourceName = targetFilename.split('.')[0]; // m02-accordion

    console.log("COUNT");
    console.log(file);

    if(sourcePathRel.includes('modules/')) {
      file = file.substring(0, file.lastIndexOf("/")) + '/' +sourceName + '.njk'; // /mnt/d/Projekte/darvin-boilerplate/src/templates/modules/m02-accordion/m02-accordion.njk
    }

    let lastUpdated = new Date(getFileUpdatedDate(file));
    let lastUpdatedPrintDate = lastUpdated.getDate() +'-' + (lastUpdated.getMonth()+1) + '-' + lastUpdated.getFullYear();
    let lastUpdatedPrintTime = lastUpdated.getHours() + ':' + lastUpdated.getMinutes();

    let sourceVariant = '0';
    let dotSplit = sourceFilename.split('.');
    let config = {};


    if(dotSplit[3]) {
      sourceVariant = sourceFilename.split('.')[2]; // get nummber in [string].preview.[number].[ext]
    }

    // set specific chunk
    if(sourcePathRel.includes('modules/')||sourcePathRel.includes('components/')) {
      sourceChunk = sourcePathRel.replace(/.preview.[0-9]{1,3}.njk+$/, '').replace(/.preview.njk+$/, '');
    }

    if(sourcePathRel.includes('index.preview.njk')) {
      sourceChunk = 'js/preview';
    }

    if(sourcePathRel.includes('modules/')) {
      templateType = 'module';
    }

    if(sourcePathRel.includes('components/')) {
      templateType = 'component';
    }

    if(sourcePathRel.includes('page/')) {
      templateType = 'pagetype';
    }

    try {
      config = require('../' + sourcePathInc + '/config.json');
      console.log(JSON.stringify(config));
    } catch (e) {
      if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
        console.log("Can't load config! -> " + '../' + sourcePathInc + '/config.json');
      else
        throw e;
    }

    return getTemplate(
      {
        'sourcePathRel': sourcePathRel,
        'sourcePathInc': sourcePathInc,
        'sourceFilename': sourceFilename,
        'sourceName': sourceName,
        'sourceVariant': sourceVariant,
        'sourceChunk': sourceChunk,
        'sourceVariantLinks': [],
        'targetPathRel': targetPathRel,
        'targetFilename': targetFilename,
        'templateType': templateType,
        'lastUpdateDate': lastUpdatedPrintDate,
        'lastUpdateTime': lastUpdatedPrintTime,
        'config': config,
        'file': file,
      }
    );
});

console.log("FLAG3");

let createdArr = [];
let previewEditorArr = [];

htmlTemplates.forEach((htmlTemplate) => {
  let actualModule = htmlTemplate.options.templateParameters.sourceName;
  let actualModuleVariant = htmlTemplate.options.templateParameters.sourceVariant;
  let actualModuleFilename = htmlTemplate.options.templateParameters.sourceName;

  if (createdArr.indexOf(actualModule) === -1) {
    // element first register
    if(htmlTemplate.options.templateParameters.templateType == 'module') {
      indexObj.modules.push(htmlTemplate.options.templateParameters);

      let variantArr = [{
        name: htmlTemplate.options.templateParameters.sourceName,
        path: htmlTemplate.options.templateParameters.targetFilename,
        sourceVariant: htmlTemplate.options.templateParameters.sourceVariant,
        active: false
      }];

      htmlTemplates.forEach((htmlTemplateToCheck) => {
        // check if same element in different sourceVariant
        if(htmlTemplateToCheck!==htmlTemplate&&htmlTemplateToCheck.options.templateParameters.sourceName==actualModule&&htmlTemplateToCheck.options.templateParameters.sourceVariant!=actualModuleVariant) {
          // other variant to register
          variantArr.push({
            name: htmlTemplateToCheck.options.templateParameters.sourceName,
            path: htmlTemplateToCheck.options.templateParameters.targetFilename,
            sourceVariant: htmlTemplateToCheck.options.templateParameters.sourceVariant,
            active: true
          });
        }
      });

      let previewEditorTemplate = getTemplate(
        {
          'sourcePathRel': 'layouts/l00-preview/l00-preview.njk',
          'sourcePathInc': 'layouts/l00-preview',
          'sourceFilename': 'l00-preview.njk',
          'sourceName': htmlTemplate.options.templateParameters.sourceName,
          'sourceVariant': 0,
          'sourceChunk': htmlTemplate.options.templateParameters.sourceChunk, // js/main
          'sourceVariantLinks': variantArr,
          'targetPathRel': htmlTemplate.options.templateParameters.sourcePathInc + '/index.html',
          'targetFilename': 'index.html',
          'templateType': htmlTemplate.options.templateParameters.templateType,
          'lastUpdateDate': htmlTemplate.options.templateParameters.lastUpdateDate,
          'lastUpdateTime': htmlTemplate.options.templateParameters.lastUpdateTime,
          'config': htmlTemplate.options.templateParameters.config,
          'file': htmlTemplate.options.templateParameters.file // todo: wrong file, still orgin
        }
      );

      previewEditorArr.push(previewEditorTemplate);

    } else if(htmlTemplate.options.templateParameters.templateType == 'component') {
      indexObj.components.push(htmlTemplate.options.templateParameters);
    } else if(htmlTemplate.options.templateParameters.templateType == 'pagetype') {
      indexObj.pagetypes.push(htmlTemplate.options.templateParameters);
    }

  }
  else {
    // element already registered


  }

  createdArr.push(actualModule);
});


htmlTemplates = htmlTemplates.concat(previewEditorArr);



// sort by variants
/*htmlTemplates.forEach((htmlTemplate) => {
  htmlTemplate.options.templateParameters.sourceVariantLinks.sort(dynamicSort("sourceVariant"));
});*/

module.exports = {
  imageSrc: '../../assets/images/renditions/',
  htmlTemplates: htmlTemplates,
  index: indexObj
};
