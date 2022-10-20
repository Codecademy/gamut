import { mount } from 'enzyme';

import { LogoProCutout } from '..';

describe('LogoProCutout', () => {
  it('renders the PRO logo', () => {
    const wrapper = mount(<LogoProCutout />);

    expect(wrapper.exists()).toBe(true);
  });
});
