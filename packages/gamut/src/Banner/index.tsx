import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Box, FlexBox } from '../Box';
import { IconButton, IconButtonProps, TextButton } from '../Button';

type BannerVariants = 'navy' | 'yellow';

export type BannerProps = {
  className?: string;
  /** Visual variations for banners */
  variant?: BannerVariants;
  /** Removes  */
  isClosed?: boolean;
  /**  Callback called when the user closes the banner. */
  onClose: IconButtonProps['onClick'];
  /** Call to action text */
  cta?: string;
  /** Call to action click callback */
  onCtaClick?: IconButtonProps['onClick'];
  /** Link associated with CTA */
  href?: string;
};

const BannerContainer = styled(FlexBox)<Pick<BannerProps, 'variant'>>`
  position: relative;
  ${variant<BannerVariants>({
    navy: {
      columnGap: 8,
      textColor: 'white',
      backgroundColor: 'navy',
    },
    yellow: { columnGap: 8, textColor: 'navy', backgroundColor: 'yellow' },
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
      width="100%"
      minHeight="40px"
      paddingY={{ base: 8, sm: 4 }}
      paddingX={{ base: 32, sm: 48 }}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
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
