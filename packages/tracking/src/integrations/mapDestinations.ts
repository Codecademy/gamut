import { Consent } from './consent';
import { SegmentDestination, UserIntegrationSummary } from './types';

export type DestinationMapOptions = {
  consentDecision?: Consent[];
  destinations: SegmentDestination[];
  user?: UserIntegrationSummary;
};

// The Functional category may need to be added here in the future.
const targetingCategories = ['Advertising', 'Attribution', 'Email Marketing'];
const performanceCategories = ['Analytics', 'Customer Success'];

/**
 * @see https://www.notion.so/codecademy/GDPR-Compliance-141ebcc7ffa542daa0da56e35f482b41
 */
export const mapDestinations = ({
  consentDecision = [Consent.StrictlyNecessary],
  destinations,
  user,
}: DestinationMapOptions) => {
  // See GROW-1111, GROW-1137 for FullStory context
  // The intention is to enable fullstory for logged-in users. See GROW-2292
  const enableFullStory = !!user;

  const destinationPreferences: Record<string, boolean> = Object.assign(
    {
      'Segment.io': consentDecision.includes(Consent.Functional),
      FullStory: enableFullStory,
    },
    ...destinations.map((dest) => {
      if (targetingCategories.includes(dest.category)) {
        return {
          [dest.id]: consentDecision.includes(Consent.Targeting),
        };
      }
      if (performanceCategories.includes(dest.category)) {
        return {
          [dest.id]: consentDecision.includes(Consent.Performance),
        };
      }
      return {
        [dest.id]: true,
      };
    })
  );

  const identifyPreferences = {
    All: false,
    FullStory: enableFullStory,
    Hindsight: consentDecision.includes(Consent.Targeting),
    UserLeap: consentDecision.includes(Consent.Performance),
  };

  return { destinationPreferences, identifyPreferences };
};
