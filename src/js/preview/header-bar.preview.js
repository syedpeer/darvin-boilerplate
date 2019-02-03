/**
 * @file Darvin Headerbar
 * @author Tobias Frei
 *
 * TODO!: cleanup and refactor
 *
 * @module headerbar
 */

import Prism from 'prismjs';
import MarkdownIt from 'markdown-it';

const instance = {};
const defaults = {
  container: '.prev-m-servicenav',
};
const settings = {};

// Module Variables
let container,
triggerBtns,
md = new MarkdownIt(); // eslint-disable-line

// Private Functions
const clickHandler = (e) => {
  let targetOverlay = e.currentTarget.getAttribute('data-target');
  if(targetOverlay=='readme') {
    getReadme();
  } else if(targetOverlay=='source') {
    getSource();
  }
},
getReadme = () => {
  let overlay = document.querySelector('.prev-m-overlay'),
  overlaySlot = overlay.querySelector('.prev-m-overlay__item[data-readme]');

  if(overlaySlot.getAttribute('data-init')) {
    document.body.setAttribute('data-active', 'readme');
    overlay.classList.add('is-active');
    return;
  }

  fetch('/' + document.body.getAttribute('data-path') + '/meta/readme.md')
    .then(response => {
      if (response.ok) {
        return Promise.resolve(response);
      }
      else {
        return Promise.reject(new Error('Failed to load'));
      }
    })
    .then(response => response.text()) // parse response as JSON
    .then(data => {
      // success
      overlaySlot.innerHTML = md.render(data); // markdown to html
      overlaySlot.setAttribute('data-init', 'true');

      document.body.setAttribute('data-active', 'readme');
      overlay.classList.add('is-active');
    })
    .catch(function(error) {
      console.log(`Error: ${error.message}`);
    });

    document.body.classList.add('preview__content--off');


},
getSource = () => {
  let overlay = document.querySelector('.prev-m-overlay'),
  overlaySlot = overlay.querySelector('.prev-m-overlay__item[data-source]');

  if(overlaySlot.getAttribute('data-init')) {
    document.body.setAttribute('data-active', 'source');
    overlay.classList.add('is-active');
  }

  fetch('/' + document.body.getAttribute('data-path') + '/' + document.body.getAttribute('data-name') + '.njk')
    .then(response => {
      if (response.ok) {
        return Promise.resolve(response);
      }
      else {
        return Promise.reject(new Error('Failed to load'));
      }
    })
    .then(response => response.text()) // parse response as JSON
    .then(data => {
      // success
      overlaySlot.innerHTML = '<pre class="language-javascript"><code class="language-javascript">' + Prism.highlight(data, Prism.languages.javascript, 'javascript') + '</code></pre>';
      overlaySlot.setAttribute('data-init', 'true');
      document.body.setAttribute('data-active', 'source');
      overlay.classList.add('is-active');
    })
    .catch(function(error) {
      console.log(`Error: ${error.message}`);
    });

    document.body.classList.add('preview__content--off');
};

/**
 * Initialize module
 *
 * @param {object} options - Override default settings with options object.
 * @return {object|undefined} Instance of created module.
 */

instance.init = (options) => {
  Object.assign(settings, defaults, options);

  // Public Code
  container = document.querySelector(settings.container);

  triggerBtns = container.querySelectorAll('.prev-m-servicenav__link[data-trigger]');

  if(!triggerBtns) return;

  [...triggerBtns].forEach((btn) => {
    btn.addEventListener('click', clickHandler);
  });

  return instance;
};

export default instance;
