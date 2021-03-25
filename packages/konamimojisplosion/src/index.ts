import React from 'react';

import { useKonamimojisplosion } from './useKonamimojisplosion';

export type KonamimojisplosionProps = {
  onActivate?: () => void;
};

export const Konamimojisplosion: React.FC<KonamimojisplosionProps> = ({
  onActivate,
}) => {
  useKonamimojisplosion(onActivate);

  return null;
};
