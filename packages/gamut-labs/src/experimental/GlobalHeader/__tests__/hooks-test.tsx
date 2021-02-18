import { render, screen } from '@testing-library/react';
import React from 'react';

import { useBreakpointAtOrAbove } from '../../../lib/breakpointHooks';
import { desktopHeight, mobileHeight } from '../consts';
import { useGlobalHeaderHeight } from '../hooks';

jest.mock('../../../lib/breakpointHooks', () => ({
  ...jest.requireActual<object>('../../../lib/breakpointHooks'),
  useBreakpointAtOrAbove: jest.fn(),
}));

function TestComponent() {
  const height = useGlobalHeaderHeight();
  return <div>{height}</div>;
}

describe('useGlobalHeaderHeight', () => {
  it('should return the mobile header height below the breakpoint', () => {
    (useBreakpointAtOrAbove as any).mockReturnValueOnce(false);
    render(<TestComponent />);
    screen.getByText(mobileHeight);
  });

  it('should return the desktop header height above the breakpoint', () => {
    (useBreakpointAtOrAbove as any).mockReturnValueOnce(true);
    render(<TestComponent />);
    screen.getByText(desktopHeight);
  });
});
