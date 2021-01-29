import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Box, FlexBox } from '../Box';
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
  cta: never;
  onCtaClick: never;
  href: never;
}

type BannerProps = TextBanner | CTABanner;

const BannerContainer = styled(FlexBox)<Pick<BaseBannerProps, 'variant'>>`
  position: relative;
  width: 100%;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  text-align: center;
  ${variant<BannerVariants>({
    navy: { textColor: 'white', backgroundColor: 'navy' },
    yellow: { textColor: 'navy', backgroundColor: 'yellow' },
  })}
`;

const variantButtons = {
  navy: {
    text: 'dark',
    icon: 'dark-alt',
  },
  yellow: {
    text: 'light',
    icon: 'light-alt',
  },
} as const;

export const Banner: React.FC<BannerProps> = ({
  children,
  className,
  variant = 'navy',
  cta,
  href,
  onCtaClick,
  onClose,
}) => {
  const { text, icon } = variantButtons[variant];

  return (
    <BannerContainer
      columnGap={8}
      paddingY={{ base: 8, sm: 4 }}
      paddingX={{ base: 32, sm: 48 }}
      flexWrap={{ base: 'wrap', sm: 'nowrap' }}
      variant={variant}
      className={className}
    >
      <span>{children}</span>
      {cta && (
        <TextButton mode={text} size="small" onClick={onCtaClick} href={href}>
          <Box fontWeight="title">{cta}</Box>
        </TextButton>
      )}
      <FlexBox
        position="absolute"
        top="0"
        right="0"
        alignItems="center"
        height={{ base: 'auto', sm: '40px' }}
        padding={8}
      >
        <IconButton
          mode={icon}
          size="small"
          onClick={onClose}
          icon={MiniDeleteIcon}
        />
      </FlexBox>
    </BannerContainer>
  );
};
