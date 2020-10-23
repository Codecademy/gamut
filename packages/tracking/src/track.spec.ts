import { createTracker } from './track';

const apiBaseUrl = 'https://www.codecademy.com';
const authToken = 'super-secure-token';

const fakeWindow = {
  location: {
    href: 'https://example.com/',
    pathname: '/',
    search: '',
  },
  document: {
    title: 'Test Title',
  },
};
Object.defineProperty(window, 'location', {
  value: fakeWindow.location,
});
Object.defineProperty(window.document, 'title', {
  value: fakeWindow.document.title,
});
const beaconMock = jest.fn();
Object.defineProperty(navigator, 'sendBeacon', {
  value: beaconMock,
});

afterEach(() => jest.resetAllMocks());

describe('createTracker', () => {
  const testEvent = (event: 'click' | 'visit') => {
    const target = 'test target';
    const page_name = 'test page_name';
    const {
      location: { href },
    } = fakeWindow;
    const track = createTracker(apiBaseUrl, authToken);
    const expectedProps = {
      target,
      page_name,
      href,
    };
    track[event](expectedProps);

    expect(beaconMock.mock.calls.length).toBe(1);
    expect(beaconMock.mock.calls[0][0]).toBe(
      `${apiBaseUrl}/analytics/user?authentication_token=${authToken}`
    );
    const formData = beaconMock.mock.calls[0][1];
    expect(formData).toBeInstanceOf(FormData);
    expect(formData.get('category')).toBe('user');
    expect(formData.get('event')).toBe(event);
    expect(formData.has('properties')).toBe(true);
    const actualProps = JSON.parse(formData.get('properties'));
    for (const [k, v] of Object.entries(expectedProps)) {
      expect(actualProps[k]).toBe(v);
    }
  };

  test('click', () => {
    testEvent('click');
  });
  test('visit', () => {
    testEvent('visit');
  });
});
