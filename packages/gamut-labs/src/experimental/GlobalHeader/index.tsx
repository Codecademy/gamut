import React from 'react';

import { AnimatedGlobalHeader } from './AnimatedGlobalHeader';
import { BasicGlobalHeader } from './BasicGlobalHeader';
import { AnonHeader, FreeHeader, LoadingHeader, ProHeader } from './types';

export type GlobalHeaderProps =
  | AnonHeader
  | FreeHeader
  | ProHeader
  | LoadingHeader;

export const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  return props.animated ? (
    <AnimatedGlobalHeader {...props} />
  ) : (
    <BasicGlobalHeader {...props} />
  );
};
