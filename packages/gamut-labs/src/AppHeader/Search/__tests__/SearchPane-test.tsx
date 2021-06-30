import { setupRtl } from '@codecademy/gamut-tests';

import { SearchPane } from '../SearchPane';

const renderView = setupRtl(SearchPane, {
  onSearch: jest.fn(),
  onTrackingClick: jest.fn(),
  toggleSearch: jest.fn(),
});

describe('SearchPane', () => {
  it('renders contents when isSearchVisible is true', () => {
    const { view } = renderView({ isSearchVisible: true });

    expect(view.container).not.toBeEmptyDOMElement();
  });

  it('renders nothing when isSearchVisible is false', () => {
    const { view } = renderView({ isSearchVisible: false });

    expect(view.container).toBeEmptyDOMElement();
  });
});
