import * as React from 'react';

import { Box } from '../../Box';
import { FormRequiredText } from '../../Form';
import { Column } from '../../Layout/Column';
import { Text } from '../../Typography/Text';
import {
  GridFormRequiredTextProps,
  GridFormSectionTitleBaseProps,
} from '../types';

export type GridFormSectionTitleProps = GridFormSectionTitleBaseProps &
  GridFormRequiredTextProps & {
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
  requiredTextProps,
  title,
  titleWrapperProps,
  variant,
}) => {
  const size = layout === 'center' ? 12 : 3;
  const rowspan = layout === 'center' ? 1 : numberOfFields;

  return (
    <Column
      data-testid={dataTestId}
      gridRowEnd={{ _: `span 1`, md: `span ${rowspan}` }}
      size={{ _: 12, md: size }}
    >
      <Box {...titleWrapperProps}>
        <Text as={as} variant={variant}>
          {title}
        </Text>
        {showRequired && <FormRequiredText {...requiredTextProps} />}
      </Box>
    </Column>
  );
};
