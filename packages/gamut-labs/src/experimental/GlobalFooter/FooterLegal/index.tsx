import { ContentContainer } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { LegalLinks } from './LegalLinks';
import { MadeIn } from './MadeIn';

const LegalLocalContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.navy};
  font-size: 0.875rem;
  padding: 1rem 0 0.5rem;
  margin: 0;

  ${theme.breakpoints.md} {
    align-items: baseline;
    display: flex;
    justify-content: space-between;
  }
`;

export const FooterLegal = () => {
  return (
    <ContentContainer>
      <LegalLocalContainer>
        <LegalLinks />
        <MadeIn />
      </LegalLocalContainer>
    </ContentContainer>
  );
};
