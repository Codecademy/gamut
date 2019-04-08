import path from 'path';
import initStoryshots, { renderOnly } from '@storybook/addon-storyshots';

initStoryshots({
  test: renderOnly,
  configPath: path.join(__dirname, '../.storybook'),
});
