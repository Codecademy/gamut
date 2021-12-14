import { TrackingWindow } from './types';
export declare type OneTrustSettings = {
    production: boolean;
    scope: TrackingWindow;
};
export declare const initializeOneTrust: ({ production, scope, }: OneTrustSettings) => Promise<void>;
