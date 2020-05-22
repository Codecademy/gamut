## [2.3.1](https://github.com/RyzacInc/client-modules/compare/@codecademy/gamut-icons@2.3.1...@codecademy/gamut-icons@2.3.1) (2020-05-22)


### Bug Fixes

* **Build:** Update lockfile and config file to include new template ([#699](https://github.com/RyzacInc/client-modules/issues/699)) ([9060cd2](https://github.com/RyzacInc/client-modules/commit/9060cd219bac749acc5fcf162d85dc73131ce4b5))
* **Icon:** Fixes type incongruence from compiled definitions  ([#720](https://github.com/RyzacInc/client-modules/issues/720)) ([d09e758](https://github.com/RyzacInc/client-modules/commit/d09e758f0ae6b754a8c0c5275a5f3fa31cdb6005))
* add missing narrative icon ([#593](https://github.com/RyzacInc/client-modules/issues/593)) ([4d039d0](https://github.com/RyzacInc/client-modules/commit/4d039d0e95def5dfc7e130f0f34fb70f783d62fd))
* re-enable icon title props ([#594](https://github.com/RyzacInc/client-modules/issues/594)) ([670a7f2](https://github.com/RyzacInc/client-modules/commit/670a7f2a1e37a06d62577ca7f92183aa177dfcc5))
* Set default size on icons, fix colors on some icons ([#577](https://github.com/RyzacInc/client-modules/issues/577)) ([049d1dd](https://github.com/RyzacInc/client-modules/commit/049d1ddef2e4ff519362ff0cc31123214f3cdaf4))


### Code Refactoring

* move gamut out of root folder ([#494](https://github.com/RyzacInc/client-modules/issues/494)) ([c475cdf](https://github.com/RyzacInc/client-modules/commit/c475cdfdb708edd783a9e1f18769a895016bf5e7))


### Features

* **Icons:** Add initial streamline icons ([#702](https://github.com/RyzacInc/client-modules/issues/702)) ([52d529e](https://github.com/RyzacInc/client-modules/commit/52d529e76074e4ccb382fd27107fcff51ede718c))
* **Icons:** Add named export to gamut icons and update SVGR ([#697](https://github.com/RyzacInc/client-modules/issues/697)) ([9f783da](https://github.com/RyzacInc/client-modules/commit/9f783daacfc327a6d304b223d51a1a56cce129d9))
* various icon build updates([#584](https://github.com/RyzacInc/client-modules/issues/584)) ([47a1283](https://github.com/RyzacInc/client-modules/commit/47a1283901a591726c5bc579a8e94e02008a85e6))
* **gamut-icons:** remove learn icons (unused currently) ([2dd0f36](https://github.com/RyzacInc/client-modules/commit/2dd0f36635864ee67d8c9d6da084b08dd53f5bff))
* New Gamut Icons Package ([#402](https://github.com/RyzacInc/client-modules/issues/402)) ([6e0fcfc](https://github.com/RyzacInc/client-modules/commit/6e0fcfc27768c9496f8e79a465c8adcd50ffd8f7))


### BREAKING CHANGES

* Changes the path of all files in gamut from the root to a `dist` folder.

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



