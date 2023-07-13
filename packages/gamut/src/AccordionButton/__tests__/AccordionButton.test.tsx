import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
import { cleanup } from '@testing-library/react';

import { AccordionButton, AccordionButtonTheme } from '..';

const onClick = jest.fn();

const renderView = setupRtl(AccordionButton, {
  onClick,
  children: 'Hi there!',
  size: 'normal',
  theme: 'yellow',
});

describe('AccordionButton', () => {
  afterEach(() => {
    cleanup();
  });
  it('fires onClick when clicked', () => {
    const { view } = renderView();

    fireEvent.click(view.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each(['plain', 'blue', 'yellow'])(
    'renders a $theme button when the theme is $theme',
    (theme: AccordionButtonTheme) => {
      const { view } = renderView({ theme });

      const button = view.getByRole('button');

      expect(button).toHaveAttribute('class', expect.stringContaining(theme));
    }
  );
});
