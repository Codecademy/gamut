import { Box } from '@codecademy/gamut';
import { SearchIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useState } from 'react';
import * as React from 'react';

const SearchForm = Box.withComponent('form');

const StyledInput = styled.input(
  css({
    background: `none`,
    borderWidth: `1px`,
    borderColor: `gray-800`,
    color: `text`,
    fontSize: 16,
    outline: `none`,
    padding: `0.75rem`,
    paddingRight: `2.5rem`,
    width: `100%`,

    '&::placeholder': {
      color: 'text-disabled',
    },
  })
);

const SearchButton = styled.button(
  css({
    position: `absolute`,
    top: `50%`,
    transform: `translate(0, -50%)`,
    right: `0.75rem`,
    color: `text`,
    cursor: `pointer`,
    outline: 0,
    border: `none`,
    backgroundColor: `transparent`,
    p: 0,
    lineHeight: 0,
  })
);

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
