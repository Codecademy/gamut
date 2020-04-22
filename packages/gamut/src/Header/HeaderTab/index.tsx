import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import ButtonBase from '../../ButtonBase';
import s from './styles.module.scss';

export type HeaderTabProps = HTMLAttributes<HTMLElement> & {
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
  id?: string;
};

export const HeaderTab: React.FC<HeaderTabProps> = ({
  onClick,
  className,
  children,
  id,
}) => {
  const classes = cx(s.headerTab, className);

  return onClick ? (
    <ButtonBase key={id} onClick={onClick} className={classes}>
      {children}
    </ButtonBase>
  ) : (
    <div key={id} className={classes}>
      {children}
    </div>
  );
};

export default HeaderTab;
