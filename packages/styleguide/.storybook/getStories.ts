const glob = require('glob');
const { chunk } = require('lodash');

const DEFAULT_STORIES_GLOB = '../stories/**/*.stories.@(mdx|tsx)';

const getChunkedStories = () => {
  // @ts-expect-error we using janky globals
  const INDEX = global.STORYSHOTS_INDEX;
  // @ts-expect-error we using janky globals
  const TOTAL = global.STORYSHOTS_TOTAL;

  const storiesFiles = glob
    .sync(DEFAULT_STORIES_GLOB, { cwd: __dirname })
    .sort();

  const chunkedStories = chunk(
    storiesFiles,
    Math.ceil(storiesFiles.length / TOTAL)
  );

  console.log(
    `Running storyshot tests for ${
      chunkedStories[INDEX].length
    } stories out of ${storiesFiles.length} total stories. ${chunkedStories[
      INDEX
    ].join(', ')}`
  );

  return chunkedStories[INDEX];
};

module.exports = () =>
  process.env.NODE_ENV === 'test'
    ? getChunkedStories()
    : [DEFAULT_STORIES_GLOB];
