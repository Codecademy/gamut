import { AppWrapper } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import React from 'react';

import { GlobalFooter, GlobalFooterProps } from '../GlobalFooter';
import { GlobalHeader, GlobalHeaderProps } from '../GlobalHeader';

export type GlobalPageProps = {
  backgroundColor?: keyof typeof theme.colors;

  /**
   * Props directly passed to the GlobalFooter.
   */
  footer: GlobalFooterProps;

  /**
   * Props directly passed to the GlobalHeader.
   */
  header: GlobalHeaderProps;
};

export const GlobalPage: React.FC<GlobalPageProps> = ({
  backgroundColor,
  children,
  footer,
  header,
}) => {
  return (
    <AppWrapper backgroundColor={backgroundColor}>
      <GlobalHeader {...header} />
      {children}
      <GlobalFooter {...footer} />
    </AppWrapper>
  );
};

export default GlobalPage;
