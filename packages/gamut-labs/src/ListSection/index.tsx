import React, { useState } from 'react';

import { PageSection, SectionButton } from '..';

export type ListSectionProps = {
  title: string;
  children: React.ReactNode[];
  /**
   * Number of items to be initally displayed
   *
   * @remarks
   * If the initial display amount matches the number of list items, Show All button will not appear.
   */
  initialDisplayAmount?: number;
  headerButton?: SectionButton;
  headerSecondaryButton?: SectionButton;
};

export const ListSection: React.FC<ListSectionProps> = ({
  title,
  initialDisplayAmount = 3,
  headerButton,
  headerSecondaryButton,
  children,
}) => {
  const listItems = React.Children.toArray(children);
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const renderItems = () => {
    if (showAll) return listItems;
    return listItems.slice(0, initialDisplayAmount);
  };

  const renderFooterButton = () => {
    if (listItems.length <= initialDisplayAmount) return null;
    return {
      text: `Show ${showAll ? 'Less' : 'All'}`,
      onClick: handleShowAll,
    };
  };

  return (
    <PageSection
      title={title}
      footerButton={renderFooterButton()}
      headerButton={headerButton}
      headerSecondaryButton={headerSecondaryButton}
    >
      {renderItems()}
    </PageSection>
  );
};
