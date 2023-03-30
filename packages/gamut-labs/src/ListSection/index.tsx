import { WithChildrenProp } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { Children, useState } from 'react';
import * as React from 'react';

import { PageSection, SectionButton } from '..';

export interface ListSectionProps extends WithChildrenProp {
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

  /**
   * Optional callback function that will be called when the user clicks the "Show All" / "Show less" button.
   * This is usually used for things like metrics tracking.
   */
  onShowAllOrLessClick?: (showAll: boolean) => void;
}

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
  onShowAllOrLessClick,
  children,
}) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    onShowAllOrLessClick?.(!showAll);
    setShowAll(!showAll);
  };

  const renderListItems = () => {
    const listItems = Children.map(
      children,
      (child) => !!child && <StyledListItem>{child}</StyledListItem>
    )?.filter(Boolean);

    if (!listItems) return null;
    if (showAll) return listItems;
    return listItems.slice(0, initialDisplayAmount);
  };

  const renderFooterButton = () => {
    if (Children.toArray(children).length <= initialDisplayAmount) return null;
    const buttonText = `Show ${showAll ? 'Less' : 'All'}`;
    return {
      text: buttonText,
      onClick: handleShowAll,
      'aria-label': `${buttonText}, ${title}`,
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
