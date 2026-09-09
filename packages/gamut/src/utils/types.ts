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
