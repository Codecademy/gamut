import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Container } from 'src/FlexBox';
import id from 'identity';

const infoOptions = {
  inline: true,
  source: false,
  propTables: false
};

const parseCamelCase = (string) => {
  return string.replace(/([a-zA-Z])(?=[A-Z0-9])/g, '$1-').toLowerCase();
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const contrastColor = (hex) => {
  const rgb = hexToRgb(hex);
  const red = rgb.r;
  const green = rgb.g;
  const blue = rgb.b;
  if (((red * 0.299) + (green * 0.587) + (blue * 0.114)) > 176) {
    return '#000000';
  }
  return '#ffffff';
};

const containerStyles = {
  display: 'inline-block',
  marginBottom: '1rem',
  marginRight: '1rem'
};

const getSassVariableName = (variablePrefix, variableSuffix) => {
  if (variablePrefix) {
    return `$swatches-${parseCamelCase(variablePrefix)}-${parseCamelCase(variableSuffix)}`;
  }
  return `$color-${parseCamelCase(variableSuffix)}`;
};

const renderSwatch = (data, variablePrefix) => {
  return Object.keys(data).map((variableSuffix) => {
    const swatchStyles = {
      color: contrastColor(data[variableSuffix]),
      backgroundColor: data[variableSuffix],
      height: '160px',
      margin: '10px 0',
      width: '160px'
    };
    const sassVariableName = getSassVariableName(variablePrefix, variableSuffix);
    return (
      <div style={containerStyles} key={sassVariableName}>
        <Container style={swatchStyles} center>
          {data[variableSuffix]}
        </Container>
        <span style={{fontSize: '13px'}}>{sassVariableName}</span>
      </div>
    );
  });
};

const stories = storiesOf('Colors', module)
  .addWithInfo(
    'standard',
    () => (
      <div>
        {renderSwatch(id.color)}
      </div>
    ),
    infoOptions
  );

Object.keys(id.swatches).map((color) => {
  if ('basic'.includes(color)) return null;
  return stories.addWithInfo(
    parseCamelCase(color),
    () => (
      <div>
        {renderSwatch(id.swatches[color], color)}
      </div>
    ),
    infoOptions
  );
});

