import React from 'react';

import { Box } from '../Box';
import {
  PaginationStrokeButton,
  PaginationTextButton,
} from './PaginationButtons';

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
    <Box>
      <PaginationTextButton selected>1</PaginationTextButton>
      <PaginationTextButton>2</PaginationTextButton> Pagination
      <PaginationStrokeButton selected>1</PaginationStrokeButton>
      <PaginationStrokeButton>2</PaginationStrokeButton> Pagination
    </Box>
  );
};
