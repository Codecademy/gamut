import { setupRtl } from '@codecademy/gamut-tests';

import { CompanyLinks } from '../CompanyLinks';

const renderView = setupRtl(CompanyLinks);

describe('CompanyLinks', () => {
  it('does not include a shop link when the user geo is IN', () => {
    const { view } = renderView({
      userGeo: 'IN',
    });

    expect(view.getAllByText('Shop')).toHaveLength(0);
  });

  it('includes a shop link when the user geo is not IN', () => {
    const { view } = renderView({
      userGeo: 'US',
    });

    view.getByText('Shop');
  });
});
