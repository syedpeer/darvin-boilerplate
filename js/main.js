// Polyfills
import 'mdn-polyfills/NodeList.prototype.forEach';

// Bundle Config
import '../.modernizrrc';
import './libs/modernizr-custom-tests';
import style from "../styles/main.scss";

// Page Defaults
import config from './main.config.js'

// Modules
import moduleExample from './modules/module-example.js';

// Calls
moduleExample.init();
