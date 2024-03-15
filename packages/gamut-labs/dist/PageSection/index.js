function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { Box, FlexBox, Text, TextButton } from '@codecademy/gamut';
import React from 'react';

function isSectionButtonATextButton(button) {
  return button.text !== undefined;
}

export var PageSection = function PageSection(_ref) {
  var title = _ref.title,
      headerButton = _ref.headerButton,
      headerSecondaryButton = _ref.headerSecondaryButton,
      footerButton = _ref.footerButton,
      children = _ref.children;

  var renderSectionButton = function renderSectionButton(sectionButton) {
    if (!isSectionButtonATextButton(sectionButton)) return sectionButton;

    var text = sectionButton.text,
        buttonProps = _objectWithoutProperties(sectionButton, ["text"]);

    return /*#__PURE__*/React.createElement(TextButton, buttonProps, text);
  };

  var maybeRenderHeaderButton = function maybeRenderHeaderButton() {
    if (!headerButton) return null;
    return /*#__PURE__*/React.createElement(Box, {
      ml: 4,
      display: "inline"
    }, renderSectionButton(headerButton));
  };

  var maybeRenderHeaderSecondaryButton = function maybeRenderHeaderSecondaryButton() {
    if (!headerSecondaryButton) return null;
    return renderSectionButton(headerSecondaryButton);
  };

  var renderSectionHeader = function renderSectionHeader() {
    return (
      /*#__PURE__*/
      // Setting height directly to height of the buttons so if they are omitted
      // the header remains the same height.
      React.createElement(FlexBox, {
        height: "2.5rem",
        mb: 8,
        justifyContent: "space-between"
      }, /*#__PURE__*/React.createElement(FlexBox, {
        alignItems: "center"
      }, /*#__PURE__*/React.createElement(Text, {
        as: "h2",
        fontSize: 22
      }, title), maybeRenderHeaderButton()), maybeRenderHeaderSecondaryButton())
    );
  };

  var maybeRenderSectionFooter = function maybeRenderSectionFooter() {
    if (!footerButton) return null;
    return /*#__PURE__*/React.createElement(FlexBox, {
      justifyContent: "flex-end",
      mt: 16
    }, renderSectionButton(footerButton));
  };

  return /*#__PURE__*/React.createElement(FlexBox, {
    flexDirection: "column",
    mb: 48
  }, renderSectionHeader(), children, maybeRenderSectionFooter());
};