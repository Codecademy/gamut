# Gamut

_The component library & design system for Codecademy._ ✨

---

[![GitHub Actions](https://github.com/Codecademy/gamut/workflows/Test%20Suite/badge.svg)](https://github.com/Codecademy/gamut/actions)

This repository is a monorepo that we manage using [Lerna](https://lerna.js.org/). That means that we publish several packages to npm from the same codebase, including:

## Gamut Kit

We provide a single package to manage the versions of a few core dependencies: `gamut`, `gamut-icons`, `gamut-illustrations`, `gamut-patterns`, `gamut-styles`. Since these packages are highly intertwined we suggest only installing `@codecademy/gamut-kit` when your app needs all of these.

[`gamut-kit`: Include in your application instead of the individual packages to simplify version management. ](/packages/gamut-kit/README.md)

- [![npm version](https://badge.fury.io/js/%40codecademy%2Fgamut-kit.svg)](https://badge.fury.io/js/%40codecademy%2Fgamut-kit)

1. Run `yarn add @codecademy/gamut-kit`
2. Add each of the managed packages to your peer dependencies (this is required for enabling intellisense for these packages and does not have any effect on version resolution)

```json
{
  "peerDependencies": {
    "@codecademy/gamut": "*",
    "@codecademy/gamut-icons": "*",
    "@codecademy/gamut-patterns": "*",
    "@codecademy/gamut-illustrations": "*",
    "@codecademy/gamut-styles": "*",
    "@codecademy/gamut-tests": "*",
    "@codecademy/variance": "*"
  }
}
```

## Individual Packages

[`gamut`: Our React UI component library](/packages/gamut/README.md)

- [![npm version](https://badge.fury.io/js/%40codecademy%2Fgamut.svg)](https://badge.fury.io/js/%40codecademy%2Fgamut)

[`gamut-styles`: Utility styles for Gamut components and codecademy apps](/packages/gamut-styles/README.md)

- [![npm version](https://badge.fury.io/js/%40codecademy%2Fgamut-styles.svg)](https://badge.fury.io/js/%40codecademy%2Fgamut-styles)

[`gamut-icons`: SVG Icons for Gamut components and codecademy apps](/packages/gamut-icons/README.md)

- [![npm version](https://badge.fury.io/js/%40codecademy%2Fgamut-icons.svg)](https://badge.fury.io/js/%40codecademy%2Fgamut-icons)

[`variance`: TypeScript CSS in JS utility library](/packages/variance/README.md)

- [![npm version](https://badge.fury.io/js/%40codecademy%2Fvariance.svg)](https://badge.fury.io/js/%40codecademy%2Fvariance)

[`styleguide`: Styleguide Documentation & storybook development sandbox](/packages/styleguide/README.md)

## Local development

1.  Run `yarn` in the root directory
2.  Run `yarn build` to build all of the packages (certain packages like `gamut-icons` need to be built to function in storybook).

### Running the storybook styleguide

1.  Run `yarn nx storybook styleguide` to start the storybook server
2.  Add new stories to `packages/styleguide/src`
3.  Stories are written using storybook's [Component Story Format](https://storybook.js.org/docs/formats/component-story-format/) and [MDX](https://storybook.js.org/docs/writing-docs/mdx#basic-example). Check out our comprehensive guide on writing stories [here](https://gamut.codecademy.com/?path=/docs/meta-stories--docs#quick-start).

### Publishing Modules

1.  Make your changes in a feature branch, and get another engineer to review your code
1.  After your code has been reviewed and tested, you can merge your branch into main.
1.  Make sure to update your PR title and add a short description of your changes for the changelog (see the [PR Title Guide](https://github.com/Codecademy/gamut#pr-title-guide))
1.  To merge your changes, add the `Ship It` label to your Pull Request.
1.  Once your branch is merged into main, it will be published automatically by GitHub Actions.
1.  You can find the new version number on npmjs.com/package/<package-name>, or find it in that package's `package.json` on the `main` branch

### Publishing an alpha version of a module

Every PR that changes files in a package publishes alpha releases that you can use to test your changes across applications.

> NOTE: in case an alpha build is not published upon opening of the PR or Draft PR, re-run the `build-test` check and that will re-run the alpha build publishing flows

1.  Create a PR or Draft PR.
    - This will kickoff a Circle-CI workflow which will publish an alpha build. (This will appear in Github as the "Deploy")
1.  After the alpha build is published, the `codecademydev` bot should comment on your PR with the names of the published alpha packages. <br/>
    <img width="290" height="auto" src="https://user-images.githubusercontent.com/4298857/114948632-3fa88a80-9e04-11eb-89ef-d016a1c9c572.png">
1.  Install this version of the package in your application you wish to test your changes on.

### Working with pre-published changes

> NOTE: Due to the inconsistencies of symlinks in a lerna repo, _instead_ of using `yarn link`, we recommend using the `npm-link-better` package with the `--copy` flag to copy packages into your local repo's `node_modules` directory.

**Initial Setup:**

1. Ensure you have npm-link-better installed: `npm install -g npm-link-better`
1. Ensure you've built the entire `gamut` repo since you last synced: `yarn build`

**Instructions:**

For each of your local `gamut` packages (e.g. `gamut`), you'll need to do 2 things to get it working in your project:

1. Make sure your package changes have been built into the `gamut/packages/[package]/dist` folder.

   - `yarn build`<br/>or<br/>
     `yarn build:watch` (not all packages support this yet)

1. Copy that built `/dist` folder to your project's `node_modules/@codecademy/[package]` folder.
   ```bash
   cd myProjectRepo
   npm-link-better --copy --watch path/to/gamut/packages/[package]
   ```
   > NOTE: The `--watch` flag will automatically copy your package into `node_modules` everytime it is built.

<details>
<summary>Example Workflow</summary>

Let's say we are making changes to the `gamut` package, and our app that uses the `gamut` package uses `yarn start` to build, serve, and watch our app for changes.

Let's also assume these two repos are sibling directories inside of a folder called `repos`

```
repos
  |- gamut
  |- my-app
```

We would run the following commands in 3 separate shells

```bash
# Shell 1: Auto-build Gamut changes
cd repos/gamut/packages/gamut
yarn build:watch

# Shell 2: Auto-copy built Gamut changes to my-app.
cd repos/my-app
npm-link-better --copy --watch ../gamut/packages/gamut

# Shell 3: Auto-update app when anything changes.
cd repos/my-app
yarn start
```

This would allow us to make a change in our `gamut` package, and see that change automatically reflected in our local app in the browser.

</details>

<details>
  <summary>Troubleshooting</summary>

- If you see compilation issues in your project's dev server after running `npm-link-better`, you may have to restart your app's dev server.
- If you are seeing compilation issues in a `gamut` package, you may need to rebuild the whole repository via

  ```bash
  yarn build
  ```

</details>

<details>
  <summary>Instructions for using `yarn link` instead (not recommended)</summary>

For quicker development cycles, it's possible to run a pre-published version of Gamut in another project. We do that using
symlinks (the following instructions assume you have set up and built Gamut):

1. `cd /path/to/gamut/packages/gamut`
1. `yarn link`
1. `cd path/to/other/repo`
1. `yarn link @codecademy/gamut`
1. `yarn install`

If your other project uses React, you must link that copy of React in Gamut:

1. `cd path/to/other/repo`
1. `cd node_modules/react`
1. `yarn link`
1. `cd /path/to/gamut/packages/gamut`
1. `yarn link react`
1. `yarn build`

[See the docs](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react)
for more information for why you have to do this.

</details>
<br/>

### Adding a New Package

1. Create a new directory at `packages/<package-name>/package.json`.
1. Use `yarn lerna create` to create the new package, copying values from existing `package.json`s when unsure.
   - Also copy the `publishConfig` field to let your published package be public by default
1. Create a minimal amount of source code in the new package
   - Example: a simple `tsconfig.json` with a `index.ts` exporting a single object
1. Run `yarn lerna bootstrap` from the repository root
1. Send a `feat` PR adding that package
1. One merged, message out in our #frontend Slack channel to other Gamut developers to re-run `yarn lerna bootstrap` after they merge from `main`

Notes:

If your package will be used in other packages in the monorepo, you may need to set up aliases in jest and storybook so that they can be run without building your package first. You can find these aliases in [jest.config.js](/jest.config.js) and the [styleguide storybook config](/packages/styleguide/.storybook/main.ts).

**NX**

This monorepo uses [NX](https://nx.dev/) to cache previous builds locally and in CI.

The config for NX is located at [/nx.json](/nx.json), along with `project.json` files for each package.

For new packages, please use an NX generator plugin to create your initial package, this will ensure that all of the configuration for linting & testing is set up correctly.

### PR Title Guide

Your PR Title should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) Format.

Because we automatically squash merge Pull Requests, you'll need to format your PR title to match these guidelines since the title will become the commit message.

Your individual commits will affect the `alpha` version number, but not the final version once you merge to main.

This Title format will be linted in the `conventional-pr-title` status check and prevent merging if you do not follow the correct format.

### PR Title Format

When you click squash and merge, the title should follow this format:

```
type(scope): message
```

Examples:

```
fix: fixes a bug in some component
```

```
test: adds test to component
```

With a scope:

```
feat(Button): :sparkles: An awesome feature for the Button component
```

Breaking change:

```
feat(Button)!: :fire: Deleted the Button component
```

Check out the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) page for more detailed options

**Type**

The `type` determines what kind of version bump is needed. A `fix` will create a `patch` release, while a `feat` will create a `minor` release. Major version updates require a special syntax that is described below.

`type` must be one of the following options:

Standard types:

- **feat**: A new feature
- **fix**: A bug fix
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **docs**: Documentation only changes
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **ci**: Changes to our CI configuration files and scripts
- **build**: Changes that affect the build system or external dependencies

**Scope**

A scope is optional and consists of a noun describing a section of the codebase surrounded by parenthesis, e.g., feat(Button):

**Breaking Changes**

Adding an exclamation point after your type, before the colon, will indicate that your PR contains a breaking change, and increment the major version number of the modules you changed.

Examples:

`feat!: made a breaking change in the Button component`

`feat(Button)!: made a breaking change in the Button component`

You should do this if your changes introduce any incompatibilities with previous versions of the module.
This will indicate to package consumers that they need to refactor their usage of the module to upgrade.

#### Breaking Changes Release Process

Because Gamut is a separate repository from its consumers, it can be tricky to coordinate technically breaking changes.
If your changes will require changes in any downstream repositories:

1. Create a PR in Gamut to create alpha package versions
2. Create PRs in the repositories using those alpha package versions
3. Update each downstream PR description to link to the Gamut PR, and vice versa
4. Once all PRs have been approved, merge your Gamut PR first
5. Update your repository PRs to use the new (non-alpha) package versions once published
6. Merge your repository PRs

This process minimizes the likelihood of accidental breaking changes in Gamut negatively affecting development on our other repositories.

**Body**

Optional extra description for your changes.

This goes in the description for your PR, between the `<!--- CHANGELOG-DESCRIPTION -->` comment tags in the PR template.

If you include the text `BREAKING CHANGE:` in your description it will trigger a major version bump. We prefer to use the `feat!:` syntax for breaking changes described above.

## Publishing Storybook

Storybook is built and published automatically when there are merges into the main branch.
