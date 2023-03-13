import {
  AppWrapper,
  SkipToContent,
  SkipToContentTarget,
  WithChildrenProp,
} from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import { ComponentProps, forwardRef } from 'react';
import * as React from 'react';

import { Banner, BannerProps } from '../Banner';
import { GlobalFooter, GlobalFooterProps } from '../GlobalFooter';
import { GlobalHeader, GlobalHeaderProps } from '../GlobalHeader';

export type GlobalPageBackgroundColor =
  | 'beige'
  | 'background'
  | 'navy'
  | 'paleBlue'
  | 'paleGreen'
  | 'palePink'
  | 'paleYellow'
  | 'white';

export interface GlobalPageProps extends WithChildrenProp {
  backgroundColor?: GlobalPageBackgroundColor;

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
  footer?: GlobalFooterProps;

  /**
   * Props directly passed to the GlobalHeader.
   */
  header: GlobalHeaderProps;

  /**
   * Custom element ID to link to by the SkipToContent control, if not a default one at the beginning of the page.
   */
  skipToContentId?: string;
}

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
      {footer && <GlobalFooter {...footer} />}
    </GlobalPageWrapper>
  );
};
