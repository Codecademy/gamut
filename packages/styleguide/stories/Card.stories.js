import React from 'react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import {
  CardShell,
  CardBody,
  CardFooter,
  CardEyebrow,
  CardButton,
  CardContent,
} from '../../gamut/src/Card';
import Icon from '../../gamut/src/Icon';
import RadialProgress from '../../gamut/src/RadialProgress';
import { colors } from '../../gamut-styles/utils/variables';

const borderStyles = ['dashed', 'solid', 'none'];

const alignStyles = ['left', 'center', 'right'];

export default {
  component: CardShell,
  title: 'Component/Card',
  decorators: [withKnobs],
};

export const editable = () => (
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
);
