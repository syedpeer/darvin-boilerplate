# Darvin Boilerplate
![](https://img.shields.io/github/issues-closed-raw/tobiasfrei/darvin-boilerplate.svg?style=popout-square)
![](https://img.shields.io/github/issues-raw/tobiasfrei/darvin-boilerplate.svg?style=popout-square)

Darvin is a non-gulp based leightweight boilerplate to render static HTML. Mozilla Nunjucks templating engine, ES201X transpiler and Sass precompiling with SVG sprites. Features precommit hooks with husky for csscomb, custom modernizr and autofix linting. Hot load based on browsersync.

## Setup
Node 11.7.0

### 1. Prepare Node Version Manager
MacOS/Linux
```
https://github.com/creationix/nvm
```

Windows
```
https://github.com/coreybutler/nvm-windows
```

### 2. Install node version

1. install node version
```nvm install 11.7.0```

2. load node version from .nvmrc
```nvm use```
Note: If that not work, do ```nvm use 11.7.0```

3. install dependencies
```npm install```

## Start
Load installed node version each time you startup the project:
```nvm use```

### Develop
Run watcher and hot load browser on file changes.
```
npm run dev
```

### Production
Run this mode for minifyed outstream. Required for SEO purpose and many CMS asset aggregations.

```
npm run build
```

## Sprites
SVG Spritemap will be generated referenced to filenames trough this folder:
```src/assets/images/icons```

There are two ways to integrate them in templates.

### Inline HTML
SVG Sprites are prefixed with ```sprite-``` followed by filename.

e.g for Filename
```src/assets/images/icons/arrow.svg```

```
<svg class="icon">
    <use xlink:href="/path/to/spritemap.svg#sprite-arrow"></use>
</svg>
```

Note: Render the map in the body and access without filename ```xlink:href="#sprite-arrow"```

### Generic Sass

#### Preparation
Attribution over CSS needs small file preparation and looses OS preview functionality.
Add several variables to svg prefixed with 'var:{css-attribute}' as shown in following example:
```<path fill="none" var:color.stroke="" var:width.stroke-width="" d="M0.3,17.7L17.7,0.3"/>```

#### Usage
```
.myElement {
    @include sprite('arrow', { stroke: 'red', stroke-width: 1px });
}
```

Note: 

## Authors
Tobias Frei, Christian Sany
