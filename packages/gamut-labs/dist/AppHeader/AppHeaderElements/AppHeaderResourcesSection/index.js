import _styled from "@emotion/styled/base";
import { Anchor, Column, FlexBox, LayoutGrid, Text } from '@codecademy/gamut';
import { Background, css } from '@codecademy/gamut-styles';
import React from 'react';
import { newHeaderResourcesList } from '../../../lib/resourcesList';
import { LayoutGridAntiAliased } from '../../shared';

var StyledColumn = /*#__PURE__*/_styled(Column, {
  target: "e1ssaywm0",
  label: "StyledColumn"
})(css({
  borderBottom: 1,
  borderColor: 'navy-300'
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyUmVzb3VyY2VzU2VjdGlvbi9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUJxQiIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvQXBwSGVhZGVyL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlclJlc291cmNlc1NlY3Rpb24vaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5jaG9yLCBDb2x1bW4sIEZsZXhCb3gsIExheW91dEdyaWQsIFRleHQgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBCYWNrZ3JvdW5kLCBjc3MgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgbmV3SGVhZGVyUmVzb3VyY2VzTGlzdCB9IGZyb20gJy4uLy4uLy4uL2xpYi9yZXNvdXJjZXNMaXN0JztcbmltcG9ydCB7IExheW91dEdyaWRBbnRpQWxpYXNlZCB9IGZyb20gJy4uLy4uL3NoYXJlZCc7XG5pbXBvcnQgeyBBcHBIZWFkZXJDbGlja0hhbmRsZXIsIEFwcEhlYWRlckxpbmtJdGVtIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgdHlwZSBBcHBIZWFkZXJSZXNvdXJjZXNTZWN0aW9uUHJvcHMgPSB7XG4gIGFjdGlvbjogQXBwSGVhZGVyQ2xpY2tIYW5kbGVyO1xuICByZWY/OiBSZWFjdC5SZWZPYmplY3Q8SFRNTFVMaXN0RWxlbWVudD47XG4gIHJvbGU/OiBzdHJpbmc7XG4gIGlkPzogc3RyaW5nO1xuICBrZXlEb3duRXZlbnRzPzogKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xuICBpc09wZW4/OiBib29sZWFuO1xuICBoYW5kbGVDbG9zZT86ICgpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBTdHlsZWRDb2x1bW4gPSBzdHlsZWQoQ29sdW1uKShcbiAgY3NzKHtcbiAgICBib3JkZXJCb3R0b206IDEsXG4gICAgYm9yZGVyQ29sb3I6ICduYXZ5LTMwMCcsXG4gIH0pXG4pO1xuXG5leHBvcnQgY29uc3QgQXBwSGVhZGVyUmVzb3VyY2VzU2VjdGlvbiA9IFJlYWN0LmZvcndhcmRSZWY8XG4gIEhUTUxEaXZFbGVtZW50LFxuICBBcHBIZWFkZXJSZXNvdXJjZXNTZWN0aW9uUHJvcHNcbj4oKHsgYWN0aW9uLCBpc09wZW4sIGtleURvd25FdmVudHMsIGhhbmRsZUNsb3NlIH0sIHJlZikgPT4ge1xuICBjb25zdCB0YWJJbmRleCA9IGlzT3BlbiA9PT0gZmFsc2UgPyAtMSA6IDA7XG5cbiAgY29uc3Qgb25DbGljayA9IChcbiAgICBldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQW5jaG9yRWxlbWVudCwgTW91c2VFdmVudD4sXG4gICAgbGlua0l0ZW06IEFwcEhlYWRlckxpbmtJdGVtXG4gICkgPT4ge1xuICAgIGhhbmRsZUNsb3NlPy4oKTtcbiAgICByZXR1cm4gYWN0aW9uKGV2ZW50LCBsaW5rSXRlbSk7XG4gIH07XG5cbiAgY29uc3QgRGVzY3JpcHRpb25TZWN0aW9uOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDx7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBzdWJ0aXRsZT86IHN0cmluZztcbiAgfT4gPSAoeyB0aXRsZSwgc3VidGl0bGUgfSkgPT4gKFxuICAgIDxGbGV4Qm94IGRhdGEtZm9jdXNhYmxlcmVzb3VyY2U9XCJ0cnVlXCIgdGFiSW5kZXg9ey0xfSBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCI+XG4gICAgICA8VGV4dFxuICAgICAgICBhcz1cImgyXCJcbiAgICAgICAgdmFyaWFudD1cInRpdGxlLXhzXCJcbiAgICAgICAgbWI9e3N1YnRpdGxlID8gOCA6IDB9XG4gICAgICAgIHByPXt7IF86IDk2LCBtZDogMTYgfX1cbiAgICAgICAgbXI9e3sgXzogOTYsIG1kOiAwIH19XG4gICAgICA+XG4gICAgICAgIHt0aXRsZX1cbiAgICAgIDwvVGV4dD5cbiAgICAgIHtzdWJ0aXRsZSAmJiA8VGV4dCBmb250U2l6ZT17MTR9PntzdWJ0aXRsZX08L1RleHQ+fVxuICAgIDwvRmxleEJveD5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxMYXlvdXRHcmlkQW50aUFsaWFzZWQgb25LZXlEb3duPXtrZXlEb3duRXZlbnRzfSByZWY9e3JlZn0gYXM9XCJ1bFwiIHA9ezB9PlxuICAgICAge25ld0hlYWRlclJlc291cmNlc0xpc3QubWFwKChzZWN0aW9uKSA9PiAoXG4gICAgICAgIDxTdHlsZWRDb2x1bW4gc2l6ZT17MTJ9IGtleT17c2VjdGlvbi50aXRsZX0gYXM9XCJsaVwiPlxuICAgICAgICAgIDxMYXlvdXRHcmlkPlxuICAgICAgICAgICAgPENvbHVtbiBzaXplPXt7IHhzOiAxMiwgbWQ6IDMgfX0+XG4gICAgICAgICAgICAgIDxCYWNrZ3JvdW5kXG4gICAgICAgICAgICAgICAgYmc9XCJuYXZ5LTgwMFwiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJibHVlLTBcIlxuICAgICAgICAgICAgICAgIHB4PXt7IF86IDE2LCB4czogMzIsIHNtOiA2NCwgbGc6IDMyIH19XG4gICAgICAgICAgICAgICAgcHk9e3sgXzogMTYsIHNtOiAzMiB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPERlc2NyaXB0aW9uU2VjdGlvblxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3NlY3Rpb24udGl0bGV9XG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17c2VjdGlvbi5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHtzZWN0aW9uLmxpbmsgJiYgKFxuICAgICAgICAgICAgICAgICAgPEFuY2hvclxuICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwic3RhbmRhcmRcIlxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZT17MTR9XG4gICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ9ezcwMH1cbiAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduPXt7IF86ICdjZW50ZXInLCBtZDogJ2xlZnQnIH19XG4gICAgICAgICAgICAgICAgICAgIGhyZWY9e3NlY3Rpb24ubGluay5ocmVmfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLWZvY3VzYWJsZXJlc291cmNlPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayhldmVudCwgc2VjdGlvbi5saW5rISl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgbXQ9e3sgXzogMjQsIGxnOiBzZWN0aW9uLmRlc2NyaXB0aW9uID8gMjQgOiA0OCB9fVxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9e3NlY3Rpb24ubGluay5uZXdUYWIgPyAnX2JsYW5rJyA6ICdfc2VsZid9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtzZWN0aW9uLmxpbmsudGV4dH1cbiAgICAgICAgICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvQmFja2dyb3VuZD5cbiAgICAgICAgICAgIDwvQ29sdW1uPlxuICAgICAgICAgICAgPENvbHVtbiBzaXplPXt7IHhzOiAxMiwgbWQ6IDggfX0+XG4gICAgICAgICAgICAgIDxMYXlvdXRHcmlkIHB0PXszMn0gcGI9ezI0fSBwbD17eyBfOiAxNiwgc206IDY0LCBtZDogNDggfX0+XG4gICAgICAgICAgICAgICAge3NlY3Rpb24uZGF0YS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgaWQsIGhyZWYsIHRleHQsIGJhZGdlLCBuZXdUYWIgfSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8Q29sdW1uIGtleT17aWR9IHNpemU9e3sgXzogMTIsIGxnOiA0IH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtZm9jdXNhYmxlcmVzb3VyY2U9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj17aHJlZn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayhldmVudCwgaXRlbSl9XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYj17MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldD17bmV3VGFiID8gJ19ibGFuaycgOiAnX3NlbGYnfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsnZGVzY3JpcHRpb24nIGluIGl0ZW0gPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZsZXhCb3g+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZT17MTZ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ9XCJib2xkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXM9XCJoM1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBiPXs0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtiYWRnZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0ZsZXhCb3g+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgZm9udFNpemU9ezE0fSBwYj17MjR9IHByPXs0MH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgZm9udFNpemU9ezE2fSBwYj17OH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgICAgICAgICAgICAgIDwvQ29sdW1uPlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgPC9MYXlvdXRHcmlkPlxuICAgICAgICAgICAgPC9Db2x1bW4+XG4gICAgICAgICAgPC9MYXlvdXRHcmlkPlxuICAgICAgICA8L1N0eWxlZENvbHVtbj5cbiAgICAgICkpfVxuICAgIDwvTGF5b3V0R3JpZEFudGlBbGlhc2VkPlxuICApO1xufSk7XG4iXX0= */");

export var AppHeaderResourcesSection = /*#__PURE__*/React.forwardRef(function AppHeaderResourcesSection(_ref, ref) {
  var action = _ref.action,
      isOpen = _ref.isOpen,
      keyDownEvents = _ref.keyDownEvents,
      handleClose = _ref.handleClose;
  var tabIndex = isOpen === false ? -1 : 0;

  var _onClick = function onClick(event, linkItem) {
    handleClose === null || handleClose === void 0 ? void 0 : handleClose();
    return action(event, linkItem);
  };

  var DescriptionSection = function DescriptionSection(_ref2) {
    var title = _ref2.title,
        subtitle = _ref2.subtitle;
    return /*#__PURE__*/React.createElement(FlexBox, {
      "data-focusableresource": "true",
      tabIndex: -1,
      flexDirection: "column"
    }, /*#__PURE__*/React.createElement(Text, {
      as: "h2",
      variant: "title-xs",
      mb: subtitle ? 8 : 0,
      pr: {
        _: 96,
        md: 16
      },
      mr: {
        _: 96,
        md: 0
      }
    }, title), subtitle && /*#__PURE__*/React.createElement(Text, {
      fontSize: 14
    }, subtitle));
  };

  return /*#__PURE__*/React.createElement(LayoutGridAntiAliased, {
    onKeyDown: keyDownEvents,
    ref: ref,
    as: "ul",
    p: 0
  }, newHeaderResourcesList.map(function (section) {
    return /*#__PURE__*/React.createElement(StyledColumn, {
      size: 12,
      key: section.title,
      as: "li"
    }, /*#__PURE__*/React.createElement(LayoutGrid, null, /*#__PURE__*/React.createElement(Column, {
      size: {
        xs: 12,
        md: 3
      }
    }, /*#__PURE__*/React.createElement(Background, {
      bg: "navy-800",
      color: "blue-0",
      px: {
        _: 16,
        xs: 32,
        sm: 64,
        lg: 32
      },
      py: {
        _: 16,
        sm: 32
      }
    }, /*#__PURE__*/React.createElement(DescriptionSection, {
      title: section.title,
      subtitle: section.description
    }), section.link && /*#__PURE__*/React.createElement(Anchor, {
      variant: "standard",
      fontSize: 14,
      fontWeight: 700,
      textAlign: {
        _: 'center',
        md: 'left'
      },
      href: section.link.href,
      "data-focusableresource": "true",
      onClick: function onClick(event) {
        return _onClick(event, section.link);
      },
      tabIndex: tabIndex,
      mt: {
        _: 24,
        lg: section.description ? 24 : 48
      },
      target: section.link.newTab ? '_blank' : '_self'
    }, section.link.text))), /*#__PURE__*/React.createElement(Column, {
      size: {
        xs: 12,
        md: 8
      }
    }, /*#__PURE__*/React.createElement(LayoutGrid, {
      pt: 32,
      pb: 24,
      pl: {
        _: 16,
        sm: 64,
        md: 48
      }
    }, section.data.map(function (item) {
      var id = item.id,
          href = item.href,
          text = item.text,
          badge = item.badge,
          newTab = item.newTab;
      return /*#__PURE__*/React.createElement(Column, {
        key: id,
        size: {
          _: 12,
          lg: 4
        }
      }, /*#__PURE__*/React.createElement(Anchor, {
        "data-focusableresource": "true",
        variant: "interface",
        href: href,
        onClick: function onClick(event) {
          return _onClick(event, item);
        },
        tabIndex: tabIndex,
        pb: 0,
        target: newTab ? '_blank' : '_self'
      }, 'description' in item ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FlexBox, null, /*#__PURE__*/React.createElement(Text, {
        fontSize: 16,
        fontWeight: "bold",
        as: "h3",
        pb: 4
      }, text), badge), /*#__PURE__*/React.createElement(Text, {
        fontSize: 14,
        pb: 24,
        pr: 40
      }, item.description)) : /*#__PURE__*/React.createElement(Text, {
        fontSize: 16,
        pb: 8
      }, text)));
    })))));
  }));
});