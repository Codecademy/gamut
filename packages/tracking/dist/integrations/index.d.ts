import { TrackingWindow, UserIntegrationSummary } from './types';
export declare type TrackingIntegrationsSettings = {
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
export declare const initializeTrackingIntegrations: ({ onError, production, scope, user, writeKey, }: TrackingIntegrationsSettings) => Promise<void>;
