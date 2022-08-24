import {
  Anchor,
  Box,
  Column,
  FillButton,
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

const StyledAnchorColumn = styled(Column)(
  css({
    pb: 16,
    '&:last-child': {
      pb: 0,
    },
  })
);

const catalogAnchorData: AppHeaderItem = {
  text: 'Explore all courses',
  id: 'catalog',
  type: 'text-button',
  href: '/catalog',
  trackingTarget: 'topnav_catalog_explore_full',
};

const gridTemplate = `
                    'language language subject'
                    'language language subject'
                    'language language subject'
                    'language language subject'
                    'language language subject'
                    'language language subject'`;

const responsiveGridTemplate = `
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
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>,
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

  return (
    <>
      <StyledColumn size={12} key="Popular course topics" as="li">
        <LayoutGrid>
          <Column size={{ xs: 12, lg: 3 }}>
            <Background
              bg="navy-800"
              color="blue-0"
              px={{ _: 16, xs: 32, sm: 64, md: 48, lg: 24 }}
              py={{ _: 16, sm: 32 }}
            >
              <DescriptionSection
                title="Popular course topics"
                subtitle="Find courses in languages or subjects that interest you."
              />
              <FillButton
                mode="dark"
                textAlign={{ _: 'center', md: 'left' }}
                href={catalogAnchorData.href}
                data-focusablecatalog="true"
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => onClick(event, item as AppHeaderItem)}
                tabIndex={tabIndex}
                mt={{ _: 16, lg: 96 }}
                maxWidth={170}
              >
                {catalogAnchorData.text}
              </FillButton>
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
              <Box
                gridArea="language"
                display="grid"
                gridTemplateColumns={{ _: '1fr', lg: 'repeat(3, 1fr)' }}
                gridTemplateRows={{ _: '1fr', lg: 'repeat(6, 1fr)' }}
                gridAutoFlow={{ lg: 'column' }}
              >
                {topLanguages.map((item) => (
                  <Box width="12rem" key={item.id} minHeight={32}>
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
      </StyledColumn>
      {!item.hideCareerPaths && (
        <StyledColumn size={12} key="Top career paths" as="li">
          <LayoutGrid>
            <Column size={{ xs: 12, lg: 3 }}>
              <Background
                bg="navy-800"
                color="blue-0"
                px={{ _: 16, xs: 32, sm: 64, md: 48, lg: 24 }}
                py={{ _: 16, sm: 32 }}
              >
                <DescriptionSection
                  title="Top career paths"
                  subtitle="Choose your career. We'll teach you the skills to get job-ready."
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
      <Column px={{ _: 16, xs: 32, sm: 64, md: 48, lg: 24 }} py={16}>
        <FlexBox
          alignItems={{ _: 'left', lg: 'center' }}
          flexDirection={{ _: 'column', lg: 'row' }}
        >
          Not sure where to begin?
          <Anchor
            variant="standard"
            fontSize={14}
            fontWeight={700}
            textAlign={{ _: 'left', lg: 'center' }}
            // TODO: get correct link
            href={catalogAnchorData.href}
            data-focusablecatalog="true"
            // TODO: get correct tracking data
            onClick={(event) => onClick(event, catalogAnchorData)}
            tabIndex={tabIndex}
            ml={{ _: 0, lg: 16 }}
            pt={{ _: 8, lg: 0 }}
          >
            Take our quiz →
          </Anchor>
          {/* TODO: add image */}
        </FlexBox>
      </Column>
    </>
  );
};
