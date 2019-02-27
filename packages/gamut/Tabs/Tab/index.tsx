import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

import s from './styles/index.scss';

const propTypes = {
  active: PropTypes.bool,
  activeClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
};

const defaultProps = {
  id: '',
  tabIndex: 0,
  onChange: () => {},
};

export type TabProps = {
  active?: boolean;
  activeClassName?: string;
  children: ReactNode | ReactNode[];
  className?: string;
  id: string;
  isDisabled?: boolean;
  onChange: (newTabIndex: number) => void;
  tabIndex: number;
};

const Tab = ({
  active,
  activeClassName,
  children,
  className,
  id,
  isDisabled,
  onChange,
  tabIndex,
}: TabProps) => {
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

          if (isDisabled) {
            return;
          }

          onChange(tabIndex);
        }}
        onKeyDown={e => {
          if (isDisabled) {
            return;
          }

          // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_link_role
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onChange(tabIndex);
          }
        }}
        tabIndex={isDisabled ? -1 : 0}
      >
        {children}
      </a>
    </li>
  );
};

Tab.defaultProps = defaultProps;
Tab.propTypes = propTypes;

export default Tab;
