import { Box, IconButton, Markdown, TextButton } from '@codecademy/gamut';
import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { Background, BackgroundProps, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useMemo } from 'react';
import * as React from 'react';

export type BannerVariant = typeof bannerVariants[number];
const bannerVariants = ['navy', 'yellow'] as const;

const isAllowedVariant = (
  variant: string | undefined | null
): variant is BannerVariant =>
  bannerVariants.includes(variant as BannerVariant);

export interface BannerProps extends Omit<BackgroundProps, 'bg'> {
  children: string;
  /** Visual variation for banners, defaults to navy */
  variant?: BannerVariant | null;
  /**  Callback called when the user closes the banner. */
  onClose: () => void;
  /** Call to action click callback */
  onCtaClick?: () => void;
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
  variant: rawVariant,
  onCtaClick,
  onClose,
  ...rest
}: BannerProps) => {
  const overrides = useMemo(
    () => ({
      a: bindBannerAnchor(onCtaClick),
    }),
    [onCtaClick]
  );

  // Contentful is unable to programmatically communicate what values it does/doesn't allow in these kinds of fields,
  // which makes it difficult for us to ensure the Contentful configuration hasn't diverged from Gamut restrictions.
  const variant = isAllowedVariant(rawVariant) ? rawVariant : 'navy';

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
