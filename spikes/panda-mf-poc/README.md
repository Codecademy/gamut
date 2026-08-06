# Rspack + Module Federation spike (GMT-1715)

Branch: `cass-GMT-1715`. A yarn workspace + nx project. Answers: **does Rspack +
Module Federation (platform's setup) affect the styling-engine decision?**

A minimal MF pair — **host** (`variant="primary"`) + **remote** (exposes a
`Widget` using `variant="danger"`, a variant the host never renders) — both using
a Panda-built Gamut `Button`. The host imports the **one complete** Gamut static
stylesheet; the remote is federated in at runtime.

## Run it

```
yarn install
yarn nx run panda-mf-poc:build          # codegen + cssgen + rspack MF build (host + remote)
# to see it live (dist is static): serve each and open the host
npx http-server dist/remote -p 3001 --cors &
npx http-server dist/host   -p 3000 &
# open http://localhost:3000  → host renders its own primary button + the federated remote danger button
```

## Answer: does MF affect the styling engine? — Yes, but it's satisfiable, and Panda is _safer_ here than the alternatives

### The one real requirement (and why)

A **zero-runtime** engine emits static CSS and tree-shakes to what each build
uses. Module Federation loads a remote's components into a host **at runtime** —
so the remote's styles must already be in the document. A host's own build won't
include CSS for a variant only the remote uses.

**→ Gamut must ship a COMPLETE static stylesheet** (all recipe variants via
`staticCss`), imported once by the host. Then every federated remote's Gamut
components are covered regardless of what the host itself renders.

**Proven here:** the host build emits `gmt-button--variant_danger` even though the
host only renders `variant="primary"` — because `staticCss: { recipes: { button:
['*'] } }` force-emits every variant. The remote's `danger` widget is styled by
the host's sheet. (This is the same `staticCss` requirement documented in
BREAKING-CHANGES §2/§3.)

### Why Panda is actually SAFER across MF than some alternatives

- **Deterministic, content-based class names** — `gmt-button--variant_danger`,
  `.bg_primary` (recipe-name + property_value), identical across independent
  builds. Federated host/remote builds produce the **same** class for the same
  style, so duplicate CSS is idempotent and there are **no collisions**. Contrast
  **CSS Modules**, which hash class names **per build** → federated host/remotes
  get mismatched/duplicated names (a known MF hazard). Zero-runtime _atomic_ CSS
  is a good fit for MF.
- **Tokens at `:root`** — `--colors-*` are defined once (host's sheet); remote
  components reference the same vars. No per-remote theme runtime needed.

### Coexistence / version notes

- Keep **Gamut a shared singleton** across host + remotes (MF `shared`) so class
  names + tokens match. **Version skew** (host on Gamut vX, remote on vY) is the
  real risk — different generated classes/tokens → visual drift. Same discipline
  MF already needs for React.
- Contrast **Emotion (today)**: runtime injection means each remote self-styles
  (works out of the box), but MF apps commonly hit **multiple Emotion caches**
  across remotes (duplicate `<style>`, insertion-order/`:first-child` warnings) +
  runtime cost. Panda trades that for "ship one static sheet + shared singleton."

### Bottom line

MF **does not block** a Panda swap. It adds two requirements, both satisfied here:
**(1)** Gamut ships a complete static stylesheet (`staticCss`), imported once by
the host; **(2)** Gamut is a shared singleton version across host + remotes. With
those, federated components style correctly, and atomic/recipe class determinism
makes it _less_ fragile than per-build-hashed CSS Modules.

## Still simplified (vs platform's real setup)

- One host + one remote (platform has ~13 remotes); no runtime version-skew test.
- Build-validated + CSS-coverage-verified here; live run is the `http-server` step
  above (not visually verified in CI).
- Consumer-authored (non-Gamut) styles in a remote still inject per-remote build;
  content-based atomic classes dedupe, but that path isn't exercised here.

## Files

- `panda.config.ts` — one `button` recipe, `staticCss` all variants
- `src/ui/gamut.tsx` — the shared Panda `Button`
- `src/remote/*` — exposes `Widget` (`variant="danger"`)
- `src/host/*` — renders `variant="primary"` + lazy-loads `remote/Widget`; imports the complete sheet
- `build.mjs` — rspack `ModuleFederationPlugin` configs for host + remote
