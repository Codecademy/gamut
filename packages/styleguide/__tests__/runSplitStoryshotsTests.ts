import { mount } from 'enzyme';
import path from 'path';
import initStoryshots, { renderWithOptions } from '@storybook/addon-storyshots';

// @ts-expect-error globals for storyshots splitting setup
global.STORYSHOTS_TOTAL = 9;

export const runSplitStoryshotsTests = (index: number) => {
  // @ts-expect-error globals for storyshots splitting setup
  global.STORYSHOTS_INDEX = index;

  runSplitStoryshotsTests(0);

  initStoryshots({
    framework: 'react',
    test: renderWithOptions({
      renderer: mount,
    }),
    storyKindRegex: /^((?!.*?Popover).(?!.*?Overlay).)*$/,
    configPath: path.join(__dirname, '../.storybook'),
  });
};
