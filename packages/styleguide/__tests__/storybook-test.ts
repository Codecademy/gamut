import path from 'path';
import initStoryshots, { renderOnly } from '@storybook/addon-storyshots';

jest.mock('react-truncate-markup', () => (props: any) => props.children);

initStoryshots({
  framework: 'react',
  test: renderOnly,
  configPath: path.join(__dirname, '../.storybook'),
});
