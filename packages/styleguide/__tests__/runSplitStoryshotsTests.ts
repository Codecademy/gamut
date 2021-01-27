import initStoryshots, { renderWithOptions } from '@storybook/addon-storyshots';
import { mount } from 'enzyme';
import glob from 'glob';
import path from 'path';

const STORYSHOT_GLOB = '../__tests__/storyshots/*-test.ts';
const storyShots = glob.sync(STORYSHOT_GLOB, { cwd: __dirname });

global.STORYSHOTS_TOTAL = storyShots.length;
window.fetch = Promise.resolve({ json: {} });

export const runSplitStoryshotsTests = (index: number) => {
  global.STORYSHOTS_INDEX = index;

  initStoryshots({
    framework: 'react',
    test: renderWithOptions({
      renderer: mount,
    }),
    configPath: path.join(__dirname, '../.storybook'),
  });
};
