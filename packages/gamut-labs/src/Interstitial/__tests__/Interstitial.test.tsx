import { FillButton } from '@codecademy/gamut';
import { setupRtl } from '@codecademy/gamut-tests';

import { Interstitial } from '..';

const renderView = setupRtl(Interstitial, {
  title: 'Hello, World!',
  children: 'Hi!',
});

describe('Interstitial', () => {
  it('renders a decoration when a decoration is provided', () => {
    const { view } = renderView({
      decoration: (
        <span role="img" aria-label="Heart eyes">
          😍
        </span>
      ),
    });

    view.getByText('😍');
  });

  it('renders buttons when buttons are provided', () => {
    const buttonText = 'Click me';

    const { view } = renderView({
      buttons: [<FillButton key="1">{buttonText}</FillButton>],
    });

    view.getByRole('button', { name: `${buttonText}` });
  });
});
