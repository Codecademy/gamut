// Tell React 18/19 we are in an act()-aware test environment (Jest + RTL)
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Set fixed date
Date.now = jest.fn(() => new Date(2011, 6, 1).valueOf());

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

require('mutationobserver-shim');
