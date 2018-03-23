import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles';

const propTypes = {
  active: PropTypes.bool,
  tabIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const defaultProps = {
  id: '',
  tabIndex: 0,
  onChange: () => {},
};

const Tab = ({ children, active, tabIndex, onChange, id, onClick }) => {
  const tabLinkClasses = cx(s.tab, { [s.active]: active });

  return (
    <li className={s.tabListItem} onClick={onClick}>
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

Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;

export default Tab;
