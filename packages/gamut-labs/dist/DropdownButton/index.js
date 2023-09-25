import _styled from "@emotion/styled/base";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { Box, FillButton, IconButton, Popover, StrokeButton } from '@codecademy/gamut';
import { ArrowChevronDownFilledIcon, MiniKebabMenuIcon } from '@codecademy/gamut-icons';
import { css, pxRem, styledOptions } from '@codecademy/gamut-styles';
import { useRef, useState } from 'react';
import * as React from 'react';
import { DropdownList } from './DropdownList';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var DownArrow = /*#__PURE__*/_styled(ArrowChevronDownFilledIcon, _extends({}, {
  target: "e111d9da1",
  label: "DownArrow"
}, styledOptions))("margin-left:", pxRem(8), ";transition:transform 0.35s ease-out;", function (_ref) {
  var isOpen = _ref.isOpen;
  return isOpen && 'transform: rotate(-180deg)';
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ecm9wZG93bkJ1dHRvbi9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUJFIiwiZmlsZSI6Ii4uLy4uL3NyYy9Ecm9wZG93bkJ1dHRvbi9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBCb3gsXG4gIEZpbGxCdXR0b24sXG4gIEljb25CdXR0b24sXG4gIFBvcG92ZXIsXG4gIFN0cm9rZUJ1dHRvbixcbiAgV2l0aENoaWxkcmVuUHJvcCxcbn0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHtcbiAgQXJyb3dDaGV2cm9uRG93bkZpbGxlZEljb24sXG4gIE1pbmlLZWJhYk1lbnVJY29uLFxufSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgeyBjc3MsIHB4UmVtLCBzdHlsZWRPcHRpb25zIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IERyb3Bkb3duSXRlbSwgRHJvcGRvd25MaXN0IH0gZnJvbSAnLi9Ecm9wZG93bkxpc3QnO1xuXG5jb25zdCBEb3duQXJyb3cgPSBzdHlsZWQoQXJyb3dDaGV2cm9uRG93bkZpbGxlZEljb24sIHN0eWxlZE9wdGlvbnMpPHtcbiAgaXNPcGVuPzogYm9vbGVhbjtcbn0+YFxuICBtYXJnaW4tbGVmdDogJHtweFJlbSg4KX07XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjM1cyBlYXNlLW91dDtcbiAgJHsoeyBpc09wZW4gfSkgPT4gaXNPcGVuICYmICd0cmFuc2Zvcm06IHJvdGF0ZSgtMTgwZGVnKSd9O1xuYDtcblxuY29uc3QgSG9yaXpvbnRhbEtlYmFiSWNvbiA9IHN0eWxlZChNaW5pS2ViYWJNZW51SWNvbikoXG4gIGNzcyh7XG4gICAgdHJhbnNmb3JtOiAncm90YXRlKDkwZGVnKScsXG4gIH0pXG4pO1xuXG5leHBvcnQgaW50ZXJmYWNlIERyb3Bkb3duQnV0dG9uUHJvcHMgZXh0ZW5kcyBXaXRoQ2hpbGRyZW5Qcm9wIHtcbiAgYnV0dG9uVHlwZT86ICdmaWxsJyB8ICdzdHJva2UnIHwgJ2tlYmFiJyB8ICdob3Jpem9udGFsS2ViYWInO1xuICBkcm9wZG93bkl0ZW1zOiBEcm9wZG93bkl0ZW1bXTtcbiAgYWxpZ24/OiAnbGVmdCcgfCAncmlnaHQnO1xuICBvbkNsaWNrPzogKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB2b2lkO1xuICB2ZXJ0aWNhbE9mZnNldD86IG51bWJlcjtcbiAgaG9yaXpvbnRhbE9mZnNldD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IERyb3Bkb3duQnV0dG9uOiBSZWFjdC5GQzxEcm9wZG93bkJ1dHRvblByb3BzPiA9ICh7XG4gIGJ1dHRvblR5cGUgPSAnZmlsbCcsXG4gIGNoaWxkcmVuLFxuICBhbGlnbiA9ICdsZWZ0JyxcbiAgZHJvcGRvd25JdGVtcyxcbiAgb25DbGljayxcbiAgdmVydGljYWxPZmZzZXQsXG4gIGhvcml6b250YWxPZmZzZXQsXG59KSA9PiB7XG4gIGNvbnN0IHRhcmdldFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKCFpc09wZW4pIHtcbiAgICAgIG9uQ2xpY2s/LihldmVudCk7XG4gICAgfVxuICAgIHNldElzT3BlbighaXNPcGVuKTtcbiAgfTtcbiAgY29uc3QgaGFuZGxlUmVxdWVzdENsb3NlZCA9ICgpID0+IHtcbiAgICBzZXRJc09wZW4oZmFsc2UpO1xuICB9O1xuXG4gIGxldCBjbGlja1RhcmdldDogUmVhY3QuUmVhY3ROb2RlO1xuICBzd2l0Y2ggKGJ1dHRvblR5cGUpIHtcbiAgICBjYXNlICdmaWxsJzpcbiAgICAgIGNsaWNrVGFyZ2V0ID0gKFxuICAgICAgICA8RmlsbEJ1dHRvblxuICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn1cbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDbGlja31cbiAgICAgICAgICBkYXRhLXRlc3RpZD1cImRyb3Bkb3duLWZpbGwtYnV0dG9uXCJcbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICA8RG93bkFycm93IGlzT3Blbj17aXNPcGVufSBzaXplPXsxMn0gYXJpYS1sYWJlbD1cImRyb3Bkb3duXCIgLz5cbiAgICAgICAgPC9GaWxsQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3N0cm9rZSc6XG4gICAgICBjbGlja1RhcmdldCA9IChcbiAgICAgICAgPFN0cm9rZUJ1dHRvblxuICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn1cbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDbGlja31cbiAgICAgICAgICBkYXRhLXRlc3RpZD1cImRyb3Bkb3duLXN0cm9rZS1idXR0b25cIlxuICAgICAgICA+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgIDxEb3duQXJyb3cgaXNPcGVuPXtpc09wZW59IHNpemU9ezEyfSBhcmlhLWxhYmVsPVwiZHJvcGRvd25cIiAvPlxuICAgICAgICA8L1N0cm9rZUJ1dHRvbj5cbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdrZWJhYic6XG4gICAgICBjbGlja1RhcmdldCA9IChcbiAgICAgICAgPEljb25CdXR0b25cbiAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtpc09wZW59XG4gICAgICAgICAgYXJpYS1sYWJlbD1cIk1vcmUgb3B0aW9uc1wiXG4gICAgICAgICAgaWNvbj17TWluaUtlYmFiTWVudUljb259XG4gICAgICAgICAgc2l6ZT1cInNtYWxsXCJcbiAgICAgICAgICB2YXJpYW50PVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDbGlja31cbiAgICAgICAgICBkYXRhLXRlc3RpZD1cImRyb3Bkb3duLWtlYmFiLWJ1dHRvblwiXG4gICAgICAgIC8+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaG9yaXpvbnRhbEtlYmFiJzpcbiAgICAgIGNsaWNrVGFyZ2V0ID0gKFxuICAgICAgICA8SWNvbkJ1dHRvblxuICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn1cbiAgICAgICAgICBhcmlhLWxhYmVsPVwiTW9yZSBvcHRpb25zXCJcbiAgICAgICAgICBpY29uPXtIb3Jpem9udGFsS2ViYWJJY29ufVxuICAgICAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICAgICAgdmFyaWFudD1cInNlY29uZGFyeVwiXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xpY2t9XG4gICAgICAgICAgZGF0YS10ZXN0aWQ9XCJkcm9wZG93bi1ob3Jpem9udGFsLWtlYmFiLWJ1dHRvblwiXG4gICAgICAgIC8+XG4gICAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPEJveCBkaXNwbGF5PVwiaW5saW5lLWJsb2NrXCIgcmVmPXt0YXJnZXRSZWZ9PlxuICAgICAgICB7Y2xpY2tUYXJnZXR9XG4gICAgICA8L0JveD5cbiAgICAgIHtpc09wZW4gJiYgZHJvcGRvd25JdGVtcy5sZW5ndGggIT09IDAgJiYgKFxuICAgICAgICA8UG9wb3ZlclxuICAgICAgICAgIHRhcmdldFJlZj17dGFyZ2V0UmVmfVxuICAgICAgICAgIGlzT3Blbj17aXNPcGVufVxuICAgICAgICAgIG9uUmVxdWVzdENsb3NlPXtoYW5kbGVSZXF1ZXN0Q2xvc2VkfVxuICAgICAgICAgIGFsaWduPXthbGlnbn1cbiAgICAgICAgICB2ZXJ0aWNhbE9mZnNldD17dmVydGljYWxPZmZzZXR9XG4gICAgICAgICAgaG9yaXpvbnRhbE9mZnNldD17aG9yaXpvbnRhbE9mZnNldH1cbiAgICAgICAgICBvdXRsaW5lXG4gICAgICAgID5cbiAgICAgICAgICA8RHJvcGRvd25MaXN0XG4gICAgICAgICAgICBkcm9wZG93bkl0ZW1zPXtkcm9wZG93bkl0ZW1zfVxuICAgICAgICAgICAgb25DbG9zZT17aGFuZGxlUmVxdWVzdENsb3NlZH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L1BvcG92ZXI+XG4gICAgICApfVxuICAgIDwvPlxuICApO1xufTtcbiJdfQ== */"));
var HorizontalKebabIcon = /*#__PURE__*/_styled(MiniKebabMenuIcon, {
  target: "e111d9da0",
  label: "HorizontalKebabIcon"
})(css({
  transform: 'rotate(90deg)'
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ecm9wZG93bkJ1dHRvbi9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkI0QiIsImZpbGUiOiIuLi8uLi9zcmMvRHJvcGRvd25CdXR0b24vaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQm94LFxuICBGaWxsQnV0dG9uLFxuICBJY29uQnV0dG9uLFxuICBQb3BvdmVyLFxuICBTdHJva2VCdXR0b24sXG4gIFdpdGhDaGlsZHJlblByb3AsXG59IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7XG4gIEFycm93Q2hldnJvbkRvd25GaWxsZWRJY29uLFxuICBNaW5pS2ViYWJNZW51SWNvbixcbn0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtaWNvbnMnO1xuaW1wb3J0IHsgY3NzLCBweFJlbSwgc3R5bGVkT3B0aW9ucyB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBEcm9wZG93bkl0ZW0sIERyb3Bkb3duTGlzdCB9IGZyb20gJy4vRHJvcGRvd25MaXN0JztcblxuY29uc3QgRG93bkFycm93ID0gc3R5bGVkKEFycm93Q2hldnJvbkRvd25GaWxsZWRJY29uLCBzdHlsZWRPcHRpb25zKTx7XG4gIGlzT3Blbj86IGJvb2xlYW47XG59PmBcbiAgbWFyZ2luLWxlZnQ6ICR7cHhSZW0oOCl9O1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zNXMgZWFzZS1vdXQ7XG4gICR7KHsgaXNPcGVuIH0pID0+IGlzT3BlbiAmJiAndHJhbnNmb3JtOiByb3RhdGUoLTE4MGRlZyknfTtcbmA7XG5cbmNvbnN0IEhvcml6b250YWxLZWJhYkljb24gPSBzdHlsZWQoTWluaUtlYmFiTWVudUljb24pKFxuICBjc3Moe1xuICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSg5MGRlZyknLFxuICB9KVxuKTtcblxuZXhwb3J0IGludGVyZmFjZSBEcm9wZG93bkJ1dHRvblByb3BzIGV4dGVuZHMgV2l0aENoaWxkcmVuUHJvcCB7XG4gIGJ1dHRvblR5cGU/OiAnZmlsbCcgfCAnc3Ryb2tlJyB8ICdrZWJhYicgfCAnaG9yaXpvbnRhbEtlYmFiJztcbiAgZHJvcGRvd25JdGVtczogRHJvcGRvd25JdGVtW107XG4gIGFsaWduPzogJ2xlZnQnIHwgJ3JpZ2h0JztcbiAgb25DbGljaz86IChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4gdm9pZDtcbiAgdmVydGljYWxPZmZzZXQ/OiBudW1iZXI7XG4gIGhvcml6b250YWxPZmZzZXQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBEcm9wZG93bkJ1dHRvbjogUmVhY3QuRkM8RHJvcGRvd25CdXR0b25Qcm9wcz4gPSAoe1xuICBidXR0b25UeXBlID0gJ2ZpbGwnLFxuICBjaGlsZHJlbixcbiAgYWxpZ24gPSAnbGVmdCcsXG4gIGRyb3Bkb3duSXRlbXMsXG4gIG9uQ2xpY2ssXG4gIHZlcnRpY2FsT2Zmc2V0LFxuICBob3Jpem9udGFsT2Zmc2V0LFxufSkgPT4ge1xuICBjb25zdCB0YXJnZXRSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBoYW5kbGVDbGljayA9IChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgIGlmICghaXNPcGVuKSB7XG4gICAgICBvbkNsaWNrPy4oZXZlbnQpO1xuICAgIH1cbiAgICBzZXRJc09wZW4oIWlzT3Blbik7XG4gIH07XG4gIGNvbnN0IGhhbmRsZVJlcXVlc3RDbG9zZWQgPSAoKSA9PiB7XG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgfTtcblxuICBsZXQgY2xpY2tUYXJnZXQ6IFJlYWN0LlJlYWN0Tm9kZTtcbiAgc3dpdGNoIChidXR0b25UeXBlKSB7XG4gICAgY2FzZSAnZmlsbCc6XG4gICAgICBjbGlja1RhcmdldCA9IChcbiAgICAgICAgPEZpbGxCdXR0b25cbiAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtpc09wZW59XG4gICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xpY2t9XG4gICAgICAgICAgZGF0YS10ZXN0aWQ9XCJkcm9wZG93bi1maWxsLWJ1dHRvblwiXG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPERvd25BcnJvdyBpc09wZW49e2lzT3Blbn0gc2l6ZT17MTJ9IGFyaWEtbGFiZWw9XCJkcm9wZG93blwiIC8+XG4gICAgICAgIDwvRmlsbEJ1dHRvbj5cbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzdHJva2UnOlxuICAgICAgY2xpY2tUYXJnZXQgPSAoXG4gICAgICAgIDxTdHJva2VCdXR0b25cbiAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtpc09wZW59XG4gICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xpY2t9XG4gICAgICAgICAgZGF0YS10ZXN0aWQ9XCJkcm9wZG93bi1zdHJva2UtYnV0dG9uXCJcbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICA8RG93bkFycm93IGlzT3Blbj17aXNPcGVufSBzaXplPXsxMn0gYXJpYS1sYWJlbD1cImRyb3Bkb3duXCIgLz5cbiAgICAgICAgPC9TdHJva2VCdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAna2ViYWInOlxuICAgICAgY2xpY2tUYXJnZXQgPSAoXG4gICAgICAgIDxJY29uQnV0dG9uXG4gICAgICAgICAgYXJpYS1leHBhbmRlZD17aXNPcGVufVxuICAgICAgICAgIGFyaWEtbGFiZWw9XCJNb3JlIG9wdGlvbnNcIlxuICAgICAgICAgIGljb249e01pbmlLZWJhYk1lbnVJY29ufVxuICAgICAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICAgICAgdmFyaWFudD1cInNlY29uZGFyeVwiXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xpY2t9XG4gICAgICAgICAgZGF0YS10ZXN0aWQ9XCJkcm9wZG93bi1rZWJhYi1idXR0b25cIlxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2hvcml6b250YWxLZWJhYic6XG4gICAgICBjbGlja1RhcmdldCA9IChcbiAgICAgICAgPEljb25CdXR0b25cbiAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtpc09wZW59XG4gICAgICAgICAgYXJpYS1sYWJlbD1cIk1vcmUgb3B0aW9uc1wiXG4gICAgICAgICAgaWNvbj17SG9yaXpvbnRhbEtlYmFiSWNvbn1cbiAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfVxuICAgICAgICAgIGRhdGEtdGVzdGlkPVwiZHJvcGRvd24taG9yaXpvbnRhbC1rZWJhYi1idXR0b25cIlxuICAgICAgICAvPlxuICAgICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxCb3ggZGlzcGxheT1cImlubGluZS1ibG9ja1wiIHJlZj17dGFyZ2V0UmVmfT5cbiAgICAgICAge2NsaWNrVGFyZ2V0fVxuICAgICAgPC9Cb3g+XG4gICAgICB7aXNPcGVuICYmIGRyb3Bkb3duSXRlbXMubGVuZ3RoICE9PSAwICYmIChcbiAgICAgICAgPFBvcG92ZXJcbiAgICAgICAgICB0YXJnZXRSZWY9e3RhcmdldFJlZn1cbiAgICAgICAgICBpc09wZW49e2lzT3Blbn1cbiAgICAgICAgICBvblJlcXVlc3RDbG9zZT17aGFuZGxlUmVxdWVzdENsb3NlZH1cbiAgICAgICAgICBhbGlnbj17YWxpZ259XG4gICAgICAgICAgdmVydGljYWxPZmZzZXQ9e3ZlcnRpY2FsT2Zmc2V0fVxuICAgICAgICAgIGhvcml6b250YWxPZmZzZXQ9e2hvcml6b250YWxPZmZzZXR9XG4gICAgICAgICAgb3V0bGluZVxuICAgICAgICA+XG4gICAgICAgICAgPERyb3Bkb3duTGlzdFxuICAgICAgICAgICAgZHJvcGRvd25JdGVtcz17ZHJvcGRvd25JdGVtc31cbiAgICAgICAgICAgIG9uQ2xvc2U9e2hhbmRsZVJlcXVlc3RDbG9zZWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Qb3BvdmVyPlxuICAgICAgKX1cbiAgICA8Lz5cbiAgKTtcbn07XG4iXX0= */");
export var DropdownButton = function DropdownButton(_ref2) {
  var _ref2$buttonType = _ref2.buttonType,
    buttonType = _ref2$buttonType === void 0 ? 'fill' : _ref2$buttonType,
    children = _ref2.children,
    _ref2$align = _ref2.align,
    align = _ref2$align === void 0 ? 'left' : _ref2$align,
    dropdownItems = _ref2.dropdownItems,
    onClick = _ref2.onClick,
    verticalOffset = _ref2.verticalOffset,
    horizontalOffset = _ref2.horizontalOffset;
  var targetRef = useRef(null);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  var handleClick = function handleClick(event) {
    if (!isOpen) {
      onClick === null || onClick === void 0 ? void 0 : onClick(event);
    }
    setIsOpen(!isOpen);
  };
  var handleRequestClosed = function handleRequestClosed() {
    setIsOpen(false);
  };
  var clickTarget;
  switch (buttonType) {
    case 'fill':
      clickTarget = /*#__PURE__*/_jsxs(FillButton, {
        "aria-expanded": isOpen,
        onClick: handleClick,
        "data-testid": "dropdown-fill-button",
        children: [children, /*#__PURE__*/_jsx(DownArrow, {
          isOpen: isOpen,
          size: 12,
          "aria-label": "dropdown"
        })]
      });
      break;
    case 'stroke':
      clickTarget = /*#__PURE__*/_jsxs(StrokeButton, {
        "aria-expanded": isOpen,
        onClick: handleClick,
        "data-testid": "dropdown-stroke-button",
        children: [children, /*#__PURE__*/_jsx(DownArrow, {
          isOpen: isOpen,
          size: 12,
          "aria-label": "dropdown"
        })]
      });
      break;
    case 'kebab':
      clickTarget = /*#__PURE__*/_jsx(IconButton, {
        "aria-expanded": isOpen,
        "aria-label": "More options",
        icon: MiniKebabMenuIcon,
        size: "small",
        variant: "secondary",
        onClick: handleClick,
        "data-testid": "dropdown-kebab-button"
      });
      break;
    case 'horizontalKebab':
      clickTarget = /*#__PURE__*/_jsx(IconButton, {
        "aria-expanded": isOpen,
        "aria-label": "More options",
        icon: HorizontalKebabIcon,
        size: "small",
        variant: "secondary",
        onClick: handleClick,
        "data-testid": "dropdown-horizontal-kebab-button"
      });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Box, {
      display: "inline-block",
      ref: targetRef,
      children: clickTarget
    }), isOpen && dropdownItems.length !== 0 && /*#__PURE__*/_jsx(Popover, {
      targetRef: targetRef,
      isOpen: isOpen,
      onRequestClose: handleRequestClosed,
      align: align,
      verticalOffset: verticalOffset,
      horizontalOffset: horizontalOffset,
      outline: true,
      children: /*#__PURE__*/_jsx(DropdownList, {
        dropdownItems: dropdownItems,
        onClose: handleRequestClosed
      })
    })]
  });
};