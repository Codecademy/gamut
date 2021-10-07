import { SegmentDestination } from './types';

const knownFetchFailures = [
  'Failed to fetch',
  'Load failed',
  'NetworkError when attempting to fetch resource',
  'Resource blocked by content blocker',
];

export type FetchDestinationsSettings = {
  onError: (message: string) => void;
  writeKey: string;
};

export const fetchDestinationsForWriteKey = async ({
  writeKey,
  onError,
}: FetchDestinationsSettings): Promise<SegmentDestination[] | undefined> => {
  const filteredOnError = (error: string) => {
    if (!knownFetchFailures.some((failure) => error.includes(failure))) {
      onError(error);
    }
  };

  try {
    const response = await fetch(
      `https://cdn.segment.com/v1/projects/${writeKey}/integrations`
    );

    if (!response.ok) {
      filteredOnError(
        `Failed to fetch integrations for write key ${writeKey}: HTTP ${response.status} ${response.statusText}`
      );
      return [];
    }

    const destinations = await response.json();

    for (const destination of destinations) {
      destination.id = destination.creationName;
      delete destination.creationName;
    }

    return destinations;
  } catch (error) {
    filteredOnError(
      `Unknown error fetching Segment destinations for write key ${writeKey}: ${error}`
    );
    return [];
  }
};
