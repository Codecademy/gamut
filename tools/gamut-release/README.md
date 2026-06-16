# Gamut Release

A CLI tool for publishing prerelease versions of packages in the gamut repo using Nx release.

Mainly meant to be run in CI.

## Overview

This tool automates publishing alpha or beta prereleases of packages. It is run in CI on pull requests via the Nx target `gamut-release:pre-release`, which injects the required Node experimental flags.

The Release Plan workflow (`release-plan-check.yml`) enforces version plans on PRs separately from these prerelease publishes.

## Usage

### Prerelease publish

```bash
npx nx run gamut-release:pre-release --preid=alpha.abc123
```

By default, the **npm dist-tag** is the same as `--preid`. To publish under a standard tag such as `beta` while using a unique semver prerelease id, pass **`--publish-tag`**:

```bash
npx nx run gamut-release:pre-release --preid=beta.pr123.456789 --publish-tag=beta
```

### Manifest output (optional)

```bash
npx nx run gamut-release:pre-release --preid=alpha.abc123 --manifest[=path]
```
