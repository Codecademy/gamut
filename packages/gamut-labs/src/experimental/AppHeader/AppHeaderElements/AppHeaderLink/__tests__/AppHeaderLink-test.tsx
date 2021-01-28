import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { createMockAppHeaderLinkItem } from '../../../mockAppHeaderItems';
import { AppHeaderLink, AppHeaderLinkProps } from '..';

const testText = 'Test Link';
const onClick = jest.fn();

const props: AppHeaderLinkProps = {
  item: createMockAppHeaderLinkItem('test-link', 'test-url', testText),
  onClick,
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
    screen.getByRole('link').click();
    expect(onClick).toHaveBeenCalled();
  });
});
