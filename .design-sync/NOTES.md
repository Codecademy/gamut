# Design Sync Notes — Gamut

## Setup

- Package manager: yarn (hoisted node_modules at repo root)
- Node version: v22 (.nvmrc: v22.13.1)
- Shape: storybook — `.storybook` at `packages/styleguide/.storybook`
- DS entry: `packages/gamut/dist/index.js` (already compiled — barrel re-exports)
- node_modules for converter: pass `--node-modules /Users/cass/code/cc/gamut/node_modules` (react/react-dom hoisted to root)

## Storybook build — must use NX, not plain `npx storybook build`

`main.ts` loads `require.resolve('@nx/react/plugins/storybook')` which requires NX project context.
Plain `npx storybook build` fails with: `TypeError: Cannot read properties of undefined (reading 'data')` in `@nx/react/plugins/storybook/index.js`.

**Build command** (run from repo root):

```bash
yarn nx run styleguide:build-storybook --outputDir="$(pwd)/.design-sync/sb-reference"
```

## Fonts — CDN-served, not local

Fonts are served from `https://www.codecademy.com/gamut` (defined in `packages/gamut-styles/src/remoteAssets/fonts.ts`).
Fonts loaded dynamically via Emotion `@font-face` rules injected by `<Typography>` inside `GamutProvider`.

- Core theme: Apercu (regular, italic, bold, bold-italic) + Suisse (bold, regular)
- Other themes may have different font stacks

Config key: `runtimeFontPrefixes: ["https://www.codecademy.com/gamut"]`

## Dist patch — re-apply after `yarn build`

`packages/gamut/dist/Video/lib/VidstackPlayer.js` line 4: import changed from `.scss` to `.css` for esbuild compatibility.
`packages/gamut/dist/Video/styles/vds_base_theme.css` (empty): created alongside the `.scss` so the import resolves.

`Markdown` imports `Video` transitively, so both would fail without this patch.
After any `yarn build` re-run, re-apply:

```bash
sed -i '' "s|import '../styles/vds_base_theme.scss'|import '../styles/vds_base_theme.css' // patched for design-sync: .scss unsupported by esbuild|" packages/gamut/dist/Video/lib/VidstackPlayer.js
printf '/* @ds-css-runtime: vds_base_theme.scss patched to .css stub for esbuild compatibility */\n' > packages/gamut/dist/Video/styles/vds_base_theme.css
```

The `@ds-css-runtime` marker in the CSS stub is important: esbuild extracts the stub into `_ds_bundle.css`, and the validator recognises the marker as "CSS-in-JS, no compiled stylesheet" instead of failing with `[CSS_PLACEHOLDER]`.

## Re-sync risks

- Font CDN (`https://www.codecademy.com/gamut`) must be reachable during compare runs — storybook and previews both load fonts from there
- Storybook webpack aliases point at package `src/` directly (e.g. `@codecademy/gamut → packages/gamut/src`) — storybook builds TS source, not dist; converter bundles dist
