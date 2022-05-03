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
  const [totalPages, setTotalPages] = useState(3);

  const setChangedPage = useCallback(
    (page) => {
      console.log('changed');
      if (page > totalPages) return setPageNumber(1);
      if (page <= 0) return setPageNumber(totalPages);
      setPageNumber(page);
    },
    [totalPages, setPageNumber]
  );

  const setChangedTotalPages = useCallback(
    (pages) => {
      setTotalPages(pages);
    },
    [setTotalPages]
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
        <InputStepper
          label="Page"
          ariaLabel="Page"
          value={totalPages}
          onChange={setChangedTotalPages}
        />
      </FlexBox>
      <Pagination
        // {...props}
        totalPages={totalPages}
        pageNumber={pageNumber}
        onChange={setChangedPage}
      />
    </>
  );
};
