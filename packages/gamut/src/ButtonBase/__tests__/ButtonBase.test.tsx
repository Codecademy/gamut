import { setupRtl } from '@codecademy/gamut-tests';
import { render } from '@testing-library/react';
import React from 'react';

import { ButtonBase } from '../ButtonBase';

const buttonText = 'Submit';

const renderView = setupRtl(ButtonBase, {
  children: buttonText,
});

describe('ButtonBase', () => {
  it('renders itself and children', () => {
    const { view } = renderView();

    view.getByText(buttonText);
    view.getByRole('button');
  });

  it('renders an anchor tag if the href prop is used', () => {
    const { view } = renderView({ href: 'https://www.codecademy.com' });

    view.getByText(buttonText);
    view.getByRole('link');
  });

  it('renders an anchor tag if a blank href prop is used', () => {
    const { view } = renderView({ href: '' });

    view.getByText(buttonText);
    expect(view.container.querySelector('a')?.getAttribute('href')).toBe('');
  });

  it('renders a button with the correct role', () => {
    const { view } = renderView({ role: 'menuitem' });

    view.getByText(buttonText);
    view.getByRole('menuitem');
  });

  describe('when the button is disabled', () => {
    it('does not render the href attribute and renders a button', () => {
      const { view } = renderView({ disabled: true });

      const el = view.getByText(buttonText);
      view.getByRole('button');
      expect(el.getAttribute('href')).toBeNull();
    });

    it('renders the disabled attribute on button tags', () => {
      const { view } = renderView({ disabled: true });

      const el = view.getByText(buttonText);
      expect(el.getAttribute('disabled')).toBe('');
    });
  });

  it('forwards ref to the button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ButtonBase ref={ref}>{buttonText}</ButtonBase>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('forwards ref to the anchor when href is provided', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <ButtonBase href="https://www.codecademy.com" ref={ref}>
        {buttonText}
      </ButtonBase>
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });
});
