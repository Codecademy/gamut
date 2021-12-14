function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { conditionallyLoadAnalytics } from '../conditionallyLoadAnalytics';

var createMockSegmentAnalytics = function createMockSegmentAnalytics(overrides) {
  return _objectSpread({
    identify: jest.fn(),
    load: jest.fn(),
    page: jest.fn()
  }, overrides);
};

var createMockOptions = function createMockOptions(overrides) {
  return _objectSpread({
    analytics: createMockSegmentAnalytics(),
    destinationPreferences: {
      destination: true
    },
    identifyPreferences: {
      destination: true
    },
    writeKey: 'abc123'
  }, overrides);
};

describe('conditionallyLoadAnalytics', function () {
  it('does not call analytics.load or analytics.page when analytics.initialize is true', function () {
    var options = createMockOptions({
      analytics: createMockSegmentAnalytics({
        initialize: true
      })
    });
    conditionallyLoadAnalytics(options);
    expect(options.analytics.load).not.toHaveBeenCalled();
  });
  it('calls analytics.load and analytics.page when analytics.initialize is false', function () {
    var options = createMockOptions({
      analytics: createMockSegmentAnalytics({
        initialize: false
      })
    });
    conditionallyLoadAnalytics(options);
    expect(options.analytics.load).toHaveBeenCalledWith(options.writeKey, {
      integrations: options.destinationPreferences
    });
    expect(options.analytics.page).toHaveBeenCalled();
  });
  it('does not call analytics.identify when there is no user', function () {
    var options = createMockOptions({
      user: undefined
    });
    conditionallyLoadAnalytics(options);
    expect(options.analytics.identify).not.toHaveBeenCalled();
  });
  it('calls analytics.identify when there is a user', function () {
    var user = {
      email: 'test@test.com',
      id: 'abc123'
    };
    var options = createMockOptions({
      user: user
    });
    conditionallyLoadAnalytics(options);
    expect(options.analytics.identify).toHaveBeenCalledWith(user.id, {
      email: user.email
    }, {
      integrations: options.identifyPreferences
    });
  });
});