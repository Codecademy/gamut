import { mount } from 'enzyme';

import { LogoProCutoutTransparent } from '..';

describe('LogoProCutoutTransparent', () => {
  it('renders the PRO logo', () => {
    const wrapper = mount(<LogoProCutoutTransparent />);

    expect(wrapper.exists()).toBe(true);
  });
});
