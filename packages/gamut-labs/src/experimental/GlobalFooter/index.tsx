import { ContentContainer } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { FooterLegal } from './FooterLegal';
import { FooterNavLinks, FooterNavLinksProps } from './FooterNavLinks';

export type GlobalFooterProps = FooterNavLinksProps & {
  className?: string;
};

const FooterContainer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.navy};

  @media print {
    display: none;
  }
`;

export const GlobalFooter: React.FC<GlobalFooterProps> = ({
  className,
  userGeo,
}) => {
  return (
    <FooterContainer className={className} role="contentinfo">
      <ContentContainer>
        <FooterNavLinks userGeo={userGeo} />
      </ContentContainer>
      <FooterLegal />
    </FooterContainer>
  );
};
