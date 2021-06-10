import React from 'react';

import { Column } from '../../Layout/Column';
import { Text } from '../../Typography/Text';
import { GridFormSectionTitleProps } from '../types';

export const GridFormSectionTitle: React.FC<GridFormSectionTitleProps> = ({
  title,
  as = 'h2',
  rowSpan = 1,
  size = 12,
}) => {
  return (
    <Column size={size} rowSpan={rowSpan}>
      <Text as={as}>{title}</Text>
    </Column>
  );
};
