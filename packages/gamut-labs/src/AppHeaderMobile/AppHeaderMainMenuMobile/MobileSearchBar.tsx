import { Box } from '@codecademy/gamut';
import { SearchIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, { useState } from 'react';

const SearchForm = Box.withComponent('form');

const StyledInput = styled.input`
  background: none;
  border: ${({ theme }) => `1px solid ${theme.colors['gray-800']}`};
  font-size: 1rem;
  outline: none;
  padding-right: 2.5rem;
  padding: 0.75rem;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors['gray-800']};
  }
`;

const SearchButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 0.75rem;
  cursor: pointer;
  outline: 0;
  border: none;
  background-color: transparent;
  padding: 0;
  line-height: 0;
`;

export type MobileSearchBarProps = {
  onSearch: (query: string) => void;
};

export const MobileSearchBar: React.FC<MobileSearchBarProps> = ({
  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    onSearch(searchValue);
  };

  return (
    <SearchForm
      action="/search"
      display="flex"
      id="search-form"
      onSubmit={handleSubmit}
      position="relative"
      py={16}
      width="100%"
    >
      <StyledInput
        name="query"
        type="search"
        placeholder="Search our catalog"
        aria-label="search"
        value={searchValue}
        onChange={handleChange}
      />
      <SearchButton aria-label="Enter search">
        <SearchIcon />
      </SearchButton>
    </SearchForm>
  );
};
