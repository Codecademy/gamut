import { Box, Column, FlexBox, LayoutGrid } from '@codecademy/gamut';
import * as React from 'react';
import { CTA } from './CTA';
import { Description } from './Description';
import { Feature, FeaturedDescription, FeaturedIcon, FeaturedImage, FeaturedStat, FeaturedTitle } from './Feature';
import { Title } from './Title';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var rowRenderEach = function rowRenderEach(items, itemRenderer) {
  /* eslint-disable react/no-array-index-key */
  return /*#__PURE__*/_jsx(FlexBox, {
    flexDirection: {
      _: 'column',
      sm: 'row'
    },
    children: items.map(function (item, i) {
      return /*#__PURE__*/_jsx(React.Fragment, {
        children: itemRenderer(item)
      }, i);
    })
  });
  /* eslint-enable react/no-array-index-key */
};

var gridRenderEach = function gridRenderEach(maxCols, items, itemRenderer) {
  var size = {
    _: 12,
    sm: 12 / maxCols
  };
  /* eslint-disable react/no-array-index-key */
  return /*#__PURE__*/_jsx(LayoutGrid, {
    columnGap: {
      _: 8,
      sm: 32
    },
    children: items.map(function (item, i) {
      return /*#__PURE__*/_jsx(Column, {
        size: size,
        children: itemRenderer(item)
      }, i);
    })
  });
  /* eslint-enable react/no-array-index-key */
};

var renderEach = function renderEach(maxCols, items, itemRenderer) {
  if (maxCols === undefined) {
    return rowRenderEach(items, itemRenderer);
  }
  if (maxCols > 0 && maxCols <= 4) {
    return gridRenderEach(maxCols, items, itemRenderer);
  }
  return null;
};
export var PageFeatures = function PageFeatures(_ref) {
  var title = _ref.title,
    desc = _ref.desc,
    cta = _ref.cta,
    maxCols = _ref.maxCols,
    features = _ref.features,
    featuresMedia = _ref.featuresMedia,
    testId = _ref.testId,
    onAnchorClick = _ref.onAnchorClick;
  return /*#__PURE__*/_jsxs("div", {
    "data-testid": testId,
    children: [/*#__PURE__*/_jsxs("div", {
      children: [title && /*#__PURE__*/_jsx(Title, {
        isPageHeading: false,
        children: title
      }), desc && /*#__PURE__*/_jsx(Description, {
        text: desc,
        onAnchorClick: onAnchorClick
      }), cta && /*#__PURE__*/_jsx(Box, {
        mt: 32,
        children: /*#__PURE__*/_jsx(CTA, {
          href: cta.href,
          onClick: cta.onClick,
          buttonType: cta.buttonType,
          children: cta.text
        })
      })]
    }), /*#__PURE__*/_jsx(Box, {
      mt: 16,
      children: renderEach(maxCols, features, function (_ref2) {
        var testId = _ref2.testId,
          imgSrc = _ref2.imgSrc,
          imgAlt = _ref2.imgAlt,
          statText = _ref2.statText,
          featTitle = _ref2.title,
          desc = _ref2.desc;
        return /*#__PURE__*/_jsxs(Feature, {
          testId: testId,
          children: [featuresMedia === 'image' && /*#__PURE__*/_jsx(FeaturedImage, {
            src: imgSrc,
            alt: imgAlt
          }), featuresMedia === 'icon' && /*#__PURE__*/_jsx(FeaturedIcon, {
            src: imgSrc,
            alt: imgAlt
          }), featuresMedia === 'stat' && /*#__PURE__*/_jsx(FeaturedStat, {
            children: statText
          }), featTitle && /*#__PURE__*/_jsx(FeaturedTitle, {
            as: title ? 'h3' : 'h2',
            children: featTitle
          }), desc && /*#__PURE__*/_jsx(FeaturedDescription, {
            desc: desc,
            onAnchorClick: onAnchorClick
          })]
        });
      })
    })]
  });
};