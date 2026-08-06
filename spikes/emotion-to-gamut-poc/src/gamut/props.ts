import { all } from '@codecademy/gamut-styles/dist/variance/config';
import { variance } from '@codecademy/variance';

/* `css`, `variant` and `states` built on the REAL Gamut prop config
 * (packages/gamut-styles/src/variance/config.ts) with the REAL `variance` — the
 * same factories every mono call site already imports. Zero Emotion.
 *
 * This is the crux of the proof: these are not reimplementations. They already
 * return `(props) => CSSObject` and already resolve at runtime, so functions,
 * ternaries, `theme.x` access and computed keys all keep working. */

export const css = variance.createCss(all);

const baseVariant = variance.createVariant(all);
const baseStates = variance.createStates(all);

/* Wrapped only to record which props each one reads. Emotion made call sites
 * hand-maintain that list via `styledOptions(['isFancy'])`; here `styled` can work
 * it out, so those lists don't need porting. */
export const variant = ((config: Parameters<typeof baseVariant>[0]) =>
  Object.assign(baseVariant(config), {
    propNames: [config.prop ?? 'variant'],
  })) as typeof baseVariant;

export const states = ((config: Parameters<typeof baseStates>[0]) =>
  Object.assign(baseStates(config), {
    propNames: Object.keys(config),
  })) as typeof baseStates;

/** Every system prop at once — what `Box` and friends apply. */
export const systemProps = variance.create(all);

/** Prop names to keep off the DOM. The prop config is already the source of truth,
 *  so `@emotion/is-prop-valid` isn't needed. */
export const systemPropNames = new Set<string>([
  ...Object.keys(all),
  'theme',
  'variant',
  'mode',
]);

/* Compatibility shim so `styled('div', styledOptions)` and `styledOptions(['size'])`
 * call sites compile unchanged. Deliberately provides NO `shouldForwardProp` — if
 * it did, it would override the engine's own filtering and leak system props onto
 * the DOM. `styled` derives the filter from the style functions instead, so this
 * has genuinely nothing left to do. */
type StyledOptionsShim = { shouldForwardProp?: (prop: string) => boolean } & (<
  El = unknown,
  Additional extends string = never
>(
  additional?: readonly Additional[]
) => { shouldForwardProp?: (prop: string) => boolean });

export const styledOptions = (() => ({})) as StyledOptionsShim;
