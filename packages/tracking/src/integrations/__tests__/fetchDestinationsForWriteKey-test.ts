import fetchMock from 'fetch-mock';

import { fetchDestinationsForWriteKey } from '../fetchDestinationsForWriteKey';

const settings = {
  onError: jest.fn(),
  writeKey: 'abc123',
};

describe('fetchDestinationsForWriteKey', () => {
  beforeEach(() => fetchMock.restore());

  it('returns [] and logs an error when the integrations fetch is not ok', async () => {
    const error = 'Oh no';
    fetchMock.get(
      `https://cdn.segment.com/v1/projects/${settings.writeKey}/integrations`,
      { throws: error }
    );

    const destinations = await fetchDestinationsForWriteKey(settings);

    expect(destinations).toEqual([]);
    expect(settings.onError).toHaveBeenCalledWith(
      `Unknown error fetching Segment destinations for write key ${settings.writeKey}: ${error}`
    );
  });

  it('returns [] and does not log an error when the integrations fetch is a known client issue', async () => {
    fetchMock.get(
      `https://cdn.segment.com/v1/projects/${settings.writeKey}/integrations`,
      { throws: 'Failed to fetch' }
    );

    const destinations = await fetchDestinationsForWriteKey(settings);

    expect(destinations).toEqual([]);
    expect(settings.onError).not.toHaveBeenCalled();
  });

  it('returns [] when response.json() throws an error', async () => {
    fetchMock.get(
      `https://cdn.segment.com/v1/projects/${settings.writeKey}/integrations`,
      { body: 'invalid' }
    );

    const destinations = await fetchDestinationsForWriteKey(settings);

    expect(destinations).toEqual([]);
  });

  it('returns mapped destinations when response.json() succeeds', async () => {
    fetchMock.get(
      `https://cdn.segment.com/v1/projects/${settings.writeKey}/integrations`,
      { body: [{ creationName: 'my-destination' }] }
    );

    const destinations = await fetchDestinationsForWriteKey(settings);

    expect(destinations).toEqual([
      {
        id: 'my-destination',
      },
    ]);
  });
});
