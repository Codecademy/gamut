import { SegmentDestination } from './types';
export declare type FetchDestinationsSettings = {
    onError: (message: string) => void;
    writeKey: string;
};
export declare const fetchDestinationsForWriteKey: ({ writeKey, onError, }: FetchDestinationsSettings) => Promise<SegmentDestination[] | undefined>;
