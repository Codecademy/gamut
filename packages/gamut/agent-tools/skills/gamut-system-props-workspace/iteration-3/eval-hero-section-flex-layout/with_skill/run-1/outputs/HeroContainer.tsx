import { FlexBox } from '@codecademy/gamut';
import { ComponentProps } from 'react';

export type HeroContainerProps = ComponentProps<typeof FlexBox>;

/**
 * Layout wrapper for the Teams landing page hero section.
 *
 * Renders a flex column with 16px padding on all sides, 24px margin-top,
 * and white text.
 *
 * `flexDirection`, `p`, `mt`, and `color` are all Gamut system props already
 * exposed by `FlexBox` — no `styled()` wrapper is needed to hand-write this
 * CSS (see the gamut-system-props skill).
 *
 * `color="text"` is the semantic alias for standard body text rather than
 * the raw palette token `white`: it resolves to white in dark mode (matching
 * "white text") while still adapting correctly if this hero is ever rendered
 * in light mode (see the gamut-color-mode skill). If this hero must always
 * sit on a fixed dark surface regardless of ColorMode, use `color="white"`
 * instead.
 */
export const HeroContainer = ({ children, ...rest }: HeroContainerProps) => (
  <FlexBox flexDirection="column" p={16} mt={24} color="text" {...rest}>
    {children}
  </FlexBox>
);
