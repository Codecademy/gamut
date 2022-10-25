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
    const { view } = renderView();

    console.log(view.debug());
    // const column = view.find('Column') as any;
    // const { size, gridRowEnd } = column.props();

    // expect(size).toEqual({ _: 12, md: 12 });
    // expect(gridRowEnd).toEqual({ _: 'span 1', md: 'span 1' });
  });

  it('renders the proper Column size according to number of fields when layout is set to left', () => {
    const { view } = renderView({ layout: 'left' });
    const column = view.find('Column') as any;
    const { size, gridRowEnd } = column.props();

    expect({ gridRowEnd, size }).toEqual({
      gridRowEnd: { _: 'span 1', md: 'span 3' },
      size: { _: 12, md: 3 },
    });
  });
});
