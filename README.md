# GAMUT

*Styleguide & Component library for codecademy.com*

---

This repository is a monorepo that we manage using [Lerna](https://lernajs.io/). That means that we actually publish several packages to npm from the same codebase, including:

[`gamut`: Our React UI component library](/packages/gamut/README.md)

[`gamut-styles`: Utility styles for gamut components and codecademy apps](/packages/gamut-styles/README.md)

[`gamut-storybook`: A component development sandbox for Gamut components](/packages/gamut-storybook/README.md)

## Local development

1. Run `npm install lerna -g` to install `lerna` globally
1. Run `lerna bootstrap` to bootstrap the modules in the repo for development

### Running storybook

1. Cd into `packages/gamut-storybook` and run `npm start` to start the storybook server
1. Add new stories to `packages/gamut-storybook/stories`

### Publishing the modules

1. Make sure your changes have been reviewed and then merged into the `master` branch
1. Run `lerna publish`
1. Push the updated master branch, and then run `git push --tags` to push up the new tags.

### Publishing the storybook

1. To build the story, book, cd into `packages/gamut-storybook` and run `npm run build`, and commit the changes to `master`. These updates will be available on [`styleguide.codecademy.com/storybook`](http://styleguide.codecademy.com/storybook).

### Updating the changelog

Install `lerna-changelog`

```bash
npm install -g lerna-changelog
```

[Setup a Github personal authentication token as described in lerna-changelog's README](https://github.com/lerna/lerna-changelog)

Tag the PRs and issues with the "bug" and "enhancement" tags appropriately, as lerna-changelog will look at these to create the changelog.

After publishing a new version, run `lerna-changelog` and copy the output into the `CHANGELOG.md` file.
