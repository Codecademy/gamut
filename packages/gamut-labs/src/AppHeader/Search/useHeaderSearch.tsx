import { SearchIcon } from '@codecademy/gamut-icons';
import React, { useState } from 'react';

import { AnimatedHeaderZone, HeaderIconButton } from '../shared';
import { SearchPane } from './SearchPane';

export type AppHeaderSearch = {
  onEnable: () => void;
  onSearch: (query: string) => void;
  onTrackingClick: (target: string) => void;
  initiallyVisible?: boolean;
};

export const useHeaderSearch = ({
  onEnable,
  onSearch,
  onTrackingClick,
  initiallyVisible,
}: AppHeaderSearch) => {
  const [isSearchVisible, setIsSearchVisible] = useState(!!initiallyVisible);

  const toggleSearch = () => {
    if (!isSearchVisible) {
      onEnable();
    }

    setIsSearchVisible((oldIsSearchVisible) => !oldIsSearchVisible);
  };

  return [
    {
      id: 'search',
      type: 'render-element',
      renderElement: () => (
        <HeaderIconButton
          aria-label="Search Codecademy Content"
          data-testid="header-search"
          onClick={toggleSearch}
          icon={SearchIcon}
        />
      ),
    },
    <AnimatedHeaderZone visible={isSearchVisible}>
      <SearchPane
        onSearch={onSearch}
        onTrackingClick={onTrackingClick}
        toggleSearch={toggleSearch}
      />
    </AnimatedHeaderZone>,
  ] as const;
};
