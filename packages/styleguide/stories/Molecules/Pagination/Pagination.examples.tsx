import { FlexBox, Input, Pagination, PaginationProps } from '@codecademy/gamut';
import { useCallback, useState } from 'react';
import * as React from 'react';

export const PaginationControlledExample: React.FC<PaginationProps> = (
  props
) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(3);

  const setChangedPage = useCallback(
    (page) => {
      if (page > totalPages) return setPageNumber(1);
      if (page <= 0) return setPageNumber(totalPages);
      if (page !== pageNumber) setPageNumber(page);
    },
    [totalPages, pageNumber, setPageNumber]
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
        <Input
          label="page number"
          value={pageNumber}
          onInput={setChangedPage}
          type="number"
        />

        <Input
          label="total pages"
          value={totalPages}
          onChange={setChangedTotalPages}
          type="number"
        />
      </FlexBox>
      <Pagination
        {...props}
        totalPages={totalPages}
        pageNumber={pageNumber}
        onChange={setChangedPage}
      />
    </>
  );
};
