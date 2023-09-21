/* eslint-disable jsx-a11y/anchor-has-content */
import { ComponentProps } from 'react';
import * as React from 'react';

import { AnchorBase } from '../../../../Anchor';

export interface MarkdownAnchorProps extends ComponentProps<typeof AnchorBase> {
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
  } = {
    target: '_blank',
    ...props,
    rel: 'noopener',
  };

  const href = typeof anchorProps.href === 'string' ? anchorProps.href : '';

  // remove noopener/noreferrer on relative & same origin urls
  if (matchesOrigin(href) || !absoluteURLPattern.test(href || '')) {
    delete anchorProps.rel;
  }
  // in-page links
  if (href.startsWith('#')) {
    delete anchorProps.target;
  }

  return <AnchorBase {...anchorProps}>{children}</AnchorBase>;
};
