import { ContentContainer } from '@codecademy/gamut';
import { themed } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { FooterLegal } from './FooterLegal';
import { FooterNavLinks } from './FooterNavLinks';
import { GlobalFooterClickHandler } from './types';

export type GlobalFooterProps = {
  className?: string;

  /**
   * Hide pricing details, such as for rendering in an app store app.
   */
  hidePricing?: boolean;

  /**
   * Called whenever a link is clicked.
   */
  onClick: GlobalFooterClickHandler;

  /**
   * Called when the text in the MadeIn component is clicked
   */
  onMadeInClick?: (text: string) => void;

  /**
   * Geographic region of the user viewing the footer, such as "IN" or "US".
   */
  userGeo: string;
};

const FooterContainer = styled.footer`
  border-top: 1px solid ${themed('colors.secondary')};

  @media print {
    display: none;
  }
`;

export const GlobalFooter: React.FC<GlobalFooterProps> = ({
  className,
  hidePricing,
  onClick,
  onMadeInClick,
  userGeo,
}) => {
  return (
    <FooterContainer className={className} role="contentinfo">
      <ContentContainer>
        <FooterNavLinks
          hidePricing={hidePricing}
          onClick={onClick}
          userGeo={userGeo}
        />
      </ContentContainer>
      <FooterLegal onClick={onClick} onMadeInClick={onMadeInClick} />
    </FooterContainer>
  );
};
