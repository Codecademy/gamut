import { ContentContainer } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { FooterLegal } from './FooterLegal';
import { FooterNavLinks } from './FooterNavLinks';

export type GlobalFooterProps = {
  className?: string;
};

const FooterContainer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.navy};

  @media print {
    display: none;
  }
`;

export const GlobalFooter: React.FC<GlobalFooterProps> = ({ className }) => {
  return (
    <FooterContainer className={className} role="contentinfo">
      <ContentContainer>
        <FooterNavLinks />
      </ContentContainer>
      <FooterLegal />
    </FooterContainer>
  );
};
