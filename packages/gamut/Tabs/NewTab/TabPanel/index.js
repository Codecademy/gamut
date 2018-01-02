import React from 'react';
import PropTypes from 'prop-types';

const TabPanel = ({ children, isActive, renderAllPanels, id }) => (
  <div id={id} aria-labelledby={id.replace('-panel', '')} hidden={!isActive}>
    {isActive || renderAllPanels ? children : null}
  </div>
);
export default TabPanel;

TabPanel.defaultProps = {
  id: '',
};

TabPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  id: PropTypes.string,
  isActive: PropTypes.bool,
  renderAllPanels: PropTypes.bool,
};
