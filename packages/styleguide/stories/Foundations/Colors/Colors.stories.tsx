import {
  brandColors,
  colors,
  deprecatedColors,
  editorColors,
  deprecatedGamutColors,
} from '@codecademy/gamut-styles/utils/variables';
import {
  Container,
  LayoutGrid,
  Column,
  VisualTheme,
  Button,
} from '@codecademy/gamut/src';
import cx from 'classnames';
import { startCase } from 'lodash';
import React from 'react';

import {
  decoratedStories,
  decoratedStory,
  StoryTemplate,
  StoryStatus,
  StoryDescription,
} from '../../Templating';
import styles from './styles.module.scss';

export default decoratedStories('Foundations', 'Colors');

const parseCamelCase = (string: string) =>
  string.replace(/([a-zA-Z])(?=[A-Z0-9])/g, '$1-').toLowerCase();

function objectKeys<T>(data: T) {
  return Object.keys(data) as (keyof T)[];
}

const getSassVariableName = (
  variablePrefix: string,
  variableSuffix: string
) => {
  if (variablePrefix) {
    return `$${parseCamelCase(variablePrefix)}-${parseCamelCase(
      variableSuffix
    )}`;
  }
  return `$color-${parseCamelCase(variableSuffix)}`;
};

const renderSwatch = (sassVariableName: string, hexcode: string) => {
  return (
    <Container
      align="center"
      className={styles.swatchContainer}
      key={sassVariableName}
    >
      <Container
        className={styles.swatch}
        style={{ backgroundColor: hexcode }}
        align="center"
        justify="center"
      >
        <Container
          column
          className={styles.swatchDetail}
          align="center"
          justify="spaceAround"
        >
          <span className={styles.name}>{sassVariableName}</span>

          <Button
            className={styles.swatchButton}
            flat
            theme="white"
            caps
            outline
            onClick={() => navigator.clipboard.writeText(sassVariableName)}
          >
            Copy Name
          </Button>
          <span className={styles.hexcode}>{hexcode}</span>
        </Container>
      </Container>
    </Container>
  );
};

const renderSwatches = (data: any, variablePrefix: string) => {
  if (!data) debugger;
  return Object.keys(data).map(variableSuffix => {
    const sassVariableName = getSassVariableName(
      variablePrefix,
      variableSuffix
    );

    const hexcode =
      data[variableSuffix] === 'whitesmoke' ? '#f5f5f5' : data[variableSuffix];

    return renderSwatch(sassVariableName, hexcode);
  });
};

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
    <LayoutGrid className={styles.swatchesContainer} rowGap="md">
      {objectKeys(brandColors).map(color => (
        <Column key={color} size={3}>
          <div>
            <h2 className={styles.heading}>Brand {startCase(color)}</h2>
            {renderSwatch(`color-${parseCamelCase(color)}`, brandColors[color])}
          </div>
        </Column>
      ))}
    </LayoutGrid>
    <LayoutGrid className={styles.swatchesContainer} rowGap="md">
      {objectKeys(baseColors).map(color => (
        <Column key={color} size={3}>
          <div>
            <h2 className={styles.heading}>
              {parseCamelCase(`color-${color}`)}
            </h2>
            {renderSwatch(`color-${parseCamelCase(color)}`, baseColors[color])}
          </div>
        </Column>
      ))}
    </LayoutGrid>
    <LayoutGrid className={styles.swatchesContainer} rowGap="md">
      {objectKeys(colors)
        .filter(color => !excludedColors.includes(color))
        .map(color => (
          <Column key={color} size={3}>
            <div>
              <h2 className={styles.heading}>
                {parseCamelCase(`color-${color}`)}
              </h2>
              {renderSwatches(colors[color], `color-${color}`)}
            </div>
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
      <LayoutGrid className={styles.swatchesContainer} rowGap="md">
        {objectKeys(editorColors).map(color => (
          <Column key={color} size={3}>
            <div>
              <h2 className={cx(styles.heading, styles.headingDark)}>
                Editor {startCase(color)}
              </h2>
              {renderSwatch(
                `color-editor-${parseCamelCase(color)}`,
                editorColors[color]
              )}
            </div>
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
    <LayoutGrid className={styles.swatchesContainer} columnGap="md" rowGap="md">
      <Column size={3}>
        <div>
          <h2 className={styles.heading}>Deprecated Gamut Base Colors</h2>
          {renderSwatches(deprecatedGamutColors.base, 'deprecated-gamut')}
        </div>
      </Column>
      {objectKeys(deprecatedGamutColors.swatches).map(color => (
        <Column key={color} size={3}>
          <div>
            <h2 className={styles.heading}>
              {parseCamelCase(`deprecated-gamut-${color}`)}
            </h2>
            {renderSwatches(
              deprecatedGamutColors.swatches[color],
              `deprecated-gamut-${color}`
            )}
          </div>
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
      <Column size={3}>
        <div>
          <h2 className={styles.heading}>Deprecated portal base colors</h2>
          {renderSwatches(deprecatedColors.portal, 'deprecated')}
        </div>
      </Column>
      {Object.keys(deprecatedColors.swatches).map(color => (
        <Column key={color} size={3}>
          <div>
            <h2 className={styles.heading}>{parseCamelCase(color)}</h2>
            {renderSwatches(
              deprecatedColors.swatches[
                color as keyof typeof deprecatedColors.swatches
              ],
              `deprecated-swatches-${color}`
            )}
          </div>
        </Column>
      ))}
    </LayoutGrid>
  </StoryTemplate>
));
