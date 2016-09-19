import { configure, setAddon, addDecorator } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import { wrapper } from './decorators/wrapper';

addDecorator(withKnobs);
addDecorator(wrapper);

setAddon(infoAddon);
function loadStories() {
  require('../stories');
}

configure(loadStories, module);
