import { defineConfig } from 'tsdown';

/* SPIKE (GMT-1715, criterion #4), the harder case: 16 `.tsx` files and 20 Emotion
 * imports. Two things to learn that `variance` couldn't tell us:
 *
 *   1. Does tsdown handle JSX without a Babel step?
 *   2. Does dropping `@emotion/babel-plugin` break anything?
 *
 * (2) is the one that decides Phase ordering. That plugin is the repo's one hard
 * Babel dependency, and it's configured here only for `sourceMap` + `autoLabel`
 * + `labelFormat` — DX, not correctness. If tsdown is fine without it, the build
 * migration doesn't need a `@rolldown/plugin-babel` bridge and can land whenever.
 * If it isn't, the bridge is Phase 1 work that Phase 2 then deletes.
 *
 * MULTIPLE ENTRIES on purpose. The reboot's output decision is bundled *per
 * entry* plus a strict `exports` map, and the highest-priority known consumer
 * break is `gamut-styles/dist/AssetProvider` (`createFontLinks`) used in mono's
 * app entry points. So AssetProvider gets its own entry here, to prove a deep
 * import can be preserved as a real subpath rather than needing a code change.
 */
export default defineConfig({
  entry: ['src/index.ts', 'src/AssetProvider.tsx'],
  format: ['esm', 'cjs'],
  dts: { tsconfig: 'tsconfig.lib.json' },
  outDir: 'dist-tsdown',
  external: [
    '@emotion/react',
    '@emotion/styled',
    '@emotion/cache',
    '@codecademy/variance',
    'react',
    'react-dom',
    'lodash',
    'csstype',
  ],
  sourcemap: true,
  clean: true,
  treeshake: true,
});
