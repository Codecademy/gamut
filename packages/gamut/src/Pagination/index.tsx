import {
  MiniChevronLeftIcon,
  MiniChevronRightIcon,
} from '@codecademy/gamut-icons';
import React, { useMemo, useState } from 'react';

import { FlexBox } from '../Box';
import { EllipsisButton } from './EllipsisButton';
import { PaginationButton } from './PaginationButton';

interface PaginationProps {
  /**
   * chapter size
   */
  chapterSize?: number;
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
  type?: 'basic' | 'ellipsis';
  /**
   * totalpages
   */
  variant?: 'stroke' | 'text';
  /**
   * totalpages
   */
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  chapterSize = 5,
  defaultCurrent = 1,
  totalPages,
  type = 'basic',
  variant = 'stroke',
  ...rest
}) => {
  const [currentPage, setCurrentPage] = useState(defaultCurrent);
  const [shownPageArray, setShownPageArray] = useState([0]);

  const changeShownPages =
    currentPage < shownPageArray[0] ||
    currentPage > shownPageArray[chapterSize - 1] ||
    shownPageArray[0] === 0;

  useMemo(
    () => {
      const firstPageChapter =
        totalPages - currentPage < chapterSize
          ? totalPages - (chapterSize - 1)
          : currentPage;
      setShownPageArray(
        Array.from(Array(chapterSize), (_, index) => index + firstPageChapter)
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [changeShownPages]
  );

  const backPageNumber =
    shownPageArray[0] - chapterSize < 1 ? 1 : shownPageArray[0] - chapterSize;

  const forwardPageNumber =
    shownPageArray[chapterSize - 1] + chapterSize > totalPages
      ? totalPages
      : shownPageArray[chapterSize - 1] + chapterSize;

  return (
    <>
      <FlexBox justifyContent="left" alignContent="center">
        <PaginationButton icon={MiniChevronLeftIcon} />
        <EllipsisButton direction="back">•••</EllipsisButton>
        <PaginationButton>2</PaginationButton> Pagination
        <PaginationButton variant="text">1</PaginationButton>
        <PaginationButton variant="text">2</PaginationButton>
        <EllipsisButton variant="text" direction="forward">
          •••
        </EllipsisButton>
        <PaginationButton variant="text" icon={MiniChevronRightIcon} />
      </FlexBox>

      <FlexBox alignContent="center">
        {currentPage !== 1 && (
          <PaginationButton
            variant={variant}
            icon={MiniChevronLeftIcon}
            onClick={() => setCurrentPage(currentPage - 1)}
          />
        )}
        {shownPageArray[0] !== 1 && (
          <EllipsisButton
            direction="back"
            onClick={() => setCurrentPage(backPageNumber)}
          />
        )}
        {shownPageArray.map((elem) => (
          <PaginationButton
            variant={variant}
            selected={elem === currentPage}
            onClick={() => setCurrentPage(elem)}
          >
            {elem}
          </PaginationButton>
        ))}
        {shownPageArray[chapterSize - 1] !== totalPages && (
          <EllipsisButton
            direction="forward"
            onClick={() => {
              setCurrentPage(forwardPageNumber);
            }}
          />
        )}
        {currentPage !== totalPages && (
          <PaginationButton
            variant={variant}
            icon={MiniChevronRightIcon}
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        )}
      </FlexBox>
    </>
  );
};
