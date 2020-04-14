import {
  brandColors,
  colors,
  deprecatedColors,
  deprecatedEditorColors,
  deprecatedGamutColors,
} from '@codecademy/gamut-styles/utils/variables';
import { Container, LayoutGrid, Column } from '@codecademy/gamut/src';
import { startCase } from 'lodash';
import React from 'react';

import {
  StoryTemplate,
  StoryStatus,
  StoryDescription,
  decoratedStory,
} from '../../Templating';
import styles from './styles.module.scss';

export default decoratedStory('Foundations', 'Colors');

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
      <div className={styles.swatch} style={{ backgroundColor: hexcode }} />
      <div>
        <span className={styles.name}>{sassVariableName}</span>
        <br />
        <span className={styles.hexcode}>{hexcode}</span>
      </div>
    </Container>
  );
};

const renderSwatches = (data: any, variablePrefix: string) =>
  Object.keys(data).map(variableSuffix => {
    const sassVariableName = getSassVariableName(
      variablePrefix,
      variableSuffix
    );

    const hexcode =
      data[variableSuffix] === 'whitesmoke' ? '#f5f5f5' : data[variableSuffix];

    return renderSwatch(sassVariableName, hexcode);
  });

const baseColors = {
  black: colors.black,
  white: colors.white,
};

const excludedColors = ['black', 'white', 'beige', 'royalBlue'];

export const Colors = () => (
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
          <h2 className={styles.heading}>Brand {startCase(color)}</h2>
          {renderSwatch(`color-${parseCamelCase(color)}`, brandColors[color])}
        </Column>
      ))}
    </LayoutGrid>
    <Container className={styles.swatchesContainer}>
      {objectKeys(baseColors).map(color => (
        <div key={color}>
          <h2 className={styles.heading}>{parseCamelCase(`color-${color}`)}</h2>
          {renderSwatch(`color-${parseCamelCase(color)}`, baseColors[color])}
        </div>
      ))}
    </Container>
    <Container>
      {objectKeys(colors)
        .filter(color => !excludedColors.includes(color))
        .map(color => (
          <div key={color}>
            <h2 className={styles.heading}>
              {parseCamelCase(`color-${color}`)}
            </h2>
            {renderSwatches(colors[color], `color-${color}`)}
          </div>
        ))}
    </Container>
  </StoryTemplate>
);

export const GamutDeprecated = () => (
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
    <Container>
      <div>
        <h2 className={styles.heading}>Deprecated Gamut Base Colors</h2>
        {renderSwatches(deprecatedGamutColors.base, 'deprecated-gamut')}
      </div>
      {objectKeys(deprecatedGamutColors.swatches).map(color => (
        <div key={color}>
          <h2 className={styles.heading}>
            {parseCamelCase(`deprecated-gamut-${color}`)}
          </h2>
          {renderSwatches(
            deprecatedGamutColors.swatches[color],
            `deprecated-gamut-${color}`
          )}
        </div>
      ))}
    </Container>
  </StoryTemplate>
);

export const PortalDeprecated = () => (
  <StoryTemplate status={StoryStatus.Deprecated} wide>
    <StoryDescription>
      Similar to the deprecated Gamut colors, these ones are an old palette from
      the Portal.
    </StoryDescription>
    <Container>
      <div>
        <h2 className={styles.heading}>deprecated portal base colors</h2>
        {renderSwatches(deprecatedColors.portal, 'deprecated')}
      </div>
      {Object.keys(deprecatedColors.swatches).map(color => (
        <div key={color}>
          <h2 className={styles.heading}>{parseCamelCase(color)}</h2>
          {renderSwatches(
            deprecatedColors.swatches[
              color as keyof typeof deprecatedColors.swatches
            ],
            `deprecated-swatches-${color}`
          )}
        </div>
      ))}
    </Container>
  </StoryTemplate>
);

export const EditorDeprecated = () => {
  const { white, black, ...platformRest } = deprecatedEditorColors;

  return (
    <StoryTemplate status={StoryStatus.Deprecated} wide>
      <StoryDescription>
        Similar to the deprecated Gamut colors, these ones are an old palette
        from the Portal.
      </StoryDescription>
      <div>
        <h2 className={styles.heading}>deprecated editor colors</h2>
        {renderSwatches({ white, black }, 'deprecated-swatches-basic')}
        {renderSwatches(platformRest, 'deprecated-swatches-code')}
      </div>
    </StoryTemplate>
  );
};
