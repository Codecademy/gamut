import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  active: PropTypes.bool,
  renderAllPanels: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  id: '',
};

const TabPanel = ({ children, active, renderAllPanels, id, className }) => (
  <div
    id={id}
    aria-labelledby={id.replace('-panel', '')}
    style={{ display: active ? 'block' : 'none' }}
    className={className}
  >
    {active || renderAllPanels ? children : null}
  </div>
);

TabPanel.propTypes = propTypes;
TabPanel.defaultProps = defaultProps;

export default TabPanel;
