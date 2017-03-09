import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Container, Item } from 'src/FlexBox';
import Button, { presetThemes } from 'src/Button';
import id from 'identity';

let formatCamelCase = (string) => {
  return string.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
};

let hexToRgb = (hex) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

let contrastColor = (hex) => {
  let rgb = hexToRgb(hex);
  let red = rgb['r'];
  let green = rgb['g'];
  let blue = rgb['b'];
  if ((red*0.299 + green*0.587 + blue*0.114) > 176) {
    return '#000000';
  }
  return '#ffffff';
}

let containerStyles = {
  display: 'inline-block',
  marginBottom: '1rem',
  marginRight: '1rem'
};

let renderSwatchRow = (data, swatchName) => {
  return Object.keys(data[swatchName]).map(function (colorSuffix) {
    let swatchStyles = {
      color: contrastColor(data[swatchName][colorSuffix]),
      backgroundColor: data[swatchName][colorSuffix],
      height: '222px',
      margin: '10px 0',
      width: '222px'
    };
    let colorName = swatchName === 'standard' ? colorSuffix : formatCamelCase(swatchName) + '-' + colorSuffix;
    return (
      <div style={containerStyles} key={colorName}>
        <Container style={swatchStyles} center>
          {data[swatchName][colorSuffix]}
        </Container>
        <span>{colorName}</span>
      </div>
    );
  });
}

let renderSwatchRows = (data) => {
  return Object.keys(data).map(function (swatchName) {
    if (['code', 'basic'].includes(swatchName)) return null;
    return (
      <div key={swatchName}>
        <h2>{formatCamelCase(swatchName)}</h2>
        {renderSwatchRow(data, swatchName)}
      </div>
    );
  });
};

storiesOf('Colors', module)
  .add('with text', () => (
    <Container column>
      <div>
        {renderSwatchRows({ 'standard': id.color })}
        {renderSwatchRows(id.swatches)}
      </div>
    </Container>
  ));
