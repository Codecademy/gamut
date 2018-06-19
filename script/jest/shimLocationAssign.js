const Uri = require('jsuri');

if (!jsdom) {
  throw new Error(
    'shimLocationAssign requires jsdom to be available globally, did you add jest-environment-jsdom-global to your jest config?'
  );
}

/**
 * location.assign test shim
 *
 * This function overrides the global window.location.assign
 * function, and replaces it with a function that changes the URL in JSDOM
 *
 * This is needed in the test environment because JSDOM no longer allows
 * reassigning window.location.href manually, because it doesn't actually
 * handle navigation natively.
 *
 * This requires jsdom to be available globally, which we use
 * the jest-environment-jsdom-global module to enable
 */
export default function shimLocationAssign() {
  window.location.assign = function(url) {
    const currentUri = new Uri(window.location.href);
    const newUri = new Uri(url);
    if (!newUri.host()) {
      newUri.setProtocol(currentUri.protocol());
      newUri.setHost(currentUri.host());
    }
    jsdom.reconfigure({
      url: newUri.toString(),
    });
  };
}
