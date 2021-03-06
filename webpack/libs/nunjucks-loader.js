/**
* based on: https://github.com/ryanhornberger/nunjucks-html-loader
* bind specific context
* edit by Darvin
*/

const utils = require('loader-utils');
const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

const NunjucksLoader = nunjucks.Loader.extend({
  // Based off of the Nunjucks 'FileSystemLoader'
  init(searchPaths, sourceFoundCallback) {
    this.sourceFoundCallback = sourceFoundCallback;

    if (searchPaths) {
      searchPaths = Array.isArray(searchPaths) ? searchPaths : [searchPaths];
      // For windows, convert to forward slashes
      this.searchPaths = searchPaths.map(path.normalize);
    } else {
      this.searchPaths = ['.'];
    }
  },

  getSource(name) {
    let fullpath = null;
    const paths = this.searchPaths;

    for (let i = 0; i < paths.length; i++) {
      const basePath = path.resolve(paths[i]);
      const p = path.resolve(paths[i], name);

      // Only allow the current directory and anything
      // underneath it to be searched
      if (p.indexOf(basePath) === 0 && fs.existsSync(p)) {
        fullpath = p;
        break;
      }
    }

    if (!fullpath) {
      return null;
    }

    this.sourceFoundCallback(fullpath);

    return {
      src: fs.readFileSync(fullpath, 'utf-8'),
      path: fullpath,
      noCache: true,
    };
  },
});

module.exports = function(content) {
  this.cacheable();

  // const loaderFilename = this.resourcePath.replace(/^.*[\\\/]/, '');
  const loaderPath = this.resourcePath.split('src/templates/')[1];
  const loaderPathRel = loaderPath.substring(0, loaderPath.lastIndexOf("/"));
  const moduleType = loaderPath.split('/')[0];
  const moduleName = loaderPath.replace(/^.*[\\\/]/, '').split('.')[0];

  const callback = this.async();
  const opt = utils.parseQuery(this.query);
  let nunjucksContext = opt.context;
  const nunjucksSearchPaths = opt.searchPaths;

  nunjucksContext.darvin = {};

  // bind specific template param context
  nunjucksContext.htmlTemplates.forEach((htmlTemplates) => {
    if (htmlTemplates.options.templateParameters.path === loaderPathRel) {
      nunjucksContext.darvin = htmlTemplates.options.templateParameters;
    }
  });

  nunjucksContext.darvin.filepath = loaderPath.replace(/^.*[\\\/]/, '').replace('.njk', ''); // remove file extension

  const loader = new NunjucksLoader(nunjucksSearchPaths, ((filePath) => {
    this.addDependency(filePath);
  }));

  const nunjEnv = new nunjucks.Environment(loader);
  nunjucks.configure(null, { watch: false });

  const template = nunjucks.compile(content, nunjEnv);
  const html = template.render(nunjucksContext);

  callback(null, html);
};
