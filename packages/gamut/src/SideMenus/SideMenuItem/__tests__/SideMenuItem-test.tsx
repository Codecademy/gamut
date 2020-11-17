import { mount } from 'enzyme';
import React from 'react';

import { SideMenuItem } from '../index';
import styles from '../styles.module.scss';

describe('SideMenuItem', () => {
  test.each([
    [false, false],
    [true, true],
  ])('selected class is %d when selected is %d', (selected, hasClass) => {
    const component = mount(<SideMenuItem selected={selected} />);

    expect(component.find('li').hasClass(styles.selected)).toBe(hasClass);
  });
});
