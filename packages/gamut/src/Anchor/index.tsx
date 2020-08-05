import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';
import { ChildComponentDescriptor } from '../typings/react';

export type AnchorProps = {
  /**
   * Container element to render as, if not an HTML <a>.
   */
  as?: ChildComponentDescriptor;

  /**
   * Props to pass directly to the container element.
   *
   * @remarks We would love to properly type this with generics, but cannot yet.
   * @see https://github.com/Codecademy/client-modules/pull/270#discussion_r270917147
   * @see https://github.com/Microsoft/TypeScript/issues/21048
   */
  asProps?: any;
};

export const Anchor: React.FC<AnchorProps> = ({
  as: As = 'a',
  asProps = {},
  children,
}) => {
  const combinedProps = {
    ...asProps,
    className: cx(styles.anchor, asProps.className),
  };

  return <As {...combinedProps}>{children}</As>;
};

export default Anchor;
