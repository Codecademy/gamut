import { mount } from 'enzyme';
import path from 'path';
import initStoryshots from '@storybook/addon-storyshots';

jest.mock('react-truncate-markup', () => (props: any) => props.children);

initStoryshots({
  framework: 'react',
  renderer: mount,
  configPath: path.join(__dirname, '../.storybook'),
});
