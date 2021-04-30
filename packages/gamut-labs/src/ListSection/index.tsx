import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { Children, useState } from 'react';

import { PageSection, SectionButton } from '..';

export type ListSectionProps = {
  title: string;
  headerButton?: SectionButton;
  headerSecondaryButton?: SectionButton;
  /**
   * Number of items to be initally displayed
   *
   * @remarks
   * If the initial display amount matches the number of list items, Show All button will not appear.
   */
  initialDisplayAmount?: number;
};

const UnstyledUnorderedList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledListItem = styled.li`
  &:not(:last-child) {
    margin-bottom: ${theme.spacing[24]};
  }
`;

export const ListSection: React.FC<ListSectionProps> = ({
  title,
  headerButton,
  headerSecondaryButton,
  initialDisplayAmount = 3,
  children,
}) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const renderListItems = () => {
    const listItems = Children.map(children, (child) => (
      <StyledListItem>{child}</StyledListItem>
    ));

    if (!listItems) return null;
    if (showAll) return listItems;
    return listItems.slice(0, initialDisplayAmount);
  };

  const renderFooterButton = () => {
    if (Children.toArray(children).length <= initialDisplayAmount) return null;
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
      <UnstyledUnorderedList aria-label={title} aria-live="polite">
        {renderListItems()}
      </UnstyledUnorderedList>
    </PageSection>
  );
};
