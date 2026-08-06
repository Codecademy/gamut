import { type ReactNode, useId, useState } from 'react';
import { css } from 'styled-system/css';

/* Panda-native rebuild of gamut's ToolTip — same external API shape (info,
 * placement, alignment, closeOnClick, id + a trigger child), authored entirely
 * with Panda `css` (zero-runtime static classes; only open/close is stateful).
 * Simplified to top-center for the spike; real gamut also does floating/inline
 * placements + arrow. Proves ToolTip can be rebuilt on Panda, not imported from
 * the Emotion package. */

export type TipPlacement = 'inline' | 'floating';
export type TipAlignment =
  | 'top-center'
  | 'bottom-center'
  | 'top-left'
  | 'top-right';

export type ToolTipProps = {
  info: ReactNode;
  children: ReactNode;
  id?: string;
  placement?: TipPlacement;
  alignment?: TipAlignment;
  /** close immediately when the trigger is clicked/activated (default true) */
  closeOnClick?: boolean;
};

const wrapper = css({ position: 'relative', display: 'inline-flex' });

const bubble = css({
  position: 'absolute',
  bottom: '[100%]',
  left: '[50%]',
  transform: '[translateX(-50%)]',
  mb: '8',
  bg: 'text',
  color: 'background',
  px: '8',
  py: '4',
  borderRadius: 'md',
  fontSize: '14',
  fontFamily: 'base',
  whiteSpace: 'nowrap',
  zIndex: '[100]',
  pointerEvents: 'none',
  transitionProperty: 'opacity',
  transitionDuration: 'fast',
});

export const ToolTip = ({
  info,
  children,
  id,
  closeOnClick = true,
  // placement/alignment accepted for API parity; spike renders top-center only
  placement: _placement,
  alignment: _alignment,
}: ToolTipProps) => {
  const generatedId = useId();
  const tipId = id ?? generatedId;
  const [open, setOpen] = useState(false);

  return (
    <span
      className={wrapper}
      onBlur={() => setOpen(false)}
      onClick={() => closeOnClick && setOpen(false)}
      onFocus={() => setOpen(true)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* aria-describedby wiring so the trigger is described by the tip */}
      <span aria-describedby={tipId} style={{ display: 'inline-flex' }}>
        {children}
      </span>
      <span
        className={bubble}
        id={tipId}
        role="tooltip"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
        }}
      >
        {info}
      </span>
    </span>
  );
};
