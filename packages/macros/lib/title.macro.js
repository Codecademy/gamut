'use strict';

const path = require('path');
const { createMacro } = require('babel-plugin-macros');

const getPath = (f) => {
  const absolute = path.resolve(f).split('/');
  const storyRoot = 'stories';

  const relative = absolute.slice(
    absolute.indexOf(storyRoot) + 1,
    absolute.length
  );

  return relative
    .filter((slug) => slug.indexOf('index') === -1 && slug.length > 0)
    .map((slug) =>
      slug.replace('.stories.mdx', '').replace('Deprecated', ` (Deprecated)`)
    )
    .join('/');
};

const macro = ({ references, state }) => {
  const title = getPath(state.file.opts.filename);

  references['default'].forEach((ref) =>
    ref.replaceWithSourceString(JSON.stringify(title))
  );
};

module.exports = createMacro(macro);
