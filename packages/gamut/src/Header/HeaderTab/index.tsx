import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
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
  const handleClick = (e: any) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  const classes = cx(s.headerTab, className);

  return (
    <div
      role="tab"
      tabIndex={0}
      key={id}
      onClick={handleClick}
      className={classes}
      onKeyDown={(e: React.KeyboardEvent) => {
        // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_link_role
        if (e.key === ' ' || e.key === 'Enter') {
          handleClick(e);
        }
      }}
    >
      {children}
    </div>
  );
};

export default HeaderTab;
