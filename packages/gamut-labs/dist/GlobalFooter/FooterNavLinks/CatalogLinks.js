import _styled from "@emotion/styled/base";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
import { Anchor, Box } from '@codecademy/gamut';
import { theme, themed, variant } from '@codecademy/gamut-styles';
import * as React from 'react';
import { FooterHeading } from '../FooterHeading';
import { FooterLinkItem, FooterLinkItems } from '../FooterLinks';
import { FooterSubHeading } from '../FooterSubHeading';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var CatalogLinksContainer = /*#__PURE__*/_styled("div", {
  target: "e662mk52",
  label: "CatalogLinksContainer"
})("border-top:1px solid ", themed('colors.navy'), ";margin-top:2rem;", theme.breakpoints.sm, "{padding-top:2rem;}", theme.breakpoints.md, "{border-left:1px solid ", function (_ref) {
  var theme = _ref.theme;
  return theme.colors.navy;
}, ";border-top:none;margin-left:0;margin-top:0;padding-left:2rem;padding-top:0;}", theme.breakpoints.lg, "{padding-left:4rem;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ2F0YWxvZ0xpbmtzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVd0MiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL0dsb2JhbEZvb3Rlci9Gb290ZXJOYXZMaW5rcy9DYXRhbG9nTGlua3MudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5jaG9yLCBCb3ggfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyB0aGVtZSwgdGhlbWVkLCB2YXJpYW50IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgRm9vdGVySGVhZGluZyB9IGZyb20gJy4uL0Zvb3RlckhlYWRpbmcnO1xuaW1wb3J0IHsgRm9vdGVyTGlua0l0ZW0sIEZvb3RlckxpbmtJdGVtcyB9IGZyb20gJy4uL0Zvb3RlckxpbmtzJztcbmltcG9ydCB7IEZvb3RlclN1YkhlYWRpbmcgfSBmcm9tICcuLi9Gb290ZXJTdWJIZWFkaW5nJztcbmltcG9ydCB7IEdsb2JhbEZvb3RlckNsaWNrSGFuZGxlciB9IGZyb20gJy4uL3R5cGVzJztcblxuY29uc3QgQ2F0YWxvZ0xpbmtzQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICR7dGhlbWVkKCdjb2xvcnMubmF2eScpfTtcbiAgbWFyZ2luLXRvcDogMnJlbTtcblxuICAke3RoZW1lLmJyZWFrcG9pbnRzLnNtfSB7XG4gICAgcGFkZGluZy10b3A6IDJyZW07XG4gIH1cblxuICAke3RoZW1lLmJyZWFrcG9pbnRzLm1kfSB7XG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmNvbG9ycy5uYXZ5fTtcbiAgICBib3JkZXItdG9wOiBub25lO1xuICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgIG1hcmdpbi10b3A6IDA7XG4gICAgcGFkZGluZy1sZWZ0OiAycmVtO1xuICAgIHBhZGRpbmctdG9wOiAwO1xuICB9XG5cbiAgJHt0aGVtZS5icmVha3BvaW50cy5sZ30ge1xuICAgIHBhZGRpbmctbGVmdDogNHJlbTtcbiAgfVxuYDtcblxuY29uc3QgQ2F0YWxvZ0xpbmtBcmVhID0gc3R5bGVkKEZvb3RlckxpbmtJdGVtcyk8eyB2YXJpYW50PzogJ2Z1bGxIZWlnaHQnIH0+YFxuICBkaXNwbGF5OiBmbGV4O1xuICBtYXgtaGVpZ2h0OiAxNHJlbTtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuXG4gICR7dmFyaWFudCh7IHZhcmlhbnRzOiB7IGZ1bGxIZWlnaHQ6IHsgbWF4SGVpZ2h0OiB7IG1kOiAnbm9uZScgfSB9IH0gfSl9XG5gO1xuXG5jb25zdCBDYXRhbG9nRm9vdGVyTGlua0l0ZW0gPSBzdHlsZWQoRm9vdGVyTGlua0l0ZW0pYFxuICBtYXJnaW46IDAuMjVyZW0gMDtcbmA7XG5cbmNvbnN0IGxhbmd1YWdlcyA9IFtcbiAgWydodG1sLWNzcycsICdIVE1MICYgQ1NTJ10sXG4gIFsncHl0aG9uJywgJ1B5dGhvbiddLFxuICBbJ2phdmFzY3JpcHQnLCAnSmF2YVNjcmlwdCddLFxuICBbJ2phdmEnLCAnSmF2YSddLFxuICBbJ3NxbCcsICdTUUwnXSxcbiAgWydiYXNoJywgJ0Jhc2gvU2hlbGwnXSxcbiAgWydydWJ5JywgJ1J1YnknXSxcbiAgWydjLXBsdXMtcGx1cycsICdDKysnXSxcbiAgWydyJywgJ1InXSxcbiAgWydjLXNoYXJwJywgJ0MjJ10sXG4gIFsncGhwJywgJ1BIUCddLFxuICBbJ2dvJywgJ0dvJ10sXG4gIFsnc3dpZnQnLCAnU3dpZnQnXSxcbiAgWydrb3RsaW4nLCAnS290bGluJ10sXG5dO1xuXG5jb25zdCBzdWJqZWN0cyA9IFtcbiAgWyd3ZWItZGV2ZWxvcG1lbnQnLCAnV2ViIERldmVsb3BtZW50J10sXG4gIFsnZGF0YS1zY2llbmNlJywgJ0RhdGEgU2NpZW5jZSddLFxuICBbJ2NvbXB1dGVyLXNjaWVuY2UnLCAnQ29tcHV0ZXIgU2NpZW5jZSddLFxuICBbJ2RldmVsb3Blci10b29scycsICdEZXZlbG9wZXIgVG9vbHMnXSxcbiAgWydtYWNoaW5lLWxlYXJuaW5nJywgJ01hY2hpbmUgTGVhcm5pbmcnXSxcbiAgWydjb2RlLWZvdW5kYXRpb25zJywgJ0NvZGUgRm91bmRhdGlvbnMnXSxcbiAgWyd3ZWItZGVzaWduJywgJ1dlYiBEZXNpZ24nXSxcbl07XG5cbmV4cG9ydCB0eXBlIENhdGFsb2dMaW5rc1Byb3BzID0ge1xuICBvbkNsaWNrOiBHbG9iYWxGb290ZXJDbGlja0hhbmRsZXI7XG59O1xuXG5leHBvcnQgY29uc3QgQ2F0YWxvZ0xpbmtzOiBSZWFjdC5GQzxDYXRhbG9nTGlua3NQcm9wcz4gPSAoeyBvbkNsaWNrIH0pID0+IHtcbiAgY29uc3QgbGFuZ3VhZ2VzTGlzdCA9IChcbiAgICA8PlxuICAgICAgPEZvb3RlclN1YkhlYWRpbmcgYXM9XCJoM1wiPkxhbmd1YWdlczwvRm9vdGVyU3ViSGVhZGluZz5cbiAgICAgIDxDYXRhbG9nTGlua0FyZWE+XG4gICAgICAgIHtsYW5ndWFnZXMubWFwKChbc2x1ZywgdGV4dF0pID0+IChcbiAgICAgICAgICA8Q2F0YWxvZ0Zvb3RlckxpbmtJdGVtIGtleT17c2x1Z30+XG4gICAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICAgIGhyZWY9e2AvY2F0YWxvZy9sYW5ndWFnZS8ke3NsdWd9YH1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogc2x1ZyB9KX1cbiAgICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0ZXh0fVxuICAgICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgICAgPC9DYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICkpfVxuICAgICAgPC9DYXRhbG9nTGlua0FyZWE+XG4gICAgPC8+XG4gICk7XG5cbiAgY29uc3Qgc3ViamVjdHNMaXN0ID0gKFxuICAgIDxCb3ggd2lkdGg9e3sgXzogJzEwMCUnLCBtZDogJzUwJScgfX0+XG4gICAgICA8Rm9vdGVyU3ViSGVhZGluZyBhcz1cImgzXCI+U3ViamVjdHM8L0Zvb3RlclN1YkhlYWRpbmc+XG4gICAgICA8Q2F0YWxvZ0xpbmtBcmVhIHZhcmlhbnQ9XCJmdWxsSGVpZ2h0XCI+XG4gICAgICAgIHtzdWJqZWN0cy5tYXAoKFtzbHVnLCB0ZXh0XSkgPT4gKFxuICAgICAgICAgIDxDYXRhbG9nRm9vdGVyTGlua0l0ZW0ga2V5PXtzbHVnfT5cbiAgICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgICAgaHJlZj17YC9jYXRhbG9nL3N1YmplY3QvJHtzbHVnfWB9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6IHNsdWcgfSl9XG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGV4dH1cbiAgICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICAgIDwvQ2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICApKX1cbiAgICAgICAgPENhdGFsb2dGb290ZXJMaW5rSXRlbSBhcmlhLWhpZGRlbj7igJQ8L0NhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgPENhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiL2NhdGFsb2cvYWxsXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdmdWxsQ2F0YWxvZycgfSl9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBGdWxsIENhdGFsb2dcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9DYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxDYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cIi9jYXRhbG9nL3N1YmplY3QvYmV0YVwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnYmV0YUNvbnRlbnQnIH0pfVxuICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgQmV0YSBDb250ZW50XG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvQ2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Q2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCJodHRwczovL3RyZWxsby5jb20vYi92QWdEWHRUNi9jb2RlY2FkZW15LXJlbGVhc2VzLXJvYWRtYXBcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ3JvYWRtYXAnIH0pfVxuICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgUm9hZG1hcFxuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0NhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgIDwvQ2F0YWxvZ0xpbmtBcmVhPlxuICAgIDwvQm94PlxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPENhdGFsb2dMaW5rc0NvbnRhaW5lcj5cbiAgICAgIDxGb290ZXJIZWFkaW5nPkNvdXJzZSBDYXRhbG9nPC9Gb290ZXJIZWFkaW5nPlxuICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGZsZXhEaXJlY3Rpb249e3sgXzogJ2NvbHVtbicsIHNtOiAncm93JyB9fT5cbiAgICAgICAgPEJveFxuICAgICAgICAgIGRpc3BsYXk9e3sgXzogJ2Jsb2NrJywgbWQ6ICdub25lJyB9fVxuICAgICAgICAgIHdpZHRoPXt7IF86ICcxMDAlJywgbWQ6ICc1MCUnIH19XG4gICAgICAgID5cbiAgICAgICAgICB7bGFuZ3VhZ2VzTGlzdH1cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIHtzdWJqZWN0c0xpc3R9XG4gICAgICAgIDxCb3hcbiAgICAgICAgICBkaXNwbGF5PXt7IF86ICdub25lJywgbWQ6ICdibG9jaycgfX1cbiAgICAgICAgICB3aWR0aD17eyBfOiAnMTAwJScsIG1kOiAnNTAlJyB9fVxuICAgICAgICA+XG4gICAgICAgICAge2xhbmd1YWdlc0xpc3R9XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Cb3g+XG4gICAgPC9DYXRhbG9nTGlua3NDb250YWluZXI+XG4gICk7XG59O1xuIl19 */"));
var CatalogLinkArea = /*#__PURE__*/_styled(FooterLinkItems, {
  target: "e662mk51",
  label: "CatalogLinkArea"
})("display:flex;max-height:14rem;flex-direction:column;flex-wrap:wrap;margin-bottom:1rem;", variant({
  variants: {
    fullHeight: {
      maxHeight: {
        md: 'none'
      }
    }
  }
}), ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ2F0YWxvZ0xpbmtzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQzJFIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ2F0YWxvZ0xpbmtzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuY2hvciwgQm94IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgdGhlbWUsIHRoZW1lZCwgdmFyaWFudCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEZvb3RlckhlYWRpbmcgfSBmcm9tICcuLi9Gb290ZXJIZWFkaW5nJztcbmltcG9ydCB7IEZvb3RlckxpbmtJdGVtLCBGb290ZXJMaW5rSXRlbXMgfSBmcm9tICcuLi9Gb290ZXJMaW5rcyc7XG5pbXBvcnQgeyBGb290ZXJTdWJIZWFkaW5nIH0gZnJvbSAnLi4vRm9vdGVyU3ViSGVhZGluZyc7XG5pbXBvcnQgeyBHbG9iYWxGb290ZXJDbGlja0hhbmRsZXIgfSBmcm9tICcuLi90eXBlcyc7XG5cbmNvbnN0IENhdGFsb2dMaW5rc0NvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAke3RoZW1lZCgnY29sb3JzLm5hdnknKX07XG4gIG1hcmdpbi10b3A6IDJyZW07XG5cbiAgJHt0aGVtZS5icmVha3BvaW50cy5zbX0ge1xuICAgIHBhZGRpbmctdG9wOiAycmVtO1xuICB9XG5cbiAgJHt0aGVtZS5icmVha3BvaW50cy5tZH0ge1xuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS5jb2xvcnMubmF2eX07XG4gICAgYm9yZGVyLXRvcDogbm9uZTtcbiAgICBtYXJnaW4tbGVmdDogMDtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICAgIHBhZGRpbmctbGVmdDogMnJlbTtcbiAgICBwYWRkaW5nLXRvcDogMDtcbiAgfVxuXG4gICR7dGhlbWUuYnJlYWtwb2ludHMubGd9IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDRyZW07XG4gIH1cbmA7XG5cbmNvbnN0IENhdGFsb2dMaW5rQXJlYSA9IHN0eWxlZChGb290ZXJMaW5rSXRlbXMpPHsgdmFyaWFudD86ICdmdWxsSGVpZ2h0JyB9PmBcbiAgZGlzcGxheTogZmxleDtcbiAgbWF4LWhlaWdodDogMTRyZW07XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcblxuICAke3ZhcmlhbnQoeyB2YXJpYW50czogeyBmdWxsSGVpZ2h0OiB7IG1heEhlaWdodDogeyBtZDogJ25vbmUnIH0gfSB9IH0pfVxuYDtcblxuY29uc3QgQ2F0YWxvZ0Zvb3RlckxpbmtJdGVtID0gc3R5bGVkKEZvb3RlckxpbmtJdGVtKWBcbiAgbWFyZ2luOiAwLjI1cmVtIDA7XG5gO1xuXG5jb25zdCBsYW5ndWFnZXMgPSBbXG4gIFsnaHRtbC1jc3MnLCAnSFRNTCAmIENTUyddLFxuICBbJ3B5dGhvbicsICdQeXRob24nXSxcbiAgWydqYXZhc2NyaXB0JywgJ0phdmFTY3JpcHQnXSxcbiAgWydqYXZhJywgJ0phdmEnXSxcbiAgWydzcWwnLCAnU1FMJ10sXG4gIFsnYmFzaCcsICdCYXNoL1NoZWxsJ10sXG4gIFsncnVieScsICdSdWJ5J10sXG4gIFsnYy1wbHVzLXBsdXMnLCAnQysrJ10sXG4gIFsncicsICdSJ10sXG4gIFsnYy1zaGFycCcsICdDIyddLFxuICBbJ3BocCcsICdQSFAnXSxcbiAgWydnbycsICdHbyddLFxuICBbJ3N3aWZ0JywgJ1N3aWZ0J10sXG4gIFsna290bGluJywgJ0tvdGxpbiddLFxuXTtcblxuY29uc3Qgc3ViamVjdHMgPSBbXG4gIFsnd2ViLWRldmVsb3BtZW50JywgJ1dlYiBEZXZlbG9wbWVudCddLFxuICBbJ2RhdGEtc2NpZW5jZScsICdEYXRhIFNjaWVuY2UnXSxcbiAgWydjb21wdXRlci1zY2llbmNlJywgJ0NvbXB1dGVyIFNjaWVuY2UnXSxcbiAgWydkZXZlbG9wZXItdG9vbHMnLCAnRGV2ZWxvcGVyIFRvb2xzJ10sXG4gIFsnbWFjaGluZS1sZWFybmluZycsICdNYWNoaW5lIExlYXJuaW5nJ10sXG4gIFsnY29kZS1mb3VuZGF0aW9ucycsICdDb2RlIEZvdW5kYXRpb25zJ10sXG4gIFsnd2ViLWRlc2lnbicsICdXZWIgRGVzaWduJ10sXG5dO1xuXG5leHBvcnQgdHlwZSBDYXRhbG9nTGlua3NQcm9wcyA9IHtcbiAgb25DbGljazogR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyO1xufTtcblxuZXhwb3J0IGNvbnN0IENhdGFsb2dMaW5rczogUmVhY3QuRkM8Q2F0YWxvZ0xpbmtzUHJvcHM+ID0gKHsgb25DbGljayB9KSA9PiB7XG4gIGNvbnN0IGxhbmd1YWdlc0xpc3QgPSAoXG4gICAgPD5cbiAgICAgIDxGb290ZXJTdWJIZWFkaW5nIGFzPVwiaDNcIj5MYW5ndWFnZXM8L0Zvb3RlclN1YkhlYWRpbmc+XG4gICAgICA8Q2F0YWxvZ0xpbmtBcmVhPlxuICAgICAgICB7bGFuZ3VhZ2VzLm1hcCgoW3NsdWcsIHRleHRdKSA9PiAoXG4gICAgICAgICAgPENhdGFsb2dGb290ZXJMaW5rSXRlbSBrZXk9e3NsdWd9PlxuICAgICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgICBocmVmPXtgL2NhdGFsb2cvbGFuZ3VhZ2UvJHtzbHVnfWB9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6IHNsdWcgfSl9XG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGV4dH1cbiAgICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICAgIDwvQ2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICApKX1cbiAgICAgIDwvQ2F0YWxvZ0xpbmtBcmVhPlxuICAgIDwvPlxuICApO1xuXG4gIGNvbnN0IHN1YmplY3RzTGlzdCA9IChcbiAgICA8Qm94IHdpZHRoPXt7IF86ICcxMDAlJywgbWQ6ICc1MCUnIH19PlxuICAgICAgPEZvb3RlclN1YkhlYWRpbmcgYXM9XCJoM1wiPlN1YmplY3RzPC9Gb290ZXJTdWJIZWFkaW5nPlxuICAgICAgPENhdGFsb2dMaW5rQXJlYSB2YXJpYW50PVwiZnVsbEhlaWdodFwiPlxuICAgICAgICB7c3ViamVjdHMubWFwKChbc2x1ZywgdGV4dF0pID0+IChcbiAgICAgICAgICA8Q2F0YWxvZ0Zvb3RlckxpbmtJdGVtIGtleT17c2x1Z30+XG4gICAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICAgIGhyZWY9e2AvY2F0YWxvZy9zdWJqZWN0LyR7c2x1Z31gfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiBzbHVnIH0pfVxuICAgICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RleHR9XG4gICAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgICA8L0NhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgKSl9XG4gICAgICAgIDxDYXRhbG9nRm9vdGVyTGlua0l0ZW0gYXJpYS1oaWRkZW4+4oCUPC9DYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxDYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cIi9jYXRhbG9nL2FsbFwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnZnVsbENhdGFsb2cnIH0pfVxuICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgRnVsbCBDYXRhbG9nXG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvQ2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Q2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCIvY2F0YWxvZy9zdWJqZWN0L2JldGFcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2JldGFDb250ZW50JyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEJldGEgQ29udGVudFxuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0NhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgPENhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly90cmVsbG8uY29tL2IvdkFnRFh0VDYvY29kZWNhZGVteS1yZWxlYXNlcy1yb2FkbWFwXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdyb2FkbWFwJyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIFJvYWRtYXBcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9DYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICA8L0NhdGFsb2dMaW5rQXJlYT5cbiAgICA8L0JveD5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxDYXRhbG9nTGlua3NDb250YWluZXI+XG4gICAgICA8Rm9vdGVySGVhZGluZz5Db3Vyc2UgQ2F0YWxvZzwvRm9vdGVySGVhZGluZz5cbiAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBmbGV4RGlyZWN0aW9uPXt7IF86ICdjb2x1bW4nLCBzbTogJ3JvdycgfX0+XG4gICAgICAgIDxCb3hcbiAgICAgICAgICBkaXNwbGF5PXt7IF86ICdibG9jaycsIG1kOiAnbm9uZScgfX1cbiAgICAgICAgICB3aWR0aD17eyBfOiAnMTAwJScsIG1kOiAnNTAlJyB9fVxuICAgICAgICA+XG4gICAgICAgICAge2xhbmd1YWdlc0xpc3R9XG4gICAgICAgIDwvQm94PlxuICAgICAgICB7c3ViamVjdHNMaXN0fVxuICAgICAgICA8Qm94XG4gICAgICAgICAgZGlzcGxheT17eyBfOiAnbm9uZScsIG1kOiAnYmxvY2snIH19XG4gICAgICAgICAgd2lkdGg9e3sgXzogJzEwMCUnLCBtZDogJzUwJScgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHtsYW5ndWFnZXNMaXN0fVxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvQ2F0YWxvZ0xpbmtzQ29udGFpbmVyPlxuICApO1xufTtcbiJdfQ== */"));
var CatalogFooterLinkItem = /*#__PURE__*/_styled(FooterLinkItem, {
  target: "e662mk50",
  label: "CatalogFooterLinkItem"
})(process.env.NODE_ENV === "production" ? {
  name: "vo4ymn",
  styles: "margin:0.25rem 0"
} : {
  name: "vo4ymn",
  styles: "margin:0.25rem 0",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ2F0YWxvZ0xpbmtzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwQ29EIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ2F0YWxvZ0xpbmtzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuY2hvciwgQm94IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgdGhlbWUsIHRoZW1lZCwgdmFyaWFudCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEZvb3RlckhlYWRpbmcgfSBmcm9tICcuLi9Gb290ZXJIZWFkaW5nJztcbmltcG9ydCB7IEZvb3RlckxpbmtJdGVtLCBGb290ZXJMaW5rSXRlbXMgfSBmcm9tICcuLi9Gb290ZXJMaW5rcyc7XG5pbXBvcnQgeyBGb290ZXJTdWJIZWFkaW5nIH0gZnJvbSAnLi4vRm9vdGVyU3ViSGVhZGluZyc7XG5pbXBvcnQgeyBHbG9iYWxGb290ZXJDbGlja0hhbmRsZXIgfSBmcm9tICcuLi90eXBlcyc7XG5cbmNvbnN0IENhdGFsb2dMaW5rc0NvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAke3RoZW1lZCgnY29sb3JzLm5hdnknKX07XG4gIG1hcmdpbi10b3A6IDJyZW07XG5cbiAgJHt0aGVtZS5icmVha3BvaW50cy5zbX0ge1xuICAgIHBhZGRpbmctdG9wOiAycmVtO1xuICB9XG5cbiAgJHt0aGVtZS5icmVha3BvaW50cy5tZH0ge1xuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS5jb2xvcnMubmF2eX07XG4gICAgYm9yZGVyLXRvcDogbm9uZTtcbiAgICBtYXJnaW4tbGVmdDogMDtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICAgIHBhZGRpbmctbGVmdDogMnJlbTtcbiAgICBwYWRkaW5nLXRvcDogMDtcbiAgfVxuXG4gICR7dGhlbWUuYnJlYWtwb2ludHMubGd9IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDRyZW07XG4gIH1cbmA7XG5cbmNvbnN0IENhdGFsb2dMaW5rQXJlYSA9IHN0eWxlZChGb290ZXJMaW5rSXRlbXMpPHsgdmFyaWFudD86ICdmdWxsSGVpZ2h0JyB9PmBcbiAgZGlzcGxheTogZmxleDtcbiAgbWF4LWhlaWdodDogMTRyZW07XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcblxuICAke3ZhcmlhbnQoeyB2YXJpYW50czogeyBmdWxsSGVpZ2h0OiB7IG1heEhlaWdodDogeyBtZDogJ25vbmUnIH0gfSB9IH0pfVxuYDtcblxuY29uc3QgQ2F0YWxvZ0Zvb3RlckxpbmtJdGVtID0gc3R5bGVkKEZvb3RlckxpbmtJdGVtKWBcbiAgbWFyZ2luOiAwLjI1cmVtIDA7XG5gO1xuXG5jb25zdCBsYW5ndWFnZXMgPSBbXG4gIFsnaHRtbC1jc3MnLCAnSFRNTCAmIENTUyddLFxuICBbJ3B5dGhvbicsICdQeXRob24nXSxcbiAgWydqYXZhc2NyaXB0JywgJ0phdmFTY3JpcHQnXSxcbiAgWydqYXZhJywgJ0phdmEnXSxcbiAgWydzcWwnLCAnU1FMJ10sXG4gIFsnYmFzaCcsICdCYXNoL1NoZWxsJ10sXG4gIFsncnVieScsICdSdWJ5J10sXG4gIFsnYy1wbHVzLXBsdXMnLCAnQysrJ10sXG4gIFsncicsICdSJ10sXG4gIFsnYy1zaGFycCcsICdDIyddLFxuICBbJ3BocCcsICdQSFAnXSxcbiAgWydnbycsICdHbyddLFxuICBbJ3N3aWZ0JywgJ1N3aWZ0J10sXG4gIFsna290bGluJywgJ0tvdGxpbiddLFxuXTtcblxuY29uc3Qgc3ViamVjdHMgPSBbXG4gIFsnd2ViLWRldmVsb3BtZW50JywgJ1dlYiBEZXZlbG9wbWVudCddLFxuICBbJ2RhdGEtc2NpZW5jZScsICdEYXRhIFNjaWVuY2UnXSxcbiAgWydjb21wdXRlci1zY2llbmNlJywgJ0NvbXB1dGVyIFNjaWVuY2UnXSxcbiAgWydkZXZlbG9wZXItdG9vbHMnLCAnRGV2ZWxvcGVyIFRvb2xzJ10sXG4gIFsnbWFjaGluZS1sZWFybmluZycsICdNYWNoaW5lIExlYXJuaW5nJ10sXG4gIFsnY29kZS1mb3VuZGF0aW9ucycsICdDb2RlIEZvdW5kYXRpb25zJ10sXG4gIFsnd2ViLWRlc2lnbicsICdXZWIgRGVzaWduJ10sXG5dO1xuXG5leHBvcnQgdHlwZSBDYXRhbG9nTGlua3NQcm9wcyA9IHtcbiAgb25DbGljazogR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyO1xufTtcblxuZXhwb3J0IGNvbnN0IENhdGFsb2dMaW5rczogUmVhY3QuRkM8Q2F0YWxvZ0xpbmtzUHJvcHM+ID0gKHsgb25DbGljayB9KSA9PiB7XG4gIGNvbnN0IGxhbmd1YWdlc0xpc3QgPSAoXG4gICAgPD5cbiAgICAgIDxGb290ZXJTdWJIZWFkaW5nIGFzPVwiaDNcIj5MYW5ndWFnZXM8L0Zvb3RlclN1YkhlYWRpbmc+XG4gICAgICA8Q2F0YWxvZ0xpbmtBcmVhPlxuICAgICAgICB7bGFuZ3VhZ2VzLm1hcCgoW3NsdWcsIHRleHRdKSA9PiAoXG4gICAgICAgICAgPENhdGFsb2dGb290ZXJMaW5rSXRlbSBrZXk9e3NsdWd9PlxuICAgICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgICBocmVmPXtgL2NhdGFsb2cvbGFuZ3VhZ2UvJHtzbHVnfWB9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6IHNsdWcgfSl9XG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGV4dH1cbiAgICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICAgIDwvQ2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICApKX1cbiAgICAgIDwvQ2F0YWxvZ0xpbmtBcmVhPlxuICAgIDwvPlxuICApO1xuXG4gIGNvbnN0IHN1YmplY3RzTGlzdCA9IChcbiAgICA8Qm94IHdpZHRoPXt7IF86ICcxMDAlJywgbWQ6ICc1MCUnIH19PlxuICAgICAgPEZvb3RlclN1YkhlYWRpbmcgYXM9XCJoM1wiPlN1YmplY3RzPC9Gb290ZXJTdWJIZWFkaW5nPlxuICAgICAgPENhdGFsb2dMaW5rQXJlYSB2YXJpYW50PVwiZnVsbEhlaWdodFwiPlxuICAgICAgICB7c3ViamVjdHMubWFwKChbc2x1ZywgdGV4dF0pID0+IChcbiAgICAgICAgICA8Q2F0YWxvZ0Zvb3RlckxpbmtJdGVtIGtleT17c2x1Z30+XG4gICAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICAgIGhyZWY9e2AvY2F0YWxvZy9zdWJqZWN0LyR7c2x1Z31gfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiBzbHVnIH0pfVxuICAgICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RleHR9XG4gICAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgICA8L0NhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgKSl9XG4gICAgICAgIDxDYXRhbG9nRm9vdGVyTGlua0l0ZW0gYXJpYS1oaWRkZW4+4oCUPC9DYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxDYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cIi9jYXRhbG9nL2FsbFwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnZnVsbENhdGFsb2cnIH0pfVxuICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgRnVsbCBDYXRhbG9nXG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvQ2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Q2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCIvY2F0YWxvZy9zdWJqZWN0L2JldGFcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2JldGFDb250ZW50JyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEJldGEgQ29udGVudFxuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0NhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgPENhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly90cmVsbG8uY29tL2IvdkFnRFh0VDYvY29kZWNhZGVteS1yZWxlYXNlcy1yb2FkbWFwXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdyb2FkbWFwJyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIFJvYWRtYXBcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9DYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICA8L0NhdGFsb2dMaW5rQXJlYT5cbiAgICA8L0JveD5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxDYXRhbG9nTGlua3NDb250YWluZXI+XG4gICAgICA8Rm9vdGVySGVhZGluZz5Db3Vyc2UgQ2F0YWxvZzwvRm9vdGVySGVhZGluZz5cbiAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBmbGV4RGlyZWN0aW9uPXt7IF86ICdjb2x1bW4nLCBzbTogJ3JvdycgfX0+XG4gICAgICAgIDxCb3hcbiAgICAgICAgICBkaXNwbGF5PXt7IF86ICdibG9jaycsIG1kOiAnbm9uZScgfX1cbiAgICAgICAgICB3aWR0aD17eyBfOiAnMTAwJScsIG1kOiAnNTAlJyB9fVxuICAgICAgICA+XG4gICAgICAgICAge2xhbmd1YWdlc0xpc3R9XG4gICAgICAgIDwvQm94PlxuICAgICAgICB7c3ViamVjdHNMaXN0fVxuICAgICAgICA8Qm94XG4gICAgICAgICAgZGlzcGxheT17eyBfOiAnbm9uZScsIG1kOiAnYmxvY2snIH19XG4gICAgICAgICAgd2lkdGg9e3sgXzogJzEwMCUnLCBtZDogJzUwJScgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHtsYW5ndWFnZXNMaXN0fVxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvQ2F0YWxvZ0xpbmtzQ29udGFpbmVyPlxuICApO1xufTtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
var languages = [['html-css', 'HTML & CSS'], ['python', 'Python'], ['javascript', 'JavaScript'], ['java', 'Java'], ['sql', 'SQL'], ['bash', 'Bash/Shell'], ['ruby', 'Ruby'], ['c-plus-plus', 'C++'], ['r', 'R'], ['c-sharp', 'C#'], ['php', 'PHP'], ['go', 'Go'], ['swift', 'Swift'], ['kotlin', 'Kotlin']];
var subjects = [['web-development', 'Web Development'], ['data-science', 'Data Science'], ['computer-science', 'Computer Science'], ['developer-tools', 'Developer Tools'], ['machine-learning', 'Machine Learning'], ['code-foundations', 'Code Foundations'], ['web-design', 'Web Design']];
export var CatalogLinks = function CatalogLinks(_ref2) {
  var _onClick = _ref2.onClick;
  var languagesList = /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(FooterSubHeading, {
      as: "h3",
      children: "Languages"
    }), /*#__PURE__*/_jsx(CatalogLinkArea, {
      children: languages.map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          slug = _ref4[0],
          text = _ref4[1];
        return /*#__PURE__*/_jsx(CatalogFooterLinkItem, {
          children: /*#__PURE__*/_jsx(Anchor, {
            href: "/catalog/language/".concat(slug),
            onClick: function onClick(event) {
              return _onClick({
                event: event,
                target: slug
              });
            },
            variant: "interface",
            children: text
          })
        }, slug);
      })
    })]
  });
  var subjectsList = /*#__PURE__*/_jsxs(Box, {
    width: {
      _: '100%',
      md: '50%'
    },
    children: [/*#__PURE__*/_jsx(FooterSubHeading, {
      as: "h3",
      children: "Subjects"
    }), /*#__PURE__*/_jsxs(CatalogLinkArea, {
      variant: "fullHeight",
      children: [subjects.map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          slug = _ref6[0],
          text = _ref6[1];
        return /*#__PURE__*/_jsx(CatalogFooterLinkItem, {
          children: /*#__PURE__*/_jsx(Anchor, {
            href: "/catalog/subject/".concat(slug),
            onClick: function onClick(event) {
              return _onClick({
                event: event,
                target: slug
              });
            },
            variant: "interface",
            children: text
          })
        }, slug);
      }), /*#__PURE__*/_jsx(CatalogFooterLinkItem, {
        "aria-hidden": true,
        children: "\u2014"
      }), /*#__PURE__*/_jsx(CatalogFooterLinkItem, {
        children: /*#__PURE__*/_jsx(Anchor, {
          href: "/catalog/all",
          onClick: function onClick(event) {
            return _onClick({
              event: event,
              target: 'fullCatalog'
            });
          },
          variant: "interface",
          children: "Full Catalog"
        })
      }), /*#__PURE__*/_jsx(CatalogFooterLinkItem, {
        children: /*#__PURE__*/_jsx(Anchor, {
          href: "/catalog/subject/beta",
          onClick: function onClick(event) {
            return _onClick({
              event: event,
              target: 'betaContent'
            });
          },
          variant: "interface",
          children: "Beta Content"
        })
      }), /*#__PURE__*/_jsx(CatalogFooterLinkItem, {
        children: /*#__PURE__*/_jsx(Anchor, {
          href: "https://trello.com/b/vAgDXtT6/codecademy-releases-roadmap",
          onClick: function onClick(event) {
            return _onClick({
              event: event,
              target: 'roadmap'
            });
          },
          variant: "interface",
          children: "Roadmap"
        })
      })]
    })]
  });
  return /*#__PURE__*/_jsxs(CatalogLinksContainer, {
    children: [/*#__PURE__*/_jsx(FooterHeading, {
      children: "Course Catalog"
    }), /*#__PURE__*/_jsxs(Box, {
      display: "flex",
      flexDirection: {
        _: 'column',
        sm: 'row'
      },
      children: [/*#__PURE__*/_jsx(Box, {
        display: {
          _: 'block',
          md: 'none'
        },
        width: {
          _: '100%',
          md: '50%'
        },
        children: languagesList
      }), subjectsList, /*#__PURE__*/_jsx(Box, {
        display: {
          _: 'none',
          md: 'block'
        },
        width: {
          _: '100%',
          md: '50%'
        },
        children: languagesList
      })]
    })]
  });
};