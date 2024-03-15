import _styled from "@emotion/styled/base";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { ContentContainer } from '@codecademy/gamut';
import { css, states } from '@codecademy/gamut-styles';
import React from 'react';
import { AppHeaderLink } from '../AppHeaderLink';

var StyledList = _styled("ul", {
  target: "e9an02l1",
  label: "StyledList"
})(css({
  listStyle: "none",
  padding: 0
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyTGlua1NlY3Rpb25zL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzQ21CIiwiZmlsZSI6Ii4uLy4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyTGlua1NlY3Rpb25zL2luZGV4LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRlbnRDb250YWluZXIgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBjc3MsIHN0YXRlcyB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBBcHBIZWFkZXJMaW5rIH0gZnJvbSAnLi4vQXBwSGVhZGVyTGluayc7XG5pbXBvcnQge1xuICBBcHBIZWFkZXJDbGlja0hhbmRsZXIsXG4gIEFwcEhlYWRlckRyb3Bkb3duSXRlbSxcbiAgQXBwSGVhZGVyTGlua0l0ZW0sXG59IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IHR5cGUgQXBwSGVhZGVyTGlua1NlY3Rpb25zUHJvcHMgPSB7XG4gIGFjdGlvbjogQXBwSGVhZGVyQ2xpY2tIYW5kbGVyO1xuICBpdGVtOiBBcHBIZWFkZXJEcm9wZG93bkl0ZW07XG4gIHJlZj86IFJlYWN0LlJlZk9iamVjdDxIVE1MVUxpc3RFbGVtZW50PjtcbiAgcm9sZT86IHN0cmluZztcbiAgaWQ/OiBzdHJpbmc7XG4gIHN0eWxlPzoge307XG4gIHNob3dJY29uPzogYm9vbGVhbjtcbiAgb25LZXlEb3duPzogKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xuICBvbkZvY3VzPzogKCkgPT4gdm9pZDtcbiAgb25CbHVyPzogKCkgPT4gdm9pZDtcbiAgbW9iaWxlPzogYm9vbGVhbjtcbn07XG5cbnR5cGUgTGlua0NvbXBvbmVudFByb3BzID0ge1xuICBhY3Rpb246IEFwcEhlYWRlckNsaWNrSGFuZGxlcjtcbiAgbGluazogQXBwSGVhZGVyTGlua0l0ZW07XG4gIHNob3dMaW5lQnJlYWs/OiBib29sZWFuO1xuICBzaG93SWNvbj86IGJvb2xlYW47XG4gIG9uS2V5RG93bj86IChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudCkgPT4gdm9pZDtcbn07XG5cbnR5cGUgU3R5bGVkTGlzdEl0ZW1Qcm9wcyA9IHtcbiAgc2hvd0xpbmVCcmVhaz86IGJvb2xlYW47XG59O1xuXG5jb25zdCBTdHlsZWRMaXN0ID0gc3R5bGVkLnVsKFxuICBjc3Moe1xuICAgIGxpc3RTdHlsZTogYG5vbmVgLFxuICAgIHBhZGRpbmc6IDAsXG4gIH0pXG4pO1xuXG5jb25zdCBTdHlsZWRMaXN0SXRlbSA9IHN0eWxlZC5saTxTdHlsZWRMaXN0SXRlbVByb3BzPihcbiAgc3RhdGVzKHtcbiAgICBzaG93TGluZUJyZWFrOiB7XG4gICAgICAnJjpiZWZvcmUnOiB7XG4gICAgICAgIGJnOiBgZ3JheS02MDBgLFxuICAgICAgICBjb250ZW50OiBgJydgLFxuICAgICAgICBkaXNwbGF5OiBgYmxvY2tgLFxuICAgICAgICBoZWlnaHQ6IGAxcHhgLFxuICAgICAgICBtYXJnaW46IGAwLjVyZW0gMS41cmVtYCxcbiAgICAgICAgd2lkdGg6IGBjYWxjKDEwMCUgLSAzcmVtKWAsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pXG4pO1xuXG5jb25zdCBMaW5rQ29tcG9uZW50OiBSZWFjdC5GQzxMaW5rQ29tcG9uZW50UHJvcHM+ID0gKHtcbiAgYWN0aW9uLFxuICBsaW5rLFxuICBzaG93SWNvbiA9IGZhbHNlLFxuICBzaG93TGluZUJyZWFrID0gZmFsc2UsXG4gIG9uS2V5RG93bixcbn0pID0+IChcbiAgPFN0eWxlZExpc3RJdGVtIHJvbGU9XCJub25lXCIgc2hvd0xpbmVCcmVhaz17c2hvd0xpbmVCcmVha30+XG4gICAgPEFwcEhlYWRlckxpbmtcbiAgICAgIGFjdGlvbj17YWN0aW9ufVxuICAgICAgaXRlbT17bGlua31cbiAgICAgIG9uS2V5RG93bj17b25LZXlEb3dufVxuICAgICAgcHk9ezE2fVxuICAgICAgc2hvd0ljb249e3Nob3dJY29ufVxuICAgICAgdGFiSW5kZXg9XCItMVwiXG4gICAgLz5cbiAgPC9TdHlsZWRMaXN0SXRlbT5cbik7XG5cbmV4cG9ydCBjb25zdCBBcHBIZWFkZXJMaW5rU2VjdGlvbnMgPSBSZWFjdC5mb3J3YXJkUmVmPFxuICBIVE1MVUxpc3RFbGVtZW50LFxuICBBcHBIZWFkZXJMaW5rU2VjdGlvbnNQcm9wc1xuPihcbiAgKFxuICAgIHsgYWN0aW9uLCBpdGVtLCBzaG93SWNvbiA9IGZhbHNlLCBvbktleURvd24sIG1vYmlsZSA9IGZhbHNlLCAuLi5wcm9wcyB9LFxuICAgIHJlZlxuICApID0+IChcbiAgICA8Q29udGVudENvbnRhaW5lciBzaXplPXttb2JpbGUgPyAnbWVkaXVtJyA6ICdzbWFsbCd9PlxuICAgICAgPFN0eWxlZExpc3QgcmVmPXtyZWZ9IHsuLi5wcm9wc30+XG4gICAgICAgIHtpdGVtLnR5cGUgPT09ICdwcm9maWxlLWRyb3Bkb3duJ1xuICAgICAgICAgID8gaXRlbS5wb3BvdmVyLm1hcCgobGlua1NlY3Rpb246IEFwcEhlYWRlckxpbmtJdGVtW10sIHNlY3Rpb25JbmRleCkgPT5cbiAgICAgICAgICAgICAgbGlua1NlY3Rpb24ubWFwKChsaW5rOiBBcHBIZWFkZXJMaW5rSXRlbSwgbGlua0luZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgPExpbmtDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17b25LZXlEb3dufVxuICAgICAgICAgICAgICAgICAga2V5PXtsaW5rLmlkfVxuICAgICAgICAgICAgICAgICAgYWN0aW9uPXthY3Rpb259XG4gICAgICAgICAgICAgICAgICBsaW5rPXtsaW5rfVxuICAgICAgICAgICAgICAgICAgc2hvd0xpbmVCcmVhaz17c2VjdGlvbkluZGV4ICE9PSAwICYmIGxpbmtJbmRleCA9PT0gMH1cbiAgICAgICAgICAgICAgICAgIHNob3dJY29uPXtzaG93SWNvbn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogaXRlbS5wb3BvdmVyLm1hcCgobGluazogQXBwSGVhZGVyTGlua0l0ZW0pID0+IChcbiAgICAgICAgICAgICAgPExpbmtDb21wb25lbnRcbiAgICAgICAgICAgICAgICBvbktleURvd249e29uS2V5RG93bn1cbiAgICAgICAgICAgICAgICBrZXk9e2xpbmsuaWR9XG4gICAgICAgICAgICAgICAgYWN0aW9uPXthY3Rpb259XG4gICAgICAgICAgICAgICAgbGluaz17bGlua31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgPC9TdHlsZWRMaXN0PlxuICAgIDwvQ29udGVudENvbnRhaW5lcj5cbiAgKVxuKTtcbiJdfQ== */");

var StyledListItem = _styled("li", {
  target: "e9an02l0",
  label: "StyledListItem"
})(states({
  showLineBreak: {
    '&:before': {
      bg: "gray-600",
      content: "''",
      display: "block",
      height: "1px",
      margin: "0.5rem 1.5rem",
      width: "calc(100% - 3rem)"
    }
  }
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyTGlua1NlY3Rpb25zL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2Q3VCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyTGlua1NlY3Rpb25zL2luZGV4LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRlbnRDb250YWluZXIgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBjc3MsIHN0YXRlcyB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBBcHBIZWFkZXJMaW5rIH0gZnJvbSAnLi4vQXBwSGVhZGVyTGluayc7XG5pbXBvcnQge1xuICBBcHBIZWFkZXJDbGlja0hhbmRsZXIsXG4gIEFwcEhlYWRlckRyb3Bkb3duSXRlbSxcbiAgQXBwSGVhZGVyTGlua0l0ZW0sXG59IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IHR5cGUgQXBwSGVhZGVyTGlua1NlY3Rpb25zUHJvcHMgPSB7XG4gIGFjdGlvbjogQXBwSGVhZGVyQ2xpY2tIYW5kbGVyO1xuICBpdGVtOiBBcHBIZWFkZXJEcm9wZG93bkl0ZW07XG4gIHJlZj86IFJlYWN0LlJlZk9iamVjdDxIVE1MVUxpc3RFbGVtZW50PjtcbiAgcm9sZT86IHN0cmluZztcbiAgaWQ/OiBzdHJpbmc7XG4gIHN0eWxlPzoge307XG4gIHNob3dJY29uPzogYm9vbGVhbjtcbiAgb25LZXlEb3duPzogKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xuICBvbkZvY3VzPzogKCkgPT4gdm9pZDtcbiAgb25CbHVyPzogKCkgPT4gdm9pZDtcbiAgbW9iaWxlPzogYm9vbGVhbjtcbn07XG5cbnR5cGUgTGlua0NvbXBvbmVudFByb3BzID0ge1xuICBhY3Rpb246IEFwcEhlYWRlckNsaWNrSGFuZGxlcjtcbiAgbGluazogQXBwSGVhZGVyTGlua0l0ZW07XG4gIHNob3dMaW5lQnJlYWs/OiBib29sZWFuO1xuICBzaG93SWNvbj86IGJvb2xlYW47XG4gIG9uS2V5RG93bj86IChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudCkgPT4gdm9pZDtcbn07XG5cbnR5cGUgU3R5bGVkTGlzdEl0ZW1Qcm9wcyA9IHtcbiAgc2hvd0xpbmVCcmVhaz86IGJvb2xlYW47XG59O1xuXG5jb25zdCBTdHlsZWRMaXN0ID0gc3R5bGVkLnVsKFxuICBjc3Moe1xuICAgIGxpc3RTdHlsZTogYG5vbmVgLFxuICAgIHBhZGRpbmc6IDAsXG4gIH0pXG4pO1xuXG5jb25zdCBTdHlsZWRMaXN0SXRlbSA9IHN0eWxlZC5saTxTdHlsZWRMaXN0SXRlbVByb3BzPihcbiAgc3RhdGVzKHtcbiAgICBzaG93TGluZUJyZWFrOiB7XG4gICAgICAnJjpiZWZvcmUnOiB7XG4gICAgICAgIGJnOiBgZ3JheS02MDBgLFxuICAgICAgICBjb250ZW50OiBgJydgLFxuICAgICAgICBkaXNwbGF5OiBgYmxvY2tgLFxuICAgICAgICBoZWlnaHQ6IGAxcHhgLFxuICAgICAgICBtYXJnaW46IGAwLjVyZW0gMS41cmVtYCxcbiAgICAgICAgd2lkdGg6IGBjYWxjKDEwMCUgLSAzcmVtKWAsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pXG4pO1xuXG5jb25zdCBMaW5rQ29tcG9uZW50OiBSZWFjdC5GQzxMaW5rQ29tcG9uZW50UHJvcHM+ID0gKHtcbiAgYWN0aW9uLFxuICBsaW5rLFxuICBzaG93SWNvbiA9IGZhbHNlLFxuICBzaG93TGluZUJyZWFrID0gZmFsc2UsXG4gIG9uS2V5RG93bixcbn0pID0+IChcbiAgPFN0eWxlZExpc3RJdGVtIHJvbGU9XCJub25lXCIgc2hvd0xpbmVCcmVhaz17c2hvd0xpbmVCcmVha30+XG4gICAgPEFwcEhlYWRlckxpbmtcbiAgICAgIGFjdGlvbj17YWN0aW9ufVxuICAgICAgaXRlbT17bGlua31cbiAgICAgIG9uS2V5RG93bj17b25LZXlEb3dufVxuICAgICAgcHk9ezE2fVxuICAgICAgc2hvd0ljb249e3Nob3dJY29ufVxuICAgICAgdGFiSW5kZXg9XCItMVwiXG4gICAgLz5cbiAgPC9TdHlsZWRMaXN0SXRlbT5cbik7XG5cbmV4cG9ydCBjb25zdCBBcHBIZWFkZXJMaW5rU2VjdGlvbnMgPSBSZWFjdC5mb3J3YXJkUmVmPFxuICBIVE1MVUxpc3RFbGVtZW50LFxuICBBcHBIZWFkZXJMaW5rU2VjdGlvbnNQcm9wc1xuPihcbiAgKFxuICAgIHsgYWN0aW9uLCBpdGVtLCBzaG93SWNvbiA9IGZhbHNlLCBvbktleURvd24sIG1vYmlsZSA9IGZhbHNlLCAuLi5wcm9wcyB9LFxuICAgIHJlZlxuICApID0+IChcbiAgICA8Q29udGVudENvbnRhaW5lciBzaXplPXttb2JpbGUgPyAnbWVkaXVtJyA6ICdzbWFsbCd9PlxuICAgICAgPFN0eWxlZExpc3QgcmVmPXtyZWZ9IHsuLi5wcm9wc30+XG4gICAgICAgIHtpdGVtLnR5cGUgPT09ICdwcm9maWxlLWRyb3Bkb3duJ1xuICAgICAgICAgID8gaXRlbS5wb3BvdmVyLm1hcCgobGlua1NlY3Rpb246IEFwcEhlYWRlckxpbmtJdGVtW10sIHNlY3Rpb25JbmRleCkgPT5cbiAgICAgICAgICAgICAgbGlua1NlY3Rpb24ubWFwKChsaW5rOiBBcHBIZWFkZXJMaW5rSXRlbSwgbGlua0luZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgPExpbmtDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17b25LZXlEb3dufVxuICAgICAgICAgICAgICAgICAga2V5PXtsaW5rLmlkfVxuICAgICAgICAgICAgICAgICAgYWN0aW9uPXthY3Rpb259XG4gICAgICAgICAgICAgICAgICBsaW5rPXtsaW5rfVxuICAgICAgICAgICAgICAgICAgc2hvd0xpbmVCcmVhaz17c2VjdGlvbkluZGV4ICE9PSAwICYmIGxpbmtJbmRleCA9PT0gMH1cbiAgICAgICAgICAgICAgICAgIHNob3dJY29uPXtzaG93SWNvbn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogaXRlbS5wb3BvdmVyLm1hcCgobGluazogQXBwSGVhZGVyTGlua0l0ZW0pID0+IChcbiAgICAgICAgICAgICAgPExpbmtDb21wb25lbnRcbiAgICAgICAgICAgICAgICBvbktleURvd249e29uS2V5RG93bn1cbiAgICAgICAgICAgICAgICBrZXk9e2xpbmsuaWR9XG4gICAgICAgICAgICAgICAgYWN0aW9uPXthY3Rpb259XG4gICAgICAgICAgICAgICAgbGluaz17bGlua31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgPC9TdHlsZWRMaXN0PlxuICAgIDwvQ29udGVudENvbnRhaW5lcj5cbiAgKVxuKTtcbiJdfQ== */");

var LinkComponent = function LinkComponent(_ref) {
  var action = _ref.action,
      link = _ref.link,
      _ref$showIcon = _ref.showIcon,
      showIcon = _ref$showIcon === void 0 ? false : _ref$showIcon,
      _ref$showLineBreak = _ref.showLineBreak,
      showLineBreak = _ref$showLineBreak === void 0 ? false : _ref$showLineBreak,
      onKeyDown = _ref.onKeyDown;
  return /*#__PURE__*/React.createElement(StyledListItem, {
    role: "none",
    showLineBreak: showLineBreak
  }, /*#__PURE__*/React.createElement(AppHeaderLink, {
    action: action,
    item: link,
    onKeyDown: onKeyDown,
    py: 16,
    showIcon: showIcon,
    tabIndex: "-1"
  }));
};

export var AppHeaderLinkSections = /*#__PURE__*/React.forwardRef(function AppHeaderLinkSections(_ref2, ref) {
  var action = _ref2.action,
      item = _ref2.item,
      _ref2$showIcon = _ref2.showIcon,
      showIcon = _ref2$showIcon === void 0 ? false : _ref2$showIcon,
      onKeyDown = _ref2.onKeyDown,
      _ref2$mobile = _ref2.mobile,
      mobile = _ref2$mobile === void 0 ? false : _ref2$mobile,
      props = _objectWithoutProperties(_ref2, ["action", "item", "showIcon", "onKeyDown", "mobile"]);

  return /*#__PURE__*/React.createElement(ContentContainer, {
    size: mobile ? 'medium' : 'small'
  }, /*#__PURE__*/React.createElement(StyledList, _extends({
    ref: ref
  }, props), item.type === 'profile-dropdown' ? item.popover.map(function (linkSection, sectionIndex) {
    return linkSection.map(function (link, linkIndex) {
      return /*#__PURE__*/React.createElement(LinkComponent, {
        onKeyDown: onKeyDown,
        key: link.id,
        action: action,
        link: link,
        showLineBreak: sectionIndex !== 0 && linkIndex === 0,
        showIcon: showIcon
      });
    });
  }) : item.popover.map(function (link) {
    return /*#__PURE__*/React.createElement(LinkComponent, {
      onKeyDown: onKeyDown,
      key: link.id,
      action: action,
      link: link
    });
  })));
});