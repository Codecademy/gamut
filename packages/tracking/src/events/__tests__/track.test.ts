import { createTracker } from '../track';

const apiBaseUrl = 'https://www.codecademy.com';

const fakeWindow = {
  location: {
    href: 'https://example.com/',
    pathname: '/catalog',
    search: '?utm_source=twitter',
  },
  document: {
    title: 'Test Title',
  },
};

const mockFetch = jest.fn();

Object.defineProperties(window, {
  fetch: {
    value: mockFetch,
  },
  location: {
    value: fakeWindow.location,
  },
  Request: {
    value: class MockRequest {
      static keepalive = true;
    },
  },
});
Object.defineProperty(window.document, 'title', {
  value: fakeWindow.document.title,
});

afterEach(() => jest.resetAllMocks());

const mockClientType = jest.fn();

jest.mock('../../integrations/device', () => ({
  get getClientType() {
    return mockClientType;
  },
}));

describe('createTracker', () => {
  const describeEvent = (event: 'click' | 'impression' | 'visit') => {
    describe(event, () => {
      const target = 'test target';
      const page_name = 'test page_name';
      const {
        location: { href },
      } = fakeWindow;
      const tracker = createTracker({ apiBaseUrl });
      const expectedProps = {
        target,
        page_name,
        href,
      };

      it('calls only to beacon when it exists', () => {
        const mockBeacon = jest.fn().mockReturnValueOnce(true);
        mockClientType.mockReturnValue('default');

        Object.defineProperty(navigator, 'sendBeacon', {
          writable: true,
          value: mockBeacon,
        });

        tracker[event](expectedProps);

        expect(mockBeacon).toHaveBeenCalledTimes(1);
        expect(mockBeacon).toHaveBeenCalledWith(
          `${apiBaseUrl}/analytics/user?utm_source=twitter`,
          expect.any(FormData)
        );
        const formData = mockBeacon.mock.calls[0][1];
        expect(Object.fromEntries(formData)).toEqual(
          expect.objectContaining({
            category: 'user',
            event,
            gdpr_safe: 'undefined',
          })
        );
        expect(JSON.parse(formData.get('properties'))).toEqual({
          ...expectedProps,
          fullpath: window.location.pathname + window.location.search,
          path: window.location.pathname,
          referrer: '',
          search: window.location.search,
          title: document.title,
          url: window.location.href,
          client: 'default',
        });

        expect(fetch).not.toHaveBeenCalled();
      });

      it('calls to fetch when beacon does not exist', () => {
        Object.defineProperty(navigator, 'sendBeacon', {
          writable: true,
          value: undefined,
        });

        tracker[event](expectedProps);

        expect(
          fetch
        ).toHaveBeenCalledWith(
          'https://www.codecademy.com/analytics/user?utm_source=twitter',
          { body: expect.any(FormData), method: 'POST' }
        );
      });

      it('calls to fetch when beacon returns false', () => {
        Object.defineProperty(navigator, 'sendBeacon', {
          writable: true,
          value: () => false,
        });

        tracker[event](expectedProps);

        expect(
          fetch
        ).toHaveBeenCalledWith(
          'https://www.codecademy.com/analytics/user?utm_source=twitter',
          { body: expect.any(FormData), method: 'POST' }
        );
      });
    });
  };

  describeEvent('click');
  describeEvent('impression');
  describeEvent('visit');
});
