import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { AppHeaderLinkMobile, AppHeaderLinkMobileProps } from '..';

const testText = 'Test Link';
const onClick = jest.fn();

const props: AppHeaderLinkMobileProps = {
  item: {
    dataTestId: '',
    id: 'test-link',
    href: 'test-url',
    text: testText,
    trackingTarget: '',
    type: 'link',
    icon: () => <svg />,
  },
  onClick,
};

const renderAppHeaderLinkMobile = () => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeaderLinkMobile {...props} />
    </ThemeProvider>
  );
};

describe('AppHeaderLinkMobile', () => {
  it('calls onClick() when clicked', () => {
    renderAppHeaderLinkMobile();
    screen.getByRole('link').click();
    expect(onClick).toHaveBeenCalled();
  });
});
