import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import s from './styles.module.scss';

export type HeaderTabProps = HTMLAttributes<HTMLElement> & {
  className?: string;
  id?: string;
  testId?: string;
};

export const HeaderTab: React.FC<HeaderTabProps> = ({
  className,
  children,
  id,
  testId,
}) => {
  const classes = cx(s.headerTab, className);

  return (
    <div id={id} className={classes} data-testid={testId}>
      {children}
    </div>
  );
};
