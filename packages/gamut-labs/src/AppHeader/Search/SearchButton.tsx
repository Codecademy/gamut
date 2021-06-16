import { SearchIcon } from '@codecademy/gamut-icons';
import { system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

const SearchIconButton = styled.button(
  system.css({
    backgroundColor: 'transparent',
    pt: 8,
    border: 'transparent',
    '&:hover': {
      color: 'hyper',
      cursor: 'pointer',
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      outline: 'navy',
    },
  })
);

export type SearchProps = {
  toggleSearch: () => void;
};

export const SearchButton: React.FC<SearchProps> = ({ toggleSearch }) => {
  return (
    <SearchIconButton
      aria-label="Search Codecademy Content"
      data-testid="header-search"
      onClick={toggleSearch}
    >
      <SearchIcon size={20} />
    </SearchIconButton>
  );
};
