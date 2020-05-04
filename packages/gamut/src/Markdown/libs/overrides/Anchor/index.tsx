/* eslint-disable jsx-a11y/anchor-has-content */
import React, { HTMLAttributes } from 'react';

export interface AnchorProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  title?: string;
  height?: number;
  width?: number;
  target?: string;
  rel?: string;
}

const absoluteURLPattern = new RegExp('^(?:[a-z]+:)?//', 'i');

const matchesOrigin = (href: string) => {
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

const Anchor: React.FC<AnchorProps> = (props) => {
  const anchorProps = {
    ...props,
    target: '_blank',
    rel: 'noopener',
  };

  // remove noopener/noreferrer on relative & same origin urls
  if (matchesOrigin(props.href) || !absoluteURLPattern.test(props.href)) {
    delete anchorProps.rel;
  }

  return <a {...anchorProps} />;
};

export default Anchor;
