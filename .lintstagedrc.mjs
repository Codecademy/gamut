import micromatch from 'micromatch';

export default {
  // Use custom function to avoid overlaps that could cause race conditions
  [`*`]: (allChanges) => {
    const commands = [];

    // if (micromatch.some(allChanges, '**/package.json')) {
    //   commands.push(`yarn syncpack format`);
    // }

    if (micromatch.some(allChanges, 'yarn.lock')) {
      commands.push(`npx yarn-deduplicate`);
    }

    // Run nx format, which will run prettier
    commands.push(`nx format:write --files ${allChanges}`);

    return commands;
  },
};
