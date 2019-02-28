import React, { ReactNode, FunctionComponent } from 'react';

const defaultProps = {
  id: '',
};

export type TabPanelProps = {
  active?: boolean;
  children?: ReactNode;
  className?: string;
  id: string;
  renderAllPanels?: boolean;
};

const TabPanel: FunctionComponent<TabPanelProps> = ({
  children,
  active,
  renderAllPanels,
  id,
  className,
}) => (
  <div
    id={id}
    aria-labelledby={id.replace('-panel', '')}
    style={{ display: active ? 'block' : 'none' }}
    className={className}
  >
    {active || renderAllPanels ? children : null}
  </div>
);

TabPanel.defaultProps = defaultProps;

export default TabPanel;
