import { mount } from 'enzyme';
import path from 'path';
import initStoryshots, { renderWithOptions } from '@storybook/addon-storyshots';

initStoryshots({
  framework: 'react',
  test: renderWithOptions({
    renderer: mount,
  }),
  configPath: path.join(__dirname, '../.storybook'),
});
