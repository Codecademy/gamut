const glob = require('glob');

const DEFAULT_STORIES_GLOB = '../stories/**/*.stories.@(mdx|tsx)';

const splitToChunks = (array, parts) => {
  let result = [];
  for (let i = parts; i > 0; i--) {
    result.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return result;
};

const getChunkedStories = () => {
  // @ts-expect-error globals for storyshots splitting setup
  const INDEX = global.STORYSHOTS_INDEX;
  // @ts-expect-error globals for storyshots splitting setup
  const TOTAL = global.STORYSHOTS_TOTAL;

  const storiesFiles = glob
    .sync(DEFAULT_STORIES_GLOB, { cwd: __dirname })
    .sort();

  const chunkedStories = splitToChunks(storiesFiles, TOTAL);

  console.log(
    `Running storyshot tests for ${
      chunkedStories[INDEX].length
    } stories out of ${storiesFiles.length} total stories ${
      INDEX + 1
    }/${TOTAL}. ${chunkedStories[INDEX].join(', ')}`
  );

  return chunkedStories[INDEX];
};

module.exports = () =>
  process.env.NODE_ENV === 'test'
    ? getChunkedStories()
    : [DEFAULT_STORIES_GLOB];
