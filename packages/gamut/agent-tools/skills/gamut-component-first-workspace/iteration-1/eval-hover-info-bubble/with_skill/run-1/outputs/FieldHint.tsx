import { Box, BoxProps, ToolTip, ToolTipProps } from '@codecademy/gamut';
import { MiniInfoOutlineIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

/**
 * `FieldHint` is a small info icon meant to sit next to a form label. Hovering
 * or focusing the icon reveals extra explanatory text in a floating bubble.
 *
 * It's a thin composition of Gamut's `ToolTip` (which already handles the
 * hover/`:focus-visible` reveal, positioning, and `role="tooltip"` wiring) around
 * a minimal icon trigger, rather than a hand-rolled popover - see the
 * `gamut-component-first` skill for why that matters.
 *
 * Usage:
 * ```tsx
 * <FlexBox alignItems="center" gap={4}>
 *   <FormGroupLabel htmlFor="email">Email</FormGroupLabel>
 *   <FieldHint hint="We'll only use this to send order updates." label="More info about Email" />
 * </FlexBox>
 * ```
 *
 * For screen reader users who don't hover/focus the icon itself, pass `id`
 * here and reuse it as the related field's `aria-describedby` so the hint
 * text is announced when the field is focused too.
 */
export type FieldHintProps = {
  /**
   * The explanatory text (or rich content) shown in the floating bubble.
   */
  hint: ToolTipProps['info'];
  /**
   * Accessible name for the hint icon itself, e.g. "More info about Email".
   * @default 'More information'
   */
  label?: string;
  /**
   * Id applied to the tooltip content. Reuse this as `aria-describedby` on
   * the related form field so its hint is announced on field focus as well.
   */
  id?: string;
  /**
   * Additional props forwarded to the underlying `ToolTip`, e.g. `alignment`,
   * `placement`, or `narrow`.
   */
  tipProps?: Omit<ToolTipProps, 'info' | 'children' | 'id'>;
} & Omit<BoxProps, 'as' | 'children'>;

const HintTrigger = styled(Box)(
  css({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    height: 20,
    width: 20,
    p: 0,
    border: 'none',
    borderRadius: 'circle',
    bg: 'transparent',
    color: 'secondary',
    cursor: 'pointer',
    '&:hover': {
      bg: 'background-hover',
    },
    '&:focus-visible': {
      outline: 'none',
    },
    // Custom focus ring drawn on a pseudo-element (rather than the native
    // outline) so it isn't clipped by the icon's small hit area.
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: -2,
      borderRadius: 'circle',
      border: 2,
      borderColor: 'primary',
      opacity: 0,
    },
    '&:focus-visible::before': {
      opacity: 1,
    },
  })
);

export const FieldHint: React.FC<FieldHintProps> = ({
  hint,
  label = 'More information',
  id,
  tipProps,
  ...rest
}) => (
  <ToolTip id={id} info={hint} {...tipProps}>
    <HintTrigger aria-label={label} as="button" type="button" {...rest}>
      <MiniInfoOutlineIcon aria-hidden height={16} width={16} />
    </HintTrigger>
  </ToolTip>
);
