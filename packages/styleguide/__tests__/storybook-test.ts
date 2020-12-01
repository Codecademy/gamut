import initStoryshots, { renderWithOptions } from '@storybook/addon-storyshots';
import { mount } from 'enzyme';
import path from 'path';

initStoryshots({
  framework: 'react',
  test: renderWithOptions({
    renderer: mount,
  }),
  storyKindRegex: /^((?!.*?Popover).(?!.*?Overlay).)*$/,
  configPath: path.join(__dirname, '../.storybook'),
});
