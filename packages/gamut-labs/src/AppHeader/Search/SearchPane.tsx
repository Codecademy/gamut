import {
  Box,
  ContentContainer,
  FlexBox,
  FocusTrap,
  Text,
  TextButton,
} from '@codecademy/gamut';
import { SearchIcon, SupportIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { camelCase } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import * as React from 'react';

export type SearchPaneProps = {
  onSearch: (query: string) => void;
  onTrackingClick: (target: string) => void;
  toggleSearch: () => void;
};

const searchTerms = [
  'Data Science',
  'Python',
  'Web Development',
  'HTML',
  'Java',
];

const Form = Box.withComponent('form');
const Input = Box.withComponent('input');

const QueryContainer = styled(ContentContainer)(
  css({
    display: 'flex',
    pb: 0,
    pt: 16,
    width: '100%',
  })
);

const SuggestionContainer = styled(ContentContainer)(
  css({
    pb: 24,
    pt: 16,
  })
);

const StyledInput = styled(Input)(
  css({
    outline: `none`,
  })
);

export const SearchPane: React.FC<SearchPaneProps> = ({
  onSearch,
  onTrackingClick,
  toggleSearch,
}) => {
  const theme = useTheme();
  const [value, setValue] = useState('');
  const searchElementRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as Element;
    if (
      searchElementRef.current?.contains(target) ||
      document.querySelector('[data-testid="header-search"]')?.contains(target)
    ) {
      return;
    }

    toggleSearch();
  };

  const navigateToSearch = (searchTerm: string) => {
    onSearch(searchTerm);
    toggleSearch();
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    navigateToSearch(value);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <Box
        aria-hidden
        bg="shadow-black-slight"
        height="100%"
        onClick={toggleSearch}
        position="fixed"
        // We add 5rem here in case there's some sort of branded banner above search
        // The search area is much taller than 5rem so this is a safe amount of padding
        top={`calc(${theme.elements.headerHeight} + 5rem)`}
        width={1}
      />
      <FocusTrap
        onClickOutside={handleOutsideClick}
        onEscapeKey={toggleSearch}
        allowPageInteraction
      >
        <Box
          bg="background"
          borderColorBottom="text"
          borderColorTop="shadow-solid"
          borderStyle="solid"
          borderWidth="2px 0 1px"
          data-testid="header-search-dropdown"
          position="absolute"
          ref={searchElementRef}
          width="100%"
        >
          <Box border="none" width="auto">
            <QueryContainer>
              <FlexBox
                alignItems="baseline"
                borderColor="gray-600"
                borderStyleBottom="solid"
                borderWidthBottom="1px"
                width="100%"
              >
                <SearchIcon color="gray-600" height={24} width={24} />
                <Form
                  action="/search"
                  id="search-form"
                  ml={8}
                  onSubmit={handleSubmit}
                  width="100%"
                >
                  <StyledInput
                    background="none"
                    border="none"
                    color="text"
                    fontSize={34}
                    fontWeight="bold"
                    id="header-search-bar"
                    name="query"
                    onChange={handleChange}
                    onKeyDown={(event) => event.stopPropagation()}
                    placeholder="Search our catalog"
                    ref={inputRef}
                    type="search"
                    value={value}
                    width="100%"
                  />
                </Form>
              </FlexBox>
            </QueryContainer>
          </Box>
          <SuggestionContainer>
            <Text as="h3" fontSize={20} my={16}>
              Popular Searches
            </Text>
            <FlexBox justifyContent="space-between">
              <div>
                {searchTerms.map((searchTerm) => (
                  <TextButton
                    role="link"
                    mr={16}
                    key={searchTerm}
                    onClick={() => {
                      navigateToSearch(searchTerm);
                      onTrackingClick(
                        `popular_search_term_${camelCase(searchTerm)}`
                      );
                    }}
                  >
                    {searchTerm}
                  </TextButton>
                ))}
              </div>
              <TextButton
                href="/help"
                onClick={() => onTrackingClick('help_center')}
              >
                <SupportIcon mr={8} size={20} /> Help Center
              </TextButton>
            </FlexBox>
          </SuggestionContainer>
        </Box>
      </FocusTrap>
    </>
  );
};
