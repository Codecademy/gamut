import _regeneratorRuntime from "@babel/runtime/regenerator";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { conditionallyLoadAnalytics } from './conditionallyLoadAnalytics';
import { fetchDestinationsForWriteKey } from './fetchDestinationsForWriteKey';
import { mapDestinations } from './mapDestinations';
import { initializeOneTrust } from './onetrust';
import { runSegmentSnippet } from './runSegmentSnippet';

/**
 * @see README.md for details and usage.
 */
export var initializeTrackingIntegrations = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref) {
    var onError, production, scope, user, writeKey, destinations, _mapDestinations, destinationPreferences, identifyPreferences;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            onError = _ref.onError, production = _ref.production, scope = _ref.scope, user = _ref.user, writeKey = _ref.writeKey;
            _context.next = 3;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 1000);
            });

          case 3:
            _context.next = 5;
            return initializeOneTrust({
              scope: scope,
              production: production
            });

          case 5:
            // 3. Segment's copy-and-paste snippet is run to load the Segment global library
            runSegmentSnippet(); // 4. Destination integrations for Segment are fetched

            _context.next = 8;
            return fetchDestinationsForWriteKey({
              onError: onError,
              writeKey: writeKey
            });

          case 8:
            destinations = _context.sent;

            if (destinations) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return");

          case 11:
            // 5. Those integrations are compared against the user's consent decisions into a list of allowed destinations
            _mapDestinations = mapDestinations({
              consentDecision: scope.OnetrustActiveGroups,
              destinations: destinations,
              user: user
            }), destinationPreferences = _mapDestinations.destinationPreferences, identifyPreferences = _mapDestinations.identifyPreferences; // 6. We load only those allowed destinations using Segment's `analytics.load`

            conditionallyLoadAnalytics({
              analytics: scope.analytics,
              destinationPreferences: destinationPreferences,
              identifyPreferences: identifyPreferences,
              user: user,
              writeKey: writeKey
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initializeTrackingIntegrations(_x) {
    return _ref2.apply(this, arguments);
  };
}();