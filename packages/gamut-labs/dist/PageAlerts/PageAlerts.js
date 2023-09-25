import _styled from "@emotion/styled/base";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
import { Alert, BodyPortal, ContentContainer } from '@codecademy/gamut';
import { useCallback, useContext, useEffect, useState } from 'react';
import * as React from 'react';
import { PageAlertsContext } from './PageAlertsProvider';
import { jsx as _jsx } from "react/jsx-runtime";
export var AlertArea = /*#__PURE__*/_styled("div", {
  target: "e118bx8w1",
  label: "AlertArea"
})(process.env.NODE_ENV === "production" ? {
  name: "pe9r4g",
  styles: "display:grid;justify-content:center;width:100%;padding:1rem 0rem;grid-template-columns:1fr;row-gap:1rem;top:3.5rem;left:50%;z-index:15;position:fixed;transform:translate(-50%, 0)"
} : {
  name: "pe9r4g",
  styles: "display:grid;justify-content:center;width:100%;padding:1rem 0rem;grid-template-columns:1fr;row-gap:1rem;top:3.5rem;left:50%;z-index:15;position:fixed;transform:translate(-50%, 0)",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9QYWdlQWxlcnRzL1BhZ2VBbGVydHMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWVtQyIsImZpbGUiOiIuLi8uLi9zcmMvUGFnZUFsZXJ0cy9QYWdlQWxlcnRzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFsZXJ0LCBCb2R5UG9ydGFsLCBDb250ZW50Q29udGFpbmVyIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7XG4gIFBhZ2VBbGVydHNDb250ZXh0LFxuICBQYWdlQWxlcnRzQ29udGV4dFZhbHVlLFxufSBmcm9tICcuL1BhZ2VBbGVydHNQcm92aWRlcic7XG5pbXBvcnQgeyBQYWdlQWxlcnQgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IHR5cGUgUGFnZUFsZXJ0c1Byb3BzID0ge1xuICBleHRyYT86IFBhZ2VBbGVydFtdO1xufTtcblxuZXhwb3J0IGNvbnN0IEFsZXJ0QXJlYSA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMXJlbSAwcmVtO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgcm93LWdhcDogMXJlbTtcbiAgdG9wOiAzLjVyZW07XG4gIGxlZnQ6IDUwJTtcbiAgei1pbmRleDogMTU7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgMCk7XG5gO1xuXG5jb25zdCBTdHlsZWRBbGVydCA9IHN0eWxlZChBbGVydClgXG4gIG1heC13aWR0aDogMTAwJTtcbmA7XG5cbmV4cG9ydCBjb25zdCBQYWdlQWxlcnRzOiBSZWFjdC5GQzxQYWdlQWxlcnRzUHJvcHM+ID0gKHsgZXh0cmEgPSBbXSB9KSA9PiB7XG4gIGNvbnN0IHsgYWxlcnRzLCBjbG9zZUFsZXJ0LCBhZGRBbGVydCB9ID0gdXNlQ29udGV4dDxQYWdlQWxlcnRzQ29udGV4dFZhbHVlPihcbiAgICBQYWdlQWxlcnRzQ29udGV4dFxuICApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZXh0cmEuZm9yRWFjaChhZGRBbGVydCk7XG4gIH0sIFtleHRyYSwgYWRkQWxlcnRdKTtcblxuICBjb25zdCBbYWxlcnRBcmVhLCBzZXRBbGVydEFyZWFdID0gdXNlU3RhdGU8SFRNTERpdkVsZW1lbnQ+KCk7XG4gIGNvbnN0IHJlZkNhbGxiYWNrID0gdXNlQ2FsbGJhY2soXG4gICAgKGFsZXJ0QXJlYTogSFRNTERpdkVsZW1lbnQpID0+IHtcbiAgICAgIHNldEFsZXJ0QXJlYShhbGVydEFyZWEpO1xuICAgIH0sXG4gICAgW3NldEFsZXJ0QXJlYV1cbiAgKTtcblxuICBjb25zdCBmb2N1c0FsZXJ0Q2xvc2VCdXR0b24gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgcmVmQnV0dG9uID0gYWxlcnRBcmVhPy5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICByZWZCdXR0b24/LmZvY3VzKCk7XG4gIH0sIFthbGVydEFyZWFdKTtcblxuICAvLyBGb2N1cyB3aGVuIGFsZXJ0QXJlYSBpcyBmaXJzdCByZW5kZXJlZCwgYXMgd2VsbCBhcyB3aGVuIGFsZXJ0cyBjaGFuZ2VcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBmb2N1c0FsZXJ0Q2xvc2VCdXR0b24oKTtcbiAgfSwgW2FsZXJ0cywgZm9jdXNBbGVydENsb3NlQnV0dG9uLCBhbGVydEFyZWFdKTtcblxuICBpZiAoIWFsZXJ0cz8ubGVuZ3RoKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gKFxuICAgIDxCb2R5UG9ydGFsPlxuICAgICAgPEFsZXJ0QXJlYVxuICAgICAgICByb2xlPVwiYWxlcnRcIlxuICAgICAgICBhcmlhLWxpdmU9XCJhc3NlcnRpdmVcIlxuICAgICAgICBrZXk9XCJhbGVydHNcIlxuICAgICAgICByZWY9e3JlZkNhbGxiYWNrfVxuICAgICAgPlxuICAgICAgICB7YWxlcnRzLm1hcCgoYWxlcnQpID0+IChcbiAgICAgICAgICA8Q29udGVudENvbnRhaW5lciBzaXplPVwibWVkaXVtXCI+XG4gICAgICAgICAgICA8U3R5bGVkQWxlcnRcbiAgICAgICAgICAgICAgY3RhPXthbGVydC5jdGF9XG4gICAgICAgICAgICAgIG9uQ2xvc2U9e1xuICAgICAgICAgICAgICAgIGFsZXJ0LnBlcm1hbmVudFxuICAgICAgICAgICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgIDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNsb3NlQWxlcnQoYWxlcnQubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgYWxlcnQ/Lm9uQ2xvc2U/LigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdHlwZT17YWxlcnQudHlwZX1cbiAgICAgICAgICAgICAga2V5PXthbGVydC5tZXNzYWdlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7YWxlcnQubWVzc2FnZX1cbiAgICAgICAgICAgIDwvU3R5bGVkQWxlcnQ+XG4gICAgICAgICAgPC9Db250ZW50Q29udGFpbmVyPlxuICAgICAgICApKX1cbiAgICAgIDwvQWxlcnRBcmVhPlxuICAgIDwvQm9keVBvcnRhbD5cbiAgKTtcbn07XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
var StyledAlert = /*#__PURE__*/_styled(Alert, {
  target: "e118bx8w0",
  label: "StyledAlert"
})(process.env.NODE_ENV === "production" ? {
  name: "qhxz92",
  styles: "max-width:100%"
} : {
  name: "qhxz92",
  styles: "max-width:100%",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9QYWdlQWxlcnRzL1BhZ2VBbGVydHMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZCaUMiLCJmaWxlIjoiLi4vLi4vc3JjL1BhZ2VBbGVydHMvUGFnZUFsZXJ0cy50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbGVydCwgQm9keVBvcnRhbCwgQ29udGVudENvbnRhaW5lciB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQge1xuICBQYWdlQWxlcnRzQ29udGV4dCxcbiAgUGFnZUFsZXJ0c0NvbnRleHRWYWx1ZSxcbn0gZnJvbSAnLi9QYWdlQWxlcnRzUHJvdmlkZXInO1xuaW1wb3J0IHsgUGFnZUFsZXJ0IH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCB0eXBlIFBhZ2VBbGVydHNQcm9wcyA9IHtcbiAgZXh0cmE/OiBQYWdlQWxlcnRbXTtcbn07XG5cbmV4cG9ydCBjb25zdCBBbGVydEFyZWEgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBncmlkO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDFyZW0gMHJlbTtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIHJvdy1nYXA6IDFyZW07XG4gIHRvcDogMy41cmVtO1xuICBsZWZ0OiA1MCU7XG4gIHotaW5kZXg6IDE1O1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIDApO1xuYDtcblxuY29uc3QgU3R5bGVkQWxlcnQgPSBzdHlsZWQoQWxlcnQpYFxuICBtYXgtd2lkdGg6IDEwMCU7XG5gO1xuXG5leHBvcnQgY29uc3QgUGFnZUFsZXJ0czogUmVhY3QuRkM8UGFnZUFsZXJ0c1Byb3BzPiA9ICh7IGV4dHJhID0gW10gfSkgPT4ge1xuICBjb25zdCB7IGFsZXJ0cywgY2xvc2VBbGVydCwgYWRkQWxlcnQgfSA9IHVzZUNvbnRleHQ8UGFnZUFsZXJ0c0NvbnRleHRWYWx1ZT4oXG4gICAgUGFnZUFsZXJ0c0NvbnRleHRcbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGV4dHJhLmZvckVhY2goYWRkQWxlcnQpO1xuICB9LCBbZXh0cmEsIGFkZEFsZXJ0XSk7XG5cbiAgY29uc3QgW2FsZXJ0QXJlYSwgc2V0QWxlcnRBcmVhXSA9IHVzZVN0YXRlPEhUTUxEaXZFbGVtZW50PigpO1xuICBjb25zdCByZWZDYWxsYmFjayA9IHVzZUNhbGxiYWNrKFxuICAgIChhbGVydEFyZWE6IEhUTUxEaXZFbGVtZW50KSA9PiB7XG4gICAgICBzZXRBbGVydEFyZWEoYWxlcnRBcmVhKTtcbiAgICB9LFxuICAgIFtzZXRBbGVydEFyZWFdXG4gICk7XG5cbiAgY29uc3QgZm9jdXNBbGVydENsb3NlQnV0dG9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IHJlZkJ1dHRvbiA9IGFsZXJ0QXJlYT8ucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XG4gICAgcmVmQnV0dG9uPy5mb2N1cygpO1xuICB9LCBbYWxlcnRBcmVhXSk7XG5cbiAgLy8gRm9jdXMgd2hlbiBhbGVydEFyZWEgaXMgZmlyc3QgcmVuZGVyZWQsIGFzIHdlbGwgYXMgd2hlbiBhbGVydHMgY2hhbmdlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZm9jdXNBbGVydENsb3NlQnV0dG9uKCk7XG4gIH0sIFthbGVydHMsIGZvY3VzQWxlcnRDbG9zZUJ1dHRvbiwgYWxlcnRBcmVhXSk7XG5cbiAgaWYgKCFhbGVydHM/Lmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm9keVBvcnRhbD5cbiAgICAgIDxBbGVydEFyZWFcbiAgICAgICAgcm9sZT1cImFsZXJ0XCJcbiAgICAgICAgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCJcbiAgICAgICAga2V5PVwiYWxlcnRzXCJcbiAgICAgICAgcmVmPXtyZWZDYWxsYmFja31cbiAgICAgID5cbiAgICAgICAge2FsZXJ0cy5tYXAoKGFsZXJ0KSA9PiAoXG4gICAgICAgICAgPENvbnRlbnRDb250YWluZXIgc2l6ZT1cIm1lZGl1bVwiPlxuICAgICAgICAgICAgPFN0eWxlZEFsZXJ0XG4gICAgICAgICAgICAgIGN0YT17YWxlcnQuY3RhfVxuICAgICAgICAgICAgICBvbkNsb3NlPXtcbiAgICAgICAgICAgICAgICBhbGVydC5wZXJtYW5lbnRcbiAgICAgICAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjbG9zZUFsZXJ0KGFsZXJ0Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0Py5vbkNsb3NlPy4oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHR5cGU9e2FsZXJ0LnR5cGV9XG4gICAgICAgICAgICAgIGtleT17YWxlcnQubWVzc2FnZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2FsZXJ0Lm1lc3NhZ2V9XG4gICAgICAgICAgICA8L1N0eWxlZEFsZXJ0PlxuICAgICAgICAgIDwvQ29udGVudENvbnRhaW5lcj5cbiAgICAgICAgKSl9XG4gICAgICA8L0FsZXJ0QXJlYT5cbiAgICA8L0JvZHlQb3J0YWw+XG4gICk7XG59O1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
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
  }, [alertArea]);

  // Focus when alertArea is first rendered, as well as when alerts change
  useEffect(function () {
    focusAlertCloseButton();
  }, [alerts, focusAlertCloseButton, alertArea]);
  if (!(alerts !== null && alerts !== void 0 && alerts.length)) return null;
  return /*#__PURE__*/_jsx(BodyPortal, {
    children: /*#__PURE__*/_jsx(AlertArea, {
      role: "alert",
      "aria-live": "assertive",
      ref: refCallback,
      children: alerts.map(function (alert) {
        return /*#__PURE__*/_jsx(ContentContainer, {
          size: "medium",
          children: /*#__PURE__*/_jsx(StyledAlert, {
            cta: alert.cta,
            onClose: alert.permanent ? undefined : function () {
              var _alert$onClose;
              closeAlert(alert.message);
              alert === null || alert === void 0 ? void 0 : (_alert$onClose = alert.onClose) === null || _alert$onClose === void 0 ? void 0 : _alert$onClose.call(alert);
            },
            type: alert.type,
            children: alert.message
          }, alert.message)
        });
      })
    }, "alerts")
  });
};