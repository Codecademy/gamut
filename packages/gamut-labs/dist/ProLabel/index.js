function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import _styled from "@emotion/styled/base";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { styledOptions, system, useCurrentMode, variant } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var logoStyles = variance.compose(system.layout, system.positioning, system.space);
var placementVariants = variant({
  prop: 'placement',
  variants: {
    inline: {
      verticalAlign: 'text-bottom'
    }
  }
});
var modeVariants = variant({
  prop: 'mode',
  base: {
    textColor: 'background-current'
  },
  variants: {
    light: {
      bg: 'navy'
    },
    dark: {
      bg: 'beige'
    }
  }
});
var Svg = /*#__PURE__*/_styled('svg', _extends({}, {
  target: "esni1wz0",
  label: "Svg"
}, styledOptions(['placement'])))(placementVariants, modeVariants, logoStyles, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Qcm9MYWJlbC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNENZIiwiZmlsZSI6Ii4uLy4uL3NyYy9Qcm9MYWJlbC9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb2xvck1vZGVzLFxuICBzdHlsZWRPcHRpb25zLFxuICBzeXN0ZW0sXG4gIHVzZUN1cnJlbnRNb2RlLFxuICB2YXJpYW50LFxufSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHsgU3R5bGVQcm9wcywgdmFyaWFuY2UgfSBmcm9tICdAY29kZWNhZGVteS92YXJpYW5jZSc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBTVkdQcm9wcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IHR5cGUgUHJvTGFiZWxQcm9wcyA9IFNWR1Byb3BzPFNWR1NWR0VsZW1lbnQ+ICZcbiAgU3R5bGVQcm9wczx0eXBlb2YgbG9nb1N0eWxlcz4gJlxuICBTdHlsZVByb3BzPHR5cGVvZiBwbGFjZW1lbnRWYXJpYW50cz4gJlxuICBTdHlsZVByb3BzPHR5cGVvZiBtb2RlVmFyaWFudHM+ICYge1xuICAgIG1vZGU/OiBDb2xvck1vZGVzO1xuICAgIGhlaWdodD86IG51bWJlcjtcbiAgfTtcblxuY29uc3QgbG9nb1N0eWxlcyA9IHZhcmlhbmNlLmNvbXBvc2UoXG4gIHN5c3RlbS5sYXlvdXQsXG4gIHN5c3RlbS5wb3NpdGlvbmluZyxcbiAgc3lzdGVtLnNwYWNlXG4pO1xuXG5jb25zdCBwbGFjZW1lbnRWYXJpYW50cyA9IHZhcmlhbnQoe1xuICBwcm9wOiAncGxhY2VtZW50JyxcbiAgdmFyaWFudHM6IHtcbiAgICBpbmxpbmU6IHtcbiAgICAgIHZlcnRpY2FsQWxpZ246ICd0ZXh0LWJvdHRvbScsXG4gICAgfSxcbiAgfSxcbn0pO1xuXG5jb25zdCBtb2RlVmFyaWFudHMgPSB2YXJpYW50KHtcbiAgcHJvcDogJ21vZGUnLFxuICBiYXNlOiB7IHRleHRDb2xvcjogJ2JhY2tncm91bmQtY3VycmVudCcgfSxcbiAgdmFyaWFudHM6IHtcbiAgICBsaWdodDogeyBiZzogJ25hdnknIH0sXG4gICAgZGFyazogeyBiZzogJ2JlaWdlJyB9LFxuICB9LFxufSk7XG5cbmNvbnN0IFN2ZyA9IHN0eWxlZChcbiAgJ3N2ZycsXG4gIHN0eWxlZE9wdGlvbnM8J3N2ZycsICdwbGFjZW1lbnQnPihbJ3BsYWNlbWVudCddKVxuKTxQcm9MYWJlbFByb3BzPihwbGFjZW1lbnRWYXJpYW50cywgbW9kZVZhcmlhbnRzLCBsb2dvU3R5bGVzKTtcblxuZXhwb3J0IGNvbnN0IFByb0xhYmVsOiBSZWFjdC5GQzxSZWFjdC5Db21wb25lbnRQcm9wczx0eXBlb2YgU3ZnPj4gPSAoe1xuICBtb2RlLFxuICBoZWlnaHQgPSAxNixcbiAgLi4ucHJvcHNcbn0pID0+IHtcbiAgY29uc3QgYWN0aXZlID0gdXNlQ3VycmVudE1vZGUobW9kZSk7XG4gIHJldHVybiAoXG4gICAgPFN2Z1xuICAgICAgey4uLnByb3BzfVxuICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICBtb2RlPXthY3RpdmV9XG4gICAgICB2aWV3Qm94PVwiMCAwIDMwIDE2XCJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgID5cbiAgICAgIDx0aXRsZT5Qcm8gb25seTwvdGl0bGU+XG4gICAgICA8cGF0aFxuICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgZD1cIk01LjgxNjEyIDMuMTk5ODlDNi44MTQ3OCAzLjE5OTg5IDcuNTc1NDUgMy40NzUyMiA4LjA5ODEyIDQuMDI1ODlDOC42MjA3OCA0LjU2NzIyIDguODgyMTIgNS4yODU4OSA4Ljg4MjEyIDYuMTgxODlDOC44ODIxMiA3LjA3Nzg5IDguNjIwNzggNy44MDEyMiA4LjA5ODEyIDguMzUxODlDNy41NzU0NSA4Ljg5MzIyIDYuODE0NzggOS4xNjM4OSA1LjgxNjEyIDkuMTYzODlIMy45NDAxMlYxMi45OTk5SDIuMTIwMTJWMy4xOTk4OUg1LjgxNjEyWk01Ljc0NjEyIDcuNDgzODlDNi4xNTY3OCA3LjQ4Mzg5IDYuNDc0MTIgNy4zNzY1NiA2LjY5ODEyIDcuMTYxODlDNi45MjIxMiA2Ljk0NzIyIDcuMDM0MTIgNi42MjA1NiA3LjAzNDEyIDYuMTgxODlDNy4wMzQxMiA1Ljc0MzIyIDYuOTIyMTIgNS40MTY1NiA2LjY5ODEyIDUuMjAxODlDNi40NzQxMiA0Ljk4NzIyIDYuMTU2NzggNC44Nzk4OSA1Ljc0NjEyIDQuODc5ODlIMy45NDAxMlY3LjQ4Mzg5SDUuNzQ2MTJaXCJcbiAgICAgIC8+XG4gICAgICA8cGF0aFxuICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgZD1cIk0xNC4wNDM2IDMuMTk5ODlDMTQuOTk1NiAzLjE5OTg5IDE1LjcyODMgMy40NTY1NiAxNi4yNDE2IDMuOTY5ODlDMTYuNzY0MyA0LjQ3Mzg5IDE3LjAyNTYgNS4xNDU4OSAxNy4wMjU2IDUuOTg1ODlDMTcuMDI1NiA2LjYzOTIyIDE2Ljg2NyA3LjE5OTIyIDE2LjU0OTYgNy42NjU4OUMxNi4yMzIzIDguMTIzMjIgMTUuNzc5NiA4LjQ0MDU2IDE1LjE5MTYgOC42MTc4OUwxNy45MDc2IDEyLjk5OTlIMTUuODc3NkwxMy4yNDU2IDguNzcxODlIMTIuMjkzNlYxMi45OTk5SDEwLjQ3MzZWMy4xOTk4OUgxNC4wNDM2Wk0xNC4wNTc2IDcuMDkxODlDMTQuNDEyMyA3LjA5MTg5IDE0LjY5MjMgNy4wMDMyMiAxNC44OTc2IDYuODI1ODlDMTUuMTAzIDYuNjQ4NTYgMTUuMjA1NiA2LjM2ODU2IDE1LjIwNTYgNS45ODU4OUMxNS4yMDU2IDUuNjAzMjIgMTUuMTAzIDUuMzIzMjIgMTQuODk3NiA1LjE0NTg5QzE0LjY5MjMgNC45Njg1NiAxNC40MTIzIDQuODc5ODkgMTQuMDU3NiA0Ljg3OTg5SDEyLjI5MzZWNy4wOTE4OUgxNC4wNTc2WlwiXG4gICAgICAvPlxuICAgICAgPHBhdGhcbiAgICAgICAgZmlsbD1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgIGQ9XCJNMjIuNzM4NyAxMy4xMTE5QzIxLjg4OTQgMTMuMTExOSAyMS4xMTQ3IDEyLjkyNTIgMjAuNDE0NyAxMi41NTE5QzE5LjcxNDcgMTIuMTc4NiAxOS4xNTQ3IDExLjYxODYgMTguNzM0NyAxMC44NzE5QzE4LjMyNDEgMTAuMTE1OSAxOC4xMTg3IDkuMTkxODkgMTguMTE4NyA4LjA5OTg5QzE4LjExODcgNy4wMDc4OSAxOC4zMjQxIDYuMDg4NTYgMTguNzM0NyA1LjM0MTg5QzE5LjE1NDcgNC41ODU4OSAxOS43MTQ3IDQuMDIxMjIgMjAuNDE0NyAzLjY0Nzg5QzIxLjExNDcgMy4yNzQ1NiAyMS44ODk0IDMuMDg3ODkgMjIuNzM4NyAzLjA4Nzg5QzIzLjU4ODEgMy4wODc4OSAyNC4zNjI3IDMuMjc0NTYgMjUuMDYyNyAzLjY0Nzg5QzI1Ljc2MjcgNC4wMjEyMiAyNi4zMTgxIDQuNTg1ODkgMjYuNzI4NyA1LjM0MTg5QzI3LjE0ODcgNi4wODg1NiAyNy4zNTg3IDcuMDA3ODkgMjcuMzU4NyA4LjA5OTg5QzI3LjM1ODcgOS4xOTE4OSAyNy4xNDg3IDEwLjExNTkgMjYuNzI4NyAxMC44NzE5QzI2LjMxODEgMTEuNjE4NiAyNS43NjI3IDEyLjE3ODYgMjUuMDYyNyAxMi41NTE5QzI0LjM2MjcgMTIuOTI1MiAyMy41ODgxIDEzLjExMTkgMjIuNzM4NyAxMy4xMTE5Wk0yMi43Mzg3IDExLjQzMTlDMjMuMjUyMSAxMS40MzE5IDIzLjcxNDEgMTEuMzE1MiAyNC4xMjQ3IDExLjA4MTlDMjQuNTQ0NyAxMC44MzkyIDI0Ljg4MDcgMTAuNDcwNiAyNS4xMzI3IDkuOTc1ODlDMjUuMzg0NyA5LjQ3MTg5IDI1LjUxMDcgOC44NDY1NiAyNS41MTA3IDguMDk5ODlDMjUuNTEwNyA3LjM1MzIyIDI1LjM4NDcgNi43MzI1NiAyNS4xMzI3IDYuMjM3ODlDMjQuODgwNyA1LjczMzg5IDI0LjU0NDcgNS4zNjUyMiAyNC4xMjQ3IDUuMTMxODlDMjMuNzE0MSA0Ljg4OTIyIDIzLjI1MjEgNC43Njc4OSAyMi43Mzg3IDQuNzY3ODlDMjIuMjI1NCA0Ljc2Nzg5IDIxLjc1ODcgNC44ODkyMiAyMS4zMzg3IDUuMTMxODlDMjAuOTI4MSA1LjM2NTIyIDIwLjU5NjcgNS43MzM4OSAyMC4zNDQ3IDYuMjM3ODlDMjAuMDkyNyA2LjczMjU2IDE5Ljk2NjcgNy4zNTMyMiAxOS45NjY3IDguMDk5ODlDMTkuOTY2NyA4Ljg0NjU2IDIwLjA5MjcgOS40NzE4OSAyMC4zNDQ3IDkuOTc1ODlDMjAuNTk2NyAxMC40NzA2IDIwLjkyODEgMTAuODM5MiAyMS4zMzg3IDExLjA4MTlDMjEuNzU4NyAxMS4zMTUyIDIyLjIyNTQgMTEuNDMxOSAyMi43Mzg3IDExLjQzMTlaXCJcbiAgICAgIC8+XG4gICAgPC9Tdmc+XG4gICk7XG59O1xuIl19 */");
export var ProLabel = function ProLabel(_ref) {
  var mode = _ref.mode,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 16 : _ref$height,
    props = _objectWithoutProperties(_ref, ["mode", "height"]);
  var active = useCurrentMode(mode);
  return /*#__PURE__*/_jsxs(Svg, _objectSpread(_objectSpread({}, props), {}, {
    height: height,
    mode: active,
    viewBox: "0 0 30 16",
    xmlns: "http://www.w3.org/2000/svg",
    children: [/*#__PURE__*/_jsx("title", {
      children: "Pro only"
    }), /*#__PURE__*/_jsx("path", {
      fill: "currentColor",
      d: "M5.81612 3.19989C6.81478 3.19989 7.57545 3.47522 8.09812 4.02589C8.62078 4.56722 8.88212 5.28589 8.88212 6.18189C8.88212 7.07789 8.62078 7.80122 8.09812 8.35189C7.57545 8.89322 6.81478 9.16389 5.81612 9.16389H3.94012V12.9999H2.12012V3.19989H5.81612ZM5.74612 7.48389C6.15678 7.48389 6.47412 7.37656 6.69812 7.16189C6.92212 6.94722 7.03412 6.62056 7.03412 6.18189C7.03412 5.74322 6.92212 5.41656 6.69812 5.20189C6.47412 4.98722 6.15678 4.87989 5.74612 4.87989H3.94012V7.48389H5.74612Z"
    }), /*#__PURE__*/_jsx("path", {
      fill: "currentColor",
      d: "M14.0436 3.19989C14.9956 3.19989 15.7283 3.45656 16.2416 3.96989C16.7643 4.47389 17.0256 5.14589 17.0256 5.98589C17.0256 6.63922 16.867 7.19922 16.5496 7.66589C16.2323 8.12322 15.7796 8.44056 15.1916 8.61789L17.9076 12.9999H15.8776L13.2456 8.77189H12.2936V12.9999H10.4736V3.19989H14.0436ZM14.0576 7.09189C14.4123 7.09189 14.6923 7.00322 14.8976 6.82589C15.103 6.64856 15.2056 6.36856 15.2056 5.98589C15.2056 5.60322 15.103 5.32322 14.8976 5.14589C14.6923 4.96856 14.4123 4.87989 14.0576 4.87989H12.2936V7.09189H14.0576Z"
    }), /*#__PURE__*/_jsx("path", {
      fill: "currentColor",
      d: "M22.7387 13.1119C21.8894 13.1119 21.1147 12.9252 20.4147 12.5519C19.7147 12.1786 19.1547 11.6186 18.7347 10.8719C18.3241 10.1159 18.1187 9.19189 18.1187 8.09989C18.1187 7.00789 18.3241 6.08856 18.7347 5.34189C19.1547 4.58589 19.7147 4.02122 20.4147 3.64789C21.1147 3.27456 21.8894 3.08789 22.7387 3.08789C23.5881 3.08789 24.3627 3.27456 25.0627 3.64789C25.7627 4.02122 26.3181 4.58589 26.7287 5.34189C27.1487 6.08856 27.3587 7.00789 27.3587 8.09989C27.3587 9.19189 27.1487 10.1159 26.7287 10.8719C26.3181 11.6186 25.7627 12.1786 25.0627 12.5519C24.3627 12.9252 23.5881 13.1119 22.7387 13.1119ZM22.7387 11.4319C23.2521 11.4319 23.7141 11.3152 24.1247 11.0819C24.5447 10.8392 24.8807 10.4706 25.1327 9.97589C25.3847 9.47189 25.5107 8.84656 25.5107 8.09989C25.5107 7.35322 25.3847 6.73256 25.1327 6.23789C24.8807 5.73389 24.5447 5.36522 24.1247 5.13189C23.7141 4.88922 23.2521 4.76789 22.7387 4.76789C22.2254 4.76789 21.7587 4.88922 21.3387 5.13189C20.9281 5.36522 20.5967 5.73389 20.3447 6.23789C20.0927 6.73256 19.9667 7.35322 19.9667 8.09989C19.9667 8.84656 20.0927 9.47189 20.3447 9.97589C20.5967 10.4706 20.9281 10.8392 21.3387 11.0819C21.7587 11.3152 22.2254 11.4319 22.7387 11.4319Z"
    })]
  }));
};