import React from 'react';
import { shallow } from 'enzyme';

import { NotificationIcon } from '../NotificationIcon';
import { Icon } from '../../deprecated/Icon';
import { iconMap } from '../../deprecated/Icon/iconMap';

describe('NotificationIcon', () => {
  it('can render a picture icon', () => {
    const imageUrl = 'https://bit.ly/2lYjODX';
    const props = {
      imageUrl,
    };

    const wrapper = shallow(<NotificationIcon {...props} />);
    expect(wrapper.find('img').first().prop('src')).toEqual(imageUrl);
  });

  it('can render a gamut icon', () => {
    const iconSlug = 'python' as keyof typeof iconMap;

    const props = { iconSlug };
    const wrapper = shallow(<NotificationIcon {...props} />);

    expect(wrapper.find(Icon).length).toEqual(1);
  });
});
