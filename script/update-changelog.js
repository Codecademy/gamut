const conventionalChangelog = require('conventional-changelog');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
// subdependency of conventionalChangelog
const dateFormat = require('dateformat');

const { LERNA_PACKAGE_NAME } = process.env;
const packageChangelogPath = path.join(process.cwd(), 'CHANGELOG.md');

const outputStream = fs.createWriteStream(packageChangelogPath);

const packageRegex = new RegExp(`${LERNA_PACKAGE_NAME}@(?<version>.*?)(,|\\))`);

conventionalChangelog(
  {
    preset: {
      name: 'conventionalcommits',
      types: [
        { type: 'feat', section: '✨ Features' },
        { type: 'feature', section: '✨ Features' },
        { type: 'fix', section: '🐛 Bug Fixes' },
        { type: 'perf', section: '🏎 Performance Improvements' },
        { type: 'revert', section: '🗑 Reverts' },
        { type: 'docs', section: '📝 Documentation' },
        { type: 'style', section: '💅 Styles' },
        { type: 'chore', section: 'Other Changes' },
        { type: 'refactor', section: '🧹 Code Refactoring' },
        { type: 'test', section: '🧪 Tests' },
        { type: 'build', section: '🏗 Build System' },
        { type: 'ci', section: 'Continuous Integration', hidden: true },
      ],
    },
    // debug: console.debug.bind(console),
    tagPrefix: `${LERNA_PACKAGE_NAME}@`,
    releaseCount: 0,
    lernaPackage: LERNA_PACKAGE_NAME,
    outputUnreleased: true,
    pkg: {
      path: path.join(process.cwd(), 'package.json'),
    },
    transform(commit, cb) {
      if (!commit.type) {
        // Mark misconfigured commits as chore
        commit.type = 'chore';
        commit.subject = commit.header;
        commit.header = `chore: ${commit.header}`;
      }

      // Fix lerna versions
      if (commit.gitTags.includes(LERNA_PACKAGE_NAME)) {
        const result = packageRegex.exec(commit.gitTags);
        commit.version = result && result.groups.version;
      }

      // Format commit date
      if (commit.committerDate) {
        commit.committerDate = dateFormat(
          commit.committerDate,
          'yyyy-mm-dd',
          true
        );
      }

      cb(null, commit);
    },
  },
  // context
  {
    owner: 'Codecademy',
    repository: 'client-modules',
    repoUrl: 'https://github.com/Codecademy/client-modules',
  },
  {
    // ensure we're only looking at commits for this package
    path: process.cwd(),
  },
  {},
  {
    // This ensures that the version diff links actually work and reference the diff between tags
    finalizeContext(
      context,
      writerOpts,
      filteredCommits,
      keyCommit,
      originalCommits
    ) {
      // Modified from https://github.com/conventional-changelog/conventional-changelog/blob/bab29e3daf55db629326598ec528e3500b557498/packages/conventional-changelog-core/lib/merge-config.js#L269-L320
      const firstCommit = originalCommits[0];
      const lastCommit = originalCommits[originalCommits.length - 1];
      const firstCommitHash = firstCommit ? firstCommit.hash : null;
      const lastCommitHash = lastCommit ? lastCommit.hash : null;
      const { gitSemverTags } = context;

      if ((!context.currentTag || !context.previousTag) && keyCommit) {
        // MODIFIED: updated to match lerna tags
        const tagResult = packageRegex.exec(keyCommit.gitTags);
        const tag =
          tagResult && `${LERNA_PACKAGE_NAME}@${tagResult.groups.version}`;
        const { currentTag } = context;
        context.currentTag = currentTag || tag ? tag : null;

        const index = gitSemverTags.indexOf(context.currentTag);

        // if `keyCommit.gitTags` is not a semver
        if (index === -1) {
          context.currentTag = currentTag || null;
        } else {
          const previousTag = (context.previousTag = gitSemverTags[index + 1]);

          if (!previousTag) {
            context.previousTag = context.previousTag || lastCommitHash;
          }
        }
      } else {
        context.previousTag = context.previousTag || gitSemverTags[0];

        if (context.version === 'Unreleased') {
          context.currentTag = context.currentTag || firstCommitHash;
        } else if (!context.currentTag) {
          if (LERNA_PACKAGE_NAME) {
            context.currentTag = LERNA_PACKAGE_NAME + '@' + context.version;
          } else {
            context.currentTag = guessNextTag(
              gitSemverTags[0],
              context.version
            );
          }
        }
      }

      if (
        !_.isBoolean(context.linkCompare) &&
        context.previousTag &&
        context.currentTag
      ) {
        context.linkCompare = true;
      }

      return context;
    },
  }
).pipe(outputStream);

outputStream.on('finish', () => {
  // eslint-disable-next-line no-console
  console.log(
    `Completed changelog for ${LERNA_PACKAGE_NAME} at ${packageChangelogPath}`
  );
});
