import _styled from "@emotion/styled/base";
import { Box, Card, FlexBox, Text } from '@codecademy/gamut';
import { pxRem, theme } from '@codecademy/gamut-styles';
import { useMemo } from 'react';
import * as React from 'react';
import { Footer } from './Footer/index';
import { Image } from './Image/index';
import { Subtitle } from './Subtitle';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var cardHeight = 180;
var cardStyles = {
  inProgress: 'yellow',
  completed: 'navy'
};
var LineDecoration = /*#__PURE__*/_styled(Box, {
  target: "e1o59ewl0",
  label: "LineDecoration"
})("border-top:1px solid ", function (_ref) {
  var inProgress = _ref.inProgress;
  return inProgress ? theme.colors.navy : theme.colors['navy-200'];
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DdXJyaWN1bHVtQ2FyZC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEVrQyIsImZpbGUiOiIuLi8uLi9zcmMvQ3VycmljdWx1bUNhcmQvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQm94LFxuICBDYXJkLFxuICBDYXJkUHJvcHMsXG4gIEZsZXhCb3gsXG4gIEhlYWRpbmdUYWdzLFxuICBUZXh0LFxufSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBweFJlbSwgdGhlbWUgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgVGFnQ29sb3IgfSBmcm9tICcuL0JvdHRvbVRhZy9pbmRleCc7XG5pbXBvcnQgeyBGb290ZXIgfSBmcm9tICcuL0Zvb3Rlci9pbmRleCc7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gJy4vSW1hZ2UvaW5kZXgnO1xuaW1wb3J0IHsgU3VidGl0bGUsIFN1YnRpdGxlUHJvcHMgfSBmcm9tICcuL1N1YnRpdGxlJztcblxuZXhwb3J0IHR5cGUgUHJvZ3Jlc3NTdGF0ZSA9ICdpblByb2dyZXNzJyB8ICdjb21wbGV0ZWQnO1xuXG5leHBvcnQgdHlwZSBGb290ZXJUZXh0VmFyaWFudFR5cGUgPSAnZW5yb2xsZWQnIHwgJ2luUHJvZ3Jlc3MnO1xuXG5jb25zdCBjYXJkSGVpZ2h0ID0gMTgwO1xuXG5jb25zdCBjYXJkU3R5bGVzID0ge1xuICBpblByb2dyZXNzOiAneWVsbG93JyxcbiAgY29tcGxldGVkOiAnbmF2eScsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBDdXJyaWN1bHVtQ2FyZFByb3BzID0gU3VidGl0bGVQcm9wcyAmIHtcbiAgYmV0YT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBEaXNwbGF5cyB0aGUgY3VycmljdWx1bSB0eXBlIGFib3ZlIHRoZSB0aXRsZVxuICAgKi9cbiAgdGV4dDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBoZWFkaW5nTGV2ZWw/OiBIZWFkaW5nVGFncztcbiAgaW1hZ2U/OiBzdHJpbmc7XG4gIGlzRnVsbFNpemU/OiBib29sZWFuO1xuICBpc1N0YXRpY1NpemU/OiBib29sZWFuO1xuICBwcm9ncmVzc1N0YXRlPzogUHJvZ3Jlc3NTdGF0ZTtcbiAgc2hvd1Byb0xvZ28/OiBib29sZWFuO1xuICB0YWc/OiBzdHJpbmc7XG4gIHRhZ0NvbG9yPzogVGFnQ29sb3I7XG4gIHNob3dBbHRTdWJ0aXRsZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBDaGFuZ2VzIEluIFByb2dyZXNzIGNhcmQgZm9vdGVyIHRleHQgZnJvbSBcIkVucm9sbGVkLi4uXCIgdG8gXCJJbiBQcm9ncmVzcy4uLlwiXG4gICAqL1xuICBmb290ZXJUZXh0VmFyaWFudD86IEZvb3RlclRleHRWYXJpYW50VHlwZTtcbiAgLyoqXG4gICAqIG9wdGlvbmFsIHRleHQgdG8gYmUgZGlzcGxheWVkIGJlbG93IGNhcmQgc3VidGl0bGVcbiAgICovXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAvKipcbiAgICogYWxsb3dzIGRlc2NyaXB0aW9uIHRvIGJlIHNob3duIGluIGNhcmQgYm9keS5cbiAgICovXG4gIHNob3dEZXNjcmlwdGlvbj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBjYXJlZXIgcGF0aCBjYXJkcyBhcmUgZGlzcGxheWVkIHdpdGggYSB2YXJpYW50IHN0eWxlIC8gZGVjb3JhdGl2ZSBlbGVtZW50XG4gICAqL1xuICBzaG93Q2FyZWVyUGF0aFZhcmlhbnQ/OiBib29sZWFuO1xuICAvKipcbiAgICogZGlzcGxheXMgaW5uZXIgY29udGVudCB3aXRoIGEgaG9yaXpvbnRhbCBvcmllbnRhdGlvblxuICAgKi9cbiAgaG9yaXpvbnRhbE9yaWVudGF0aW9uPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogY3VzdG9tIG1pbmltdW0gaGVpZ2h0IGZvciBjdXJyaWN1bHVtIGNhcmQgaW4gcGl4ZWxzXG4gICAqL1xuICBtaW5IZWlnaHQ/OiBDYXJkUHJvcHNbJ21pbkhlaWdodCddO1xuICAvKipcbiAgICogY3VzdG9tIG1pbmltdW0gd2lkdGggZm9yIGN1cnJpY3VsdW0gY2FyZCBpbiBwaXhlbHNcbiAgICovXG4gIG1pbldpZHRoPzogQ2FyZFByb3BzWydtaW5XaWR0aCddO1xufTtcblxuY29uc3QgTGluZURlY29yYXRpb24gPSBzdHlsZWQoQm94KWBcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkXG4gICAgJHsoeyBpblByb2dyZXNzIH06IHsgaW5Qcm9ncmVzcz86IGJvb2xlYW4gfSkgPT5cbiAgICAgIGluUHJvZ3Jlc3MgPyB0aGVtZS5jb2xvcnMubmF2eSA6IHRoZW1lLmNvbG9yc1snbmF2eS0yMDAnXX07XG5gO1xuXG5leHBvcnQgY29uc3QgQ3VycmljdWx1bUNhcmQ6IFJlYWN0LkZDPEN1cnJpY3VsdW1DYXJkUHJvcHM+ID0gKHtcbiAgYmV0YSxcbiAgZGlmZmljdWx0eSxcbiAgZGVzY3JpcHRpb24sXG4gIGhlYWRpbmdMZXZlbCA9ICdoMycsXG4gIGltYWdlLFxuICBpc0Z1bGxTaXplID0gZmFsc2UsXG4gIGlzU3RhdGljU2l6ZSA9IGZhbHNlLFxuICBwcm9ncmVzc1N0YXRlLFxuICBzY29wZSxcbiAgdGFnLFxuICB0YWdDb2xvcixcbiAgdGV4dCxcbiAgdGl0bGUsXG4gIHNob3dDYXJlZXJQYXRoVmFyaWFudCxcbiAgc2hvd0FsdFN1YnRpdGxlID0gZmFsc2UsXG4gIGZvb3RlclRleHRWYXJpYW50ID0gJ2Vucm9sbGVkJyxcbiAgc2hvd0Rlc2NyaXB0aW9uLFxuICBkaWZmaWN1bHR5VmFyaWFudCxcbiAgaG9yaXpvbnRhbE9yaWVudGF0aW9uLFxuICBtaW5IZWlnaHQsXG4gIG1pbldpZHRoLFxuICBzaG93UHJvTG9nbzogcHJvLFxufSkgPT4ge1xuICBjb25zdCBib3hWYXJpYW50ID0gcHJvZ3Jlc3NTdGF0ZSAmJiBjYXJkU3R5bGVzW3Byb2dyZXNzU3RhdGVdO1xuXG4gIGNvbnN0IGlzQ2FyZWVyUGF0aFZhcmlhbnQgPVxuICAgIHRleHQudG9Mb3dlckNhc2UoKSA9PT0gJ2NhcmVlciBwYXRoJyAmJiBzaG93Q2FyZWVyUGF0aFZhcmlhbnQ7XG5cbiAgY29uc3QgbWluaW11bUhlaWdodCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmIChtaW5IZWlnaHQpIHJldHVybiBtaW5IZWlnaHQ7XG4gICAgcmV0dXJuIGlzU3RhdGljU2l6ZVxuICAgICAgPyBweFJlbSgyODUpXG4gICAgICA6IGlzRnVsbFNpemVcbiAgICAgID8gcHhSZW0oY2FyZEhlaWdodCAqIDIgKyAzMilcbiAgICAgIDogcHhSZW0oY2FyZEhlaWdodCk7XG4gIH0sIFtpc0Z1bGxTaXplLCBpc1N0YXRpY1NpemUsIG1pbkhlaWdodF0pO1xuXG4gIGNvbnN0IGNvbnRlbnRUeXBlID0gdGV4dCA9PT0gJ0NvdXJzZScgJiYgIXBybyA/ICdGcmVlIENvdXJzZScgOiB0ZXh0O1xuICByZXR1cm4gKFxuICAgIDxDYXJkXG4gICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICBmbGV4RGlyZWN0aW9uPXt7XG4gICAgICAgIF86ICdjb2x1bW4nLFxuICAgICAgICB4czogaG9yaXpvbnRhbE9yaWVudGF0aW9uID8gJ3JvdycgOiAnY29sdW1uJyxcbiAgICAgIH19XG4gICAgICBtaW5IZWlnaHQ9e21pbmltdW1IZWlnaHR9XG4gICAgICBtaW5XaWR0aD17bWluV2lkdGh9XG4gICAgICB2YXJpYW50PXtib3hWYXJpYW50ID8/ICd3aGl0ZSd9XG4gICAgICBzaGFkb3c9XCJtZWRpdW1cIlxuICAgICAgcG9zaXRpb249XCJyZWxhdGl2ZVwiXG4gICAgPlxuICAgICAgPEJveFxuICAgICAgICBtYXhXaWR0aD17aG9yaXpvbnRhbE9yaWVudGF0aW9uID8gNDE4IDogJ25vbmUnfVxuICAgICAgICBwcj17eyBfOiAwLCB4czogaG9yaXpvbnRhbE9yaWVudGF0aW9uID8gNDAgOiAwIH19XG4gICAgICA+XG4gICAgICAgIDxUZXh0XG4gICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICAgIGZvbnRTaXplPXsxNH1cbiAgICAgICAgICBtYj17MTJ9XG4gICAgICAgICAgZm9udEZhbWlseT1cImFjY2VudFwiXG4gICAgICAgICAgdGV4dFRyYW5zZm9ybT1cImNhcGl0YWxpemVcIlxuICAgICAgICA+XG4gICAgICAgICAge2NvbnRlbnRUeXBlfVxuICAgICAgICA8L1RleHQ+XG4gICAgICAgIDxUZXh0IGFzPXtoZWFkaW5nTGV2ZWx9IG1iPXs0fSBmb250U2l6ZT17MjB9PlxuICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgPC9UZXh0PlxuICAgICAgICB7IXByb2dyZXNzU3RhdGUgJiYgKFxuICAgICAgICAgIDxGbGV4Qm94IGZsZXhXcmFwPVwid3JhcFwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxTdWJ0aXRsZVxuICAgICAgICAgICAgICBzY29wZT17c2NvcGV9XG4gICAgICAgICAgICAgIGRpZmZpY3VsdHk9e2RpZmZpY3VsdHl9XG4gICAgICAgICAgICAgIHNob3dBbHRTdWJ0aXRsZT17c2hvd0FsdFN1YnRpdGxlfVxuICAgICAgICAgICAgICBkaWZmaWN1bHR5VmFyaWFudD17ZGlmZmljdWx0eVZhcmlhbnR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvRmxleEJveD5cbiAgICAgICAgKX1cbiAgICAgICAge2lzQ2FyZWVyUGF0aFZhcmlhbnQgJiYgKFxuICAgICAgICAgIDxMaW5lRGVjb3JhdGlvbiBpblByb2dyZXNzPXtwcm9ncmVzc1N0YXRlID09PSAnaW5Qcm9ncmVzcyd9IG15PXs4fSAvPlxuICAgICAgICApfVxuICAgICAgICB7KGlzQ2FyZWVyUGF0aFZhcmlhbnQgfHwgc2hvd0Rlc2NyaXB0aW9uKSAmJiAoXG4gICAgICAgICAgPFRleHQgcHQ9ezh9IHBiPXsxNn0gZm9udFNpemU9ezE0fT5cbiAgICAgICAgICAgIHtkZXNjcmlwdGlvbn1cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICAgIHtpc0Z1bGxTaXplICYmIGltYWdlICYmIChcbiAgICAgICAgPEZsZXhCb3hcbiAgICAgICAgICBteT1cImF1dG9cIlxuICAgICAgICAgIG1sPVwiYXV0b1wiXG4gICAgICAgICAgbXI9e2hvcml6b250YWxPcmllbnRhdGlvbiA/IDAgOiAnYXV0byd9XG4gICAgICAgICAgcHQ9ezE2fVxuICAgICAgICAgIHBiPXtpc0NhcmVlclBhdGhWYXJpYW50ID8gMzIgOiAwfVxuICAgICAgICAgIHByPXt7IF86IDAsIHhzOiBob3Jpem9udGFsT3JpZW50YXRpb24gPyAyNCA6IDAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxJbWFnZVxuICAgICAgICAgICAgaXNTbWFsbD17aXNDYXJlZXJQYXRoVmFyaWFudH1cbiAgICAgICAgICAgIGltYWdlPXtpbWFnZX1cbiAgICAgICAgICAgIHByb2dyZXNzU3RhdGU9e3Byb2dyZXNzU3RhdGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9GbGV4Qm94PlxuICAgICAgKX1cbiAgICAgIDxGb290ZXJcbiAgICAgICAgYmV0YT17YmV0YX1cbiAgICAgICAgcHJvZ3Jlc3NTdGF0ZT17cHJvZ3Jlc3NTdGF0ZX1cbiAgICAgICAgdGFnPXt0YWd9XG4gICAgICAgIHRhZ0NvbG9yPXt0YWdDb2xvcn1cbiAgICAgICAgZm9vdGVyVGV4dFZhcmlhbnQ9e2Zvb3RlclRleHRWYXJpYW50fVxuICAgICAgLz5cbiAgICA8L0NhcmQ+XG4gICk7XG59O1xuIl19 */"));
export var CurriculumCard = function CurriculumCard(_ref2) {
  var beta = _ref2.beta,
    difficulty = _ref2.difficulty,
    description = _ref2.description,
    _ref2$headingLevel = _ref2.headingLevel,
    headingLevel = _ref2$headingLevel === void 0 ? 'h3' : _ref2$headingLevel,
    image = _ref2.image,
    _ref2$isFullSize = _ref2.isFullSize,
    isFullSize = _ref2$isFullSize === void 0 ? false : _ref2$isFullSize,
    _ref2$isStaticSize = _ref2.isStaticSize,
    isStaticSize = _ref2$isStaticSize === void 0 ? false : _ref2$isStaticSize,
    progressState = _ref2.progressState,
    scope = _ref2.scope,
    tag = _ref2.tag,
    tagColor = _ref2.tagColor,
    text = _ref2.text,
    title = _ref2.title,
    showCareerPathVariant = _ref2.showCareerPathVariant,
    _ref2$showAltSubtitle = _ref2.showAltSubtitle,
    showAltSubtitle = _ref2$showAltSubtitle === void 0 ? false : _ref2$showAltSubtitle,
    _ref2$footerTextVaria = _ref2.footerTextVariant,
    footerTextVariant = _ref2$footerTextVaria === void 0 ? 'enrolled' : _ref2$footerTextVaria,
    showDescription = _ref2.showDescription,
    difficultyVariant = _ref2.difficultyVariant,
    horizontalOrientation = _ref2.horizontalOrientation,
    minHeight = _ref2.minHeight,
    minWidth = _ref2.minWidth,
    pro = _ref2.showProLogo;
  var boxVariant = progressState && cardStyles[progressState];
  var isCareerPathVariant = text.toLowerCase() === 'career path' && showCareerPathVariant;
  var minimumHeight = useMemo(function () {
    if (minHeight) return minHeight;
    return isStaticSize ? pxRem(285) : isFullSize ? pxRem(cardHeight * 2 + 32) : pxRem(cardHeight);
  }, [isFullSize, isStaticSize, minHeight]);
  var contentType = text === 'Course' && !pro ? 'Free Course' : text;
  return /*#__PURE__*/_jsxs(Card, {
    display: "flex",
    flexDirection: {
      _: 'column',
      xs: horizontalOrientation ? 'row' : 'column'
    },
    minHeight: minimumHeight,
    minWidth: minWidth,
    variant: boxVariant !== null && boxVariant !== void 0 ? boxVariant : 'white',
    shadow: "medium",
    position: "relative",
    children: [/*#__PURE__*/_jsxs(Box, {
      maxWidth: horizontalOrientation ? 418 : 'none',
      pr: {
        _: 0,
        xs: horizontalOrientation ? 40 : 0
      },
      children: [/*#__PURE__*/_jsx(Text, {
        display: "flex",
        fontSize: 14,
        mb: 12,
        fontFamily: "accent",
        textTransform: "capitalize",
        children: contentType
      }), /*#__PURE__*/_jsx(Text, {
        as: headingLevel,
        mb: 4,
        fontSize: 20,
        children: title
      }), !progressState && /*#__PURE__*/_jsx(FlexBox, {
        flexWrap: "wrap",
        alignItems: "center",
        children: /*#__PURE__*/_jsx(Subtitle, {
          scope: scope,
          difficulty: difficulty,
          showAltSubtitle: showAltSubtitle,
          difficultyVariant: difficultyVariant
        })
      }), isCareerPathVariant && /*#__PURE__*/_jsx(LineDecoration, {
        inProgress: progressState === 'inProgress',
        my: 8
      }), (isCareerPathVariant || showDescription) && /*#__PURE__*/_jsx(Text, {
        pt: 8,
        pb: 16,
        fontSize: 14,
        children: description
      })]
    }), isFullSize && image && /*#__PURE__*/_jsx(FlexBox, {
      my: "auto",
      ml: "auto",
      mr: horizontalOrientation ? 0 : 'auto',
      pt: 16,
      pb: isCareerPathVariant ? 32 : 0,
      pr: {
        _: 0,
        xs: horizontalOrientation ? 24 : 0
      },
      children: /*#__PURE__*/_jsx(Image, {
        isSmall: isCareerPathVariant,
        image: image,
        progressState: progressState
      })
    }), /*#__PURE__*/_jsx(Footer, {
      beta: beta,
      progressState: progressState,
      tag: tag,
      tagColor: tagColor,
      footerTextVariant: footerTextVariant
    })]
  });
};