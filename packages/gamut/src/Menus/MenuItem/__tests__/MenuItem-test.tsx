import { mount } from 'enzyme';
import React from 'react';

import { MenuItem } from '../index';
import styles from '../styles.module.scss';

describe('MenuItem', () => {
  test.each([
    [false, false],
    [true, true],
  ])('selected class is %d when selected is %d', (selected, hasClass) => {
    const component = mount(<MenuItem selected={selected} />);

    expect(component.find('li').hasClass(styles.selected)).toBe(hasClass);
  });
});
