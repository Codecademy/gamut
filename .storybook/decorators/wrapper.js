import React from 'react';
import { Container } from 'components/FlexBox';
import 'styles/main';

export const wrapper = (story) => (
  <Container justify="stretch" column style={{ minHeight: '100vh', padding: '1rem' }}>
    {story()}
  </Container>
);

export default wrapper;
