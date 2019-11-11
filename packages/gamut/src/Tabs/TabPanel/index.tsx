import React, { ReactNode, FunctionComponent } from 'react';

export type TabPanelProps = {
  active?: boolean;
  children?: ReactNode;
  className?: string;
  id?: string;
  renderAllPanels?: boolean;
};

export const TabPanel: FunctionComponent<TabPanelProps> = ({
  children,
  active,
  renderAllPanels,
  id,
  className,
}) => (
  <div
    id={id}
    aria-labelledby={id.replace('-panel', '')}
    role="tabpanel"
    style={{ display: active ? 'block' : 'none' }}
    className={className}
  >
    {active || renderAllPanels ? children : null}
  </div>
);

export default TabPanel;
