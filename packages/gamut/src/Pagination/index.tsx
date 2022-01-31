import {
  MiniChevronLeftIcon,
  MiniChevronRightIcon,
} from '@codecademy/gamut-icons';
import React, { useMemo, useState } from 'react';

import { HiddenText } from '..';
import { FlexBox } from '../Box';
import { PaginationButton } from './PaginationButton';
import { EllipsisButton } from './SkipToButtons';
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
   * Whether pagination should act as navigation
   */
  navigation?: boolean;
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

interface ProviderType
  extends Pick<PaginationProps, 'chapterSize' | 'navigation' | 'totalPages'> {
  backPageNumber: number;
  forwardPageNumber: number;
  shownPageArray: number[];
  changeHandler: (pageChange: number) => void;
}

const PaginationContext = React.createContext<ProviderType>({
  backPageNumber: 0,
  chapterSize: 0,
  forwardPageNumber: 0,
  shownPageArray: [0],
  totalPages: 1,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeHandler: () => {},
});

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

  return (
    <PaginationContext.Provider
      value={{
        backPageNumber,
        chapterSize,
        forwardPageNumber,
        navigation,
        shownPageArray,
        totalPages,
        changeHandler,
      }}
    >
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
        <PaginationButton
          aria-label={`Navigate back to page ${currentPage - 1}`}
          href={navigation}
          icon={MiniChevronLeftIcon}
          onClick={() => changeHandler(currentPage - 1)}
          variant={variant}
          showButton={currentPage === 1 ? 'hidden' : 'shown'}
        />
        {type === 'ellipsis' && (
          <EllipsisButton
            aria-label={`Jump to page ${backPageNumber}`}
            direction="back"
            href={navigation}
            onClick={() => changeHandler(backPageNumber)}
            variant={variant}
            showButton={shownPageArray[0] === 1 ? 'hidden' : 'shown'}
          />
        )}
        {shownPageArray.map((page) => (
          <PaginationButton
            aria-current={page === currentPage && 'page'}
            aria-label={`${
              page === totalPages ? 'Last Page, ' : ''
            }Page ${page}`}
            key={page}
            variant={variant}
            selected={page === currentPage}
            onClick={() => changeHandler(page)}
            href={navigation}
          >
            {page}
          </PaginationButton>
        ))}
        {type === 'ellipsis' && (
          <EllipsisButton
            direction="forward"
            onClick={() => {
              changeHandler(forwardPageNumber);
            }}
            aria-label={`Jump to page ${forwardPageNumber}`}
            href={navigation}
            variant={variant}
            showButton={
              shownPageArray[chapterSize - 1] === totalPages
                ? 'hidden'
                : 'shown'
            }
          />
        )}
        {currentPage !== totalPages && (
          <PaginationButton
            aria-label={`Navigate forward to page ${currentPage + 1}`}
            as={navigation ? 'a' : undefined}
            href={navigation}
            icon={MiniChevronRightIcon}
            onClick={() => changeHandler(currentPage + 1)}
            variant={variant}
            showButton={currentPage === totalPages ? 'hidden' : 'shown'}
          />
        )}
      </FlexBox>
    </PaginationContext.Provider>
  );
};
