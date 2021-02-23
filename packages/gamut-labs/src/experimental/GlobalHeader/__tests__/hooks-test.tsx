import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render } from '@testing-library/react';
import React from 'react';

import { GlobalHeader } from '..';
import { getGlobalHeaderHeight } from '../hooks';

function TestComponent() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalHeader action={jest.fn()} type="anon" />
    </ThemeProvider>
  );
}

describe('getGlobalHeaderHeight', () => {
  it('should return the mobile header height below the breakpoint', () => {
    (window as any).innerWidth = 500;
    render(<TestComponent />);
    expect(getGlobalHeaderHeight()).toEqual(64);
  });

  it('should return the desktop header height above the breakpoint', () => {
    (window as any).innerWidth = 2000;
    render(<TestComponent />);
    expect(getGlobalHeaderHeight()).toEqual(80);
  });
});
