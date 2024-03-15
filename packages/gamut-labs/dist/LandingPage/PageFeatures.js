import { Box, Column, FlexBox, LayoutGrid } from '@codecademy/gamut';
import React from 'react';
import { CTA } from './CTA';
import { Description } from './Description';
import { Feature, FeaturedDescription, FeaturedIcon, FeaturedImage, FeaturedStat, FeaturedTitle } from './Feature';
import { Title } from './Title';

var rowRenderEach = function rowRenderEach(items, itemRenderer) {
  /* eslint-disable react/no-array-index-key */
  return /*#__PURE__*/React.createElement(FlexBox, {
    flexDirection: {
      _: 'column',
      sm: 'row'
    }
  }, items.map(function (item, i) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, itemRenderer(item));
  }));
  /* eslint-enable react/no-array-index-key */
};

var gridRenderEach = function gridRenderEach(maxCols, items, itemRenderer) {
  var size = {
    _: 12,
    sm: 12 / maxCols
  };
  /* eslint-disable react/no-array-index-key */

  return /*#__PURE__*/React.createElement(LayoutGrid, {
    columnGap: {
      _: 8,
      sm: 32
    }
  }, items.map(function (item, i) {
    return /*#__PURE__*/React.createElement(Column, {
      key: i,
      size: size
    }, itemRenderer(item));
  }));
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
  return /*#__PURE__*/React.createElement("div", {
    "data-testid": testId
  }, /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement(Title, {
    isPageHeading: false
  }, title), desc && /*#__PURE__*/React.createElement(Description, {
    text: desc,
    onAnchorClick: onAnchorClick
  }), cta && /*#__PURE__*/React.createElement(Box, {
    mt: 32
  }, /*#__PURE__*/React.createElement(CTA, {
    href: cta.href,
    onClick: cta.onClick,
    buttonType: cta.buttonType
  }, cta.text))), /*#__PURE__*/React.createElement(Box, {
    mt: 16
  }, renderEach(maxCols, features, function (_ref2) {
    var testId = _ref2.testId,
        imgSrc = _ref2.imgSrc,
        imgAlt = _ref2.imgAlt,
        statText = _ref2.statText,
        featTitle = _ref2.title,
        desc = _ref2.desc;
    return /*#__PURE__*/React.createElement(Feature, {
      testId: testId
    }, featuresMedia === 'image' && /*#__PURE__*/React.createElement(FeaturedImage, {
      src: imgSrc,
      alt: imgAlt
    }), featuresMedia === 'icon' && /*#__PURE__*/React.createElement(FeaturedIcon, {
      src: imgSrc,
      alt: imgAlt
    }), featuresMedia === 'stat' && /*#__PURE__*/React.createElement(FeaturedStat, null, statText), featTitle && /*#__PURE__*/React.createElement(FeaturedTitle, {
      as: title ? 'h3' : 'h2'
    }, featTitle), desc && /*#__PURE__*/React.createElement(FeaturedDescription, {
      desc: desc,
      onAnchorClick: onAnchorClick
    }));
  })));
};