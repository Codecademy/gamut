### [0.3.3](http://github.com///compare/@codecademy/eslint-config@0.3.3...@codecademy/eslint-config@0.3.3) (2020-05-21)


### ⚠ BREAKING CHANGES

* Refactor Modal and Overlay components [GM-24] (#806)
* **webpack-config:** Update CSS Loader and move loaders into dependencies (#736)
* **Typography:** Heading Primitives and reconfigured responsive styles (#722)
* moved Logo atom to brand-components (#718)

### Features

* Refactor Modal and Overlay components [GM-24] ([#806](http://github.com//undefined/issues/806)) ([01367fc](http://github.com///commit/01367fc607fd122d6b07c4244224907cfa3b0ea1))
* **Alert:** Adds alert banner and new status themes ([#703](http://github.com//undefined/issues/703)) ([b9b97f4](http://github.com///commit/b9b97f496647855b8d0f938dc12b231036a79100))
* **Brand:** Ported common Loading icon to Brand/Labs ([#794](http://github.com//undefined/issues/794)) ([b7950c9](http://github.com///commit/b7950c9d3f8fe04a4347797a41452a88cd63bef8))
* **BrandMono:** Port component into Brand package ([16e7ad7](http://github.com///commit/16e7ad75fc182da5417b27add93956dfa020b1b9))
* **EditorialImage:** Port EditorialImage from monolith ([c256d9d](http://github.com///commit/c256d9d41a0275466b474d157c5204f838956a0e))
* **EditorialQuote:** Port EditorialQuote from monolith ([20ee79d](http://github.com///commit/20ee79d3add9ea1a663b0b610f091db7ce7a85b8))
* **Gamut:** Add Input Stepper ([#753](http://github.com//undefined/issues/753)) ([1d110a0](http://github.com///commit/1d110a0bddc73141ba0d12b5d766c47b740a923f))
* **Gamut:** added ProgressBar minimumPercent and theme props ([#739](http://github.com//undefined/issues/739)) ([b17a7bc](http://github.com///commit/b17a7bc263fdb7d1b08c6c942bbe3849ef867496))
* **Gamut:** added RadioGroup inputs for GridForm ([#759](http://github.com//undefined/issues/759)) ([6d969b8](http://github.com///commit/6d969b8b02aa200ae47dd61a05911c4070a74d7a))
* **Gamut:** Allowed Alert to receive a class name ([#784](http://github.com//undefined/issues/784)) ([fd29141](http://github.com///commit/fd2914183d603bd03dafa06b16953f9d937e07ae))
* **Gamut:** Allowed GridForm text fields to be of type 'date' ([#783](http://github.com//undefined/issues/783)) ([418b32b](http://github.com///commit/418b32b19c0db071a2bed4f004da0370fa610043))
* **Gamut:** Checkbox default style changes and add multiline prop ([#796](http://github.com//undefined/issues/796)) ([f83b362](http://github.com///commit/f83b362dbcb9e9a49f052e03284cd9e6f1bd814c))
* **Gamut:** Created separate bucket for "Platform" colors ([#778](http://github.com//undefined/issues/778)) ([26daf75](http://github.com///commit/26daf75e7e488f1a7b268ca6d3a0700284d5e95e))
* **Gamut:** Disable GridForm submit until required field are complete ([#798](http://github.com//undefined/issues/798)) ([cec230f](http://github.com///commit/cec230f92d33102d6e2e999513117f58f71e11e0))
* **Gamut:** switched ProgressBar back to taking in a 'style' prop ([#752](http://github.com//undefined/issues/752)) ([eb4f640](http://github.com///commit/eb4f640d0c146f878435295021d31d82571c656a))
* **gamut-styles:** Added TypeScript .d.ts generation to gamut-styles ([#775](http://github.com//undefined/issues/775)) ([39a64ec](http://github.com///commit/39a64ec114484c6fff6423ba09784483b12d0b76))
* **grid-form:** add onUpdate to GridForm fields ([#751](http://github.com//undefined/issues/751)) ([b465604](http://github.com///commit/b465604bbabd237b33a38332cee2814042ec94fe))
* **GridForm:** added placeholder, stretch submit options ([#737](http://github.com//undefined/issues/737)) ([c110b25](http://github.com///commit/c110b254cd62f4a9bc68b5e4a72b18b9c34a7b58))
* **GridForm:** Update GridFormField label type to accept ReactNodes. ([#809](http://github.com//undefined/issues/809)) ([72d829d](http://github.com///commit/72d829d628097df290d794e35a79a09f14e2e382))
* **Header:** Hide header on print views ([2a338f9](http://github.com///commit/2a338f934d83ed66f7978c6fae7e6846f343a0c3))
* **headertab:** move more header components into gamut ([#740](http://github.com//undefined/issues/740)) ([9c555ef](http://github.com///commit/9c555efecc6eecbac0b354d408e7da12431b52af))
* **Icons:** Add initial streamline icons ([#702](http://github.com//undefined/issues/702)) ([52d529e](http://github.com///commit/52d529e76074e4ccb382fd27107fcff51ede718c))
* **styleguide:** Added Components documentation ([#781](http://github.com//undefined/issues/781)) ([d7039e5](http://github.com///commit/d7039e50f1afd79d284ef3e51f28ebfee4745e22))
* **styleguide:** added inclusion guidelines to FAQs ([#749](http://github.com//undefined/issues/749)) ([69d2a40](http://github.com///commit/69d2a40a578add347df04462861d004b89b84fd4))
* **Styleguide:** Convert All Stories to MDX ([#788](http://github.com//undefined/issues/788)) ([96255a0](http://github.com///commit/96255a03e53550b48e36d8049c728825a716d4b7))
* **Styleguide:** DecoratedStories Props and better Typography Docs ([#746](http://github.com//undefined/issues/746)) ([d6efbbc](http://github.com///commit/d6efbbc1a87430642b6effbe2f82c598d0421c9e))
* **Styleguide:** updated About examples and Brand description ([#764](http://github.com//undefined/issues/764)) ([85188a6](http://github.com///commit/85188a69c03628dc0581887118ed4bb10225dc84))
* **Typography:** Heading Primitives and reconfigured responsive styles ([#722](http://github.com//undefined/issues/722)) ([63da7ca](http://github.com///commit/63da7cacd51be872cf30401343d6ed20106ec77b))
* **Typography:** Typography tweaks and format documentation ([#750](http://github.com//undefined/issues/750)) ([3a12f2a](http://github.com///commit/3a12f2a9e1b35b59f135371b3fe7dca3bf1d9ee4))
* **webpack-config:** Update CSS Loader and move loaders into dependencies ([#736](http://github.com//undefined/issues/736)) ([2e6c1c5](http://github.com///commit/2e6c1c5435ebb3588babd31a574f20db2b2c85b0))
* moved Logo atom to brand-components ([#718](http://github.com//undefined/issues/718)) ([55c4fcc](http://github.com///commit/55c4fccb578241abc6cb07d302e563100f8f18a9))


### Bug Fixes

* preserve display name on card shell ([#812](http://github.com//undefined/issues/812)) ([ca1d3c0](http://github.com///commit/ca1d3c0bcb46c5220e76854a2572691943456c93))
* **Alert:** Export BannerType enum to be used from root ([#748](http://github.com//undefined/issues/748)) ([28449c3](http://github.com///commit/28449c39ebcddce23ab0efa40179790b7718f0e1))
* **Documentation:** Re-enable story source and use top level organization ([#769](http://github.com//undefined/issues/769)) ([cce7845](http://github.com///commit/cce784584a8e0d7f26283cbdc0f8793be4487926))
* **Documentation:** Rework Foundation Documentation ([#763](http://github.com//undefined/issues/763)) ([d0f3f9d](http://github.com///commit/d0f3f9d6d9d28aec8d50f1a62da21755b0f653c9))
* **Gamut:** Correctly hooked up GridForm's radio-group inputs for validation updates ([#795](http://github.com//undefined/issues/795)) ([2cd6d7a](http://github.com///commit/2cd6d7a99e582fedf021b9cc3fb8ee8587c509fe))
* **Gamut:** Pass down error to GridFormCustomInput ([#804](http://github.com//undefined/issues/804)) ([de90e1c](http://github.com///commit/de90e1ce35f675796f1c83f1af1225d80ba3b2c0))
* **Gamut:** Removed unnecessary useEffect registers in GridForm ([#767](http://github.com//undefined/issues/767)) ([529878e](http://github.com///commit/529878e17a3447dda65ffae069856f7883e24f47))
* **webpack-config:** Fix misplaced filename config in extracted CSS ([#789](http://github.com//undefined/issues/789)) ([1ef2f96](http://github.com///commit/1ef2f96723fc3928aa0fdb3d9ddee18611d80667))
* reset gamut ButtonBase styles to default ([#614](http://github.com//undefined/issues/614)) ([a902ba7](http://github.com///commit/a902ba71b98f444569a2398c2ae05964c95b726b))

### 0.3.3 (2020-04-17 19:53:10 +0000)


### ⚠ BREAKING CHANGES

* **Gamut:** removed deprecated primary, blue, red, and yellow button colors (#714)
* **Gamut:** removed easily replaceable deprecated swatches- colors (#717)
* reorganized stories into Atomic Design and TypeScript (#695)
* Now there'll only be one version of autoprefixer and, well, two of browserslist. Hopefully that'll stop unnecessary CSS rules such as -webkit-flex from getting included in our CSS?

### Features

* **gamut:** Add GridForm Submit Button functionality ([#732](http://github.com//undefined/issues/732)) ([08ef6c3](http://github.com///commit/08ef6c3b536a260bf0e3135926af76bcc7412212))
* **Gamut:** added 'custom' field type to GridForm ([#733](http://github.com//undefined/issues/733)) ([d67826b](http://github.com///commit/d67826ba2e439eeeb8b5f0ef4e6dbbef0f768afc))
* **Gamut:** added AccordionTop molecule ([#725](http://github.com//undefined/issues/725)) ([ae47f3a](http://github.com///commit/ae47f3a101f380b88e8855d83fe71f77f490e1c0))
* **gamut-styles:** formalized Editor colors in gamut-styles ([#726](http://github.com//undefined/issues/726)) ([92e9e94](http://github.com///commit/92e9e94821a1123aeb274595db8c9e18ff9716d6))
* allowed for checkbox inputs in GridForm ([#686](http://github.com//undefined/issues/686)) ([1d8028a](http://github.com///commit/1d8028a0733e3b9765e3aae314a979ec88e2f4ec))
* GridForm checkbox and select required validation ([#729](http://github.com//undefined/issues/729)) ([3dc28fd](http://github.com///commit/3dc28fde22dc48462557869e56a5c020994ddd4c))
* **GridForm:** added columnGap and rowGap as props to GridForm ([#713](http://github.com//undefined/issues/713)) ([3870cef](http://github.com///commit/3870cef5d2661518a49a5285794f270d54bc9dce))
* **GridForm:** drilled error states through GridForm to inputs ([#698](http://github.com//undefined/issues/698)) ([ff6fcc8](http://github.com///commit/ff6fcc8820b0d277a61ead41924fa5df2c131c9c))
* Add file input and text area to GridForm ([#709](http://github.com//undefined/issues/709)) ([78eef25](http://github.com///commit/78eef25ebfb4b2ab0859245daf11caf00005da96))
* **AppBar:** Move AppBar into gamut ([#696](http://github.com//undefined/issues/696)) ([ffdc5b1](http://github.com///commit/ffdc5b19f47d42621f2815b6e4ffca04ef1a921c))
* **Icons:** Add named export to gamut icons and update SVGR ([#697](http://github.com//undefined/issues/697)) ([9f783da](http://github.com///commit/9f783daacfc327a6d304b223d51a1a56cce129d9))
* **LayoutGrid:** Adds XS size to layout grid responsive components ([#684](http://github.com//undefined/issues/684)) ([b4daf36](http://github.com///commit/b4daf363f3990f0151038b5f083748b30d71845e))
* **Modal:** An implementation of the Modal primitive ([#679](http://github.com//undefined/issues/679)) ([5404f0a](http://github.com///commit/5404f0adc53a21e1fc944422a7dd0c0d0da70ea1))
* **Styleguide:** Storybook 6 alpha upgrade + Story ordering ([#715](http://github.com//undefined/issues/715)) ([ad47482](http://github.com///commit/ad474826a3ade2b023c5ff5238e059c2994dc979))
* **Truncate:** Add truncate wrapper ([#700](http://github.com//undefined/issues/700)) ([fd0bf06](http://github.com///commit/fd0bf06182a79b74a1e3e543320f970017f246a6))
* add `testimonial` object prop to Testimonial component ([98a3e0c](http://github.com///commit/98a3e0c3afc343e4c526001562a54f5460926dbb))
* add column offsets to layoutgrid ([#644](http://github.com//undefined/issues/644)) ([43e7042](http://github.com///commit/43e7042227271ae337348e4db4fddbeb889c64eb))
* add company and full name info to Testimonial ([aa150cd](http://github.com///commit/aa150cdf29eec5c5464aef996223b69d5ae24d98))
* add file loader options override ([#607](http://github.com//undefined/issues/607)) ([4fe61f0](http://github.com///commit/4fe61f0451998cff878b9dc67b6568a8a5c3583e))
* Add Grid Primitive Components ([f58ef3d](http://github.com///commit/f58ef3d6bcee2b2213ab12912eefbbb8015fd577))
* add medium and large sizes to testimonial ([9bcffc4](http://github.com///commit/9bcffc4c05c0ded0d151d12ee456914153269d50))
* added basic Modal primitive to Gamut ([#641](http://github.com//undefined/issues/641)) ([df9fa1f](http://github.com///commit/df9fa1f9c3161b2ef8fcf2e8ff60700c202796cd))
* added GridForm component ([#605](http://github.com//undefined/issues/605)) ([253acad](http://github.com///commit/253acadc5d0775386f48d9290bda77d112c6aa54))
* allow Avatar to be passed a className to allow responsive sizing ([ca99e4d](http://github.com///commit/ca99e4df47161743b914b6afd9d819baee9a87c1))
* allows 0 width column size for column offset ([#671](http://github.com//undefined/issues/671)) ([681a461](http://github.com///commit/681a46148a0d90c0ecec5ad91f1b8ef295a1a982))
* Banner Simplification ([1b6f6e5](http://github.com///commit/1b6f6e542a80a0e1a1a88076b648e248b3724eaf))
* compile gamut using babel ([#583](http://github.com//undefined/issues/583)) ([2de0b9c](http://github.com///commit/2de0b9cbe9b053db351a95e5ad86cb304c1693d6))
* create Byline  brand component  ([e330622](http://github.com///commit/e330622f8e9780a2ed49b411339a310f3d1b049e))
* create contentContainer component ([b5b89f3](http://github.com///commit/b5b89f35a8100f6d8843382d6a21621c69c1b457))
* created ProgressBar primitive for Gamut ([#685](http://github.com//undefined/issues/685)) ([93bd747](http://github.com///commit/93bd747b4ed0ae37ea2a0c3d2c6dfcd72962446b))
* gridform touchups ([#653](http://github.com//undefined/issues/653)) ([50b72e0](http://github.com///commit/50b72e0b19383fddf842b3b3833cfac302dff837))
* initialize Brand Components package with Avatar component ([7d7c667](http://github.com///commit/7d7c6673c7c812939259c998ed8493a0d8033aa9))
* map column offset 0 to grid-column-start: auto ([#678](http://github.com//undefined/issues/678)) ([415b8c1](http://github.com///commit/415b8c1bae4067a1062cc19371526dca48e30c04))
* Remove storybook package aliases ([#610](http://github.com//undefined/issues/610)) ([317f7f7](http://github.com///commit/317f7f7c9255966472d5171990c3773b6cc0576d))
* removes link generation from tabs and adds aria attributes ([#661](http://github.com//undefined/issues/661)) ([d95e018](http://github.com///commit/d95e018eb941bd2e9e8cf7a72110895ea2cf1f55))
* renamed Modal element to Overlay ([#683](http://github.com//undefined/issues/683)) ([3bb0ffb](http://github.com///commit/3bb0ffb9d0f078b57012bf72100d026c8c9daf15))
* transform Testimonial content container on hover ([#668](http://github.com//undefined/issues/668)) ([5a06ede](http://github.com///commit/5a06edea753eff18a5e58b245d60c32edef93e1e))
* use export * on all exported modules ([#658](http://github.com//undefined/issues/658)) ([67ba71b](http://github.com///commit/67ba71b54f2d6ff88513a140551d8997a8862c58))
* **testimonial:** create testimonial brand component in size small ([9a765c8](http://github.com///commit/9a765c847548b952c0f8c2343a1b646f7a2d009b))
* various icon build updates([#584](http://github.com//undefined/issues/584)) ([47a1283](http://github.com///commit/47a1283901a591726c5bc579a8e94e02008a85e6))
* **webpack-config:** use built in module id hashing, fix file loader hashes ([#557](http://github.com//undefined/issues/557)) ([4b4c36f](http://github.com///commit/4b4c36fc7eb068156f191e50971bba40cf9cc9cb))


### Bug Fixes

* **Icon:** Fixes type incongruence from compiled definitions  ([#720](http://github.com//undefined/issues/720)) ([d09e758](http://github.com///commit/d09e758f0ae6b754a8c0c5275a5f3fa31cdb6005))
* rename scss files ([#704](http://github.com//undefined/issues/704)) ([c4ea130](http://github.com///commit/c4ea130aeee1e9d600da53daad6312d17813cd61))
* **Build:** Update lockfile and config file to include new template ([#699](http://github.com//undefined/issues/699)) ([9060cd2](http://github.com///commit/9060cd219bac749acc5fcf162d85dc73131ce4b5))
* add missing narrative icon ([#593](http://github.com//undefined/issues/593)) ([4d039d0](http://github.com///commit/4d039d0e95def5dfc7e130f0f34fb70f783d62fd))
* correct implementation of column offset in layout story ([#676](http://github.com//undefined/issues/676)) ([c4f0ad8](http://github.com///commit/c4f0ad8a5d999fefd0cfb705ee71f4f889e4d6f6))
* don't pass undefined classname to elements ([#575](http://github.com//undefined/issues/575)) ([d60fef4](http://github.com///commit/d60fef41041da334781064222d57f7c7a07641db))
* fix broken compiled typings in gamut ([#586](http://github.com//undefined/issues/586)) ([57612f8](http://github.com///commit/57612f86080a093782ac1f18c0716736bf4d029d))
* fixes responsive prop configs for layout grid ([#648](http://github.com//undefined/issues/648)) ([6cd2d23](http://github.com///commit/6cd2d23b8dc07e09f68cf56de5a537f9642c3ad1))
* FormGroupDescription and Toggle accessibility ([#558](http://github.com//undefined/issues/558)) ([0d12c99](http://github.com///commit/0d12c999c603620f2b29452e7975b50967197426))
* height and width fixes on testimonial grid ([d436195](http://github.com///commit/d436195ffb4c45472abeb1e9d568a4f55811abb7))
* markdown styling: do not override code color ([#621](http://github.com//undefined/issues/621)) ([9a0014a](http://github.com///commit/9a0014ae3d9c3ee192442589510dab730ffe41c8))
* re-enable icon title props ([#594](http://github.com//undefined/issues/594)) ([670a7f2](http://github.com///commit/670a7f2a1e37a06d62577ca7f92183aa177dfcc5))
* Set default size on icons, fix colors on some icons ([#577](http://github.com//undefined/issues/577)) ([049d1dd](http://github.com///commit/049d1ddef2e4ff519362ff0cc31123214f3cdaf4))
* testimonial component background pattern ([1a08cd2](http://github.com///commit/1a08cd2ddc84c59cc1088dfdd62e37afff452a36))
* update `grid-template-row` on small and medium testimonials ([89a6ea1](http://github.com///commit/89a6ea18df41bba89c0fa94629fab6de791ea9aa))
* **Markdown:** Add missing blockquote styles to markdown ([#624](http://github.com//undefined/issues/624)) ([5aa8800](http://github.com///commit/5aa8800a27edd055697062332a13a33b2b62eff0))
* use safer method to pull out markdown language prop ([#588](http://github.com//undefined/issues/588)) ([9f13a94](http://github.com///commit/9f13a94fe19d72eb645e1559be05c4403bd98429))
* **webpack-config:** Revert removal of id from default hashes ([#560](http://github.com//undefined/issues/560)) ([3cd175d](http://github.com///commit/3cd175d670ffe23648660d319dd6f8558976c731))


### Miscellaneous Chores

* **Gamut:** removed deprecated primary, blue, red, and yellow button colors ([#714](http://github.com//undefined/issues/714)) ([7f4df44](http://github.com///commit/7f4df44a4193b1eb4a291633e26e27d1b9971634))
* **Gamut:** removed easily replaceable deprecated swatches- colors ([#717](http://github.com//undefined/issues/717)) ([9b17bd5](http://github.com///commit/9b17bd55640e0fcb6c061c4f71b83fb7f2d04130))
* reorganized stories into Atomic Design and TypeScript ([#695](http://github.com//undefined/issues/695)) ([ffe77c9](http://github.com///commit/ffe77c92f1af5d0eb8f98cfcd0745d75844397c1))
* updated and consolidated autoprefixer to ^9.7.4 ([#629](http://github.com//undefined/issues/629)) ([0fb90dd](http://github.com///commit/0fb90dd34f3058982194b11b3787ba7b6ea871a0))

### 0.3.2 (2019-11-15 16:32:27 +0000)


### Features

* **Button:** allow component override ([cfd66ff](http://github.com///commit/cfd66ff2f1b8cf1f85c77688923f2608f422e63e))

### 0.3.1 (2019-11-11 21:35:05 +0000)


### Bug Fixes

* fix overflowing words and code in markdown ([#529](http://github.com//undefined/issues/529)) ([0b09a89](http://github.com///commit/0b09a894d40590ffb10114860a0eb532b62cb964))
* Update storybook & Gamut component exports ([#496](http://github.com//undefined/issues/496)) ([5bed74c](http://github.com///commit/5bed74caf5f6ab3f72f8b5c758e990cd1bfbde09))

### 0.2.7 (2019-10-08 19:24:19 +0000)


### ⚠ BREAKING CHANGES

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

### Features

* **Markdown:** Modify styles in markdown to be classname-based to prevent leaking into custom overrides ([#486](http://github.com//undefined/issues/486)) ([f54e53f](http://github.com///commit/f54e53f18501b8ab1a83e6cff10f92622ff18585))
* Adds dynamic tag name for NotificationItem ([57154b2](http://github.com///commit/57154b2646bbaa742932e880311578af71f9c492))
* **gamut-icons:** remove learn icons (unused currently) ([2dd0f36](http://github.com///commit/2dd0f36635864ee67d8c9d6da084b08dd53f5bff))


### Bug Fixes

* a Col should be able to accept just one element ([1333927](http://github.com///commit/1333927dea6924deaa58fa59546fbc6084e949d6))
* Default Form component to POST & Form Typescript cleanup  ([#492](http://github.com//undefined/issues/492)) ([6f44ca2](http://github.com///commit/6f44ca23e3e5533b62e5cf33a3ee32e95a75588c))
* **Markdown:** remove noreferrer from external links ([#466](http://github.com//undefined/issues/466)) ([6cfb9a2](http://github.com///commit/6cfb9a2d280a4ad0282ad52477f476cd7e2e5de1))
* **Markdown:** Update code tag specificity to prevent incorrect white-space ([#490](http://github.com//undefined/issues/490)) ([af46e2e](http://github.com///commit/af46e2e22d57d152f0ee2f54bdf5a7a6725a7552))
* **prettier-config:** don't apply typescript parser to all files ([#488](http://github.com//undefined/issues/488)) ([195df03](http://github.com///commit/195df030731be09d1b09aa4eac8b7b679f1185b0))
* bump html-to-react ([e5c5dc7](http://github.com///commit/e5c5dc72e34bbf16545488979ca1fc9be1260b88))


### Code Refactoring

* move gamut out of root folder ([#494](http://github.com//undefined/issues/494)) ([c475cdf](http://github.com///commit/c475cdfdb708edd783a9e1f18769a895016bf5e7))

### 0.2.6 (2019-09-03 14:23:01 +0000)


### Features

* **ToolTip:** add optional 'tipClassName' override prop ([329772d](http://github.com///commit/329772d9c52b05dd216cd53a18ad38eca5b47fe9))
* add preview for IkonaIcon icons ([#390](http://github.com//undefined/issues/390)) ([42ce2cc](http://github.com///commit/42ce2cc9911738860f909d28016582a9913bacb4))
* New Gamut Icons Package ([#402](http://github.com//undefined/issues/402)) ([6e0fcfc](http://github.com///commit/6e0fcfc27768c9496f8e79a465c8adcd50ffd8f7))
* Switch to terser plugin from uglify ([#382](http://github.com//undefined/issues/382)) ([c347d2f](http://github.com///commit/c347d2f19d0001bed9b98f4937d2de2bb0d410b8))


### Bug Fixes

* allow all textarea React props on TextArea form component ([4e24308](http://github.com///commit/4e24308ebed8ea30f0bbe53fbf5fb198faa23e09))
* **storybook:** Filter docgen types ([#406](http://github.com//undefined/issues/406)) ([0c522c5](http://github.com///commit/0c522c52ee335ce56b63f98d9f838309249345ff))
* update tabs colors ([#374](http://github.com//undefined/issues/374)) ([a4e1b34](http://github.com///commit/a4e1b34e788cd160671aa36ad3426470f93d47d4))

### [0.2.3](http://github.com///compare/@codecademy/eslint-config@0.2.2...@codecademy/eslint-config@0.2.3) (2019-06-14 15:35:17 +0000)


### Bug Fixes

* postcss plugins syntax ([#373](http://github.com//undefined/issues/373)) ([2d5f0e0](http://github.com///commit/2d5f0e090ca42b9c73a0c8b10c30d43313b5c412))

### [0.2.2](http://github.com///compare/@codecademy/eslint-config@0.2.1...@codecademy/eslint-config@0.2.2) (2019-06-12 15:06:16 +0000)


### Bug Fixes

* switch hooks exhaustive deps rule to error ([#371](http://github.com//undefined/issues/371)) ([7b44130](http://github.com///commit/7b44130d23863ba812c5e99a1942a9aed88cdd23))

### [0.2.1](http://github.com///compare/@codecademy/eslint-config@0.2.0...@codecademy/eslint-config@0.2.1) (2019-06-07 20:23:45 +0000)


### Features

* **Card:** Add card components ([a907a41](http://github.com///commit/a907a419ae83fa12b643bad98c80006d6f33f414))

## 0.2.0 (2019-05-06 15:43:08 +0000)


### Features

* add react hooks linting ([#325](http://github.com//undefined/issues/325)) ([017a0cf](http://github.com///commit/017a0cf9743a462b3e493637cf8893252268acad))
* use correct parser for eslint files by default ([#336](http://github.com//undefined/issues/336)) ([38ef491](http://github.com///commit/38ef4919fc6934c8c02ffbb4a4341eec66d2ef49))


### Bug Fixes

* **deps:** update storybook monorepo to v5.0.11 ([#332](http://github.com//undefined/issues/332)) ([a883ad7](http://github.com///commit/a883ad7ffb288b9afd18363994612960e4bd2f9c))

### [0.1.4](http://github.com///compare/@codecademy/eslint-config@0.1.3...@codecademy/eslint-config@0.1.4) (2019-05-03 21:08:24 +0000)


### Features

* **Markdown:** add default table override component ([#307](http://github.com//undefined/issues/307)) ([22ef5cb](http://github.com///commit/22ef5cbce7d5a2452a800374788379580f8e6c6a))
* **webpack-config:** add case sensitive paths plugin in dev mode ([#302](http://github.com//undefined/issues/302)) ([66c0632](http://github.com///commit/66c06328363c05aa30291979155ae9fb64c586a8))


### Bug Fixes

* Disabled no-unused-vars for TypeScript ([#329](http://github.com//undefined/issues/329)) ([8980296](http://github.com///commit/89802963cb41307dedaf1f9d5a18fda2ba5e3cc9))
* pass onClick through to base button element ([b16ed8f](http://github.com///commit/b16ed8f0395412c1ae63f93ccc2b7a3009ee6707))
* **deps:** update dependency babel-preset-codecademy to v2.2.1 ([#311](http://github.com//undefined/issues/311)) ([064e950](http://github.com///commit/064e950fb2ee7b7349bd9ddf369c7f5629a7ea6f))
* **deps:** update dependency fork-ts-checker-webpack-plugin to v1.1.0 ([#312](http://github.com//undefined/issues/312)) ([13e155c](http://github.com///commit/13e155c4b452892f4faae7763ed94e867e342195))
* **deps:** update dependency jsdom to v15 ([#318](http://github.com//undefined/issues/318)) ([837d5a4](http://github.com///commit/837d5a45fe9c4a91dd4bdd04b9abd3a34a7be609))
* **deps:** update dependency lerna to v3.13.3 ([#313](http://github.com//undefined/issues/313)) ([f73a4ca](http://github.com///commit/f73a4ca553f58be42669820ef91ad50188c90ee3))
* **deps:** update dependency optimize-css-assets-webpack-plugin to v5 ([#259](http://github.com//undefined/issues/259)) ([13b185c](http://github.com///commit/13b185ca673446b3a533377b6f095a1190bd8611))
* **deps:** update storybook monorepo to v5.0.10 ([#316](http://github.com//undefined/issues/316)) ([a5a520e](http://github.com///commit/a5a520ea61963994446c895fe4e0fadef335f19c))
* **Markdown:** catch invalid url errors ([#315](http://github.com//undefined/issues/315)) ([792056c](http://github.com///commit/792056ccd1bd019ac24bfc64a93d38272ab7dbba))

### 0.1.3 (2019-04-08 19:10:16 +0000)


### Features

* create enzyme-helpers package ([b70b7b4](http://github.com///commit/b70b7b454aa600a8822636e37adc435c15ecb8da))


### Bug Fixes

* **deps:** pin dependencies ([#288](http://github.com//undefined/issues/288)) ([273e99a](http://github.com///commit/273e99a6d677ce70185b318deb30e82d3b7b44ba))
* **deps:** update dependency postcss-flexbugs-fixes to v4 ([#260](http://github.com//undefined/issues/260)) ([41b6201](http://github.com///commit/41b62013eb88c060a8f00b56d89c8017dcec1281))

### 0.1.2 (2019-04-08 14:18:24 +0000)


### Features

* export all components ([#284](http://github.com//undefined/issues/284)) ([92bcf8e](http://github.com///commit/92bcf8ea71333e5c97aff24d557043e67be97b36))
* Use babel to compile typescript in storybook ([#285](http://github.com//undefined/issues/285)) ([5622985](http://github.com///commit/56229859b8383ee0759afe7aaf642bb2a34d7d00))
* webpack-config, add support for ts/tsx extensions in babel, other cleanup  ([#282](http://github.com//undefined/issues/282)) ([d213899](http://github.com///commit/d213899ad4e430a60dd4f98f2ebb7294e2518974))
* **component:** New notification menu component ([4918516](http://github.com///commit/49185166e4feb52b5ce8e35acd4609a236c5ffbe))


### Bug Fixes

* storybook cleanup, add defaults opt-out to webpack-config ([#290](http://github.com//undefined/issues/290)) ([16b2fb0](http://github.com///commit/16b2fb003838c1f6e21c468511b8b1c23b50cad7))
* updates loading icon ([6719276](http://github.com///commit/6719276dc6c52fff3083fa64e32bef7e64e9bf7a))
* **deps:** bump base react version ([5957f0e](http://github.com///commit/5957f0e0a27eee4bd302979daab7145a43d63889))
* **deps:** pin dependencies ([#231](http://github.com//undefined/issues/231)) ([c185ac8](http://github.com///commit/c185ac8013565cc103717b7b2b961177bff4125c))
* **deps:** pin dependencies ([#280](http://github.com//undefined/issues/280)) ([3b1bc1b](http://github.com///commit/3b1bc1b86d7ad1976d8883d1bce3c976fe47457c))
* **deps:** update babel monorepo to v7.4.0 ([#244](http://github.com//undefined/issues/244)) ([1b4932e](http://github.com///commit/1b4932e39da271a387352901b1c3e2971bb1fc1a))
* **deps:** update babel monorepo to v7.4.3 ([#281](http://github.com//undefined/issues/281)) ([412a36a](http://github.com///commit/412a36a55ca7f866ef62d08ba24cc39b9250ab63))
* **deps:** update dependency babel-loader to v8.0.5 ([#256](http://github.com//undefined/issues/256)) ([b774959](http://github.com///commit/b77495902aecdce6de730355f211f8785cb44694))
* **deps:** update dependency chai to v4 ([#257](http://github.com//undefined/issues/257)) ([86c439f](http://github.com///commit/86c439fcc0efd94be7ca18c69254492cdac6996f))
* **deps:** update dependency css-loader to v2.1.1 ([#245](http://github.com//undefined/issues/245)) ([a033a4b](http://github.com///commit/a033a4b380686ae11bc5d8de27a414388947853d))
* **deps:** update dependency react-docgen-typescript-loader to v3.1.0 ([#279](http://github.com//undefined/issues/279)) ([e01540d](http://github.com///commit/e01540d76351860cd238a908d5d384eb77f7b45d))
* **deps:** update react monorepo to v16.8.6 ([#263](http://github.com//undefined/issues/263)) ([b4f7494](http://github.com///commit/b4f749448c31f2df1c70bfac6b8d120f34520684))
* add babel config back to storybook ([cdf77e4](http://github.com///commit/cdf77e4a806a46bf947d79009eaf38f55db28c3a))
* **deps:** update storybook monorepo to v5 (major) ([#268](http://github.com//undefined/issues/268)) ([dc85ea8](http://github.com///commit/dc85ea8a31ecd3e6e03efa2c4ecb6c7b43aa6e16))
* export JS colors object, removes scss exports ([854ae75](http://github.com///commit/854ae7562bd64520ff989925c5139cc36971df4a))
* fix button story with correct import ([7e33767](http://github.com///commit/7e33767b9d6ad5f9c591fc65888238a247c11d1c))
* Fix notification styles ([f7674f8](http://github.com///commit/f7674f898868ddfe9377df42159bec952776298b))
* updates story colors ([#229](http://github.com//undefined/issues/229)) ([ecf01c3](http://github.com///commit/ecf01c396b5692ef77555082cac8ab1e807f0257))
* **deps:** update dependency webpack to v4.29.6 ([#247](http://github.com//undefined/issues/247)) ([dd6a897](http://github.com///commit/dd6a897dc82bad987ee806f18a2a38dd396977c6))
* **deps:** update react monorepo to v16.8.4 ([#248](http://github.com//undefined/issues/248)) ([a3dc657](http://github.com///commit/a3dc657997cf814209cc0af39dfdbbcea3690271))
* **deps:** update storybook monorepo to v4.1.14 ([#249](http://github.com//undefined/issues/249)) ([dd2a796](http://github.com///commit/dd2a79691a960b4ef7246847fda543de0c2393ac))
* **Markdown:** Add smart dash support, fix &mdash; showing up in text. ([#226](http://github.com//undefined/issues/226)) ([8deeb79](http://github.com///commit/8deeb79d1714e199f2ad7c425c877df90852b16c))

### 0.1.1 (2019-03-13 19:51:50 +0000)

## 0.1.0 (2019-03-13 18:55:27 +0000)


### ⚠ BREAKING CHANGES

* `gamut-styles/variables` renamed to `gamut-styles/utils/variables`

### Features

* Add shared config modules for eslint & prettier ([#224](http://github.com//undefined/issues/224)) ([7fbeac6](http://github.com///commit/7fbeac653543741010003d5fce81cf6bdb1b9291))
* Adds mar 2019 colors, deprecates colors ([#211](http://github.com//undefined/issues/211)) ([c5c1e7f](http://github.com///commit/c5c1e7fce406fddd5687d4e20644f7e778cb767f))
* **icons:** add menu icon, adjust close icon ([#222](http://github.com//undefined/issues/222)) ([56b868d](http://github.com///commit/56b868d644fda9a7e071384cc948020f6013d293))
* **Markdown:** add allowedAttributes config to custom markdown overrides ([#221](http://github.com//undefined/issues/221)) ([f3c9cf2](http://github.com///commit/f3c9cf244746a630fca6f07a831c77329130d4e6))
* Add clipboard icon ([a3cc4e6](http://github.com///commit/a3cc4e6b14e48f990adb95bd5a954e6c6803e9f9))
* add edit icon ([#126](http://github.com//undefined/issues/126)) ([4525bc2](http://github.com///commit/4525bc2efcc4232936e59fe20560141b7716414b))
* add flexbugs postcss plugin to normalize cross-browser flex-box properties ([#115](http://github.com//undefined/issues/115)) ([21e8b94](http://github.com///commit/21e8b943f7bbca09e15d4777e3f0ec45b256e0b3))
* Add Markdown Component ([#155](http://github.com//undefined/issues/155)) ([2254b8e](http://github.com///commit/2254b8e24c42f2b5bbf455cb48ba116d260711bb))
* add search icon ([#161](http://github.com//undefined/issues/161)) ([73b2c5e](http://github.com///commit/73b2c5e3879012ba6f1c497fd089ab81a4d566c5))
* Added optional (aria-)label to Icon component ([64778f5](http://github.com///commit/64778f568da39abd02df3b283b73f2e6bd6f9747))
* Allow custom Tab activeClassName ([#128](http://github.com//undefined/issues/128)) ([034c9b8](http://github.com///commit/034c9b87d70bde900ca19865f7456a3d7a90fff7))
* Better babel 7 support ([#145](http://github.com//undefined/issues/145)) ([49a1e23](http://github.com///commit/49a1e23cd455b51f318e8a92888fddeb325f9d21))
* Enabled noImplicitAny globally ([#188](http://github.com//undefined/issues/188)) ([2520733](http://github.com///commit/2520733b0fccf4b01c5a1e1715260f4354c34477))
* Merge standard & core variables ([#123](http://github.com//undefined/issues/123)) ([5bf24b0](http://github.com///commit/5bf24b018a24b4fddbb06b21c14fedb3ad9d7dd8))
* More dev server options ([#151](http://github.com//undefined/issues/151)) ([d181f5a](http://github.com///commit/d181f5a16273a6b7f483ef4692e7ba081f0d7b12))
* remove hot-loader as a dependency ([#146](http://github.com//undefined/issues/146)) ([b3b29b0](http://github.com///commit/b3b29b0858bab1a80ee02b0d035e1773c073a8fd))
* show all buttons in the main button story page ([#87](http://github.com//undefined/issues/87)) ([fbe5b24](http://github.com///commit/fbe5b24691834bbbb615a04432c3f34420fe7cba))
* Support React v16 ([#132](http://github.com//undefined/issues/132)) ([fafaab2](http://github.com///commit/fafaab24a09f3fe0d6f94c96046ae1b876ffaf3b))
* switch back to dev server ([#149](http://github.com//undefined/issues/149)) ([335377e](http://github.com///commit/335377ecd124880669253c2f1a92a4b9e0e46be9))
* switch to webpack-serve ([#144](http://github.com//undefined/issues/144)) ([d5389b0](http://github.com///commit/d5389b0c39e7d9937509c66960ec5d23f01a0429))
* update markdown component to include an explicit codeblock override ([daec408](http://github.com///commit/daec408f1245b7191525232815a7826bd2ba33a6))
* updates for babel 7 ([748b911](http://github.com///commit/748b91130629d8a41d8dbe294837af9b0c20247b))
* **icons:** PathIcon ([31c1d79](http://github.com///commit/31c1d79b711c4895ebb14748d8ad74152fcaaa0b))


### Bug Fixes

* add more dev server headers to avoid local errors ([#156](http://github.com//undefined/issues/156)) ([51ff9fd](http://github.com///commit/51ff9fd10d9a6bb2a07b025baf6f0a69067339a9))
* add sideeffects for css and scss ([#157](http://github.com//undefined/issues/157)) ([c4e06d3](http://github.com///commit/c4e06d3d377d0eb638dfee9e3bf111852caa407a))
* allow certain class names in Markdown component  ([#183](http://github.com//undefined/issues/183)) ([a38d144](http://github.com///commit/a38d144dc0f5fbfe7bb1af01b9fe9db671fcb9b2))
* allow font element in markdown, fix storybook build ([#184](http://github.com//undefined/issues/184)) ([79c11eb](http://github.com///commit/79c11ebefe86668540a415ad3c794d423158ced1))
* Fix issue where markdown CodeBlock consumers receive an array instead of a string ([#182](http://github.com//undefined/issues/182)) ([bb5c3c5](http://github.com///commit/bb5c3c58a59732c48e59a3e4d7aba4b69ce982c5))
* Fix malformed image tags in Markdown Component ([#172](http://github.com//undefined/issues/172)) ([18f5b0b](http://github.com///commit/18f5b0b88a302326cda2c5617831333f98dad1c5))
* Fix more inline html weirdness in the Markdown component ([#167](http://github.com//undefined/issues/167)) ([fd8e61c](http://github.com///commit/fd8e61c99e49be8a97f04d8caf9ea8bd5098b968))
* fixes phone icon size ([4d2e0de](http://github.com///commit/4d2e0de49c1696685aab4632ba16d24bfe8a065e))
* Fully reset BaseButton styles ([#166](http://github.com//undefined/issues/166)) ([6a9ec72](http://github.com///commit/6a9ec727c549cbaca8e21f898a1470d58ab34b33))
* Markdown component  - Fix url access for server rendering ([#194](http://github.com//undefined/issues/194)) ([c741c30](http://github.com///commit/c741c306c7e5768efe237674fa4ad30083e5bb5d))
* Markdown Component - Add anchor override, fix image spacing ([#192](http://github.com//undefined/issues/192)) ([b9e5411](http://github.com///commit/b9e5411dbcfd5d16c49fb2596e2ed5bee1f57914))
* Markdown component - fix Invalid URL errors  ([#195](http://github.com//undefined/issues/195)) ([c130166](http://github.com///commit/c1301668fca7c3868fd4f27e74f9c1d55f154f8d))
* Markdown version 2.0 ([#176](http://github.com//undefined/issues/176)) ([5162872](http://github.com///commit/5162872b2c0367e8dee768585b3432e612dd4906))
* minor core stylesheet tweaks ([#159](http://github.com//undefined/issues/159)) ([3dc76fc](http://github.com///commit/3dc76fca4a94f30a455889b7df0a6eeb4da5bfc6))
* More defensive markdown formatting fixes ([#162](http://github.com//undefined/issues/162)) ([038b0d6](http://github.com///commit/038b0d65592165394db313f591acd9dbf0085478))
* more defensive url ([a328533](http://github.com///commit/a3285334405123efb9276ec44378dd3c8d114b3b))
* pass data-attributes through omitProps util & use on markdown component ([#165](http://github.com//undefined/issues/165)) ([2d1a27d](http://github.com///commit/2d1a27d1e8b82103c77bc7dcaf50fe092b9323f3))
* remove all unused local variables ([#208](http://github.com//undefined/issues/208)) ([ccc044a](http://github.com///commit/ccc044aeb941a0589e55ea73e9be66656f91c52f))
* remove markdown lookbehind regex for firefox compatibility ([#175](http://github.com//undefined/issues/175)) ([690b561](http://github.com///commit/690b561c79e0c2076bc3a80b07987d898fb07d34))
* revert changes to ButtonBase ([#218](http://github.com//undefined/issues/218)) ([454cfc6](http://github.com///commit/454cfc6d17f4a65c06fb7235f0bed8ca4404036b))
* updates readme ([#213](http://github.com//undefined/issues/213)) ([7078f36](http://github.com///commit/7078f36990cba5f845f04f60663dff6b9f01680b))
* **component:** Spread and render extra props for Radio components ([#152](http://github.com//undefined/issues/152)) ([eb878c0](http://github.com///commit/eb878c0af8bdd94fe58669662faa935353f42ee7))
* **gamut:** remove button underline on hover ([bccd7d8](http://github.com///commit/bccd7d8c6febec3ab56cd22ed47adb081b691fed))
* **RadialProgress:** convert value to percent ([#207](http://github.com//undefined/issues/207)) ([4d738c6](http://github.com///commit/4d738c663bb757f226c0c7e018ce05e1b6ae309e))


### Reverts

* **unknown:** Revert "add module generator script" ([0ed23eb](http://github.com///commit/0ed23ebcc9d2a0d9afed5b72b7b390e89ba0679a))
* **unknown:** Revert "Adds form elements to gamut" ([5401391](http://github.com///commit/540139179896bf2758107cae4e9eb0cba706e607))
* **unknown:** Revert "Adds identity styles"" ([2f476fb](http://github.com///commit/2f476fba33b49b963c7b6de5d0c4326ae47ab237))
* **unknown:** Revert "Replace manual import & naming with contextual require & localized naming" ([a78d42f](http://github.com///commit/a78d42fc1dc13143e563f88e468e57f8784e5fe5))
* **unknown:** Revert "testing issue with rails-sass" ([edcdebf](http://github.com///commit/edcdebfcc7c943fa1086122dac34dbd7b289ee81))

