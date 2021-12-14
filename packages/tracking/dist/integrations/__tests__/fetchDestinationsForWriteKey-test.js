import _regeneratorRuntime from "@babel/runtime/regenerator";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import fetchMock from 'fetch-mock';
import { fetchDestinationsForWriteKey } from '../fetchDestinationsForWriteKey';
var settings = {
  onError: jest.fn(),
  writeKey: 'abc123'
};
describe('fetchDestinationsForWriteKey', function () {
  afterEach(fetchMock.restore);
  it('returns [] when the integrations fetch is not ok', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var destinations;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fetchMock.get("https://cdn.segment.com/v1/projects/".concat(settings.writeKey, "/integrations"), {
              status: 500
            });
            _context.next = 3;
            return fetchDestinationsForWriteKey(settings);

          case 3:
            destinations = _context.sent;
            expect(destinations).toEqual([]);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('returns [] when response.json() throws an error', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var destinations;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fetchMock.get("https://cdn.segment.com/v1/projects/".concat(settings.writeKey, "/integrations"), {
              body: 'invalid'
            });
            _context2.next = 3;
            return fetchDestinationsForWriteKey(settings);

          case 3:
            destinations = _context2.sent;
            expect(destinations).toEqual([]);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('returns mapped destinations when response.json() succeeds', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var destinations;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            fetchMock.get("https://cdn.segment.com/v1/projects/".concat(settings.writeKey, "/integrations"), {
              body: [{
                creationName: 'my-destination'
              }]
            });
            _context3.next = 3;
            return fetchDestinationsForWriteKey(settings);

          case 3:
            destinations = _context3.sent;
            expect(destinations).toEqual([{
              id: 'my-destination'
            }]);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});