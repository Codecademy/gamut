'use strict';

const path = require('path');
const { createMacro } = require('babel-plugin-macros');

const getPathInformation = (f) => {
  const absolute = path.resolve(f).split('/');
  const storyRoot = 'stories';

  const storyPath = absolute.slice(
    absolute.indexOf(storyRoot) + 1,
    absolute.length
  );

  const title = storyPath
    .filter((slug) => slug.indexOf('index') === -1 && slug.length > 0)
    .map((slug) =>
      slug
        .replace(/\.stories\.(mdx|tsx|ts|js)/g, '')
        .replace('Deprecated', ` (Deprecated)`)
    )
    .join('/');

  return {
    title,
    default: title,
  };
};

const macro = ({ references, state }) => {
  const meta = getPathInformation(state.file.opts.filename);

  Object.keys(meta).forEach((key) => {
    const importRefs = references[key] || [];

    importRefs.forEach((ref) => {
      ref.replaceWithSourceString(JSON.stringify(meta[key]));
    });
  });
};

module.exports = createMacro(macro);
