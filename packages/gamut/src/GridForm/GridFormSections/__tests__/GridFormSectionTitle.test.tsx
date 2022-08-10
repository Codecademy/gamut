import { setupEnzyme } from '@codecademy/gamut-tests';

import { GridFormSectionTitle } from '../GridFormSectionTitle';

const renderWrapper = setupEnzyme(GridFormSectionTitle, {
  title: 'Updog',
  numberOfFields: 3,
});

describe('GridFormSectionTitle', () => {
  it('renders a title that defaults to h2', () => {
    const { wrapper } = renderWrapper();
    const title = wrapper.find('h2');

    expect(title.text()).toEqual('Updog');
  });

  it('renders a title that can be set to other header tags', () => {
    const { wrapper } = renderWrapper({ as: 'h3' });
    const title = wrapper.find('h3');

    expect(title.text()).toEqual('Updog');
  });

  it('renders a title that can be styled with Text props', () => {
    const { wrapper } = renderWrapper({ as: 'h3', variant: 'title-xxl' });
    const titleNode = wrapper.find('h3').getDOMNode();

    expect(titleNode).toHaveStyle('font-size: 4rem');
  });

  it('renders the proper Column size when layout is set to center', () => {
    const { wrapper } = renderWrapper();
    const column = wrapper.find('Column') as any;
    const { size, gridRowEnd } = column.props();

    expect(size).toEqual({ _: 12, md: 12 });
    expect(gridRowEnd).toEqual({ _: 'span 1', md: 'span 1' });
  });

  it('renders the proper Column size according to number of fields when layout is set to left', () => {
    const { wrapper } = renderWrapper({ layout: 'left' });
    const column = wrapper.find('Column') as any;
    const { size, gridRowEnd } = column.props();

    expect({ gridRowEnd, size }).toEqual({
      gridRowEnd: { _: 'span 1', md: 'span 3' },
      size: { _: 12, md: 3 },
    });
  });
});
