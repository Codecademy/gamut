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

import {
  AppHeaderCatalogDropdownItem,
  AppHeaderCatalogSubheaderItem,
  AppHeaderClickHandler,
  AppHeaderItem,
  AppHeaderLinkItem,
} from '../types';

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
  font-size: ${pxRem(12)};
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

const catalogAnchorData: AppHeaderItem = {
  text: 'Explore full catalog',
  id: 'catalog',
  type: 'text-button',
  href: '/catalog',
  trackingTarget: 'topnav_catalog_explore_full',
};

const containsSubheaders = (
  data: (AppHeaderLinkItem | AppHeaderCatalogSubheaderItem)[]
): boolean => {
  return data.some((item) => item.type === 'subheader');
};

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
              maxHeight={containsSubheaders(section.data) ? '8rem' : '7rem'}
              flexDirection="column"
              flexWrap="wrap"
            >
              {section.data.map((item) =>
                item.type === 'subheader' ? (
                  <StyledSubheader key={item.id}>{item.text}</StyledSubheader>
                ) : (
                  <Box minWidth="200px" key={item.id}>
                    <StyledLinkAnchor
                      variant="interface"
                      href={item.href}
                      onClick={(event) => action(event, item)}
                    >
                      {item.text}
                    </StyledLinkAnchor>
                  </Box>
                )
              )}
            </FlexBox>
          </Column>
        </LayoutGrid>
      </StyledColumn>
    ))}

    <Column size={12} p={16}>
      <Anchor
        variant="standard"
        href={catalogAnchorData.href}
        fontSize={16}
        fontWeight="bold"
        onClick={(event) => action(event, catalogAnchorData)}
      >
        {catalogAnchorData.text}
      </Anchor>
    </Column>
  </LayoutGrid>
));
