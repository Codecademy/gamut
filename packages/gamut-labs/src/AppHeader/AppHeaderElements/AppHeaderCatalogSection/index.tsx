import {
  Anchor,
  Box,
  Column,
  FlexBox,
  LayoutGrid,
  Text,
} from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
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

const StyledTitle = styled(Text)(
  css({
    // fontSize approved by design
    fontSize: 12 as any,
    fontFamily: `accent`,
    fontWeight: `title`,
    mb: 8,
  })
);

const StyledDescription = styled(Text)(
  css({
    // fontSize approved by design
    fontSize: 12 as any,
    lineHeight: `base`,
  })
);

const StyledSubheader = styled(Text)(
  css({
    // fontSize approved by design
    fontSize: 12 as any,
    fontWeight: `title`,
    lineHeight: `base`,
    mb: 12,
    color: `text-disabled`,
  })
);

const StyledColumn = styled(Column)(
  css({
    borderBottom: 1,
  })
);

const StyledAnchorBox = styled(Box)(
  css({
    pb: { _: 16, md: 8 },
    '&:last-child': {
      pb: 0,
    },
    minWidth: 12,
  })
);

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
          <Column size={{ _: 12, md: 4 }}>
            <Box bg="background-selected" p={16}>
              <StyledTitle>{section.title}</StyledTitle>
              <StyledDescription>{section.description}</StyledDescription>
            </Box>
          </Column>
          <Column size={{ _: 12, md: 8 }} p={16}>
            <FlexBox
              maxHeight={{
                _: 'none',
                md: containsSubheaders(section.data) ? '8rem' : '7rem',
              }}
              flexDirection="column"
              flexWrap="wrap"
            >
              {section.data.map((item) =>
                item.type === 'subheader' ? (
                  <StyledSubheader key={item.id}>{item.text}</StyledSubheader>
                ) : (
                  <StyledAnchorBox key={item.id}>
                    <Anchor
                      variant="interface"
                      fontFamily="base"
                      fontSize={14}
                      href={item.href}
                      onClick={(event) => action(event, item)}
                    >
                      {item.text}
                    </Anchor>
                  </StyledAnchorBox>
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
        fontSize={16}
        fontWeight="title"
        href={catalogAnchorData.href}
        onClick={(event) => action(event, catalogAnchorData)}
      >
        {catalogAnchorData.text}
      </Anchor>
    </Column>
  </LayoutGrid>
));
