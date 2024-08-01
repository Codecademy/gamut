import { theme } from '@codecademy/gamut-styles';
import { setupRtl } from '@codecademy/gamut-tests';
import { matchers } from '@emotion/jest';

import { List } from '../List';
import { ListCol } from '../ListCol';
import { ListRow } from '../ListRow';

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

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

    const listEl = view.container.querySelector('ul');
    const rowEl = view.getByRole('listitem');

    expect(listEl).toHaveStyle({ borderRadius: '2px' });
    expect(rowEl).not.toHaveStyle({ minWidth: 'min-content' });
  });
  it('renders numbering for ordered lists  ', () => {
    const { view } = renderView({ as: 'ol' });

    const listEl = view.container.querySelector('ol');
    const rowEl = view.getByRole('listitem');

    expect(listEl).toBeTruthy();
    expect(rowEl).not.toHaveTextContent('1.');
  });
  it('configures rows with the correct variants', () => {
    const { view } = renderView();

    const rowEl = view.getByRole('listitem');

    expect(rowEl).toHaveStyle({ borderTop: 'none' });
    expect(rowEl).toHaveStyle({ gap: theme.spacing[8] });
    expect(rowEl).toHaveStyleRule('gap', theme.spacing[40], {
      media: theme.breakpoints.xs,
    });
  });

  it('configures columns with the correct variants', () => {
    const { view } = renderView();

    const colEl = view.getByText('Hello');

    expect(colEl).not.toHaveStyle({ py: 16 });
    expect(colEl).toHaveStyleRule('padding-top', theme.spacing[16], {
      media: theme.breakpoints.xs,
    });
    expect(colEl).toHaveStyleRule('padding-bottom', theme.spacing[16], {
      media: theme.breakpoints.xs,
    });

    expect(colEl).not.toHaveStyle({ position: 'sticky' });
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

    const headerEl = view.getByText('header-container');
    const contentEl = view.getByText('Content');

    expect(headerEl).toHaveStyle({ position: 'sticky' });
    expect(contentEl).not.toHaveStyle({ position: 'sticky' });
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

    view.getByText('Surprise!');
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
    expect(view.queryByText('Surprise!')).toBeNull();
  });
});
