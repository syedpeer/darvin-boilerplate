/**
 * @file Boilerplate Module Example
 * @author Tobias Frei
 *
 * @module module-example
 */

const instance = {};
const defaults = {
  container: '.m-boilerplate',
};
const settings = {};

// Module Variables
let container;

// Private Functions
const onMouseMove = (event) => {
  container.style.backgroundImage = `radial-gradient(at ${event.clientX}px ${event.clientY}px, transparent 0, #9cb6e0 40%)`;
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
  container = document.querySelector('.m-demo');

  if (!container) {
    return undefined;
  }

  document.addEventListener('mousemove', onMouseMove);

  return instance;
};

export default instance;
