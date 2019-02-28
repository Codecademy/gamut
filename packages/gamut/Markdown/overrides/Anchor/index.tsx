/* eslint-disable jsx-a11y/anchor-has-content */
import React, { FunctionComponent, HTMLAttributes } from 'react';

export interface AnchorProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  title?: string;
  height?: number;
  width?: number;
  target?: string;
  rel?: string;
}

const Anchor: FunctionComponent<AnchorProps> = props => {
  const anchorProps = {
    ...props,
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  if (typeof URL !== 'undefined') {
    const url = new URL(props.href, window.location.href);
    // remove noopener/noreferrer on same origin urls
    if (url.origin === window.location.origin) {
      delete anchorProps.rel;
    }
  }

  return <a {...anchorProps} />;
};

export default Anchor;
