import React from 'react';
import { storiesOf } from '@storybook/react';
import { colors, gamutColors, editorColors } from '@codecademy/gamut-styles/variables';

const infoOptions = {
  inline: true,
  source: false,
  propTables: false
};

const parseCamelCase = (string) => {
  return string.replace(/([a-zA-Z])(?=[A-Z0-9])/g, '$1-').toLowerCase();
};

const containerStyles = {
  display: 'inline-block',
  marginBottom: '1rem',
  marginRight: '1rem'
};

const headerStyles = {
  fontSize: '22px',
  fontWeight: '400',
  margin: '0 0 10px 0',
  padding: '0'
};

const getSassVariableName = (variablePrefix, variableSuffix) => {
  if (variablePrefix) {
    return `$${parseCamelCase(variablePrefix)}-${parseCamelCase(variableSuffix)}`;
  }
  return `$color-${parseCamelCase(variableSuffix)}`;
};

const renderSwatch = (data, variablePrefix) => {
  return Object.keys(data).map((variableSuffix) => {
    const swatchStyles = {
      backgroundColor: data[variableSuffix],
      height: '160px',
      margin: '10px 0',
      width: '160px',
      border: '1px solid black',
      borderRadius: '8px'
    };
    const sassVariableName = getSassVariableName(variablePrefix, variableSuffix);
    return (
      <div style={containerStyles} key={sassVariableName}>
        <div style={swatchStyles} />
        <div style={{fontSize: '13px', textAlign: 'center'}}>
          {sassVariableName}<br />
          {data[variableSuffix]}
        </div>
      </div>
    );
  });
};

const stories = storiesOf('Visuals/Colors', module);

stories.add(
  'Portal',
  () => (
    <div>
      {renderSwatch(colors.portal)}
    </div>
  ),
  infoOptions
);

stories.add(
  'Gamut Colors',
  () => (
    <div>
      {renderSwatch(gamutColors.base, 'gamut')}
    </div>
  ),
  infoOptions
);

stories.add(
  'Gamut Swatches',
  () => (
    <div>
      {Object.keys(gamutColors.swatches).map((color) => {
        return (
          <div>
            <h2 style={headerStyles}>{parseCamelCase(`gamut-${color}`)}</h2>
            {renderSwatch(gamutColors.swatches[color], `swatches-gamut-${color}`)}
          </div>
        );
      })}
    </div>
  ),
  infoOptions
);

stories.add(
  'Editor',
  () => {
    const { white, black, ...platformRest } = editorColors;
    return (
      <div>
        {renderSwatch({
          white,
          black
        }, 'swatches-basic')}
        {renderSwatch(platformRest, 'swatches-code')}
      </div>
    );
  },
  infoOptions
);

stories.add(
  'Swatches',
  () => (
    <div>
      {Object.keys(colors.swatches).map((color) => {
        return (
          <div>
            <h2 style={headerStyles}>{parseCamelCase(color)}</h2>
            {renderSwatch(colors.swatches[color], `swatches-${color}`)}
          </div>
        );
      })}
    </div>
  ),
  infoOptions
);
