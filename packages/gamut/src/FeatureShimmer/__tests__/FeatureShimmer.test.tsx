import { setupRtl } from '@codecademy/gamut-tests';

import { FeatureShimmer } from '..';

const mockIntersectionObserver = jest.fn();
const mockUseReducedMotion = jest.fn();
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  get useReducedMotion() {
    return mockUseReducedMotion;
  },
}));

const renderView = setupRtl(FeatureShimmer, { children: 'Testing' });

describe('FeatureShimmer', () => {
  beforeEach(() => {
    mockIntersectionObserver.mockReturnValue({
      observe: jest.fn(),
      disconnect: jest.fn(),
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });
  it('renders shimmer when reduced motion is false', () => {
    mockUseReducedMotion.mockReturnValue(false);

    const { view } = renderView();

    view.getByText('Testing');
    view.getByTestId('feature-shimmer');
  });

  it('does not render shimmer when reduced motion is true', () => {
    mockUseReducedMotion.mockReturnValue(true);

    const { view } = renderView();

    view.getByText('Testing');
    expect(view.queryByTestId('feature-shimmer')).toBeNull();
  });

  it('renders shimmer', () => {
    mockUseReducedMotion.mockReturnValue(false);

    const { view } = renderView();

    view.getByText('Testing');
    view.getByTestId('feature-shimmer');
  });
});
