import { Text } from '@codecademy/gamut';
import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/react';

import { PageSection } from '..';

const renderView = setupRtl(PageSection, { title: 'Default Section Title' });

describe('PageSection', () => {
  it('renders the title in a heading role', () => {
    const title = 'Page Section Title';
    const { view } = renderView({ title });
    expect(view.getByRole('heading').textContent).toBe(title);
  });

  it('renders the body of the section.', () => {
    const bodyText = 'This is the body of the section.';

    const { view } = renderView({
      children: <Text>{bodyText}</Text>,
    });

    expect(view.queryByText(bodyText)).toBeTruthy();
  });

  it('does not render any optional link buttons if they are not specified', () => {
    const { view } = renderView();
    expect(view.queryByRole('link')).toBeFalsy();
  });

  it.each([['headerButton'], ['headerSecondaryButton'], ['footerButton']])(
    'renders the optional %s button as a link',
    (buttonName) => {
      const buttonText = 'Button text';
      const buttonOnClick = jest.fn();
      const buttonHref = 'codecademy.com';

      const { view } = renderView({
        [buttonName]: {
          text: buttonText,
          onClick: buttonOnClick,
          href: buttonHref,
        },
      });

      const button = view.getByText(buttonText);
      fireEvent.click(button);

      expect(button.closest('a')).toHaveAttribute('href', buttonHref);
      expect(buttonOnClick).toHaveBeenCalled();
    }
  );

  it.each([['headerButton'], ['headerSecondaryButton'], ['footerButton']])(
    'renders the optional %s button as a custom ReactNode',
    (buttonName) => {
      const buttonText = 'Button text';
      const buttonNode = <Text>{buttonText}</Text>;

      const { view } = renderView({
        [buttonName]: buttonNode,
      });

      expect(view.queryByText(buttonText)).toBeTruthy();
    }
  );
});
