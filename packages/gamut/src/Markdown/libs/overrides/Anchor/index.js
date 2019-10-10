/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
const absoluteURLPattern = new RegExp('^(?:[a-z]+:)?//', 'i');
const matchesOrigin = href => {
  if (typeof window === 'undefined' || typeof URL === 'undefined') return false;
  try {
    const url = new window.URL(href);
    if (url.origin === window.location.origin) {
      return true;
    }
  } catch (e) {
    // Standard markdown behavior is to just render the bad url,
    // So we don't need to handle this error
  }
  return false;
};
const Anchor = props => {
  const anchorProps = {
    ...props,
    target: '_blank',
    rel: 'noopener',
  };
  // remove noopener/noreferrer on relative & same origin urls
  if (matchesOrigin(props.href) || !absoluteURLPattern.test(props.href)) {
    delete anchorProps.rel;
  }
  return React.createElement('a', Object.assign({}, anchorProps));
};
export default Anchor;
//# sourceMappingURL=index.js.map
