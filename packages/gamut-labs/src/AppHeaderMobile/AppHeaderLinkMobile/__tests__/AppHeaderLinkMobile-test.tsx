import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { AppHeaderLinkMobile, AppHeaderLinkMobileProps } from '..';

const testText = 'Test Link';
const action = jest.fn();

const props: AppHeaderLinkMobileProps = {
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

const renderAppHeaderLinkMobile = () => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeaderLinkMobile {...props} />
    </ThemeProvider>
  );
};

describe('AppHeaderLinkMobile', () => {
  it('calls action() when clicked', () => {
    renderAppHeaderLinkMobile();
    screen.getByRole('link').click();
    expect(action).toHaveBeenCalled();
  });
});
