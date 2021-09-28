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
    expect(wrapper.find('ListEl').prop('scrollable')).toBe(undefined);
  });
  it('configures rows with the correct variants', () => {
    const { wrapper } = renderWrapper();
    const wrappingRow = wrapper.find('RowEl').at(0);
    expect(wrappingRow.prop('variant')).toBe('slat');
    expect(wrappingRow.prop('spacing')).toBe('normal');
  });
  it('configures columns with the correct variants', () => {
    const { wrapper } = renderWrapper();

    expect(wrapper.find('ColEl').prop('variant')).toBe('slat');
    expect(wrapper.find('ColEl').prop('spacing')).toBe('normal');
    expect(wrapper.find('ColEl').prop('sticky')).toBe(false);
  });
  it('fixes the row header column when scrollable - but not other columns', () => {
    const { wrapper } = renderWrapper({
      scrollable: true,
      children: (
        <ListRow>
          <ListCol type="header">Hello</ListCol>
          <ListCol>Content</ListCol>
        </ListRow>
      ),
    });

    expect(wrapper.find({ type: 'header', sticky: true }).length).toBe(1);
    expect(wrapper.find({ type: 'content', sticky: true }).length).toBe(0);
  });
});
