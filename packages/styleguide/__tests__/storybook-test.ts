import { mount } from 'enzyme';
import path from 'path';
import initStoryshots, { renderWithOptions } from '@storybook/addon-storyshots';

initStoryshots({
  framework: 'react',
  configPath: path.join(__dirname, '../.storybook'),
  test: renderWithOptions({
    renderer: mount,
  }),
});
