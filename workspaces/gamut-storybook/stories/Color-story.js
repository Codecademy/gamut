import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  colors2019,
  colors,
  gamutColors,
  editorColors,
  brandColors,
} from '@codecademy/gamut-styles/utils/variables';
import { Container } from '@codecademy/gamut/FlexBox';
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
  'Colors (Mar 2019)',
  () => {
    const base = {
      black: colors2019.black,
      white: colors2019.white,
      beige: colors2019.beige,
      royalBlue: colors2019.royalBlue,
    };

    return (
      <Container>
        {Object.keys(colors2019)
          .filter(color => !Object.keys(base).includes(color))
          .map(color => (
            <div key={color}>
              <h2 className={s.heading}>{parseCamelCase(color)}</h2>
              {renderSwatches(colors2019[color], color)}
            </div>
          ))}
        {Object.keys(base).map(color => (
          <div key={color}>
            <h2 className={s.heading}>{parseCamelCase(color)}</h2>
            {renderSwatch(color, base[color])}
          </div>
        ))}
      </Container>
    );
  },
  infoOptions
);

stories.add(
  'Portal (Nov 2017)',
  () => (
    <Container>
      <div>
        <h2 className={s.heading}>portal base colors</h2>
        {renderSwatches(colors.portal)}
      </div>
      {Object.keys(colors.swatches).map(color => (
        <div key={color}>
          <h2 className={s.heading}>{parseCamelCase(color)}</h2>
          {renderSwatches(colors.swatches[color], `swatches-${color}`)}
        </div>
      ))}
    </Container>
  ),
  infoOptions
);

stories.add(
  'Gamut (Nov 2017)',
  () => (
    <Container>
      <div>
        <h2 className={s.heading}>gamut base colors</h2>
        {renderSwatches(gamutColors.base, 'gamut')}
      </div>
      {Object.keys(gamutColors.swatches).map(color => (
        <div key={color}>
          <h2 className={s.heading}>{parseCamelCase(`gamut-${color}`)}</h2>
          {renderSwatches(gamutColors.swatches[color], `gamut-${color}`)}
        </div>
      ))}
    </Container>
  ),
  infoOptions
);

stories.add(
  'Editor (Not in Use)',
  () => {
    const { white, black, ...platformRest } = editorColors;
    return (
      <div>
        <h2 className={s.heading}>editor colors</h2>
        {renderSwatches(
          {
            white,
            black,
          },
          'swatches-basic'
        )}
        {renderSwatches(platformRest, 'swatches-code')}
      </div>
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
