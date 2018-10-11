[![N|tobiasfrei](http://tobiasfrei.ch/github/webpack-boilerplate/header.jpg)](https://tobiasfrei.ch)

# Webpack4 Boilerplate
Starterkit for frontend tasks with Nunjucks templates, ES201X transpiler and Sass precompiling with SVG/PNG sprites.

## Upcoming
- improve svg sprite inline css.
- add pre-commit hook for csscomb.
- modulize in one module directory.
- add js linter.
- style sample modules.
- refresh modernizr customs.
- add Vue.js Sample.

## Prerequisite
Node 10.11.0

## 1. Install Node.js
MacOS/Linux
```
https://github.com/creationix/nvm
```

Windows
```
https://github.com/coreybutler/nvm-windows
```

## 2. Install setup
Load node.js version
```
nvm use
```

Install Packages
```
npm install
```

## 3. Run setup
Run watcher
```
npm run dev
```

Run production
```
npm run prod
```

### Sprites
Inline
```
<svg viewBox="0 0 100 100" class="icon icon-arrow">
    <use xlink:href="#sprite-arrow"></use>
</svg>
```
