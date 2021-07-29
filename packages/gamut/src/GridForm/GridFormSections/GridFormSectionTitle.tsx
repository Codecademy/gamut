import React from 'react';

import { Column } from '../../Layout/Column';
import { Text } from '../../Typography/Text';
import { GridFormSectionTitleBaseProps } from '../types';

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
  const size = layout === 'center' ? 12 : layout === 'twoColumn' ? 6 : 3;
  const rowspan = layout === 'center' ? 1 : numberOfFields;

  return (
    <Column
      size={layout !== 'twoColumn' ? { _: 12, md: size } : size}
      gridRowEnd={
        layout !== 'twoColumn'
          ? { _: `span 1`, md: `span ${rowspan}` }
          : `span 1`
      }
    >
      <Text as={as} variant={variant}>
        {title}
      </Text>
    </Column>
  );
};
