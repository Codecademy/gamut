import { SegmentDestination } from './types';

export type FetchDestinationsSettings = {
  onError: (message: string) => void;
  writeKey: string;
};

export const fetchDestinationsForWriteKey = async ({
  writeKey,
  onError,
}: FetchDestinationsSettings): Promise<SegmentDestination[] | undefined> => {
  try {
    const response = await fetch(
      `https://cdn.segment.com/v1/projects/${writeKey}/integrations`
    );

    if (!response.ok) {
      onError(
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
    onError(
      `Unknown error fetching Segment destinations for write key ${writeKey}: ${error}`
    );
    return [];
  }
};
