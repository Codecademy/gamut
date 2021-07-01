import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { MobileSearchBar } from '../MobileSearchBar';

const renderView = setupRtl(MobileSearchBar);

describe('MobileSearchBar', () => {
  it('calls onSearch with the value when the form is submitted with a value', () => {
    const { props, view } = renderView({
      onSearch: jest.fn(),
    });
    const value = 'abc';

    userEvent.type(view.getByRole('searchbox'), value);
    userEvent.click(view.getByRole('button'));

    expect(props.onSearch).toHaveBeenCalledWith(value);
  });
});
