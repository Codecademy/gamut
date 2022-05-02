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
  keyDownEvents?: (event: React.KeyboardEvent) => void;
  isOpen?: boolean;
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
    color: `text-accent`,
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
>(({ action, item, isOpen, keyDownEvents }, ref) => {
  const tabIndex = isOpen === false ? -1 : 0;
  return (
    <LayoutGrid onKeyDown={keyDownEvents} ref={ref} as="ul" p={0}>
      {item.popover.map((section) => (
        <StyledColumn size={12} key={section.title} as="li">
          <LayoutGrid>
            <Column size={{ xs: 12, md: 4 }}>
              <FlexBox
                data-focusablecatalog="true"
                data-testid="title-description-section"
                tabIndex={-1}
                bg="background-selected"
                flexDirection="column"
                py={16}
                pl={{ _: 16, sm: 64, md: 16 }}
              >
                <StyledTitle as="h2">{section.title}</StyledTitle>
                <StyledDescription>{section.description}</StyledDescription>
              </FlexBox>
            </Column>
            <Column size={{ xs: 12, md: 8 }}>
              <FlexBox
                maxHeight={{
                  _: 'none',
                  md: containsSubheaders(section.data) ? '10rem' : '8rem',
                }}
                flexDirection="column"
                flexWrap="wrap"
                py={16}
                pl={{ _: 16, sm: 64, md: 16 }}
              >
                {section.data.map((item) =>
                  item.type === 'subheader' ? (
                    <StyledSubheader
                      data-focusablecatalog="true"
                      as="h3"
                      key={item.id}
                      minWidth="12rem"
                      tabIndex={-1}
                    >
                      {item.text}
                    </StyledSubheader>
                  ) : (
                    <StyledAnchorBox key={item.id} minWidth="12rem">
                      <Anchor
                        data-focusablecatalog="true"
                        variant="interface"
                        fontFamily="base"
                        fontSize={14}
                        href={item.href}
                        onClick={(event) => action(event, item)}
                        tabIndex={tabIndex}
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
          textAlign={{ _: 'center', md: 'left' }}
          href={catalogAnchorData.href}
          data-focusablecatalog="true"
          onClick={(event) => action(event, catalogAnchorData)}
          tabIndex={tabIndex}
        >
          {catalogAnchorData.text}
        </Anchor>
      </Column>
    </LayoutGrid>
  );
});
