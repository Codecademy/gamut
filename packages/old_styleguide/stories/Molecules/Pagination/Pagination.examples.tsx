import {
  FlexBox,
  FormGroup,
  Input,
  Pagination,
  PaginationProps,
} from '@codecademy/gamut';
import { useCallback, useState } from 'react';
import * as React from 'react';

export const PaginationControlledExample: React.FC<PaginationProps> = (
  props
) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(3);

  const setChangedPage = useCallback(
    (pg) => {
      const page = Number(pg);
      if (page > totalPages) return setPageNumber(1);
      if (page <= 0) return setPageNumber(totalPages);
      if (page !== pageNumber) setPageNumber(page);
    },
    [totalPages, pageNumber, setPageNumber]
  );

  const setChangedTotalPages = useCallback(
    (page) => {
      setTotalPages(Number(page));
    },
    [setTotalPages]
  );

  return (
    <>
      <FlexBox justifyContent="center" mb={24} p={12}>
        <FormGroup label="Current Page" htmlFor="current-page">
          <Input
            label="current page"
            value={pageNumber}
            onChange={(e) => setChangedPage(e.target.value)}
            type="number"
            min={1}
            htmlFor="current-page"
          />
        </FormGroup>
        <FormGroup label="Total Pages" htmlFor="total-pages">
          <Input
            label="total pages"
            value={totalPages}
            onChange={(e) => setChangedTotalPages(e.target.value)}
            type="number"
            min={1}
            htmlFor="total-pages"
          />
        </FormGroup>
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
