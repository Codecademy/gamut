import initStoryshots, { renderWithOptions } from '@storybook/addon-storyshots';
import { mount } from 'enzyme';
import path from 'path';

global.STORYSHOTS_TOTAL = 9;

export const runSplitStoryshotsTests = (index: number) => {
  global.STORYSHOTS_INDEX = index;

  initStoryshots({
    framework: 'react',
    test: renderWithOptions({
      renderer: mount,
    }),
    storyKindRegex: /^((?!.*?Popover).(?!.*?Overlay).)*$/,
    configPath: path.join(__dirname, '../.storybook'),
  });
};
