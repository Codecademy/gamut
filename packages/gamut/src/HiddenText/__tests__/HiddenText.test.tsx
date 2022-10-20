import { mount } from 'enzyme';

import { HiddenText } from '..';

describe('HiddenText', () => {
  it('renders', () => {
    mount(<HiddenText>Surprise!</HiddenText>);
  });
});
