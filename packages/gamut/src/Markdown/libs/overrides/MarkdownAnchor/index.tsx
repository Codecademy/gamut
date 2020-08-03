/* eslint-disable jsx-a11y/anchor-has-content */
import React, { HTMLAttributes } from 'react';

import Anchor from '../../../../Anchor';

export interface MarkdownAnchorProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
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

const MarkdownAnchor: React.FC<MarkdownAnchorProps> = (props) => {
  const anchorProps = {
    ...props,
    target: '_blank',
    rel: 'noopener',
  };

  // remove noopener/noreferrer on relative & same origin urls
  if (matchesOrigin(props.href) || !absoluteURLPattern.test(props.href)) {
    delete anchorProps.rel;
  }

  return <Anchor {...anchorProps} />;
};

export default MarkdownAnchor;
