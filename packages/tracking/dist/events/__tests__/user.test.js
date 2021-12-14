import _regeneratorRuntime from "@babel/runtime/regenerator";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import fetch from 'fetch-mock';
import { fetchUser } from '../user';
var apiBaseUrl = 'https://www.codecademy.com';
var authUser = {
  foo: 'bar'
};
describe('fetchUser', function () {
  afterEach(function () {
    return fetch.restore();
  });
  test('retrieves a user', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var user;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fetch.getOnce('*', JSON.stringify(authUser));
            _context.next = 3;
            return fetchUser(apiBaseUrl);

          case 3:
            user = _context.sent;
            expect(user).toEqual(authUser);
            expect(fetch.calls().length).toEqual(1);
            expect(fetch.calls()[0][0]).toBe("".concat(apiBaseUrl, "/users/web"));
            expect(fetch.calls()[0][1].method).toBe('GET');
            expect(fetch.calls()[0][1].credentials).toBe('include');

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});