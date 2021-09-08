import { Box, Logo, StrokeButton } from '@codecademy/gamut';
import React, { useState } from 'react';

import { Flyout } from '../Flyout';
import { AccordionMenu, Section } from './AccordionMenu';

export type LayoutMenuProps = {
  /**
   * Accessibility label for the mobile Flyout's close button.
   */
  closeLabel: string;
  /**
   * An array of sections containing the title, slug, and items, each of which will become an accordion. Each item contains a title, slug, and onClick.
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
   * Text shown in mobile button that opens flyout on click
   */
  mobileButtonText: string;
  /**
   * Breakpoint above which the menu button displays as a full sidebar
   */
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export const LayoutMenu: React.FC<LayoutMenuProps> = ({
  closeLabel,
  sections,
  onSectionToggle,
  selectedItem,
  mobileButtonText,
  breakpoint = 'lg',
  children,
}) => {
  const [expanded, setExpanded] = useState(false);

  const accordionMenuSections = sections.map((section) => (
    <AccordionMenu
      key={section.slug}
      section={section}
      onSectionToggle={onSectionToggle}
      onItemClick={() => setExpanded(false)}
      selectedItem={selectedItem}
    />
  ));

  return (
    <nav>
      <Box display={{ _: 'block', [breakpoint]: 'none' }}>
        <Flyout
          closeLabel={closeLabel}
          expanded={expanded}
          onClose={() => setExpanded(false)}
          title={<Logo mb={32} />}
        >
          <Box px={16}>
            {accordionMenuSections}
            {children}
          </Box>
        </Flyout>
        <StrokeButton
          variant="secondary"
          width={1}
          onClick={() => setExpanded(true)}
        >
          {mobileButtonText}
        </StrokeButton>
      </Box>
      <Box display={{ _: 'none', [breakpoint]: 'block' }}>
        {accordionMenuSections}
        {children}
      </Box>
    </nav>
  );
};
