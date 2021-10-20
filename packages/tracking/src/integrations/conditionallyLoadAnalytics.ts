import { getClientType } from './device';
import { SegmentAnalytics, UserIntegrationSummary } from './types';

export type AnalyticsLoadOptions = {
  analytics: SegmentAnalytics;
  destinationPreferences: Record<string, boolean>;
  identifyPreferences: Record<string, boolean>;
  user?: UserIntegrationSummary;
  writeKey: string;
};

export const conditionallyLoadAnalytics = ({
  analytics,
  destinationPreferences,
  identifyPreferences,
  user,
  writeKey,
}: AnalyticsLoadOptions) => {
  if (analytics.initialize) {
    return;
  }

  analytics.load(writeKey, { integrations: destinationPreferences });
  analytics.page();

  if (user) {
    const identifyParams = {
      email: user.email,
      client: getClientType(),
    };

    analytics.identify(user.id, identifyParams, {
      integrations: identifyPreferences,
    });
  }
};
