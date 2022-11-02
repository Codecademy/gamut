import 'jest-styled-components';

import { setupRtl } from '@codecademy/gamut-tests';

import { GridFormSectionTitle } from '../GridFormSectionTitle';

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

    expect(view.getByRole('header', { level: 3 })).toHaveTextContent('Updog');
  });

  it('renders a title that can be styled with Text props', () => {
    const { view } = renderView({ as: 'h3', variant: 'title-xxl' });
    const titleNode = view.getByRole('header', { level: 3 });
    const titleNodeStyle = getComputedStyle(titleNode);

    expect(titleNodeStyle.fontSize).toHaveStyle('4rem');
  });

  it('renders the proper Column size when layout is set to center', () => {
    const { view } = renderView({ 'data-testid': 'columnId' });

    const column = view.getByTestId('columnId');

    expect(column).toHaveStyle({ gridColumnEnd: 'span 12' });
    expect(column).toHaveStyle({ gridRowEnd: 'span 1' });
  });

  it('renders the proper Column size according to number of fields when layout is set to left', () => {
    // initTest(theme.breakpoints.sm - 1);

    const { view } = renderView({ layout: 'left', 'data-testid': 'columnId' });
    console.log(view.debug());

    const column = view.getByTestId('columnId');

    expect(column).toHaveStyle({ gridRowEnxd: 'span 3' });

    expect(column).toHaveStyleRule('gridRowEnd', 'span 1', {
      media: '(max-width:640px)',
    });
    // const { size, gridRowEnd } = column.props();

    // expect({ gridRowEnd, size }).toEqual({
    //   gridRowEnd: { _: 'span 1', md: 'span 3' },
    //   size: { _: 12, md: 3 },
    // });
  });
});
