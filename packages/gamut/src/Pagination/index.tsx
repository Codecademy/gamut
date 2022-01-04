import {
  MiniChevronLeftIcon,
  MiniChevronRightIcon,
} from '@codecademy/gamut-icons';
import React, { useMemo, useState } from 'react';

import { HiddenText } from '..';
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
   * Number of page buttons to show at once
   */
  chapterSize?: number;
  /**
   * Default initial page number, if none will default to one
   */
  defaultCurrent?: number;
  /**
   * Whether pagination should act as secondary navigation
   */
  navigation?: false;
  /**
   * Called when the page number is changed with the resulting page number as its first argument
   */
  onChange: (arg0: number) => void;
  /**
   *  Basic pagination vs ellipsis variant
   */
  type?: 'basic' | 'ellipsis';
  /**
   *  Stroke or text button style
   */
  variant?: 'stroke' | 'text';
  /**
   * Total number of pages
   */
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  chapterSize = 5,
  defaultCurrent = 1,
  navigation,
  onChange,
  totalPages,
  type = 'basic',
  variant = 'stroke',
}) => {
  const [currentPage, setCurrentPage] = useState(defaultCurrent);
  const [liveText, setLiveText] = useState('');
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
      setLiveText(`Viewing navigation for pages ${shownPageArray[0]} through
          ${
            shownPageArray[shownPageArray.length - 1]
          }, current page ${currentPage}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [changeShownPages]
  );

  const changeHandler = (pageChange: number) => {
    setCurrentPage(pageChange);
    onChange(pageChange);
    setLiveText(`Current page ${pageChange}`);
  };

  return (
    <FlexBox
      alignContent="center"
      as={navigation ? 'nav' : undefined}
      aria-label={
        navigation
          ? `Browse Content By Page, total pages ${totalPages}`
          : `Paginated Navigation, total pages ${totalPages}`
      }
    >
      <HiddenText aria-live="polite">{liveText}</HiddenText>
      {currentPage !== 1 && (
        <PaginationButton
          variant={variant}
          icon={MiniChevronLeftIcon}
          aria-label={`Navigate back to page ${currentPage - 1}`}
          href={navigation}
        />
      )}
      {type === 'ellipsis' && shownPageArray[0] !== 1 && (
        <EllipsisButton
          direction="back"
          onClick={() => changeHandler(backPageNumber)}
          aria-label={`Jump to page ${backPageNumber}`}
          href={navigation}
          variant={variant}
        />
      )}
      {shownPageArray.map((page) => (
        <PaginationButton
          aria-current={page === currentPage && 'page'}
          aria-label={`${page === totalPages ? 'Last Page,' : ''} Page ${page}`}
          key={page}
          variant={variant}
          selected={page === currentPage}
          onClick={() => changeHandler(page)}
          href={navigation}
        >
          {page}
        </PaginationButton>
      ))}
      {type === 'ellipsis' && shownPageArray[chapterSize - 1] !== totalPages && (
        <EllipsisButton
          direction="forward"
          onClick={() => {
            changeHandler(forwardPageNumber);
          }}
          aria-label={`Jump to page ${forwardPageNumber}`}
          href={navigation}
          variant={variant}
        />
      )}
      {currentPage !== totalPages && (
        <PaginationButton
          variant={variant}
          icon={MiniChevronRightIcon}
          aria-label={`Navigate forward to page ${currentPage + 1}`}
          as={navigation ? 'a' : undefined}
          onClick={() => changeHandler(currentPage + 1)}
          href={navigation}
        />
      )}
    </FlexBox>
  );
};
