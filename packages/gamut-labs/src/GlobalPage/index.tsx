import {
  AppWrapper,
  Box,
  PageWrapper,
  SkipToContent,
  SkipToContentTarget,
} from '@codecademy/gamut';
import { BackgroundProps } from '@codecademy/gamut-styles';
import React from 'react';

import { GlobalFooter, GlobalFooterProps } from '../GlobalFooter';
import { GlobalHeader, GlobalHeaderProps } from '../GlobalHeader';

export type GlobalPageProps = {
  backgroundColor?: BackgroundProps['bg'];

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
  backgroundColor = 'background',
  children,
  contentAs = 'div',
  footer,
  header,
  skipToContentId,
}) => {
  return (
    <PageWrapper bg={backgroundColor}>
      <SkipToContent contentId={skipToContentId || defaultSkipToContentId} />
      <Box as="header" position="sticky" top={0} zIndex={2}>
        <GlobalHeader {...header} />
      </Box>
      {!skipToContentId && <SkipToContentTarget id={defaultSkipToContentId} />}
      <AppWrapper as={contentAs}>{children}</AppWrapper>
      <GlobalFooter {...footer} />
    </PageWrapper>
  );
};
