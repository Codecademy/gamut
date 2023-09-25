import _styled from "@emotion/styled/base";
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
import { Box, Markdown, Text } from '@codecademy/gamut';
import { mediaQueries } from '@codecademy/gamut-styles';
import * as React from 'react';
import { PausableImage } from '../PausableImage';
import { jsx as _jsx } from "react/jsx-runtime";
var Image = Box.withComponent('img', {
  target: "ee6vas02",
  label: "Image"
});
export var FeaturedImage = function FeaturedImage(_ref) {
  var src = _ref.src,
    alt = _ref.alt;
  return /*#__PURE__*/_jsx(Box, {
    width: 1,
    mb: 32,
    children: /*#__PURE__*/_jsx(PausableImage, {
      src: src,
      alt: alt,
      "data-testid": "feature-image"
    })
  });
};
export var FeaturedIcon = function FeaturedIcon(_ref2) {
  var src = _ref2.src,
    alt = _ref2.alt;
  return /*#__PURE__*/_jsx(Image, {
    alt: alt,
    src: src,
    mb: 32,
    width: "64px",
    "data-testid": "feature-icon"
  });
};
export var FeaturedStat = function FeaturedStat(_ref3) {
  var children = _ref3.children;
  return /*#__PURE__*/_jsx(Text, {
    as: "div",
    variant: "title-xxl",
    fontSize: {
      _: 44,
      lg: 64
    },
    "data-testid": "feature-stat",
    children: children
  });
};
export var FeaturedTitle = function FeaturedTitle(_ref4) {
  var as = _ref4.as,
    children = _ref4.children;
  return /*#__PURE__*/_jsx(Text, {
    as: as || 'h3',
    fontSize: {
      _: 22,
      lg: 26
    },
    children: children
  });
};
var StyledMarkdown = /*#__PURE__*/_styled(Markdown, {
  target: "ee6vas01",
  label: "StyledMarkdown"
})(process.env.NODE_ENV === "production" ? {
  name: "c1p463",
  styles: "ul,ol{padding:0;list-style-position:inside;}"
} : {
  name: "c1p463",
  styles: "ul,ol{padding:0;list-style-position:inside;}",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MYW5kaW5nUGFnZS9GZWF0dXJlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtRHVDIiwiZmlsZSI6Ii4uLy4uL3NyYy9MYW5kaW5nUGFnZS9GZWF0dXJlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJveCwgTWFya2Rvd24sIFRleHQsIFdpdGhDaGlsZHJlblByb3AgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBtZWRpYVF1ZXJpZXMgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBQYXVzYWJsZUltYWdlIH0gZnJvbSAnLi4vUGF1c2FibGVJbWFnZSc7XG5pbXBvcnQgeyBCYXNlUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgSW1hZ2UgPSBCb3gud2l0aENvbXBvbmVudCgnaW1nJyk7XG5cbmV4cG9ydCB0eXBlIEZlYXR1cmVkSW1hZ2VQcm9wcyA9IHtcbiAgc3JjOiBzdHJpbmc7XG4gIGFsdDogc3RyaW5nO1xufTtcbmV4cG9ydCBjb25zdCBGZWF0dXJlZEltYWdlOiBSZWFjdC5GQzxGZWF0dXJlZEltYWdlUHJvcHM+ID0gKHsgc3JjLCBhbHQgfSkgPT4gKFxuICA8Qm94IHdpZHRoPXsxfSBtYj17MzJ9PlxuICAgIDxQYXVzYWJsZUltYWdlIHNyYz17c3JjfSBhbHQ9e2FsdH0gZGF0YS10ZXN0aWQ9XCJmZWF0dXJlLWltYWdlXCIgLz5cbiAgPC9Cb3g+XG4pO1xuXG5leHBvcnQgdHlwZSBGZWF0dXJlZEljb25Qcm9wcyA9IHtcbiAgc3JjOiBzdHJpbmc7XG4gIGFsdDogc3RyaW5nO1xufTtcbmV4cG9ydCBjb25zdCBGZWF0dXJlZEljb246IFJlYWN0LkZDPEZlYXR1cmVkSWNvblByb3BzPiA9ICh7IHNyYywgYWx0IH0pID0+IChcbiAgPEltYWdlIGFsdD17YWx0fSBzcmM9e3NyY30gbWI9ezMyfSB3aWR0aD1cIjY0cHhcIiBkYXRhLXRlc3RpZD1cImZlYXR1cmUtaWNvblwiIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgRmVhdHVyZWRTdGF0OiBSZWFjdC5GQzxXaXRoQ2hpbGRyZW5Qcm9wPiA9ICh7IGNoaWxkcmVuIH0pID0+IChcbiAgPFRleHRcbiAgICBhcz1cImRpdlwiXG4gICAgdmFyaWFudD1cInRpdGxlLXh4bFwiXG4gICAgZm9udFNpemU9e3sgXzogNDQsIGxnOiA2NCB9fVxuICAgIGRhdGEtdGVzdGlkPVwiZmVhdHVyZS1zdGF0XCJcbiAgPlxuICAgIHtjaGlsZHJlbn1cbiAgPC9UZXh0PlxuKTtcblxuZXhwb3J0IGludGVyZmFjZSBGZWF0dXJlZFRpdGxlUHJvcHMgZXh0ZW5kcyBXaXRoQ2hpbGRyZW5Qcm9wIHtcbiAgYXM/OiAnaDEnIHwgJ2gyJyB8ICdoMycgfCAnaDQnIHwgJ2g1JyB8ICdoNic7XG59XG5leHBvcnQgY29uc3QgRmVhdHVyZWRUaXRsZTogUmVhY3QuRkM8RmVhdHVyZWRUaXRsZVByb3BzPiA9ICh7XG4gIGFzLFxuICBjaGlsZHJlbixcbn0pID0+IChcbiAgPFRleHQgYXM9e2FzIHx8ICdoMyd9IGZvbnRTaXplPXt7IF86IDIyLCBsZzogMjYgfX0+XG4gICAge2NoaWxkcmVufVxuICA8L1RleHQ+XG4pO1xuXG5jb25zdCBTdHlsZWRNYXJrZG93biA9IHN0eWxlZChNYXJrZG93bilgXG4gIHVsLFxuICBvbCB7XG4gICAgcGFkZGluZzogMDtcbiAgICBsaXN0LXN0eWxlLXBvc2l0aW9uOiBpbnNpZGU7XG4gIH1cbmA7XG5leHBvcnQgdHlwZSBGZWF0dXJlZERlc2NyaXB0aW9uUHJvcHMgPSBQaWNrPFxuICBCYXNlUHJvcHMsXG4gICdkZXNjJyB8ICdvbkFuY2hvckNsaWNrJ1xuPjtcbmV4cG9ydCBjb25zdCBGZWF0dXJlZERlc2NyaXB0aW9uOiBSZWFjdC5GQzxGZWF0dXJlZERlc2NyaXB0aW9uUHJvcHM+ID0gKHtcbiAgZGVzYyxcbiAgb25BbmNob3JDbGljayxcbn0pID0+IChcbiAgPFN0eWxlZE1hcmtkb3duIHRleHQ9e2Rlc2N9IHNwYWNpbmc9XCJub25lXCIgb25BbmNob3JDbGljaz17b25BbmNob3JDbGlja30gLz5cbik7XG5cbmNvbnN0IEZlYXR1cmVCbG9jayA9IHN0eWxlZC5kaXZgXG4gIGZsZXg6IDE7XG4gIG1hcmdpbi10b3A6IDJyZW07XG4gICR7bWVkaWFRdWVyaWVzLnNtfSB7XG4gICAgJjpub3QoOmxhc3Qtb2YtdHlwZSkge1xuICAgICAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xuXG4gICAgICAke21lZGlhUXVlcmllcy5sZ30ge1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDJyZW07XG4gICAgICB9XG4gICAgfVxuICB9XG5gO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZlYXR1cmVQcm9wcyBleHRlbmRzIFdpdGhDaGlsZHJlblByb3Age1xuICB0ZXN0SWQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBGZWF0dXJlOiBSZWFjdC5GQzxGZWF0dXJlUHJvcHM+ID0gKHsgdGVzdElkLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxGZWF0dXJlQmxvY2sgZGF0YS10ZXN0aWQ9e3Rlc3RJZH0+e2NoaWxkcmVufTwvRmVhdHVyZUJsb2NrPlxuKTtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
export var FeaturedDescription = function FeaturedDescription(_ref5) {
  var desc = _ref5.desc,
    onAnchorClick = _ref5.onAnchorClick;
  return /*#__PURE__*/_jsx(StyledMarkdown, {
    text: desc,
    spacing: "none",
    onAnchorClick: onAnchorClick
  });
};
var FeatureBlock = /*#__PURE__*/_styled("div", {
  target: "ee6vas00",
  label: "FeatureBlock"
})("flex:1;margin-top:2rem;", mediaQueries.sm, "{&:not(:last-of-type){margin-right:1rem;", mediaQueries.lg, "{margin-right:2rem;}}}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MYW5kaW5nUGFnZS9GZWF0dXJlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxRStCIiwiZmlsZSI6Ii4uLy4uL3NyYy9MYW5kaW5nUGFnZS9GZWF0dXJlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJveCwgTWFya2Rvd24sIFRleHQsIFdpdGhDaGlsZHJlblByb3AgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBtZWRpYVF1ZXJpZXMgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBQYXVzYWJsZUltYWdlIH0gZnJvbSAnLi4vUGF1c2FibGVJbWFnZSc7XG5pbXBvcnQgeyBCYXNlUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgSW1hZ2UgPSBCb3gud2l0aENvbXBvbmVudCgnaW1nJyk7XG5cbmV4cG9ydCB0eXBlIEZlYXR1cmVkSW1hZ2VQcm9wcyA9IHtcbiAgc3JjOiBzdHJpbmc7XG4gIGFsdDogc3RyaW5nO1xufTtcbmV4cG9ydCBjb25zdCBGZWF0dXJlZEltYWdlOiBSZWFjdC5GQzxGZWF0dXJlZEltYWdlUHJvcHM+ID0gKHsgc3JjLCBhbHQgfSkgPT4gKFxuICA8Qm94IHdpZHRoPXsxfSBtYj17MzJ9PlxuICAgIDxQYXVzYWJsZUltYWdlIHNyYz17c3JjfSBhbHQ9e2FsdH0gZGF0YS10ZXN0aWQ9XCJmZWF0dXJlLWltYWdlXCIgLz5cbiAgPC9Cb3g+XG4pO1xuXG5leHBvcnQgdHlwZSBGZWF0dXJlZEljb25Qcm9wcyA9IHtcbiAgc3JjOiBzdHJpbmc7XG4gIGFsdDogc3RyaW5nO1xufTtcbmV4cG9ydCBjb25zdCBGZWF0dXJlZEljb246IFJlYWN0LkZDPEZlYXR1cmVkSWNvblByb3BzPiA9ICh7IHNyYywgYWx0IH0pID0+IChcbiAgPEltYWdlIGFsdD17YWx0fSBzcmM9e3NyY30gbWI9ezMyfSB3aWR0aD1cIjY0cHhcIiBkYXRhLXRlc3RpZD1cImZlYXR1cmUtaWNvblwiIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgRmVhdHVyZWRTdGF0OiBSZWFjdC5GQzxXaXRoQ2hpbGRyZW5Qcm9wPiA9ICh7IGNoaWxkcmVuIH0pID0+IChcbiAgPFRleHRcbiAgICBhcz1cImRpdlwiXG4gICAgdmFyaWFudD1cInRpdGxlLXh4bFwiXG4gICAgZm9udFNpemU9e3sgXzogNDQsIGxnOiA2NCB9fVxuICAgIGRhdGEtdGVzdGlkPVwiZmVhdHVyZS1zdGF0XCJcbiAgPlxuICAgIHtjaGlsZHJlbn1cbiAgPC9UZXh0PlxuKTtcblxuZXhwb3J0IGludGVyZmFjZSBGZWF0dXJlZFRpdGxlUHJvcHMgZXh0ZW5kcyBXaXRoQ2hpbGRyZW5Qcm9wIHtcbiAgYXM/OiAnaDEnIHwgJ2gyJyB8ICdoMycgfCAnaDQnIHwgJ2g1JyB8ICdoNic7XG59XG5leHBvcnQgY29uc3QgRmVhdHVyZWRUaXRsZTogUmVhY3QuRkM8RmVhdHVyZWRUaXRsZVByb3BzPiA9ICh7XG4gIGFzLFxuICBjaGlsZHJlbixcbn0pID0+IChcbiAgPFRleHQgYXM9e2FzIHx8ICdoMyd9IGZvbnRTaXplPXt7IF86IDIyLCBsZzogMjYgfX0+XG4gICAge2NoaWxkcmVufVxuICA8L1RleHQ+XG4pO1xuXG5jb25zdCBTdHlsZWRNYXJrZG93biA9IHN0eWxlZChNYXJrZG93bilgXG4gIHVsLFxuICBvbCB7XG4gICAgcGFkZGluZzogMDtcbiAgICBsaXN0LXN0eWxlLXBvc2l0aW9uOiBpbnNpZGU7XG4gIH1cbmA7XG5leHBvcnQgdHlwZSBGZWF0dXJlZERlc2NyaXB0aW9uUHJvcHMgPSBQaWNrPFxuICBCYXNlUHJvcHMsXG4gICdkZXNjJyB8ICdvbkFuY2hvckNsaWNrJ1xuPjtcbmV4cG9ydCBjb25zdCBGZWF0dXJlZERlc2NyaXB0aW9uOiBSZWFjdC5GQzxGZWF0dXJlZERlc2NyaXB0aW9uUHJvcHM+ID0gKHtcbiAgZGVzYyxcbiAgb25BbmNob3JDbGljayxcbn0pID0+IChcbiAgPFN0eWxlZE1hcmtkb3duIHRleHQ9e2Rlc2N9IHNwYWNpbmc9XCJub25lXCIgb25BbmNob3JDbGljaz17b25BbmNob3JDbGlja30gLz5cbik7XG5cbmNvbnN0IEZlYXR1cmVCbG9jayA9IHN0eWxlZC5kaXZgXG4gIGZsZXg6IDE7XG4gIG1hcmdpbi10b3A6IDJyZW07XG4gICR7bWVkaWFRdWVyaWVzLnNtfSB7XG4gICAgJjpub3QoOmxhc3Qtb2YtdHlwZSkge1xuICAgICAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xuXG4gICAgICAke21lZGlhUXVlcmllcy5sZ30ge1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDJyZW07XG4gICAgICB9XG4gICAgfVxuICB9XG5gO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZlYXR1cmVQcm9wcyBleHRlbmRzIFdpdGhDaGlsZHJlblByb3Age1xuICB0ZXN0SWQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBGZWF0dXJlOiBSZWFjdC5GQzxGZWF0dXJlUHJvcHM+ID0gKHsgdGVzdElkLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxGZWF0dXJlQmxvY2sgZGF0YS10ZXN0aWQ9e3Rlc3RJZH0+e2NoaWxkcmVufTwvRmVhdHVyZUJsb2NrPlxuKTtcbiJdfQ== */"));
export var Feature = function Feature(_ref6) {
  var testId = _ref6.testId,
    children = _ref6.children;
  return /*#__PURE__*/_jsx(FeatureBlock, {
    "data-testid": testId,
    children: children
  });
};