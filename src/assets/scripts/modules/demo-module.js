/**
 * @file Boilerplate Module Example
 * @author Tobias Frei
 *
 * @module module-example
 *
 */

import helperDom from '../helpers/helper-dom';

const instance = {},
    defaults = {
        container: '.m-boilerplate'
    },
    settings = {};

// Module Variables
let container;

// Private Functions
const onMouseMove = (event) => {
    container.style.backgroundImage = 'radial-gradient(at ' + event.clientX + 'px ' + event.clientY + 'px, transparent 0, #9cb6e0 40%)';
};

/**
 * Initialize module
 *
 * @param {object} options - Override default settings with options object.
 * @return {object} Instance of created module.
 */

instance.init = (options) => {
    Object.assign(settings, defaults, options);

    // Public Code
    console.log("> js ready");

    container = document.querySelector(".m-demo");

    if(!container) return;

    document.addEventListener("mousemove", onMouseMove);

    return instance;
};

export default instance;
