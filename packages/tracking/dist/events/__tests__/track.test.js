var _class, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { createTracker } from '../track';
var apiBaseUrl = 'https://www.codecademy.com';
var fakeWindow = {
  location: {
    href: 'https://example.com/',
    pathname: '/catalog',
    search: '?utm_source=twitter'
  },
  document: {
    title: 'Test Title'
  }
};
var mockFetch = jest.fn();
Object.defineProperties(window, {
  fetch: {
    value: mockFetch
  },
  location: {
    value: fakeWindow.location
  },
  Request: {
    value: (_temp = _class = function MockRequest() {
      _classCallCheck(this, MockRequest);
    }, _class.keepalive = true, _temp)
  }
});
Object.defineProperty(window.document, 'title', {
  value: fakeWindow.document.title
});
afterEach(function () {
  return jest.resetAllMocks();
});
describe('createTracker', function () {
  var describeEvent = function describeEvent(event) {
    describe(event, function () {
      var target = 'test target';
      var page_name = 'test page_name';
      var href = fakeWindow.location.href;
      var tracker = createTracker({
        apiBaseUrl: apiBaseUrl
      });
      var expectedProps = {
        target: target,
        page_name: page_name,
        href: href
      };
      it('calls only to beacon when it exists', function () {
        var mockBeacon = jest.fn().mockReturnValueOnce(true);
        Object.defineProperty(navigator, 'sendBeacon', {
          writable: true,
          value: mockBeacon
        });
        tracker[event](expectedProps);
        expect(mockBeacon).toHaveBeenCalledTimes(1);
        expect(mockBeacon).toHaveBeenCalledWith("".concat(apiBaseUrl, "/analytics/user?utm_source=twitter"), expect.any(FormData));
        var formData = mockBeacon.mock.calls[0][1];
        expect(Object.fromEntries(formData)).toEqual(expect.objectContaining({
          category: 'user',
          event: event,
          gdpr_safe: 'undefined'
        }));
        expect(JSON.parse(formData.get('properties'))).toEqual(_objectSpread(_objectSpread({}, expectedProps), {}, {
          fullpath: window.location.pathname + window.location.search,
          path: window.location.pathname,
          referrer: '',
          search: window.location.search,
          title: document.title,
          url: window.location.href
        }));
        expect(fetch).not.toHaveBeenCalled();
      });
      it('calls to fetch when beacon does not exist', function () {
        Object.defineProperty(navigator, 'sendBeacon', {
          writable: true,
          value: undefined
        });
        tracker[event](expectedProps);
        expect(fetch).toHaveBeenCalledWith('https://www.codecademy.com/analytics/user?utm_source=twitter', {
          body: expect.any(FormData),
          method: 'POST'
        });
      });
      it('calls to fetch when beacon returns false', function () {
        Object.defineProperty(navigator, 'sendBeacon', {
          writable: true,
          value: function value() {
            return false;
          }
        });
        tracker[event](expectedProps);
        expect(fetch).toHaveBeenCalledWith('https://www.codecademy.com/analytics/user?utm_source=twitter', {
          body: expect.any(FormData),
          method: 'POST'
        });
      });
    });
  };

  describeEvent('click');
  describeEvent('impression');
  describeEvent('visit');
});