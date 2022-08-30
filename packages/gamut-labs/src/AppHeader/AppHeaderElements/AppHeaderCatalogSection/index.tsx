import {
  Anchor,
  Box,
  Column,
  FlexBox,
  GridBox,
  LayoutGrid,
  Text,
} from '@codecademy/gamut';
import { Background, css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import {
  careerPaths,
  topLanguages,
  topSubjects,
} from '../../../lib/catalogList';
import {
  AppHeaderCatalogDropdownItem,
  AppHeaderClickHandler,
  AppHeaderItem,
  AppHeaderResourcesDropdownItem,
} from '../types';

const StyledColumn = styled(Column)(
  css({
    borderBottom: 1,
    borderColor: 'navy-300',
  })
);

const StyledResponsiveColumn = styled(Column)(
  css({
    borderTop: 1,
    borderColor: 'navy-300',
  })
);

const StyledAnchorColumn = styled(Column)(
  css({
    pb: 16,
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

const gridTemplate = `'languageHeader gap subjectHeader'
                    'language language subject'
                    'language language subject'
                    'language language subject'
                    'language language subject'
                    'language language subject'
                    'language language subject'`;

const responsiveGridTemplate = `'languageHeader'
                            'language'
                            'language'
                            'language'
                            'language'
                            'language'
                            'language'
                            'language'
                            'language'
                            'language'
                            'language'
                            'language'
                            'language'
                            'subjectHeader'
                            'subject'
                            'subject'
                            'subject'
                            'subject'
                            'subject'
                            'subject'`;
export type AppHeaderCatalogSectionProps = {
  action: AppHeaderClickHandler;
  role: string;
  item: AppHeaderCatalogDropdownItem | AppHeaderResourcesDropdownItem;
  isOpen?: boolean;
};

export const AppHeaderCatalogSection: React.FC<AppHeaderCatalogSectionProps> = ({
  action,
  item,
  isOpen,
}) => {
  const tabIndex = isOpen === false ? -1 : 0;

  const onClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    linkItem: AppHeaderItem
  ) => {
    return action(event, linkItem);
  };

  const DescriptionSection: React.FunctionComponent<{
    title: string;
    subtitle: string;
  }> = ({ title, subtitle }) => (
    <FlexBox
      data-focusablecatalog="true"
      data-testid="title-description-section"
      tabIndex={-1}
      flexDirection="column"
    >
      <Text as="h2" variant="title-xs" mb={8} fontWeight={700}>
        {title}
      </Text>
      <Text fontSize={14}>{subtitle}</Text>
    </FlexBox>
  );

  const Subheader: React.FunctionComponent<{ title: string }> = ({ title }) => (
    <Text
      data-focusablecatalog="true"
      as="h3"
      key={item.id}
      width="12rem"
      tabIndex={-1}
      variant="p-small"
      color="navy-700"
      pb={{ _: 16, lg: 8 }}
      fontFamily="accent"
    >
      {title}
    </Text>
  );

  return (
    <>
      {!item.hideCareerPaths && (
        <StyledColumn size={12} key="Top career paths" as="li">
          <LayoutGrid>
            <Column size={{ xs: 12, lg: 3 }}>
              <Background
                bg="navy-800"
                color="blue-0"
                px={{ _: 16, xs: 32, sm: 64, md: 48, lg: 40 }}
                py={{ _: 16, sm: 32 }}
              >
                <DescriptionSection
                  title="Top career paths"
                  subtitle="Land a role in tech with step-by-step guidance."
                />
              </Background>
            </Column>
            <Column size={{ xs: 12, lg: 8 }}>
              <LayoutGrid py={32} pl={{ _: 16, xs: 32, sm: 64, md: 48 }}>
                {careerPaths.map((item) => (
                  <StyledAnchorColumn key={item.id} size={{ _: 12, lg: 4 }}>
                    <Anchor
                      data-focusablecatalog="true"
                      variant="interface"
                      href={item.href}
                      onClick={(
                        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                      ) => onClick(event, item as AppHeaderItem)}
                      tabIndex={tabIndex}
                    >
                      {item.text}
                    </Anchor>
                  </StyledAnchorColumn>
                ))}
              </LayoutGrid>
            </Column>
          </LayoutGrid>
        </StyledColumn>
      )}
      <Column size={12} key="Popular languages and subjects" as="li">
        <LayoutGrid>
          <Column size={{ xs: 12, lg: 3 }}>
            <Background
              bg="navy-800"
              color="blue-0"
              px={{ _: 16, xs: 32, sm: 64, md: 48, lg: 40 }}
              py={{ _: 16, sm: 32 }}
            >
              <DescriptionSection
                title="Popular languages and subjects"
                subtitle="Find courses in languages or subjects that interest you."
              />
              <Anchor
                display={{ _: 'none', lg: 'block' }}
                variant="standard"
                fontSize={14}
                fontWeight={700}
                textAlign={{ _: 'center', md: 'left' }}
                href={catalogAnchorData.href}
                data-focusablecatalog="true"
                onClick={(
                  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                ) => onClick(event, catalogAnchorData)}
                tabIndex={tabIndex}
                mt={96}
                pt={24}
              >
                {catalogAnchorData.text} →
              </Anchor>
            </Background>
          </Column>
          <Column
            size={{ xs: 12, lg: 8 }}
            py={32}
            pl={{ _: 16, xs: 32, sm: 64, md: 48 }}
          >
            <GridBox
              gridTemplateAreas={{
                _: responsiveGridTemplate,
                lg: gridTemplate,
              }}
            >
              <Box gridArea="languageHeader">
                <Subheader title="Top Languages" />
              </Box>
              <Box
                gridArea="language"
                display="grid"
                gridTemplateColumns={{ _: '1fr', lg: 'repeat(2, 1fr)' }}
              >
                {topLanguages.map((item) => (
                  <Box width="12rem" key={item.id} minHeight={36}>
                    <Anchor
                      data-focusablecatalog="true"
                      variant="interface"
                      href={item.href}
                      onClick={(
                        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                      ) => onClick(event, item as AppHeaderItem)}
                      tabIndex={tabIndex}
                    >
                      {item.text}
                    </Anchor>
                  </Box>
                ))}
              </Box>
              <Box pt={{ _: 16, lg: 0 }} gridArea="subjectHeader">
                <Subheader title="Top Subjects" />
              </Box>
              <Box gridArea="subject" display="grid" gridTemplateColumns="1fr">
                {topSubjects.map((item) => (
                  <Box width="12rem" key={item.id} minHeight={36}>
                    <Anchor
                      data-focusablecatalog="true"
                      variant="interface"
                      href={item.href}
                      onClick={(
                        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                      ) => onClick(event, item as AppHeaderItem)}
                      tabIndex={tabIndex}
                    >
                      {item.text}
                    </Anchor>
                  </Box>
                ))}
              </Box>
            </GridBox>
          </Column>
        </LayoutGrid>
      </Column>
      <StyledResponsiveColumn
        size={12}
        p={16}
        display={{ _: 'block', lg: 'none' }}
      >
        <Box textAlign="center">
          <Anchor
            variant="standard"
            fontSize={16}
            fontWeight="title"
            href={catalogAnchorData.href}
            data-focusablecatalog="true"
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
              onClick(event, catalogAnchorData)
            }
            tabIndex={tabIndex}
          >
            {catalogAnchorData.text}
          </Anchor>
        </Box>
      </StyledResponsiveColumn>
    </>
  );
};
