import {
  MiniChevronLeftIcon,
  MiniChevronRightIcon,
} from '@codecademy/gamut-icons';
import React, { MouseEvent, useMemo, useState } from 'react';

import { FlexBox } from '../Box';
import { EllipsisButton } from './EllipsisButton';
import { PaginationButton } from './PaginationButton';
import {
  getBackPageNumber,
  getForwardPageNumber,
  shouldPagesChange,
} from './utils';

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
   * Called when the page number is changed. Takes the resulting page number as its first argument
   */
  onChange?: (arg0: number) => void;
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

  const changeShownPages = shouldPagesChange({
    chapterSize,
    currentPage,
    shownPageArray,
  });

  const backPageNumber = getBackPageNumber({
    chapterSize,
    shownPageArray,
  });

  const forwardPageNumber = getForwardPageNumber({
    chapterSize,
    shownPageArray,
    totalPages,
  });

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

  const changeHandler = (pageChange: number) => {
    setCurrentPage(pageChange);
    return rest?.onChange && rest?.onChange(pageChange);
  };

  return (
    <FlexBox alignContent="center">
      {currentPage !== 1 && (
        <PaginationButton
          variant={variant}
          icon={MiniChevronLeftIcon}
          onClick={() => changeHandler(currentPage - 1)}
        />
      )}
      {type === 'ellipsis' && shownPageArray[0] !== 1 && (
        <EllipsisButton
          direction="back"
          onClick={() => changeHandler(backPageNumber)}
        />
      )}
      {shownPageArray.map((elem) => (
        <PaginationButton
          variant={variant}
          selected={elem === currentPage}
          onClick={() => changeHandler(elem)}
        >
          {elem}
        </PaginationButton>
      ))}
      {type === 'ellipsis' && shownPageArray[chapterSize - 1] !== totalPages && (
        <EllipsisButton
          direction="forward"
          onClick={() => {
            changeHandler(forwardPageNumber);
          }}
        />
      )}
      {currentPage !== totalPages && (
        <PaginationButton
          variant={variant}
          icon={MiniChevronRightIcon}
          onClick={() => changeHandler(currentPage + 1)}
        />
      )}
    </FlexBox>
  );
};
