import _styled from "@emotion/styled/base";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { IconButton } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import { Avatar } from '../../../Avatar';
import { DropdownAnchor, DropdownIcon, StyledDropdown, StyledText } from '../../shared';
import { AppHeaderLinkSections } from '../AppHeaderLinkSections';

var StyledLinkSection = /*#__PURE__*/_styled(AppHeaderLinkSections, {
  target: "er1dlwl0",
  label: "StyledLinkSection"
})(css({
  padding: "0.75rem 0",
  position: "absolute"
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyRHJvcGRvd24vaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNCMEIiLCJmaWxlIjoiLi4vLi4vLi4vLi4vc3JjL0FwcEhlYWRlci9BcHBIZWFkZXJFbGVtZW50cy9BcHBIZWFkZXJEcm9wZG93bi9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJY29uQnV0dG9uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCwge1xuICB1c2VDYWxsYmFjayxcbiAgdXNlRWZmZWN0LFxuICB1c2VNZW1vLFxuICB1c2VSZWYsXG4gIHVzZVN0YXRlLFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VJc29tb3JwaGljTGF5b3V0RWZmZWN0IH0gZnJvbSAncmVhY3QtdXNlJztcblxuaW1wb3J0IHsgQXZhdGFyIH0gZnJvbSAnLi4vLi4vLi4vQXZhdGFyJztcbmltcG9ydCB7XG4gIERyb3Bkb3duQW5jaG9yLFxuICBEcm9wZG93bkljb24sXG4gIFN0eWxlZERyb3Bkb3duLFxuICBTdHlsZWRUZXh0LFxufSBmcm9tICcuLi8uLi9zaGFyZWQnO1xuaW1wb3J0IHsgQXBwSGVhZGVyTGlua1NlY3Rpb25zIH0gZnJvbSAnLi4vQXBwSGVhZGVyTGlua1NlY3Rpb25zJztcbmltcG9ydCB7IEFwcEhlYWRlckNsaWNrSGFuZGxlciwgQXBwSGVhZGVyRHJvcGRvd25JdGVtIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCBTdHlsZWRMaW5rU2VjdGlvbiA9IHN0eWxlZChBcHBIZWFkZXJMaW5rU2VjdGlvbnMpKFxuICBjc3Moe1xuICAgIHBhZGRpbmc6IGAwLjc1cmVtIDBgLFxuICAgIHBvc2l0aW9uOiBgYWJzb2x1dGVgLFxuICB9KVxuKTtcblxuZXhwb3J0IHR5cGUgQXBwSGVhZGVyRHJvcGRvd25Qcm9wcyA9IHtcbiAgYWN0aW9uOiBBcHBIZWFkZXJDbGlja0hhbmRsZXI7XG4gIGl0ZW06IEFwcEhlYWRlckRyb3Bkb3duSXRlbTtcbiAgb25LZXlEb3duPzogKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xufTtcblxuY29uc3QgS0VZX0NPREVTID0ge1xuICBVUDogJ0Fycm93VXAnLFxuICBET1dOOiAnQXJyb3dEb3duJyxcbiAgTEVGVDogJ0Fycm93TGVmdCcsXG4gIFJJR0hUOiAnQXJyb3dSaWdodCcsXG4gIEVORDogJ0VuZCcsXG4gIEVOVEVSOiAnRW50ZXInLFxuICBFU0M6ICdFc2NhcGUnLFxuICBIT01FOiAnSG9tZScsXG4gIFNQQUNFOiAnICcsXG4gIFRBQjogJ1RhYicsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgY29uc3QgQXBwSGVhZGVyRHJvcGRvd246IFJlYWN0LkZDPEFwcEhlYWRlckRyb3Bkb3duUHJvcHM+ID0gKHtcbiAgYWN0aW9uLFxuICBpdGVtLFxufSkgPT4ge1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmPEhUTUxVTGlzdEVsZW1lbnQ+KG51bGwpO1xuICBjb25zdCBidXR0b25SZWYgPSB1c2VSZWY8SFRNTEJ1dHRvbkVsZW1lbnQ+KG51bGwpO1xuXG4gIGNvbnN0IFtkaW1lbnNpb25zLCBzZXREaW1lbnNpb25zXSA9IHVzZVN0YXRlKHsgaGVpZ2h0OiAwLCB3aWR0aDogMCB9KTtcbiAgY29uc3QgW2lzT3Blbiwgc2V0SXNPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBbZm9jdXNJbmRleCwgc2V0Rm9jdXNJbmRleF0gPSB1c2VTdGF0ZSgwKTtcblxuICBjb25zdCBmb2N1c0ZpcnN0SXRlbSA9ICgpID0+IHNldEZvY3VzSW5kZXgoMCk7XG4gIGNvbnN0IGZvY3VzTGFzdEl0ZW0gPSAoKSA9PiBzZXRGb2N1c0luZGV4KGl0ZW1zQ291bnQpO1xuXG4gIGNvbnN0IGl0ZW1zQ291bnQgPSB1c2VNZW1vKCgpID0+IFsuLi5pdGVtLnBvcG92ZXJdLmZsYXQoKS5sZW5ndGggLSAxLCBbaXRlbV0pO1xuXG4gIGNvbnN0IGZvY3VzTmV4dEl0ZW0gPSAoKSA9PiB7XG4gICAgaWYgKGZvY3VzSW5kZXggPT09IGl0ZW1zQ291bnQpIHtcbiAgICAgIGZvY3VzRmlyc3RJdGVtKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEZvY3VzSW5kZXgoZm9jdXNJbmRleCArIDEpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBmb2N1c1ByZXZpb3VzSXRlbSA9ICgpID0+IHtcbiAgICBpZiAoZm9jdXNJbmRleCA9PT0gMCkge1xuICAgICAgZm9jdXNMYXN0SXRlbSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRGb2N1c0luZGV4KGZvY3VzSW5kZXggLSAxKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZm9jdXNCdXR0b24gPSAoKSA9PiB7XG4gICAgYnV0dG9uUmVmPy5jdXJyZW50Py5mb2N1cygpO1xuICB9O1xuXG4gIGNvbnN0IGdldE5vZGUgPSAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gbGlzdFJlZj8uY3VycmVudD8uY2hpbGROb2Rlc1tpbmRleF0uY2hpbGROb2RlcztcbiAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgIGNvbnN0IG5vZGVMaXN0ID0gQXJyYXkuZnJvbShjaGlsZHJlbik7XG4gICAgICByZXR1cm4gbm9kZUxpc3QuZmluZChcbiAgICAgICAgKG5vZGUpID0+IG5vZGUubm9kZU5hbWUgPT09ICdBJ1xuICAgICAgKSBhcyBIVE1MQW5jaG9yRWxlbWVudDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlSXNPcGVuID0gKCkgPT4gc2V0SXNPcGVuKChwcmV2KSA9PiAhcHJldik7XG5cbiAgY29uc3QgaGFuZGxlT25DbGljayA9IChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgIHRvZ2dsZUlzT3BlbigpO1xuICAgIGlmICghaXNPcGVuKSB7XG4gICAgICBhY3Rpb24oZXZlbnQsIGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVDbG9zZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgIGZvY3VzQnV0dG9uKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBidXR0b25IYW5kbGVLZXlFdmVudHMgPSAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgY2FzZSBLRVlfQ09ERVMuRU5URVI6XG4gICAgICBjYXNlIEtFWV9DT0RFUy5TUEFDRTpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc2V0SXNPcGVuKHRydWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS0VZX0NPREVTLkRPV046XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNldElzT3Blbih0cnVlKTtcbiAgICAgICAgZm9jdXNGaXJzdEl0ZW0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtFWV9DT0RFUy5VUDpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc2V0SXNPcGVuKHRydWUpO1xuICAgICAgICBmb2N1c0xhc3RJdGVtKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IG1lbnVIYW5kbGVLZXlFdmVudHMgPSAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgY2FzZSBLRVlfQ09ERVMuSE9NRTpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGZvY3VzRmlyc3RJdGVtKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLRVlfQ09ERVMuRU5EOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZm9jdXNMYXN0SXRlbSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS0VZX0NPREVTLlVQOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBmb2N1c1ByZXZpb3VzSXRlbSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS0VZX0NPREVTLkRPV046XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGZvY3VzTmV4dEl0ZW0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtFWV9DT0RFUy5UQUI6XG4gICAgICBjYXNlIEtFWV9DT0RFUy5MRUZUOlxuICAgICAgY2FzZSBLRVlfQ09ERVMuUklHSFQ6XG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLRVlfQ09ERVMuRVNDOlxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaGFuZGxlQ2xvc2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmaXJzdE5vZGUgPSBnZXROb2RlKDApO1xuICAgIGNvbnN0IG5leHROb2RlID0gZ2V0Tm9kZShmb2N1c0luZGV4KTtcblxuICAgIGlmIChmaXJzdE5vZGUgJiYgbmV4dE5vZGUpIHtcbiAgICAgIGlmIChpc09wZW4pIHtcbiAgICAgICAgaWYgKGZvY3VzSW5kZXggPj0gMCAmJiBmb2N1c0luZGV4IDw9IGl0ZW1zQ291bnQpIHtcbiAgICAgICAgICBuZXh0Tm9kZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCBbZm9jdXNJbmRleCwgaXNPcGVuLCBpdGVtc0NvdW50XSk7XG5cbiAgdXNlSXNvbW9ycGhpY0xheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGxpc3RSZWYuY3VycmVudCkge1xuICAgICAgY29uc3QgeyBoZWlnaHQsIHdpZHRoIH0gPSBsaXN0UmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBzZXREaW1lbnNpb25zKHsgaGVpZ2h0LCB3aWR0aCB9KTtcbiAgICB9XG4gIH0sIFtsaXN0UmVmLCBpc09wZW5dKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZ1bmN0aW9uIGhhbmRsZUNsaWNrT3V0c2lkZShldmVudDogTW91c2VFdmVudCB8IEV2ZW50KSB7XG4gICAgICBjb25zdCBsaXN0ID0gbGlzdFJlZj8uY3VycmVudDtcbiAgICAgIGNvbnN0IGJ1dHRvbiA9IGJ1dHRvblJlZj8uY3VycmVudDtcbiAgICAgIGlmIChcbiAgICAgICAgaXNPcGVuICYmXG4gICAgICAgIGxpc3QgJiZcbiAgICAgICAgIWxpc3QuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIE5vZGUpICYmXG4gICAgICAgIGJ1dHRvbiAmJlxuICAgICAgICAhYnV0dG9uLmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBOb2RlKVxuICAgICAgKSB7XG4gICAgICAgIGhhbmRsZUNsb3NlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlQ2xpY2tPdXRzaWRlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgaGFuZGxlQ2xpY2tPdXRzaWRlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlQ2xpY2tPdXRzaWRlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCBoYW5kbGVDbGlja091dHNpZGUpO1xuICAgIH07XG4gIH0sIFtsaXN0UmVmLCBpc09wZW4sIGhhbmRsZUNsb3NlXSk7XG5cbiAgY29uc3QgaXNQcm9maWxlRHJvcGRvd24gPSBpdGVtLnR5cGUgPT09ICdwcm9maWxlLWRyb3Bkb3duJztcblxuICBjb25zdCBjbGlja1RhcmdldCA9IGlzUHJvZmlsZURyb3Bkb3duID8gKFxuICAgIDxJY29uQnV0dG9uXG4gICAgICBhcmlhLWV4cGFuZGVkPXtpc09wZW59XG4gICAgICBhcmlhLWhhc3BvcHVwXG4gICAgICByZWY9e2J1dHRvblJlZn1cbiAgICAgIG9uQ2xpY2s9e2hhbmRsZU9uQ2xpY2t9XG4gICAgICBvbktleURvd249e2J1dHRvbkhhbmRsZUtleUV2ZW50c31cbiAgICAgIHRhYkluZGV4PVwiLTFcIlxuICAgICAgZGF0YS10ZXN0aWQ9XCJhdmF0YXItZHJvcGRvd24tYnV0dG9uXCJcbiAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgID5cbiAgICAgIDxBdmF0YXJcbiAgICAgICAgc3JjPXtpdGVtLmF2YXRhcn1cbiAgICAgICAgYWx0PVwiVXNlciBwcm9maWxlIGF2YXRhclwiXG4gICAgICAgIGRpc2FibGVEcm9wc2hhZG93XG4gICAgICAgIHNpemU9ezQwfVxuICAgICAgLz5cbiAgICA8L0ljb25CdXR0b24+XG4gICkgOiAoXG4gICAgPERyb3Bkb3duQW5jaG9yXG4gICAgICByZWY9e2J1dHRvblJlZn1cbiAgICAgIG9uQ2xpY2s9e2hhbmRsZU9uQ2xpY2t9XG4gICAgICBvbktleURvd249e2J1dHRvbkhhbmRsZUtleUV2ZW50c31cbiAgICAgIHRpdGxlPXtpdGVtLnRleHR9XG4gICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgIHRhYkluZGV4PVwiLTFcIlxuICAgICAgYXJpYS1leHBhbmRlZD17aXNPcGVufVxuICAgICAgYXJpYS1oYXNwb3B1cFxuICAgID5cbiAgICAgIDxTdHlsZWRUZXh0XG4gICAgICAgIGZvbnRXZWlnaHQ9e2lzT3BlbiA/ICdib2xkJyA6ICdub3JtYWwnfVxuICAgICAgICB0ZXh0QWxpZ249XCJjZW50ZXJcIlxuICAgICAgICB0aXRsZT17aXRlbS50ZXh0fVxuICAgICAgPlxuICAgICAgICB7aXRlbS50ZXh0fVxuICAgICAgPC9TdHlsZWRUZXh0PlxuICAgICAgPERyb3Bkb3duSWNvbiBhcmlhLWxhYmVsPVwiZHJvcGRvd25cIiBvcGVuPXtpc09wZW59IHNpemU9ezEyfSAvPlxuICAgIDwvRHJvcGRvd25BbmNob3I+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge2NsaWNrVGFyZ2V0fVxuICAgICAgPFN0eWxlZERyb3Bkb3duXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcmlnaHQ6IGlzUHJvZmlsZURyb3Bkb3duID8gJzAuNXJlbScgOiAnJyxcbiAgICAgICAgICB0b3A6IGlzUHJvZmlsZURyb3Bkb3duID8gJzIuNzVyZW0nIDogJzIuMjVyZW0nLFxuICAgICAgICAgIHdpZHRoOiBkaW1lbnNpb25zLndpZHRoLFxuICAgICAgICB9fVxuICAgICAgICBpbml0aWFsPXt7IGJvcmRlcldpZHRoOiAwLCBoZWlnaHQ6IDAgfX1cbiAgICAgICAgYW5pbWF0ZT17e1xuICAgICAgICAgIGJvcmRlcldpZHRoOiBpc09wZW4gPyAxIDogMCxcbiAgICAgICAgICBoZWlnaHQ6IGlzT3BlbiA/IGRpbWVuc2lvbnMuaGVpZ2h0IDogMCxcbiAgICAgICAgfX1cbiAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMC4xNzUgfX1cbiAgICAgICAgYXJpYS1oaWRkZW49eyFpc09wZW59XG4gICAgICAgIG9uS2V5RG93bj17bWVudUhhbmRsZUtleUV2ZW50c31cbiAgICAgID5cbiAgICAgICAgPFN0eWxlZExpbmtTZWN0aW9uXG4gICAgICAgICAgYWN0aW9uPXthY3Rpb259XG4gICAgICAgICAgaXRlbT17aXRlbX1cbiAgICAgICAgICByb2xlPVwibWVudVwiXG4gICAgICAgICAgcmVmPXtsaXN0UmVmfVxuICAgICAgICAgIGlkPXtgbWVudS1jb250YWluZXIke2l0ZW0udGV4dH1gfVxuICAgICAgICAgIHNob3dJY29uPXtpc1Byb2ZpbGVEcm9wZG93biA/PyBudWxsfVxuICAgICAgICAgIG9uS2V5RG93bj17bWVudUhhbmRsZUtleUV2ZW50c31cbiAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtgbWVudS1jb250YWluZXIke2l0ZW0udGV4dH1gfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2l0ZW0udGV4dH1cbiAgICAgICAgICBhcmlhLWhpZGRlbj17IWlzT3Blbn1cbiAgICAgICAgLz5cbiAgICAgIDwvU3R5bGVkRHJvcGRvd24+XG4gICAgPC8+XG4gICk7XG59O1xuIl19 */");

var KEY_CODES = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  END: 'End',
  ENTER: 'Enter',
  ESC: 'Escape',
  HOME: 'Home',
  SPACE: ' ',
  TAB: 'Tab'
};
export var AppHeaderDropdown = function AppHeaderDropdown(_ref) {
  var action = _ref.action,
      item = _ref.item;
  var listRef = useRef(null);
  var buttonRef = useRef(null);

  var _useState = useState({
    height: 0,
    width: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      dimensions = _useState2[0],
      setDimensions = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isOpen = _useState4[0],
      setIsOpen = _useState4[1];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      focusIndex = _useState6[0],
      setFocusIndex = _useState6[1];

  var focusFirstItem = function focusFirstItem() {
    return setFocusIndex(0);
  };

  var focusLastItem = function focusLastItem() {
    return setFocusIndex(itemsCount);
  };

  var itemsCount = useMemo(function () {
    return _toConsumableArray(item.popover).flat().length - 1;
  }, [item]);

  var focusNextItem = function focusNextItem() {
    if (focusIndex === itemsCount) {
      focusFirstItem();
    } else {
      setFocusIndex(focusIndex + 1);
    }
  };

  var focusPreviousItem = function focusPreviousItem() {
    if (focusIndex === 0) {
      focusLastItem();
    } else {
      setFocusIndex(focusIndex - 1);
    }
  };

  var focusButton = function focusButton() {
    var _buttonRef$current;

    buttonRef === null || buttonRef === void 0 ? void 0 : (_buttonRef$current = buttonRef.current) === null || _buttonRef$current === void 0 ? void 0 : _buttonRef$current.focus();
  };

  var getNode = function getNode(index) {
    var _listRef$current;

    var children = listRef === null || listRef === void 0 ? void 0 : (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.childNodes[index].childNodes;

    if (children) {
      var nodeList = Array.from(children);
      return nodeList.find(function (node) {
        return node.nodeName === 'A';
      });
    }
  };

  var toggleIsOpen = function toggleIsOpen() {
    return setIsOpen(function (prev) {
      return !prev;
    });
  };

  var handleOnClick = function handleOnClick(event) {
    toggleIsOpen();

    if (!isOpen) {
      action(event, item);
    }
  };

  var handleClose = useCallback(function () {
    setIsOpen(false);
    focusButton();
  }, []);

  var buttonHandleKeyEvents = function buttonHandleKeyEvents(event) {
    switch (event.key) {
      case KEY_CODES.ENTER:
      case KEY_CODES.SPACE:
        event.preventDefault();
        setIsOpen(true);
        break;

      case KEY_CODES.DOWN:
        event.preventDefault();
        setIsOpen(true);
        focusFirstItem();
        break;

      case KEY_CODES.UP:
        event.preventDefault();
        setIsOpen(true);
        focusLastItem();
        break;

      default:
        break;
    }
  };

  var menuHandleKeyEvents = function menuHandleKeyEvents(event) {
    switch (event.key) {
      case KEY_CODES.HOME:
        event.preventDefault();
        event.stopPropagation();
        focusFirstItem();
        break;

      case KEY_CODES.END:
        event.preventDefault();
        event.stopPropagation();
        focusLastItem();
        break;

      case KEY_CODES.UP:
        event.preventDefault();
        focusPreviousItem();
        break;

      case KEY_CODES.DOWN:
        event.preventDefault();
        focusNextItem();
        break;

      case KEY_CODES.TAB:
      case KEY_CODES.LEFT:
      case KEY_CODES.RIGHT:
        setIsOpen(false);
        break;

      case KEY_CODES.ESC:
        event.stopPropagation();
        handleClose();
        break;

      default:
        break;
    }
  };

  useEffect(function () {
    var firstNode = getNode(0);
    var nextNode = getNode(focusIndex);

    if (firstNode && nextNode) {
      if (isOpen) {
        if (focusIndex >= 0 && focusIndex <= itemsCount) {
          nextNode.focus();
        }
      }
    }
  }, [focusIndex, isOpen, itemsCount]);
  useIsomorphicLayoutEffect(function () {
    if (listRef.current) {
      var _listRef$current$getB = listRef.current.getBoundingClientRect(),
          height = _listRef$current$getB.height,
          width = _listRef$current$getB.width;

      setDimensions({
        height: height,
        width: width
      });
    }
  }, [listRef, isOpen]);
  useEffect(function () {
    function handleClickOutside(event) {
      var list = listRef === null || listRef === void 0 ? void 0 : listRef.current;
      var button = buttonRef === null || buttonRef === void 0 ? void 0 : buttonRef.current;

      if (isOpen && list && !list.contains(event.target) && button && !button.contains(event.target)) {
        handleClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('blur', handleClickOutside);
    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('blur', handleClickOutside);
    };
  }, [listRef, isOpen, handleClose]);
  var isProfileDropdown = item.type === 'profile-dropdown';
  var clickTarget = isProfileDropdown ? /*#__PURE__*/React.createElement(IconButton, {
    "aria-expanded": isOpen,
    "aria-haspopup": true,
    ref: buttonRef,
    onClick: handleOnClick,
    onKeyDown: buttonHandleKeyEvents,
    tabIndex: "-1",
    "data-testid": "avatar-dropdown-button",
    variant: "interface"
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: item.avatar,
    alt: "User profile avatar",
    disableDropshadow: true,
    size: 40
  })) : /*#__PURE__*/React.createElement(DropdownAnchor, {
    ref: buttonRef,
    onClick: handleOnClick,
    onKeyDown: buttonHandleKeyEvents,
    title: item.text,
    variant: "interface",
    tabIndex: "-1",
    "aria-expanded": isOpen,
    "aria-haspopup": true
  }, /*#__PURE__*/React.createElement(StyledText, {
    fontWeight: isOpen ? 'bold' : 'normal',
    textAlign: "center",
    title: item.text
  }, item.text), /*#__PURE__*/React.createElement(DropdownIcon, {
    "aria-label": "dropdown",
    open: isOpen,
    size: 12
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, clickTarget, /*#__PURE__*/React.createElement(StyledDropdown, {
    style: {
      right: isProfileDropdown ? '0.5rem' : '',
      top: isProfileDropdown ? '2.75rem' : '2.25rem',
      width: dimensions.width
    },
    initial: {
      borderWidth: 0,
      height: 0
    },
    animate: {
      borderWidth: isOpen ? 1 : 0,
      height: isOpen ? dimensions.height : 0
    },
    transition: {
      duration: 0.175
    },
    "aria-hidden": !isOpen,
    onKeyDown: menuHandleKeyEvents
  }, /*#__PURE__*/React.createElement(StyledLinkSection, {
    action: action,
    item: item,
    role: "menu",
    ref: listRef,
    id: "menu-container".concat(item.text),
    showIcon: isProfileDropdown !== null && isProfileDropdown !== void 0 ? isProfileDropdown : null,
    onKeyDown: menuHandleKeyEvents,
    "aria-controls": "menu-container".concat(item.text),
    "aria-label": item.text,
    "aria-hidden": !isOpen
  })));
};