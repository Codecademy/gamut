import { theme } from '@codecademy/gamut-styles';
import { setupRtl } from '@codecademy/gamut-tests';
import { matchers } from '@emotion/jest';

import { GridFormSectionTitle } from '../GridFormSectionTitle';

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

const renderView = setupRtl(GridFormSectionTitle, {
  title: 'Updog',
  numberOfFields: 3,
});

describe('GridFormSectionTitle', () => {
  it('renders a title that defaults to h2', () => {
    const { view } = renderView();

    expect(view.getByRole('heading', { level: 2 })).toHaveTextContent('Updog');
  });

  it('renders a title that can be set to other header tags', () => {
    const { view } = renderView({ as: 'h3' });

    expect(view.getByRole('heading', { level: 3 })).toHaveTextContent('Updog');
  });

  it('renders a title that can be styled with Text props', () => {
    const { view } = renderView({ as: 'h3', variant: 'title-xxl' });
    const titleNode = view.getByRole('heading', { level: 3 });

    expect(titleNode).toHaveStyle({ fontSize: '4rem' });
  });

  it('renders the proper Column size when layout is set to center', () => {
    const { view } = renderView({ 'data-testid': 'columnId' });
    const column = view.getByTestId('columnId');

    expect(column).toHaveStyle({ gridColumnEnd: 'span 12' });
    expect(column).toHaveStyle({ gridRowEnd: 'span 1' });
  });

  it('renders the proper Column size according to number of fields when layout is set to left', () => {
    const { view } = renderView({ layout: 'left', 'data-testid': 'columnId' });
    const column = view.getByTestId('columnId');

    expect(column).toHaveStyle({ gridRowEnd: 'span 1' });
    expect(column).toHaveStyleRule('grid-row-end', 'span 3', {
      media: theme.breakpoints.md,
    });
    expect(column).toHaveStyle({ gridRowEnd: 'span 1' });
    expect(column).toHaveStyleRule('grid-row-end', 'span 3', {
      media: theme.breakpoints.md,
    });
    expect(column).toHaveStyle({ gridColumnEnd: 'span 12' });
    expect(column).toHaveStyleRule('grid-column-end', 'span 3', {
      media: theme.breakpoints.md,
    });
  });
});
