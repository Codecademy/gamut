import React from 'react';

import { TabButton, TabProps } from './TabButton';

export interface TabNavLinkProps extends TabProps {}

export const TabNavLink: React.FC<TabNavLinkProps> = (props) => {
  return <TabButton {...props} />;
};
