import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { SearchPane } from '../SearchPane';

const renderView = setupRtl(SearchPane, {
  onSearch: jest.fn(),
  onTrackingClick: jest.fn(),
  toggleSearch: jest.fn(),
});

describe('SearchPane', () => {
  it('calls toggleClose when the hidden background is clicked', async () => {
    const { props, view } = renderView();

    await userEvent.click(view.container.firstElementChild!);

    expect(props.toggleSearch).toHaveBeenCalled();
  });

  it('triggers a search when the form is submitted', async () => {
    const { props, view } = renderView();
    const value = 'abc';

    await userEvent.type(view.getByRole('searchbox'), `${value}{enter}`);

    expect(props.onSearch).toHaveBeenCalledWith(value);
    expect(props.toggleSearch).toHaveBeenCalled();
  });

  it('fires a tracking event when a term button is clicked', async () => {
    const { props, view } = renderView();

    await userEvent.click(view.getByText('Web Development'));

    expect(props.onTrackingClick).toHaveBeenCalledWith(
      'popular_search_term_webDevelopment'
    );
  });

  it('fires a tracking event when the help button is clicked', async () => {
    const { props, view } = renderView();

    await userEvent.click(view.getByText(/Help Center$/));

    expect(props.onTrackingClick).toHaveBeenCalledWith('help_center');
  });
});
