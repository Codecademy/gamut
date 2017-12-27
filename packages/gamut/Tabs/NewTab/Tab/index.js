import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const Tab = ({ children, isActive, isDisabled, updateTabIndex, id }) => (
  <li role="presentation" className={s.tabListItem}>
    <a
      href={`${id}-panel`}
      id={id}
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      aria-controls={`${id}-panel`}
      className={`${s.tab} ${isActive ? s.isActive : ''} ${
        isDisabled ? s.isDisabled : ''
      }`}
      onClick={e => {
        e.preventDefault();
        updateTabIndex();
      }}
    >
      {children}
    </a>
  </li>
);

export default Tab;

Tab.defaultProps = {};
Tab.propTypes = {
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  updateTabIndex: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
