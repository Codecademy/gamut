import React, { ReactElement, useState } from 'react';

import { PageSection } from '..';

export type ListSectionProps<T> = {
  title: string;
  /**
   * Array of elements.
   */
  listItems: T[];
  /**
   * Render function that will render each element in the list items.
   */
  renderItem: (item: T, index?: number) => ReactElement;
  /**
   * Number of items to be initally displayed (note: if the initial display amount matches the number of list items, Show All button will not appear).
   */
  initialDisplayAmount?: number;
};

export const ListSection = <T extends unknown>({
  title,
  listItems,
  renderItem,
  initialDisplayAmount = 3,
}: ListSectionProps<T>) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const renderItems = () => {
    const displayLimit = showAll ? listItems.length : initialDisplayAmount;
    return listItems.slice(0, displayLimit).map((item) => renderItem(item));
  };

  const renderfooterButton = () => {
    if (listItems.length <= initialDisplayAmount) return null;
    return {
      text: `Show ${showAll ? 'Less' : 'All'}`,
      onClick: handleShowAll,
    };
  };

  return (
    <PageSection title={title} footerButton={renderfooterButton()}>
      {renderItems()}
    </PageSection>
  );
};
