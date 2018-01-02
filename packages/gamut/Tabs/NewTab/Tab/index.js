import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const updateTab = updateTabIndex => onTabIndexUpdate => e => {
  e.preventDefault();
  updateTabIndex();
  if (onTabIndexUpdate) onTabIndexUpdate();
};

const Tab = ({
  children,
  isActive,
  isDisabled,
  updateTabIndex,
  onTabIndexUpdate,
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
      onClick={updateTab(updateTabIndex)(onTabIndexUpdate)}
      onFocus={updateTab(updateTabIndex)(onTabIndexUpdate)}
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
  onTabIndexUpdate: PropTypes.func,
  updateTabIndex: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  id: PropTypes.string,
};
