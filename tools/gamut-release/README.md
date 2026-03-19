# Gamut Release

A CLI tool for publishing alpha versions of packages in the gamut repo using Nx release.

Mainly meant to be run in CI.

## Overview

This tool automates the process of publishing alpha versions of packages in the gamut repo. It handles version bumping, git commits, and npm publishing based on version plan files.

## Usage

### Alpha Release

```bash
nx run gamut-release:alpha
```
