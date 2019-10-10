import React from 'react';
import { shallow } from 'enzyme';
import NotificationIcon from '../NotificationIcon';
import Icon from '../../Icon';
describe('NotificationIcon', () => {
  it('can render a picture icon', () => {
    const imageUrl = 'https://bit.ly/2lYjODX';
    const props = {
      imageUrl,
    };
    const wrapper = shallow(
      React.createElement(NotificationIcon, Object.assign({}, props))
    );
    expect(
      wrapper
        .find('img')
        .first()
        .prop('src')
    ).toEqual(imageUrl);
  });
  it('can render a gamut icon', () => {
    const iconSlug = 'python';
    const props = { iconSlug };
    const wrapper = shallow(
      React.createElement(NotificationIcon, Object.assign({}, props))
    );
    expect(wrapper.find(Icon).length).toEqual(1);
  });
});
//# sourceMappingURL=NotificationIcon-test.js.map
