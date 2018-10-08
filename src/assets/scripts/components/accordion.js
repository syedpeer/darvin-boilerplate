/**
 * @file Accordion Component
 * @author mail@tobiasfrei.ch
 *
 * @module components/accordion
 *
 */

import pubsub from '../libs/pubsub';

const instance = {},
   defaults = {
      container: 'body',
      accordionMode: true,
      accordion: 'accordion',
      accordionTrigger: 'accordion__trigger',
      accordionContentbox: 'accordion__contentbox',
      accordionContent: 'accordion__content',
      openClass: 'is-open',
      boundAttr: 'data-accordion-bound',
      hooks: {
         accordion: '[data-accordion]',
         accordionTrigger: '[data-accordion-trigger]',
         accordionContentbox: '[data-accordion-contentbox]',
         accordionContent: '[data-accordion-content]'
      }
   };

let settings,
   containers,
   disFlag = false,
   accordions;

const clickDelegate = (e) => {
   let accordionTrigger;

   if (accordionTrigger = e.target.closest(settings.hooks.accordionTrigger)) {
      if (disFlag) {
         return;
      }
      disFlag = true;
      toggleClass({
         target: accordionTrigger
      });
   }
},

   bindEvents = () => {
      accordions.forEach(accordion => {

         // Set the bound Attribute, so that this module doesn't initiate the factory multiple times over the same elements
         accordion.setAttribute(settings.boundAttr, '');

         // flag if accordion is nested in tab
         if (accordion.closest('[data-tab]')) {
            accordion.setAttribute('data-nested', 'true');
         }

         // check for initial open
         if (accordion.classList.contains(settings.openClass)) {
            openAccordion(accordion, accordion.querySelector(settings.hooks.accordionContent).offsetHeight);
         }
      });

      containers.forEach(container => {

         // Set the bound Attribute, so that this module doesn't initiate the factory multiple times over the same elements
         container.setAttribute(settings.boundAttr, '');
         container.addEventListener('click', clickDelegate);
      });
   },

   unbindEvents = () => {
      accordions.forEach(accordion => {

         // Set the bound Attribute, so that this module doesn't initiate the factory multiple times over the same elements
         accordion.removeAttribute(settings.boundAttr);
      });

      containers.forEach(container => {

         // Set the bound Attribute, so that this module doesn't initiate the factory multiple times over the same elements
         container.removeAttribute(settings.boundAttr);
         container.removeEventListener('click', clickDelegate);
      });
   },

   toggleClass = (e) => {
      let target = e.target,
         accordionRoot,
         accordionContent,
         height;

      // set origin target
      if (!target.classList.contains(settings.accordionTrigger)) {
         target = target.closest(settings.hooks.accordionTrigger);
      }

      // get elements
      accordionRoot = target.parentNode;
      accordionContent = accordionRoot.querySelector(settings.hooks.accordionContent);
      height = accordionContent.offsetHeight;

      // toggle class
      if (accordionRoot.classList.contains(settings.openClass)) {
         closeAccordion(accordionRoot, true);
      } else {
         openAccordion(accordionRoot, height);
         closeSiblings(accordionRoot);
      }
   },

   openAccordion = (accordionRoot, height) => {
      let animTarget = accordionRoot.querySelector(settings.hooks.accordionContentbox);

      // listen for transition end to set height auto
      animTarget.addEventListener('transitionend', transitionListener, true);

      // open the accordion to height value
      accordionRoot.classList.add(settings.openClass);
      animTarget.style.height = height + 'px';

      // call tab for height change
      if (accordionRoot.closest('[data-tab]')) {
         pubsub.trigger('accordionTrigger', {
            rootTab: accordionRoot.closest('[data-tab]'),
            value: height
         });
      }
   },

   closeAccordion = (accordionRoot, cb) => {
      // set height from auto to value for transition close
      let animTarget = accordionRoot.querySelector(settings.hooks.accordionContentbox),
         openHeight = animTarget.offsetHeight;

      animTarget.style.height = animTarget.offsetHeight + 'px';

      requestAnimationFrame(function () {
         animTarget.classList.remove('no-transition');

         // listen for transition end to set height auto
         if (cb) {
            animTarget.addEventListener('transitionend', transitionListener, true);
         }

         requestAnimationFrame(function () {
            accordionRoot.classList.remove(settings.openClass);
            animTarget.style.height = '0px';

            // call tab for height change
            if (accordionRoot.closest('[data-tab]') && openHeight > 0) {
               pubsub.trigger('accordionTrigger', {
                  rootTab: accordionRoot.closest('[data-tab]'),
                  value: -1 * openHeight
               });
            }
         });
      });
   },

   closeSiblings = (rootElement) => {
      if (!settings.accordionMode) {
         return;
      }

      let mainRoot = rootElement,
         dataAttr = settings.hooks.accordion.replace(/(\[|\])/g, ''),    // strip brackets
         dirs = ['previousElementSibling', 'nextElementSibling'],
         temp;

      for (let i = dirs.length; i--;) {
         rootElement = mainRoot;

         while ((rootElement = rootElement[dirs[i]]) !== null) {
            temp = rootElement;

            if (!temp.hasAttribute(dataAttr)) {
               break;
            } else {

               // close open sibling
               closeAccordion(temp, false);
            }
         }
      }
   },

   transitionListener = (e) => {

      // remove style after transition ends
      if (e.target.classList.contains('accordion__contentbox') && e.propertyName === 'height' && e.target.offsetHeight > 3) {
         let target = e.target;
         target.removeEventListener('transitionend', transitionListener, true);
         target.classList.add('no-transition');
         window.requestAnimationFrame(function () {
            target.setAttribute('style', '');
            disFlag = false;
         });
      } else if (e.target.classList.contains('accordion__contentbox') && e.propertyName === 'height' && e.target.offsetHeight <= 3) {
         let target = e.target;
         target.removeEventListener('transitionend', transitionListener, true);
         window.requestAnimationFrame(function () {
            disFlag = false;
         });
      }
   };

/**
 * Initialize module
 *
 * @param {object} options - Override default settings with options object.
 * @return {object} Instance of created module.
 */
instance.init = (options) => {
   settings = Object.assign({}, defaults, options);

   containers = [...document.querySelectorAll(settings.container + ':not([' + settings.boundAttr + '])')];
   accordions = [...document.querySelectorAll(settings.container + ' ' + settings.hooks.accordion + ':not([' + settings.boundAttr + '])')];

   bindEvents();

   return instance;
};

/**
 * Destroy this module.
 */
instance.destroy = () => {
   unbindEvents();
};

export default instance;
