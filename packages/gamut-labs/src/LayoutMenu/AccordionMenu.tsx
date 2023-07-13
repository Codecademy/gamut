import { AccordionArea, Anchor, Text } from '@codecademy/gamut';
import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import { useState } from 'react';
import * as React from 'react';

import { system, transitionConcat } from '../../../gamut-styles/dist';
import { LayoutMenuSection } from './LayoutMenuSection';

const StyledAccordionArea = styled(AccordionArea)`
  padding-bottom: ${({ theme }) => theme.spacing[32]};
  position: relative;
  left: -4px;
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
          py={12}
          px={4}
          onClick={() => {
            onSectionToggle(section.slug);
            setExpanded((prev) => !prev);
          }}
          aria-expanded={expanded}
          display="flex"
        >
          <Text variant="title-xs" style={{ flex: 1 }} textAlign="left">
            {section.title}
          </Text>
          <ExpandChevron
            ml={12}
            size={14}
            expanded={expanded}
            position="relative"
            top={4}
          />
        </Anchor>
      }
    >
      <LayoutMenuSection
        items={section.items}
        selectedItem={selectedItem}
        onItemClick={onItemClick}
      />
    </StyledAccordionArea>
  );
};
