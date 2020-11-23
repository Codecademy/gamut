import React from 'react';
import { render } from '@testing-library/react';

import { ButtonOutline } from '../ButtonOutline';

describe('ButtonOutline', () => {
  it('renders itself and children', () => {
    const buttonText = 'Submit';
    const view = render(<ButtonOutline>{buttonText}</ButtonOutline>);

    const el = view.getByText(buttonText);
    expect(el.tagName).toEqual('BUTTON');
  });

  it('renders an anchor tag if the href prop is used', () => {
    const buttonText = 'Submit';
    const view = render(
      <ButtonOutline href="https://www.codecademy.com">
        {buttonText}
      </ButtonOutline>
    );

    const el = view.getByText(buttonText);
    expect(el.tagName).toEqual('A');
  });

  it('assigns a role of button when a non-button tag is used and it is not a link', () => {
    const buttonText = 'Submit';
    const view = render(<ButtonOutline as="span">{buttonText}</ButtonOutline>);

    const el = view.getByText(buttonText);
    expect(el.tagName).toEqual('SPAN');
    expect(el.getAttribute('role')).toEqual('button');
  });

  describe('when the button is disabled', () => {
    it('renders the aria-disabled attribute on anchor tags', () => {
      const buttonText = 'Submit';
      const view = render(
        <ButtonOutline disabled href="https://www.codecademy.com">
          {buttonText}
        </ButtonOutline>
      );

      const el = view.getByText(buttonText);
      expect(el.tagName).toEqual('A');
      expect(el.getAttribute('aria-disabled')).toEqual('true');
      expect(el.getAttribute('disabled')).toBeNull();
    });

    it('renders the disabled attribute on button tags', () => {
      const buttonText = 'Submit';
      const view = render(<ButtonOutline disabled>{buttonText}</ButtonOutline>);

      const el = view.getByText(buttonText);
      expect(el.getAttribute('aria-disabled')).toBeNull();
      expect(el.getAttribute('disabled')).toEqual('');
    });

    it('renders the aria-disabled attribute on non-button tags', () => {
      const buttonText = 'Submit';
      const view = render(
        <ButtonOutline as="span" disabled>
          {buttonText}
        </ButtonOutline>
      );

      const el = view.getByText(buttonText);
      expect(el.tagName).toEqual('SPAN');
      expect(el.getAttribute('aria-disabled')).toEqual('true');
      expect(el.getAttribute('disabled')).toBeNull();
    });
  });
});
