import {
  ArrowChevronLeftIcon,
  ArrowChevronRightIcon,
} from '@codecademy/gamut-icons';
import React, { FC } from 'react';

import {
  ArrowButton,
  Number,
  Page,
  PageNumber,
  PageNumberLoader,
  PageTotalOf,
  PaginationWrapper,
  Total,
} from './styles';
import { ClickableNumberProps, PageTotalProps, PaginationProps } from './types';

const ClickableNumber: FC<ClickableNumberProps> = ({
  value,
  shouldRender = true,
  isCurrent,
  updateFilters,
}) => {
  if (!shouldRender) {
    return null;
  }
  if (isCurrent) {
    return (
      <PageNumber
        size="small"
        onClick={() => updateFilters('page', value)}
        isCurrent
      >
        {' '}
        {value}{' '}
      </PageNumber>
    );
  }
  return (
    <Number size="small" onClick={() => updateFilters('page', value)}>
      {' '}
      {value}{' '}
    </Number>
  );
};

const PageTotal = ({ initial, pageMax, total }: PageTotalProps) =>
  total ? (
    <Total>
      {initial}–{pageMax} <PageTotalOf>of</PageTotalOf> {total}
    </Total>
  ) : (
    <div />
  );

const PaginationB: FC<PaginationProps> = ({
  filters,
  updateFilters,
  pageCount = 0,
  perPage = 25,
  total,
  dataLoading,
}) => {
  if (!filters || !updateFilters) {
    return null;
  }
  const { page = 1 } = filters as { page: number };

  const handlePageDown = () => {
    updateFilters('page', page - 1);
  };

  const handlePageUp = () => {
    updateFilters('page', page + 1);
  };

  const initial = 1 + perPage * (page - 1);
  const pageMax = page === pageCount ? total : perPage * (page - 1) + perPage;

  if (dataLoading) {
    return (
      <PaginationWrapper>
        <PageNumberLoader />
        <PageNumberLoader />
      </PaginationWrapper>
    );
  }
  if (pageCount <= 1) {
    return (
      <PaginationWrapper>
        <PageTotal
          initial={1}
          pageMax={total && total < perPage ? total : pageMax}
          total={total}
        />
      </PaginationWrapper>
    );
  }
  return (
    <PaginationWrapper>
      <PageTotal initial={initial} pageMax={pageMax} total={total} />
      <Page>
        <ArrowButton
          icon={ArrowChevronLeftIcon}
          disabled={page === 1}
          size="small"
          onClick={handlePageDown}
          aria-label="Previous"
        />
        <ClickableNumber
          value={1}
          shouldRender={page > 2}
          updateFilters={updateFilters}
        />
        {page > 3 ? <div>...</div> : null}
        <ClickableNumber
          value={page - 2}
          shouldRender={page === pageCount && page > 3}
          updateFilters={updateFilters}
        />
        <ClickableNumber
          value={page - 1}
          shouldRender={page !== 1}
          updateFilters={updateFilters}
        />
        <ClickableNumber value={page} isCurrent updateFilters={updateFilters} />
        <ClickableNumber
          updateFilters={updateFilters}
          value={page + 1}
          shouldRender={
            page < pageCount - 1 || (pageCount < 3 && page !== pageCount)
          }
        />
        <ClickableNumber
          value={page + 2}
          shouldRender={page === 1 && page > 3}
          updateFilters={updateFilters}
        />
        {page < pageCount - 2 ? <div>…</div> : null}
        <ClickableNumber
          value={pageCount}
          shouldRender={pageCount > 2 && page !== pageCount}
          updateFilters={updateFilters}
        />
        <ArrowButton
          icon={ArrowChevronRightIcon}
          onClick={handlePageUp}
          aria-label="Next"
          size="small"
          disabled={page === pageCount}
        />
      </Page>
    </PaginationWrapper>
  );
};

export default PaginationB;
