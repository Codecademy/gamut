import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles';

const propTypes = {
  active: PropTypes.bool,
  tabIndex: PropTypes.number.isRequired,
  updateTabIndex: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  id: PropTypes.string.isRequired,
};

const Tab = ({ children, active, tabIndex, updateTabIndex, id }) => {
  const tabLinkClasses = cx(s.tab, { [s.active]: active });

  return (
    <li className={s.tabListItem}>
      <a
        href={`${id}-panel`}
        id={id}
        className={tabLinkClasses}
        onClick={e => {
          e.preventDefault();
          updateTabIndex(tabIndex);
        }}
        onKeyDown={e => {
          // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_link_role
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            updateTabIndex(tabIndex);
          }
        }}
      >
        {children}
      </a>
    </li>
  );
};

Tab.propTypes = propTypes;

export default Tab;
