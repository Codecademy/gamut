import { FlexBox } from '../Box';
import { FillButton } from '../Button';
import { Text } from '../Typography';
import { useControlContext } from './hooks/useListControls';

export const EmptyRows = () => {
  const { onResetQuery } = useControlContext();

  return (
    <FlexBox
      as="tbody"
      bg="background-current"
      left="calc(50% - 160px)"
      p={32}
      position="sticky"
      top="calc(50% - 66px)"
      width="320px"
      zIndex={1}
    >
      <FlexBox as="tr" center column gap={16} width="100%">
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
    </FlexBox>
  );
};
