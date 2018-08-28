function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Consent } from '../consent';
import { mapDestinations } from '../mapDestinations';
describe('mapDestinations', function () {
  describe('destinationPreferences', function () {
    var testCase = function testCase(input, output) {
      var _mapDestinations = mapDestinations(input),
          destinationPreferences = _mapDestinations.destinationPreferences;

      expect(destinationPreferences).toEqual(expect.objectContaining(output));
    };

    it('does not include Segment.io by default', function () {
      testCase({
        destinations: []
      }, {
        'Segment.io': false
      });
    });
    it('includes Segment.io when consent includes C0003', function () {
      testCase({
        consentDecision: [Consent.Functional],
        destinations: []
      }, {
        'Segment.io': true
      });
    });
    it('does not allow a targeting destination when consent does not include C0004', function () {
      testCase({
        consentDecision: [],
        destinations: [{
          category: 'Advertising',
          id: 'abc123'
        }]
      }, {
        abc123: false
      });
    });
    it('allows a targeting destination when consent includes C0004', function () {
      testCase({
        consentDecision: [Consent.Targeting],
        destinations: [{
          category: 'Advertising',
          id: 'abc123'
        }]
      }, {
        abc123: true
      });
    });
    it('does not allow a performance destination when consent does not include C0002', function () {
      testCase({
        consentDecision: [],
        destinations: [{
          category: 'Analytics',
          id: 'abc123'
        }]
      }, {
        abc123: false
      });
    });
    it('allows a performance destination when consent includes C0002', function () {
      testCase({
        consentDecision: [Consent.Performance],
        destinations: [{
          category: 'Analytics',
          id: 'abc123'
        }]
      }, {
        abc123: true
      });
    });
  });
  describe('identifyPreferences', function () {
    var testCase = function testCase(input, output) {
      var _mapDestinations2 = mapDestinations(_objectSpread({
        destinations: []
      }, input)),
          identifyPreferences = _mapDestinations2.identifyPreferences;

      expect(identifyPreferences).toEqual(expect.objectContaining(output));
    };

    it('does not include FullStory when consent does not include C0003', function () {
      testCase({}, {
        FullStory: false
      });
    });
    it('includes FullStory when consent includes C0002', function () {
      testCase({
        consentDecision: [Consent.Performance]
      }, {
        FullStory: true
      });
    });
    it('does not include Hindsight when consent does not include C0004', function () {
      testCase({}, {
        Hindsight: false
      });
    });
    it('includes Hindsight when consent includes C0004', function () {
      testCase({
        consentDecision: [Consent.Targeting]
      }, {
        Hindsight: true
      });
    });
    it('does not include UserLeap when consent does not include C0002', function () {
      testCase({}, {
        UserLeap: false
      });
    });
    it('includes UserLeap when consent includes C0002', function () {
      testCase({
        consentDecision: [Consent.Performance]
      }, {
        UserLeap: true
      });
    });
  });
});