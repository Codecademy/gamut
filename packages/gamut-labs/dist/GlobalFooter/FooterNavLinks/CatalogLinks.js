import _styled from "@emotion/styled/base";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

import { Anchor, Box } from '@codecademy/gamut';
import { theme, themed, variant } from '@codecademy/gamut-styles';
import React from 'react';
import { FooterHeading } from '../FooterHeading';
import { FooterLinkItem, FooterLinkItems } from '../FooterLinks';
import { FooterSubHeading } from '../FooterSubHeading';

var CatalogLinksContainer = _styled("div", {
  target: "e662mk52",
  label: "CatalogLinksContainer"
})("border-top:1px solid ", themed('colors.navy'), ";margin-top:2rem;", theme.breakpoints.sm, "{padding-top:2rem;}", theme.breakpoints.md, "{border-left:1px solid ", function (_ref) {
  var theme = _ref.theme;
  return theme.colors.navy;
}, ";border-top:none;margin-left:0;margin-top:0;padding-left:2rem;padding-top:0;}", theme.breakpoints.lg, "{padding-left:4rem;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ2F0YWxvZ0xpbmtzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVd0MiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL0dsb2JhbEZvb3Rlci9Gb290ZXJOYXZMaW5rcy9DYXRhbG9nTGlua3MudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5jaG9yLCBCb3ggfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyB0aGVtZSwgdGhlbWVkLCB2YXJpYW50IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEZvb3RlckhlYWRpbmcgfSBmcm9tICcuLi9Gb290ZXJIZWFkaW5nJztcbmltcG9ydCB7IEZvb3RlckxpbmtJdGVtLCBGb290ZXJMaW5rSXRlbXMgfSBmcm9tICcuLi9Gb290ZXJMaW5rcyc7XG5pbXBvcnQgeyBGb290ZXJTdWJIZWFkaW5nIH0gZnJvbSAnLi4vRm9vdGVyU3ViSGVhZGluZyc7XG5pbXBvcnQgeyBHbG9iYWxGb290ZXJDbGlja0hhbmRsZXIgfSBmcm9tICcuLi90eXBlcyc7XG5cbmNvbnN0IENhdGFsb2dMaW5rc0NvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAke3RoZW1lZCgnY29sb3JzLm5hdnknKX07XG4gIG1hcmdpbi10b3A6IDJyZW07XG5cbiAgJHt0aGVtZS5icmVha3BvaW50cy5zbX0ge1xuICAgIHBhZGRpbmctdG9wOiAycmVtO1xuICB9XG5cbiAgJHt0aGVtZS5icmVha3BvaW50cy5tZH0ge1xuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS5jb2xvcnMubmF2eX07XG4gICAgYm9yZGVyLXRvcDogbm9uZTtcbiAgICBtYXJnaW4tbGVmdDogMDtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICAgIHBhZGRpbmctbGVmdDogMnJlbTtcbiAgICBwYWRkaW5nLXRvcDogMDtcbiAgfVxuXG4gICR7dGhlbWUuYnJlYWtwb2ludHMubGd9IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDRyZW07XG4gIH1cbmA7XG5cbmNvbnN0IENhdGFsb2dMaW5rQXJlYSA9IHN0eWxlZChGb290ZXJMaW5rSXRlbXMpPHsgdmFyaWFudD86ICdmdWxsSGVpZ2h0JyB9PmBcbiAgZGlzcGxheTogZmxleDtcbiAgbWF4LWhlaWdodDogMTRyZW07XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcblxuICAke3ZhcmlhbnQoeyB2YXJpYW50czogeyBmdWxsSGVpZ2h0OiB7IG1heEhlaWdodDogeyBtZDogJ25vbmUnIH0gfSB9IH0pfVxuYDtcblxuY29uc3QgQ2F0YWxvZ0Zvb3RlckxpbmtJdGVtID0gc3R5bGVkKEZvb3RlckxpbmtJdGVtKWBcbiAgbWFyZ2luOiAwLjI1cmVtIDA7XG5gO1xuXG5jb25zdCBsYW5ndWFnZXMgPSBbXG4gIFsnaHRtbC1jc3MnLCAnSFRNTCAmIENTUyddLFxuICBbJ3B5dGhvbicsICdQeXRob24nXSxcbiAgWydqYXZhc2NyaXB0JywgJ0phdmFTY3JpcHQnXSxcbiAgWydqYXZhJywgJ0phdmEnXSxcbiAgWydzcWwnLCAnU1FMJ10sXG4gIFsnYmFzaCcsICdCYXNoL1NoZWxsJ10sXG4gIFsncnVieScsICdSdWJ5J10sXG4gIFsnYy1wbHVzLXBsdXMnLCAnQysrJ10sXG4gIFsncicsICdSJ10sXG4gIFsnYy1zaGFycCcsICdDIyddLFxuICBbJ3BocCcsICdQSFAnXSxcbiAgWydnbycsICdHbyddLFxuICBbJ3N3aWZ0JywgJ1N3aWZ0J10sXG4gIFsna290bGluJywgJ0tvdGxpbiddLFxuXTtcblxuY29uc3Qgc3ViamVjdHMgPSBbXG4gIFsnd2ViLWRldmVsb3BtZW50JywgJ1dlYiBEZXZlbG9wbWVudCddLFxuICBbJ2RhdGEtc2NpZW5jZScsICdEYXRhIFNjaWVuY2UnXSxcbiAgWydjb21wdXRlci1zY2llbmNlJywgJ0NvbXB1dGVyIFNjaWVuY2UnXSxcbiAgWydkZXZlbG9wZXItdG9vbHMnLCAnRGV2ZWxvcGVyIFRvb2xzJ10sXG4gIFsnbWFjaGluZS1sZWFybmluZycsICdNYWNoaW5lIExlYXJuaW5nJ10sXG4gIFsnY29kZS1mb3VuZGF0aW9ucycsICdDb2RlIEZvdW5kYXRpb25zJ10sXG4gIFsnd2ViLWRlc2lnbicsICdXZWIgRGVzaWduJ10sXG5dO1xuXG5leHBvcnQgdHlwZSBDYXRhbG9nTGlua3NQcm9wcyA9IHtcbiAgb25DbGljazogR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyO1xufTtcblxuZXhwb3J0IGNvbnN0IENhdGFsb2dMaW5rczogUmVhY3QuRkM8Q2F0YWxvZ0xpbmtzUHJvcHM+ID0gKHsgb25DbGljayB9KSA9PiB7XG4gIGNvbnN0IGxhbmd1YWdlc0xpc3QgPSAoXG4gICAgPD5cbiAgICAgIDxGb290ZXJTdWJIZWFkaW5nIGFzPVwiaDNcIj5MYW5ndWFnZXM8L0Zvb3RlclN1YkhlYWRpbmc+XG4gICAgICA8Q2F0YWxvZ0xpbmtBcmVhPlxuICAgICAgICB7bGFuZ3VhZ2VzLm1hcCgoW3NsdWcsIHRleHRdKSA9PiAoXG4gICAgICAgICAgPENhdGFsb2dGb290ZXJMaW5rSXRlbSBrZXk9e3NsdWd9PlxuICAgICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgICBocmVmPXtgL2NhdGFsb2cvbGFuZ3VhZ2UvJHtzbHVnfWB9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6IHNsdWcgfSl9XG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGV4dH1cbiAgICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICAgIDwvQ2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICApKX1cbiAgICAgIDwvQ2F0YWxvZ0xpbmtBcmVhPlxuICAgIDwvPlxuICApO1xuXG4gIGNvbnN0IHN1YmplY3RzTGlzdCA9IChcbiAgICA8Qm94IHdpZHRoPXt7IF86ICcxMDAlJywgbWQ6ICc1MCUnIH19PlxuICAgICAgPEZvb3RlclN1YkhlYWRpbmcgYXM9XCJoM1wiPlN1YmplY3RzPC9Gb290ZXJTdWJIZWFkaW5nPlxuICAgICAgPENhdGFsb2dMaW5rQXJlYSB2YXJpYW50PVwiZnVsbEhlaWdodFwiPlxuICAgICAgICB7c3ViamVjdHMubWFwKChbc2x1ZywgdGV4dF0pID0+IChcbiAgICAgICAgICA8Q2F0YWxvZ0Zvb3RlckxpbmtJdGVtIGtleT17c2x1Z30+XG4gICAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICAgIGhyZWY9e2AvY2F0YWxvZy9zdWJqZWN0LyR7c2x1Z31gfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiBzbHVnIH0pfVxuICAgICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RleHR9XG4gICAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgICA8L0NhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgKSl9XG4gICAgICAgIDxDYXRhbG9nRm9vdGVyTGlua0l0ZW0gYXJpYS1oaWRkZW4+4oCUPC9DYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxDYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cIi9jYXRhbG9nL2FsbFwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAnZnVsbENhdGFsb2cnIH0pfVxuICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgRnVsbCBDYXRhbG9nXG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvQ2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Q2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCIvY2F0YWxvZy9zdWJqZWN0L2JldGFcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2JldGFDb250ZW50JyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEJldGEgQ29udGVudFxuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0NhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgPENhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly90cmVsbG8uY29tL2IvdkFnRFh0VDYvY29kZWNhZGVteS1yZWxlYXNlcy1yb2FkbWFwXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdyb2FkbWFwJyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIFJvYWRtYXBcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9DYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICA8L0NhdGFsb2dMaW5rQXJlYT5cbiAgICA8L0JveD5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxDYXRhbG9nTGlua3NDb250YWluZXI+XG4gICAgICA8Rm9vdGVySGVhZGluZz5Db3Vyc2UgQ2F0YWxvZzwvRm9vdGVySGVhZGluZz5cbiAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBmbGV4RGlyZWN0aW9uPXt7IF86ICdjb2x1bW4nLCBzbTogJ3JvdycgfX0+XG4gICAgICAgIDxCb3hcbiAgICAgICAgICBkaXNwbGF5PXt7IF86ICdibG9jaycsIG1kOiAnbm9uZScgfX1cbiAgICAgICAgICB3aWR0aD17eyBfOiAnMTAwJScsIG1kOiAnNTAlJyB9fVxuICAgICAgICA+XG4gICAgICAgICAge2xhbmd1YWdlc0xpc3R9XG4gICAgICAgIDwvQm94PlxuICAgICAgICB7c3ViamVjdHNMaXN0fVxuICAgICAgICA8Qm94XG4gICAgICAgICAgZGlzcGxheT17eyBfOiAnbm9uZScsIG1kOiAnYmxvY2snIH19XG4gICAgICAgICAgd2lkdGg9e3sgXzogJzEwMCUnLCBtZDogJzUwJScgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHtsYW5ndWFnZXNMaXN0fVxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvQ2F0YWxvZ0xpbmtzQ29udGFpbmVyPlxuICApO1xufTtcbiJdfQ== */"));

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
}), ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ2F0YWxvZ0xpbmtzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQzJFIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ2F0YWxvZ0xpbmtzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuY2hvciwgQm94IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgdGhlbWUsIHRoZW1lZCwgdmFyaWFudCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBGb290ZXJIZWFkaW5nIH0gZnJvbSAnLi4vRm9vdGVySGVhZGluZyc7XG5pbXBvcnQgeyBGb290ZXJMaW5rSXRlbSwgRm9vdGVyTGlua0l0ZW1zIH0gZnJvbSAnLi4vRm9vdGVyTGlua3MnO1xuaW1wb3J0IHsgRm9vdGVyU3ViSGVhZGluZyB9IGZyb20gJy4uL0Zvb3RlclN1YkhlYWRpbmcnO1xuaW1wb3J0IHsgR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCBDYXRhbG9nTGlua3NDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBib3JkZXItdG9wOiAxcHggc29saWQgJHt0aGVtZWQoJ2NvbG9ycy5uYXZ5Jyl9O1xuICBtYXJnaW4tdG9wOiAycmVtO1xuXG4gICR7dGhlbWUuYnJlYWtwb2ludHMuc219IHtcbiAgICBwYWRkaW5nLXRvcDogMnJlbTtcbiAgfVxuXG4gICR7dGhlbWUuYnJlYWtwb2ludHMubWR9IHtcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUuY29sb3JzLm5hdnl9O1xuICAgIGJvcmRlci10b3A6IG5vbmU7XG4gICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgbWFyZ2luLXRvcDogMDtcbiAgICBwYWRkaW5nLWxlZnQ6IDJyZW07XG4gICAgcGFkZGluZy10b3A6IDA7XG4gIH1cblxuICAke3RoZW1lLmJyZWFrcG9pbnRzLmxnfSB7XG4gICAgcGFkZGluZy1sZWZ0OiA0cmVtO1xuICB9XG5gO1xuXG5jb25zdCBDYXRhbG9nTGlua0FyZWEgPSBzdHlsZWQoRm9vdGVyTGlua0l0ZW1zKTx7IHZhcmlhbnQ/OiAnZnVsbEhlaWdodCcgfT5gXG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1heC1oZWlnaHQ6IDE0cmVtO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG5cbiAgJHt2YXJpYW50KHsgdmFyaWFudHM6IHsgZnVsbEhlaWdodDogeyBtYXhIZWlnaHQ6IHsgbWQ6ICdub25lJyB9IH0gfSB9KX1cbmA7XG5cbmNvbnN0IENhdGFsb2dGb290ZXJMaW5rSXRlbSA9IHN0eWxlZChGb290ZXJMaW5rSXRlbSlgXG4gIG1hcmdpbjogMC4yNXJlbSAwO1xuYDtcblxuY29uc3QgbGFuZ3VhZ2VzID0gW1xuICBbJ2h0bWwtY3NzJywgJ0hUTUwgJiBDU1MnXSxcbiAgWydweXRob24nLCAnUHl0aG9uJ10sXG4gIFsnamF2YXNjcmlwdCcsICdKYXZhU2NyaXB0J10sXG4gIFsnamF2YScsICdKYXZhJ10sXG4gIFsnc3FsJywgJ1NRTCddLFxuICBbJ2Jhc2gnLCAnQmFzaC9TaGVsbCddLFxuICBbJ3J1YnknLCAnUnVieSddLFxuICBbJ2MtcGx1cy1wbHVzJywgJ0MrKyddLFxuICBbJ3InLCAnUiddLFxuICBbJ2Mtc2hhcnAnLCAnQyMnXSxcbiAgWydwaHAnLCAnUEhQJ10sXG4gIFsnZ28nLCAnR28nXSxcbiAgWydzd2lmdCcsICdTd2lmdCddLFxuICBbJ2tvdGxpbicsICdLb3RsaW4nXSxcbl07XG5cbmNvbnN0IHN1YmplY3RzID0gW1xuICBbJ3dlYi1kZXZlbG9wbWVudCcsICdXZWIgRGV2ZWxvcG1lbnQnXSxcbiAgWydkYXRhLXNjaWVuY2UnLCAnRGF0YSBTY2llbmNlJ10sXG4gIFsnY29tcHV0ZXItc2NpZW5jZScsICdDb21wdXRlciBTY2llbmNlJ10sXG4gIFsnZGV2ZWxvcGVyLXRvb2xzJywgJ0RldmVsb3BlciBUb29scyddLFxuICBbJ21hY2hpbmUtbGVhcm5pbmcnLCAnTWFjaGluZSBMZWFybmluZyddLFxuICBbJ2NvZGUtZm91bmRhdGlvbnMnLCAnQ29kZSBGb3VuZGF0aW9ucyddLFxuICBbJ3dlYi1kZXNpZ24nLCAnV2ViIERlc2lnbiddLFxuXTtcblxuZXhwb3J0IHR5cGUgQ2F0YWxvZ0xpbmtzUHJvcHMgPSB7XG4gIG9uQ2xpY2s6IEdsb2JhbEZvb3RlckNsaWNrSGFuZGxlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBDYXRhbG9nTGlua3M6IFJlYWN0LkZDPENhdGFsb2dMaW5rc1Byb3BzPiA9ICh7IG9uQ2xpY2sgfSkgPT4ge1xuICBjb25zdCBsYW5ndWFnZXNMaXN0ID0gKFxuICAgIDw+XG4gICAgICA8Rm9vdGVyU3ViSGVhZGluZyBhcz1cImgzXCI+TGFuZ3VhZ2VzPC9Gb290ZXJTdWJIZWFkaW5nPlxuICAgICAgPENhdGFsb2dMaW5rQXJlYT5cbiAgICAgICAge2xhbmd1YWdlcy5tYXAoKFtzbHVnLCB0ZXh0XSkgPT4gKFxuICAgICAgICAgIDxDYXRhbG9nRm9vdGVyTGlua0l0ZW0ga2V5PXtzbHVnfT5cbiAgICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgICAgaHJlZj17YC9jYXRhbG9nL2xhbmd1YWdlLyR7c2x1Z31gfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiBzbHVnIH0pfVxuICAgICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RleHR9XG4gICAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgICA8L0NhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgKSl9XG4gICAgICA8L0NhdGFsb2dMaW5rQXJlYT5cbiAgICA8Lz5cbiAgKTtcblxuICBjb25zdCBzdWJqZWN0c0xpc3QgPSAoXG4gICAgPEJveCB3aWR0aD17eyBfOiAnMTAwJScsIG1kOiAnNTAlJyB9fT5cbiAgICAgIDxGb290ZXJTdWJIZWFkaW5nIGFzPVwiaDNcIj5TdWJqZWN0czwvRm9vdGVyU3ViSGVhZGluZz5cbiAgICAgIDxDYXRhbG9nTGlua0FyZWEgdmFyaWFudD1cImZ1bGxIZWlnaHRcIj5cbiAgICAgICAge3N1YmplY3RzLm1hcCgoW3NsdWcsIHRleHRdKSA9PiAoXG4gICAgICAgICAgPENhdGFsb2dGb290ZXJMaW5rSXRlbSBrZXk9e3NsdWd9PlxuICAgICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgICBocmVmPXtgL2NhdGFsb2cvc3ViamVjdC8ke3NsdWd9YH1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogc2x1ZyB9KX1cbiAgICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0ZXh0fVxuICAgICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgICAgPC9DYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICkpfVxuICAgICAgICA8Q2F0YWxvZ0Zvb3RlckxpbmtJdGVtIGFyaWEtaGlkZGVuPuKAlDwvQ2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Q2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCIvY2F0YWxvZy9hbGxcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2Z1bGxDYXRhbG9nJyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEZ1bGwgQ2F0YWxvZ1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0NhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgPENhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiL2NhdGFsb2cvc3ViamVjdC9iZXRhXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdiZXRhQ29udGVudCcgfSl9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBCZXRhIENvbnRlbnRcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9DYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxDYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vdHJlbGxvLmNvbS9iL3ZBZ0RYdFQ2L2NvZGVjYWRlbXktcmVsZWFzZXMtcm9hZG1hcFwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAncm9hZG1hcCcgfSl9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBSb2FkbWFwXG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvQ2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgPC9DYXRhbG9nTGlua0FyZWE+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q2F0YWxvZ0xpbmtzQ29udGFpbmVyPlxuICAgICAgPEZvb3RlckhlYWRpbmc+Q291cnNlIENhdGFsb2c8L0Zvb3RlckhlYWRpbmc+XG4gICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgZmxleERpcmVjdGlvbj17eyBfOiAnY29sdW1uJywgc206ICdyb3cnIH19PlxuICAgICAgICA8Qm94XG4gICAgICAgICAgZGlzcGxheT17eyBfOiAnYmxvY2snLCBtZDogJ25vbmUnIH19XG4gICAgICAgICAgd2lkdGg9e3sgXzogJzEwMCUnLCBtZDogJzUwJScgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHtsYW5ndWFnZXNMaXN0fVxuICAgICAgICA8L0JveD5cbiAgICAgICAge3N1YmplY3RzTGlzdH1cbiAgICAgICAgPEJveFxuICAgICAgICAgIGRpc3BsYXk9e3sgXzogJ25vbmUnLCBtZDogJ2Jsb2NrJyB9fVxuICAgICAgICAgIHdpZHRoPXt7IF86ICcxMDAlJywgbWQ6ICc1MCUnIH19XG4gICAgICAgID5cbiAgICAgICAgICB7bGFuZ3VhZ2VzTGlzdH1cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cbiAgICA8L0NhdGFsb2dMaW5rc0NvbnRhaW5lcj5cbiAgKTtcbn07XG4iXX0= */"));

var CatalogFooterLinkItem = /*#__PURE__*/_styled(FooterLinkItem, {
  target: "e662mk50",
  label: "CatalogFooterLinkItem"
})(process.env.NODE_ENV === "production" ? {
  name: "vo4ymn",
  styles: "margin:0.25rem 0"
} : {
  name: "vo4ymn",
  styles: "margin:0.25rem 0",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ2F0YWxvZ0xpbmtzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwQ29EIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvQ2F0YWxvZ0xpbmtzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuY2hvciwgQm94IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgdGhlbWUsIHRoZW1lZCwgdmFyaWFudCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBGb290ZXJIZWFkaW5nIH0gZnJvbSAnLi4vRm9vdGVySGVhZGluZyc7XG5pbXBvcnQgeyBGb290ZXJMaW5rSXRlbSwgRm9vdGVyTGlua0l0ZW1zIH0gZnJvbSAnLi4vRm9vdGVyTGlua3MnO1xuaW1wb3J0IHsgRm9vdGVyU3ViSGVhZGluZyB9IGZyb20gJy4uL0Zvb3RlclN1YkhlYWRpbmcnO1xuaW1wb3J0IHsgR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCBDYXRhbG9nTGlua3NDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBib3JkZXItdG9wOiAxcHggc29saWQgJHt0aGVtZWQoJ2NvbG9ycy5uYXZ5Jyl9O1xuICBtYXJnaW4tdG9wOiAycmVtO1xuXG4gICR7dGhlbWUuYnJlYWtwb2ludHMuc219IHtcbiAgICBwYWRkaW5nLXRvcDogMnJlbTtcbiAgfVxuXG4gICR7dGhlbWUuYnJlYWtwb2ludHMubWR9IHtcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUuY29sb3JzLm5hdnl9O1xuICAgIGJvcmRlci10b3A6IG5vbmU7XG4gICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgbWFyZ2luLXRvcDogMDtcbiAgICBwYWRkaW5nLWxlZnQ6IDJyZW07XG4gICAgcGFkZGluZy10b3A6IDA7XG4gIH1cblxuICAke3RoZW1lLmJyZWFrcG9pbnRzLmxnfSB7XG4gICAgcGFkZGluZy1sZWZ0OiA0cmVtO1xuICB9XG5gO1xuXG5jb25zdCBDYXRhbG9nTGlua0FyZWEgPSBzdHlsZWQoRm9vdGVyTGlua0l0ZW1zKTx7IHZhcmlhbnQ/OiAnZnVsbEhlaWdodCcgfT5gXG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1heC1oZWlnaHQ6IDE0cmVtO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG5cbiAgJHt2YXJpYW50KHsgdmFyaWFudHM6IHsgZnVsbEhlaWdodDogeyBtYXhIZWlnaHQ6IHsgbWQ6ICdub25lJyB9IH0gfSB9KX1cbmA7XG5cbmNvbnN0IENhdGFsb2dGb290ZXJMaW5rSXRlbSA9IHN0eWxlZChGb290ZXJMaW5rSXRlbSlgXG4gIG1hcmdpbjogMC4yNXJlbSAwO1xuYDtcblxuY29uc3QgbGFuZ3VhZ2VzID0gW1xuICBbJ2h0bWwtY3NzJywgJ0hUTUwgJiBDU1MnXSxcbiAgWydweXRob24nLCAnUHl0aG9uJ10sXG4gIFsnamF2YXNjcmlwdCcsICdKYXZhU2NyaXB0J10sXG4gIFsnamF2YScsICdKYXZhJ10sXG4gIFsnc3FsJywgJ1NRTCddLFxuICBbJ2Jhc2gnLCAnQmFzaC9TaGVsbCddLFxuICBbJ3J1YnknLCAnUnVieSddLFxuICBbJ2MtcGx1cy1wbHVzJywgJ0MrKyddLFxuICBbJ3InLCAnUiddLFxuICBbJ2Mtc2hhcnAnLCAnQyMnXSxcbiAgWydwaHAnLCAnUEhQJ10sXG4gIFsnZ28nLCAnR28nXSxcbiAgWydzd2lmdCcsICdTd2lmdCddLFxuICBbJ2tvdGxpbicsICdLb3RsaW4nXSxcbl07XG5cbmNvbnN0IHN1YmplY3RzID0gW1xuICBbJ3dlYi1kZXZlbG9wbWVudCcsICdXZWIgRGV2ZWxvcG1lbnQnXSxcbiAgWydkYXRhLXNjaWVuY2UnLCAnRGF0YSBTY2llbmNlJ10sXG4gIFsnY29tcHV0ZXItc2NpZW5jZScsICdDb21wdXRlciBTY2llbmNlJ10sXG4gIFsnZGV2ZWxvcGVyLXRvb2xzJywgJ0RldmVsb3BlciBUb29scyddLFxuICBbJ21hY2hpbmUtbGVhcm5pbmcnLCAnTWFjaGluZSBMZWFybmluZyddLFxuICBbJ2NvZGUtZm91bmRhdGlvbnMnLCAnQ29kZSBGb3VuZGF0aW9ucyddLFxuICBbJ3dlYi1kZXNpZ24nLCAnV2ViIERlc2lnbiddLFxuXTtcblxuZXhwb3J0IHR5cGUgQ2F0YWxvZ0xpbmtzUHJvcHMgPSB7XG4gIG9uQ2xpY2s6IEdsb2JhbEZvb3RlckNsaWNrSGFuZGxlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBDYXRhbG9nTGlua3M6IFJlYWN0LkZDPENhdGFsb2dMaW5rc1Byb3BzPiA9ICh7IG9uQ2xpY2sgfSkgPT4ge1xuICBjb25zdCBsYW5ndWFnZXNMaXN0ID0gKFxuICAgIDw+XG4gICAgICA8Rm9vdGVyU3ViSGVhZGluZyBhcz1cImgzXCI+TGFuZ3VhZ2VzPC9Gb290ZXJTdWJIZWFkaW5nPlxuICAgICAgPENhdGFsb2dMaW5rQXJlYT5cbiAgICAgICAge2xhbmd1YWdlcy5tYXAoKFtzbHVnLCB0ZXh0XSkgPT4gKFxuICAgICAgICAgIDxDYXRhbG9nRm9vdGVyTGlua0l0ZW0ga2V5PXtzbHVnfT5cbiAgICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgICAgaHJlZj17YC9jYXRhbG9nL2xhbmd1YWdlLyR7c2x1Z31gfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiBzbHVnIH0pfVxuICAgICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RleHR9XG4gICAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgICA8L0NhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgKSl9XG4gICAgICA8L0NhdGFsb2dMaW5rQXJlYT5cbiAgICA8Lz5cbiAgKTtcblxuICBjb25zdCBzdWJqZWN0c0xpc3QgPSAoXG4gICAgPEJveCB3aWR0aD17eyBfOiAnMTAwJScsIG1kOiAnNTAlJyB9fT5cbiAgICAgIDxGb290ZXJTdWJIZWFkaW5nIGFzPVwiaDNcIj5TdWJqZWN0czwvRm9vdGVyU3ViSGVhZGluZz5cbiAgICAgIDxDYXRhbG9nTGlua0FyZWEgdmFyaWFudD1cImZ1bGxIZWlnaHRcIj5cbiAgICAgICAge3N1YmplY3RzLm1hcCgoW3NsdWcsIHRleHRdKSA9PiAoXG4gICAgICAgICAgPENhdGFsb2dGb290ZXJMaW5rSXRlbSBrZXk9e3NsdWd9PlxuICAgICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgICBocmVmPXtgL2NhdGFsb2cvc3ViamVjdC8ke3NsdWd9YH1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogc2x1ZyB9KX1cbiAgICAgICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0ZXh0fVxuICAgICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgICAgPC9DYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICkpfVxuICAgICAgICA8Q2F0YWxvZ0Zvb3RlckxpbmtJdGVtIGFyaWEtaGlkZGVuPuKAlDwvQ2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICA8Q2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgIGhyZWY9XCIvY2F0YWxvZy9hbGxcIlxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBvbkNsaWNrKHsgZXZlbnQsIHRhcmdldDogJ2Z1bGxDYXRhbG9nJyB9KX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEZ1bGwgQ2F0YWxvZ1xuICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICA8L0NhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgPENhdGFsb2dGb290ZXJMaW5rSXRlbT5cbiAgICAgICAgICA8QW5jaG9yXG4gICAgICAgICAgICBocmVmPVwiL2NhdGFsb2cvc3ViamVjdC9iZXRhXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayh7IGV2ZW50LCB0YXJnZXQ6ICdiZXRhQ29udGVudCcgfSl9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBCZXRhIENvbnRlbnRcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC9DYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgIDxDYXRhbG9nRm9vdGVyTGlua0l0ZW0+XG4gICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vdHJlbGxvLmNvbS9iL3ZBZ0RYdFQ2L2NvZGVjYWRlbXktcmVsZWFzZXMtcm9hZG1hcFwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soeyBldmVudCwgdGFyZ2V0OiAncm9hZG1hcCcgfSl9XG4gICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBSb2FkbWFwXG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvQ2F0YWxvZ0Zvb3RlckxpbmtJdGVtPlxuICAgICAgPC9DYXRhbG9nTGlua0FyZWE+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q2F0YWxvZ0xpbmtzQ29udGFpbmVyPlxuICAgICAgPEZvb3RlckhlYWRpbmc+Q291cnNlIENhdGFsb2c8L0Zvb3RlckhlYWRpbmc+XG4gICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgZmxleERpcmVjdGlvbj17eyBfOiAnY29sdW1uJywgc206ICdyb3cnIH19PlxuICAgICAgICA8Qm94XG4gICAgICAgICAgZGlzcGxheT17eyBfOiAnYmxvY2snLCBtZDogJ25vbmUnIH19XG4gICAgICAgICAgd2lkdGg9e3sgXzogJzEwMCUnLCBtZDogJzUwJScgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHtsYW5ndWFnZXNMaXN0fVxuICAgICAgICA8L0JveD5cbiAgICAgICAge3N1YmplY3RzTGlzdH1cbiAgICAgICAgPEJveFxuICAgICAgICAgIGRpc3BsYXk9e3sgXzogJ25vbmUnLCBtZDogJ2Jsb2NrJyB9fVxuICAgICAgICAgIHdpZHRoPXt7IF86ICcxMDAlJywgbWQ6ICc1MCUnIH19XG4gICAgICAgID5cbiAgICAgICAgICB7bGFuZ3VhZ2VzTGlzdH1cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cbiAgICA8L0NhdGFsb2dMaW5rc0NvbnRhaW5lcj5cbiAgKTtcbn07XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

var languages = [['html-css', 'HTML & CSS'], ['python', 'Python'], ['javascript', 'JavaScript'], ['java', 'Java'], ['sql', 'SQL'], ['bash', 'Bash/Shell'], ['ruby', 'Ruby'], ['c-plus-plus', 'C++'], ['r', 'R'], ['c-sharp', 'C#'], ['php', 'PHP'], ['go', 'Go'], ['swift', 'Swift'], ['kotlin', 'Kotlin']];
var subjects = [['web-development', 'Web Development'], ['data-science', 'Data Science'], ['computer-science', 'Computer Science'], ['developer-tools', 'Developer Tools'], ['machine-learning', 'Machine Learning'], ['code-foundations', 'Code Foundations'], ['web-design', 'Web Design']];
export var CatalogLinks = function CatalogLinks(_ref2) {
  var _onClick = _ref2.onClick;
  var languagesList = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FooterSubHeading, {
    as: "h3"
  }, "Languages"), /*#__PURE__*/React.createElement(CatalogLinkArea, null, languages.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        slug = _ref4[0],
        text = _ref4[1];

    return /*#__PURE__*/React.createElement(CatalogFooterLinkItem, {
      key: slug
    }, /*#__PURE__*/React.createElement(Anchor, {
      href: "/catalog/language/".concat(slug),
      onClick: function onClick(event) {
        return _onClick({
          event: event,
          target: slug
        });
      },
      variant: "interface"
    }, text));
  })));
  var subjectsList = /*#__PURE__*/React.createElement(Box, {
    width: {
      _: '100%',
      md: '50%'
    }
  }, /*#__PURE__*/React.createElement(FooterSubHeading, {
    as: "h3"
  }, "Subjects"), /*#__PURE__*/React.createElement(CatalogLinkArea, {
    variant: "fullHeight"
  }, subjects.map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        slug = _ref6[0],
        text = _ref6[1];

    return /*#__PURE__*/React.createElement(CatalogFooterLinkItem, {
      key: slug
    }, /*#__PURE__*/React.createElement(Anchor, {
      href: "/catalog/subject/".concat(slug),
      onClick: function onClick(event) {
        return _onClick({
          event: event,
          target: slug
        });
      },
      variant: "interface"
    }, text));
  }), /*#__PURE__*/React.createElement(CatalogFooterLinkItem, {
    "aria-hidden": true
  }, "\u2014"), /*#__PURE__*/React.createElement(CatalogFooterLinkItem, null, /*#__PURE__*/React.createElement(Anchor, {
    href: "/catalog/all",
    onClick: function onClick(event) {
      return _onClick({
        event: event,
        target: 'fullCatalog'
      });
    },
    variant: "interface"
  }, "Full Catalog")), /*#__PURE__*/React.createElement(CatalogFooterLinkItem, null, /*#__PURE__*/React.createElement(Anchor, {
    href: "/catalog/subject/beta",
    onClick: function onClick(event) {
      return _onClick({
        event: event,
        target: 'betaContent'
      });
    },
    variant: "interface"
  }, "Beta Content")), /*#__PURE__*/React.createElement(CatalogFooterLinkItem, null, /*#__PURE__*/React.createElement(Anchor, {
    href: "https://trello.com/b/vAgDXtT6/codecademy-releases-roadmap",
    onClick: function onClick(event) {
      return _onClick({
        event: event,
        target: 'roadmap'
      });
    },
    variant: "interface"
  }, "Roadmap"))));
  return /*#__PURE__*/React.createElement(CatalogLinksContainer, null, /*#__PURE__*/React.createElement(FooterHeading, null, "Course Catalog"), /*#__PURE__*/React.createElement(Box, {
    display: "flex",
    flexDirection: {
      _: 'column',
      sm: 'row'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    display: {
      _: 'block',
      md: 'none'
    },
    width: {
      _: '100%',
      md: '50%'
    }
  }, languagesList), subjectsList, /*#__PURE__*/React.createElement(Box, {
    display: {
      _: 'none',
      md: 'block'
    },
    width: {
      _: '100%',
      md: '50%'
    }
  }, languagesList)));
};