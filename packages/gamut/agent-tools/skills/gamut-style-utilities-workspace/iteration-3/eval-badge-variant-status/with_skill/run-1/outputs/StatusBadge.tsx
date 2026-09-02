import { variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

export type StatusBadgeStatus = 'success' | 'warning' | 'info';

// Mutually-exclusive visual variants keyed off a `status` prop, following the
// same `variant()` pattern used throughout gamut for single-select styling
// (e.g. Alert's `placementVariants`, Tabs, Toast).
const statusBadgeVariants = variant({
  prop: 'status',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 'full',
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 'base',
    px: 8,
    py: 4,
    whiteSpace: 'nowrap',
  },
  variants: {
    // `background-success` / `feedback-success` are semantic tokens that
    // adapt automatically between light and dark ColorMode.
    success: {
      bg: 'background-success',
      color: 'feedback-success',
    },
    warning: {
      bg: 'background-warning',
      color: 'feedback-warning',
    },
    // The core theme has no semantic "info" token (unlike success/warning,
    // which have adapting `background-*`/`feedback-*` pairs) — Alert's
    // `general` variant hits this same gap and falls back to the raw `blue`
    // palette for the same reason. This is a deliberate fixed-color
    // exception per gamut-style-utilities/gamut-color-mode guidance, not a
    // pattern to copy for the success/warning colors above.
    info: {
      bg: 'blue-0',
      color: 'blue-800',
    },
  },
});

const StatusBadgeBase = styled.span(statusBadgeVariants);

export type StatusBadgeProps = Omit<
  StyleProps<typeof statusBadgeVariants>,
  'status'
> & {
  status: StatusBadgeStatus;
  children: React.ReactNode;
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  children,
  ...rest
}) => <StatusBadgeBase {...rest}>{children}</StatusBadgeBase>;
