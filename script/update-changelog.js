const conventionalChangelog = require('conventional-changelog');
const path = require('path');
const fs = require('fs');
const { LERNA_PACKAGE_NAME } = process.env;
const packageChangelogPath = path.join(process.cwd(), 'CHANGELOG.md');

const outputStream = fs.createWriteStream(packageChangelogPath);

conventionalChangelog({
  preset: 'conventionalcommits',
  releaseCount: 0,
  lernaPackage: LERNA_PACKAGE_NAME,
  verbose: true,
  outputUnreleased: true,
  pkg: {
    path: path.join(process.cwd(), 'package.json'),
  },
  // transform(commit, cb) {
  //   console.log(commit);
  // },
}).pipe(outputStream);

outputStream.on('finish', () => {
  // eslint-disable-next-line no-console
  console.log(
    `Completed changelog for ${LERNA_PACKAGE_NAME} at ${packageChangelogPath}`
  );
});

// outputStream.end();
