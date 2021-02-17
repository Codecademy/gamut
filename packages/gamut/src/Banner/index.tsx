import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useMemo } from 'react';

import { IconButton, TextButton } from '../Button';
import { Markdown } from '../Markdown';
import { createTagOverride } from '../Markdown/libs/overrides';

type BannerVariants = 'navy' | 'yellow';

export interface BannerProps {
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

const BannerContent = styled(Markdown)`
  font-size: inherit;
`;

export const Banner: React.FC<
  React.ComponentProps<typeof BannerContainer> & BannerProps
> = ({
  children,
  variant = 'navy',
  onCtaClick,
  onClose,
  ...rest
}: BannerProps) => {
  const mode = variant === 'navy' ? 'dark' : 'light';

  // Bind overrides with the correct props
  const overrides = useMemo(
    () => ({
      a: {
        allowedAttributes: ['href'],
        processNode: (node: unknown, props: { onClick?: () => void }) => (
          <TextButton
            {...props}
            mode={mode}
            size="small"
            target="_BLANK"
            onClick={() => {
              props.onClick && props.onClick();
              onCtaClick && onCtaClick();
            }}
          />
        ),
        component: TextButton,
      },
    }),
    [onCtaClick, mode]
  );

  return (
    <BannerContainer variant={variant} {...rest}>
      <BannerContent
        overrides={overrides}
        text={children}
        skipDefaultOverrides={{ a: true }}
      />
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
