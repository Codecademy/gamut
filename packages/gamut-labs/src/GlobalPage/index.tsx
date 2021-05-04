import {
  AppWrapper,
  SkipToContent,
  SkipToContentTarget,
} from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import React from 'react';

import { GlobalFooter, GlobalFooterProps } from '../GlobalFooter';
import { GlobalHeader, GlobalHeaderProps } from '../GlobalHeader';

export type GlobalPageProps = {
  backgroundColor?: keyof typeof theme.colors;

  /**
   * Element type to render around the children.
   */
  contentAs?: 'div' | 'main';

  /**
   * Props directly passed to the GlobalFooter.
   */
  footer: GlobalFooterProps;

  /**
   * Props directly passed to the GlobalHeader.
   */
  header: GlobalHeaderProps;

  /**
   * Custom element ID to link to by the SkipToContent control, if not a default one at the beginning of the page.
   */
  skipToContentId?: string;
};

const defaultSkipToContentId = 'page-skip-to-content-target';

export const GlobalPage: React.FC<GlobalPageProps> = ({
  backgroundColor,
  children,
  contentAs = 'div',
  footer,
  header,
  skipToContentId,
}) => {
  return (
    <AppWrapper backgroundColor={backgroundColor}>
      <SkipToContent contentId={skipToContentId || defaultSkipToContentId} />
      <GlobalHeader {...header} />
      {!skipToContentId && <SkipToContentTarget id={defaultSkipToContentId} />}
      <AppWrapper as={contentAs}>{children}</AppWrapper>
      <GlobalFooter {...footer} />
    </AppWrapper>
  );
};
