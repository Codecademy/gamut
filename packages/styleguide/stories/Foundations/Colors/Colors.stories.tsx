import React from 'react';
import cx from 'classnames';
import { startCase } from 'lodash';

import {
  brandColors,
  colors,
  deprecatedColors,
  editorColors,
  deprecatedGamutColors,
} from '@codecademy/gamut-styles/utils/variables';
import {
  LayoutGrid,
  Column,
  VisualTheme,
  Container,
  Heading,
} from '@codecademy/gamut/src';

import {
  decoratedStories,
  decoratedStory,
  StoryTemplate,
  StoryStatus,
  StoryDescription,
} from '../../Templating';
import styles from './styles.module.scss';
import { Swatch, SwatchPalette, parseCamelCase, objectKeys } from './Elements';

export default decoratedStories('Foundations', 'Colors');

const baseColors = {
  black: colors.black,
  white: colors.white,
};

const excludedColors = ['black', 'white', 'beige', 'royalBlue'];

export const Colors = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready} wide>
    <StoryDescription>
      Brand color atoms we select from in creating designs. All colors seen on
      Codecademy properties should adhere to these. Remember your accessibility
      contrast requirements too!
      <br />
      The most visually distinct colors associated with our brand are
      unsurprisingly referred to as "brand" colors. These are commonly used on
      buttons and as vibrant background colors.
    </StoryDescription>
    <LayoutGrid className={styles.swatchesContainer} rowGap="md" columnGap="md">
      {objectKeys(brandColors).map((color) => (
        <Column key={color} size={{ xs: 6, sm: 3 }}>
          <Container flex={false}>
            <Heading as="h2" fontSize="xs">
              Brand {startCase(color)}
            </Heading>
            <Swatch
              name={`color-${parseCamelCase(color)}`}
              hex={brandColors[color]}
            />
          </Container>
        </Column>
      ))}
    </LayoutGrid>
    <LayoutGrid className={styles.swatchesContainer} rowGap="md" columnGap="md">
      {objectKeys(baseColors).map((color) => (
        <Column key={color} size={{ xs: 6, sm: 3 }}>
          <Container flex={false}>
            <Heading as="h2" fontSize="xs">
              {parseCamelCase(`color-${color}`)}
            </Heading>
            <Swatch
              name={`color-${parseCamelCase(color)}`}
              hex={baseColors[color]}
            />
          </Container>
        </Column>
      ))}
    </LayoutGrid>
    <LayoutGrid className={styles.swatchesContainer} rowGap="md" columnGap="md">
      {objectKeys(colors)
        .filter((color) => !excludedColors.includes(color))
        .map((color) => (
          <Column key={color} size={{ xs: 6, sm: 3 }}>
            <Container flex={false}>
              <Heading as="h2" fontSize="xs">
                {parseCamelCase(`color-${color}`)}
              </Heading>
              <SwatchPalette
                variablePrefix={`color-${color}`}
                data={colors[color]}
              />
            </Container>
          </Column>
        ))}
    </LayoutGrid>
  </StoryTemplate>
));

export const Editor = decoratedStory(() => {
  return (
    <StoryTemplate status={StoryStatus.Ready} theme={VisualTheme.DarkMode} wide>
      <StoryDescription>
        The LE's code editor uses its own colors for text.
      </StoryDescription>
      <LayoutGrid
        className={styles.swatchesContainer}
        rowGap="md"
        columnGap="md"
      >
        {objectKeys(editorColors).map((color) => (
          <Column key={color} size={{ xs: 6, sm: 3 }}>
            <Container flex={false}>
              <Heading
                as="h2"
                fontSize="xs"
                className={cx(styles.heading, styles.headingDark)}
              >
                Editor {startCase(color)}
              </Heading>
              <Swatch
                name={`color-editor-${parseCamelCase(color)}`}
                hex={editorColors[color]}
              />
            </Container>
          </Column>
        ))}
      </LayoutGrid>
    </StoryTemplate>
  );
});

export const GamutDeprecated = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Deprecated} wide>
    <StoryDescription>
      We used to have a very different color palette. Please do not use these
      anymore.
      <br />
      If you come across a color on the site while updating an older area and
      see that it uses one of these, try to replace it with the closest color
      from or new palette.
      <br />
      We may delete these as we find that consumers do not use them.
    </StoryDescription>
    <LayoutGrid className={styles.swatchesContainer} rowGap="md" columnGap="md">
      <Column size={{ xs: 6, sm: 3 }}>
        <Container flex={false}>
          <Heading as="h2" fontSize="xs">
            Deprecated Gamut Base Colors
          </Heading>
          <SwatchPalette
            data={deprecatedGamutColors.base}
            variablePrefix="deprecated-gamut"
          />
        </Container>
      </Column>
      {objectKeys(deprecatedGamutColors.swatches).map((color) => (
        <Column key={color} size={{ xs: 6, sm: 3 }}>
          <Container flex={false}>
            <Heading as="h2" fontSize="xs">
              {parseCamelCase(`deprecated-gamut-${color}`)}
            </Heading>
            <SwatchPalette
              data={deprecatedGamutColors.swatches[color]}
              variablePrefix={`deprecated-gamut-${color}`}
            />
          </Container>
        </Column>
      ))}
    </LayoutGrid>
  </StoryTemplate>
));

export const PortalDeprecated = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Deprecated} wide>
    <StoryDescription>
      Similar to the deprecated Gamut colors, these ones are an old palette from
      the Portal.
    </StoryDescription>
    <LayoutGrid columnGap="md" rowGap="md">
      <Column size={{ xs: 6, sm: 3 }}>
        <Container flex={false}>
          <Heading as="h2" fontSize="xs">
            Deprecated portal base colors
          </Heading>
          <SwatchPalette
            data={deprecatedColors.portal}
            variablePrefix="deprecated"
          />
        </Container>
      </Column>
      {objectKeys(deprecatedColors.swatches).map((color) => (
        <Column key={color} size={{ xs: 6, sm: 3 }}>
          <Container flex={false}>
            <Heading as="h2" fontSize="xs">
              {parseCamelCase(color)}
            </Heading>
            <SwatchPalette
              data={deprecatedColors.swatches[color]}
              variablePrefix={`deprecated-swatches-${color}`}
            />
          </Container>
        </Column>
      ))}
    </LayoutGrid>
  </StoryTemplate>
));
