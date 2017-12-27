# GAMUT

*Styleguide & Component library for codecademy.com*

---

This repository is a monorepo that we manage using [Lerna](https://lernajs.io/). That means that we actually publish several packages to npm from the same codebase, including:

[`gamut`: Our React UI component library](/packages/gamut/README.md)

[`gamut-styles`: Utility styles for gamut components and codecademy apps](/packages/gamut-styles/README.md)

[`gamut-storybook`: A component development sandbox for Gamut components](/packages/gamut-storybook/README.md)

## Local development

1. Run `yarn global add lerna@2.5.1` in the root directory (check for the exact version number in `lerna.json`)
1. Run `yarn` in the root directory
1. Run `lerna bootstrap` to prep each package in the `packages` directory for development

### Running storybook

1. Cd into `packages/gamut-storybook` and run `npm start` to start the storybook server
1. Add new stories to `packages/gamut-storybook/stories`

### Cross-package development

_Follow these steps when you need to make changes to Gamut that are immediately reflected in the Codecademy app._
1. Install `npm-sync` with `yarn global add npm-sync`
2. Cd into `../Codecademy` (targeting wherever your Codecademy app is located)
3. Run `npm-sync ../gamut/packages/gamut` (targeting wherever the gamut _child package_ is located)
4. Any changes to `gamut/packages/gamut` will trigger a reinstall in the Codecademy app. Note that checking out another git branch inside of `gamut/packages/gamut` may break this flow - you'll have to re-sync starting with step 2.
5. Commit and publish any Gamut changes as usual.
6. Once your Gamut changes have been merged to master, submit a PR to the Codecademy app that upgrades the Gamut package version and includes any code changes for the main app.

### Publishing the modules

1. Make sure your changes have been reviewed and then merged into the `master` branch
1. Run `lerna publish`

### Publishing the storybook

1. To build the story, book, cd into `packages/gamut-storybook` and run `npm run build`, and commit the changes to `master`. These updates will be available on [`styleguide.codecademy.com/storybook`](http://styleguide.codecademy.com/storybook).
