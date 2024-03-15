import _styled from "@emotion/styled/base";

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

import { Box, Markdown, Text } from '@codecademy/gamut';
import { mediaQueries } from '@codecademy/gamut-styles';
import React from 'react';
import { PausableImage } from '../PausableImage';
var Image = Box.withComponent('img', {
  target: "ee6vas02",
  label: "Image"
});
export var FeaturedImage = function FeaturedImage(_ref) {
  var src = _ref.src,
      alt = _ref.alt;
  return /*#__PURE__*/React.createElement(Box, {
    width: 1,
    mb: 32
  }, /*#__PURE__*/React.createElement(PausableImage, {
    src: src,
    alt: alt,
    "data-testid": "feature-image"
  }));
};
export var FeaturedIcon = function FeaturedIcon(_ref2) {
  var src = _ref2.src,
      alt = _ref2.alt;
  return /*#__PURE__*/React.createElement(Image, {
    alt: alt,
    src: src,
    mb: 32,
    width: "64px",
    "data-testid": "feature-icon"
  });
};
export var FeaturedStat = function FeaturedStat(_ref3) {
  var children = _ref3.children;
  return /*#__PURE__*/React.createElement(Text, {
    as: "div",
    variant: "title-xxl",
    fontSize: {
      _: 44,
      lg: 64
    },
    "data-testid": "feature-stat"
  }, children);
};
export var FeaturedTitle = function FeaturedTitle(_ref4) {
  var as = _ref4.as,
      children = _ref4.children;
  return /*#__PURE__*/React.createElement(Text, {
    as: as || 'h3',
    fontSize: {
      _: 22,
      lg: 26
    }
  }, children);
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
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MYW5kaW5nUGFnZS9GZWF0dXJlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtRHVDIiwiZmlsZSI6Ii4uLy4uL3NyYy9MYW5kaW5nUGFnZS9GZWF0dXJlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJveCwgTWFya2Rvd24sIFRleHQgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBtZWRpYVF1ZXJpZXMgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgUGF1c2FibGVJbWFnZSB9IGZyb20gJy4uL1BhdXNhYmxlSW1hZ2UnO1xuaW1wb3J0IHsgQmFzZVByb3BzIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IEltYWdlID0gQm94LndpdGhDb21wb25lbnQoJ2ltZycpO1xuXG5leHBvcnQgdHlwZSBGZWF0dXJlZEltYWdlUHJvcHMgPSB7XG4gIHNyYzogc3RyaW5nO1xuICBhbHQ6IHN0cmluZztcbn07XG5leHBvcnQgY29uc3QgRmVhdHVyZWRJbWFnZTogUmVhY3QuRkM8RmVhdHVyZWRJbWFnZVByb3BzPiA9ICh7IHNyYywgYWx0IH0pID0+IChcbiAgPEJveCB3aWR0aD17MX0gbWI9ezMyfT5cbiAgICA8UGF1c2FibGVJbWFnZSBzcmM9e3NyY30gYWx0PXthbHR9IGRhdGEtdGVzdGlkPVwiZmVhdHVyZS1pbWFnZVwiIC8+XG4gIDwvQm94PlxuKTtcblxuZXhwb3J0IHR5cGUgRmVhdHVyZWRJY29uUHJvcHMgPSB7XG4gIHNyYzogc3RyaW5nO1xuICBhbHQ6IHN0cmluZztcbn07XG5leHBvcnQgY29uc3QgRmVhdHVyZWRJY29uOiBSZWFjdC5GQzxGZWF0dXJlZEljb25Qcm9wcz4gPSAoeyBzcmMsIGFsdCB9KSA9PiAoXG4gIDxJbWFnZSBhbHQ9e2FsdH0gc3JjPXtzcmN9IG1iPXszMn0gd2lkdGg9XCI2NHB4XCIgZGF0YS10ZXN0aWQ9XCJmZWF0dXJlLWljb25cIiAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IEZlYXR1cmVkU3RhdDogUmVhY3QuRkMgPSAoeyBjaGlsZHJlbiB9KSA9PiAoXG4gIDxUZXh0XG4gICAgYXM9XCJkaXZcIlxuICAgIHZhcmlhbnQ9XCJ0aXRsZS14eGxcIlxuICAgIGZvbnRTaXplPXt7IF86IDQ0LCBsZzogNjQgfX1cbiAgICBkYXRhLXRlc3RpZD1cImZlYXR1cmUtc3RhdFwiXG4gID5cbiAgICB7Y2hpbGRyZW59XG4gIDwvVGV4dD5cbik7XG5cbmV4cG9ydCB0eXBlIEZlYXR1cmVkVGl0bGVQcm9wcyA9IHtcbiAgYXM/OiAnaDEnIHwgJ2gyJyB8ICdoMycgfCAnaDQnIHwgJ2g1JyB8ICdoNic7XG59O1xuZXhwb3J0IGNvbnN0IEZlYXR1cmVkVGl0bGU6IFJlYWN0LkZDPEZlYXR1cmVkVGl0bGVQcm9wcz4gPSAoe1xuICBhcyxcbiAgY2hpbGRyZW4sXG59KSA9PiAoXG4gIDxUZXh0IGFzPXthcyB8fCAnaDMnfSBmb250U2l6ZT17eyBfOiAyMiwgbGc6IDI2IH19PlxuICAgIHtjaGlsZHJlbn1cbiAgPC9UZXh0PlxuKTtcblxuY29uc3QgU3R5bGVkTWFya2Rvd24gPSBzdHlsZWQoTWFya2Rvd24pYFxuICB1bCxcbiAgb2wge1xuICAgIHBhZGRpbmc6IDA7XG4gICAgbGlzdC1zdHlsZS1wb3NpdGlvbjogaW5zaWRlO1xuICB9XG5gO1xuZXhwb3J0IHR5cGUgRmVhdHVyZWREZXNjcmlwdGlvblByb3BzID0gUGljazxcbiAgQmFzZVByb3BzLFxuICAnZGVzYycgfCAnb25BbmNob3JDbGljaydcbj47XG5leHBvcnQgY29uc3QgRmVhdHVyZWREZXNjcmlwdGlvbjogUmVhY3QuRkM8RmVhdHVyZWREZXNjcmlwdGlvblByb3BzPiA9ICh7XG4gIGRlc2MsXG4gIG9uQW5jaG9yQ2xpY2ssXG59KSA9PiAoXG4gIDxTdHlsZWRNYXJrZG93biB0ZXh0PXtkZXNjfSBzcGFjaW5nPVwibm9uZVwiIG9uQW5jaG9yQ2xpY2s9e29uQW5jaG9yQ2xpY2t9IC8+XG4pO1xuXG5jb25zdCBGZWF0dXJlQmxvY2sgPSBzdHlsZWQuZGl2YFxuICBmbGV4OiAxO1xuICBtYXJnaW4tdG9wOiAycmVtO1xuICAke21lZGlhUXVlcmllcy5zbX0ge1xuICAgICY6bm90KDpsYXN0LW9mLXR5cGUpIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMXJlbTtcblxuICAgICAgJHttZWRpYVF1ZXJpZXMubGd9IHtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAycmVtO1xuICAgICAgfVxuICAgIH1cbiAgfVxuYDtcbmV4cG9ydCB0eXBlIEZlYXR1cmVQcm9wcyA9IHtcbiAgdGVzdElkPzogc3RyaW5nO1xufTtcbmV4cG9ydCBjb25zdCBGZWF0dXJlOiBSZWFjdC5GQzxGZWF0dXJlUHJvcHM+ID0gKHsgdGVzdElkLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxGZWF0dXJlQmxvY2sgZGF0YS10ZXN0aWQ9e3Rlc3RJZH0+e2NoaWxkcmVufTwvRmVhdHVyZUJsb2NrPlxuKTtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

export var FeaturedDescription = function FeaturedDescription(_ref5) {
  var desc = _ref5.desc,
      onAnchorClick = _ref5.onAnchorClick;
  return /*#__PURE__*/React.createElement(StyledMarkdown, {
    text: desc,
    spacing: "none",
    onAnchorClick: onAnchorClick
  });
};

var FeatureBlock = _styled("div", {
  target: "ee6vas00",
  label: "FeatureBlock"
})("flex:1;margin-top:2rem;", mediaQueries.sm, "{&:not(:last-of-type){margin-right:1rem;", mediaQueries.lg, "{margin-right:2rem;}}}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MYW5kaW5nUGFnZS9GZWF0dXJlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxRStCIiwiZmlsZSI6Ii4uLy4uL3NyYy9MYW5kaW5nUGFnZS9GZWF0dXJlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJveCwgTWFya2Rvd24sIFRleHQgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBtZWRpYVF1ZXJpZXMgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgUGF1c2FibGVJbWFnZSB9IGZyb20gJy4uL1BhdXNhYmxlSW1hZ2UnO1xuaW1wb3J0IHsgQmFzZVByb3BzIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IEltYWdlID0gQm94LndpdGhDb21wb25lbnQoJ2ltZycpO1xuXG5leHBvcnQgdHlwZSBGZWF0dXJlZEltYWdlUHJvcHMgPSB7XG4gIHNyYzogc3RyaW5nO1xuICBhbHQ6IHN0cmluZztcbn07XG5leHBvcnQgY29uc3QgRmVhdHVyZWRJbWFnZTogUmVhY3QuRkM8RmVhdHVyZWRJbWFnZVByb3BzPiA9ICh7IHNyYywgYWx0IH0pID0+IChcbiAgPEJveCB3aWR0aD17MX0gbWI9ezMyfT5cbiAgICA8UGF1c2FibGVJbWFnZSBzcmM9e3NyY30gYWx0PXthbHR9IGRhdGEtdGVzdGlkPVwiZmVhdHVyZS1pbWFnZVwiIC8+XG4gIDwvQm94PlxuKTtcblxuZXhwb3J0IHR5cGUgRmVhdHVyZWRJY29uUHJvcHMgPSB7XG4gIHNyYzogc3RyaW5nO1xuICBhbHQ6IHN0cmluZztcbn07XG5leHBvcnQgY29uc3QgRmVhdHVyZWRJY29uOiBSZWFjdC5GQzxGZWF0dXJlZEljb25Qcm9wcz4gPSAoeyBzcmMsIGFsdCB9KSA9PiAoXG4gIDxJbWFnZSBhbHQ9e2FsdH0gc3JjPXtzcmN9IG1iPXszMn0gd2lkdGg9XCI2NHB4XCIgZGF0YS10ZXN0aWQ9XCJmZWF0dXJlLWljb25cIiAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IEZlYXR1cmVkU3RhdDogUmVhY3QuRkMgPSAoeyBjaGlsZHJlbiB9KSA9PiAoXG4gIDxUZXh0XG4gICAgYXM9XCJkaXZcIlxuICAgIHZhcmlhbnQ9XCJ0aXRsZS14eGxcIlxuICAgIGZvbnRTaXplPXt7IF86IDQ0LCBsZzogNjQgfX1cbiAgICBkYXRhLXRlc3RpZD1cImZlYXR1cmUtc3RhdFwiXG4gID5cbiAgICB7Y2hpbGRyZW59XG4gIDwvVGV4dD5cbik7XG5cbmV4cG9ydCB0eXBlIEZlYXR1cmVkVGl0bGVQcm9wcyA9IHtcbiAgYXM/OiAnaDEnIHwgJ2gyJyB8ICdoMycgfCAnaDQnIHwgJ2g1JyB8ICdoNic7XG59O1xuZXhwb3J0IGNvbnN0IEZlYXR1cmVkVGl0bGU6IFJlYWN0LkZDPEZlYXR1cmVkVGl0bGVQcm9wcz4gPSAoe1xuICBhcyxcbiAgY2hpbGRyZW4sXG59KSA9PiAoXG4gIDxUZXh0IGFzPXthcyB8fCAnaDMnfSBmb250U2l6ZT17eyBfOiAyMiwgbGc6IDI2IH19PlxuICAgIHtjaGlsZHJlbn1cbiAgPC9UZXh0PlxuKTtcblxuY29uc3QgU3R5bGVkTWFya2Rvd24gPSBzdHlsZWQoTWFya2Rvd24pYFxuICB1bCxcbiAgb2wge1xuICAgIHBhZGRpbmc6IDA7XG4gICAgbGlzdC1zdHlsZS1wb3NpdGlvbjogaW5zaWRlO1xuICB9XG5gO1xuZXhwb3J0IHR5cGUgRmVhdHVyZWREZXNjcmlwdGlvblByb3BzID0gUGljazxcbiAgQmFzZVByb3BzLFxuICAnZGVzYycgfCAnb25BbmNob3JDbGljaydcbj47XG5leHBvcnQgY29uc3QgRmVhdHVyZWREZXNjcmlwdGlvbjogUmVhY3QuRkM8RmVhdHVyZWREZXNjcmlwdGlvblByb3BzPiA9ICh7XG4gIGRlc2MsXG4gIG9uQW5jaG9yQ2xpY2ssXG59KSA9PiAoXG4gIDxTdHlsZWRNYXJrZG93biB0ZXh0PXtkZXNjfSBzcGFjaW5nPVwibm9uZVwiIG9uQW5jaG9yQ2xpY2s9e29uQW5jaG9yQ2xpY2t9IC8+XG4pO1xuXG5jb25zdCBGZWF0dXJlQmxvY2sgPSBzdHlsZWQuZGl2YFxuICBmbGV4OiAxO1xuICBtYXJnaW4tdG9wOiAycmVtO1xuICAke21lZGlhUXVlcmllcy5zbX0ge1xuICAgICY6bm90KDpsYXN0LW9mLXR5cGUpIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMXJlbTtcblxuICAgICAgJHttZWRpYVF1ZXJpZXMubGd9IHtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAycmVtO1xuICAgICAgfVxuICAgIH1cbiAgfVxuYDtcbmV4cG9ydCB0eXBlIEZlYXR1cmVQcm9wcyA9IHtcbiAgdGVzdElkPzogc3RyaW5nO1xufTtcbmV4cG9ydCBjb25zdCBGZWF0dXJlOiBSZWFjdC5GQzxGZWF0dXJlUHJvcHM+ID0gKHsgdGVzdElkLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxGZWF0dXJlQmxvY2sgZGF0YS10ZXN0aWQ9e3Rlc3RJZH0+e2NoaWxkcmVufTwvRmVhdHVyZUJsb2NrPlxuKTtcbiJdfQ== */"));

export var Feature = function Feature(_ref6) {
  var testId = _ref6.testId,
      children = _ref6.children;
  return /*#__PURE__*/React.createElement(FeatureBlock, {
    "data-testid": testId
  }, children);
};