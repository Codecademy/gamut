import _styled from "@emotion/styled/base";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

import { Anchor, Box } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import React, { useCallback } from 'react';
export var FooterLinkItems = /*#__PURE__*/_styled(Box, {
  target: "e14jx4vs1",
  label: "FooterLinkItems"
})(process.env.NODE_ENV === "production" ? {
  name: "ffhm6p",
  styles: "list-style-type:none"
} : {
  name: "ffhm6p",
  styles: "list-style-type:none",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTGlua3MudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU8wQyIsImZpbGUiOiIuLi8uLi9zcmMvR2xvYmFsRm9vdGVyL0Zvb3RlckxpbmtzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuY2hvciwgQm94IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudFByb3BzLCB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBGb290ZXJMaW5rSXRlbXMgPSBzdHlsZWQoQm94KWBcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuYDtcblxuRm9vdGVyTGlua0l0ZW1zLmRlZmF1bHRQcm9wcyA9IHtcbiAgYXM6ICd1bCcsXG4gIHBsOiAwLFxuICBtYjogMCxcbn07XG5cbmV4cG9ydCBjb25zdCBGb290ZXJMaW5rSXRlbSA9IHN0eWxlZC5saWBcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbWFyZ2luOiAwLjVyZW0gMDtcblxuICAke3RoZW1lLmJyZWFrcG9pbnRzLnNtfSB7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIG1hcmdpbjogMC4yNXJlbSAwO1xuICB9XG5cbiAgJHt0aGVtZS5icmVha3BvaW50cy5tZH0ge1xuICAgIG1hcmdpbjogMC4xNXJlbSAwO1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgRm9vdGVyTGlua0l0ZW1XaXRoQW5jaG9yOiBSZWFjdC5GQzxcbiAgQ29tcG9uZW50UHJvcHM8dHlwZW9mIEFuY2hvcj4gJiB7XG4gICAgdHJhY2tpbmdUYXJnZXQ6IHN0cmluZztcbiAgICBmb290ZXJPbkNsaWNrOiBHbG9iYWxGb290ZXJDbGlja0hhbmRsZXI7XG4gIH1cbj4gPSAoeyB0cmFja2luZ1RhcmdldCwgZm9vdGVyT25DbGljaywgLi4uYW5jaG9yUHJvcHMgfSkgPT4ge1xuICBjb25zdCBhbmNob3JPbkNsaWNrID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50KSA9PiB7XG4gICAgICBmb290ZXJPbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogdHJhY2tpbmdUYXJnZXQgfSk7XG4gICAgfSxcbiAgICBbZm9vdGVyT25DbGljaywgdHJhY2tpbmdUYXJnZXRdXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8Rm9vdGVyTGlua0l0ZW0+XG4gICAgICA8QW5jaG9yIHsuLi5hbmNob3JQcm9wc30gb25DbGljaz17YW5jaG9yT25DbGlja30gLz5cbiAgICA8L0Zvb3RlckxpbmtJdGVtPlxuICApO1xufTtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
FooterLinkItems.defaultProps = {
  as: 'ul',
  pl: 0,
  mb: 0
};
export var FooterLinkItem = _styled("li", {
  target: "e14jx4vs0",
  label: "FooterLinkItem"
})("font-size:0.875rem;margin:0.5rem 0;", theme.breakpoints.sm, "{font-size:1rem;margin:0.25rem 0;}", theme.breakpoints.md, "{margin:0.15rem 0;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTGlua3MudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlCdUMiLCJmaWxlIjoiLi4vLi4vc3JjL0dsb2JhbEZvb3Rlci9Gb290ZXJMaW5rcy50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmNob3IsIEJveCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnRQcm9wcywgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEdsb2JhbEZvb3RlckNsaWNrSGFuZGxlciB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgY29uc3QgRm9vdGVyTGlua0l0ZW1zID0gc3R5bGVkKEJveClgXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbmA7XG5cbkZvb3RlckxpbmtJdGVtcy5kZWZhdWx0UHJvcHMgPSB7XG4gIGFzOiAndWwnLFxuICBwbDogMCxcbiAgbWI6IDAsXG59O1xuXG5leHBvcnQgY29uc3QgRm9vdGVyTGlua0l0ZW0gPSBzdHlsZWQubGlgXG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIG1hcmdpbjogMC41cmVtIDA7XG5cbiAgJHt0aGVtZS5icmVha3BvaW50cy5zbX0ge1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICBtYXJnaW46IDAuMjVyZW0gMDtcbiAgfVxuXG4gICR7dGhlbWUuYnJlYWtwb2ludHMubWR9IHtcbiAgICBtYXJnaW46IDAuMTVyZW0gMDtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEZvb3RlckxpbmtJdGVtV2l0aEFuY2hvcjogUmVhY3QuRkM8XG4gIENvbXBvbmVudFByb3BzPHR5cGVvZiBBbmNob3I+ICYge1xuICAgIHRyYWNraW5nVGFyZ2V0OiBzdHJpbmc7XG4gICAgZm9vdGVyT25DbGljazogR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyO1xuICB9XG4+ID0gKHsgdHJhY2tpbmdUYXJnZXQsIGZvb3Rlck9uQ2xpY2ssIC4uLmFuY2hvclByb3BzIH0pID0+IHtcbiAgY29uc3QgYW5jaG9yT25DbGljayA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudCkgPT4ge1xuICAgICAgZm9vdGVyT25DbGljayh7IGV2ZW50LCB0YXJnZXQ6IHRyYWNraW5nVGFyZ2V0IH0pO1xuICAgIH0sXG4gICAgW2Zvb3Rlck9uQ2xpY2ssIHRyYWNraW5nVGFyZ2V0XVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPEZvb3RlckxpbmtJdGVtPlxuICAgICAgPEFuY2hvciB7Li4uYW5jaG9yUHJvcHN9IG9uQ2xpY2s9e2FuY2hvck9uQ2xpY2t9IC8+XG4gICAgPC9Gb290ZXJMaW5rSXRlbT5cbiAgKTtcbn07XG4iXX0= */"));
export var FooterLinkItemWithAnchor = function FooterLinkItemWithAnchor(_ref) {
  var trackingTarget = _ref.trackingTarget,
      footerOnClick = _ref.footerOnClick,
      anchorProps = _objectWithoutProperties(_ref, ["trackingTarget", "footerOnClick"]);

  var anchorOnClick = useCallback(function (event) {
    footerOnClick({
      event: event,
      target: trackingTarget
    });
  }, [footerOnClick, trackingTarget]);
  return /*#__PURE__*/React.createElement(FooterLinkItem, null, /*#__PURE__*/React.createElement(Anchor, _extends({}, anchorProps, {
    onClick: anchorOnClick
  })));
};