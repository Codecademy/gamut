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
import { TinyBlocks } from '@codecademy/gamut-illustrations';
import { Background, css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import {
  careerPaths,
  topLanguages,
  topSubjects,
} from '../../../lib/catalogList';
import {
  DescriptionSectionContainer,
  LayoutGridAntiAliased,
} from '../../shared';
import {
  AppHeaderCatalogDropdownItem,
  AppHeaderClickHandler,
  AppHeaderItem,
} from '../types';

export type AppHeaderCatalogSectionProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderCatalogDropdownItem;
  ref?: React.RefObject<HTMLUListElement>;
  role?: string;
  id?: string;
  keyDownEvents?: (event: React.KeyboardEvent) => void;
  isOpen?: boolean;
  handleClose?: () => void;
};

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

const quizAnchorData: AppHeaderItem = {
  text: 'Take our quiz',
  id: 'quiz',
  type: 'text-button',
  href: '/explore/sorting-quiz',
  trackingTarget: 'sorting_quiz',
};

const catalogButtonData: AppHeaderItem = {
  text: 'Explore all courses',
  id: 'catalog',
  type: 'text-button',
  href: '/catalog',
  trackingTarget: 'topnav_catalog_explore_full',
};

const gridTemplate = `'language language subject'
                    'language language subject'
                    'language language subject'
                    'language language subject'
                    'language language subject'
                    'language language subject'`;

const responsiveGridTemplate = `'language'
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
                            'space'
                            'subject'
                            'subject'
                            'subject'
                            'subject'
                            'subject'
                            'subject'`;

export const AppHeaderCatalogSection = React.forwardRef<
  HTMLDivElement,
  AppHeaderCatalogSectionProps
>(({ action, item, isOpen, keyDownEvents, handleClose }, ref) => {
  const tabIndex = isOpen === false ? -1 : 0;

  const onClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>,
    linkItem: AppHeaderItem
  ) => {
    handleClose?.();
    return action(event, linkItem);
  };

  const DescriptionSection: React.FunctionComponent<{
    title: string;
    subtitle: string;
  }> = ({ title, subtitle }) => (
    <DescriptionSectionContainer
      data-focusablecatalog="true"
      data-testid="title-description-section"
      tabIndex={-1}
      flexDirection="column"
    >
      <Text as="h2" variant="title-xs" mb={8} fontWeight={700}>
        {title}
      </Text>
      <Text fontSize={14}>{subtitle}</Text>
    </DescriptionSectionContainer>
  );

  return (
    <LayoutGridAntiAliased onKeyDown={keyDownEvents} ref={ref} as="ul" p={0}>
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
                subtitle="Explore free or paid courses in topics that interest you."
              />
              <FillButton
                mode="dark"
                textAlign={{ _: 'center', md: 'left' }}
                href={catalogButtonData.href}
                data-focusablecatalog="true"
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => onClick(event, item as AppHeaderItem)}
                tabIndex={tabIndex}
                mt={{ _: 16, lg: 96 }}
                maxWidth={170}
              >
                {catalogButtonData.text}
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
                gridTemplateColumns={{ _: '1fr', lg: 'repeat(2, 1fr)' }}
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
              <Box
                display={{ _: 'block', lg: 'none' }}
                py={16}
                gridArea="space"
              />
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
          alignItems={{ _: 'flex-start', sm: 'center' }}
          flexDirection={{ _: 'column', sm: 'row' }}
        >
          <FlexBox alignItems="center">
            <Box mr={12}>
              <TinyBlocks aria-hidden height={26} width={26} />
            </Box>
            <Box>Not sure where to begin?</Box>
          </FlexBox>
          <Box>
            <Anchor
              variant="standard"
              fontSize={14}
              fontWeight={700}
              textAlign={{ _: 'left', lg: 'center' }}
              href={quizAnchorData.href}
              data-focusablecatalog="true"
              onClick={(
                event: React.MouseEvent<
                  HTMLAnchorElement | HTMLButtonElement,
                  MouseEvent
                >
              ) => onClick(event, quizAnchorData)}
              tabIndex={tabIndex}
              ml={{ _: 0, sm: 16 }}
              pt={{ _: 8, sm: 0 }}
            >
              {quizAnchorData.text}
              <span aria-hidden>&nbsp;→</span>
            </Anchor>
          </Box>
        </FlexBox>
      </Column>
    </LayoutGridAntiAliased>
  );
});
