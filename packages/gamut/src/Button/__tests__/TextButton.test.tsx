import { StarIcon } from '@codecademy/gamut-icons';
import { fireEvent } from '@testing-library/react';
import { setupRtl } from 'component-test-setup';

import { TextButton } from '../TextButton';

const onClick = jest.fn();

const renderView = setupRtl(TextButton, {
  children: 'Click me!',
  onClick,
});

describe('TextButton', () => {
  it('renders a clickable button', () => {
    const { view } = renderView();

    const cta = view.getByRole('button', { name: 'Click me!' });

    fireEvent.click(cta);

    expect(onClick).toHaveBeenCalled();
  });
  it('renders an leading icon when an icon is provided', () => {
    const { view } = renderView({ icon: StarIcon });

    view.getByTitle('Star Icon');
  });
  it('renders an icon when an icon is provided', () => {
    const { view } = renderView({ icon: StarIcon });

    view.getByTitle('Star Icon');
  });
});
