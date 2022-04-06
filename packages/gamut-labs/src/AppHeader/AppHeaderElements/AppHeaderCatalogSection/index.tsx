import {
  Anchor,
  Box,
  Column,
  FlexBox,
  LayoutGrid,
  Text,
} from '@codecademy/gamut';
import { pxRem, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { AppHeaderCatalogDropdownItem, AppHeaderClickHandler } from '../types';

export type AppHeaderCatalogSectionProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderCatalogDropdownItem;
  ref?: React.RefObject<HTMLUListElement>;
  role?: string;
  id?: string;
};

const StyledTitle = styled(Text)`
  font-size: ${pxRem(12)};
  font-family: ${theme.fontFamily.accent};
  font-weight: ${theme.fontWeight.title};
  margin-bottom: ${pxRem(6)};
`;

const StyledDescription = styled(Text)`
  font-size: ${pxRem(11)};
  font-family: ${theme.fontFamily.base};
  line-height: ${pxRem(19)};
`;

const StyledSubheader = styled(Text)`
  font-size: ${pxRem(12)};
  font-family: ${theme.fontFamily.base};
  font-weight: ${theme.fontWeight.title};
  color: ${theme.colors['navy-500']};
  line-height: ${pxRem(24)};
  margin-bottom: ${pxRem(2)};
`;

const StyledLinkAnchor = styled(Anchor)`
  font-size: ${pxRem(14)};
  font-family: ${theme.fontFamily.base};
  line-height: ${pxRem(32)};
`;

const StyledColumn = styled(Column)`
  border-bottom: ${theme.borders[1]};
`;

export const AppHeaderCatalogSection = React.forwardRef<
  HTMLDivElement,
  AppHeaderCatalogSectionProps
>(({ action, item }, ref) => (
  <LayoutGrid ref={ref}>
    {item.popover.map((section) => (
      <StyledColumn size={12} key={item.id}>
        <LayoutGrid>
          <Column size={4}>
            <Box background={theme.colors['gray-100']} p={16}>
              <StyledTitle>{section.title}</StyledTitle>
              <StyledDescription>{section.description}</StyledDescription>
            </Box>
          </Column>
          <Column size={8} p={16}>
            <FlexBox
              maxHeight={
                // This is so columns without subheaders stay grouped in threes on desktop
                section.title !== 'Popular courses' ? '7rem' : '8rem'
              }
              flexDirection="column"
              flexWrap="wrap"
            >
              {section.links.map((link) =>
                link.type === 'subheader' ? (
                  <StyledSubheader>{link.text}</StyledSubheader>
                ) : (
                  <Box minWidth="200px" key={item.id}>
                    <StyledLinkAnchor
                      variant="interface"
                      href={link.href}
                      onClick={(event) => action(event, item)}
                    >
                      {link.text}
                    </StyledLinkAnchor>
                  </Box>
                )
              )}
            </FlexBox>
          </Column>
        </LayoutGrid>
      </StyledColumn>
    ))}

    {/* TODO: add onClick event for this */}
    <Column size={12} p={16}>
      <Anchor
        variant="standard"
        href="/catalog"
        fontSize={16}
        fontWeight="bold"
      >
        Explore full catalog
      </Anchor>
    </Column>
  </LayoutGrid>
));
