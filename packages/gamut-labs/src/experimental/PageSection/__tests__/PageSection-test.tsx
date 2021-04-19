import { Text } from '@codecademy/gamut';
import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { PageSection, PageSectionProps } from '..';

const renderPageSection = (props: Partial<PageSectionProps>) =>
  setupRtl(PageSection, { title: 'Default Section Title', ...props })();

describe('PageSection', () => {
  it('renders the title in a heading role', () => {
    const title = 'Page Section Title';
    render(<PageSection title={title} />);
    expect(screen.getByRole('heading').textContent).toBe(title);
  });

  it('renders the body of the section.', () => {
    const bodyText = 'This is the body of the section.';

    render(
      <PageSection title="Section title">
        <Text>{bodyText}</Text>
      </PageSection>
    );

    expect(screen.queryByText(bodyText)).toBeTruthy();
  });

  it('does not render any optional link buttons if they are not specified', () => {
    render(<PageSection title="Section title" />);
    expect(screen.queryByRole('link')).toBeFalsy();
  });

  it.each([['headerButton'], ['headerSecondaryButton'], ['footerButton']])(
    'renders the optional %s button as a link',
    (buttonName) => {
      const buttonText = 'Button text';
      const buttonOnClick = jest.fn();
      const buttonHref = 'codecademy.com';

      renderPageSection({
        [buttonName]: {
          text: buttonText,
          onClick: buttonOnClick,
          href: buttonHref,
        },
      });

      const button = screen.getByText(buttonText);
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

      renderPageSection({
        [buttonName]: buttonNode,
      });

      expect(screen.queryByText(buttonText)).toBeTruthy();
    }
  );
});
