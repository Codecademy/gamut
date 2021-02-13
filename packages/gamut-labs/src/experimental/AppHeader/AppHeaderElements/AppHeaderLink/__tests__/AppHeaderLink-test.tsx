import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { createMockAppHeaderLinkItem } from '../../../mockAppHeaderItems';
import { AppHeaderLink, AppHeaderLinkProps } from '..';

const testText = 'Test Link';
const action = jest.fn();

const props: AppHeaderLinkProps = {
  action,
  item: createMockAppHeaderLinkItem('test-link', 'test-url', testText),
};

const renderAppHeaderLink = () => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeaderLink {...props} />
    </ThemeProvider>
  );
};

describe('AppHeaderLink', () => {
  it('calls action() when clicked', () => {
    renderAppHeaderLink();
    screen.getByRole('link').click();
    expect(action).toHaveBeenCalled();
  });
});
