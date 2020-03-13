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
  const tabLinkClasses = cx(s.tab, className, {
    [s.active]: active,
    [activeClassName]: active && activeClassName !== undefined,
  });
  return (
    <div className={cx(s.tabListItem, className)} role="tab">
      <a
        href={`${id}-panel`}
        id={id}
        className={tabLinkClasses}
        onClick={e => {
          e.preventDefault();

          if (disabled) {
            return;
          }

          onChange(tabIndex);
        }}
        onKeyDown={e => {
          if (disabled) {
            return;
          }

          // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_link_role
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onChange(tabIndex);
          }
        }}
        tabIndex={disabled ? -1 : 0}
      >
        {children}
      </a>
    </div>
  );
};

export default Tab;
