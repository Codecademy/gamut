import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { LegalLinks } from '../LegalLinks';

const renderView = setupRtl(LegalLinks, {
  onClick: jest.fn(),
});

describe('LegalLinks', () => {
  it('calls onClick when a link is clicked', () => {
    const { props, view } = renderView();

    fireEvent.click(view.getAllByRole('link')[0]);

    expect(props.onClick).toHaveBeenCalled();
  });
});
