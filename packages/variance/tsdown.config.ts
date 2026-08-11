import { defineConfig } from 'tsdown';

/* SPIKE (GMT-1715, go/no-go criterion #4): can tsdown replace the current
 * `tsc --emitDeclarationOnly` + `babel ./src --out-dir ./dist` pair?
 *
 * `variance` first because it's the simplest real case — pure TypeScript, no JSX,
 * no SVG, two dependencies. If tsdown can't do this one there's no point testing
 * the harder packages.
 *
 * Deliberately tests the OUTPUT SHAPE the reboot decided on
 * (`build-tooling-rfc.md`): bundled per entry, ESM + CJS, with a strict `exports`
 * map — not today's un-bundled file-per-file `dist/`. That shape is what forces
 * the 66 deep-import migrations in mono/platform, so the spike has to produce it
 * or it isn't testing the real decision.
 */
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  // tsdown bundles rolldown-plugin-dts, so types come from the same run
  dts: true,
  outDir: 'dist-tsdown',
  // keep peers and deps external; this is a library, not an app bundle
  external: ['@emotion/react', 'typescript'],
  sourcemap: true,
  clean: true,
  // fail loudly rather than silently shipping a broken barrel
  treeshake: true,
});
