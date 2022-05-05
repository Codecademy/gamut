import { DotLoose } from '@codecademy/gamut-patterns';
import React from 'react';

import { FlexBox } from '../Box';
import { FillButton } from '../Button';
import { Text } from '../Typography';
import { useControlContext } from './hooks/useListControls';

export const EmptyRows = () => {
  const { onResetQuery } = useControlContext();

  return (
    <>
      <FlexBox
        position="sticky"
        top="calc(50% - 92px)"
        left="calc(50% - 160px)"
        zIndex={1}
        bg="background-current"
        column
        gap={16}
        center
        p={32}
        width="320px"
      >
        <Text variant="title-sm">No Results Found</Text>
        <Text variant="p-base">Remove filters to view</Text>
        <FillButton onClick={onResetQuery}>Reset Filters</FillButton>
      </FlexBox>
      <FlexBox height={409} center width={1}>
        <DotLoose position="absolute" inset={0} top={-2} />
      </FlexBox>
    </>
  );
};
