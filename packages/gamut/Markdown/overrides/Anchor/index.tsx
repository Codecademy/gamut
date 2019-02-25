import React, { FunctionComponent, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';

export interface AnchorProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  title?: string;
  height?: number;
  width?: number;
  target?: string;
  rel?: string;
}

const Anchor: FunctionComponent<AnchorProps> = props => {
  let anchorProps = {
    ...props,
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  if (window && window.URL) {
    const url = new URL(props.href, window.location.href);
    // remove noopener/noreferrer on same origin urls
    if (url.origin === window.location.origin) {
      anchorProps.rel = '';
    }
  }

  return <a {...anchorProps} />;
};

export default Anchor;
