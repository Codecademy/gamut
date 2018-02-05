import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  id: PropTypes.string.isRequired,
  active: PropTypes.bool,
  renderAllPanels: PropTypes.bool,
};

const defaultProps = {
  id: '',
};

const TabPanel = ({ children, active, renderAllPanels, id }) => (
  <div
    id={id}
    aria-labelledby={id.replace('-panel', '')}
    style={{ display: active ? 'block' : 'none' }}
    className="tabPanel"
  >
    {active || renderAllPanels ? children : null}
  </div>
);

TabPanel.propTypes = propTypes;
TabPanel.defaultProps = defaultProps;

export default TabPanel;
