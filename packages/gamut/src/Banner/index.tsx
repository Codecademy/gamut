import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { Background, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { HTMLProps } from 'react';

import { Box } from '../Box';
import { IconButton, TextButton } from '../Button';
import { Markdown } from '../Markdown';

export type BannerVariants = 'navy' | 'yellow';

export interface BannerProps
  extends Omit<HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
  className?: string;
  /** Markdown content */
  children: string;
  /** Visual variations for banners */
  variant?: BannerVariants;
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

const overrides = {
  a: {
    allowedAttributes: ['href', 'target'],
    processNode: (node: unknown, props: { onClick?: () => void }) => (
      <TextButton {...props} mx={4} size="small" target="_BLANK" />
    ),
    component: TextButton,
  },
};

export const Banner: React.FC<BannerProps> = ({
  children,
  variant = 'navy',
  onCtaClick,
  onClose,
  ...rest
}: BannerProps) => {
  return (
    <BannerContainer bg={variant} {...rest}>
      <Box gridArea="content" fontSize="inherit">
        <BannerMarkdown
          onAnchorClick={onCtaClick}
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
