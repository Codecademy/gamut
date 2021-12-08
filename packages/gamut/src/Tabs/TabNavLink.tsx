import React from 'react';

import { TabButton } from './TabButton';

export interface TabNavLinkProps
  extends React.ComponentProps<typeof TabButton> {}

export const TabNavLink: React.FC<TabNavLinkProps> = (props) => {
  return <TabButton {...props} />;
};
