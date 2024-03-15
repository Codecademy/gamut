import { IconButton, Popover } from '@codecademy/gamut';
import React, { useRef } from 'react';
import { AnimatedHeaderZone } from '../AppHeader/shared';
import { CrossDeviceItemId } from '../GlobalHeader/types';
export var useBookmarkComponentsPair = function useBookmarkComponentsPair(_ref) {
  var openCrossDeviceItemId = _ref.openCrossDeviceItemId,
      setOpenCrossDeviceItemId = _ref.setOpenCrossDeviceItemId,
      bookmarkParts = _ref.bookmarkParts,
      view = _ref.view,
      isAnon = _ref.isAnon;
  var buttonRef = useRef(null);

  if (!bookmarkParts) {
    return [null, null];
  }

  var id = CrossDeviceItemId.BOOKMARKS;

  var toggleVisible = function toggleVisible() {
    if (openCrossDeviceItemId !== id) {
      bookmarkParts.onEnable();
    }

    setOpenCrossDeviceItemId(openCrossDeviceItemId === id ? CrossDeviceItemId.UNSET : id);
  };

  return [{
    id: id,
    type: 'render-element',
    renderElement: function renderElement() {
      return /*#__PURE__*/React.createElement(IconButton, {
        "aria-label": bookmarkParts.buttonAriaLabel,
        onClick: toggleVisible,
        variant: "interface",
        icon: bookmarkParts.icon,
        role: "menuitem",
        tabIndex: "-1",
        ref: buttonRef,
        display: {
          _: isAnon ? 'none' : 'inline-flex',
          xs: 'inline-flex'
        },
        key: "".concat(id, "-").concat(view, "-button")
      });
    }
  }, /*#__PURE__*/React.createElement(AnimatedHeaderZone, {
    visible: openCrossDeviceItemId === id,
    key: "".concat(id, "-").concat(view, "-content")
  }, view === 'desktop' ? /*#__PURE__*/React.createElement(Popover, {
    align: "right",
    verticalOffset: 1,
    outline: true,
    isOpen: true,
    targetRef: buttonRef
  }, /*#__PURE__*/React.createElement(React.Fragment, null, bookmarkParts.desktop())) : bookmarkParts.mobile())];
};