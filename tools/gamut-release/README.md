# Gamut Release

A CLI tool for publishing alpha versions of packages in the gamut repo using Nx release.

Mainly meant to be run in CI.

## Overview

This tool automates the process of publishing alpha versions of packages in the gamut repo. This is mainly meant to be run in CI for pull requests, but can be run manually using the same Nx target.

CI is responsible for validating the presence of a version plan before running alpha publishes.

## Usage

### Alpha Release

```bash
npx nx run gamut-release:alpha --preid=alpha.abc123
```

### Manifest output (optional)

```bash
npx nx run gamut-release:alpha --preid=alpha.abc123 --manifest[=path]
```
