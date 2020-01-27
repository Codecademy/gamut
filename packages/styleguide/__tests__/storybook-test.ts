import path from 'path';
import initStoryshots, { renderOnly } from '@storybook/addon-storyshots';

initStoryshots({
  framework: 'react',
  test: renderOnly,
  configPath: path.join(__dirname, '../.storybook'),
});
