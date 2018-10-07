/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assets/scripts/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./.modernizrrc.js-exposed":
/*!*********************************!*\
  !*** ./.modernizrrc.js-exposed ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {module.exports = global[\"Modernizr\"] = __webpack_require__(/*! -!(webpack)-modernizr-loader!./node_modules/babel-loader/lib??ref--7!./.modernizrrc.js */ \"./node_modules/webpack-modernizr-loader/index.js!./node_modules/babel-loader/lib/index.js?!./.modernizrrc.js\");\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./.modernizrrc.js-exposed?");

/***/ }),

/***/ "./node_modules/mdn-polyfills/NodeList.prototype.forEach.js":
/*!******************************************************************!*\
  !*** ./node_modules/mdn-polyfills/NodeList.prototype.forEach.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(o,t){t=t||window;for(var i=0;i<this.length;i++)o.call(t,this[i],i,this)});\n\n\n//# sourceURL=webpack:///./node_modules/mdn-polyfills/NodeList.prototype.forEach.js?");

/***/ }),

/***/ "./node_modules/webpack-modernizr-loader/index.js!./node_modules/babel-loader/lib/index.js?!./.modernizrrc.js":
/*!********************************************************************************************!*\
  !*** (webpack)-modernizr-loader!./node_modules/babel-loader/lib??ref--7!./.modernizrrc.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval(";(function(window){var hadGlobal='Modernizr' in window;var oldGlobal=window.Modernizr;/*!\n * modernizr v3.6.0\n * Build https://modernizr.com/download?-addtest-setclasses-dontmin\n *\n * Copyright (c)\n *  Faruk Ates\n *  Paul Irish\n *  Alex Sexton\n *  Ryan Seddon\n *  Patrick Kettner\n *  Stu Cox\n *  Richard Herrera\n\n * MIT License\n */\n\n/*\n * Modernizr tests which native CSS3 and HTML5 features are available in the\n * current UA and makes the results available to you in two ways: as properties on\n * a global `Modernizr` object, and as classes on the `<html>` element. This\n * information allows you to progressively enhance your pages with a granular level\n * of control over the experience.\n*/\n\n;(function(window, document, undefined){\n  var tests = [];\n  \n\n  /**\n   *\n   * ModernizrProto is the constructor for Modernizr\n   *\n   * @class\n   * @access public\n   */\n\n  var ModernizrProto = {\n    // The current version, dummy\n    _version: '3.6.0',\n\n    // Any settings that don't work as separate modules\n    // can go in here as configuration.\n    _config: {\n      'classPrefix': '',\n      'enableClasses': true,\n      'enableJSClass': true,\n      'usePrefixes': true\n    },\n\n    // Queue of tests\n    _q: [],\n\n    // Stub these for people who are listening\n    on: function(test, cb) {\n      // I don't really think people should do this, but we can\n      // safe guard it a bit.\n      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.\n      // This is in case people listen to synchronous tests. I would leave it out,\n      // but the code to *disallow* sync tests in the real version of this\n      // function is actually larger than this.\n      var self = this;\n      setTimeout(function() {\n        cb(self[test]);\n      }, 0);\n    },\n\n    addTest: function(name, fn, options) {\n      tests.push({name: name, fn: fn, options: options});\n    },\n\n    addAsyncTest: function(fn) {\n      tests.push({name: null, fn: fn});\n    }\n  };\n\n  \n\n  // Fake some of Object.create so we can force non test results to be non \"own\" properties.\n  var Modernizr = function() {};\n  Modernizr.prototype = ModernizrProto;\n\n  // Leak modernizr globally when you `require` it rather than force it here.\n  // Overwrite name so constructor name is nicer :D\n  Modernizr = new Modernizr();\n\n  \n\n  var classes = [];\n  \n\n  /**\n   * is returns a boolean if the typeof an obj is exactly type.\n   *\n   * @access private\n   * @function is\n   * @param {*} obj - A thing we want to check the type of\n   * @param {string} type - A string to compare the typeof against\n   * @returns {boolean}\n   */\n\n  function is(obj, type) {\n    return typeof obj === type;\n  }\n  ;\n\n  /**\n   * Run through all tests and detect their support in the current UA.\n   *\n   * @access private\n   */\n\n  function testRunner() {\n    var featureNames;\n    var feature;\n    var aliasIdx;\n    var result;\n    var nameIdx;\n    var featureName;\n    var featureNameSplit;\n\n    for (var featureIdx in tests) {\n      if (tests.hasOwnProperty(featureIdx)) {\n        featureNames = [];\n        feature = tests[featureIdx];\n        // run the test, throw the return value into the Modernizr,\n        // then based on that boolean, define an appropriate className\n        // and push it into an array of classes we'll join later.\n        //\n        // If there is no name, it's an 'async' test that is run,\n        // but not directly added to the object. That should\n        // be done with a post-run addTest call.\n        if (feature.name) {\n          featureNames.push(feature.name.toLowerCase());\n\n          if (feature.options && feature.options.aliases && feature.options.aliases.length) {\n            // Add all the aliases into the names list\n            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {\n              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());\n            }\n          }\n        }\n\n        // Run the test, or use the raw value if it's not a function\n        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;\n\n\n        // Set each of the names on the Modernizr object\n        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {\n          featureName = featureNames[nameIdx];\n          // Support dot properties as sub tests. We don't do checking to make sure\n          // that the implied parent tests have been added. You must call them in\n          // order (either in the test, or make the parent test a dependency).\n          //\n          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting\n          // hashtag famous last words\n          featureNameSplit = featureName.split('.');\n\n          if (featureNameSplit.length === 1) {\n            Modernizr[featureNameSplit[0]] = result;\n          } else {\n            // cast to a Boolean, if not one already\n            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {\n              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);\n            }\n\n            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;\n          }\n\n          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));\n        }\n      }\n    }\n  }\n  ;\n\n  /**\n   * docElement is a convenience wrapper to grab the root element of the document\n   *\n   * @access private\n   * @returns {HTMLElement|SVGElement} The root element of the document\n   */\n\n  var docElement = document.documentElement;\n  \n\n  /**\n   * A convenience helper to check if the document we are running in is an SVG document\n   *\n   * @access private\n   * @returns {boolean}\n   */\n\n  var isSVG = docElement.nodeName.toLowerCase() === 'svg';\n  \n\n  /**\n   * setClasses takes an array of class names and adds them to the root element\n   *\n   * @access private\n   * @function setClasses\n   * @param {string[]} classes - Array of class names\n   */\n\n  // Pass in an and array of class names, e.g.:\n  //  ['no-webp', 'borderradius', ...]\n  function setClasses(classes) {\n    var className = docElement.className;\n    var classPrefix = Modernizr._config.classPrefix || '';\n\n    if (isSVG) {\n      className = className.baseVal;\n    }\n\n    // Change `no-js` to `js` (independently of the `enableClasses` option)\n    // Handle classPrefix on this too\n    if (Modernizr._config.enableJSClass) {\n      var reJS = new RegExp('(^|\\\\s)' + classPrefix + 'no-js(\\\\s|$)');\n      className = className.replace(reJS, '$1' + classPrefix + 'js$2');\n    }\n\n    if (Modernizr._config.enableClasses) {\n      // Add the new classes\n      className += ' ' + classPrefix + classes.join(' ' + classPrefix);\n      if (isSVG) {\n        docElement.className.baseVal = className;\n      } else {\n        docElement.className = className;\n      }\n    }\n\n  }\n\n  ;\n\n  /**\n   * hasOwnProp is a shim for hasOwnProperty that is needed for Safari 2.0 support\n   *\n   * @author kangax\n   * @access private\n   * @function hasOwnProp\n   * @param {object} object - The object to check for a property\n   * @param {string} property - The property to check for\n   * @returns {boolean}\n   */\n\n  // hasOwnProperty shim by kangax needed for Safari 2.0 support\n  var hasOwnProp;\n\n  (function() {\n    var _hasOwnProperty = ({}).hasOwnProperty;\n    /* istanbul ignore else */\n    /* we have no way of testing IE 5.5 or safari 2,\n     * so just assume the else gets hit */\n    if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {\n      hasOwnProp = function(object, property) {\n        return _hasOwnProperty.call(object, property);\n      };\n    }\n    else {\n      hasOwnProp = function(object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */\n        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));\n      };\n    }\n  })();\n\n  \n\n\n   // _l tracks listeners for async tests, as well as tests that execute after the initial run\n  ModernizrProto._l = {};\n\n  /**\n   * Modernizr.on is a way to listen for the completion of async tests. Being\n   * asynchronous, they may not finish before your scripts run. As a result you\n   * will get a possibly false negative `undefined` value.\n   *\n   * @memberof Modernizr\n   * @name Modernizr.on\n   * @access public\n   * @function on\n   * @param {string} feature - String name of the feature detect\n   * @param {function} cb - Callback function returning a Boolean - true if feature is supported, false if not\n   * @example\n   *\n   * ```js\n   * Modernizr.on('flash', function( result ) {\n   *   if (result) {\n   *    // the browser has flash\n   *   } else {\n   *     // the browser does not have flash\n   *   }\n   * });\n   * ```\n   */\n\n  ModernizrProto.on = function(feature, cb) {\n    // Create the list of listeners if it doesn't exist\n    if (!this._l[feature]) {\n      this._l[feature] = [];\n    }\n\n    // Push this test on to the listener list\n    this._l[feature].push(cb);\n\n    // If it's already been resolved, trigger it on next tick\n    if (Modernizr.hasOwnProperty(feature)) {\n      // Next Tick\n      setTimeout(function() {\n        Modernizr._trigger(feature, Modernizr[feature]);\n      }, 0);\n    }\n  };\n\n  /**\n   * _trigger is the private function used to signal test completion and run any\n   * callbacks registered through [Modernizr.on](#modernizr-on)\n   *\n   * @memberof Modernizr\n   * @name Modernizr._trigger\n   * @access private\n   * @function _trigger\n   * @param {string} feature - string name of the feature detect\n   * @param {function|boolean} [res] - A feature detection function, or the boolean =\n   * result of a feature detection function\n   */\n\n  ModernizrProto._trigger = function(feature, res) {\n    if (!this._l[feature]) {\n      return;\n    }\n\n    var cbs = this._l[feature];\n\n    // Force async\n    setTimeout(function() {\n      var i, cb;\n      for (i = 0; i < cbs.length; i++) {\n        cb = cbs[i];\n        cb(res);\n      }\n    }, 0);\n\n    // Don't trigger these again\n    delete this._l[feature];\n  };\n\n  /**\n   * addTest allows you to define your own feature detects that are not currently\n   * included in Modernizr (under the covers it's the exact same code Modernizr\n   * uses for its own [feature detections](https://github.com/Modernizr/Modernizr/tree/master/feature-detects)). Just like the offical detects, the result\n   * will be added onto the Modernizr object, as well as an appropriate className set on\n   * the html element when configured to do so\n   *\n   * @memberof Modernizr\n   * @name Modernizr.addTest\n   * @optionName Modernizr.addTest()\n   * @optionProp addTest\n   * @access public\n   * @function addTest\n   * @param {string|object} feature - The string name of the feature detect, or an\n   * object of feature detect names and test\n   * @param {function|boolean} test - Function returning true if feature is supported,\n   * false if not. Otherwise a boolean representing the results of a feature detection\n   * @example\n   *\n   * The most common way of creating your own feature detects is by calling\n   * `Modernizr.addTest` with a string (preferably just lowercase, without any\n   * punctuation), and a function you want executed that will return a boolean result\n   *\n   * ```js\n   * Modernizr.addTest('itsTuesday', function() {\n   *  var d = new Date();\n   *  return d.getDay() === 2;\n   * });\n   * ```\n   *\n   * When the above is run, it will set Modernizr.itstuesday to `true` when it is tuesday,\n   * and to `false` every other day of the week. One thing to notice is that the names of\n   * feature detect functions are always lowercased when added to the Modernizr object. That\n   * means that `Modernizr.itsTuesday` will not exist, but `Modernizr.itstuesday` will.\n   *\n   *\n   *  Since we only look at the returned value from any feature detection function,\n   *  you do not need to actually use a function. For simple detections, just passing\n   *  in a statement that will return a boolean value works just fine.\n   *\n   * ```js\n   * Modernizr.addTest('hasJquery', 'jQuery' in window);\n   * ```\n   *\n   * Just like before, when the above runs `Modernizr.hasjquery` will be true if\n   * jQuery has been included on the page. Not using a function saves a small amount\n   * of overhead for the browser, as well as making your code much more readable.\n   *\n   * Finally, you also have the ability to pass in an object of feature names and\n   * their tests. This is handy if you want to add multiple detections in one go.\n   * The keys should always be a string, and the value can be either a boolean or\n   * function that returns a boolean.\n   *\n   * ```js\n   * var detects = {\n   *  'hasjquery': 'jQuery' in window,\n   *  'itstuesday': function() {\n   *    var d = new Date();\n   *    return d.getDay() === 2;\n   *  }\n   * }\n   *\n   * Modernizr.addTest(detects);\n   * ```\n   *\n   * There is really no difference between the first methods and this one, it is\n   * just a convenience to let you write more readable code.\n   */\n\n  function addTest(feature, test) {\n\n    if (typeof feature == 'object') {\n      for (var key in feature) {\n        if (hasOwnProp(feature, key)) {\n          addTest(key, feature[ key ]);\n        }\n      }\n    } else {\n\n      feature = feature.toLowerCase();\n      var featureNameSplit = feature.split('.');\n      var last = Modernizr[featureNameSplit[0]];\n\n      // Again, we don't check for parent test existence. Get that right, though.\n      if (featureNameSplit.length == 2) {\n        last = last[featureNameSplit[1]];\n      }\n\n      if (typeof last != 'undefined') {\n        // we're going to quit if you're trying to overwrite an existing test\n        // if we were to allow it, we'd do this:\n        //   var re = new RegExp(\"\\\\b(no-)?\" + feature + \"\\\\b\");\n        //   docElement.className = docElement.className.replace( re, '' );\n        // but, no rly, stuff 'em.\n        return Modernizr;\n      }\n\n      test = typeof test == 'function' ? test() : test;\n\n      // Set the value (this is the magic, right here).\n      if (featureNameSplit.length == 1) {\n        Modernizr[featureNameSplit[0]] = test;\n      } else {\n        // cast to a Boolean, if not one already\n        if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {\n          Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);\n        }\n\n        Modernizr[featureNameSplit[0]][featureNameSplit[1]] = test;\n      }\n\n      // Set a single class (either `feature` or `no-feature`)\n      setClasses([(!!test && test != false ? '' : 'no-') + featureNameSplit.join('-')]);\n\n      // Trigger the event\n      Modernizr._trigger(feature, test);\n    }\n\n    return Modernizr; // allow chaining.\n  }\n\n  // After all the tests are run, add self to the Modernizr prototype\n  Modernizr._q.push(function() {\n    ModernizrProto.addTest = addTest;\n  });\n\n  \n\n\n  // Run each test\n  testRunner();\n\n  // Remove the \"no-js\" class if it exists\n  setClasses(classes);\n\n  delete ModernizrProto.addTest;\n  delete ModernizrProto.addAsyncTest;\n\n  // Run the things that are supposed to run after the tests\n  for (var i = 0; i < Modernizr._q.length; i++) {\n    Modernizr._q[i]();\n  }\n\n  // Leak Modernizr namespace\n  window.Modernizr = Modernizr;\n\n\n;\n\n})(window, document);module.exports=window.Modernizr;if(hadGlobal){window.Modernizr=oldGlobal;}else{delete window.Modernizr;}})(window);\n\n//# sourceURL=webpack:///./.modernizrrc.js?(webpack)-modernizr-loader!./node_modules/babel-loader/lib??ref--7");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\r\n} catch (e) {\r\n\t// This works if the window reference is available\r\n\tif (typeof window === \"object\") g = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it's\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/assets/scripts/helpers/helper-dom.js":
/*!**************************************************!*\
  !*** ./src/assets/scripts/helpers/helper-dom.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\r\n * @file helper module for dom manipulation\r\n * @author Tobias Frei\r\n *\r\n * @module helpers/helper-dom.js\r\n */\nvar instance = {};\n/**\r\n * Get previous sibling by classname\r\n *\r\n * @param {HTMLElement} element - The element to start search.\r\n * @param {string} classname - The classname of the sibling element.\r\n * @return {HTMLElement} The previous node with the specific classname.\r\n */\n\ninstance.prevSibling = function (element, classname) {\n  var sibling, temp;\n\n  while ((element = element.previousSibling) !== null) {\n    temp = element;\n\n    if (temp.classList && temp.classList.contains(classname)) {\n      sibling = temp;\n      break;\n    }\n  }\n\n  return sibling;\n};\n/**\r\n * Get next sibling by classname\r\n *\r\n * @param {HTMLElement} element - The element to start search.\r\n * @param {string} classname - The classname of the sibling element.\r\n * @return {HTMLElement} The previous node with the specific classname.\r\n */\n\n\ninstance.nextSibling = function (element, classname) {\n  var sibling, temp;\n\n  while ((element = element.nextSibling) !== null) {\n    temp = element;\n\n    if (temp.classList && temp.classList.contains(classname)) {\n      sibling = temp;\n      break;\n    }\n  }\n\n  return sibling;\n};\n/**\r\n * Get the level of an element in a ul>li wrapper\r\n *\r\n * @param {HTMLElement} element - The element for finding level depth.\r\n * @param {string} id - The wrapper id.\r\n * @param {string} waypoint - The classname of the waypoint.\r\n * @param {number=} counter - The level counter.\r\n * @return {string} The level of the element\r\n */\n\n\ninstance.getLevelDepth = function (element, id, waypoint, counter) {\n  counter = counter || 0;\n\n  if (element.id.indexOf(id) >= 0) {\n    return counter;\n  }\n\n  if (element.classList.contains(waypoint)) {\n    ++counter;\n  }\n\n  return element.parentNode && instance.getLevelDepth(element.parentNode, id, waypoint, counter);\n};\n/**\r\n * Check if element or event target has parent with specific id\r\n *\r\n * @param {Object} e - The child element or browser event.\r\n * @param {string} id - The id to check in parent node.\r\n * @return {boolean} The level of the element\r\n */\n\n\ninstance.hasParent = function (e, id) {\n  if (!e) return false;\n  var el = e.target || e.srcElement || e || false;\n\n  while (el && el.id !== id) {\n    el = el.parentNode || false;\n  }\n\n  return el !== false;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (instance);\n\n//# sourceURL=webpack:///./src/assets/scripts/helpers/helper-dom.js?");

/***/ }),

/***/ "./src/assets/scripts/libs/modernizr-custom-tests.js":
/*!***********************************************************!*\
  !*** ./src/assets/scripts/libs/modernizr-custom-tests.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Custom Tests\nModernizr.addTest('safari', function () {\n  var isSafari = navigator.userAgent.indexOf('Safari') > -1,\n      isChrome = navigator.userAgent.indexOf('Chrome') > -1;\n  return !isChrome && isSafari;\n});\nModernizr.addTest('ie', function () {\n  return (\n    /*@cc_on!@*/\n    false || !!document.documentMode\n  ); // eslint-disable-line spaced-comment\n});\nModernizr.addTest('edge', function () {\n  var isIE =\n  /*@cc_on!@*/\n  false || !!document.documentMode; // eslint-disable-line spaced-comment\n\n  return !isIE && !!window.StyleMedia;\n});\nModernizr.addTest('firefox-lt-50', function () {\n  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {\n    if (navigator.userAgent.split('Firefox/')[1].split('.')[0] < 50) {\n      return true;\n    }\n  }\n\n  return false;\n});\n\n(function () {\n  document.documentElement.classList.add('no-touchdevice');\n  Modernizr.touch = false;\n  window.addEventListener('touchstart', function setHasTouch() {\n    Modernizr.touch = true;\n    document.documentElement.classList.add('touchdevice');\n    document.documentElement.classList.remove('no-touchdevice'); // Remove event listener once fired, otherwise it'll kill scrolling performance\n\n    window.removeEventListener('touchstart', setHasTouch);\n  }, false);\n})();\n\n//# sourceURL=webpack:///./src/assets/scripts/libs/modernizr-custom-tests.js?");

/***/ }),

/***/ "./src/assets/scripts/main.config.js":
/*!*******************************************!*\
  !*** ./src/assets/scripts/main.config.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"js/main.config.js\";\n\n//# sourceURL=webpack:///./src/assets/scripts/main.config.js?");

/***/ }),

/***/ "./src/assets/scripts/main.js":
/*!************************************!*\
  !*** ./src/assets/scripts/main.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mdn_polyfills_NodeList_prototype_forEach__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdn-polyfills/NodeList.prototype.forEach */ \"./node_modules/mdn-polyfills/NodeList.prototype.forEach.js\");\n/* harmony import */ var mdn_polyfills_NodeList_prototype_forEach__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mdn_polyfills_NodeList_prototype_forEach__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _modernizrrc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../.modernizrrc */ \"./.modernizrrc.js-exposed\");\n/* harmony import */ var _modernizrrc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modernizrrc__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _libs_modernizr_custom_tests__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./libs/modernizr-custom-tests */ \"./src/assets/scripts/libs/modernizr-custom-tests.js\");\n/* harmony import */ var _libs_modernizr_custom_tests__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_libs_modernizr_custom_tests__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/main.scss */ \"./src/assets/styles/main.scss\");\n/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_main_scss__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _main_config_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./main.config.js */ \"./src/assets/scripts/main.config.js\");\n/* harmony import */ var _main_config_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_main_config_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _modules_demo_module_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/demo-module.js */ \"./src/assets/scripts/modules/demo-module.js\");\n// Polyfills\n // Bundle Config\n\n\n\n // Page Defaults\n\n\n // calls\n\n_modules_demo_module_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].init();\n\n//# sourceURL=webpack:///./src/assets/scripts/main.js?");

/***/ }),

/***/ "./src/assets/scripts/modules/demo-module.js":
/*!***************************************************!*\
  !*** ./src/assets/scripts/modules/demo-module.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_helper_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/helper-dom */ \"./src/assets/scripts/helpers/helper-dom.js\");\n/**\r\n * @file Boilerplate Module Example\r\n * @author Tobias Frei\r\n *\r\n * @module module-example\r\n *\r\n */\n\nvar instance = {},\n    defaults = {\n  container: '.m-boilerplate'\n},\n    settings = {}; // Module Variables\n\nvar container; // Private Functions\n\nvar onMouseMove = function onMouseMove(event) {\n  container.style.backgroundImage = 'radial-gradient(at ' + event.clientX + 'px ' + event.clientY + 'px, transparent 0, #9cb6e0 40%)';\n};\n/**\r\n * Initialize module\r\n *\r\n * @param {object} options - Override default settings with options object.\r\n * @return {object} Instance of created module.\r\n */\n\n\ninstance.init = function (options) {\n  Object.assign(settings, defaults, options); // Public Code\n\n  console.log(\"> js ready\");\n  container = document.querySelector(\".m-demo\");\n  document.addEventListener(\"mousemove\", onMouseMove);\n  return instance;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (instance);\n\n//# sourceURL=webpack:///./src/assets/scripts/modules/demo-module.js?");

/***/ }),

/***/ "./src/assets/styles/main.scss":
/*!*************************************!*\
  !*** ./src/assets/styles/main.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/assets/styles/main.scss?");

/***/ })

/******/ });