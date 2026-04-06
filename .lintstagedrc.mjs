/** Staged paths use forward slashes; lint-staged may pass absolute or relative paths. */

// Manual pre-commit check (no extra scripts): change any file(s) you care about, `git add` them, then run
// `npx lint-staged` — that is exactly what `.husky/pre-commit` runs, so you will see the same lint-staged
// output and task list. Add ` --verbose` to print each command’s stdout/stderr.

/**
 * Returns whether any staged path is a file named `name` at the root of the path list
 * or nested under a directory (e.g. `package.json` or `packages/foo/package.json`).
 *
 * @param {string[]} changes - an array of strings with file paths that have changed
 * @param {string} name - Basename to match (e.g. `package.json`).
 * @returns {boolean}
 */
const hasFilename = (changes, name) =>
  changes.some((file) => file === name || file.endsWith(`/${name}`));

/** Shell-safe argument for paths that may contain spaces (lint-staged runs commands via a shell). */
const shellArg = (file) => JSON.stringify(file);

export default {
  // Use custom function to avoid overlaps that could cause race conditions
  [`*`]: (allChanges) => {
    const commands = [];
    console.log('allChanges are:', allChanges);

    if (hasFilename(allChanges, 'package.json')) {
      console.log('formatting package.json');
      commands.push(`yarn syncpack format`);
    }

    if (hasFilename(allChanges, 'yarn.lock')) {
      console.log('deduping yarn.lock');
      commands.push(`yarn dedupe`);
    }

    const ESLINT_EXT = /\.(mdx|tsx?|jsx?|json)$/;
    const eslintFiles = allChanges.filter((file) => ESLINT_EXT.test(file));

    if (eslintFiles.length) {
      console.log('fixing eslint files');
      console.log('here are the files', eslintFiles);
      commands.push(
        `node_modules/@codecademy/eslint-config/bin/eslint-fix.js ${eslintFiles
          .map(shellArg)
          .join(' ')}`
      );
    }

    // Run nx format, which will run prettier
    commands.push(
      `nx format:write --files ${allChanges.map(shellArg).join(' ')}`
    );

    return commands;
  },
};
