import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  renderAllPanels: PropTypes.bool,
};

const defaultProps = {
  id: '',
};

export type TabPanelProps = {
  active?: boolean;
  children?: ReactNode | ReactNode[];
  className?: string;
  id: string;
  renderAllPanels?: boolean;
};

const TabPanel = ({
  children,
  active,
  renderAllPanels,
  id,
  className,
}: TabPanelProps) => (
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
