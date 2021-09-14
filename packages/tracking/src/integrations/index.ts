import { conditionallyLoadAnalytics } from './conditionallyLoadAnalytics';
import { fetchDestinationsForWriteKey } from './fetchDestinationsForWriteKey';
import { mapDestinations } from './mapDestinations';
import { initializeOneTrust } from './onetrust';
import { runSegmentSnippet } from './runSegmentSnippet';
import { TrackingWindow, UserIntegrationSummary } from './types';

export type TrackingIntegrationsSettings = {
  /**
   * Called whenever a network request fails.
   */
  onError: (message: string) => void;

  /**
   * Whether this is running in a production environment.
   */
  production: boolean;

  /**
   * Global scope (often the window) where globals such as analytics are stored.
   */
  scope: TrackingWindow;

  /**
   * User details to identify in Segment.
   */
  user?: UserIntegrationSummary;

  /**
   * Segment write key.
   */
  writeKey: string;
};

/**
 * @see README.md for details and usage.
 */
export const initializeTrackingIntegrations = async ({
  onError,
  production,
  scope,
  user,
  writeKey,
}: TrackingIntegrationsSettings) => {
  // 1. Wait 1000ms to allow any other post-hydration logic to run first
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 2. Load in OneTrust's banner and wait for its `OptanonWrapper` callback
  await initializeOneTrust({ scope, production });

  // 3. Segment's copy-and-paste snippet is run to load the Segment global library
  runSegmentSnippet();

  // 4. Destination integrations for Segment are fetched
  const destinations = await fetchDestinationsForWriteKey({
    onError,
    writeKey,
  });
  if (!destinations) {
    return;
  }

  // 5. Those integrations are compared against the user's consent decisions into a list of allowed destinations
  const { destinationPreferences, identifyPreferences } = mapDestinations({
    consentDecision: scope.OnetrustActiveGroups,
    destinations,
  });

  // 6. We load only those allowed destinations using Segment's `analytics.load`
  conditionallyLoadAnalytics({
    analytics: scope.analytics!,
    destinationPreferences,
    identifyPreferences,
    user,
    writeKey,
  });
};
