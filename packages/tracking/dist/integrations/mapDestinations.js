function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { Consent } from './consent';
// The Functional category may need to be added here in the future.
var targetingCategories = ['Advertising', 'Attribution', 'Email Marketing'];
var performanceCategories = ['Analytics', 'Customer Success', 'Surveys', 'Heatmaps & Recording'];
var functionalCategories = ['SMS & Push Notifications'];
/**
 * @see https://www.notion.so/codecademy/GDPR-Compliance-141ebcc7ffa542daa0da56e35f482b41
 */

export var mapDestinations = function mapDestinations(_ref) {
  var _ref$consentDecision = _ref.consentDecision,
      consentDecision = _ref$consentDecision === void 0 ? [Consent.StrictlyNecessary] : _ref$consentDecision,
      destinations = _ref.destinations;
  var destinationPreferences = Object.assign.apply(Object, [{
    'Segment.io': consentDecision.includes(Consent.Functional)
  }].concat(_toConsumableArray(destinations.map(function (dest) {
    if (targetingCategories.includes(dest.category)) {
      return _defineProperty({}, dest.id, consentDecision.includes(Consent.Targeting));
    }

    if (performanceCategories.includes(dest.category)) {
      return _defineProperty({}, dest.id, consentDecision.includes(Consent.Performance));
    }

    if (functionalCategories.includes(dest.category)) {
      return _defineProperty({}, dest.id, consentDecision.includes(Consent.Functional));
    }

    return _defineProperty({}, dest.id, true);
  }))));
  var identifyPreferences = {
    All: false,
    FullStory: consentDecision.includes(Consent.Performance),
    Hindsight: consentDecision.includes(Consent.Targeting),
    UserLeap: consentDecision.includes(Consent.Performance)
  };
  return {
    destinationPreferences: destinationPreferences,
    identifyPreferences: identifyPreferences
  };
};