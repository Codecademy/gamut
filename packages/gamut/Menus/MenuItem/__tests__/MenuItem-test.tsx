import { mount } from 'enzyme';
import React from 'react';

import MenuItem from '../index';
import s from '../styles.scss';

describe('MenuItem', () => {
  test.each([[false, false], [true, true]])(
    'selected class is %i when selected is %i',
    (selected, hasClass) => {
      const component = mount(<MenuItem selected={selected} />);

      expect(component.hasClass(s.selected)).toBe(hasClass);
    }
  );
});
