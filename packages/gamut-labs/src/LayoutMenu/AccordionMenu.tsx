import { AccordionArea, AccordionButton, Box, Text } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { SectionItemLink } from './SectionItemLink';
import { SelectedSectionItem } from './SelectedSectionItem';

const StyledAccordionArea = styled(AccordionArea)`
  padding-bottom: ${({ theme }) => theme.spacing[32]};
  position: relative;
  left: -3px;
`;

const StyledAccordionButton = styled(AccordionButton)`
  padding-left: 0;
  justify-content: flex-start;
  width: max-content;
`;

export type SectionItem = {
  title: string;
  slug: string;
  href: string;
  onClick: (event: React.MouseEvent) => void;
};

export type Section = {
  title: string;
  slug: string;
  items: SectionItem[];
};

export type AccordionMenuProps = {
  section: Section;
  onSectionToggle: (sectionSlug: string) => void;
  onItemClick: () => void;
  selectedItem?: string;
};

export const AccordionMenu: React.FC<AccordionMenuProps> = ({
  section,
  onSectionToggle,
  onItemClick,
  selectedItem,
}) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <StyledAccordionArea
      expanded={expanded}
      top={
        <StyledAccordionButton
          expanded={expanded}
          onClick={() => {
            setExpanded((currentExpanded) => !currentExpanded);
            onSectionToggle(section.slug);
          }}
        >
          <Text variant="title-xs">{section.title}</Text>
        </StyledAccordionButton>
      }
    >
      {section.items.map((item) => (
        <Box key={item.slug} py={8} pl={3 as any}>
          {selectedItem === item.slug ? (
            <SelectedSectionItem>{item.title}</SelectedSectionItem>
          ) : (
            <SectionItemLink
              href={item.href}
              onClick={(event) => {
                item.onClick(event);
                onItemClick();
              }}
            >
              {item.title}
            </SectionItemLink>
          )}
        </Box>
      ))}
    </StyledAccordionArea>
  );
};
