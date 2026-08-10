import { defineConfig } from 'tsdown';

/* SPIKE (GMT-1715, criterion #4) — the package that decides it.
 *
 * 426 source files, 106 of which import `styled` from Emotion, plus one CSS asset
 * (vidstack). If tsdown can't do this one, the other results don't matter.
 *
 * `dts: true` deliberately left ON despite `build-tooling-rfc.md` recommending we
 * keep `tsc --emitDeclarationOnly`. On `gamut-styles` tsdown's bundled
 * declarations came out SMALLER than tsc's per-file output (396kB vs 481kB), so
 * that recommendation is worth re-testing at this scale rather than assumed.
 */
export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  outDir: 'dist-tsdown',
  external: [
    /^@emotion\//,
    /^@codecademy\//,
    /^react/,
    /^@vidstack\//,
    'lodash',
    'csstype',
    /* tsdown refuses a `.css` import unless `@tsdown/css` is installed. Rather
     * than add another dependency, keep CSS external — which is also what the
     * current build does: it `cpy`s CSS into dist and lets the consumer's bundler
     * handle the side-effect import. Behaviour-preserving, one less dep. */
    /\.css$/,
  ],
  sourcemap: true,
  clean: true,
  treeshake: true,
});
