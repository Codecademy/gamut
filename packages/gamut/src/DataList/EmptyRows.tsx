import { DotLoose } from '@codecademy/gamut-patterns';
import React from 'react';

import { FlexBox } from '../Box';
import { FillButton } from '../Button';
import { Text } from '../Typography';
import { useControlContext } from './hooks/useListControls';

export const EmptyRows = () => {
  const { onResetQuery } = useControlContext();

  return (
    <FlexBox position="relative" height={409} center px={96}>
      <DotLoose position="absolute" inset={0} top={-2} />
      <FlexBox
        position="relative"
        zIndex={1}
        bg="background-current"
        width={1}
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
