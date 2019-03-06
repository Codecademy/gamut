# GAMUT

_Styleguide & Component library for codecademy.com_

---

## [![CircleCI](https://circleci.com/gh/RyzacInc/gamut.svg?style=svg&circle-token=3d9adfca5a8b44e7297ceb18e032e89a11d223a2)](https://circleci.com/gh/RyzacInc/gamut)

This repository is a monorepo that we manage using [Lerna](https://lernajs.io/). That means that we actually publish several packages to npm from the same codebase, including:

[`gamut`: Our React UI component library](/packages/gamut/README.md)

[`gamut-styles`: Utility styles for gamut components and codecademy apps](/packages/gamut-styles/README.md)

[`gamut-storybook`: A component development sandbox for Gamut components](/workspaces/gamut-storybook/README.md)

## Local development

1.  Log into npm
    * Run `npm login` with username `codecademy`; you can find the password in LastPass
    * Running `npm whoami` should return `codecademy`
2.  Run `yarn` in the root directory
3.  Run `yarn lerna bootstrap` to prep each package in the `packages` directory for development

### Running storybook

1.  Run `yarn start` to start the storybook server
1.  Add new stories to `workspaces/gamut-storybook/stories`

### Cross-package development

_Follow these steps when you need to make changes to Gamut that are immediately reflected in the Codecademy app (e.g. for QAing a Gamut component)._

1.  Cd into `../Codecademy` (targeting wherever your Codecademy app is located)
2.  Run `npm link ~/desktop/work/gamut/packages/gamut` (targeting wherever your gamut _child package_ is located) [npm-link documentation](https://docs.npmjs.com/cli/link)
3.  Run `yarn` in the Codecademy repo.
4.  You should be accessing your local version of Gamut.
5.  If you make an update to Gamut, you will have to run yarn in your local repo again.

### Publishing Modules

1.  Make your changes in a feature branch, and get another engineer to review your code
1.  After you've reviewed and tested your code, you can merge your branch into master.
1.  To merge, use the "squash and merge" button in github
1.  To generate an entry in the changelog for the module you changed, follow the [commit message guide](#commit-message-guide)
1.  Once your branch is merged into master, it will be published automatically by CircleCI.
1.  You can check the master branch for the new version number

### Publishing a pre-release version of a module

You can use the gamut/next branch to publish pre-release changes that require testing across applications

1.  Follow the instructions for normal publishing, but base your PR off of the gamut/next branch, instead of master.
1.  Once you feel like your changes are stable, you can merge the gamut/next branch into master

### Commit Message Guide

Commits follow the [Angular format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)

### Commit Format

The squash and merge commit should follow a convention:

```
type(scope): message
```

Examples:

```
fix: fixes some component
```

```
test: adds test to component
```

```
feat(component): :sparkles: An awesome new component
```

This message should go inside the title field of the message:

![screen shot 2019-03-04 at 10 41 07 am](https://user-images.githubusercontent.com/6455018/53745157-79101d00-3e6c-11e9-9b5f-e35582106b31.png)

**Type**

The `type` determines what kind of version bump is needed. A `fix` will create a `patch` release, while a `feat` will create a `minor` release. Major releases are only created when the text `BREAKING CHANGE:` is included in the `Body` or `Footer` of the commit message.

`type` must be one of the following:

* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **test**: Adding missing tests or correcting existing tests
* **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)

**Scope**

Optional scope for your changes

**Body**

Optional extra description for your changes

This is where you should describe any version breaking changes by including the text `BREAKING CHANGE:` with your description.

### Publishing the storybook

1.  To build the story, book, cd into `packages/gamut-storybook` and run `npm run build`, and commit the changes to `master`. These updates will be available on [`styleguide.codecademy.com/storybook`](http://styleguide.codecademy.com/storybook).
