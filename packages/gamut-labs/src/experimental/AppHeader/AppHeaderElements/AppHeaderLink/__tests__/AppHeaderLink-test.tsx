import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { AppHeaderLink, AppHeaderLinkProps } from '..';

const testText = 'Test Link';
const onClick = jest.fn();

const props: AppHeaderLinkProps = {
  item: {
    dataTestId: '',
    id: 'test-link',
    href: 'test-url',
    text: testText,
    trackingTarget: '',
    type: 'link',
  },
  onClick: onClick,
};

const renderAppHeaderLink = () => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeaderLink {...props} />
    </ThemeProvider>
  );
};

describe('AppHeaderLink', () => {
  it('calls onClick() when clicked', () => {
    renderAppHeaderLink();
    screen.getByText(testText).click();
    expect(onClick).toHaveBeenCalled();
  });
});
