# Gamut Styles

Base SCSS for Codecademy

## Variables/

This folder houses all shared SCSS style variables.
It also contains a JavaScript file with color variables.

## Core/

This folder contains a base stylesheet for the app.
This should be imported **once** in your application.

## Utils/

This folder contains Sass functions (pure utilities with no stylesheet output values) and mixins (outputs CSS)
to be used as needed both in Gamut and across the Codecademy app.

The `utils.scss` and `core.scss` just import the index files from their respective folders, to make the syntax to import them from elsewhere easier, e.g.:

`@use "~@codecademy/gamut-styles/utils";`
`@use "~@codecademy/gamut-styles/core";`
