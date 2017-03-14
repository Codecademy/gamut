import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Container } from 'src/FlexBox';
import id from 'identity';

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
  if (variablePrefix === 'standard') {
    return `$color-${parseCamelCase(variableSuffix)}`;
  }
  return `$swatches-${parseCamelCase(variablePrefix)}-${variableSuffix}`;
};

let renderSwatchRow = (data, variablePrefix) => {
  return Object.keys(data[variablePrefix]).map((variableSuffix) => {
    let swatchStyles = {
      color: contrastColor(data[variablePrefix][variableSuffix]),
      backgroundColor: data[variablePrefix][variableSuffix],
      height: '222px',
      margin: '10px 0',
      width: '222px'
    };
    let sassVariableName = getSassVariableName(variablePrefix, variableSuffix);
    return (
      <div style={containerStyles} key={sassVariableName}>
        <Container style={swatchStyles} center>
          {data[variablePrefix][variableSuffix]}
        </Container>
        <span>{sassVariableName}</span>
      </div>
    );
  });
};

let renderSwatchRows = (data) => {
  return Object.keys(data).map((variablePrefix) => {
    if (['code', 'basic'].includes(variablePrefix)) return null;
    return (
      <div key={variablePrefix}>
        <h2>{parseCamelCase(variablePrefix)}</h2>
        {renderSwatchRow(data, variablePrefix)}
      </div>
    );
  });
};


storiesOf('Colors', module)
  .add('with text', () => (
    <Container column>
      <div>
        {renderSwatchRows({'standard': id.color})}
        {renderSwatchRows(id.swatches)}
      </div>
    </Container>
  ));
