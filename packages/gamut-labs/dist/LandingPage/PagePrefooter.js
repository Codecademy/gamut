import { Box, FlexBox } from '@codecademy/gamut';
import * as React from 'react';
import { CTA } from './CTA';
import { Description } from './Description';
import { Title } from './Title';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var PagePrefooter = function PagePrefooter(_ref) {
  var title = _ref.title,
    desc = _ref.desc,
    cta = _ref.cta,
    onAnchorClick = _ref.onAnchorClick,
    testId = _ref.testId;
  var SectionTitle = title && /*#__PURE__*/_jsx(Title, {
    children: title
  });
  var Desc = desc && /*#__PURE__*/_jsx(Description, {
    text: desc,
    onAnchorClick: onAnchorClick
  });
  return cta ? /*#__PURE__*/_jsxs(FlexBox, {
    "data-testid": testId,
    flexDirection: {
      _: 'column',
      sm: 'row'
    },
    justifyContent: "space-between",
    alignItems: {
      sm: 'center'
    },
    children: [/*#__PURE__*/_jsxs(Box, {
      flex: 1,
      children: [SectionTitle, Desc]
    }), /*#__PURE__*/_jsx(Box, {
      mt: {
        _: 32,
        sm: 0
      },
      ml: {
        sm: 32
      },
      children: /*#__PURE__*/_jsx(CTA, {
        href: cta.href,
        onClick: cta.onClick,
        buttonType: cta.buttonType,
        children: cta.text
      })
    })]
  }) : /*#__PURE__*/_jsxs("div", {
    "data-testid": testId,
    children: [SectionTitle, Desc]
  });
};