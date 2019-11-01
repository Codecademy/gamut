import cx from 'classnames';
import React, { HTMLAttributes } from 'react';

import s from './styles.scss';

export type BadgeProps = {
  rootProps?: HTMLAttributes<HTMLSpanElement>;
};

export const Badge: React.FC<BadgeProps> = ({ children, rootProps = {} }) => {
  const combinedProps = {
    ...rootProps,
    className: cx(s.badge, rootProps.className),
  };

  return <div {...combinedProps}>{children}</div>;
};

export default Badge;
