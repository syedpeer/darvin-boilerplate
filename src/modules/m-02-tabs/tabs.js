/**
 * @file Tab-Navigation Module
 * @author mail@tobiasfrei.ch
 *
 * @module modules/tabs
 *
 */

import observer from '@unic/composite-observer';

const instance = {};
const defaults = {
  accordionMode: true,
  tabModule: 'm-tabs',
  tab: 'tab',
  tabTrigger: 'tab__trigger',
  tabContent: 'tab__content',
  tabContentBox: 'tab__contentbox',
  openClass: 'is-open',
  mediaQuery: '(min-width: 1024px)',
  hooks: {
    tabModule: '[data-m-tabs]',
    tab: '[data-tab]',
    tabTrigger: '[data-tab-trigger]',
    tabContent: '[data-tab-content]',
    tabContentBox: '[data-tab-contentbox]',
  },
};

const pubsub = observer();

let settings;
let tabModules;
let modulMode;
let mq;

const resizeDesktop = () => {
  tabModules.forEach((tabModule) => {
    const tabsOpen = [...tabModule.querySelectorAll(`${settings.hooks.tab}.${settings.openClass}`)];


    let height;
    tabsOpen.forEach((tabOpen) => {
      height = parseInt(tabOpen.querySelector(settings.hooks.tabContent).offsetHeight + 70, 10);
      tabModule.style.height = `${height}px`;
      tabModule.setAttribute('data-height', height);
    });
  });
};

const openTab = (tabRoot, init) => {
  tabRoot.classList.add(settings.openClass);
  if (!init) {
    window.requestAnimationFrame(resizeDesktop);
  }
};

const initStatesBefore = () => {
  // check inital for open states, otherwise set first item open
  tabModules.forEach((tabModule) => {
    const tabTriggers = [...tabModule.querySelectorAll(settings.hooks.tabTrigger)];


    let openflag = false;

    tabTriggers.forEach((tabTrigger) => {
      // check for initial open
      if (tabTrigger.classList.contains(settings.openClass)) {
        openTab(tabTrigger.parentNode, true);
        openflag = true;
      }
    });

    // inital first tab if nothing else set
    if (!openflag) {
      if (tabModule.hasAttribute('data-tab-id')) {
        const storageKey = `tab-${tabModule.getAttribute('data-tab-id')}`;
        const indexToOpen = localStorage.getItem(storageKey);

        // Check if index previously set
        if (indexToOpen !== null) {
          tabTriggers[indexToOpen].parentNode.classList.add(settings.openClass);
          openTab(tabTriggers[indexToOpen].parentNode, true);
        } else {
          tabTriggers[0].parentNode.classList.add(settings.openClass);
          openTab(tabTriggers[0].parentNode, true);

          localStorage.setItem(`tab-${tabModule.getAttribute('data-tab-id')}`, 0);
        }
      } else {
        tabTriggers[0].parentNode.classList.add(settings.openClass);
        openTab(tabTriggers[0].parentNode, true);
      }
    }
  });
};

const markFirstItem = () => {
  tabModules.forEach((tabModule) => {
    const tabTriggers = [...tabModule.querySelectorAll(settings.hooks.tabTrigger)];


    const tabTriggersOpen = [...tabModule.querySelectorAll(`.${settings.openClass}${settings.hooks.tab}`)];
    if (tabTriggersOpen.length < 1) {
      // mark first item
      tabTriggers[0].parentNode.classList.add(settings.openClass);
    } else if (tabTriggersOpen.length > 1) {
      // mark only first item
      for (let i = 1; i < tabTriggersOpen.length; i += 1) {
        tabTriggersOpen[i].classList.remove(settings.openClass);
      }
    }
  });
};

const resizeTab = (data) => {
  // wait for next frame on multiple triggers
  requestAnimationFrame(() => {
    // get values for change
    const {
      rootTab
    } = data;
    const rootModule = rootTab.parentNode;
    const startHeight = parseInt(rootModule.getAttribute('data-height'), 10);
    const endHeight = parseInt(data.value + startHeight, 10);

    // update calc height
    rootModule.setAttribute('data-height', endHeight);

    // set new height
    rootModule.style.height = `${endHeight}px`;
  });
};

const resizeMobile = () => {};

const cleanStates = () => {
  tabModules.forEach((tabModule) => {
    const tabTriggers = [...tabModule.querySelectorAll(settings.hooks.tab)];
    tabModule.setAttribute('style', '');
    tabTriggers.forEach((tabTrigger) => {
      tabTrigger.querySelector(settings.hooks.tabContentBox).setAttribute('style', '');
    });
  });
};

const closeTab = (tabRoot) => {
  tabRoot.classList.remove(settings.openClass);
};

const transitionListener = (e) => {
  // remove style after transition
  if (e.target.classList.contains('tab__contentbox') && e.propertyName === 'height' && e.target.offsetHeight > 3) {
    const {
      target
    } = e;
    target.removeEventListener('transitionend', transitionListener, true);
    target.classList.add('no-transition');
    window.requestAnimationFrame(() => {
      target.setAttribute('style', '');
    });
  }
};

const openAccordion = (accordionRoot, height) => {
  const animTarget = accordionRoot.querySelector(settings.hooks.tabContentBox);

  // listen for transition end to set height auto
  animTarget.addEventListener('transitionend', transitionListener, true);

  // open the accordion to height value
  accordionRoot.classList.add(settings.openClass);
  animTarget.style.height = `${height}px`;
};


const closeAccordion = (accordionRoot) => {
  // set height from auto to value for transition close
  const animTarget = accordionRoot.querySelector(settings.hooks.tabContentBox);

  animTarget.style.height = `${animTarget.offsetHeight}px`;

  requestAnimationFrame(() => {
    animTarget.classList.remove('no-transition');

    requestAnimationFrame(() => {
      accordionRoot.classList.remove(settings.openClass);
      animTarget.style.height = '0px';
    });
  });
};

const closeSiblings = (rootElement, actionFunc) => {
  if (modulMode === 1 && !settings.accordionMode) {
    return false;
  }

  let temp;
  // store start root
  const mainRoot = rootElement;
  const dataAttr = settings.hooks.tab.replace(/(\[|\])/g, '');
  // strip brackets

  // set directions for looping

  const dirs = ['previousElementSibling', 'nextElementSibling'];

  // eslint-disable-next-line
  for (let i = dirs.length; i -= 1;) {
    rootElement = mainRoot;

    // eslint-disable-next-line
    while ((rootElement = rootElement[dirs[i]]) !== null) {
      temp = rootElement;

      if (!temp.hasAttribute(dataAttr)) {
        break;
      } else {
        // close open sibling
        actionFunc(temp);
      }
    }
  }

  return undefined;
};

const toggleDesktop = (e) => {
  let {
    target
  } = e;

  // set origin target
  if (!target.classList.contains(settings.tabTrigger)) {
    target = target.closest(settings.hooks.tabTrigger);
  }

  // get root element
  const tabRoot = target.parentNode;

  // toggle class
  if (!tabRoot.classList.contains(settings.openClass)) {
    openTab(tabRoot, false);
    closeSiblings(tabRoot, closeTab);
  }
};

const toggleMobile = (e) => {
  let {
    target
  } = e;
  const {
    index
  } = target;

  // set origin target
  if (!target.classList.contains(settings.tabTrigger)) {
    target = target.closest(settings.hooks.tabTrigger);
  }

  // get elements
  const accordionRoot = target.parentNode;
  const accordionContent = accordionRoot.querySelector(settings.hooks.tabContent);
  const height = accordionContent.offsetHeight;

  // toggle class
  if (accordionRoot.classList.contains(settings.openClass)) {
    closeAccordion(accordionRoot);
  } else {
    openAccordion(accordionRoot, height);

    // Save index when tab got opened
    if (accordionRoot.parentNode.hasAttribute('data-tab-id')) {
      localStorage.setItem(`tab-${accordionRoot.parentNode.getAttribute('data-tab-id')}`, index);
    }

    closeSiblings(accordionRoot, closeAccordion);
  }
};

const bindDesktopEvents = () => {
  tabModules.forEach((tabModule) => {
    const tabTriggers = [...tabModule.querySelectorAll(settings.hooks.tabTrigger)];
    tabTriggers.forEach((tabTrigger, index) => {
      tabTrigger.addEventListener('click', toggleDesktop);

      if (tabModule.hasAttribute('data-tab-id')) {
        tabTrigger.addEventListener('click', () => {
          localStorage.setItem(`tab-${tabModule.getAttribute('data-tab-id')}`, index);
        });
      }
    });
  });
  pubsub.on('accordionTrigger', resizeTab);
};

const unbindDesktopEvents = () => {
  tabModules.forEach((tabModule) => {
    const tabTriggers = [...tabModule.querySelectorAll(settings.hooks.tabTrigger)];
    tabTriggers.forEach((tabTrigger) => {
      tabTrigger.removeEventListener('click', toggleDesktop);
    });
  });
  pubsub.off('accordionTrigger');
};


const bindMobileEvents = () => {
  tabModules.forEach((tabModule) => {
    const tabTriggers = [...tabModule.querySelectorAll(settings.hooks.tabTrigger)];
    tabTriggers.forEach((tabTrigger, index) => {
      tabTrigger.index = index;
      tabTrigger.addEventListener('click', toggleMobile);
    });
  });
};


const unbindMobileEvents = () => {
  tabModules.forEach((tabModule) => {
    const tabTriggers = [...tabModule.querySelectorAll(settings.hooks.tabTrigger)];
    tabTriggers.forEach((tabTrigger) => {
      tabTrigger.removeEventListener('click', toggleMobile);
    });
  });
};

const initStatesAfter = () => {
  cleanStates();
  if (modulMode === 1) {
    // set mobile settings
    resizeMobile();
  } else if (modulMode === 2) {
    // set desktop settings
    window.requestAnimationFrame(resizeDesktop);
  }
};

const switchMode = (_mq) => {
  if (!_mq.matches) {
    // window width less or equal 1024
    modulMode = 1;
    unbindDesktopEvents();
    bindMobileEvents();
  } else {
    // window width more than 1024
    modulMode = 2;
    unbindMobileEvents();

    // tabs should have one selected tab
    markFirstItem();
    bindDesktopEvents();
  }
  initStatesAfter();
};

const resize = () => {
  initStatesAfter();
};

const bindModuleEvents = () => {
  // set initial states
  initStatesBefore();

  // set mediaQuery Object
  mq = window.matchMedia(settings.mediaQuery);

  // set listener for tabs/accordion modes
  mq.addListener(switchMode);

  // set inital mode
  switchMode(mq);

  // set resize event
  window.addEventListener('resize', resize);
};

const unbindModuleEvents = () => {
  window.removeEventListener('resize', resize);
  if (mq) {
    mq.removeListener(switchMode);
    mq = null;
  }
  unbindDesktopEvents();
  unbindMobileEvents();
};

/**
 * Initialize module
 *
 * @param {object} options - Override default settings with options object.
 * @return {object} Instance of created module.
 */

instance.init = (options) => {
  settings = Object.assign({}, defaults, options);

  tabModules = [...document.querySelectorAll(settings.hooks.tabModule)];

  // exit if no tabs found
  if (tabModules.length < 1) {
    return {};
  }

  // bind module events
  bindModuleEvents();

  return instance;
};

/**
 * Destroy this module.
 */

instance.destroy = () => {
  unbindModuleEvents();
};

/**
 * Resize open accordions.
 */

instance.resize = () => {
  resize();
};

// export for cms call
window.resizeTabs = instance.resize;

export default instance;

// export instance to window
window.BOILERPLATE = window.BOILERPLATE || {};
window.BOILERPLATE.tabs = instance;
