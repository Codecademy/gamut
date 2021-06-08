import { Box, Logo, StrokeButton } from '@codecademy/gamut';
import React, { useState } from 'react';

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
  /**
   * Text shown in mobile button that opens flyout on click
   */
  mobileButtonText: string;
  /**
   * Whether the mobile button should be full width
   */
  fullWidthButton?: boolean;
  /**
   * Whether or not to show the Codecademy logo at the top of the flyout on mobile
   */
  showLogoOnFlyout?: boolean;
};

export const LayoutMenu: React.FC<LayoutMenuProps> = ({
  sections,
  onSectionToggle,
  onSectionItemClick,
  selectedItem,
  mobileButtonText,
  fullWidthButton = true,
  showLogoOnFlyout,
  children,
}) => {
  const [flyoutOpen, toggleFlyout] = useState<boolean>(false);

  return (
    <nav>
      <Box display={{ _: 'block', lg: 'none' }}>
        <Flyout
          button={
            <StrokeButton
              variant="secondary"
              width={fullWidthButton ? 1 : undefined}
            >
              {mobileButtonText}
            </StrokeButton>
          }
          expanded={flyoutOpen}
          onToggle={() => toggleFlyout(!flyoutOpen)}
        >
          <Box bg="white" height={1} p={16} overflow="scroll">
            {showLogoOnFlyout && <Logo mb={32} />}
            {sections.map((section) => (
              <AccordionMenu
                key={section.slug}
                section={section}
                onSectionToggle={onSectionToggle}
                onSectionItemClick={(
                  item: SectionItem,
                  sectionSlug: string
                ) => {
                  toggleFlyout(!flyoutOpen);
                  onSectionItemClick(item, sectionSlug);
                }}
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
