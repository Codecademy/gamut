const glob = require('glob');
const { intersection } = require('lodash');

const DEFAULT_STORIES_GLOB = '../stories/**/*.stories.@(mdx|tsx)';
const EXCLUDED_STORIES = ['Truncate', 'Popover'];

const splitToChunks = (array: string[], parts: number) => {
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

  const sanitized = storiesFiles.filter(
    (path: string) =>
      intersection(EXCLUDED_STORIES, path.split(/(\/|\.)/)).length === 0
  );
  const chunkedStories = splitToChunks(sanitized, TOTAL);
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
