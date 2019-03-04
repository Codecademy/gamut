import cx from 'classnames';
import React, { ReactNode, FunctionComponent } from 'react';

import s from './styles/index.scss';

const defaultProps = {
  id: '',
  tabIndex: 0,
  onChange: () => {},
};

export type TabProps = {
  active?: boolean;
  activeClassName?: string;
  children: ReactNode;
  className?: string;
  id: string;
  onChange: (newTabIndex: number) => void;
  tabIndex: number;
};

const Tab: FunctionComponent<TabProps> = ({
  children,
  active,
  tabIndex,
  onChange,
  id,
  className,
  activeClassName,
}) => {
  const tabLinkClasses = cx(s.tab, {
    [s.active]: active,
    [activeClassName]: active && activeClassName !== undefined,
  });
  return (
    <li className={cx(s.tabListItem, className)}>
      <a
        href={`${id}-panel`}
        id={id}
        className={tabLinkClasses}
        onClick={e => {
          e.preventDefault();
          onChange(tabIndex);
        }}
        onKeyDown={e => {
          // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_link_role
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onChange(tabIndex);
          }
        }}
      >
        {children}
      </a>
    </li>
  );
};

Tab.defaultProps = defaultProps;

export default Tab;
