import React from 'react';

import { AnimatedGlobalHeader } from './AnimatedGlobalHeader';
import { AnonHeader, FreeHeader, LoadingHeader, ProHeader } from './types';

export type GlobalHeaderProps =
  | AnonHeader
  | FreeHeader
  | ProHeader
  | LoadingHeader;

export const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  return (
    <AnimatedGlobalHeader {...props} data-testid="animated-global-header" />
  );
};
