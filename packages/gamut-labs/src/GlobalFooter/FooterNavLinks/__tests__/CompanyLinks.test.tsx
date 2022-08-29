import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { CompanyLinks } from '../CompanyLinks';

const renderView = setupRtl(CompanyLinks, {
  onClick: jest.fn(),
});

describe('CompanyLinks', () => {
  it('includes plans when hidePricing is false', () => {
    const { view } = renderView({
      hidePricing: false,
    });

    view.getByText('Individual Plans');
  });

  it('does not include plans when hidePricing is true', () => {
    const { view } = renderView({
      hidePricing: true,
    });

    expect(view.queryByText('Individual Plans')).toBeNull();
  });

  it('fires onClick when an item is clicked', () => {
    const { props, view } = renderView();

    fireEvent.click(view.getByText('About'));

    expect(props.onClick).toHaveBeenCalled();
  });
});
