import { setupEnzyme } from '@codecademy/gamut-tests';
import React from 'react';

import { List } from '../List';
import { ListCol } from '../ListCol';
import { ListRow } from '../ListRow';

const renderWrapper = setupEnzyme(List, {
  children: (
    <ListRow>
      <ListCol>Hello</ListCol>
    </ListRow>
  ),
});

describe('Menu', () => {
  it('renders a slat list by default', () => {
    const { wrapper } = renderWrapper();

    expect(wrapper.find('ListEl').prop('variant')).toBe('slat');
  });
  it('configures rows with the correct variants', () => {
    const { wrapper } = renderWrapper();

    expect(wrapper.find('RowEl').prop('variant')).toBe('slat');
    expect(wrapper.find('RowEl').prop('spacing')).toBe('normal');
  });
  it('configures columns with the correct variants', () => {
    const { wrapper } = renderWrapper();

    expect(wrapper.find('ColEl').prop('variant')).toBe('slat');
    expect(wrapper.find('ColEl').prop('spacing')).toBe('normal');
  });
});
