import _regeneratorRuntime from "@babel/runtime/regenerator";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { act, renderHook } from '@testing-library/react-hooks';
import { useKonamimojisplosion } from '../useKonamimojisplosion';
var mockKonamiCode;
jest.mock('konami-code-js', function () {
  return function MockKonamiCode(mockLaunch) {
    _classCallCheck(this, MockKonamiCode);

    this.disable = jest.fn();
    this.mockLaunch = mockLaunch;
    mockKonamiCode = this;
  };
});
var mockEmojisplosionsCancel = jest.fn();
var mockEmojisplosionsStart = jest.fn(function () {
  return {
    cancel: mockEmojisplosionsCancel
  };
});
jest.mock('emojisplosion', function () {
  return {
    get emojisplosions() {
      return mockEmojisplosionsStart;
    }

  };
});
describe('useKonamimojisplosion', function () {
  it('does not start emojisplosions when the konami code is not triggered', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            renderHook(function () {
              return useKonamimojisplosion(jest.fn());
            });
            expect(mockEmojisplosionsStart).not.toHaveBeenCalled();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('starts emojisplosions when the konami code is triggered a first time', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            renderHook(function () {
              return useKonamimojisplosion(jest.fn());
            });
            _context3.next = 3;
            return act( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
              return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      mockKonamiCode.mockLaunch();

                    case 1:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            })));

          case 3:
            expect(mockEmojisplosionsStart).toHaveBeenCalled();

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('stops emojisplosions when the konami code is triggered a second time', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            renderHook(function () {
              return useKonamimojisplosion(jest.fn());
            });
            _context6.next = 3;
            return act( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
              return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      mockKonamiCode.mockLaunch();

                    case 1:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4);
            })));

          case 3:
            _context6.next = 5;
            return act( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
              return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      mockKonamiCode.mockLaunch();

                    case 1:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            })));

          case 5:
            expect(mockEmojisplosionsCancel).toHaveBeenCalled();

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it('stops emojisplosions and konami listening when disposed', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9() {
    var hook;
    return _regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            hook = renderHook(function () {
              return useKonamimojisplosion(jest.fn());
            });
            _context9.next = 3;
            return act( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7() {
              return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      mockKonamiCode.mockLaunch();

                    case 1:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7);
            })));

          case 3:
            _context9.next = 5;
            return act( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8() {
              return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      hook.unmount();

                    case 1:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8);
            })));

          case 5:
            expect(mockEmojisplosionsCancel).toHaveBeenCalled();
            expect(mockKonamiCode.disable).toHaveBeenCalled();

          case 7:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
});