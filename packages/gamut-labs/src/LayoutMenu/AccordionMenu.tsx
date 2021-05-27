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
};

export type Section = {
  title: string;
  slug: string;
  items: SectionItem[];
};

export type AccordionMenuProps = {
  section: Section;
  onSectionToggle: (sectionSlug: string) => void;
  onSectionItemClick: (item: SectionItem, sectionSlug: string) => void;
  selectedItem?: string;
};

export const AccordionMenu: React.FC<AccordionMenuProps> = ({
  section,
  onSectionToggle,
  onSectionItemClick,
  selectedItem,
}) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <StyledAccordionArea
      expanded={expanded}
      top={
        <StyledAccordionButton
          expanded={expanded}
          onClick={() => {
            setExpanded(!expanded);
            onSectionToggle(section.slug);
          }}
        >
          <Text variant="title-xs">{section.title}</Text>
        </StyledAccordionButton>
      }
    >
      {section.items.map((item) => {
        if (selectedItem === item.slug) {
          return (
            <Box key={item.slug} py={8}>
              <SelectedSectionItem>{item.title}</SelectedSectionItem>
            </Box>
          );
        }
        return (
          <Box key={item.slug} py={8}>
            <SectionItemLink
              onClick={() => {
                onSectionItemClick(item, section.slug);
              }}
            >
              {item.title}
            </SectionItemLink>
          </Box>
        );
      })}
    </StyledAccordionArea>
  );
};
