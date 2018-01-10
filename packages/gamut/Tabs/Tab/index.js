import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles';

const Tab = ({ children, active, updateTabIndex, id }) => {
  const tabLinkClasses = cx(s.tab, { [s.active]: active });

  return (
    <li className={s.tabListItem}>
      <a
        href={`${id}-panel`}
        id={id}
        className={tabLinkClasses}
        onClick={e => {
          e.preventDefault();
          updateTabIndex(e);
        }}
        onKeyDown={e => {
          // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_link_role
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            updateTabIndex(e);
          }
        }}
      >
        {children}
      </a>
    </li>
  );
};

Tab.propTypes = {
  active: PropTypes.bool,
  updateTabIndex: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  id: PropTypes.string,
};

export default Tab;
