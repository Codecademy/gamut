import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const TabPanel = ({ children, isActive, renderAllPanels, id }) => (
  <div
    id={id}
    aria-labelledby={id.replace('-panel', '')}
    style={{ display: isActive ? 'block' : 'none' }}
    className={s.tabPanel}
  >
    {isActive || renderAllPanels ? children : null}
  </div>
);

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

export default TabPanel;
