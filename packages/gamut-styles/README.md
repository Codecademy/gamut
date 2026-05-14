# Gamut Styles

Base SCSS for Codecademy

## Variables/

This folder houses all shared SCSS style variables.
TypeScript color tokens and palettes live in `variables/colors.ts` and are exposed on themes as `theme.colors` (see `src/themes/`). Legacy `editorColors`, `platformColors`, `swatches`, and the flat deprecated `colors` map were removed from this package—use `corePalette` / `platformPalette` and theme color modes instead.

## Core/

This folder contains a base stylesheet for the app.
This should be imported **once** in your application.

## Utils/

This folder contains Sass functions (pure utilities with no stylesheet output values) and mixins (outputs CSS)
to be used as needed both in Gamut and across the Codecademy app.

The `utils.scss` and `core.scss` just import the index files from their respective folders, to make the syntax to import them from elsewhere easier, e.g.:

`@use "~@codecademy/gamut-styles/utils";`
`@use "~@codecademy/gamut-styles/core";`
