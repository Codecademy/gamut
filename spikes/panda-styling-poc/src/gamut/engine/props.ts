import {
  all,
  background,
  border,
  color,
  flex,
  grid,
  layout,
  list,
  positioning,
  shadows,
  space,
  typography,
} from '@codecademy/gamut-styles/dist/variance/config';
import { variance } from '@codecademy/variance';

/* The authoring API, rebuilt on the REAL Gamut prop config
 * (packages/gamut-styles/src/variance/config.ts) with zero Emotion imports.
 *
 * This is the crux of the spike: `css`/`variant`/`states` are byte-for-byte the
 * same factories consumers use today. They already return
 * `(props: ThemeProps) => CSSObject` and evaluate at runtime, so functions,
 * ternaries, `theme.x` access and computed enum keys all keep working — the
 * exact cases a static extractor has to punt on. */

export const css = variance.createCss(all);

const baseVariant = variance.createVariant(all);
const baseStates = variance.createStates(all);

/* variance's factories don't report which props they consume, which is why call
 * sites today must hand-maintain `styledOptions(['isFancy'])` to keep state props
 * off the DOM. Attaching the names here lets `styled` filter them automatically —
 * removing a whole category of boilerplate rather than porting it. */
export const variant = ((config: Parameters<typeof baseVariant>[0]) =>
  Object.assign(baseVariant(config), {
    propNames: [config.prop ?? 'variant'],
  })) as typeof baseVariant;

export const states = ((config: Parameters<typeof baseStates>[0]) =>
  Object.assign(baseStates(config), {
    propNames: Object.keys(config),
  })) as typeof baseStates;

/** `system.*` prop groups, unchanged — for `variance.compose()` at call sites. */
export const system = {
  typography: variance.create(typography),
  grid: variance.create(grid),
  flex: variance.create(flex),
  layout: variance.create(layout),
  positioning: variance.create(positioning),
  background: variance.create(background),
  color: variance.create(color),
  shadow: variance.create(shadows),
  space: variance.create(space),
  border: variance.create(border),
  list: variance.create(list),
  css,
  variant,
  states,
};

/** Every system prop at once — what `Box` and friends apply. */
export const systemProps = variance.create(all);

/* Names to keep off the DOM. Emotion used `@emotion/is-prop-valid` for this;
 * the prop config is already the authoritative list, so the dependency goes
 * away rather than needing a replacement. */
export const systemPropNames = new Set<string>([
  ...Object.keys(all),
  'theme',
  'variant',
  'mode',
]);
