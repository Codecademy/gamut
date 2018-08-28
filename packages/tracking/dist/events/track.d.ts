import type { EventDataTypes, TrackingOptions, UserClickData, UserImpressionData, UserVisitData } from './types';
export declare type TrackerOptions = {
    apiBaseUrl: string;
    verbose?: boolean;
};
export declare const createTracker: ({ apiBaseUrl, verbose }: TrackerOptions) => {
    event: <Category extends keyof EventDataTypes, Event_1 extends string & keyof EventDataTypes[Category], Data extends EventDataTypes[Category][Event_1]>(category: Category, event: Event_1, userData: Data, options?: TrackingOptions) => void;
    click: (data: UserClickData) => void;
    impression: (data: UserImpressionData) => void;
    visit: (data: UserVisitData) => void;
    pushDataLayerEvent: (eventName: string) => void;
};
