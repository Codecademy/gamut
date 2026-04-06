/** Staged paths use forward slashes; lint-staged may pass absolute or relative paths. */

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

export default {
  // Use custom function to avoid overlaps that could cause race conditions
  [`*`]: (allChanges) => {
    const commands = [];

    if (hasFilename(allChanges, 'package.json')) {
      commands.push(`yarn syncpack format`);
    }

    if (hasFilename(allChanges, 'yarn.lock')) {
      commands.push(`yarn dedupe`);
    }

    const ESLINT_EXT = /\.(mdx|tsx?|jsx?|json)$/;
    const eslintFiles = allChanges.filter((file) => ESLINT_EXT.test(file));

    if (eslintFiles.length) {
      commands.push(
        `node_modules/@codecademy/eslint-config/bin/eslint-fix.js ${eslintFiles.join(
          ' '
        )}`
      );
    }

    // Run nx format, which will run prettier
    commands.push(`nx format:write --files ${allChanges}`);

    return commands;
  },
};
