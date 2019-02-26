/* eslint-disable jsx-a11y/anchor-has-content */
import React, { FunctionComponent, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';

declare var __SSR__: boolean;

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

  if (!__SSR__) {
    try {
      const url = new window.URL(props.href, window.location.href);
      // remove noopener/noreferrer on same origin urls
      if (url.origin === window.location.origin) {
        anchorProps.rel = '';
        anchorProps.target = '';
      }
    } catch (e) {
      // Failed to parse url, fall through to default
    }
  }

  return <a {...anchorProps} />;
};

export default Anchor;
