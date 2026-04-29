import {
  beforeStylesHorizontal,
  bottomStyles,
  bottomStylesAfter,
  bottomStylesBefore,
  centerHorizontal,
  horizontalCenterStyles,
  leftAlignStyles,
  leftAlignStylesAfter,
  leftVertStyles,
  leftVertStylesAfter,
  rightAlignStyles,
  rightAlignStylesAfter,
  rightVertStyles,
  rightVertStylesAfter,
  topStyles,
  topStylesAfter,
  topStylesBefore,
  verticalCenterStyles,
  verticalCenterStylesAfter,
} from './styles';

export {
  getAlignmentStyles,
  getPopoverAlignmentAndPattern,
} from '../popoverAlignmentUtils';

export const createToolTipVariantFromAlignment = (alignment: string) => {
  let styleObject = {};
  let styleObjectAfter = {};
  let styleObjectBefore = {};

  const isRight = alignment.includes('right');
  const isTop = alignment.includes('top');
  const isCenter = alignment.includes('center');
  const isBottom = alignment.includes('bottom');
  const isLRAligned =
    alignment.startsWith('right') || alignment.startsWith('left');

  // top-center, top-right, + top-left styles
  if (isTop) {
    styleObject = { ...topStyles };
    styleObjectAfter = { ...topStylesAfter };
    styleObjectBefore = { ...topStylesBefore };
    // bottom-center, bottom-right, + bottom-left styles
  } else if (isBottom) {
    styleObject = { ...bottomStyles };
    styleObjectAfter = { ...bottomStylesAfter };
    styleObjectBefore = { ...bottomStylesBefore };
  } else if (isLRAligned) {
    // right-center & left-center styles
    styleObject = { ...horizontalCenterStyles };
    styleObjectAfter = { ...centerHorizontal };
    styleObjectBefore = { ...beforeStylesHorizontal };
    // right-center styles
    if (isRight) {
      styleObject = { ...styleObject, ...rightAlignStyles };
      styleObjectAfter = { ...styleObjectAfter, ...rightAlignStylesAfter };
      // left-center styles
    } else {
      styleObject = { ...styleObject, ...leftAlignStyles };
      styleObjectAfter = { ...styleObjectAfter, ...leftAlignStylesAfter };
    }
  }

  // top-center + bottom-center styles
  if (isCenter && !isLRAligned) {
    styleObject = { ...styleObject, ...verticalCenterStyles };
    styleObjectAfter = { ...styleObjectAfter, ...verticalCenterStylesAfter };
  } else if (!isCenter && !isLRAligned) {
    // top-right, bottom-right
    if (isRight) {
      styleObject = { ...styleObject, ...rightVertStyles };
      styleObjectAfter = { ...styleObjectAfter, ...rightVertStylesAfter };
    } else {
      // top-left, bottom-left
      styleObject = { ...styleObject, ...leftVertStyles };
      styleObjectAfter = { ...styleObjectAfter, ...leftVertStylesAfter };
    }
  }

  return {
    ...styleObject,
    '&::after': styleObjectAfter,
    '&::before': styleObjectBefore,
  };
};
