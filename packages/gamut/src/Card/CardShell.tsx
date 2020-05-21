import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import s from './styles/CardShell.module.scss';

const defaultProps = {
  hoverShadow: false,
};

export type CardShellProps = HTMLAttributes<HTMLDivElement> & {
  hoverShadow?: boolean;
};

export const CardShell = React.forwardRef<HTMLDivElement, CardShellProps>(
  ({ children, hoverShadow, className, ...props }, ref) => {
    const shellClasses = cx(
      s.shell,
      {
        [s.hoverShadow]: hoverShadow,
      },
      className
    );

    return (
      <div ref={ref} className={shellClasses} {...props}>
        {children}
      </div>
    );
  }
);

CardShell.defaultProps = defaultProps;
CardShell.displayName = 'CardShell';

export default CardShell;
