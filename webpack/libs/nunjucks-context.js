/* eslint-disable */
const glob = require('glob');
const path = require('path');
const fs = require('fs');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const basePath = process.cwd();
const isDev = (process.env.NODE_ENV === 'dev');

let previewIndexObj = {
  modules: [],
  components: [],
  pagetypes: [],
  assets: []
}

const dynamicSort = (property) => {
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
        pathFullRel = page.split('src/templates/')[1],
        pathFullAbs = page,
        pathRel = pathFullRel.substring(0, pathFullRel.lastIndexOf("/")),
        pathAbs = pathFullAbs.substring(0, pathFullAbs.lastIndexOf("/")),
        fileName = pathFullRel.replace(/^.*[\\\/]/, ''),
        fileNameSplit = fileName.split('.'),
        targetPathFullRel = pathFullRel.replace('.preview', '').replace('njk', 'html'),
        targetFileName = targetPathFullRel.replace(/^.*[\\\/]/, ''),
        name = targetFileName.split('.')[0],
        variant = '0',
        config = {},
        isPreviewIndex = pathFullAbs.includes('src/templates/index.preview.njk');

    // get element type
    if(page.includes('/src/templates/modules/')) {
      type = 'module';
    } else if (page.includes('/src/templates/components/')) {
      type = 'component';
    }

    // get main file information
    if(type=='module'||type=='component') {
      let macroFullpathAbs = page,
          macroPathAbs = macroFullpathAbs.substring(0, macroFullpathAbs.lastIndexOf("/"));
          macroFilename = macroFullpathAbs.replace('.preview', '').replace(/^.*[\\\/]/, '');

      // remove variant in filename
      if(macroFilename.split('.')[2]) {
        let macroFileNameSplit = macroFilename.split('.');
        macroFilename = macroFileNameSplit[0] + '.' + macroFileNameSplit[2];
      }

      // set chunk
      chunkName = pathFullRel.replace(/.preview.[0-9]{1,3}.njk+$/, '').replace(/.preview.njk+$/, '');
    }

    // get variant from filename
    if(fileNameSplit[3]) {
      variant = fileNameSplit[2]; // get nummber in [string].preview.[number].[ext]
    }

    // set main chunk for preview index
    if(isPreviewIndex) {
      chunkName = 'js/preview';
    }

    // load element config file
    try {
      config = require('../../src/templates/' + pathRel + '/meta/config.json');
    } catch (e) {
      if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
        console.log("Darvin: No config for-> " + '../../src/templates/' + pathRel);
      else
        throw e;
    }

    return new HtmlWebpackPlugin({
      filename: targetPathFullRel,
      template: `src/templates/${pathFullRel}`,
      hash: false,
      cache: false,
      chunks: [chunkName],
      templateParameters: {
        'path': pathRel,
        'modulePath': pathFullRel,
        'targetPathFullRel': targetPathFullRel,
        'filename': fileName,
        'filenameOutput': targetFileName,
        'name': name,
        'variant': variant,
        'chunk': chunkName,
        'links': [],
        'type': type,
        'config': config
      }
    })
});

// setup variant links for each module
htmlTemplates.forEach((htmlTemplate) => {
  let actualModule = htmlTemplate.options.templateParameters.name,
      actualModuleVariant = htmlTemplate.options.templateParameters.variant;

  // push self link
  htmlTemplate.options.templateParameters.links.push({
    name: htmlTemplate.options.templateParameters.name,
    path: htmlTemplate.options.templateParameters.filenameOutput,
    variant: htmlTemplate.options.templateParameters.variant,
    active: false
  });

  // push templateParameters to category
  if(htmlTemplate.options.templateParameters.type == 'module') {
    previewIndexObj.modules.push(htmlTemplate.options.templateParameters);
  } else if(htmlTemplate.options.templateParameters.type == 'component') {
    previewIndexObj.components.push(htmlTemplate.options.templateParameters);
  } else if(htmlTemplate.options.templateParameters.type == 'pagetype') {
    previewIndexObj.pagetypes.push(htmlTemplate.options.templateParameters);
  } else if(htmlTemplate.options.templateParameters.type == 'assets') {
    previewIndexObj.assets.push(htmlTemplate.options.templateParameters);
  }

  // loop trough all variants and check if siblings exist
  htmlTemplates.forEach((htmlTemplateToCheck) => {
    // check if same element in different variant
    if(htmlTemplateToCheck!==htmlTemplate&&htmlTemplateToCheck.options.templateParameters.name==actualModule&&htmlTemplateToCheck.options.templateParameters.variant!=actualModuleVariant) {
      // push link to sibling variant
      htmlTemplate.options.templateParameters.links.push({
        name: htmlTemplateToCheck.options.templateParameters.name,
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
  htmlTemplates: htmlTemplates, // export html templates for context binding in nunjuck loader
  index: previewIndexObj        // for generating index file
};
