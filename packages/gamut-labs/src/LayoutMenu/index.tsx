import { Box, StrokeButton } from '@codecademy/gamut';
import React from 'react';

import { Flyout } from '../Flyout';
import { AccordionMenu, Section, SectionItem } from './AccordionMenu';

export type LayoutMenuProps = {
  /**
   * An array of sections including the title, slug, and items, each of which will become an accordion
   */
  sections: Section[];
  /**
   * The slug of the current selected item
   */
  selectedItem?: string;
  /**
   * Callback to be run on click of the accordion button
   */
  onSectionToggle: (sectionSlug: string) => void;
  /**
   * Callback to be run on click of a section item. This should include where the link should go
   */
  onSectionItemClick: (item: SectionItem, sectionSlug: string) => void;
};

export const LayoutMenu: React.FC<LayoutMenuProps> = ({
  sections,
  onSectionToggle,
  onSectionItemClick,
  selectedItem,
  children,
}) => {
  return (
    <nav>
      <Box display={{ _: 'block', lg: 'none' }}>
        <Flyout
          button={<StrokeButton variant="secondary">Catalog Menu</StrokeButton>}
        >
          <Box bg="white" height={1} p={16} overflow="scroll">
            {sections.map((section) => (
              <AccordionMenu
                key={section.slug}
                section={section}
                onSectionToggle={onSectionToggle}
                onSectionItemClick={onSectionItemClick}
                selectedItem={selectedItem}
              />
            ))}
            {children}
          </Box>
        </Flyout>
      </Box>
      <Box display={{ _: 'none', lg: 'block' }}>
        {sections.map((section) => (
          <AccordionMenu
            key={section.slug}
            section={section}
            onSectionToggle={onSectionToggle}
            onSectionItemClick={onSectionItemClick}
            selectedItem={selectedItem}
          />
        ))}
        {children}
      </Box>
    </nav>
  );
};
