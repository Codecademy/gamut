import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { CardShell, CardBody, CardFooter } from '@codecademy/gamut/Card';
import { addonInfoOptions as options } from './options';

const borderStyles = ['dashed', 'solid', 'none'];

const alignStyles = ['left', 'center', 'right'];

const stories = storiesOf('Component/Card', module);

stories.addDecorator(withKnobs);

stories.add('Editable', () => (
  <CardShell
    hoverShadow={boolean('shell.hoverShadow', false)}
    standardWidth={boolean('shell.standardWidth', true)}
  >
    <CardBody standardPadding={boolean('body.standardPadding', true)}>
      <h3>Card Body</h3>
      <p>This is some body text</p>
      <p>Blah blah blurgha blurgha</p>
    </CardBody>
    <CardFooter
      border={select('footer.border', borderStyles)}
      align={select('footer.align', alignStyles)}
      flex={boolean('footer.flex', true)}
      standardPadding={boolean('footer.standardPadding', true)}
      standardHeight={boolean('footer.standardHeight', true)}
    >
      <span>&raquo;&nbsp;&nbsp;</span>
      <span>Footer Text</span>
      <span>&nbsp;&nbsp;&laquo;</span>
    </CardFooter>
  </CardShell>
));
