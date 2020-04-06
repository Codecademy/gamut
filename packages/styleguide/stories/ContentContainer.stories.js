import { ContentContainer } from '../../gamut/src';
import React from 'react';

export default {
  component: ContentContainer,
  title: 'Component/ContentContainer',
};

export const contentContainer = () => (
  <ContentContainer>
    <p>
      ContentContainer can used when creating page layouts to contain content
      within a maximum width, as well as centering that content and providing
      responsive padding at our different breakpoints.
    </p>
  </ContentContainer>
);
