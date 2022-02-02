import { Box, Logo, StrokeButton } from '@codecademy/gamut';
import { system, variant } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { Flyout } from '../Flyout';
import { AccordionMenu, Section, SectionItem } from './AccordionMenu';
import { LayoutMenuSection } from './LayoutMenuSection';

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
  /**
   * An array of section items, each of which become an additional link on top of the accordion section.
   */
  topLinkSections?: SectionItem[];
  /**
   * Boolean to add vertical overflow to menu
   */
  shouldOverflow?: boolean;
  /**
   * Set fixed height for menu
   */
  height?: 'sm' | 'md' | 'lg';
};

const navHeight = {
  sm: '630px',
  md: '1000px',
  lg: '1370px',
} as const;

const Nav = styled.nav(variance.compose(system.layout));

const StyledNav = styled(Nav)(
  variant({
    variants: {
      overflow: {
        overflowY: 'auto',
        overflowX: 'hidden',
        borderColor: 'black',
        borderStyleBottom: 'solid',
        borderWidthBottom: '1px',
      },
    },
  })
);

export const LayoutMenu: React.FC<LayoutMenuProps> = ({
  closeLabel,
  sections,
  onSectionToggle,
  selectedItem,
  mobileButtonText,
  breakpoint = 'lg',
  children,
  topLinkSections,
  shouldOverflow,
  height,
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

  const topLinkLayoutMenuSections = topLinkSections && (
    <LayoutMenuSection
      items={topLinkSections}
      onItemClick={() => setExpanded(false)}
      selectedItem={selectedItem}
      pb={32}
    />
  );

  return (
    <StyledNav
      variant={shouldOverflow && 'overflow'}
      height={height ? navHeight[height] : 'auto'}
    >
      <Box display={{ _: 'block', [breakpoint]: 'none' }}>
        <Flyout
          closeLabel={closeLabel}
          expanded={expanded}
          onClose={() => setExpanded(false)}
          title={<Logo mb={32} />}
        >
          <Box px={16}>
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
      <Box display={{ _: 'none', [breakpoint]: 'block' }}>
        {topLinkLayoutMenuSections}
        {accordionMenuSections}
        {children}
      </Box>
    </StyledNav>
  );
};
