import { setupRtl } from '@codecademy/gamut-tests';
import React from 'react';

import { List } from '../List';
import { ListCol } from '../ListCol';
import { ListRow } from '../ListRow';

const renderView = setupRtl(List, {
  children: (
    <ListRow data-testid="row-el">
      <ListCol>Hello</ListCol>
    </ListRow>
  ),
  id: 'list-el',
});

describe('List', () => {
  it('renders a default list by default', () => {
    const { view } = renderView();

    // const listEl = view.getByTestId('scrollable-list-el');
    const listEl = view.container.querySelector('ul');
    const rowEl = view.container.querySelector('li');

    expect(listEl).toHaveStyle({ borderRadius: '2px' });
    expect(rowEl).not.toHaveStyle({ minWidth: 'min-content' });
  });

  it('configures rows with the correct variants', () => {
    const { view } = renderView();
    const wrappingRow = view.find('RowEl').at(0);
    expect(wrappingRow.prop('variant')).toBe('default');
    expect(wrappingRow.prop('spacing')).toBe('normal');
    expect(wrappingRow.prop('rowBreakpoint')).toBe('xs');
  });
  it('configures columns with the correct variants', () => {
    const { view } = renderView();

    expect(view.find('ColEl').prop('variant')).toBe('default');
    expect(view.find('ColEl').prop('spacing')).toBe('normal');
    expect(view.find('ColEl').prop('rowBreakpoint')).toBe('xs');
    expect(view.find('ColEl').prop('sticky')).toBe(false);
  });
  it('fixes the row header column when scrollable - but not other columns', () => {
    const { view } = renderView({
      scrollable: true,
      children: (
        <ListRow>
          <ListCol type="header">Hello</ListCol>
          <ListCol>Content</ListCol>
        </ListRow>
      ),
    });

    expect(view.find({ type: 'header', sticky: true }).length).toBe(1);
    expect(view.find({ type: 'content', sticky: true }).length).toBe(0);
  });
  it('renders ListRow with expanded content when expanded is true', () => {
    const { view } = renderView({
      children: (
        <ListRow
          expanded
          renderExpanded={() => <div id="surprise">Surprise!</div>}
        >
          <ListCol type="header">Hello</ListCol>
          <ListCol>Content</ListCol>
        </ListRow>
      ),
    });

    expect(view.find('#surprise').length).toBe(1);
  });
  it('does not render ListRow with expanded content when expanded is false', () => {
    const { view } = renderView({
      children: (
        <ListRow
          expanded={false}
          renderExpanded={() => <div id="surprise">Surprise!</div>}
        >
          <ListCol type="header">Hello</ListCol>
          <ListCol>Content</ListCol>
        </ListRow>
      ),
    });
    expect(view.find('#surprise').length).toBe(0);
  });
});
