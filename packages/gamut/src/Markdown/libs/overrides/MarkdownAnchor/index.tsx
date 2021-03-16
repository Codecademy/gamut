/* eslint-disable jsx-a11y/anchor-has-content */
import React, { ComponentProps } from 'react';

import { Anchor } from '../../../../Anchor';

export interface MarkdownAnchorProps extends ComponentProps<typeof Anchor> {
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

export const MarkdownAnchor: React.FC<MarkdownAnchorProps> = ({
  children,
  ...props
}) => {
  const anchorProps = {
    ...props,
    target: '_blank',
    rel: 'noopener',
  } as MarkdownAnchorProps & { rel?: string; target?: string };

  // remove noopener/noreferrer on relative & same origin urls
  if (matchesOrigin(props.href) || !absoluteURLPattern.test(props.href)) {
    delete anchorProps.rel;
  }

  return <Anchor {...anchorProps}>{children}</Anchor>;
};
