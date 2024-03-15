function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { noop } from 'lodash/fp';
import React, { useCallback, useContext, useState } from 'react';
export var usePageAlertsContext = function usePageAlertsContext() {
  return useContext(PageAlertsContext);
};
export var PageAlertsContext = /*#__PURE__*/React.createContext({
  alerts: [],
  addAlert: noop,
  closeAlert: noop
});
export var PageAlertsProvider = function PageAlertsProvider(_ref) {
  var children = _ref.children;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      alerts = _useState2[0],
      setAlerts = _useState2[1];

  var addAlert = useCallback(function (newAlert) {
    setAlerts(function (existingAlerts) {
      if (!existingAlerts.some(function (alert) {
        return alert.message === newAlert.message;
      })) return [].concat(_toConsumableArray(existingAlerts), [newAlert]);
      return existingAlerts;
    });
  }, []);
  var closeAlert = useCallback(function (message) {
    setAlerts(function (existingAlerts) {
      return existingAlerts.filter(function (alert) {
        return alert.message !== message;
      });
    });
  }, []);
  return /*#__PURE__*/React.createElement(PageAlertsContext.Provider, {
    value: {
      alerts: alerts,
      addAlert: addAlert,
      closeAlert: closeAlert
    }
  }, children);
};