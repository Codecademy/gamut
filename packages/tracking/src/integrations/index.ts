import { useEffectOnce } from 'react-use';

import { conditionallyLoadAnalytics } from './conditionallyLoadAnalytics';
import { fetchDestinationsForWriteKey } from './fetchDestinationsForWriteKey';
import { mapDestinations } from './mapDestinations';
import { runSegmentSnippet } from './runSegmentSnippet';
import { SegmentWindow, UserIntegrationSummary } from './types';

export type TrackingIntegrationsSettings = {
  /**
   * Called whenever a network request fails.
   */
  onError: (message: string) => void;

  /**
   * Global scope (often the window) where globals such as analytics are stored.
   */
  scope: SegmentWindow;

  /**
   * User details to identify in Segment.
   */
  user?: UserIntegrationSummary;

  /**
   * Segment write key.
   */
  writeKey: string;
};

export const initializeTrackingIntegrations = async ({
  onError,
  scope,
  user,
  writeKey,
}: TrackingIntegrationsSettings) => {
  if (!writeKey) {
    return;
  }

  runSegmentSnippet();

  const destinations = await fetchDestinationsForWriteKey({
    onError,
    writeKey,
  });
  if (!destinations) {
    return;
  }

  const { destinationPreferences, identifyPreferences } = mapDestinations({
    consentDecision: scope.OnetrustActiveGroups,
    destinations,
    user,
  });

  conditionallyLoadAnalytics({
    analytics: scope.analytics!,
    destinationPreferences,
    identifyPreferences,
    user,
    writeKey,
  });
};

export const useTrackingIntegrations = (
  settings: TrackingIntegrationsSettings
) => {
  useEffectOnce(() => {
    setTimeout(() => {
      initializeTrackingIntegrations(settings).catch(settings.onError);
    }, 1000);
  });
};
