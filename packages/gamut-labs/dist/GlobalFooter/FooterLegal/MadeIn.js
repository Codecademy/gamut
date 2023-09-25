import _styled from "@emotion/styled/base";
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
import { Anchor, Box } from '@codecademy/gamut';
import { css } from '@emotion/react';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var heartStyles = process.env.NODE_ENV === "production" ? {
  name: "h6cgq6-heartStyles",
  styles: "display:inline-block;filter:saturate(0.7);margin-right:0.25rem;min-width:1.75em;text-align:center;label:heartStyles;"
} : {
  name: "h6cgq6-heartStyles",
  styles: "display:inline-block;filter:saturate(0.7);margin-right:0.25rem;min-width:1.75em;text-align:center;label:heartStyles;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTGVnYWwvTWFkZUluLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLdUIiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL0dsb2JhbEZvb3Rlci9Gb290ZXJMZWdhbC9NYWRlSW4udHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5jaG9yLCBCb3ggfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IGhlYXJ0U3R5bGVzID0gY3NzYFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZpbHRlcjogc2F0dXJhdGUoMC43KTtcbiAgbWFyZ2luLXJpZ2h0OiAwLjI1cmVtO1xuICBtaW4td2lkdGg6IDEuNzVlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuYDtcblxuY29uc3QgSGVhcnRBbmNob3JDb250YWluZXIgPSBzdHlsZWQoQW5jaG9yKWBcbiAgJHtoZWFydFN0eWxlc31cbiAgY3Vyc29yOiBwb2ludGVyO1xuYDtcblxuY29uc3QgSGVhcnRDb250YWluZXIgPSBzdHlsZWQuc3BhbmBcbiAgJHtoZWFydFN0eWxlc31cbmA7XG5cbmV4cG9ydCB0eXBlIE1hZGVJblByb3BzID0ge1xuICBvbkNsaWNrPzogKHRleHQ6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBjb25zdCBNYWRlSW46IFJlYWN0LkZDPE1hZGVJblByb3BzPiA9ICh7IG9uQ2xpY2sgfSkgPT4ge1xuICBjb25zdCBvbk1hZGVDbGljayA9ICgpID0+IG9uQ2xpY2s/LignTWFkZScpO1xuICBjb25zdCBvbkhlYXJ0Q2xpY2sgPSAoKSA9PiBvbkNsaWNrPy4oJ+KdpCcpO1xuICBjb25zdCBvbk5ZQ0NsaWNrID0gKCkgPT4gb25DbGljaz8uKCdOWUMnKTtcbiAgY29uc3Qgb25Db2RlY2FkZW15Q2xpY2sgPSAoKSA9PiBvbkNsaWNrPy4oJ0NvZGVjYWRlbXknKTtcblxuICBjb25zdCB5ZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuXG4gIHJldHVybiAoXG4gICAgPEJveFxuICAgICAgZGlzcGxheT17eyBtZDogJ2lubGluZS1ibG9jaycgfX1cbiAgICAgIHRleHRBbGlnbj17eyBfOiAnY2VudGVyJywgbWQ6ICdyaWdodCcgfX1cbiAgICA+XG4gICAgICB7b25DbGljayA/IChcbiAgICAgICAgPD5cbiAgICAgICAgICA8QW5jaG9yIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIiBvbkNsaWNrPXtvbk1hZGVDbGlja30+XG4gICAgICAgICAgICBNYWRlXG4gICAgICAgICAgPC9BbmNob3I+eycgJ31cbiAgICAgICAgICB3aXRoXG4gICAgICAgICAgPEhlYXJ0QW5jaG9yQ29udGFpbmVyIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIiBvbkNsaWNrPXtvbkhlYXJ0Q2xpY2t9PlxuICAgICAgICAgICAg77iP4p2k77iPXG4gICAgICAgICAgPC9IZWFydEFuY2hvckNvbnRhaW5lcj5cbiAgICAgICAgICBpbnsnICd9XG4gICAgICAgICAgPEFuY2hvciB2YXJpYW50PVwiaW50ZXJmYWNlXCIgb25DbGljaz17b25OWUNDbGlja30+XG4gICAgICAgICAgICBOWUNcbiAgICAgICAgICA8L0FuY2hvcj57JyAnfVxuICAgICAgICAgIMKpe2AgJHt5ZWFyfSBgfVxuICAgICAgICAgIDxBbmNob3IgdmFyaWFudD1cImludGVyZmFjZVwiIG9uQ2xpY2s9e29uQ29kZWNhZGVteUNsaWNrfT5cbiAgICAgICAgICAgIENvZGVjYWRlbXlcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC8+XG4gICAgICApIDogKFxuICAgICAgICA8PlxuICAgICAgICAgIE1hZGUgd2l0aCA8SGVhcnRDb250YWluZXIgYXJpYS1sYWJlbD1cImxvdmVcIj7inaTvuI88L0hlYXJ0Q29udGFpbmVyPmluIE5ZQ1xuICAgICAgICAgIMKpIHt5ZWFyfSBDb2RlY2FkZW15XG4gICAgICAgIDwvPlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn07XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var HeartAnchorContainer = /*#__PURE__*/_styled(Anchor, {
  target: "eaw4eyk1",
  label: "HeartAnchorContainer"
})(heartStyles, " cursor:pointer;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTGVnYWwvTWFkZUluLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFhMkMiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL0dsb2JhbEZvb3Rlci9Gb290ZXJMZWdhbC9NYWRlSW4udHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5jaG9yLCBCb3ggfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IGhlYXJ0U3R5bGVzID0gY3NzYFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZpbHRlcjogc2F0dXJhdGUoMC43KTtcbiAgbWFyZ2luLXJpZ2h0OiAwLjI1cmVtO1xuICBtaW4td2lkdGg6IDEuNzVlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuYDtcblxuY29uc3QgSGVhcnRBbmNob3JDb250YWluZXIgPSBzdHlsZWQoQW5jaG9yKWBcbiAgJHtoZWFydFN0eWxlc31cbiAgY3Vyc29yOiBwb2ludGVyO1xuYDtcblxuY29uc3QgSGVhcnRDb250YWluZXIgPSBzdHlsZWQuc3BhbmBcbiAgJHtoZWFydFN0eWxlc31cbmA7XG5cbmV4cG9ydCB0eXBlIE1hZGVJblByb3BzID0ge1xuICBvbkNsaWNrPzogKHRleHQ6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBjb25zdCBNYWRlSW46IFJlYWN0LkZDPE1hZGVJblByb3BzPiA9ICh7IG9uQ2xpY2sgfSkgPT4ge1xuICBjb25zdCBvbk1hZGVDbGljayA9ICgpID0+IG9uQ2xpY2s/LignTWFkZScpO1xuICBjb25zdCBvbkhlYXJ0Q2xpY2sgPSAoKSA9PiBvbkNsaWNrPy4oJ+KdpCcpO1xuICBjb25zdCBvbk5ZQ0NsaWNrID0gKCkgPT4gb25DbGljaz8uKCdOWUMnKTtcbiAgY29uc3Qgb25Db2RlY2FkZW15Q2xpY2sgPSAoKSA9PiBvbkNsaWNrPy4oJ0NvZGVjYWRlbXknKTtcblxuICBjb25zdCB5ZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuXG4gIHJldHVybiAoXG4gICAgPEJveFxuICAgICAgZGlzcGxheT17eyBtZDogJ2lubGluZS1ibG9jaycgfX1cbiAgICAgIHRleHRBbGlnbj17eyBfOiAnY2VudGVyJywgbWQ6ICdyaWdodCcgfX1cbiAgICA+XG4gICAgICB7b25DbGljayA/IChcbiAgICAgICAgPD5cbiAgICAgICAgICA8QW5jaG9yIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIiBvbkNsaWNrPXtvbk1hZGVDbGlja30+XG4gICAgICAgICAgICBNYWRlXG4gICAgICAgICAgPC9BbmNob3I+eycgJ31cbiAgICAgICAgICB3aXRoXG4gICAgICAgICAgPEhlYXJ0QW5jaG9yQ29udGFpbmVyIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIiBvbkNsaWNrPXtvbkhlYXJ0Q2xpY2t9PlxuICAgICAgICAgICAg77iP4p2k77iPXG4gICAgICAgICAgPC9IZWFydEFuY2hvckNvbnRhaW5lcj5cbiAgICAgICAgICBpbnsnICd9XG4gICAgICAgICAgPEFuY2hvciB2YXJpYW50PVwiaW50ZXJmYWNlXCIgb25DbGljaz17b25OWUNDbGlja30+XG4gICAgICAgICAgICBOWUNcbiAgICAgICAgICA8L0FuY2hvcj57JyAnfVxuICAgICAgICAgIMKpe2AgJHt5ZWFyfSBgfVxuICAgICAgICAgIDxBbmNob3IgdmFyaWFudD1cImludGVyZmFjZVwiIG9uQ2xpY2s9e29uQ29kZWNhZGVteUNsaWNrfT5cbiAgICAgICAgICAgIENvZGVjYWRlbXlcbiAgICAgICAgICA8L0FuY2hvcj5cbiAgICAgICAgPC8+XG4gICAgICApIDogKFxuICAgICAgICA8PlxuICAgICAgICAgIE1hZGUgd2l0aCA8SGVhcnRDb250YWluZXIgYXJpYS1sYWJlbD1cImxvdmVcIj7inaTvuI88L0hlYXJ0Q29udGFpbmVyPmluIE5ZQ1xuICAgICAgICAgIMKpIHt5ZWFyfSBDb2RlY2FkZW15XG4gICAgICAgIDwvPlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn07XG4iXX0= */"));
var HeartContainer = /*#__PURE__*/_styled("span", {
  target: "eaw4eyk0",
  label: "HeartContainer"
})(heartStyles, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTGVnYWwvTWFkZUluLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrQmtDIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTGVnYWwvTWFkZUluLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuY2hvciwgQm94IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBoZWFydFN0eWxlcyA9IGNzc2BcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmaWx0ZXI6IHNhdHVyYXRlKDAuNyk7XG4gIG1hcmdpbi1yaWdodDogMC4yNXJlbTtcbiAgbWluLXdpZHRoOiAxLjc1ZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbmA7XG5cbmNvbnN0IEhlYXJ0QW5jaG9yQ29udGFpbmVyID0gc3R5bGVkKEFuY2hvcilgXG4gICR7aGVhcnRTdHlsZXN9XG4gIGN1cnNvcjogcG9pbnRlcjtcbmA7XG5cbmNvbnN0IEhlYXJ0Q29udGFpbmVyID0gc3R5bGVkLnNwYW5gXG4gICR7aGVhcnRTdHlsZXN9XG5gO1xuXG5leHBvcnQgdHlwZSBNYWRlSW5Qcm9wcyA9IHtcbiAgb25DbGljaz86ICh0ZXh0OiBzdHJpbmcpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgTWFkZUluOiBSZWFjdC5GQzxNYWRlSW5Qcm9wcz4gPSAoeyBvbkNsaWNrIH0pID0+IHtcbiAgY29uc3Qgb25NYWRlQ2xpY2sgPSAoKSA9PiBvbkNsaWNrPy4oJ01hZGUnKTtcbiAgY29uc3Qgb25IZWFydENsaWNrID0gKCkgPT4gb25DbGljaz8uKCfinaQnKTtcbiAgY29uc3Qgb25OWUNDbGljayA9ICgpID0+IG9uQ2xpY2s/LignTllDJyk7XG4gIGNvbnN0IG9uQ29kZWNhZGVteUNsaWNrID0gKCkgPT4gb25DbGljaz8uKCdDb2RlY2FkZW15Jyk7XG5cbiAgY29uc3QgeWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcblxuICByZXR1cm4gKFxuICAgIDxCb3hcbiAgICAgIGRpc3BsYXk9e3sgbWQ6ICdpbmxpbmUtYmxvY2snIH19XG4gICAgICB0ZXh0QWxpZ249e3sgXzogJ2NlbnRlcicsIG1kOiAncmlnaHQnIH19XG4gICAgPlxuICAgICAge29uQ2xpY2sgPyAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPEFuY2hvciB2YXJpYW50PVwiaW50ZXJmYWNlXCIgb25DbGljaz17b25NYWRlQ2xpY2t9PlxuICAgICAgICAgICAgTWFkZVxuICAgICAgICAgIDwvQW5jaG9yPnsnICd9XG4gICAgICAgICAgd2l0aFxuICAgICAgICAgIDxIZWFydEFuY2hvckNvbnRhaW5lciB2YXJpYW50PVwiaW50ZXJmYWNlXCIgb25DbGljaz17b25IZWFydENsaWNrfT5cbiAgICAgICAgICAgIO+4j+KdpO+4j1xuICAgICAgICAgIDwvSGVhcnRBbmNob3JDb250YWluZXI+XG4gICAgICAgICAgaW57JyAnfVxuICAgICAgICAgIDxBbmNob3IgdmFyaWFudD1cImludGVyZmFjZVwiIG9uQ2xpY2s9e29uTllDQ2xpY2t9PlxuICAgICAgICAgICAgTllDXG4gICAgICAgICAgPC9BbmNob3I+eycgJ31cbiAgICAgICAgICDCqXtgICR7eWVhcn0gYH1cbiAgICAgICAgICA8QW5jaG9yIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIiBvbkNsaWNrPXtvbkNvZGVjYWRlbXlDbGlja30+XG4gICAgICAgICAgICBDb2RlY2FkZW15XG4gICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgIDwvPlxuICAgICAgKSA6IChcbiAgICAgICAgPD5cbiAgICAgICAgICBNYWRlIHdpdGggPEhlYXJ0Q29udGFpbmVyIGFyaWEtbGFiZWw9XCJsb3ZlXCI+4p2k77iPPC9IZWFydENvbnRhaW5lcj5pbiBOWUNcbiAgICAgICAgICDCqSB7eWVhcn0gQ29kZWNhZGVteVxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuIl19 */"));
export var MadeIn = function MadeIn(_ref) {
  var onClick = _ref.onClick;
  var onMadeClick = function onMadeClick() {
    return onClick === null || onClick === void 0 ? void 0 : onClick('Made');
  };
  var onHeartClick = function onHeartClick() {
    return onClick === null || onClick === void 0 ? void 0 : onClick('❤');
  };
  var onNYCClick = function onNYCClick() {
    return onClick === null || onClick === void 0 ? void 0 : onClick('NYC');
  };
  var onCodecademyClick = function onCodecademyClick() {
    return onClick === null || onClick === void 0 ? void 0 : onClick('Codecademy');
  };
  var year = new Date().getFullYear();
  return /*#__PURE__*/_jsx(Box, {
    display: {
      md: 'inline-block'
    },
    textAlign: {
      _: 'center',
      md: 'right'
    },
    children: onClick ? /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Anchor, {
        variant: "interface",
        onClick: onMadeClick,
        children: "Made"
      }), ' ', "with", /*#__PURE__*/_jsx(HeartAnchorContainer, {
        variant: "interface",
        onClick: onHeartClick,
        children: "\uFE0F\u2764\uFE0F"
      }), "in", ' ', /*#__PURE__*/_jsx(Anchor, {
        variant: "interface",
        onClick: onNYCClick,
        children: "NYC"
      }), ' ', "\xA9", " ".concat(year, " "), /*#__PURE__*/_jsx(Anchor, {
        variant: "interface",
        onClick: onCodecademyClick,
        children: "Codecademy"
      })]
    }) : /*#__PURE__*/_jsxs(_Fragment, {
      children: ["Made with ", /*#__PURE__*/_jsx(HeartContainer, {
        "aria-label": "love",
        children: "\u2764\uFE0F"
      }), "in NYC \xA9 ", year, " Codecademy"]
    })
  });
};