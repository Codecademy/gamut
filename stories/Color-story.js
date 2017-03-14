import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Container } from 'src/FlexBox';
import id from 'identity';

let infoOptions = {
  inline: true,
  source: false,
  propTables: false
};

let parseCamelCase = (string) => {
  return string.replace(/([a-zA-Z])(?=[A-Z0-9])/g, '$1-').toLowerCase();
};

let hexToRgb = (hex) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

let contrastColor = (hex) => {
  let rgb = hexToRgb(hex);
  let red = rgb.r;
  let green = rgb.g;
  let blue = rgb.b;
  if (((red * 0.299) + (green * 0.587) + (blue * 0.114)) > 176) {
    return '#000000';
  }
  return '#ffffff';
};

let containerStyles = {
  display: 'inline-block',
  marginBottom: '1rem',
  marginRight: '1rem'
};

let getSassVariableName = (variablePrefix, variableSuffix) => {
  if (variablePrefix) {
    return `$swatches-${parseCamelCase(variablePrefix)}-${variableSuffix}`;
  }
  return `$color-${parseCamelCase(variableSuffix)}`;
};

let renderSwatch = (data, variablePrefix) => {
  return Object.keys(data).map((variableSuffix) => {
    let swatchStyles = {
      color: contrastColor(data[variableSuffix]),
      backgroundColor: data[variableSuffix],
      height: '160px',
      margin: '10px 0',
      width: '160px'
    };
    let sassVariableName = getSassVariableName(variablePrefix, variableSuffix);
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

let stories = storiesOf('Colors', module)
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
  if (['code', 'basic'].includes(color)) return null;
  return stories.addWithInfo(
    color,
    () => (
      <div>
        {renderSwatch(id.swatches[color], color)}
      </div>
    ),
    infoOptions
  );
});

