/* eslint-disable */
const glob = require('glob');
const path = require('path');
const { readdirSync, statSync, existsSync } = require('fs')


const HtmlWebpackPlugin = require('html-webpack-plugin');
const basePath = process.cwd();
const isDev = (process.env.NODE_ENV === 'dev');
const getDirs = p => readdirSync(p).filter(f => statSync(path.join(p, f)).isDirectory())

const dir = path.resolve(basePath, 'src/templates');

let previewIndexObj = {
  types: [],
  payload: {}
}
let htmlTemplates = [];

console.log('build template context..');

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

const getTemplateFiles = (type, file) => {
  let templatePath = `src/templates/${type}/${file}/${file}.njk`;
  let tmplPreviews = [];

  if (!existsSync( path.resolve(basePath, `${templatePath}`))) {
      console.log("TEMPLATE NOT EXIST! " + path.resolve(basePath, `${templatePath}`));
      return [];
  }

  // get previews
  tmplPreviews = glob.sync('*.preview*.njk', {
    cwd: path.join(basePath, `src/templates/${type}/${file}/`),
    realpath: false
  }).map(page => {
    return page.replace('.njk', '');
  });

  return {
    template: templatePath,
    previews: tmplPreviews
  }
};

// get all categories
previewIndexObj.types = getDirs(dir);

// exclude config folder from types
previewIndexObj.types = previewIndexObj.types.filter(type => type !== 'config');
previewIndexObj.types = previewIndexObj.types.filter(type => type !== 'layouts');

// create payloads by types
previewIndexObj.types.forEach((type) => {
  previewIndexObj.payload[type] = {};

  readdirSync(path.resolve(basePath, `src/templates/${type}`)).forEach((file) => {
    let templateObj = getTemplateFiles(type, file);
    let tmplPath = templateObj.template.substring(0, templateObj.template.lastIndexOf("/")).replace('src/templates/', '');
    let config = {};

    previewIndexObj.payload[type][file] = {
      name: file,
      type: type,
      chunkName: `${tmplPath}/${file}`,
      template: templateObj.template,
      templateRel: templateObj.template.replace('src/templates/', ''),
      target: `${tmplPath}/${file}.html`,
      path: tmplPath,
      previews: templateObj.previews,
      variants: templateObj.previews.length
    }

    if(type==='pages') {
      previewIndexObj.payload[type][file].previews = [`${file}`];
      previewIndexObj.payload[type][file].variants = 1;
    }

    if(templateObj.previews.length==0) {
      previewIndexObj.payload[type][file].chunkName = 'js/main';
    }

    // load element config file
    try {
      config = require(path.resolve(basePath, `src/templates/${tmplPath}/meta/config.json`));
    } catch (e) {
      if (e instanceof Error && e.code === "MODULE_NOT_FOUND") {
        console.log("- no config for " + path.resolve(basePath, `src/templates/${tmplPath}/meta/config.json`));
      } else {
        throw e;
      }
    }

    previewIndexObj.payload[type][file].config = config;

  });
});

// iterate all elements and render previews
Object.keys(previewIndexObj.payload).forEach(function (key) {
  let items = previewIndexObj.payload[key];

  Object.keys(items).forEach(function (keyItem) {
    let elementObj = items[keyItem];


      elementObj.previews.forEach(function (preview) {
        let targetPath = `${elementObj.path}/${preview}`;

        htmlTemplates.push(new HtmlWebpackPlugin({
          filename: targetPath + '.html',
          template: 'src/templates/' + targetPath + '.njk',
          hash: false,
          cache: false,
          chunks: [elementObj.chunkName],
          templateParameters: elementObj

         /* templateParameters: {
            'path': pathRel,
            'modulePath': pathFullRel,
            'targetPathFullRel': targetPathFullRel,
            'filename': fileName,
            'filenameOutput': targetFileName,
            'name': name,
            'variant': elementObj,
            'chunk': chunkName,
            'links': [],
            'type': type,
            'config': config
          }*/
        }))
      })

  });
});

// add index
htmlTemplates.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'src/templates/index.njk',
  hash: false,
  cache: false,
  chunks: ['js/preview'],
  templateParameters: {
    name: 'index',
    type: 'preview',
    chunkName: 'js/preview',
    template: 'src/templates/index.njk',
    templateRel: 'index.njk',
    target: 'index.html',
    path: '/',
    previews: 'index',
    variants: 1
  }
}))



module.exports = {
  imageSrc: '/assets/images/renditions/',
  htmlTemplates: htmlTemplates, // export html templates for context binding in nunjuck loader
  index: previewIndexObj        // for generating index file
};
