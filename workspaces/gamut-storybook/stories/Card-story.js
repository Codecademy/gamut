import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import {
  CardShell,
  CardBody,
  CardFooter,
  IconCard,
} from '@codecademy/gamut/Card';
import { colors } from '@codecademy/gamut-styles/utils/variables';
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

stories.add('IconCard', () => (
  <IconCard
    eyebrow={{ iconName: 'lesson', leftText: 'Lesson', rightText: '30 min' }}
    header={{
      backgroundColor: colors.blue[500],
      iconName: 'javascript',
      iconColor: colors.blue[300],
      withWave: false,
    }}
    title="Two-way data binding in accessible forms"
    description="In this lesson, you will learn the syntax for iterator methods, their return values"
    primaryButton={{
      icon: (
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: '100%',
            border: '3px solid #ccc',
          }}
        />
      ),
      title: 'Resume',
      action: () => {},
      withArrow: true,
    }}
  />
));
