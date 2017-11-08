import React from 'react';
import { storiesOf } from '@storybook/react';
import { CardShell, CardBody, CardFooter } from '@codecademy/gamut/Card';

storiesOf('Component/Card', module)
  .add(
    'Card Shell with Body & Footer',
    () => (
      <CardShell>
        <CardBody>
          <h3>Card Body</h3>
          <p>This is some body text</p>
          <p>Blah blah blurgha blurgha</p>
        </CardBody>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </CardShell>
    ), {
      inline: true,
      propTables: false
    }
  );
