import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { Background, BackgroundProps, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useEffect, useMemo } from 'react';

import { Box } from '../Box';
import { IconButton, TextButton } from '../Button';
import { Markdown } from '../Markdown';

export type BannerVariants = 'navy' | 'yellow';

export interface BannerProps extends Omit<BackgroundProps, 'bg'> {
  children: string;
  /** Visual variations for banners */
  variant?: BannerVariants;
  /**  Callback called when the user closes the banner. */
  onClose: () => void;
  /** Call to action click callback */
  onCtaClick?: () => void;
  /**  Callback called only on mount. If this value is changed during normal component lifecycle, updates to this method will be ignored */
  onMount?: () => void;
}

const BannerContainer = styled(Background)(
  system.css({
    width: '100%',
    p: 4,
    display: 'grid',
    gridTemplateColumns: '2rem minmax(0, 1fr) 2rem',
    gridTemplateAreas: "'empty content close'",
    columnGap: 8,
    alignItems: 'center',
    textAlign: 'center',
  })
);

const BannerMarkdown = styled(Markdown)(system.css({ fontSize: 'inherit' }));

const bindBannerAnchor = (onCtaClick?: BannerProps['onCtaClick']) => ({
  allowedAttributes: ['href', 'target'],
  component: TextButton,
  processNode: (node: unknown, props: { onClick?: () => void }) => (
    <TextButton
      {...props}
      onClick={() => {
        onCtaClick?.();
        props?.onClick?.();
      }}
      mx={4}
      size="small"
      target="_BLANK"
    />
  ),
});

export const Banner: React.FC<BannerProps> = ({
  children,
  variant = 'navy',
  onCtaClick,
  onClose,
  onMount,
  ...rest
}: BannerProps) => {
  const overrides = useMemo(
    () => ({
      a: bindBannerAnchor(onCtaClick),
    }),
    [onCtaClick]
  );

  useEffect(() => {
    onMount?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BannerContainer {...rest} bg={variant}>
      <Box gridArea="content" fontSize="inherit">
        <BannerMarkdown
          overrides={overrides}
          text={children}
          skipDefaultOverrides={{ a: true }}
        />
      </Box>
      <Box gridArea="close">
        <IconButton
          variant="secondary"
          size="small"
          aria-label="dismiss"
          icon={MiniDeleteIcon}
          onClick={onClose}
        />
      </Box>
    </BannerContainer>
  );
};
