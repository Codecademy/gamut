import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  id: PropTypes.string.isRequired,
  active: PropTypes.bool,
  renderAllPanels: PropTypes.bool,
};

const TabPanel = ({ children, active, renderAllPanels, id }) => (
  <div
    id={id}
    aria-labelledby={id.replace('-panel', '')}
    style={{ display: active ? 'block' : 'none' }}
    className={s.tabPanel}
  >
    {active || renderAllPanels ? children : null}
  </div>
);

TabPanel.propTypes = propTypes;

export default TabPanel;
