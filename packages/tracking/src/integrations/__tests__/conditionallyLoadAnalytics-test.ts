import {
  AnalyticsLoadOptions,
  conditionallyLoadAnalytics,
} from '../conditionallyLoadAnalytics';
import { SegmentAnalytics } from '../types';

const createMockSegmentAnalytics = (overrides?: Partial<SegmentAnalytics>) => ({
  identify: jest.fn(),
  load: jest.fn(),
  page: jest.fn(),
  ...overrides,
});

const createMockOptions = (overrides?: Partial<AnalyticsLoadOptions>) => ({
  analytics: createMockSegmentAnalytics(),
  destinationPreferences: {
    destination: true,
  },
  identifyPreferences: {
    destination: true,
  },
  writeKey: 'abc123',
  ...overrides,
});

describe('conditionallyLoadAnalytics', () => {
  it('does not call analytics.load or analytics.page when analytics.initialize is true', () => {
    const options = createMockOptions({
      analytics: createMockSegmentAnalytics({
        initialize: true,
      }),
    });

    conditionallyLoadAnalytics(options);

    expect(options.analytics.load).not.toHaveBeenCalled();
  });

  it('calls analytics.load and analytics.page when analytics.initialize is false', () => {
    const options = createMockOptions({
      analytics: createMockSegmentAnalytics({
        initialize: false,
      }),
    });

    conditionallyLoadAnalytics(options);

    expect(options.analytics.load).toHaveBeenCalledWith(options.writeKey, {
      integrations: options.destinationPreferences,
    });
    expect(options.analytics.page).toHaveBeenCalled();
  });

  it('does not call analytics.identify when there is no user', () => {
    const options = createMockOptions({
      user: undefined,
    });

    conditionallyLoadAnalytics(options);

    expect(options.analytics.identify).not.toHaveBeenCalled();
  });

  it('calls analytics.identify when there is a user', () => {
    const user = {
      email: 'test@test.com',
      id: 'abc123',
    };
    const options = createMockOptions({ user });

    conditionallyLoadAnalytics(options);

    expect(options.analytics.identify).toHaveBeenCalledWith(
      user.id,
      { email: user.email },
      {
        integrations: options.identifyPreferences,
      }
    );
  });
});
