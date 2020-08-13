import cx from 'classnames';
import React, { HTMLAttributes } from 'react';

import s from './styles.module.scss';

export type BadgeProps = {
  /** Props to pass directly to the container element */
  rootProps?: HTMLAttributes<HTMLSpanElement>;
};

export const Badge: React.FC<BadgeProps> = ({ children, rootProps = {} }) => {
  const combinedProps = {
    ...rootProps,
    className: cx(s.badge, rootProps.className),
  };

  return <span {...combinedProps}>{children}</span>;
};
