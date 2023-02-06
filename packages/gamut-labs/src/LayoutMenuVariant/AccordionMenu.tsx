import { AccordionArea, Anchor, Box, Text } from '@codecademy/gamut';
import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { system, transitionConcat } from '../../../gamut-styles/dist';
import { LayoutMenuSection } from './LayoutMenuSection';

const StyledAccordionArea = styled(AccordionArea)`
  padding-block: ${({ theme }) => theme.spacing[16]};
  position: relative;
  left: -4px;
  border-bottom: 1px solid ${({ theme }) => theme.colors['navy-300']};
`;

const StyledAnchor = styled(Anchor)`
  :hover {
    color: inherit;
  }
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
};

export const AccordionMenu: React.FC<AccordionMenuProps> = ({
  section,
  onSectionToggle,
  onItemClick,
}) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <StyledAccordionArea
      expanded={expanded}
      top={
        <StyledAnchor
          variant="interface"
          pb={12}
          px={4}
          onClick={() => {
            onSectionToggle(section.slug);
            setExpanded((prev) => !prev);
          }}
          aria-expanded={expanded}
          display="flex"
          width="100%"
        >
          <Box display="flex" justifyContent="space-between" width="100%">
            <Text
              variant="p-small"
              style={{ flex: 1, fontWeight: 'bold' }}
              textAlign="left"
            >
              {section.title}
            </Text>
            <ExpandChevron
              ml={12}
              size={16}
              expanded={expanded}
              position="relative"
              top={4}
            />
          </Box>
        </StyledAnchor>
      }
    >
      <LayoutMenuSection items={section.items} onItemClick={onItemClick} />
    </StyledAccordionArea>
  );
};
