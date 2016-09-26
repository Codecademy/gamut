import React from 'react';
import { Container } from 'components/FlexBox';
import 'styles/global';

export const wrapper = (story) => (
  <Container justify="stretch" column style={{ minHeight: '100vh', minWidth: '100vh', padding: '1rem' }}>
    {story()}
  </Container>
);

export default wrapper;
