# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.1](https://github.com/RyzacInc/client-modules/compare/@codecademy/gamut-icons@2.1.0...@codecademy/gamut-icons@2.1.1) (2020-01-06)

**Note:** Version bump only for package @codecademy/gamut-icons





# [2.1.0](https://github.com/RyzacInc/client-modules/compare/@codecademy/gamut-icons@2.0.2...@codecademy/gamut-icons@2.1.0) (2020-01-03)


### Features

* various icon build updates([#584](https://github.com/RyzacInc/client-modules/issues/584)) ([47a1283](https://github.com/RyzacInc/client-modules/commit/47a1283))





## [2.0.2](https://github.com/RyzacInc/client-modules/compare/@codecademy/gamut-icons@2.0.1...@codecademy/gamut-icons@2.0.2) (2019-12-27)


### Bug Fixes

* Set default size on icons, fix colors on some icons ([#577](https://github.com/RyzacInc/client-modules/issues/577)) ([049d1dd](https://github.com/RyzacInc/client-modules/commit/049d1dd))





## [2.0.1](https://github.com/RyzacInc/client-modules/compare/@codecademy/gamut-icons@2.0.0...@codecademy/gamut-icons@2.0.1) (2019-10-08)

**Note:** Version bump only for package @codecademy/gamut-icons





# [2.0.0](https://github.com/RyzacInc/client-modules/compare/@codecademy/gamut-icons@1.2.0...@codecademy/gamut-icons@2.0.0) (2019-10-02)

### Code Refactoring

- move gamut out of root folder ([#494](https://github.com/RyzacInc/client-modules/issues/494)) ([c475cdf](https://github.com/RyzacInc/client-modules/commit/c475cdf))

### BREAKING CHANGES

- Changes the path of all files in gamut from the root to a `dist` folder.

This means all imports that formerly pointed to the root:

```
import Button from '@codecademy/gamut/Button'
```

now need to include the dist folder:

```
import Button from '@codecademy/gamut/dist/Button'
```

or, preferably, import the named export instead:

```
import { Button } from '@codecademy/gamut'
```

# [1.2.0](https://github.com/RyzacInc/client-modules/compare/@codecademy/gamut-icons@1.1.4...@codecademy/gamut-icons@1.2.0) (2019-09-04)

### Features

- **gamut-icons:** remove learn icons (unused currently) ([2dd0f36](https://github.com/RyzacInc/client-modules/commit/2dd0f36))

## [1.1.4](https://github.com/RyzacInc/client-modules/compare/@codecademy/gamut-icons@1.1.1...@codecademy/gamut-icons@1.1.4) (2019-09-03)

**Note:** Version bump only for package @codecademy/gamut-icons

## [1.1.3](https://github.com/RyzacInc/client-modules/compare/@codecademy/gamut-icons@1.1.1...@codecademy/gamut-icons@1.1.3) (2019-08-28)

**Note:** Version bump only for package @codecademy/gamut-icons

## [1.1.2](https://github.com/RyzacInc/client-modules/compare/@codecademy/gamut-icons@1.1.1...@codecademy/gamut-icons@1.1.2) (2019-08-20)

**Note:** Version bump only for package @codecademy/gamut-icons

## [1.1.1](https://github.com/Codecademy/client-modules/compare/@codecademy/gamut-icons@1.1.0...@codecademy/gamut-icons@1.1.1) (2019-08-14)

**Note:** Version bump only for package @codecademy/gamut-icons

# 1.1.0 (2019-07-26)

### Features

- New Gamut Icons Package ([#402](https://github.com/Codecademy/client-modules/issues/402)) ([6e0fcfc](https://github.com/Codecademy/client-modules/commit/6e0fcfc))
