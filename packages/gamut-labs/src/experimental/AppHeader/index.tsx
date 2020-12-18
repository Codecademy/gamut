import { ButtonDeprecated } from '@codecademy/gamut';
import React from 'react';
import { AppHeaderItem } from './types';

export type AppHeaderProps = {
  items: AppHeaderItem[];
};

export const AppHeader: React.FC<AppHeaderProps> = (items) => {
  return <ButtonDeprecated>test</ButtonDeprecated>;
};
