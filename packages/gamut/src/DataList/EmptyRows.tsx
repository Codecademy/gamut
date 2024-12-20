import { DotLoose } from '@codecademy/gamut-patterns';

import { FlexBox } from '../Box';
import { FillButton } from '../Button';
import { Text } from '../Typography';
import { useControlContext } from './hooks/useListControls';

export const EmptyRows = () => {
  const { onResetQuery } = useControlContext();

  return (
    <>
      <FlexBox
        as="tr"
        bg="background-current"
        center
        column
        gap={16}
        left="calc(50% - 160px)"
        p={32}
        position="sticky"
        top="calc(50% - 92px)"
        width="320px"
        zIndex={1}
      >
        <th>
          <Text variant="title-sm">No Results Found</Text>
        </th>
        <th>
          <Text variant="p-base">Remove filters to view</Text>
        </th>
        <th>
          <FillButton onClick={onResetQuery}>Reset Filters</FillButton>
        </th>
      </FlexBox>
    </>
  );
};
