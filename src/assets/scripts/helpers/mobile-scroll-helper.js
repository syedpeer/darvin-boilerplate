/**
 * @file Mobile Scroll Helper
 * @author Tobias Frei
 *
 * @module helper/mobile-scroll-helper
 *
 */


const instance = {},
   defaults = {
   },
   settings = {};

let touchstartYPosition = null;

const preventIfNeeded = (e) => {
   if (e.targetTouches.length === 1) {
      const scrollDistance = e.targetTouches[0].clientY - touchstartYPosition; // scrollDistance > 0 => scrolling up
      const target = e.currentTarget;

      // Prevent 'touchmove' when scrollable container is already at the top and user tries to scroll further up
      target.scrollTop === 0 && scrollDistance > 0 && e.preventDefault();

      // Prevent 'touchmove' when user scrolled to the end of the element and tries to scroll further down
      target.scrollHeight - target.scrollTop <= target.clientHeight &&
         scrollDistance < 0 &&
         e.preventDefault();
   }
},
   determineTouchstartPosition = (event) => {
      event.targetTouches.length === 1 && (touchstartYPosition = event.targetTouches[0].clientY);
   };


/**
 * Initialize module
 *
 * @param {object} options - Override default settings with options object.
 * @return {object} Instance of created module.
 */

instance.init = (element) => {
   element.addEventListener('touchstart', determineTouchstartPosition, false);
   element.addEventListener('touchmove', preventIfNeeded, false);
};

instance.destroy = (element) => {
   element.removeEventListener('touchstart', determineTouchstartPosition, false);
   element.removeEventListener('touchmove', preventIfNeeded, false);
};

export default instance;
