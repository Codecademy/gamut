import { SegmentAnalytics, UserIntegrationSummary } from './types';
export declare type AnalyticsLoadOptions = {
    analytics: SegmentAnalytics;
    destinationPreferences: Record<string, boolean>;
    identifyPreferences: Record<string, boolean>;
    user?: UserIntegrationSummary;
    writeKey: string;
};
export declare const conditionallyLoadAnalytics: ({ analytics, destinationPreferences, identifyPreferences, user, writeKey, }: AnalyticsLoadOptions) => void;
