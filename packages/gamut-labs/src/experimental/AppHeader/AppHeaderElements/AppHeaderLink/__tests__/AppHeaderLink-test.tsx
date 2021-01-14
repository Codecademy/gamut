import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { AppHeaderLink, AppHeaderLinkProps } from '..';

const testText = 'Test Link';
const testUrl = 'test-url';

const props: AppHeaderLinkProps = {
  item: {
    dataTestId: '',
    id: 'test-url',
    href: testUrl,
    text: testText,
    trackingTarget: '',
    type: 'link',
  },
  onClick: jest.fn(),
};

const renderAppHeaderLink = () => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeaderLink {...props} />
    </ThemeProvider>
  );
};

describe('AppHeaderLink', () => {
  it('displays link text', () => {
    renderAppHeaderLink();
    expect(screen.getByText(testText));
  });

  it('links to the provided href', () => {
    renderAppHeaderLink();
    expect(screen.getByRole('link').getAttribute('href')).toEqual(testUrl);
  });
});
