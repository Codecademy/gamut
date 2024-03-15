function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { newHeaderResourcesList } from '../../../lib/resourcesList';
import { DropdownAnchor, DropdownIcon, StyledDropdown, StyledText } from '../../shared';
import { AppHeaderResourcesSection } from '../AppHeaderResourcesSection';
export var KEY_CODES = {
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
export var AppHeaderResourcesDropdown = function AppHeaderResourcesDropdown(_ref) {
  var action = _ref.action,
      item = _ref.item,
      isAnon = _ref.isAnon;
  var text = item.text,
      dataTestId = item.dataTestId;
  var containerRef = useRef(null);
  var buttonRef = useRef(null);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      focusIndex = _useState4[0],
      setFocusIndex = _useState4[1];

  var items = newHeaderResourcesList.map(function (item) {
    return item.data.length;
  });
  var itemsCount = items.reduce(function (prevLength, currLength) {
    return prevLength + currLength;
  }) + 4; // extra for hardcoded headers and descriptions

  var focusFirstItem = function focusFirstItem() {
    return setFocusIndex(0);
  };

  var focusLastItem = function focusLastItem() {
    return setFocusIndex(itemsCount);
  };

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

  var getNode = function getNode(index) {
    var _containerRef$current;

    return (_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.querySelectorAll('[data-focusableresource=true]')[index];
  };

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

  var focusButton = function focusButton() {
    var _buttonRef$current;

    buttonRef === null || buttonRef === void 0 ? void 0 : (_buttonRef$current = buttonRef.current) === null || _buttonRef$current === void 0 ? void 0 : _buttonRef$current.focus();
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
  useEffect(function () {
    function handleClickOutside(event) {
      var container = containerRef === null || containerRef === void 0 ? void 0 : containerRef.current;
      var button = buttonRef === null || buttonRef === void 0 ? void 0 : buttonRef.current;

      if (isOpen && container && !container.contains(event.target) && button && !button.contains(event.target)) {
        handleClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('blur', handleClickOutside);
    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('blur', handleClickOutside);
    };
  }, [containerRef, handleClose, isOpen]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DropdownAnchor, {
    ref: buttonRef,
    onClick: handleOnClick,
    onKeyDown: buttonHandleKeyEvents,
    title: text,
    variant: "interface",
    tabIndex: "-1",
    "aria-expanded": isOpen,
    "aria-haspopup": true,
    "data-testid": dataTestId
  }, /*#__PURE__*/React.createElement(StyledText, {
    fontWeight: isOpen ? 'bold' : 'normal',
    textAlign: "center",
    title: text
  }, text), /*#__PURE__*/React.createElement(DropdownIcon, {
    "aria-label": "dropdown",
    open: isOpen,
    size: 12
  })), /*#__PURE__*/React.createElement(StyledDropdown, {
    style: {
      top: '3.5rem',
      minWidth: '64rem',
      left: isAnon ? '-14.5rem' : '-19.5rem'
    },
    initial: {
      borderWidth: 0,
      height: 0
    },
    animate: {
      borderWidth: isOpen ? 1 : 0,
      height: isOpen ? 'fit-content' : 0
    },
    transition: {
      duration: 0.175
    },
    "aria-hidden": !isOpen,
    "data-testid": "resources-menu-dropdown"
  }, /*#__PURE__*/React.createElement(AppHeaderResourcesSection, {
    action: action,
    role: "menu",
    ref: containerRef,
    keyDownEvents: menuHandleKeyEvents,
    id: "menu-container".concat(item.text),
    isOpen: isOpen,
    handleClose: function handleClose() {
      return setIsOpen(false);
    }
  })));
};