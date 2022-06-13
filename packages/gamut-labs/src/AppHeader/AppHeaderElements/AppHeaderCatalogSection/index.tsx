import {
  Anchor,
  Box,
  Column,
  FlexBox,
  LayoutGrid,
  Text,
} from '@codecademy/gamut';
import { ColorMode, css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import {
  careerPaths,
  topLanguages,
  topSubjects,
} from '../../../lib/catalogList';
import {
  AppHeaderCatalogDropdownItem,
  AppHeaderCatalogSectionData,
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

const StyledDescription = styled(Text)(
  css({
    // fontSize approved by design
    fontSize: 12 as any,
    lineHeight: `base`,
  })
);

const StyledColumn = styled(Column)(
  css({
    borderBottom: 1,
    borderColor: 'navy-300',
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
  text: 'Explore full catalog →',
  id: 'catalog',
  type: 'text-button',
  href: '/catalog',
  trackingTarget: 'topnav_catalog_explore_full',
};

export const AppHeaderCatalogSection = React.forwardRef<
  HTMLDivElement,
  AppHeaderCatalogSectionProps
>(({ action, item, isOpen, keyDownEvents }, ref) => {
  const tabIndex = isOpen === false ? -1 : 0;
  return (
    <LayoutGrid onKeyDown={keyDownEvents} ref={ref} as="ul" p={0}>
      <StyledColumn size={12} key="Top career paths" as="li">
        <LayoutGrid>
          <Column size={{ xs: 12, md: 4 }}>
            <FlexBox
              data-focusablecatalog="true"
              data-testid="title-description-section"
              tabIndex={-1}
              bg="navy-800"
              color="white"
              flexDirection="column"
              py={16}
              pl={{ _: 16, sm: 64, md: 16 }}
            >
              <Text as="h2" variant="title-xs" mb={8} fontWeight={700}>
                Top career Paths
              </Text>
              <Text fontSize={14} font-weight={400}>
                Land an entry-level role in tech with step-by-step guidance.
              </Text>
            </FlexBox>
          </Column>
          <Column size={{ xs: 12, md: 8 }}>
            <FlexBox
              maxHeight={{
                _: 'none',
                md: '8rem',
              }}
              flexDirection="column"
              flexWrap="wrap"
              py={16}
              pl={{ _: 16, sm: 64, md: 16 }}
            >
              {careerPaths.map((item) => (
                <StyledAnchorBox key={item.id} minWidth="12rem">
                  <Anchor
                    data-focusablecatalog="true"
                    variant="interface"
                    fontFamily="base"
                    fontSize={16}
                    fontWeight={400}
                    href={item.href}
                    onClick={(event) => action(event, item as AppHeaderItem)}
                    tabIndex={tabIndex}
                    maxWidth="170px"
                    lineHeight="title"
                  >
                    {item.text}
                  </Anchor>
                </StyledAnchorBox>
              ))}
            </FlexBox>
          </Column>
        </LayoutGrid>
      </StyledColumn>
      <StyledColumn size={12} key="Popular languages and subjects" as="li">
        <LayoutGrid>
          <Column size={{ xs: 12, md: 4 }}>
            <FlexBox
              data-focusablecatalog="true"
              data-testid="title-description-section"
              tabIndex={-1}
              bg="navy-800"
              color="white"
              flexDirection="column"
              py={16}
              pl={{ _: 16, sm: 64, md: 16 }}
            >
              <Text as="h2" variant="title-xs" mb={8} fontWeight={700}>
                Popular languages and subjects
              </Text>
              <Text fontSize={14} font-weight={400}>
                Find courses in languages or subjects that interest you.
              </Text>
              <ColorMode mode="dark">
                {' '}
                <Anchor
                  variant="standard"
                  fontSize={14}
                  fontWeight={700}
                  textAlign={{ _: 'center', md: 'left' }}
                  href={catalogAnchorData.href}
                  data-focusablecatalog="true"
                  onClick={(event) => action(event, catalogAnchorData)}
                  tabIndex={tabIndex}
                  mt={32}
                >
                  {catalogAnchorData.text}
                </Anchor>{' '}
              </ColorMode>
            </FlexBox>
          </Column>
          <Column size={{ xs: 12, md: 8 }}>
            <FlexBox>
              <FlexBox
                maxHeight={{
                  _: 'none',
                  md: '16rem',
                }}
                flexDirection="column"
                flexWrap="wrap"
                py={16}
                pl={{ _: 16, sm: 64, md: 16 }}
                width="100%"
              >
                <Text
                  data-focusablecatalog="true"
                  as="h3"
                  key={item.id}
                  minWidth="12rem"
                  tabIndex={-1}
                  variant="p-small"
                  color="navy-500"
                >
                  Top Languages
                </Text>
                {topLanguages.map((item) => (
                  <StyledAnchorBox key={item.id} minWidth="12rem">
                    <Anchor
                      data-focusablecatalog="true"
                      variant="interface"
                      fontFamily="base"
                      fontSize={16}
                      fontWeight={400}
                      href={item.href}
                      onClick={(event) => action(event, item as AppHeaderItem)}
                      tabIndex={tabIndex}
                      maxWidth="170px"
                      lineHeight="title"
                    >
                      {item.text}
                    </Anchor>
                  </StyledAnchorBox>
                ))}
              </FlexBox>
              <FlexBox
                maxHeight={{
                  _: 'none',
                  md: '16rem',
                }}
                flexDirection="column"
                flexWrap="wrap"
                py={16}
                pl={{ _: 16, sm: 64, md: 16 }}
              >
                <Text
                  data-focusablecatalog="true"
                  as="h3"
                  key={item.id}
                  minWidth="12rem"
                  tabIndex={-1}
                  variant="p-small"
                  color="navy-500"
                >
                  Top Subjects
                </Text>
                {topSubjects.map((item) => (
                  <StyledAnchorBox key={item.id} minWidth="12rem">
                    <Anchor
                      data-focusablecatalog="true"
                      variant="interface"
                      fontFamily="base"
                      fontSize={16}
                      fontWeight={400}
                      href={item.href}
                      onClick={(event) => action(event, item as AppHeaderItem)}
                      tabIndex={tabIndex}
                      maxWidth="170px"
                      lineHeight="title"
                    >
                      {item.text}
                    </Anchor>
                  </StyledAnchorBox>
                ))}
              </FlexBox>
            </FlexBox>
          </Column>
        </LayoutGrid>
      </StyledColumn>
    </LayoutGrid>
  );
});
