import micromatch from 'micromatch';

export default {
  // Use custom function to avoid overlaps that could cause race conditions
  [`*`]: (allChanges) => {
    const commands = [];

    if (micromatch.some(allChanges, '**/package.json')) {
      commands.push(`yarn syncpack format`);
    }

    if (micromatch.some(allChanges, 'yarn.lock')) {
      commands.push(`yarn dedupe`);
    }

    const eslintExtensions = `{mdx,ts,tsx,js,jsx,json}`;
    const eslintFiles = micromatch(
      allChanges,
      [`**/*.${eslintExtensions}`, `?(.)**.${eslintExtensions}`],
      { dot: true }
    );

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
