import {
  AppWrapper,
  Banner,
  BannerProps,
  SkipToContent,
  SkipToContentTarget,
} from '@codecademy/gamut';
import { Background, BackgroundProps } from '@codecademy/gamut-styles';
import React, { ComponentProps, forwardRef } from 'react';

import { GlobalFooter, GlobalFooterProps } from '../GlobalFooter';
import { GlobalHeader, GlobalHeaderProps } from '../GlobalHeader';

export type GlobalPageProps = {
  backgroundColor?: BackgroundProps['bg'];

  /**
   * Props directly passed to the Banner.
   */
  banner?: BannerProps;

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

const RestrictedBackground = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Background>
>(({ children, ...rest }, ref) => (
  <Background data-testid="global-page-wrapper" {...rest} ref={ref}>
    {children}
  </Background>
));

const GlobalPageWrapper = AppWrapper.withComponent(RestrictedBackground);

export const GlobalPage: React.FC<GlobalPageProps> = ({
  backgroundColor = 'background',
  banner,
  children,
  contentAs = 'div',
  footer,
  header,
  skipToContentId,
}) => {
  return (
    <GlobalPageWrapper bg={backgroundColor} minHeight="100vh">
      <SkipToContent contentId={skipToContentId || defaultSkipToContentId} />
      {banner && <Banner {...banner} />}
      <GlobalHeader {...header} />
      {!skipToContentId && <SkipToContentTarget id={defaultSkipToContentId} />}
      <AppWrapper as={contentAs}>{children}</AppWrapper>
      <GlobalFooter {...footer} />
    </GlobalPageWrapper>
  );
};
