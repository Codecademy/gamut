import React from 'react';
import { shallow } from 'enzyme';

import { Icon } from '..';
import { iconMap } from '../iconMap';

describe('Icon', () => {
  it('renders an icon mapped by its name', () => {
    const iconName = 'bell';
    const wrapper = shallow(<Icon name={iconName} />);

    const realIcon = wrapper.find(iconMap[iconName]);

    expect(realIcon).toHaveLength(1);
  });

  it('passes extra props to the icon', () => {
    const extraProps = {
      foo: 'bar',
    };
    const wrapper = shallow(<Icon name="bell" {...extraProps} />);

    const iconProps = wrapper.find(iconMap.bell).props();

    expect(iconProps).toMatchObject(extraProps);
  });

  it('adds an aria-label when a label prop is provided', () => {
    const label = 'notifications';
    const wrapper = shallow(<Icon label={label} name="bell" />);

    const iconProps = wrapper.find(iconMap.bell).props();

    expect(iconProps).toMatchObject({
      'aria-label': label,
    });
  });

  it('sets the height and width when a size is provided', () => {
    const size = 117;
    const wrapper = shallow(<Icon name="bell" size={size} />);

    const iconProps = wrapper.find(iconMap.bell).props();

    expect(iconProps).toMatchObject({
      height: size,
      width: size,
    });
  });
});
