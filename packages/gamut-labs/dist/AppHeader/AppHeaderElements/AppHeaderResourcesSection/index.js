import _styled from "@emotion/styled/base";
import { Anchor, Column, FlexBox, LayoutGrid, Text } from '@codecademy/gamut';
import { Background, css } from '@codecademy/gamut-styles';
import * as React from 'react';
import { headerResourcesList } from '../../../lib/resourcesList';
import { DescriptionSectionContainer, LayoutGridAntiAliased } from '../../shared';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var StyledColumn = /*#__PURE__*/_styled(Column, {
  target: "e1ssaywm0",
  label: "StyledColumn"
})(css({
  borderBottom: 1,
  borderColor: 'navy-300'
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyUmVzb3VyY2VzU2VjdGlvbi9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0JxQiIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvQXBwSGVhZGVyL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlclJlc291cmNlc1NlY3Rpb24vaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5jaG9yLCBDb2x1bW4sIEZsZXhCb3gsIExheW91dEdyaWQsIFRleHQgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBCYWNrZ3JvdW5kLCBjc3MgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBoZWFkZXJSZXNvdXJjZXNMaXN0IH0gZnJvbSAnLi4vLi4vLi4vbGliL3Jlc291cmNlc0xpc3QnO1xuaW1wb3J0IHtcbiAgRGVzY3JpcHRpb25TZWN0aW9uQ29udGFpbmVyLFxuICBMYXlvdXRHcmlkQW50aUFsaWFzZWQsXG59IGZyb20gJy4uLy4uL3NoYXJlZCc7XG5pbXBvcnQgeyBBcHBIZWFkZXJDbGlja0hhbmRsZXIsIEFwcEhlYWRlckxpbmtJdGVtIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgdHlwZSBBcHBIZWFkZXJSZXNvdXJjZXNTZWN0aW9uUHJvcHMgPSB7XG4gIGFjdGlvbjogQXBwSGVhZGVyQ2xpY2tIYW5kbGVyO1xuICByZWY/OiBSZWFjdC5SZWZPYmplY3Q8SFRNTFVMaXN0RWxlbWVudD47XG4gIHJvbGU/OiBzdHJpbmc7XG4gIGlkPzogc3RyaW5nO1xuICBrZXlEb3duRXZlbnRzPzogKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xuICBpc09wZW4/OiBib29sZWFuO1xuICBoYW5kbGVDbG9zZT86ICgpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBTdHlsZWRDb2x1bW4gPSBzdHlsZWQoQ29sdW1uKShcbiAgY3NzKHtcbiAgICBib3JkZXJCb3R0b206IDEsXG4gICAgYm9yZGVyQ29sb3I6ICduYXZ5LTMwMCcsXG4gIH0pXG4pO1xuXG5leHBvcnQgY29uc3QgQXBwSGVhZGVyUmVzb3VyY2VzU2VjdGlvbiA9IFJlYWN0LmZvcndhcmRSZWY8XG4gIEhUTUxEaXZFbGVtZW50LFxuICBBcHBIZWFkZXJSZXNvdXJjZXNTZWN0aW9uUHJvcHNcbj4oKHsgYWN0aW9uLCBpc09wZW4sIGtleURvd25FdmVudHMsIGhhbmRsZUNsb3NlIH0sIHJlZikgPT4ge1xuICBjb25zdCB0YWJJbmRleCA9IGlzT3BlbiA9PT0gZmFsc2UgPyAtMSA6IDA7XG5cbiAgY29uc3Qgb25DbGljayA9IChcbiAgICBldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQW5jaG9yRWxlbWVudCwgTW91c2VFdmVudD4sXG4gICAgbGlua0l0ZW06IEFwcEhlYWRlckxpbmtJdGVtXG4gICkgPT4ge1xuICAgIGhhbmRsZUNsb3NlPy4oKTtcbiAgICByZXR1cm4gYWN0aW9uKGV2ZW50LCBsaW5rSXRlbSk7XG4gIH07XG5cbiAgY29uc3QgRGVzY3JpcHRpb25TZWN0aW9uOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDx7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBzdWJ0aXRsZT86IHN0cmluZztcbiAgfT4gPSAoeyB0aXRsZSwgc3VidGl0bGUgfSkgPT4gKFxuICAgIDxEZXNjcmlwdGlvblNlY3Rpb25Db250YWluZXJcbiAgICAgIGRhdGEtZm9jdXNhYmxlcmVzb3VyY2U9XCJ0cnVlXCJcbiAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIlxuICAgID5cbiAgICAgIDxUZXh0XG4gICAgICAgIGFzPVwiaDJcIlxuICAgICAgICB2YXJpYW50PVwidGl0bGUteHNcIlxuICAgICAgICBtYj17c3VidGl0bGUgPyA4IDogMH1cbiAgICAgICAgcHI9e3sgXzogOTYsIG1kOiAxNiB9fVxuICAgICAgICBtcj17eyBfOiA5NiwgbWQ6IDAgfX1cbiAgICAgID5cbiAgICAgICAge3RpdGxlfVxuICAgICAgPC9UZXh0PlxuICAgICAge3N1YnRpdGxlICYmIDxUZXh0IGZvbnRTaXplPXsxNH0+e3N1YnRpdGxlfTwvVGV4dD59XG4gICAgPC9EZXNjcmlwdGlvblNlY3Rpb25Db250YWluZXI+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8TGF5b3V0R3JpZEFudGlBbGlhc2VkIG9uS2V5RG93bj17a2V5RG93bkV2ZW50c30gcmVmPXtyZWZ9IGFzPVwidWxcIiBwPXswfT5cbiAgICAgIHtoZWFkZXJSZXNvdXJjZXNMaXN0Lm1hcCgoc2VjdGlvbikgPT4gKFxuICAgICAgICA8U3R5bGVkQ29sdW1uIHNpemU9ezEyfSBrZXk9e3NlY3Rpb24udGl0bGV9IGFzPVwibGlcIj5cbiAgICAgICAgICA8TGF5b3V0R3JpZD5cbiAgICAgICAgICAgIDxDb2x1bW4gc2l6ZT17eyB4czogMTIsIG1kOiAzIH19PlxuICAgICAgICAgICAgICA8QmFja2dyb3VuZFxuICAgICAgICAgICAgICAgIGJnPVwibmF2eS04MDBcIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwiYmx1ZS0wXCJcbiAgICAgICAgICAgICAgICBweD17eyBfOiAxNiwgeHM6IDMyLCBzbTogNjQsIGxnOiAzMiB9fVxuICAgICAgICAgICAgICAgIHB5PXt7IF86IDE2LCBzbTogMzIgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxEZXNjcmlwdGlvblNlY3Rpb25cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtzZWN0aW9uLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgc3VidGl0bGU9e3NlY3Rpb24uZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICB7c2VjdGlvbi5saW5rICYmIChcbiAgICAgICAgICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInN0YW5kYXJkXCJcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU9ezE0fVxuICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0PXs3MDB9XG4gICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbj17eyBfOiAnY2VudGVyJywgbWQ6ICdsZWZ0JyB9fVxuICAgICAgICAgICAgICAgICAgICBocmVmPXtzZWN0aW9uLmxpbmsuaHJlZn1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1mb2N1c2FibGVyZXNvdXJjZT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IG9uQ2xpY2soZXZlbnQsIHNlY3Rpb24ubGluayEpfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIG10PXt7IF86IDI0LCBsZzogc2VjdGlvbi5kZXNjcmlwdGlvbiA/IDI0IDogNDggfX1cbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PXtzZWN0aW9uLmxpbmsubmV3VGFiID8gJ19ibGFuaycgOiAnX3NlbGYnfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7c2VjdGlvbi5saW5rLnRleHR9XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPiZuYnNwO+KGkjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvQW5jaG9yPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvQmFja2dyb3VuZD5cbiAgICAgICAgICAgIDwvQ29sdW1uPlxuICAgICAgICAgICAgPENvbHVtbiBzaXplPXt7IHhzOiAxMiwgbWQ6IDggfX0+XG4gICAgICAgICAgICAgIDxMYXlvdXRHcmlkIHB0PXszMn0gcGI9ezI0fSBwbD17eyBfOiAxNiwgc206IDY0LCBtZDogNDggfX0+XG4gICAgICAgICAgICAgICAge3NlY3Rpb24uZGF0YS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgaWQsIGhyZWYsIHRleHQsIGJhZGdlLCBuZXdUYWIgfSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8Q29sdW1uIGtleT17aWR9IHNpemU9e3sgXzogMTIsIGxnOiA0IH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxBbmNob3JcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtZm9jdXNhYmxlcmVzb3VyY2U9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj17aHJlZn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gb25DbGljayhldmVudCwgaXRlbSl9XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYj17MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldD17bmV3VGFiID8gJ19ibGFuaycgOiAnX3NlbGYnfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsnZGVzY3JpcHRpb24nIGluIGl0ZW0gPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZsZXhCb3g+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZT17MTZ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ9XCJib2xkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXM9XCJoM1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBiPXs0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtiYWRnZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0ZsZXhCb3g+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgZm9udFNpemU9ezE0fSBwYj17MjR9IHByPXs0MH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgZm9udFNpemU9ezE2fSBwYj17OH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9BbmNob3I+XG4gICAgICAgICAgICAgICAgICAgIDwvQ29sdW1uPlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgPC9MYXlvdXRHcmlkPlxuICAgICAgICAgICAgPC9Db2x1bW4+XG4gICAgICAgICAgPC9MYXlvdXRHcmlkPlxuICAgICAgICA8L1N0eWxlZENvbHVtbj5cbiAgICAgICkpfVxuICAgIDwvTGF5b3V0R3JpZEFudGlBbGlhc2VkPlxuICApO1xufSk7XG4iXX0= */");
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
    return /*#__PURE__*/_jsxs(DescriptionSectionContainer, {
      "data-focusableresource": "true",
      tabIndex: -1,
      flexDirection: "column",
      children: [/*#__PURE__*/_jsx(Text, {
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
        },
        children: title
      }), subtitle && /*#__PURE__*/_jsx(Text, {
        fontSize: 14,
        children: subtitle
      })]
    });
  };
  return /*#__PURE__*/_jsx(LayoutGridAntiAliased, {
    onKeyDown: keyDownEvents,
    ref: ref,
    as: "ul",
    p: 0,
    children: headerResourcesList.map(function (section) {
      return /*#__PURE__*/_jsx(StyledColumn, {
        size: 12,
        as: "li",
        children: /*#__PURE__*/_jsxs(LayoutGrid, {
          children: [/*#__PURE__*/_jsx(Column, {
            size: {
              xs: 12,
              md: 3
            },
            children: /*#__PURE__*/_jsxs(Background, {
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
              },
              children: [/*#__PURE__*/_jsx(DescriptionSection, {
                title: section.title,
                subtitle: section.description
              }), section.link && /*#__PURE__*/_jsxs(Anchor, {
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
                target: section.link.newTab ? '_blank' : '_self',
                children: [section.link.text, /*#__PURE__*/_jsx("span", {
                  "aria-hidden": true,
                  children: "\xA0\u2192"
                })]
              })]
            })
          }), /*#__PURE__*/_jsx(Column, {
            size: {
              xs: 12,
              md: 8
            },
            children: /*#__PURE__*/_jsx(LayoutGrid, {
              pt: 32,
              pb: 24,
              pl: {
                _: 16,
                sm: 64,
                md: 48
              },
              children: section.data.map(function (item) {
                var id = item.id,
                  href = item.href,
                  text = item.text,
                  badge = item.badge,
                  newTab = item.newTab;
                return /*#__PURE__*/_jsx(Column, {
                  size: {
                    _: 12,
                    lg: 4
                  },
                  children: /*#__PURE__*/_jsx(Anchor, {
                    "data-focusableresource": "true",
                    variant: "interface",
                    href: href,
                    onClick: function onClick(event) {
                      return _onClick(event, item);
                    },
                    tabIndex: tabIndex,
                    pb: 0,
                    target: newTab ? '_blank' : '_self',
                    children: 'description' in item ? /*#__PURE__*/_jsxs(_Fragment, {
                      children: [/*#__PURE__*/_jsxs(FlexBox, {
                        children: [/*#__PURE__*/_jsx(Text, {
                          fontSize: 16,
                          fontWeight: "bold",
                          as: "h3",
                          pb: 4,
                          children: text
                        }), badge]
                      }), /*#__PURE__*/_jsx(Text, {
                        fontSize: 14,
                        pb: 24,
                        pr: 40,
                        children: item.description
                      })]
                    }) : /*#__PURE__*/_jsx(Text, {
                      fontSize: 16,
                      pb: 8,
                      children: text
                    })
                  })
                }, id);
              })
            })
          })]
        })
      }, section.title);
    })
  });
});