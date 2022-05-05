import { DotLoose } from '@codecademy/gamut-patterns';
import React, { ComponentProps } from 'react';

import { FlexBox } from '../Box';
import { FillButton } from '../Button';
import { List } from '../List';
import { Text } from '../Typography';
import { useControlContext } from './hooks/useListControls';

export interface EmptyRowsProps
  extends Pick<ComponentProps<typeof List>, 'scrollable'> {}

export const EmptyRows = ({ scrollable }) => {
  const { onResetQuery } = useControlContext();

  return (
    <FlexBox position="relative" height={409} center px={96}>
      <DotLoose position="absolute" inset={0} top={-2} />
      <FlexBox
        position={scrollable ? 'fixed' : 'relative'}
        zIndex={1}
        bg="background-current"
        column
        gap={16}
        center
        p={32}
      >
        <Text variant="title-sm">No Results Found</Text>
        <Text variant="p-base">Remove filters to view</Text>
        <FillButton onClick={onResetQuery}>Reset Filters</FillButton>
      </FlexBox>
    </FlexBox>
  );
};
