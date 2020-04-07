import React, { ReactNode } from 'react';
import cx from 'classnames';
import s from './styles/CardShell.module.scss';

const defaultProps = {
  hoverShadow: false,
};

export type CardShellProps = {
  children: ReactNode;
  className?: string;
  hoverShadow?: boolean;
  style?: object;
  id?: string;
  role?: string;
};

export const CardShell = ({
  children,
  hoverShadow,
  className,
  style,
  role,
  id,
}: CardShellProps) => {
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

CardShell.defaultProps = defaultProps;

export default CardShell;
