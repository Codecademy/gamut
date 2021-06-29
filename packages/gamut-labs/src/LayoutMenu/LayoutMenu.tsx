import { Box, Logo, StrokeButton } from '@codecademy/gamut';
import React, { useRef } from 'react';

import { Flyout } from '../Flyout';
import { AccordionMenu, Section } from './AccordionMenu';

export type LayoutMenuProps = {
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
  sections,
  onSectionToggle,
  selectedItem,
  mobileButtonText,
  breakpoint = 'lg',
  children,
}) => {
  const closeFlyoutRef = useRef(() => {});

  const closeFlyout = () => closeFlyoutRef.current();

  const accordionMenuSections = sections.map((section) => (
    <AccordionMenu
      key={section.slug}
      section={section}
      onSectionToggle={onSectionToggle}
      onItemClick={closeFlyout}
      selectedItem={selectedItem}
    />
  ));

  const renderButton = (onClick: () => void) => (
    <StrokeButton variant="secondary" width={1} onClick={onClick}>
      {mobileButtonText}
    </StrokeButton>
  );

  return (
    <nav>
      <Box display={{ _: 'block', [breakpoint]: 'none' }}>
        <Flyout
          renderButton={renderButton}
          closeFlyoutRef={closeFlyoutRef}
          overflowY="auto"
          overflowX="hidden"
        >
          <Box bg="white" minHeight={1} p={16}>
            <Logo mb={32} />
            {accordionMenuSections}
            {children}
          </Box>
        </Flyout>
      </Box>
      <Box display={{ _: 'none', [breakpoint]: 'block' }}>
        {accordionMenuSections}
        {children}
      </Box>
    </nav>
  );
};
