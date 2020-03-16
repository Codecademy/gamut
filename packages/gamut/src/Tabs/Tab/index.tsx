import cx from 'classnames';
import React, { ReactNode, FunctionComponent } from 'react';

import s from './styles.module.scss';

export type TabProps = {
  active?: boolean;
  activeClassName?: string;
  children?: ReactNode;
  className?: string;
  id?: string;
  disabled?: boolean;
  onChange?: (newTabIndex: number) => void;
  tabIndex?: number;
};

export const Tab: FunctionComponent<TabProps> = ({
  active,
  activeClassName,
  children,
  className,
  disabled,
  id,
  onChange = () => {},
  tabIndex = 0,
}: TabProps) => {
  const tabClasses = cx(s.tab, className, {
    [activeClassName]: active && activeClassName,
    [s.active]: active,
    [s.disabled]: disabled,
  });
  return (
    <div
      id={id}
      className={tabClasses}
      aria-selected={active}
      aria-controls={`${id}-panel`}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();

        if (disabled) {
          return;
        }

        onChange(tabIndex);
      }}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (disabled) {
          return;
        }

        // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_link_role
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onChange(tabIndex);
        }
      }}
      role="tab"
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </div>
  );
};

export default Tab;
