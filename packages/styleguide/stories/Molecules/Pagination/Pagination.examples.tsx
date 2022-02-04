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
  const [pageNumber, setPageNumber] = useState(1);

  const setChangedPage = useCallback(
    (page) => {
      if (page > props.totalPages) return setPageNumber(1);
      if (page <= 0) return setPageNumber(props.totalPages);
      setPageNumber(page);
    },
    [props.totalPages, setPageNumber]
  );

  return (
    <>
      <FlexBox justifyContent="center" mb={24} p={12}>
        <InputStepper
          label="Page"
          ariaLabel="Page"
          value={pageNumber}
          onChange={setChangedPage}
        />
      </FlexBox>
      <Pagination
        {...props}
        pageNumber={pageNumber}
        onChange={setChangedPage}
      />
    </>
  );
};
