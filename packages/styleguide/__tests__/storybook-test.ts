import { mount } from 'enzyme';
import path from 'path';
import initStoryshots, { renderWithOptions } from '@storybook/addon-storyshots';

initStoryshots({
  framework: 'react',
  test: renderWithOptions({
    renderer: mount,
  }),
  storyKindRegex: /^((?!.*?Popover).(?!.*?Overlay).)*$/,
  configPath: path.join(__dirname, '../.storybook'),
});
