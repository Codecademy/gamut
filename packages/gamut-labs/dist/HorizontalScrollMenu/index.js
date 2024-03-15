import _styled from "@emotion/styled/base";

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

import 'intersection-observer';
import { Box, FlexBox } from '@codecademy/gamut';
import React, { Children, useEffect, useMemo, useRef } from 'react';

var ScrollContainer = /*#__PURE__*/_styled(FlexBox, {
  target: "exjmry91",
  label: "ScrollContainer"
})(process.env.NODE_ENV === "production" ? {
  name: "1ku5q6",
  styles: "scroll-snap-type:x mandatory;::-webkit-scrollbar{display:none;}"
} : {
  name: "1ku5q6",
  styles: "scroll-snap-type:x mandatory;::-webkit-scrollbar{display:none;}",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ib3Jpem9udGFsU2Nyb2xsTWVudS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTXVDIiwiZmlsZSI6Ii4uLy4uL3NyYy9Ib3Jpem9udGFsU2Nyb2xsTWVudS9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2ludGVyc2VjdGlvbi1vYnNlcnZlcic7XG5cbmltcG9ydCB7IEJveCwgRmxleEJveCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCwgeyBDaGlsZHJlbiwgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IFNjcm9sbENvbnRhaW5lciA9IHN0eWxlZChGbGV4Qm94KWBcbiAgc2Nyb2xsLXNuYXAtdHlwZTogeCBtYW5kYXRvcnk7XG4gIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbmA7XG5cbmNvbnN0IFNjcm9sbEl0ZW1XcmFwcGVyID0gc3R5bGVkKEJveClgXG4gIHNjcm9sbC1zbmFwLWFsaWduOiBzdGFydDtcbiAgJlthcmlhLWhpZGRlbj0ndHJ1ZSddIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIH1cbmA7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSG9yaXpvbnRhbFNjcm9sbE1lbnVQcm9wcyB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEhvcml6b250YWxTY3JvbGxNZW51OiBSZWFjdC5GQzxIb3Jpem9udGFsU2Nyb2xsTWVudVByb3BzPiA9ICh7XG4gIGNoaWxkcmVuLFxuICBjbGFzc05hbWUsXG59KSA9PiB7XG4gIGNvbnN0IGVsZW1lbnRzUmVmID0gdXNlUmVmPEhUTUxFbGVtZW50W10+KFtdKTtcbiAgY29uc3QgcGFyZW50Q29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgaW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG4gICAgICAoZW50cmllczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVtdKSA9PiB7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICBlbnRyeS50YXJnZXQuYXJpYUhpZGRlbiA9IGVudHJ5LmlzSW50ZXJzZWN0aW5nID8gJ2ZhbHNlJyA6ICd0cnVlJztcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByb290OiBwYXJlbnRDb250YWluZXJSZWYuY3VycmVudD8ucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAnW2RhdGEtb2JzZXJ2ZXJyb290PVwidHJ1ZVwiXSdcbiAgICAgICAgKSxcbiAgICAgICAgcm9vdE1hcmdpbjogJzEwMCUgMCUgMTAwJSAwJScsXG4gICAgICB9XG4gICAgKTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbnVtYmVyT2ZDaGlsZEVsZW1lbnRzID0gQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbikubGVuZ3RoO1xuXG4gICAgaWYgKGVsZW1lbnRzUmVmLmN1cnJlbnQubGVuZ3RoID09PSBudW1iZXJPZkNoaWxkRWxlbWVudHMpIHtcbiAgICAgIGVsZW1lbnRzUmVmLmN1cnJlbnQuZm9yRWFjaCgoZW50cnk6IEhUTUxFbGVtZW50KSA9PlxuICAgICAgICBpbnRlcnNlY3Rpb25PYnNlcnZlcj8ub2JzZXJ2ZShlbnRyeSlcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpbnRlcnNlY3Rpb25PYnNlcnZlcj8uZGlzY29ubmVjdCgpO1xuICAgIH07XG4gIH0sIFtlbGVtZW50c1JlZiwgaW50ZXJzZWN0aW9uT2JzZXJ2ZXIsIGNoaWxkcmVuXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IHBvc2l0aW9uPVwicmVsYXRpdmVcIj5cbiAgICAgIDxTY3JvbGxDb250YWluZXJcbiAgICAgICAgZGF0YS1vYnNlcnZlcnJvb3Q9XCJ0cnVlXCJcbiAgICAgICAgcmVmPXtwYXJlbnRDb250YWluZXJSZWZ9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICBwcj17MTZ9XG4gICAgICAgIG92ZXJmbG93WD1cInNjcm9sbFwiXG4gICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgPlxuICAgICAgICB7Q2hpbGRyZW4ubWFwKGNoaWxkcmVuLCAoY2hpbGQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgPFNjcm9sbEl0ZW1XcmFwcGVyXG4gICAgICAgICAgICByZWY9eyhlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNSZWYuY3VycmVudFtpbmRleF0gPSBlbGVtZW50O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjaGlsZH1cbiAgICAgICAgICA8L1Njcm9sbEl0ZW1XcmFwcGVyPlxuICAgICAgICApKX1cbiAgICAgIDwvU2Nyb2xsQ29udGFpbmVyPlxuICAgIDwvQm94PlxuICApO1xufTtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

var ScrollItemWrapper = /*#__PURE__*/_styled(Box, {
  target: "exjmry90",
  label: "ScrollItemWrapper"
})(process.env.NODE_ENV === "production" ? {
  name: "1f6ha6c",
  styles: "scroll-snap-align:start;&[aria-hidden='true']{visibility:hidden;}"
} : {
  name: "1f6ha6c",
  styles: "scroll-snap-align:start;&[aria-hidden='true']{visibility:hidden;}",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ib3Jpem9udGFsU2Nyb2xsTWVudS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYXFDIiwiZmlsZSI6Ii4uLy4uL3NyYy9Ib3Jpem9udGFsU2Nyb2xsTWVudS9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2ludGVyc2VjdGlvbi1vYnNlcnZlcic7XG5cbmltcG9ydCB7IEJveCwgRmxleEJveCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCwgeyBDaGlsZHJlbiwgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IFNjcm9sbENvbnRhaW5lciA9IHN0eWxlZChGbGV4Qm94KWBcbiAgc2Nyb2xsLXNuYXAtdHlwZTogeCBtYW5kYXRvcnk7XG4gIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbmA7XG5cbmNvbnN0IFNjcm9sbEl0ZW1XcmFwcGVyID0gc3R5bGVkKEJveClgXG4gIHNjcm9sbC1zbmFwLWFsaWduOiBzdGFydDtcbiAgJlthcmlhLWhpZGRlbj0ndHJ1ZSddIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIH1cbmA7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSG9yaXpvbnRhbFNjcm9sbE1lbnVQcm9wcyB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEhvcml6b250YWxTY3JvbGxNZW51OiBSZWFjdC5GQzxIb3Jpem9udGFsU2Nyb2xsTWVudVByb3BzPiA9ICh7XG4gIGNoaWxkcmVuLFxuICBjbGFzc05hbWUsXG59KSA9PiB7XG4gIGNvbnN0IGVsZW1lbnRzUmVmID0gdXNlUmVmPEhUTUxFbGVtZW50W10+KFtdKTtcbiAgY29uc3QgcGFyZW50Q29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgaW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG4gICAgICAoZW50cmllczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVtdKSA9PiB7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICBlbnRyeS50YXJnZXQuYXJpYUhpZGRlbiA9IGVudHJ5LmlzSW50ZXJzZWN0aW5nID8gJ2ZhbHNlJyA6ICd0cnVlJztcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByb290OiBwYXJlbnRDb250YWluZXJSZWYuY3VycmVudD8ucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAnW2RhdGEtb2JzZXJ2ZXJyb290PVwidHJ1ZVwiXSdcbiAgICAgICAgKSxcbiAgICAgICAgcm9vdE1hcmdpbjogJzEwMCUgMCUgMTAwJSAwJScsXG4gICAgICB9XG4gICAgKTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbnVtYmVyT2ZDaGlsZEVsZW1lbnRzID0gQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbikubGVuZ3RoO1xuXG4gICAgaWYgKGVsZW1lbnRzUmVmLmN1cnJlbnQubGVuZ3RoID09PSBudW1iZXJPZkNoaWxkRWxlbWVudHMpIHtcbiAgICAgIGVsZW1lbnRzUmVmLmN1cnJlbnQuZm9yRWFjaCgoZW50cnk6IEhUTUxFbGVtZW50KSA9PlxuICAgICAgICBpbnRlcnNlY3Rpb25PYnNlcnZlcj8ub2JzZXJ2ZShlbnRyeSlcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpbnRlcnNlY3Rpb25PYnNlcnZlcj8uZGlzY29ubmVjdCgpO1xuICAgIH07XG4gIH0sIFtlbGVtZW50c1JlZiwgaW50ZXJzZWN0aW9uT2JzZXJ2ZXIsIGNoaWxkcmVuXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IHBvc2l0aW9uPVwicmVsYXRpdmVcIj5cbiAgICAgIDxTY3JvbGxDb250YWluZXJcbiAgICAgICAgZGF0YS1vYnNlcnZlcnJvb3Q9XCJ0cnVlXCJcbiAgICAgICAgcmVmPXtwYXJlbnRDb250YWluZXJSZWZ9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICBwcj17MTZ9XG4gICAgICAgIG92ZXJmbG93WD1cInNjcm9sbFwiXG4gICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgPlxuICAgICAgICB7Q2hpbGRyZW4ubWFwKGNoaWxkcmVuLCAoY2hpbGQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgPFNjcm9sbEl0ZW1XcmFwcGVyXG4gICAgICAgICAgICByZWY9eyhlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNSZWYuY3VycmVudFtpbmRleF0gPSBlbGVtZW50O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjaGlsZH1cbiAgICAgICAgICA8L1Njcm9sbEl0ZW1XcmFwcGVyPlxuICAgICAgICApKX1cbiAgICAgIDwvU2Nyb2xsQ29udGFpbmVyPlxuICAgIDwvQm94PlxuICApO1xufTtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

export var HorizontalScrollMenu = function HorizontalScrollMenu(_ref) {
  var children = _ref.children,
      className = _ref.className;
  var elementsRef = useRef([]);
  var parentContainerRef = useRef(null);
  var intersectionObserver = useMemo(function () {
    var _parentContainerRef$c;

    if (typeof window === 'undefined') return null;
    return new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.ariaHidden = entry.isIntersecting ? 'false' : 'true';
      });
    }, {
      root: (_parentContainerRef$c = parentContainerRef.current) === null || _parentContainerRef$c === void 0 ? void 0 : _parentContainerRef$c.querySelector('[data-observerroot="true"]'),
      rootMargin: '100% 0% 100% 0%'
    });
  }, []);
  useEffect(function () {
    var numberOfChildElements = Children.toArray(children).length;

    if (elementsRef.current.length === numberOfChildElements) {
      elementsRef.current.forEach(function (entry) {
        return intersectionObserver === null || intersectionObserver === void 0 ? void 0 : intersectionObserver.observe(entry);
      });
    }

    return function () {
      intersectionObserver === null || intersectionObserver === void 0 ? void 0 : intersectionObserver.disconnect();
    };
  }, [elementsRef, intersectionObserver, children]);
  return /*#__PURE__*/React.createElement(Box, {
    position: "relative"
  }, /*#__PURE__*/React.createElement(ScrollContainer, {
    "data-observerroot": "true",
    ref: parentContainerRef,
    className: className,
    pr: 16,
    overflowX: "scroll",
    tabIndex: 0
  }, Children.map(children, function (child, index) {
    return /*#__PURE__*/React.createElement(ScrollItemWrapper, {
      ref: function ref(element) {
        if (element) {
          elementsRef.current[index] = element;
        }
      }
    }, child);
  })));
};