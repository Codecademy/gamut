import { Badge } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { createMockAppHeaderLinkItem } from '../../../mockAppHeaderItems';
import { AppHeaderLink, AppHeaderLinkProps } from '..';

const testText = 'Test Link';
const action = jest.fn();

const defaultProps: AppHeaderLinkProps = {
  action,
  item: createMockAppHeaderLinkItem('test-link', 'test-url', testText),
};

const renderAppHeaderLink = (props: AppHeaderLinkProps) => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeaderLink {...props} />
    </ThemeProvider>
  );
};

describe('AppHeaderLink', () => {
  it('calls action() when clicked', () => {
    renderAppHeaderLink(defaultProps);
    screen.getByRole('menuitem').click();
    expect(action).toHaveBeenCalled();
  });

  it('renders badge when badge prop is included', () => {
    const props = {
      ...defaultProps,
      ...{
        item: {
          ...defaultProps.item,
          badge: <Badge>New</Badge>,
        },
      },
    };
    const { getByText } = renderAppHeaderLink(props);
    getByText('New');
  });

  it('does not render badge when badge prop is not included', () => {
    const { queryByText } = renderAppHeaderLink(defaultProps);

    expect(queryByText('New')).toBeFalsy();
  });
});
