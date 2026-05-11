# Figma variables export (Gamut file)

This folder holds optional exports from the [Gamut Figma file](https://www.figma.com/design/ReGfRNillGABAj5SlITalN/) used to cross-check tokens against `@codecademy/gamut-styles`.

## Requirements

- Figma **Personal Access Token** with access to the file.
- The Variables REST endpoint [`GET /v1/files/:file_key/variables/local`](https://www.figma.com/developers/api#get-local-variables-endpoint) is documented as available to **full members of Enterprise orgs**. If your token receives `403`, use **Variables → Export** from Figma (or Tokens Studio) and save JSON into `gamut-variables.local.json` using the same shape as the API response (`meta.variables`, `meta.variableCollections`).

## Fetch via script

From the repo root (with network):

```bash
export FIGMA_ACCESS_TOKEN="your-token"
yarn nx run gamut-styles:fetch-figma-variables
```

Writes `gamut-variables.local.json` here (gitignored).

## Compare to code

```bash
yarn nx run gamut-styles:compare-figma-gamut-tokens
```

Add `--require-export` to fail CI when the export file is missing. Use `--verbose` for per-token detail.
