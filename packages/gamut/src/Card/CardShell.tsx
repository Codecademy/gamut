import React from 'react';
import cx from 'classnames';
import s from './styles/CardShell.module.scss';

export type CardShellProps = {
  className?: string;
  hoverShadow?: boolean;
  style?: object;
  id?: string;
  role?: string;
};

export const CardShell: React.FC<CardShellProps> = ({
  children,
  hoverShadow,
  className,
  style,
  role,
  id,
}) => {
  const shellClasses = cx(
    s.shell,
    {
      [s.hoverShadow]: hoverShadow,
    },
    className
  );

  return (
    <div className={shellClasses} {...{ style, role, id }}>
      {children}
    </div>
  );
};

export default CardShell;
