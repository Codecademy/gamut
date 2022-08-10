import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { MadeIn } from '../MadeIn';

const renderView = setupRtl(MadeIn, {
  onClick: jest.fn(),
});

describe('MadeIn', () => {
  it('calls onClick when a link is clicked', () => {
    const { props, view } = renderView();

    fireEvent.click(view.getAllByRole('button')[0]);

    expect(props.onClick).toHaveBeenCalled();
  });
});
