import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { SearchButton } from '../SearchButton';

const renderView = setupRtl(SearchButton, {
  toggleSearch: jest.fn(),
});

describe('SearchButton', () => {
  it('calls toggleSearch when its button is clicked', () => {
    const { props, view } = renderView();

    userEvent.click(view.getByRole('button'));

    expect(props.toggleSearch).toHaveBeenCalled();
  });
});
