import { Box, Logo, StrokeButton } from '@codecademy/gamut';
import React, { useState } from 'react';

import { Flyout } from '../Flyout';
import { AccordionMenu, Section } from './AccordionMenu';

export type LayoutMenuProps = {
  /**
   * An array of sections containing the title, slug, and items, each of which will become an accordion. Each item contains a title, slug, slug, and onClick.
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
};

export const LayoutMenu: React.FC<LayoutMenuProps> = ({
  sections,
  onSectionToggle,
  selectedItem,
  mobileButtonText,
  children,
}) => {
  const [flyoutOpen, toggleFlyout] = useState(false);

  return (
    <nav>
      <Box display={{ _: 'block', lg: 'none' }}>
        <Flyout
          button={
            <StrokeButton variant="secondary" width={1}>
              {mobileButtonText}
            </StrokeButton>
          }
          expanded={flyoutOpen}
          onToggle={() =>
            toggleFlyout((currentFlyoutOpen) => !currentFlyoutOpen)
          }
        >
          <Box bg="white" height={1} p={16} overflow="scroll">
            <Logo mb={32} />
            {sections.map((section) => (
              <AccordionMenu
                key={section.slug}
                section={section}
                onSectionToggle={onSectionToggle}
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
            selectedItem={selectedItem}
          />
        ))}
        {children}
      </Box>
    </nav>
  );
};
