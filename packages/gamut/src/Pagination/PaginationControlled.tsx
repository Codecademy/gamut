import {
  MiniChevronLeftIcon,
  MiniChevronRightIcon,
} from '@codecademy/gamut-icons';
import React, { useMemo, useState } from 'react';

import { HiddenText, PaginationProps } from '..';
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

export const PaginationControlled: React.FC<PaginationProps> = ({
  chapterSize = 5,
  isNavigation: navigation,
  onChange,
  pageNumber = 1,
  totalPages,
  type,
  variant = 'stroke',
}) => {
  const showSkipToButtons = !!(
    (type === undefined && totalPages >= 10) ||
    type === 'includeSkipToButtons'
  );

  const currentChapterSize =
    chapterSize > totalPages ? totalPages : chapterSize;

  const firstPageChapter =
    totalPages - pageNumber < currentChapterSize
      ? totalPages - (currentChapterSize - 1)
      : pageNumber;

  const shownPageArray = Array.from(
    Array(currentChapterSize),
    (_, index) => index + firstPageChapter
  );

  const changeShownPages = shouldPagesChange({
    chapterSize,
    currentPage: pageNumber,
    shownPageArray,
    totalPages,
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

  const changeHandler = (pageChange: number) => {
    onChange(pageChange);
  };

  const getLiveText = changeShownPages ? 'updog' : `Current page ${pageNumber}`;

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
      <HiddenText aria-live="polite">{getLiveText}</HiddenText>
      <AnimatedFadeButton
        aria-label={`Navigate back to page ${pageNumber - 1}`}
        direction="back"
        href={navigation}
        icon={MiniChevronLeftIcon}
        onClick={() => changeHandler(pageNumber - 1)}
        showButton={pageNumber === 1 ? 'hidden' : 'shown'}
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
          aria-current={page === pageNumber && 'page'}
          aria-label={`${page === totalPages ? 'Last Page, ' : ''}Page ${page}`}
          href={navigation}
          key={page}
          onClick={() => changeHandler(page)}
          selected={page === pageNumber}
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
        aria-label={`Navigate forward to page ${pageNumber + 1}`}
        as={navigation ? 'a' : undefined}
        direction="forward"
        href={navigation}
        icon={MiniChevronRightIcon}
        onClick={() => changeHandler(pageNumber + 1)}
        showButton={pageNumber === totalPages ? 'hidden' : 'shown'}
        variant={variant}
      />
    </FlexBox>
  );
};
