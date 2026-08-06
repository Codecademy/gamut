import { all } from '@codecademy/gamut-styles/dist/variance/config';
import {
  states as baseStates,
  variant as baseVariant,
} from '@codecademy/gamut-styles/dist/variance/props';
import { variance } from '@codecademy/variance';

/* Re-exports the REAL Gamut style helpers, pulled from the deep `dist/variance`
 * path rather than the package root so we don't drag `GamutProvider`
 * (framer-motion, get-nonce, globals) into a node microbenchmark.
 *
 * `css`/`variant`/`states` here are the genuine article — the same factories
 * every consumer call site uses today. They emit plain `CSSObject`s and do not
 * import Emotion at runtime, which is exactly why both benchmark arms can share
 * them. */
export { css } from '@codecademy/gamut-styles/dist/variance/props';
export { styledOptions } from '@codecademy/gamut-styles/dist/variance/utils';

/* FAIRNESS FIX: the engine filters props off the DOM by reading `propNames` from
 * its style functions, but the real gamut-styles `variant`/`states` don't expose
 * them (production Gamut would add this — see the spike engine's props.ts). The
 * Emotion arm gets the same filtering via `styledOptions([...])`, so without this
 * wrapper the engine arm would do strictly LESS work and also leak `fullWidth` /
 * `compact` onto the DOM. Attaching the names keeps both arms honest. */
export const variant = ((config: Parameters<typeof baseVariant>[0]) =>
  Object.assign(baseVariant(config), {
    propNames: [config.prop ?? 'variant'],
  })) as typeof baseVariant;

export const states = ((config: Parameters<typeof baseStates>[0]) =>
  Object.assign(baseStates(config), {
    propNames: Object.keys(config),
  })) as typeof baseStates;

/** All system props at once — what `Box` applies. */
export const systemProps = variance.create(all);
