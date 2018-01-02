import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const updateTab = updateTabIndex => e => {
  e.preventDefault();
  updateTabIndex();
};

const Tab = ({
  children,
  isActive,
  isDisabled,
  updateTabIndex,
  id,
  allCaps,
}) => (
  <li className={s.tabListItem}>
    <a
      href={`${id}-panel`}
      id={id}
      className={`${s.tab} ${isActive ? s.isActive : ''} ${
        isDisabled ? s.isDisabled : ''
      } ${allCaps ? s.allCaps : ''}`}
      onClick={updateTab(updateTabIndex)}
      // onFocus={updateTab(updateTabIndex)}
      onKeyDown={e => {
        // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_link_role
        if (e.key === 'Space' || e.key === 'Enter')
          updateTab(updateTabIndex)(e);
      }}
    >
      {children}
    </a>
  </li>
);

export default Tab;

Tab.defaultProps = {};
Tab.propTypes = {
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  allCaps: PropTypes.bool,
  updateTabIndex: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  id: PropTypes.string,
};
