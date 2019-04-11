import cx from 'classnames';
import React, { HTMLAttributes } from 'react';

import s from './styles.scss';

export type BadgeProps = {
  spanProps?: HTMLAttributes<HTMLSpanElement>;
};

export const Badge: React.FC<BadgeProps> = ({ children, spanProps = {} }) => {
  const combinedProps = {
    ...spanProps,
    className: cx(s.className, spanProps.className),
  };

  return (
    <span className={s.badge} {...combinedProps}>
      {children}
    </span>
  );
};

export default Badge;
