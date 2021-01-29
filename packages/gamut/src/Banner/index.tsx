import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Box, FlexBox } from '../Box';
import { IconButton, IconButtonProps, TextButton } from '../Button';

type BannerVariants = 'navy' | 'yellow';

export interface BaseBannerProps {
  className?: string;
  /** Visual variations for banners */
  variant?: BannerVariants;
  /** Removes  */
  isClosed?: boolean;
  /**  Callback called when the user closes the banner. */
  onClose: IconButtonProps['onClick'];
}

export interface CTABanner extends BaseBannerProps {
  /** Call to action text */
  cta: string;
  /** Link associated with CTA */
  href: string;
  /** Call to action click callback */
  onCtaClick?: IconButtonProps['onClick'];
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

const variantButtonMode = {
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
  isClosed = false,
  cta,
  href,
  onCtaClick,
  onClose,
}) => {
  if (isClosed) {
    return null;
  }
  const { text, icon } = variantButtonMode[variant];

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
        <TextButton size="small" onClick={onCtaClick} href={href} mode={text}>
          <Box fontWeight="title">{cta}</Box>
        </TextButton>
      )}
      <FlexBox
        position="absolute"
        height={{ base: 'auto', sm: '40px' }}
        padding={8}
        alignItems="center"
        top="0"
        right="0"
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
