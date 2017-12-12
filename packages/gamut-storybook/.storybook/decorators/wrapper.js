import React from 'react';
import { Container } from '@codecademy/gamut/FlexBox';
import './wrapper-styles';

export const wrapper = story => (
  <Container
    justify="stretch"
    column
    style={{ minHeight: '100vh', padding: '1rem' }}
  >
    {story()}
  </Container>
);

export default wrapper;
