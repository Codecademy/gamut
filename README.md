# GAMUT

*Styleguide & Component library for codecademy.com*

---

[storybook](http://styleguide.codecademy.com/storybook)

### Publishing the component library

1. Make sure your changes have been merged into the master branch
1. Run the `npm version` command with the appropriate semver version (major, minor, patch): [npm version](https://docs.npmjs.com/cli/version)
1. Run `npm run release` from the root directory†

† **Do not** run `npm publish` directly, use `npm run release`. This copies the package.json file to the `src` directory, and runs `npm publish src`. This makes it so only things in the `src` directory are published to npm. It also makes it possible to import components like `import Button from 'gamut/Button'` instead of `import Button from 'gamut/src/Button'`.

### Publishing the storybook

1. From the root directory, run `npm run build`, this will run the storybook static build process and put the output into the `doc` folder.
1. Merge into the master branch and push, and your changes should go live on the [storybook](http://styleguide.codecademy.com/storybook) page.
