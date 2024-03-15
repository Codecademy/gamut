import _styled from "@emotion/styled/base";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { Box, FillButton, IconButton, Popover, StrokeButton } from '@codecademy/gamut';
import { ArrowChevronDownFilledIcon, MiniKebabMenuIcon } from '@codecademy/gamut-icons';
import { css, pxRem, styledOptions } from '@codecademy/gamut-styles';
import React, { useRef, useState } from 'react';
import { DropdownList } from './DropdownList';

var DownArrow = /*#__PURE__*/_styled(ArrowChevronDownFilledIcon, _extends({}, {
  target: "e111d9da1",
  label: "DownArrow"
}, styledOptions))("margin-left:", pxRem(8), ";transition:transform 0.35s ease-out;", function (_ref) {
  var isOpen = _ref.isOpen;
  return isOpen && 'transform: rotate(-180deg)';
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ecm9wZG93bkJ1dHRvbi9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUJFIiwiZmlsZSI6Ii4uLy4uL3NyYy9Ecm9wZG93bkJ1dHRvbi9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBCb3gsXG4gIEZpbGxCdXR0b24sXG4gIEljb25CdXR0b24sXG4gIFBvcG92ZXIsXG4gIFN0cm9rZUJ1dHRvbixcbn0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHtcbiAgQXJyb3dDaGV2cm9uRG93bkZpbGxlZEljb24sXG4gIE1pbmlLZWJhYk1lbnVJY29uLFxufSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgeyBjc3MsIHB4UmVtLCBzdHlsZWRPcHRpb25zIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCwgeyB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBEcm9wZG93bkl0ZW0sIERyb3Bkb3duTGlzdCB9IGZyb20gJy4vRHJvcGRvd25MaXN0JztcblxuY29uc3QgRG93bkFycm93ID0gc3R5bGVkKEFycm93Q2hldnJvbkRvd25GaWxsZWRJY29uLCBzdHlsZWRPcHRpb25zKTx7XG4gIGlzT3Blbj86IGJvb2xlYW47XG59PmBcbiAgbWFyZ2luLWxlZnQ6ICR7cHhSZW0oOCl9O1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zNXMgZWFzZS1vdXQ7XG4gICR7KHsgaXNPcGVuIH0pID0+IGlzT3BlbiAmJiAndHJhbnNmb3JtOiByb3RhdGUoLTE4MGRlZyknfTtcbmA7XG5cbmNvbnN0IEhvcml6b250YWxLZWJhYkljb24gPSBzdHlsZWQoTWluaUtlYmFiTWVudUljb24pKFxuICBjc3Moe1xuICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSg5MGRlZyknLFxuICB9KVxuKTtcblxuZXhwb3J0IHR5cGUgRHJvcGRvd25CdXR0b25Qcm9wcyA9IHtcbiAgYnV0dG9uVHlwZT86ICdmaWxsJyB8ICdzdHJva2UnIHwgJ2tlYmFiJyB8ICdob3Jpem9udGFsS2ViYWInO1xuICBkcm9wZG93bkl0ZW1zOiBEcm9wZG93bkl0ZW1bXTtcbiAgYWxpZ24/OiAnbGVmdCcgfCAncmlnaHQnO1xuICBvbkNsaWNrPzogKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB2b2lkO1xuICB2ZXJ0aWNhbE9mZnNldD86IG51bWJlcjtcbiAgaG9yaXpvbnRhbE9mZnNldD86IG51bWJlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBEcm9wZG93bkJ1dHRvbjogUmVhY3QuRkM8RHJvcGRvd25CdXR0b25Qcm9wcz4gPSAoe1xuICBidXR0b25UeXBlID0gJ2ZpbGwnLFxuICBjaGlsZHJlbixcbiAgYWxpZ24gPSAnbGVmdCcsXG4gIGRyb3Bkb3duSXRlbXMsXG4gIG9uQ2xpY2ssXG4gIHZlcnRpY2FsT2Zmc2V0LFxuICBob3Jpem9udGFsT2Zmc2V0LFxufSkgPT4ge1xuICBjb25zdCB0YXJnZXRSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBoYW5kbGVDbGljayA9IChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgIGlmICghaXNPcGVuKSB7XG4gICAgICBvbkNsaWNrPy4oZXZlbnQpO1xuICAgIH1cbiAgICBzZXRJc09wZW4oIWlzT3Blbik7XG4gIH07XG4gIGNvbnN0IGhhbmRsZVJlcXVlc3RDbG9zZWQgPSAoKSA9PiB7XG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgfTtcblxuICBsZXQgY2xpY2tUYXJnZXQ6IFJlYWN0LlJlYWN0Tm9kZTtcbiAgc3dpdGNoIChidXR0b25UeXBlKSB7XG4gICAgY2FzZSAnZmlsbCc6XG4gICAgICBjbGlja1RhcmdldCA9IChcbiAgICAgICAgPEZpbGxCdXR0b24gb25DbGljaz17aGFuZGxlQ2xpY2t9IGRhdGEtdGVzdGlkPVwiZHJvcGRvd24tZmlsbC1idXR0b25cIj5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPERvd25BcnJvdyBpc09wZW49e2lzT3Blbn0gc2l6ZT17MTJ9IGFyaWEtbGFiZWw9XCJkcm9wZG93blwiIC8+XG4gICAgICAgIDwvRmlsbEJ1dHRvbj5cbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzdHJva2UnOlxuICAgICAgY2xpY2tUYXJnZXQgPSAoXG4gICAgICAgIDxTdHJva2VCdXR0b25cbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDbGlja31cbiAgICAgICAgICBkYXRhLXRlc3RpZD1cImRyb3Bkb3duLXN0cm9rZS1idXR0b25cIlxuICAgICAgICA+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgIDxEb3duQXJyb3cgaXNPcGVuPXtpc09wZW59IHNpemU9ezEyfSBhcmlhLWxhYmVsPVwiZHJvcGRvd25cIiAvPlxuICAgICAgICA8L1N0cm9rZUJ1dHRvbj5cbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdrZWJhYic6XG4gICAgICBjbGlja1RhcmdldCA9IChcbiAgICAgICAgPEljb25CdXR0b25cbiAgICAgICAgICBhcmlhLWxhYmVsPVwiTW9yZSBvcHRpb25zXCJcbiAgICAgICAgICBpY29uPXtNaW5pS2ViYWJNZW51SWNvbn1cbiAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfVxuICAgICAgICAgIGRhdGEtdGVzdGlkPVwiZHJvcGRvd24ta2ViYWItYnV0dG9uXCJcbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdob3Jpem9udGFsS2ViYWInOlxuICAgICAgY2xpY2tUYXJnZXQgPSAoXG4gICAgICAgIDxJY29uQnV0dG9uXG4gICAgICAgICAgYXJpYS1sYWJlbD1cIk1vcmUgb3B0aW9uc1wiXG4gICAgICAgICAgaWNvbj17SG9yaXpvbnRhbEtlYmFiSWNvbn1cbiAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfVxuICAgICAgICAgIGRhdGEtdGVzdGlkPVwiZHJvcGRvd24taG9yaXpvbnRhbC1rZWJhYi1idXR0b25cIlxuICAgICAgICAvPlxuICAgICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxCb3ggZGlzcGxheT1cImlubGluZS1ibG9ja1wiIHJlZj17dGFyZ2V0UmVmfT5cbiAgICAgICAge2NsaWNrVGFyZ2V0fVxuICAgICAgPC9Cb3g+XG4gICAgICB7aXNPcGVuICYmIGRyb3Bkb3duSXRlbXMubGVuZ3RoICE9PSAwICYmIChcbiAgICAgICAgPFBvcG92ZXJcbiAgICAgICAgICB0YXJnZXRSZWY9e3RhcmdldFJlZn1cbiAgICAgICAgICBpc09wZW49e2lzT3Blbn1cbiAgICAgICAgICBvblJlcXVlc3RDbG9zZT17aGFuZGxlUmVxdWVzdENsb3NlZH1cbiAgICAgICAgICBhbGlnbj17YWxpZ259XG4gICAgICAgICAgdmVydGljYWxPZmZzZXQ9e3ZlcnRpY2FsT2Zmc2V0fVxuICAgICAgICAgIGhvcml6b250YWxPZmZzZXQ9e2hvcml6b250YWxPZmZzZXR9XG4gICAgICAgICAgb3V0bGluZVxuICAgICAgICA+XG4gICAgICAgICAgPERyb3Bkb3duTGlzdFxuICAgICAgICAgICAgZHJvcGRvd25JdGVtcz17ZHJvcGRvd25JdGVtc31cbiAgICAgICAgICAgIG9uQ2xvc2U9e2hhbmRsZVJlcXVlc3RDbG9zZWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Qb3BvdmVyPlxuICAgICAgKX1cbiAgICA8Lz5cbiAgKTtcbn07XG4iXX0= */"));

var HorizontalKebabIcon = /*#__PURE__*/_styled(MiniKebabMenuIcon, {
  target: "e111d9da0",
  label: "HorizontalKebabIcon"
})(css({
  transform: 'rotate(90deg)'
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ecm9wZG93bkJ1dHRvbi9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUI0QiIsImZpbGUiOiIuLi8uLi9zcmMvRHJvcGRvd25CdXR0b24vaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQm94LFxuICBGaWxsQnV0dG9uLFxuICBJY29uQnV0dG9uLFxuICBQb3BvdmVyLFxuICBTdHJva2VCdXR0b24sXG59IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7XG4gIEFycm93Q2hldnJvbkRvd25GaWxsZWRJY29uLFxuICBNaW5pS2ViYWJNZW51SWNvbixcbn0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtaWNvbnMnO1xuaW1wb3J0IHsgY3NzLCBweFJlbSwgc3R5bGVkT3B0aW9ucyB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgRHJvcGRvd25JdGVtLCBEcm9wZG93bkxpc3QgfSBmcm9tICcuL0Ryb3Bkb3duTGlzdCc7XG5cbmNvbnN0IERvd25BcnJvdyA9IHN0eWxlZChBcnJvd0NoZXZyb25Eb3duRmlsbGVkSWNvbiwgc3R5bGVkT3B0aW9ucyk8e1xuICBpc09wZW4/OiBib29sZWFuO1xufT5gXG4gIG1hcmdpbi1sZWZ0OiAke3B4UmVtKDgpfTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMzVzIGVhc2Utb3V0O1xuICAkeyh7IGlzT3BlbiB9KSA9PiBpc09wZW4gJiYgJ3RyYW5zZm9ybTogcm90YXRlKC0xODBkZWcpJ307XG5gO1xuXG5jb25zdCBIb3Jpem9udGFsS2ViYWJJY29uID0gc3R5bGVkKE1pbmlLZWJhYk1lbnVJY29uKShcbiAgY3NzKHtcbiAgICB0cmFuc2Zvcm06ICdyb3RhdGUoOTBkZWcpJyxcbiAgfSlcbik7XG5cbmV4cG9ydCB0eXBlIERyb3Bkb3duQnV0dG9uUHJvcHMgPSB7XG4gIGJ1dHRvblR5cGU/OiAnZmlsbCcgfCAnc3Ryb2tlJyB8ICdrZWJhYicgfCAnaG9yaXpvbnRhbEtlYmFiJztcbiAgZHJvcGRvd25JdGVtczogRHJvcGRvd25JdGVtW107XG4gIGFsaWduPzogJ2xlZnQnIHwgJ3JpZ2h0JztcbiAgb25DbGljaz86IChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4gdm9pZDtcbiAgdmVydGljYWxPZmZzZXQ/OiBudW1iZXI7XG4gIGhvcml6b250YWxPZmZzZXQ/OiBudW1iZXI7XG59O1xuXG5leHBvcnQgY29uc3QgRHJvcGRvd25CdXR0b246IFJlYWN0LkZDPERyb3Bkb3duQnV0dG9uUHJvcHM+ID0gKHtcbiAgYnV0dG9uVHlwZSA9ICdmaWxsJyxcbiAgY2hpbGRyZW4sXG4gIGFsaWduID0gJ2xlZnQnLFxuICBkcm9wZG93bkl0ZW1zLFxuICBvbkNsaWNrLFxuICB2ZXJ0aWNhbE9mZnNldCxcbiAgaG9yaXpvbnRhbE9mZnNldCxcbn0pID0+IHtcbiAgY29uc3QgdGFyZ2V0UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgY29uc3QgW2lzT3Blbiwgc2V0SXNPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAoIWlzT3Blbikge1xuICAgICAgb25DbGljaz8uKGV2ZW50KTtcbiAgICB9XG4gICAgc2V0SXNPcGVuKCFpc09wZW4pO1xuICB9O1xuICBjb25zdCBoYW5kbGVSZXF1ZXN0Q2xvc2VkID0gKCkgPT4ge1xuICAgIHNldElzT3BlbihmYWxzZSk7XG4gIH07XG5cbiAgbGV0IGNsaWNrVGFyZ2V0OiBSZWFjdC5SZWFjdE5vZGU7XG4gIHN3aXRjaCAoYnV0dG9uVHlwZSkge1xuICAgIGNhc2UgJ2ZpbGwnOlxuICAgICAgY2xpY2tUYXJnZXQgPSAoXG4gICAgICAgIDxGaWxsQnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfSBkYXRhLXRlc3RpZD1cImRyb3Bkb3duLWZpbGwtYnV0dG9uXCI+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgIDxEb3duQXJyb3cgaXNPcGVuPXtpc09wZW59IHNpemU9ezEyfSBhcmlhLWxhYmVsPVwiZHJvcGRvd25cIiAvPlxuICAgICAgICA8L0ZpbGxCdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc3Ryb2tlJzpcbiAgICAgIGNsaWNrVGFyZ2V0ID0gKFxuICAgICAgICA8U3Ryb2tlQnV0dG9uXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xpY2t9XG4gICAgICAgICAgZGF0YS10ZXN0aWQ9XCJkcm9wZG93bi1zdHJva2UtYnV0dG9uXCJcbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICA8RG93bkFycm93IGlzT3Blbj17aXNPcGVufSBzaXplPXsxMn0gYXJpYS1sYWJlbD1cImRyb3Bkb3duXCIgLz5cbiAgICAgICAgPC9TdHJva2VCdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAna2ViYWInOlxuICAgICAgY2xpY2tUYXJnZXQgPSAoXG4gICAgICAgIDxJY29uQnV0dG9uXG4gICAgICAgICAgYXJpYS1sYWJlbD1cIk1vcmUgb3B0aW9uc1wiXG4gICAgICAgICAgaWNvbj17TWluaUtlYmFiTWVudUljb259XG4gICAgICAgICAgc2l6ZT1cInNtYWxsXCJcbiAgICAgICAgICB2YXJpYW50PVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDbGlja31cbiAgICAgICAgICBkYXRhLXRlc3RpZD1cImRyb3Bkb3duLWtlYmFiLWJ1dHRvblwiXG4gICAgICAgIC8+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaG9yaXpvbnRhbEtlYmFiJzpcbiAgICAgIGNsaWNrVGFyZ2V0ID0gKFxuICAgICAgICA8SWNvbkJ1dHRvblxuICAgICAgICAgIGFyaWEtbGFiZWw9XCJNb3JlIG9wdGlvbnNcIlxuICAgICAgICAgIGljb249e0hvcml6b250YWxLZWJhYkljb259XG4gICAgICAgICAgc2l6ZT1cInNtYWxsXCJcbiAgICAgICAgICB2YXJpYW50PVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDbGlja31cbiAgICAgICAgICBkYXRhLXRlc3RpZD1cImRyb3Bkb3duLWhvcml6b250YWwta2ViYWItYnV0dG9uXCJcbiAgICAgICAgLz5cbiAgICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8Qm94IGRpc3BsYXk9XCJpbmxpbmUtYmxvY2tcIiByZWY9e3RhcmdldFJlZn0+XG4gICAgICAgIHtjbGlja1RhcmdldH1cbiAgICAgIDwvQm94PlxuICAgICAge2lzT3BlbiAmJiBkcm9wZG93bkl0ZW1zLmxlbmd0aCAhPT0gMCAmJiAoXG4gICAgICAgIDxQb3BvdmVyXG4gICAgICAgICAgdGFyZ2V0UmVmPXt0YXJnZXRSZWZ9XG4gICAgICAgICAgaXNPcGVuPXtpc09wZW59XG4gICAgICAgICAgb25SZXF1ZXN0Q2xvc2U9e2hhbmRsZVJlcXVlc3RDbG9zZWR9XG4gICAgICAgICAgYWxpZ249e2FsaWdufVxuICAgICAgICAgIHZlcnRpY2FsT2Zmc2V0PXt2ZXJ0aWNhbE9mZnNldH1cbiAgICAgICAgICBob3Jpem9udGFsT2Zmc2V0PXtob3Jpem9udGFsT2Zmc2V0fVxuICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgPlxuICAgICAgICAgIDxEcm9wZG93bkxpc3RcbiAgICAgICAgICAgIGRyb3Bkb3duSXRlbXM9e2Ryb3Bkb3duSXRlbXN9XG4gICAgICAgICAgICBvbkNsb3NlPXtoYW5kbGVSZXF1ZXN0Q2xvc2VkfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvUG9wb3Zlcj5cbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG59O1xuIl19 */");

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
      clickTarget = /*#__PURE__*/React.createElement(FillButton, {
        onClick: handleClick,
        "data-testid": "dropdown-fill-button"
      }, children, /*#__PURE__*/React.createElement(DownArrow, {
        isOpen: isOpen,
        size: 12,
        "aria-label": "dropdown"
      }));
      break;

    case 'stroke':
      clickTarget = /*#__PURE__*/React.createElement(StrokeButton, {
        onClick: handleClick,
        "data-testid": "dropdown-stroke-button"
      }, children, /*#__PURE__*/React.createElement(DownArrow, {
        isOpen: isOpen,
        size: 12,
        "aria-label": "dropdown"
      }));
      break;

    case 'kebab':
      clickTarget = /*#__PURE__*/React.createElement(IconButton, {
        "aria-label": "More options",
        icon: MiniKebabMenuIcon,
        size: "small",
        variant: "secondary",
        onClick: handleClick,
        "data-testid": "dropdown-kebab-button"
      });
      break;

    case 'horizontalKebab':
      clickTarget = /*#__PURE__*/React.createElement(IconButton, {
        "aria-label": "More options",
        icon: HorizontalKebabIcon,
        size: "small",
        variant: "secondary",
        onClick: handleClick,
        "data-testid": "dropdown-horizontal-kebab-button"
      });
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, {
    display: "inline-block",
    ref: targetRef
  }, clickTarget), isOpen && dropdownItems.length !== 0 && /*#__PURE__*/React.createElement(Popover, {
    targetRef: targetRef,
    isOpen: isOpen,
    onRequestClose: handleRequestClosed,
    align: align,
    verticalOffset: verticalOffset,
    horizontalOffset: horizontalOffset,
    outline: true
  }, /*#__PURE__*/React.createElement(DropdownList, {
    dropdownItems: dropdownItems,
    onClose: handleRequestClosed
  })));
};