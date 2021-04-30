import { ContentContainer } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { FooterLegal } from './FooterLegal';
import { FooterNavLinks } from './FooterNavLinks';
import { GlobalFooterClickHandler } from './types';

export type GlobalFooterProps = {
  className?: string;

  /**
   * Called whenever a link is clicked.
   */
  onClick: GlobalFooterClickHandler;

  /**
   * Geographic region of the user viewing the footer, such as "IN" or "US".
   */
  userGeo: string;
};

const FooterContainer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.navy};

  @media print {
    display: none;
  }
`;

export const GlobalFooter: React.FC<GlobalFooterProps> = ({
  className,
  onClick,
  userGeo,
}) => {
  return (
    <FooterContainer className={className} role="contentinfo">
      <ContentContainer>
        <FooterNavLinks onClick={onClick} userGeo={userGeo} />
      </ContentContainer>
      <FooterLegal onClick={onClick} />
    </FooterContainer>
  );
};
