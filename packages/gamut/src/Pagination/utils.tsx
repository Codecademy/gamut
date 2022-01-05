type PaginationUtils = {
  chapterSize: number;
  currentPage: number;
  shownPageArray: number[];
  totalPages: number;
};

export const shouldPagesChange = ({
  chapterSize,
  currentPage,
  shownPageArray,
}: Omit<PaginationUtils, 'totalPages'>) =>
  currentPage < shownPageArray[0] ||
  currentPage > shownPageArray[chapterSize - 1] ||
  shownPageArray[0] === 0;

export const getBackPageNumber = ({
  shownPageArray,
  chapterSize,
}: Omit<PaginationUtils, 'totalPages' | 'currentPage'>) =>
  shownPageArray[0] - chapterSize < 1 ? 1 : shownPageArray[0] - chapterSize;

export const getForwardPageNumber = ({
  chapterSize,
  totalPages,
  shownPageArray,
}: Omit<PaginationUtils, 'currentPage'>) =>
  shownPageArray[0] + chapterSize >= totalPages
    ? totalPages
    : shownPageArray[0] + chapterSize;
