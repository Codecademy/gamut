import {
  Box,
  ContentContainer,
  FlexBox,
  FocusTrap,
  Text,
  TextButton,
} from '@codecademy/gamut';
import { SearchIcon, SupportIcon } from '@codecademy/gamut-icons';
import { useTheme } from '@emotion/react';
import { camelCase } from 'lodash';
import React, { useRef, useState } from 'react';

import styles from './styles.module.scss';

export type SearchPaneContentsProps = {
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

export const SearchPaneContents: React.FC<SearchPaneContentsProps> = ({
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
    if (searchElementRef.current?.contains(target)) {
      return;
    }

    if (target.closest('header')) {
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

  return (
    <>
      <Box
        onClick={toggleSearch}
        aria-hidden
        position="fixed"
        height="100%"
        top={theme.elements.headerHeight}
        width={1}
        bg="black"
        opacity={0.2}
      />
      <FocusTrap
        onClickOutside={handleOutsideClick}
        onEscapeKey={toggleSearch}
        allowPageInteraction
      >
        <Box
          background="white"
          borderColorBottom="navy"
          borderColorTop="gray-100"
          borderStyle="solid"
          borderWidth="2px 0 1px"
          box-shadow="none"
          data-testid="header-search-dropdown"
          height="auto"
          position="absolute"
          ref={searchElementRef}
          width="100%"
        >
          <Box border="none" width="auto">
            <ContentContainer className={styles.queryContainer}>
              <Box
                alignItems="baseline"
                borderColor="gray-600"
                borderStyleBottom="solid"
                borderWidthBottom="1px"
                display="flex"
                width="100%"
              >
                <SearchIcon
                  color={theme.colors['gray-600']}
                  height={24}
                  width={24}
                />
                <Form
                  action="/search"
                  id="search-form"
                  ml={8}
                  onSubmit={handleSubmit}
                  width="100%"
                >
                  <Input
                    background="none"
                    border="none"
                    className={styles.input}
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
              </Box>
            </ContentContainer>
          </Box>
          <ContentContainer className={styles.suggestionContainer}>
            <Text as="h3" fontSize={20}>
              Popular Searches
            </Text>
            <FlexBox justifyContent="space-between">
              <div className={styles.suggestionButtons}>
                {searchTerms.map((searchTerm) => (
                  <TextButton
                    key={searchTerm}
                    onClick={() => {
                      navigateToSearch(searchTerm);
                      onTrackingClick(
                        `popular_search_term_${camelCase(searchTerm)}`
                      );
                    }}
                    mode="light"
                  >
                    {searchTerm}
                  </TextButton>
                ))}
              </div>
              <TextButton
                href="/help"
                onClick={() => onTrackingClick('help_center')}
              >
                <SupportIcon size={20} /> Help Center
              </TextButton>
            </FlexBox>
          </ContentContainer>
        </Box>
      </FocusTrap>
    </>
  );
};
