import { Box, FlexBox } from '@codecademy/gamut';
import React from 'react';
import { CTA } from './CTA';
import { Description } from './Description';
import { Title } from './Title';
export var PagePrefooter = function PagePrefooter(_ref) {
  var title = _ref.title,
      desc = _ref.desc,
      cta = _ref.cta,
      onAnchorClick = _ref.onAnchorClick,
      testId = _ref.testId;
  var SectionTitle = title && /*#__PURE__*/React.createElement(Title, null, title);
  var Desc = desc && /*#__PURE__*/React.createElement(Description, {
    text: desc,
    onAnchorClick: onAnchorClick
  });
  return cta ? /*#__PURE__*/React.createElement(FlexBox, {
    "data-testid": testId,
    flexDirection: {
      _: 'column',
      sm: 'row'
    },
    justifyContent: "space-between",
    alignItems: {
      sm: 'center'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    flex: 1
  }, SectionTitle, Desc), /*#__PURE__*/React.createElement(Box, {
    mt: {
      _: 32,
      sm: 0
    },
    ml: {
      sm: 32
    }
  }, /*#__PURE__*/React.createElement(CTA, {
    href: cta.href,
    onClick: cta.onClick,
    buttonType: cta.buttonType
  }, cta.text))) : /*#__PURE__*/React.createElement("div", {
    "data-testid": testId
  }, SectionTitle, Desc);
};