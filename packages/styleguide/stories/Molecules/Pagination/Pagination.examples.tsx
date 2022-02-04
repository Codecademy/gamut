import {
  FlexBox,
  InputStepper,
  Pagination,
  PaginationProps,
} from '@codecademy/gamut';
import React, { useCallback, useState } from 'react';

export const PaginationControlledExample: React.FC<PaginationProps> = (
  props
) => {
  const [controlledPage, setControlledPage] = useState(1);

  const setIndex = useCallback(
    (page) => {
      if (page > props.totalPages) return setControlledPage(1);
      if (page <= 0) return setControlledPage(props.totalPages);
      setControlledPage(page);
    },
    [props.totalPages, setControlledPage]
  );

  return (
    <>
      <FlexBox justifyContent="center" mb={24} p={12}>
        <InputStepper
          label="Page"
          ariaLabel="Page"
          value={controlledPage}
          onChange={setIndex}
        />
      </FlexBox>
      <Pagination {...props} pageNumber={controlledPage} onChange={setIndex} />
    </>
  );
};
