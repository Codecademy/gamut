import fetchMock from 'fetch-mock';

import { fetchDestinationsForWriteKey } from '../fetchDestinationsForWriteKey';

const settings = {
  onError: jest.fn(),
  writeKey: 'abc123',
};

describe('fetchDestinationsForWriteKey', () => {
  afterEach(fetchMock.restore);

  it('returns [] when the integrations fetch is not ok', async () => {
    fetchMock.get(
      `https://cdn.segment.com/v1/projects/${settings.writeKey}/integrations`,
      { status: 500 }
    );

    const destinations = await fetchDestinationsForWriteKey(settings);

    expect(destinations).toEqual([]);
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
