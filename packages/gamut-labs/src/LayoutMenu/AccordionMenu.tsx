import { AccordionArea, AccordionButton, Box, Text } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { SectionItemLink } from './SectionItemLink';
import { SelectedSectionItem } from './SelectedSectionItem';

const StyledAccordionArea = styled(AccordionArea)`
  padding-bottom: ${({ theme }) => theme.spacing[32]};
`;

const StyledAccordionButton = styled(AccordionButton)`
  padding-left: 0;
  justify-content: flex-start;
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
  selectedItem?: string;
};

export const AccordionMenu: React.FC<AccordionMenuProps> = ({
  section,
  onSectionToggle,
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
        <Box key={item.slug} py={8}>
          {selectedItem === item.slug ? (
            <SelectedSectionItem>{item.title}</SelectedSectionItem>
          ) : (
            <SectionItemLink href={item.href} onClick={item.onClick}>
              {item.title}
            </SectionItemLink>
          )}
        </Box>
      ))}
    </StyledAccordionArea>
  );
};
