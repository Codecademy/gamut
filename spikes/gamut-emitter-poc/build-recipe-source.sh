#!/bin/sh
# Bundle the real variance + real Gamut prop config + real Core theme into one
# self-contained ESM file, so `recipes.mjs` runs under plain Node with no
# node_modules at all. Mirrors gamut-atomics-poc/dist/gamut-source.bundle.mjs.
set -e
node_modules/.bin/esbuild recipe-source.mjs \
  --bundle --platform=node --format=esm --outfile=dist/recipe-source.bundle.mjs
