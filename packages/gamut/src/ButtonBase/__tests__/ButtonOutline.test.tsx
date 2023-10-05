import { render } from '@testing-library/react';

import { ButtonBase } from '../ButtonBase';

describe('ButtonBase', () => {
  it('renders itself and children', () => {
    const buttonText = 'Submit';
    const view = render(<ButtonBase>{buttonText}</ButtonBase>);

    const el = view.getByText(buttonText);
    expect(el.tagName).toEqual('BUTTON');
  });

  it('renders an anchor tag if the href prop is used', () => {
    const buttonText = 'Submit';
    const view = render(
      <ButtonBase href="https://www.codecademy.com">{buttonText}</ButtonBase>
    );

    const el = view.getByText(buttonText);
    expect(el.tagName).toEqual('A');
  });

  it('renders an anchor tag if a blank href prop is used', () => {
    const buttonText = 'Refresh this page';
    const view = render(<ButtonBase href="">{buttonText}</ButtonBase>);

    const el = view.getByText(buttonText);
    expect(el.tagName).toEqual('A');
  });

  describe('when the button is disabled', () => {
    it('does not render the href attribute and renders a button', () => {
      const buttonText = 'Submit';
      const view = render(
        <ButtonBase disabled href="https://www.codecademy.com">
          {buttonText}
        </ButtonBase>
      );

      const el = view.getByText(buttonText);
      expect(el.tagName).toEqual('BUTTON');
      expect(el.getAttribute('href')).toBeNull();
    });

    it('renders the disabled attribute on button tags', () => {
      const buttonText = 'Submit';
      const view = render(<ButtonBase disabled>{buttonText}</ButtonBase>);

      const el = view.getByText(buttonText);
      expect(el.getAttribute('disabled')).toBe('');
    });
  });
});
