import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { Background, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { HTMLProps, useMemo } from 'react';

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

const BannerLink = styled(TextButton)(
  system.css({
    mx: 4,
    '&:last-of-type': {
      mr: 0,
    },
  })
);

const BannerContent = styled(Markdown)`
  font-size: inherit;
`;

export const Banner: React.FC<BannerProps> = ({
  children,
  variant = 'navy',
  onCtaClick,
  onClose,
  ...rest
}: BannerProps) => {
  // Bind overrides with the correct props
  const overrides = useMemo(
    () => ({
      a: {
        allowedAttributes: ['href', 'target'],
        processNode: (node: unknown, props: { onClick?: () => void }) => (
          <BannerLink
            {...props}
            size="small"
            target="_BLANK"
            onClick={() => {
              props.onClick && props.onClick();
              onCtaClick && onCtaClick();
            }}
          />
        ),
        component: BannerLink,
      },
    }),
    [onCtaClick]
  );

  return (
    <BannerContainer bg={variant} {...rest}>
      <Box gridArea="content">
        <BannerContent
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
