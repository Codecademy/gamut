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

const DescriptionSection: React.FunctionComponent<{
  title: string;
  subtitle: string;
}> = ({ title, subtitle }) => (
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
      {title}
    </Text>
    <Text fontSize={14} font-weight={400}>
      {subtitle}
    </Text>
  </FlexBox>
);

const CatalogLink: React.Function = ({ item }) => (
  <StyledAnchorBox key={item.id} width="12rem">
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
);

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
            <DescriptionSection
              title="Top career Paths"
              subtitle="Land an entry-level role in tech with step-by-step guidance."
            />
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
                <StyledAnchorBox key={item.id} width="12rem">
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
            <DescriptionSection
              title="Popular languages and subjects"
              subtitle="Find courses in languages or subjects that interest you."
            />

            <ColorMode mode="dark">
              <Anchor
                variant="standard"
                fontSize={14}
                fontWeight={700}
                textAlign={{ _: 'center', md: 'left' }}
                href={catalogAnchorData.href}
                data-focusablecatalog="true"
                onClick={(event) => action(event, catalogAnchorData)}
                tabIndex={tabIndex}
                mt={64}
              >
                {catalogAnchorData.text}
              </Anchor>
            </ColorMode>
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
                width="28rem"
              >
                <Text
                  data-focusablecatalog="true"
                  as="h3"
                  key={item.id}
                  width="12rem"
                  tabIndex={-1}
                  variant="p-small"
                  color="navy-500"
                >
                  Top Languages
                </Text>
                {topLanguages.map((item) => (
                  <StyledAnchorBox key={item.id} width="12rem">
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
                  width="12rem"
                  tabIndex={-1}
                  variant="p-small"
                  color="navy-500"
                >
                  Top Subjects
                </Text>
                {topSubjects.map((item) => (
                  <StyledAnchorBox key={item.id} width="12rem">
                    <Anchor
                      data-focusablecatalog="true"
                      variant="interface"
                      fontFamily="base"
                      fontSize={16}
                      fontWeight={400}
                      href={item.href}
                      onClick={(event) => action(event, item as AppHeaderItem)}
                      tabIndex={tabIndex}
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
