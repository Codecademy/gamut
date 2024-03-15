import _regeneratorRuntime from "@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { MockGamutProvider } from '@codecademy/gamut-tests';
import { cleanup, render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CrossDeviceItemId } from '../GlobalHeader/types';
import { mockBookmarkParts } from './fixtures';
import { CrossDeviceBookmarksView } from './types';
import { useBookmarkComponentsPair } from './useBookmarkComponentsPair';
var mockSetOpenCrossDeviceItemId = jest.fn();
var defaultProps = {
  openCrossDeviceItemId: CrossDeviceItemId.UNSET,
  setOpenCrossDeviceItemId: mockSetOpenCrossDeviceItemId,
  bookmarkParts: mockBookmarkParts,
  view: CrossDeviceBookmarksView.DESKTOP,
  isAnon: false
};
describe('useBookmarkComponentsPair', function () {
  it('returns nulls when there are no bookmarkParts', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var hook;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            hook = renderHook(function () {
              return useBookmarkComponentsPair(_objectSpread(_objectSpread({}, defaultProps), {}, {
                bookmarkParts: undefined
              }));
            });
            expect(hook.result.current).toEqual([null, null]);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  describe('when bookmarkParts provided', function () {
    it('returns an icon button as first element in pair that when clicked will call the passed setOpenCrossDeviceItemId func to toggle bookmarks in global nav', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var _hook$result$current$, _postUpdateHook$resul;

      var hook, postUpdateHook;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              hook = renderHook(function () {
                return useBookmarkComponentsPair(_objectSpread({}, defaultProps));
              });
              render( /*#__PURE__*/React.createElement(MockGamutProvider, null, (_hook$result$current$ = hook.result.current[0]) === null || _hook$result$current$ === void 0 ? void 0 : _hook$result$current$.renderElement()));
              act(function () {
                userEvent.click(screen.getByText('IMA BOOKMARKS BUTTON'));
              }); // toggle bookmarks ON

              expect(mockSetOpenCrossDeviceItemId).toBeCalledTimes(1);
              expect(mockSetOpenCrossDeviceItemId).toBeCalledWith('bookmarks'); // rerender with the simulated react state change from parent

              mockSetOpenCrossDeviceItemId.mockReset();
              postUpdateHook = renderHook(function () {
                return useBookmarkComponentsPair(_objectSpread(_objectSpread({}, defaultProps), {}, {
                  openCrossDeviceItemId: 'bookmarks'
                }));
              });
              cleanup();
              render( /*#__PURE__*/React.createElement(MockGamutProvider, null, (_postUpdateHook$resul = postUpdateHook.result.current[0]) === null || _postUpdateHook$resul === void 0 ? void 0 : _postUpdateHook$resul.renderElement()));
              act(function () {
                userEvent.click(screen.getByText('IMA BOOKMARKS BUTTON'));
              }); // toggle bookmarks OFF

              expect(mockSetOpenCrossDeviceItemId).toBeCalledTimes(1);
              expect(mockSetOpenCrossDeviceItemId).toBeCalledWith('');

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    var viewCases = [[CrossDeviceBookmarksView.DESKTOP, 'DESKTOP BOOKMARKS CONTENT'], [CrossDeviceBookmarksView.MOBILE, 'MOBILE BOOKMARKS CONTENT']];
    test.each(viewCases)('returns a wrapped %s content component as second element in pair that respects the value of openCrossDeviceItemId to determine whether it displays the inner content', function (view, contentText) {
      var hook = renderHook(function () {
        return useBookmarkComponentsPair(_objectSpread(_objectSpread({}, defaultProps), {}, {
          view: view
        }));
      });
      render( /*#__PURE__*/React.createElement(MockGamutProvider, null, hook.result.current[1]));
      expect(screen.queryByText(contentText)).toBeNull();
      var postUpdateHook = renderHook(function () {
        return useBookmarkComponentsPair(_objectSpread(_objectSpread({}, defaultProps), {}, {
          view: view,
          openCrossDeviceItemId: CrossDeviceItemId.BOOKMARKS
        }));
      });
      cleanup();
      render( /*#__PURE__*/React.createElement(MockGamutProvider, null, postUpdateHook.result.current[1]));
      screen.getByText(contentText);
    });
  });
});