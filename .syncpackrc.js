// @ts-check

/** @type {import("syncpack").RcFile} */
const config = {
  dependencyTypes: ['prod', 'dev', 'resolution', 'local', 'overrides'],
  source: ['package.json', 'packages/*/package.json'],
  semverRange: '^',
  sortAz: [
    'contributors',
    'dependencies',
    'devDependencies',
    'keywords',
    'peerDependencies',
    'resolutions',
    'scripts',
  ],
  sortFirst: ['name', 'description', 'version', 'author'],
  // versionGroups: [
  //   {
  //     packages: ['**'],
  //     dependencies: ['**'],
  //     snapTo: ['gamut-repo'],
  //   },
  // ],
};

module.exports = config;
