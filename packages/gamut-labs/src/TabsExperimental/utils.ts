import { ReactElement } from 'react';
import * as React from 'react';

import { TabPanelExperimental } from './TabPanelExperimental';
import { TabPanelProps } from './types';

export const isTabPanelGuard = (
  child: React.ReactChild
): child is ReactElement<TabPanelProps> =>
  typeof child === 'object' &&
  'type' in child &&
  child.type === TabPanelExperimental;
