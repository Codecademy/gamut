import { Badge } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { AppHeaderLinkMobile, AppHeaderLinkMobileProps } from '..';

const testText = 'Test Link';
const action = jest.fn();

const defaultProps: AppHeaderLinkMobileProps = {
  action,
  item: {
    dataTestId: '',
    id: 'test-link',
    href: 'test-url',
    text: testText,
    trackingTarget: '',
    type: 'link',
    icon: () => <svg />,
  },
};

const renderAppHeaderLinkMobile = (props: AppHeaderLinkMobileProps) => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeaderLinkMobile {...props} />
    </ThemeProvider>
  );
};

describe('AppHeaderLinkMobile', () => {
  it('calls action() when clicked', () => {
    renderAppHeaderLinkMobile(defaultProps);
    screen.getByRole('link').click();
    expect(action).toHaveBeenCalled();
  });

  it('renders new badge when newBadge prop true', () => {
    const { getByText } = renderAppHeaderLinkMobile({
      ...defaultProps,
      badge: <Badge>new</Badge>,
    });
    getByText('new');
  });

  it('does not render new badge when newBadge prop false', () => {
    const { queryByText } = renderAppHeaderLinkMobile(defaultProps);

    expect(queryByText('New')).toBeFalsy();
  });
});
