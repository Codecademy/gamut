import {
  MiniChevronLeftIcon,
  MiniChevronRightIcon,
} from '@codecademy/gamut-icons';
import React from 'react';

import { FlexBox } from '../Box';
import { PaginationButton } from './PaginationButton';

interface PaginationProps {
  /**
   * current page number
   */
  current?: number;
  /**
   * Default initial page number
   */
  defaultCurrent?: number;
  /**
   * Called when the page number or pageSize is changed, and it takes the resulting page number as its argument
   */
  onChange?: () => void;
}

export const Pagination: React.FC = () => {
  return (
    <FlexBox alignContent="center">
      <PaginationButton icon={MiniChevronLeftIcon} />
      <PaginationButton selected>1</PaginationButton>
      <PaginationButton>2</PaginationButton> Pagination
      <PaginationButton variant="text" selected>
        1
      </PaginationButton>
      <PaginationButton variant="text">2</PaginationButton>
      <PaginationButton variant="text" icon={MiniChevronRightIcon} />
    </FlexBox>
  );
};
