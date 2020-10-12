import React from 'react';
import { Container } from '../elements/Box';
import { Link } from '../elements/Link';
import { Heading, Text } from '../elements/Text';

export const NotFound: React.FC = () => (
  <Container
    height="100vh"
    width="100vw"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <Container width="500px">
      <Heading as="h1" hSize="1">
        404
      </Heading>
      <Text fontSize={5}>Really ran the gamut huh?</Text>
      <Text fontSize={5}>
        <Link to="/getting-started">Here is something that does exist</Link>.
      </Text>
    </Container>
  </Container>
);

// eslint-disable-next-line import/no-default-export
export default NotFound;
