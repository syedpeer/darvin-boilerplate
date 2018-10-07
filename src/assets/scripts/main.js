// Polyfills
import 'mdn-polyfills/NodeList.prototype.forEach';

// Bundle Config
import '../../../.modernizrrc';
import './libs/modernizr-custom-tests';
import style from "../styles/main.scss";

// Page Defaults
import config from './main.config.js';

import demoModule from './modules/demo-module.js';

// calls
demoModule.init();
