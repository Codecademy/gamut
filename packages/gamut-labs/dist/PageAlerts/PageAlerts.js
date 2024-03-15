import _styled from "@emotion/styled/base";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Alert, BodyPortal } from '@codecademy/gamut';
import { breakpoints } from '@codecademy/gamut-styles';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { PageAlertsContext } from './PageAlertsProvider';
export var AlertArea = _styled("div", {
  target: "e118bx8w0",
  label: "AlertArea"
})("display:grid;justify-content:center;width:calc(", breakpoints.md, " - 4rem);padding:1rem;max-width:100%;grid-template-columns:1fr;row-gap:1rem;top:5rem;left:50%;z-index:15;position:fixed;transform:translate(-50%, 0);" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9QYWdlQWxlcnRzL1BhZ2VBbGVydHMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWVtQyIsImZpbGUiOiIuLi8uLi9zcmMvUGFnZUFsZXJ0cy9QYWdlQWxlcnRzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFsZXJ0LCBCb2R5UG9ydGFsIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgYnJlYWtwb2ludHMgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQge1xuICBQYWdlQWxlcnRzQ29udGV4dCxcbiAgUGFnZUFsZXJ0c0NvbnRleHRWYWx1ZSxcbn0gZnJvbSAnLi9QYWdlQWxlcnRzUHJvdmlkZXInO1xuaW1wb3J0IHsgUGFnZUFsZXJ0IH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCB0eXBlIFBhZ2VBbGVydHNQcm9wcyA9IHtcbiAgZXh0cmE/OiBQYWdlQWxlcnRbXTtcbn07XG5cbmV4cG9ydCBjb25zdCBBbGVydEFyZWEgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBncmlkO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IGNhbGMoJHticmVha3BvaW50cy5tZH0gLSA0cmVtKTtcbiAgcGFkZGluZzogMXJlbTtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgcm93LWdhcDogMXJlbTtcbiAgdG9wOiA1cmVtO1xuICBsZWZ0OiA1MCU7XG4gIHotaW5kZXg6IDE1O1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIDApO1xuYDtcblxuZXhwb3J0IGNvbnN0IFBhZ2VBbGVydHM6IFJlYWN0LkZDPFBhZ2VBbGVydHNQcm9wcz4gPSAoeyBleHRyYSA9IFtdIH0pID0+IHtcbiAgY29uc3QgeyBhbGVydHMsIGNsb3NlQWxlcnQsIGFkZEFsZXJ0IH0gPSB1c2VDb250ZXh0PFBhZ2VBbGVydHNDb250ZXh0VmFsdWU+KFxuICAgIFBhZ2VBbGVydHNDb250ZXh0XG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBleHRyYS5mb3JFYWNoKGFkZEFsZXJ0KTtcbiAgfSwgW2V4dHJhLCBhZGRBbGVydF0pO1xuXG4gIGNvbnN0IFthbGVydEFyZWEsIHNldEFsZXJ0QXJlYV0gPSB1c2VTdGF0ZTxIVE1MRGl2RWxlbWVudD4oKTtcbiAgY29uc3QgcmVmQ2FsbGJhY2sgPSB1c2VDYWxsYmFjayhcbiAgICAoYWxlcnRBcmVhOiBIVE1MRGl2RWxlbWVudCkgPT4ge1xuICAgICAgc2V0QWxlcnRBcmVhKGFsZXJ0QXJlYSk7XG4gICAgfSxcbiAgICBbc2V0QWxlcnRBcmVhXVxuICApO1xuXG4gIGNvbnN0IGZvY3VzQWxlcnRDbG9zZUJ1dHRvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCByZWZCdXR0b24gPSBhbGVydEFyZWE/LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuICAgIHJlZkJ1dHRvbj8uZm9jdXMoKTtcbiAgfSwgW2FsZXJ0QXJlYV0pO1xuXG4gIC8vIEZvY3VzIHdoZW4gYWxlcnRBcmVhIGlzIGZpcnN0IHJlbmRlcmVkLCBhcyB3ZWxsIGFzIHdoZW4gYWxlcnRzIGNoYW5nZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZvY3VzQWxlcnRDbG9zZUJ1dHRvbigpO1xuICB9LCBbYWxlcnRzLCBmb2N1c0FsZXJ0Q2xvc2VCdXR0b24sIGFsZXJ0QXJlYV0pO1xuXG4gIGlmICghYWxlcnRzPy5sZW5ndGgpIHJldHVybiBudWxsO1xuXG4gIHJldHVybiAoXG4gICAgPEJvZHlQb3J0YWw+XG4gICAgICA8QWxlcnRBcmVhXG4gICAgICAgIHJvbGU9XCJhbGVydFwiXG4gICAgICAgIGFyaWEtbGl2ZT1cImFzc2VydGl2ZVwiXG4gICAgICAgIGtleT1cImFsZXJ0c1wiXG4gICAgICAgIHJlZj17cmVmQ2FsbGJhY2t9XG4gICAgICA+XG4gICAgICAgIHthbGVydHMubWFwKChhbGVydCkgPT4gKFxuICAgICAgICAgIDxBbGVydFxuICAgICAgICAgICAgY3RhPXthbGVydC5jdGF9XG4gICAgICAgICAgICBvbkNsb3NlPXtcbiAgICAgICAgICAgICAgYWxlcnQucGVybWFuZW50XG4gICAgICAgICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VBbGVydChhbGVydC5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQ/Lm9uQ2xvc2U/LigpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHlwZT17YWxlcnQudHlwZX1cbiAgICAgICAgICAgIGtleT17YWxlcnQubWVzc2FnZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7YWxlcnQubWVzc2FnZX1cbiAgICAgICAgICA8L0FsZXJ0PlxuICAgICAgICApKX1cbiAgICAgIDwvQWxlcnRBcmVhPlxuICAgIDwvQm9keVBvcnRhbD5cbiAgKTtcbn07XG4iXX0= */"));
export var PageAlerts = function PageAlerts(_ref) {
  var _ref$extra = _ref.extra,
      extra = _ref$extra === void 0 ? [] : _ref$extra;

  var _useContext = useContext(PageAlertsContext),
      alerts = _useContext.alerts,
      closeAlert = _useContext.closeAlert,
      addAlert = _useContext.addAlert;

  useEffect(function () {
    extra.forEach(addAlert);
  }, [extra, addAlert]);

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      alertArea = _useState2[0],
      setAlertArea = _useState2[1];

  var refCallback = useCallback(function (alertArea) {
    setAlertArea(alertArea);
  }, [setAlertArea]);
  var focusAlertCloseButton = useCallback(function () {
    var refButton = alertArea === null || alertArea === void 0 ? void 0 : alertArea.querySelector('button');
    refButton === null || refButton === void 0 ? void 0 : refButton.focus();
  }, [alertArea]); // Focus when alertArea is first rendered, as well as when alerts change

  useEffect(function () {
    focusAlertCloseButton();
  }, [alerts, focusAlertCloseButton, alertArea]);
  if (!(alerts !== null && alerts !== void 0 && alerts.length)) return null;
  return /*#__PURE__*/React.createElement(BodyPortal, null, /*#__PURE__*/React.createElement(AlertArea, {
    role: "alert",
    "aria-live": "assertive",
    key: "alerts",
    ref: refCallback
  }, alerts.map(function (alert) {
    return /*#__PURE__*/React.createElement(Alert, {
      cta: alert.cta,
      onClose: alert.permanent ? undefined : function () {
        var _alert$onClose;

        closeAlert(alert.message);
        alert === null || alert === void 0 ? void 0 : (_alert$onClose = alert.onClose) === null || _alert$onClose === void 0 ? void 0 : _alert$onClose.call(alert);
      },
      type: alert.type,
      key: alert.message
    }, alert.message);
  })));
};