import { Consent } from './consent';
import { SegmentDestination } from './types';
export declare type DestinationMapOptions = {
    consentDecision?: Consent[];
    destinations: SegmentDestination[];
};
/**
 * @see https://www.notion.so/codecademy/GDPR-Compliance-141ebcc7ffa542daa0da56e35f482b41
 */
export declare const mapDestinations: ({ consentDecision, destinations, }: DestinationMapOptions) => {
    destinationPreferences: Record<string, boolean>;
    identifyPreferences: Record<string, boolean>;
};
