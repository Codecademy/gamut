import React, { ReactNode, FunctionComponent } from 'react';
import cx from 'classnames';

import s from './styles.module.scss';

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
    aria-hidden={!active}
    role="tabpanel"
    className={cx(className, {
      [s.active]: active,
      [s.hidden]: !active,
    })}
  >
    {active || renderAllPanels ? children : null}
  </div>
);

export default TabPanel;
