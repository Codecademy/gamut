import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import s from './styles/CardShell.module.scss';

const defaultProps = {
  hoverShadow: false,
};

export type CardShellProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Hover effect to show indicate depth and interactivity.
   */
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

export default CardShell;
