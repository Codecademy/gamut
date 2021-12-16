import {
  MiniChevronLeftIcon,
  MiniChevronRightIcon,
} from '@codecademy/gamut-icons';
import React, { useMemo, useState } from 'react';

import { FlexBox } from '../Box';
import { PaginationButton } from './PaginationButton';

interface PaginationProps {
  /**
   * current page number
   */
  current?: number;
  /**
   * Default initial page number, if none will default to one
   */
  defaultCurrent?: number;
  /**
   * Called when the page number or pageSize is changed, and it takes the resulting page number as its argument
   */
  onChange?: () => void;
  /**
   * totalpages
   */
  variant?: 'stroke' | 'text';
  /**
   * totalpages
   */
  totalPages: number;
}

// @to-do :
/**
 * @todo - port ••• + « to change on hover (via contents)
 */
/**
 * @todo - chapterSize
 */
export const Pagination: React.FC<PaginationProps> = ({
  defaultCurrent = 1,
  totalPages,
  variant = 'stroke',
  ...rest
}) => {
  const [currentPage, setCurrentPage] = useState(defaultCurrent);

  const pageCount = useMemo(
    () => Array.from(Array(totalPages), (_, index) => index + 1),
    [totalPages]
  );

  return (
    <>
      <FlexBox alignContent="center">
        <PaginationButton icon={MiniChevronLeftIcon} />
        <PaginationButton showMore="forward" />
        <PaginationButton selected>•••</PaginationButton>
        <PaginationButton selected> « </PaginationButton>
        <PaginationButton selected>1</PaginationButton>
        <PaginationButton>2</PaginationButton> Pagination
        <PaginationButton variant="text">1</PaginationButton>
        <PaginationButton variant="text">2</PaginationButton>
        <PaginationButton variant="text">»</PaginationButton>
        <PaginationButton variant="text">•••</PaginationButton>
        <PaginationButton variant="text" icon={MiniChevronRightIcon} />
      </FlexBox>

      <FlexBox alignContent="center">
        {currentPage !== 1 && (
          <PaginationButton variant={variant} icon={MiniChevronLeftIcon} />
        )}
        {pageCount.map((elem) => (
          <PaginationButton
            variant={variant}
            selected={elem === currentPage}
            onClick={() => setCurrentPage(elem)}
          >
            {elem}
          </PaginationButton>
        ))}
        {currentPage !== totalPages && (
          <PaginationButton variant={variant} icon={MiniChevronRightIcon} />
        )}
      </FlexBox>
    </>
  );
};
