import { IconButton } from '@codecademy/gamut';
import { SearchIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { SearchPane } from './SearchPane';

export type AppHeaderSearch = {
  onEnable: () => void;
  onSearch: (query: string) => void;
  onTrackingClick: (target: string) => void;
};

const StyledIconButton = styled(IconButton)`
  &:hover {
    background: none;
  }
`;

export const useHeaderSearch = ({
  onEnable,
  onSearch,
  onTrackingClick,
}: AppHeaderSearch) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    if (isSearchVisible) {
      onEnable();
    }

    setIsSearchVisible((oldIsSearchVisible) => !oldIsSearchVisible);
  };

  return [
    {
      id: 'search',
      type: 'render-element',
      renderElement: () => (
        <StyledIconButton
          aria-label="Search Codecademy Content"
          data-testid="header-search"
          onClick={toggleSearch}
          icon={SearchIcon}
        />
      ),
    },
    <SearchPane
      isSearchVisible={isSearchVisible}
      onSearch={onSearch}
      onTrackingClick={onTrackingClick}
      toggleSearch={toggleSearch}
    />,
  ] as const;
};
