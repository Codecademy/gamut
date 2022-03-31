import { ContentContainer } from '@codecademy/gamut';
import { themed } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useState } from 'react';

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
   * If new footer should be shown
   */
  showNewFooter: boolean;

  /**
   * Geographic region of the user viewing the footer, such as "IN" or "US".
   */
  userGeo: string;
};

// To be deleted after footer launches - using React.Context here will be the easiest cleanup.
export const FooterFFContext = React.createContext({ showNewFooter: false });

const FooterContainer = styled.footer`
  border-top: 1px solid ${themed('colors.navy')};

  @media print {
    display: none;
  }
`;

export const GlobalFooter: React.FC<GlobalFooterProps> = ({
  className,
  hidePricing,
  onClick,
  onMadeInClick,
  showNewFooter,
  userGeo,
}) => {
  const [showNewFooterState] = useState(showNewFooter);

  return (
    <FooterFFContext.Provider value={{ showNewFooter: showNewFooterState }}>
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
    </FooterFFContext.Provider>
  );
};
