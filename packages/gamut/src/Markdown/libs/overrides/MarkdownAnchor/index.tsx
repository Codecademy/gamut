/* eslint-disable jsx-a11y/anchor-has-content */
import React, { ComponentProps } from 'react';

import { Anchor } from '../../../../Anchor';

export interface MarkdownAnchorProps extends ComponentProps<typeof Anchor> {
  href?: string;
}

const absoluteURLPattern = new RegExp('^(?:[a-z]+:)?//', 'i');

const matchesOrigin = (href?: string) => {
  if (!href || typeof window === 'undefined' || typeof URL === 'undefined')
    return false;

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

export const MarkdownAnchor: React.FC<MarkdownAnchorProps> = ({
  children,
  ...props
}) => {
  const anchorProps: MarkdownAnchorProps & {
    rel?: string;
    target?: string;
    href: string;
  } = {
    target: '_blank',
    href: '',
    ...props,
    rel: 'noopener',
  };

  // remove noopener/noreferrer on relative & same origin urls
  if (
    matchesOrigin(anchorProps.href) ||
    !absoluteURLPattern.test(anchorProps.href)
  ) {
    delete anchorProps.rel;
  }

  // in-page links
  if (anchorProps.href.startsWith('#')) {
    delete anchorProps.target;
  }

  return <Anchor {...anchorProps}>{children}</Anchor>;
};
