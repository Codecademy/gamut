import * as React from 'react';

import { Box } from '../../Box';
import { Column } from '../../Layout/Column';
import { Text } from '../../Typography/Text';
import { GridFormSectionTitleBaseProps } from '../types';
import { requiredText } from '../utils';

export type GridFormSectionTitleProps = GridFormSectionTitleBaseProps & {
  'data-testid'?: string;
  showRequired?: boolean;
  numberOfFields: number;
};

export const GridFormSectionTitle: React.FC<GridFormSectionTitleProps> = ({
  as = 'h2',
  'data-testid': dataTestId,
  showRequired,
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
      <Box>
        <Text as={as} variant={variant}>
          {title}
        </Text>
        {showRequired && <Text>{requiredText}</Text>}
      </Box>
    </Column>
  );
};
