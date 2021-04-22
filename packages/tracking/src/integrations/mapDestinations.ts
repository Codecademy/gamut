import { SegmentDestination, UserIntegrationSummary } from './types';

export type DestinationMapOptions = {
  consentDecision?: string[];
  destinations: SegmentDestination[];
  user?: UserIntegrationSummary;
};

// The Functional category may need to be added here in the future.
const targetingCategories = ['Advertising', 'Attribution', 'Email Marketing'];
const performanceCategories = ['Analytics', 'Customer Success'];

export const mapDestinations = ({
  consentDecision = ['C0001'],
  destinations,
  user,
}: DestinationMapOptions) => {
  // See GROW-1111, GROW-1137 for FullStory context
  // The intention is to enable fullstory for half of users. See GROW-1501
  const enableFullStory = !!user && parseInt(user.id.slice(-1), 16) % 2 === 0;

  const destinationPreferences: Record<string, boolean> = Object.assign(
    {
      'Segment.io': consentDecision.includes('C0003'),
      FullStory: enableFullStory,
    },
    ...destinations.map((dest) => {
      if (targetingCategories.includes(dest.category)) {
        return {
          [dest.id]: consentDecision.includes('C0004'),
        };
      }
      if (performanceCategories.includes(dest.category)) {
        return {
          [dest.id]: consentDecision.includes('C0002'),
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
    Hindsight: consentDecision.includes('C0004'),
    UserLeap: consentDecision.includes('C0002'),
  };

  return { destinationPreferences, identifyPreferences };
};
