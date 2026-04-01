import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { coreTheme as theme } from '../../themes';
import { useLogicalProperties } from '../useLogicalProperties';

const HookProbe: React.FC = () => (
  <span data-testid="value">{String(useLogicalProperties())}</span>
);

describe('useLogicalProperties', () => {
  it('returns false when theme sets useLogicalProperties: false', () => {
    render(
      <ThemeProvider theme={{ ...theme, useLogicalProperties: false }}>
        <HookProbe />
      </ThemeProvider>
    );

    expect(screen.getByTestId('value')).toHaveTextContent('false');
  });

  it('returns true when theme sets useLogicalProperties: true', () => {
    render(
      <ThemeProvider theme={{ ...theme, useLogicalProperties: true }}>
        <HookProbe />
      </ThemeProvider>
    );

    expect(screen.getByTestId('value')).toHaveTextContent('true');
  });

  it('returns true when theme omits useLogicalProperties (variance parity)', () => {
    render(
      <ThemeProvider theme={theme}>
        <HookProbe />
      </ThemeProvider>
    );

    expect(screen.getByTestId('value')).toHaveTextContent('true');
  });
});
