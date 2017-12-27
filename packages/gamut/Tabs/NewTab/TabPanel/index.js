import React from 'react';
import PropTypes from 'prop-types';

const TabPanel = ({ children, isActive, renderAllPanels, id }) => (
  <div role="tabpanel" id={id} aria-labelledby={id.replace('-panel', '')}>
    {isActive || renderAllPanels ? children : null}
  </div>
);
export default TabPanel;

TabPanel.defaultProps = {};
TabPanel.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  isActive: PropTypes.bool,
  renderAllPanels: PropTypes.bool,
};
