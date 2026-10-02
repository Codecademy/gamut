import { GamutIconProps } from '@codecademy/gamut-icons';

export interface WithChildrenProp {
  children?: React.ReactNode | React.ReactNode[];
}

/*
 * Allows any `data-*` attribute to be named explicitly in a prop type. React's
 * HTML attribute types never declare a `data-*` index signature, and the JSX
 * compiler exemption only covers attributes written literally at a call site -
 * so nested prop bags (`cta={{ ... }}`) and internals that read a key by name
 * need this. Template-literal keys constrain only `data-*`, leaving the rest of
 * the interface's members under normal excess-property checking.
 */
export interface DataAttributes {
  [key: `data-${string}`]: string | number | boolean | undefined;
}

/*
 * TRAP: never intersect `DataAttributes` directly onto a type derived from
 * `ComponentProps<typeof SomeButtonOrAnchorComponent>` (`FillButton`,
 * `CTAButton`, `Anchor`, anything built on `ButtonBase`, or a styled wrapper
 * of one of those). Those types are themselves unions - `ButtonBase` unions
 * its button and anchor variants - and adding this index signature on top
 * makes any consumer-side `keyof`/mapped type over the result (a `Pick`, an
 * `Omit`, or an `ExtractableProps`-style helper picking a few keys) degrade
 * into a signature that constrains every property, plus TS2590 "union type
 * too complex". This has broken real consumers four separate times
 * (`CheckboxProps`, `Alert`'s `cta`, `InfoTip`/`Disclosure`'s `buttonProps`,
 * `GridFormButtons`' `cancel`), always for someone downstream trying to
 * narrow the prop bag, not for the component itself.
 *
 * Three fixes, in order of preference:
 * 1. `Omit` the key(s) the union actually varies on (or that the component
 *    always sets after spreading the bag, e.g. `onClick`) before
 *    intersecting `DataAttributes`. Confirmed empirically to resolve the
 *    union without a behavior change when the omitted key is redundant.
 *    See `InfoTip`'s and `Disclosure`'s `buttonProps`, and `Tag`'s
 *    `TagAnchorPassthroughProps`/`DismissButtonPassthroughProps`.
 * 2. If the varying key is a real feature (not redundant), `Omit` it anyway
 *    and re-declare it with a flat, single-element signature instead of the
 *    union's. See `GridFormButtons`' `cancel`, which re-declares `onClick` as
 *    `ButtonBaseProps['onClick']` (button-only) rather than `ButtonProps`'s
 *    button|anchor union - no behavior change, since `cancel` only ever
 *    renders as a `TextButton`.
 * 3. If there's no safe key to omit, drop `DataAttributes` from that prop
 *    entirely - `data-*` still reaches the DOM at runtime through the
 *    existing `{...bag}` spread, it just can't be named in an object
 *    literal without a cast. See the note on `Alert`'s `cta`.
 *
 * Safe without any fix: prop bags typed from a flat, non-union native
 * element (`ComponentPropsWithoutRef<'label'>`, `<'input'>`, etc.) - that's
 * `Checkbox`/`Radio`'s `labelProps` and `Toggle`'s `inputProps`.
 */

/*
 * Attributes Gamut sets and then reads back off the DOM, so a consumer must not
 * supply them. Declaring a key makes TypeScript check it, which it otherwise
 * skips for any hyphenated JSX attribute - though only on components that
 * declare it, so this is a guard rail rather than a guarantee. The guarantee is
 * setting these after `{...rest}` on the element itself.
 */
export interface ReservedDataAttributes {
  /** Read via `closest()` in PopoverContainer for outside-click detection. */
  'data-floating'?: never;
}

export type IconComponentType = { icon: React.ComponentType<GamutIconProps> };
