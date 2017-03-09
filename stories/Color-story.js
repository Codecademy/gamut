import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Container } from 'src/FlexBox';
import Button, { presetThemes } from 'src/Button';
import id from 'identity';

let renderBaseColors = () => {
  return Object.keys(id.color).map(function (colorName, idx) {
    let style = {
      'display': 'inline-block',
      'background-color': id.color[colorName]
    };
    return <div key={`base-color-${idx}`} style={style}>{colorName}</div>;
  });
};

let renderSwatchColors = () => {
  return Object.keys(id.swatches).map(function (swatchName) {
    return Object.keys(id.swatches[swatchName]).map(function (colorLevel, idx) {
      let style = {
        'display': 'inline-block',
        'background-color': id.swatches[swatchName][colorLevel]
      };
      return <div key={`base-color-${idx}`} style={style}>{swatchName} {colorLevel}</div>;
    });
  });
};

storiesOf('Colors', module)
  .add('with text', () => (
    <Container column>
      <div>
        <h3>Standard colors</h3>
        { renderBaseColors() }
        <h3>Swatch colors</h3>
        { renderSwatchColors() }
      </div>
    </Container>
  ));
