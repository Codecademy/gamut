import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { IconButton, TextButton } from '../Button';

type BannerVariants = 'navy' | 'yellow';

export interface BaseBannerProps {
  className?: string;
  /** Visual variations for banners */
  variant?: BannerVariants;
  /**  Callback called when the user closes the banner. */
  onClose: () => void;
}

export interface CTABanner extends BaseBannerProps {
  /** Call to action text */
  cta: string;
  /** Link associated with CTA */
  href: string;
  /** Call to action click callback */
  onCtaClick?: () => void;
}

export interface TextBanner extends BaseBannerProps {
  cta?: never;
  onCtaClick?: never;
  href?: never;
}

type BannerProps = TextBanner | CTABanner;

const BannerContainer = styled.div(
  variant({
    navy: { textColor: 'white', backgroundColor: 'navy' },
    yellow: { textColor: 'navy', backgroundColor: 'yellow' },
  }),
  ({ theme }) => css`
    display: grid;
    width: 100%;
    padding: ${theme.spacing[4]};
    column-gap: ${theme.spacing[8]};
    grid-template-columns: 2rem 1fr 2rem;
    align-items: center;
    text-align: center;

    &:before {
      content: '';
    }
  `
);

export const Banner: React.FC<BannerProps> = ({
  children,
  variant = 'navy',
  cta,
  href,
  onCtaClick,
  onClose,
  ...rest
}) => {
  const mode = variant === 'navy' ? 'dark' : 'light';

  return (
    <BannerContainer variant={variant} {...rest}>
      <span>
        {children}
        {cta && (
          <>
            &nbsp;
            <TextButton
              mode={mode}
              size="small"
              href={href}
              onClick={onCtaClick}
            >
              {cta}
            </TextButton>
          </>
        )}
      </span>
      <IconButton
        mode={mode}
        variant="secondary"
        size="small"
        icon={MiniDeleteIcon}
        onClick={onClose}
      />
    </BannerContainer>
  );
};
