// Polyfills
import 'mdn-polyfills/NodeList.prototype.forEach';

// Bundle Config
import '../../../.modernizrrc';
import './libs/modernizr-custom-tests';
import style from "../styles/main.scss";

// Page Defaults
import config from './main.config.js';

import demoModule from './modules/demo-module.js';
import tabsModule from './modules/tabs.js';

import accordionComponent from './components/accordion.js';

// calls
demoModule.init();
accordionComponent.init({ accordionMode: false });
tabsModule.init({ accordionMode: false });
