import React from 'react';

import { Column } from '../../Layout/Column';
import { Text } from '../../Typography/Text';

export type GridFormSectionProps = {
  fields: any;
  showRequired: boolean;
  pastFirstError: boolean;
};

export const GridFormSectionTitle: React.FC<GridFormSectionProps> = ({
  as,
  showRequired,
  pastFirstError,
}) => {
  return <Column size={12}>'tbd'</Column>;
};
