import React from 'react';
import { storiesOf } from '@storybook/react';
import { Container } from '@codecademy/gamut';

const Box = props => (
  <div
    className={props.className}
    style={{ backgroundColor: props.bg, color: props.color }}
  >
    {props.children}
  </div>
);

storiesOf('Layout/Spacing', module).add('Spinner', () => (
  <>
    <Container as={Box} asProps={{ bg: 'blue' }} p={2} column>
      <Container as={Box} asProps={{ bg: 'blue' }} row mb={2}>
        <Container as={Box} asProps={{ bg: 'red' }} p={2} grow={1}>
          <Container as={Box} asProps={{ bg: 'blue', color: 'white' }} grow={1}>
            Hello
          </Container>
        </Container>
        <Container
          as={Box}
          asProps={{ bg: 'aquamarine' }}
          pb={1}
          pt={2}
          grow={1}
        >
          <Container
            as={Box}
            asProps={{ bg: 'green', color: 'white' }}
            grow={1}
          >
            World
          </Container>
        </Container>
      </Container>
      <Container as={Box} asProps={{ bg: 'red' }} p={2} mb={2} grow={1}>
        <Container as={Box} asProps={{ bg: 'blue', color: 'white' }} grow={1}>
          Hello
        </Container>
      </Container>
      <Container as={Box} asProps={{ bg: 'aquamarine' }} pb={1} pt={2}>
        <Container as={Box} asProps={{ bg: 'green', color: 'white' }} grow={1}>
          World
        </Container>
      </Container>
    </Container>
  </>
));
