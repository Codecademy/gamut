import { AccordionArea, Anchor, Box, Text } from '@codecademy/gamut';
import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { system, transitionConcat } from '../../../gamut-styles/dist';
import { SectionItemLink } from './SectionItemLink';
import { SelectedSectionItem } from './SelectedSectionItem';

// this is needed to add a few pixels of extra space for the left side of the focus-visible outline

const StyledAccordionArea = styled(AccordionArea)`
  padding-bottom: ${({ theme }) => theme.spacing[32]};
  position: relative;
`;

const ExpandChevron = styled(MiniChevronDownIcon)(
  system.css({
    transform: 'rotate(0deg)',
    transition: transitionConcat(['transform'], 'slow', 'ease-out'),
  }),
  system.states({
    expanded: { transform: 'rotate(180deg)' },
  })
);

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
        <Anchor
          variant="interface"
          width="max-content"
          px={4}
          onClick={() => {
            onSectionToggle(section.slug);
            setExpanded((prev) => !prev);
          }}
        >
          <Text variant="title-xs">{section.title}</Text>
          <ExpandChevron ml={12} size={14} expanded={expanded} />
        </Anchor>
      }
    >
      {section.items.map((item) => (
        <Box key={item.slug} py={8} px={4}>
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
