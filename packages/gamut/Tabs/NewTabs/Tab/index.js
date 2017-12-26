import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'react-tabs';
import s from './styles';

const GamutTab = props => (
  <Tab
    className={s.tab}
    selectedClassName={s.selected}
    disabledClassName={s.disabled}
  >
    {props.children}
  </Tab>
);
export default GamutTab;

Tab.defaultProps = {};
Tab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
