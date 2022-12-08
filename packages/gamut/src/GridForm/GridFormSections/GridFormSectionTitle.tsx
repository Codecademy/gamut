import * as React from 'react';

import { Column } from '../../Layout/Column';
import { Text } from '../../Typography/Text';
import { GridFormSectionTitleBaseProps } from '../types';

export type GridFormSectionTitleProps = GridFormSectionTitleBaseProps & {
  numberOfFields: number;
  'data-testid'?: string;
};

export const GridFormSectionTitle: React.FC<GridFormSectionTitleProps> = ({
  as = 'h2',
  'data-testid': dataTestId,
  layout = 'center',
  numberOfFields,
  title,
  variant,
}) => {
  const size = layout === 'center' ? 12 : 3;
  const rowspan = layout === 'center' ? 1 : numberOfFields;

  return (
    <Column
      size={{ _: 12, md: size }}
      gridRowEnd={{ _: `span 1`, md: `span ${rowspan}` }}
      data-testid={dataTestId}
    >
      <Text as={as} variant={variant}>
        {title}
      </Text>
    </Column>
  );
};
