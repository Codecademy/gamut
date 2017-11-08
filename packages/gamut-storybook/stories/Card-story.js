import React from 'react';
import { storiesOf } from '@storybook/react';
import { CardShell, CardBody, CardFooter } from '@codecademy/gamut/Card';
import Icon from '@codecademy/gamut/Icon';
import { select, boolean } from '@storybook/addon-knobs';

const borderStyles = [
  'dashed',
  'solid',
  'none'
];

const alignStyles = [
  'left',
  'center',
  'right'
];

storiesOf('Component/Card', module)
  .add(
    'Card Shell with Body & Footer',
    () => (
      <CardShell
        hoverShadow={boolean('shell.hover', true)}
      >
        <CardBody
          padding={boolean('body.padding', true)}
        >
          <h3>Card Body</h3>
          <p>This is some body text</p>
          <p>Blah blah blurgha blurgha</p>
        </CardBody>
        <CardFooter
          border={select('footer.border', borderStyles)}
          align={select('footer.align', alignStyles)}
          flex={boolean('footer.flex', true)}
        >
          <span>&raquo;&nbsp;&nbsp;</span>
          <span>Footer Text</span>
          <span>&nbsp;&nbsp;&laquo;</span>
        </CardFooter>
      </CardShell>
    ), {
      inline: true,
      propTables: false
    }
  );
