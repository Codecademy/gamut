const glob = require('glob');

const DEFAULT_STORIES_GLOB = '../stories/**/*.stories.@(mdx|tsx)';

const splitToChunks = (array, parts) => {
  const copiedArray = array.concat([]);
  let result = [];
  for (let i = parts; i > 0; i--) {
    const chunk = copiedArray.splice(0, Math.ceil(copiedArray.length / i));
    result.push(chunk);
  }
  return result;
};

const STORYSHOT_GLOB = '../__tests__/storyshots/*-test.ts';

const storyShots = glob.sync(STORYSHOT_GLOB, { cwd: __dirname });

const TOTAL = storyShots.length;

const storiesFiles = glob.sync(DEFAULT_STORIES_GLOB, { cwd: __dirname }).sort();

const getChunkedStories = () => {
  const INDEX = global.STORYSHOTS_INDEX;

  const chunkedStories = splitToChunks(storiesFiles, TOTAL);
  const foundStories = chunkedStories[INDEX] || [];
  console.log(
    `Running storyshot tests for ${foundStories.length} stories out of ${
      storiesFiles.length
    } total stories ${INDEX + 1}/${TOTAL}`
  );

  return foundStories;
};

module.exports = () =>
  process.env.NODE_ENV === 'test'
    ? getChunkedStories()
    : [DEFAULT_STORIES_GLOB];
