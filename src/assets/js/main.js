// Polyfills
import 'mdn-polyfills/NodeList.prototype.forEach';

// Bundle Config
import '../../../.modernizrrc';
import './libs/modernizr-custom-tests';
import style from "../styles/main.scss";

// Page Defaults
import config from './main.config.js';

import demoModule from '../../modules/m-03-demo/demo.js';
import tabsModule from '../../modules/m-02-tabs/tabs.js';

import accordionComponent from '../../components/c-02-accordion/accordion.js';

// calls
demoModule.init();
accordionComponent.init({
   accordionMode: false
});
tabsModule.init({
   accordionMode: false
});
