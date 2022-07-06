import { ContentContainer } from '@codecademy/gamut';
import { theme, themed } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { GlobalFooterClickHandler } from '../types';
import { LegalLinks } from './LegalLinks';
import { MadeIn } from './MadeIn';

const LegalLocalContainer = styled.div`
  border-top: 1px solid ${themed('colors.navy')};
  font-size: 0.875rem;
  padding: 1rem 0 0.5rem;
  margin: 0;

  ${theme.breakpoints.md} {
    align-items: baseline;
    display: flex;
    justify-content: space-between;
  }
`;

export type FooterLegalProps = {
  onClick: GlobalFooterClickHandler;
  onMadeInClick?: (text: string) => void;
};

export const FooterLegal: React.FC<FooterLegalProps> = ({
  onClick,
  onMadeInClick,
}) => {
  return (
    <ContentContainer>
      <LegalLocalContainer>
        <LegalLinks onClick={onClick} />
        <MadeIn onClick={onMadeInClick} />
      </LegalLocalContainer>
    </ContentContainer>
  );
};
