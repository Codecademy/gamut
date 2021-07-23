import React from 'react';

import { Column } from '../../Layout/Column';
import { Text } from '../../Typography/Text';
import { GridFormSectionTitleBaseProps, typeCheckLayout } from '../types';

export type GridFormSectionTitleProps = GridFormSectionTitleBaseProps & {
  numberOfFields: number;
};

export const GridFormSectionTitle: React.FC<GridFormSectionTitleProps> = ({
  title,
  as = 'h2',
  layout = 'center',
  numberOfFields,
  variant,
}) => {
  const size = typeCheckLayout(layout, 'size') ?? layout === 'center' ? 12 : 3;
  const rowspan =
    typeCheckLayout(layout, 'rowspan') ?? layout === 'center'
      ? 1
      : numberOfFields;

  return (
    <Column
      size={{ _: 12, md: size }}
      gridRowEnd={{ _: `span 1`, md: `span ${rowspan}` }}
    >
      <Text as={as} variant={variant}>
        {title}
      </Text>
    </Column>
  );
};
