import {
  MiniChevronLeftIcon,
  MiniChevronRightIcon,
} from '@codecademy/gamut-icons';
import React, { useMemo, useState } from 'react';

import { HiddenText } from '..';
import { FlexBox } from '../Box';
import {
  AnimatedFadeButton,
  AnimatedSlideButton,
} from './AnimatedPaginationButtons';
import { EllipsisButton } from './EllipsisButton';
import { PaginationButton } from './PaginationButton';
import { hideOnMobile } from './styles';
import {
  getBackPageNumber,
  getForwardPageNumber,
  getMinWidth,
  shouldPagesChange,
} from './utils';

export interface PaginationProps {
  /**
   * Number of page buttons to show at once
   */
  chapterSize?: number;
  /**
   * Default initial page number, if none will default to one
   */
  defaultPageNumber?: number;
  /**
   * Whether pagination should act as standard link-based navigation.
   */
  isNavigation?: boolean;
  /**
   * Called when the page number is changed with the resulting page number as its first argument
   */
  onChange: (arg0: number) => void;
  /**
   * Controlled page number
   */
  pageNumber?: number;
  /**
   * Total number of pages
   */
  totalPages: number;
  /**
   *  Basic pagination vs ellipsis types, will default to basic if under 10 pages unless specified.
   */
  type?: 'basic' | 'includeSkipToButtons';
  /**
   *  Stroke or text button style
   */
  variant?: 'stroke' | 'text';
}

export const Pagination: React.FC<PaginationProps> = ({
  chapterSize = 5,
  defaultPageNumber = 1,
  isNavigation: navigation,
  onChange,
  pageNumber,
  totalPages,
  type,
  variant = 'stroke',
}) => {
  const [currentPage, setCurrentPage] = useState(
    pageNumber ?? defaultPageNumber
  );
  const [liveText, setLiveText] = useState('');
  const [shownPageArray, setShownPageArray] = useState([0]);

  const showSkipToButtons = !!(
    (type === undefined && totalPages >= 10) ||
    type === 'includeSkipToButtons'
  );

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
      const currentChapterSize =
        chapterSize > totalPages ? totalPages : chapterSize;

      const firstPageChapter =
        totalPages - currentPage < currentChapterSize
          ? totalPages - (currentChapterSize - 1)
          : currentPage;

      setShownPageArray(
        Array.from(
          Array(currentChapterSize),
          (_, index) => index + firstPageChapter
        )
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

  useMemo(() => {
    if (pageNumber) changeHandler(pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <FlexBox
      as={navigation ? 'nav' : undefined}
      aria-label={
        navigation
          ? `Browse Content By Page, total pages ${totalPages}`
          : `Paginated Navigation, total pages ${totalPages}`
      }
      justifyContent="center"
      minWidth={{
        _: 'initial',
        sm: `${showSkipToButtons ? getMinWidth({ chapterSize }) : 'initial'}`,
      }}
    >
      <HiddenText aria-live="polite">{liveText}</HiddenText>
      <AnimatedFadeButton
        aria-label={`Navigate back to page ${currentPage - 1}`}
        direction="back"
        href={navigation}
        icon={MiniChevronLeftIcon}
        onClick={() => changeHandler(currentPage - 1)}
        showButton={currentPage === 1 ? 'hidden' : 'shown'}
        variant={variant}
      />
      {showSkipToButtons && (
        <>
          <AnimatedSlideButton
            aria-label="Jump back to page 1"
            direction="back"
            display={hideOnMobile}
            href={navigation}
            onClick={() => changeHandler(1)}
            showButton={shownPageArray[0] === 1 ? 'hidden' : 'shown'}
            variant={variant}
          >
            1
          </AnimatedSlideButton>
          <EllipsisButton
            aria-label={`Jump back to page ${backPageNumber}`}
            direction="back"
            display={hideOnMobile}
            href={navigation}
            onClick={() => changeHandler(backPageNumber)}
            variant={variant}
            showButton={shownPageArray[0] === 1 ? 'hidden' : 'shown'}
          />
        </>
      )}
      {shownPageArray.map((page) => (
        <PaginationButton
          aria-current={page === currentPage && 'page'}
          aria-label={`${page === totalPages ? 'Last Page, ' : ''}Page ${page}`}
          href={navigation}
          key={page}
          onClick={() => changeHandler(page)}
          selected={page === currentPage}
          variant={variant}
        >
          {page}
        </PaginationButton>
      ))}
      {showSkipToButtons && (
        <>
          <EllipsisButton
            aria-label={`Jump forward to page ${forwardPageNumber}`}
            display={hideOnMobile}
            direction="forward"
            onClick={() => {
              changeHandler(forwardPageNumber);
            }}
            href={navigation}
            showButton={
              shownPageArray[chapterSize - 1] === totalPages
                ? 'hidden'
                : 'shown'
            }
            variant={variant}
          />
          <AnimatedSlideButton
            aria-label={`Jump forward to last page, page ${totalPages}`}
            direction="forward"
            display={hideOnMobile}
            href={navigation}
            onClick={() => changeHandler(totalPages)}
            showButton={
              shownPageArray[chapterSize - 1] === totalPages
                ? 'hidden'
                : 'shown'
            }
            variant={variant}
          >
            {totalPages}
          </AnimatedSlideButton>
        </>
      )}
      <AnimatedFadeButton
        aria-label={`Navigate forward to page ${currentPage + 1}`}
        as={navigation ? 'a' : undefined}
        direction="forward"
        href={navigation}
        icon={MiniChevronRightIcon}
        onClick={() => changeHandler(currentPage + 1)}
        showButton={currentPage === totalPages ? 'hidden' : 'shown'}
        variant={variant}
      />
    </FlexBox>
  );
};
