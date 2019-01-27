let utils = require('loader-utils');
let fs = require('fs');
let path = require('path');
let nunjucks = require('nunjucks');

let NunjucksLoader = nunjucks.Loader.extend({
    //Based off of the Nunjucks 'FileSystemLoader'

    init: function(searchPaths, sourceFoundCallback) {
    	this.sourceFoundCallback = sourceFoundCallback;
        if(searchPaths) {
            searchPaths = Array.isArray(searchPaths) ? searchPaths : [searchPaths];
            // For windows, convert to forward slashes
            this.searchPaths = searchPaths.map(path.normalize);
        }
        else {
            this.searchPaths = ['.'];
        }
    },

    getSource: function(name) {
    	let fullpath = null;
        let paths = this.searchPaths;

        for(let i=0; i<paths.length; i++) {
            let basePath = path.resolve(paths[i]);
            let p = path.resolve(paths[i], name);

            // Only allow the current directory and anything
            // underneath it to be searched
            if(p.indexOf(basePath) === 0 && fs.existsSync(p)) {
                fullpath = p;
                break;
            }
        }

        if(!fullpath) {
            return null;
        }

        this.sourceFoundCallback(fullpath);

        return {
			src: fs.readFileSync(fullpath, 'utf-8'),
			path: fullpath,
			noCache: this.noCache
		};
    }
});

module.exports = function(content) {
	this.cacheable();

	let loaderFilename = this.resourcePath.replace(/^.*[\\\/]/, '');
	let loaderPath = this.resourcePath.split('templates/')[1];

	let callback = this.async();
	let opt = utils.parseQuery(this.query);
	let nunjucksContext = opt.context;
	let nunjucksSearchPaths = opt.searchPaths;

	nunjucksContext['htmlTemplates'].forEach((htmlTemplates) => {
		if(htmlTemplates.options.templateParameters.modulePath === loaderPath) {
			nunjucksContext['darvin'] = htmlTemplates.options.templateParameters;
		}
	});

	let loader = new NunjucksLoader(nunjucksSearchPaths, function(path) {
		this.addDependency(path);
	}.bind(this));

	let nunjEnv = new nunjucks.Environment(loader);
	nunjucks.configure(null, { watch: false });

  let template = nunjucks.compile(content, nunjEnv);
	html = template.render(nunjucksContext);

	callback(null, html);
};
