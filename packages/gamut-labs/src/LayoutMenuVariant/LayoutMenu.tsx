import {
  Box,
  Flyout,
  Logo,
  StrokeButton,
  WithChildrenProp,
} from '@codecademy/gamut';
import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { AccordionMenu, Section, SectionItem } from './AccordionMenu';
import { LayoutMenuSection } from './LayoutMenuSection';

export interface LayoutMenuProps extends WithChildrenProp {
  /**
   * Accessibility label for the mobile Flyout's close button.
   */
  closeLabel: string;
  /**
   * An array of sections containing the title, slug, and items, each of which will become an accordion. Each item contains a title, slug, and onClick.
   */
  sections: Section[];
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
  /**
   * An array of section items, each of which become an additional link on top of the accordion section.
   */
  topLinkSections?: SectionItem[];
  /**
   * Set fixed height for menu with overflow
   */
  menuHeight?: 'sm' | 'md' | 'lg';
}

const StyleBox = styled(Box)(
  variant({
    prop: 'menuHeight',
    base: {
      borderColor: 'black',
      borderStyleBottom: 'solid',
      borderWidthBottom: '1px',
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingTop: '4px',
      paddingLeft: '4px',
    },
    variants: {
      sm: {
        height: '630px',
      },
      md: {
        height: '1000px',
      },
      lg: {
        height: '1370px',
      },
    },
  })
);

export const LayoutMenu: React.FC<LayoutMenuProps> = ({
  closeLabel,
  sections,
  onSectionToggle,
  mobileButtonText,
  breakpoint = 'lg',
  children,
  topLinkSections,
  menuHeight,
}) => {
  const [expanded, setExpanded] = useState(false);

  const accordionMenuSections = sections.map((section) => (
    <AccordionMenu
      key={section.slug}
      section={section}
      onSectionToggle={onSectionToggle}
      onItemClick={() => setExpanded(false)}
    />
  ));

  const topLinkLayoutMenuSections = topLinkSections && (
    <LayoutMenuSection
      items={topLinkSections}
      onItemClick={() => setExpanded(false)}
      pb={32}
    />
  );

  return (
    <nav>
      <Box display={{ _: 'block', [breakpoint]: 'none' }}>
        <Flyout
          closeLabel={closeLabel}
          expanded={expanded}
          onClose={() => setExpanded(false)}
          title={<Logo mb={32} />}
        >
          <Box px={24}>
            {topLinkLayoutMenuSections}
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
      <StyleBox
        menuHeight={menuHeight}
        display={{ _: 'none', [breakpoint]: 'block' }}
        data-testid="desktop-menu"
      >
        {topLinkLayoutMenuSections}
        {accordionMenuSections}
        {children}
      </StyleBox>
    </nav>
  );
};
