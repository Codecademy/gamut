import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  colors,
  deprecatedColors,
  deprecatedGamutColors,
  deprecatedEditorColors,
  brandColors,
} from '@codecademy/gamut-styles/utils/variables';
import { Container } from 'gamut';
import s from './Color-story.scss';

const infoOptions = {
  inline: true,
  source: false,
  propTables: false,
};

const parseCamelCase = string =>
  string.replace(/([a-zA-Z])(?=[A-Z0-9])/g, '$1-').toLowerCase();

const getSassVariableName = (variablePrefix, variableSuffix) => {
  if (variablePrefix) {
    return `$${parseCamelCase(variablePrefix)}-${parseCamelCase(
      variableSuffix
    )}`;
  }
  return `$color-${parseCamelCase(variableSuffix)}`;
};

const renderSwatch = (sassVariableName, hexcode) => {
  return (
    <Container
      align="center"
      className={s.swatchContainer}
      key={sassVariableName}
    >
      <div className={s.swatch} style={{ backgroundColor: hexcode }} />
      <div>
        <span className={s.name}>{sassVariableName}</span>
        <br />
        <span className={s.hexcode}>{hexcode}</span>
      </div>
    </Container>
  );
};

const renderSwatches = (data, variablePrefix) =>
  Object.keys(data).map(variableSuffix => {
    const sassVariableName = getSassVariableName(
      variablePrefix,
      variableSuffix
    );

    const hexcode =
      data[variableSuffix] === 'whitesmoke' ? '#f5f5f5' : data[variableSuffix];

    return renderSwatch(sassVariableName, hexcode);
  });

const stories = storiesOf('Visuals/Colors', module);

stories.add(
  'Colors',
  () => {
    const base = {
      black: colors.black,
      white: colors.white,
      beige: colors.beige,
      royalBlue: colors.royalBlue,
    };

    return (
      <Container>
        {Object.keys(colors)
          .filter(color => !Object.keys(base).includes(color))
          .map(color => (
            <div key={color}>
              <h2 className={s.heading}>{parseCamelCase(`color-${color}`)}</h2>
              {renderSwatches(colors[color], `color-${color}`)}
            </div>
          ))}
        {Object.keys(base).map(color => (
          <div key={color}>
            <h2 className={s.heading}>{parseCamelCase(`color-${color}`)}</h2>
            {renderSwatch(`color-${parseCamelCase(color)}`, base[color])}
          </div>
        ))}
      </Container>
    );
  },
  infoOptions
);

stories.add(
  'Brand colors',
  () => (
    <div>
      <h2 className={s.heading}>brand colors</h2>
      {renderSwatches(brandColors, 'Brand')}
    </div>
  ),
  infoOptions
);

stories.add(
  'Gamut (deprecated)',
  () => (
    <Container>
      <div>
        <h2 className={s.heading}>deprecated gamut base colors</h2>
        {renderSwatches(deprecatedGamutColors.base, 'deprecated-gamut')}
      </div>
      {Object.keys(deprecatedGamutColors.swatches).map(color => (
        <div key={color}>
          <h2 className={s.heading}>
            {parseCamelCase(`deprecated-gamut-${color}`)}
          </h2>
          {renderSwatches(
            deprecatedGamutColors.swatches[color],
            `deprecated-gamut-${color}`
          )}
        </div>
      ))}
    </Container>
  ),
  infoOptions
);

stories.add(
  'Portal (deprecated)',
  () => (
    <Container>
      <div>
        <h2 className={s.heading}>deprecated portal base colors</h2>
        {renderSwatches(deprecatedColors.portal, 'deprecated')}
      </div>
      {Object.keys(deprecatedColors.swatches).map(color => (
        <div key={color}>
          <h2 className={s.heading}>{parseCamelCase(color)}</h2>
          {renderSwatches(
            deprecatedColors.swatches[color],
            `deprecated-swatches-${color}`
          )}
        </div>
      ))}
    </Container>
  ),
  infoOptions
);

stories.add(
  'Editor (deprecated)',
  () => {
    const { white, black, ...platformRest } = deprecatedEditorColors;
    return (
      <div>
        <h2 className={s.heading}>deprecated editor colors</h2>
        {renderSwatches(
          {
            white,
            black,
          },
          'deprecated-swatches-basic'
        )}
        {renderSwatches(platformRest, 'deprecated-swatches-code')}
      </div>
    );
  },
  infoOptions
);
