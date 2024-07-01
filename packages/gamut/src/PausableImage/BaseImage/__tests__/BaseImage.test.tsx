import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { BaseImage } from '..';

jest.mock('react-freezeframe', () => ({ src }: { src: string }) => (
  <img alt="" src={`frozen-${src}`} />
));

const renderView = setupRtl(BaseImage, {
  alt: '',
  src: 'image.gif',
});

describe('BaseImage', () => {
  it('renders a playing image by default', () => {
    const { view } = renderView();
    expect(view.getAllByRole('img')[0]).toHaveAttribute('src', 'image.gif');
  });

  it('renders a paused image after clicking pause', () => {
    const { view } = renderView();

    userEvent.click(view.getByRole('button'));

    expect(view.getAllByRole('img')[0]).toHaveAttribute(
      'src',
      'frozen-image.gif'
    );
  });
});
