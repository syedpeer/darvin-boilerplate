// Polyfills
import 'mdn-polyfills/NodeList.prototype.forEach';

// Bundle Config
import '../../../.modernizrrc';
import './libs/modernizr-custom-tests';
import '../styles/main.scss';

// Page Defaults
import './main.config';

import demoModule from '../../modules/m-03-demo/demo';
import tabsModule from '../../modules/m-02-tabs/tabs';

import accordionComponent from '../../components/c-02-accordion/accordion';

// calls
demoModule.init();
accordionComponent.init({
  accordionMode: false,
});
tabsModule.init({
  accordionMode: false,
});
