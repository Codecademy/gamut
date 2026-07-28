import { css, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import * as React from 'react';

/**
 * Mutually-exclusive visual variants for `StatusBadge`, each pairing a pale
 * background with a high-contrast text color from the same hue.
 */
const statusBadgeVariants = variant({
  prop: 'status',
  defaultVariant: 'info',
  variants: {
    success: {
      bg: 'green-0',
      color: 'green-900',
    },
    warning: {
      bg: 'yellow-0',
      color: 'yellow-900',
    },
    info: {
      bg: 'blue-0',
      color: 'blue-800',
    },
  },
});

const StyledStatusBadge = styled.span<StyleProps<typeof statusBadgeVariants>>(
  css({
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 'full',
    fontSize: 14,
    fontWeight: 'title',
    lineHeight: 'title',
    px: 8,
    py: 4,
    whiteSpace: 'nowrap',
  }),
  statusBadgeVariants
);

export type StatusBadgeStatus = 'success' | 'warning' | 'info';

export type StatusBadgeProps = Omit<
  StyleProps<typeof statusBadgeVariants>,
  'status'
> & {
  /** Which status the badge communicates; determines its background and text color. */
  status: StatusBadgeStatus;
  children: React.ReactNode;
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  ...rest
}) => (
  <StyledStatusBadge role="status" status={status} {...rest}>
    {children}
  </StyledStatusBadge>
);
