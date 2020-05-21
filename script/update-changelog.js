const conventionalChangelog = require('conventional-changelog');
const path = require('path');
const fs = require('fs');
const { LERNA_PACKAGE_NAME } = process.env;
const packageChangelogPath = path.join(process.cwd(), 'CHANGELOG.md');

const outputStream = fs.createWriteStream(packageChangelogPath);

const packageRegex = new RegExp(`${LERNA_PACKAGE_NAME}@(?<version>.*?)(,|\\))`);

conventionalChangelog({
  preset: 'conventionalcommits',
  releaseCount: 0,
  lernaPackage: LERNA_PACKAGE_NAME,
  outputUnreleased: true,
  pkg: {
    path: path.join(process.cwd(), 'package.json'),
  },
  transform(commit, cb) {
    if (!commit.type) {
      // Mark misconfigured commits as chores
      commit.type = 'chore';
      commit.subject = commit.header;
      commit.scope = 'unknown';
      commit.header = `fix: ${commit.header}`;
    }

    // Fix lerna versions
    if (commit.gitTags.includes(LERNA_PACKAGE_NAME)) {
      const result = packageRegex.exec(commit.gitTags);
      commit.version = result && result.groups.version;
    }

    cb(null, commit);
  },
}).pipe(outputStream);

outputStream.on('finish', () => {
  // eslint-disable-next-line no-console
  console.log(
    `Completed changelog for ${LERNA_PACKAGE_NAME} at ${packageChangelogPath}`
  );
});
