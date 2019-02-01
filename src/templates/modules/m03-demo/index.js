/**
 * @file Boilerplate Module Example
 * @author Tobias Frei
 *
 * @module module-example
 */

// import helperDom from '../../assets/js/helpers/helper-dom';

const instance = {};
const defaults = {
  container: '.m-boilerplate',
};
const settings = {};

// Module Variables
let container; // eslint-disable-line

// // Private Functions
// const onMouseMove = (event) => {
// eslint-disable-next-line
//   // container.style.backgroundImage = 'radial-gradient(at ' + event.clientX + 'px ' + event.clientY + 'px, transparent 0, #9cb6e0 40%)';
// };

/**
 * Initialize module
 *
 * @param {object} options - Override default settings with options object.
 * @return {object|undefined} Instance of created module.
 */

instance.init = (options) => {
  Object.assign(settings, defaults, options);

  // Public Code
  console.log('> js ready now'); // eslint-disable-line

  container = document.querySelector('.m-demo');

  return instance;
};

export default instance;
