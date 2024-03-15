import _styled from "@emotion/styled/base";
import { Box, Card, FlexBox, Text } from '@codecademy/gamut';
import { pxRem, theme } from '@codecademy/gamut-styles';
import React, { useMemo } from 'react';
import { ProLabel } from '..';
import { Footer } from './Footer/index';
import { Image } from './Image/index';
import { Subtitle } from './Subtitle';
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
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DdXJyaWN1bHVtQ2FyZC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEVrQyIsImZpbGUiOiIuLi8uLi9zcmMvQ3VycmljdWx1bUNhcmQvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQm94LFxuICBDYXJkLFxuICBDYXJkUHJvcHMsXG4gIEZsZXhCb3gsXG4gIEhlYWRpbmdUYWdzLFxuICBUZXh0LFxufSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBweFJlbSwgdGhlbWUgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8gfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IFByb0xhYmVsIH0gZnJvbSAnLi4nO1xuaW1wb3J0IHsgVGFnQ29sb3IgfSBmcm9tICcuL0JvdHRvbVRhZy9pbmRleCc7XG5pbXBvcnQgeyBGb290ZXIgfSBmcm9tICcuL0Zvb3Rlci9pbmRleCc7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gJy4vSW1hZ2UvaW5kZXgnO1xuaW1wb3J0IHsgU3VidGl0bGUsIFN1YnRpdGxlUHJvcHMgfSBmcm9tICcuL1N1YnRpdGxlJztcblxuZXhwb3J0IHR5cGUgUHJvZ3Jlc3NTdGF0ZSA9ICdpblByb2dyZXNzJyB8ICdjb21wbGV0ZWQnO1xuXG5leHBvcnQgdHlwZSBGb290ZXJUZXh0VmFyaWFudFR5cGUgPSAnZW5yb2xsZWQnIHwgJ2luUHJvZ3Jlc3MnO1xuXG5jb25zdCBjYXJkSGVpZ2h0ID0gMTgwO1xuXG5jb25zdCBjYXJkU3R5bGVzID0ge1xuICBpblByb2dyZXNzOiAneWVsbG93JyxcbiAgY29tcGxldGVkOiAnbmF2eScsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBDdXJyaWN1bHVtQ2FyZFByb3BzID0gU3VidGl0bGVQcm9wcyAmIHtcbiAgYmV0YT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBEaXNwbGF5cyB0aGUgY3VycmljdWx1bSB0eXBlIGFib3ZlIHRoZSB0aXRsZVxuICAgKi9cbiAgdGV4dDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBoZWFkaW5nTGV2ZWw/OiBIZWFkaW5nVGFncztcbiAgaW1hZ2U/OiBzdHJpbmc7XG4gIGlzRnVsbFNpemU/OiBib29sZWFuO1xuICBpc1N0YXRpY1NpemU/OiBib29sZWFuO1xuICBwcm9ncmVzc1N0YXRlPzogUHJvZ3Jlc3NTdGF0ZTtcbiAgc2hvd1Byb0xvZ28/OiBib29sZWFuO1xuICB0YWc/OiBzdHJpbmc7XG4gIHRhZ0NvbG9yPzogVGFnQ29sb3I7XG4gIHNob3dBbHRTdWJ0aXRsZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBDaGFuZ2VzIEluIFByb2dyZXNzIGNhcmQgZm9vdGVyIHRleHQgZnJvbSBcIkVucm9sbGVkLi4uXCIgdG8gXCJJbiBQcm9ncmVzcy4uLlwiXG4gICAqL1xuICBmb290ZXJUZXh0VmFyaWFudD86IEZvb3RlclRleHRWYXJpYW50VHlwZTtcbiAgLyoqXG4gICAqIG9wdGlvbmFsIHRleHQgdG8gYmUgZGlzcGxheWVkIGJlbG93IGNhcmQgc3VidGl0bGVcbiAgICovXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAvKipcbiAgICogYWxsb3dzIGRlc2NyaXB0aW9uIHRvIGJlIHNob3duIGluIGNhcmQgYm9keS5cbiAgICovXG4gIHNob3dEZXNjcmlwdGlvbj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBjYXJlZXIgcGF0aCBjYXJkcyBhcmUgZGlzcGxheWVkIHdpdGggYSB2YXJpYW50IHN0eWxlIC8gZGVjb3JhdGl2ZSBlbGVtZW50XG4gICAqL1xuICBzaG93Q2FyZWVyUGF0aFZhcmlhbnQ/OiBib29sZWFuO1xuICAvKipcbiAgICogZGlzcGxheXMgaW5uZXIgY29udGVudCB3aXRoIGEgaG9yaXpvbnRhbCBvcmllbnRhdGlvblxuICAgKi9cbiAgaG9yaXpvbnRhbE9yaWVudGF0aW9uPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogY3VzdG9tIG1pbmltdW0gaGVpZ2h0IGZvciBjdXJyaWN1bHVtIGNhcmQgaW4gcGl4ZWxzXG4gICAqL1xuICBtaW5IZWlnaHQ/OiBDYXJkUHJvcHNbJ21pbkhlaWdodCddO1xuICAvKipcbiAgICogY3VzdG9tIG1pbmltdW0gd2lkdGggZm9yIGN1cnJpY3VsdW0gY2FyZCBpbiBwaXhlbHNcbiAgICovXG4gIG1pbldpZHRoPzogQ2FyZFByb3BzWydtaW5XaWR0aCddO1xufTtcblxuY29uc3QgTGluZURlY29yYXRpb24gPSBzdHlsZWQoQm94KWBcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkXG4gICAgJHsoeyBpblByb2dyZXNzIH06IHsgaW5Qcm9ncmVzcz86IGJvb2xlYW4gfSkgPT5cbiAgICAgIGluUHJvZ3Jlc3MgPyB0aGVtZS5jb2xvcnMubmF2eSA6IHRoZW1lLmNvbG9yc1snbmF2eS0yMDAnXX07XG5gO1xuXG5leHBvcnQgY29uc3QgQ3VycmljdWx1bUNhcmQ6IFJlYWN0LkZDPEN1cnJpY3VsdW1DYXJkUHJvcHM+ID0gKHtcbiAgYmV0YSxcbiAgZGlmZmljdWx0eSxcbiAgZGVzY3JpcHRpb24sXG4gIGhlYWRpbmdMZXZlbCA9ICdoMycsXG4gIGltYWdlLFxuICBpc0Z1bGxTaXplID0gZmFsc2UsXG4gIGlzU3RhdGljU2l6ZSA9IGZhbHNlLFxuICBwcm9ncmVzc1N0YXRlLFxuICBzY29wZSxcbiAgc2hvd1Byb0xvZ28sXG4gIHRhZyxcbiAgdGFnQ29sb3IsXG4gIHRleHQsXG4gIHRpdGxlLFxuICBzaG93Q2FyZWVyUGF0aFZhcmlhbnQsXG4gIHNob3dBbHRTdWJ0aXRsZSA9IGZhbHNlLFxuICBmb290ZXJUZXh0VmFyaWFudCA9ICdlbnJvbGxlZCcsXG4gIHNob3dEZXNjcmlwdGlvbixcbiAgZGlmZmljdWx0eVZhcmlhbnQsXG4gIGhvcml6b250YWxPcmllbnRhdGlvbixcbiAgbWluSGVpZ2h0LFxuICBtaW5XaWR0aCxcbn0pID0+IHtcbiAgY29uc3QgYm94VmFyaWFudCA9IHByb2dyZXNzU3RhdGUgJiYgY2FyZFN0eWxlc1twcm9ncmVzc1N0YXRlXTtcbiAgY29uc3QgbW9kZSA9IHByb2dyZXNzU3RhdGUgPT09ICdjb21wbGV0ZWQnID8gJ2RhcmsnIDogJ2xpZ2h0JztcblxuICBjb25zdCBpc0NhcmVlclBhdGhWYXJpYW50ID1cbiAgICB0ZXh0LnRvTG93ZXJDYXNlKCkgPT09ICdjYXJlZXIgcGF0aCcgJiYgc2hvd0NhcmVlclBhdGhWYXJpYW50O1xuXG4gIGNvbnN0IG1pbmltdW1IZWlnaHQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAobWluSGVpZ2h0KSByZXR1cm4gbWluSGVpZ2h0O1xuICAgIHJldHVybiBpc1N0YXRpY1NpemVcbiAgICAgID8gcHhSZW0oMjg1KVxuICAgICAgOiBpc0Z1bGxTaXplXG4gICAgICA/IHB4UmVtKGNhcmRIZWlnaHQgKiAyICsgMzIpXG4gICAgICA6IHB4UmVtKGNhcmRIZWlnaHQpO1xuICB9LCBbaXNGdWxsU2l6ZSwgaXNTdGF0aWNTaXplLCBtaW5IZWlnaHRdKTtcblxuICByZXR1cm4gKFxuICAgIDxDYXJkXG4gICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICBmbGV4RGlyZWN0aW9uPXt7XG4gICAgICAgIF86ICdjb2x1bW4nLFxuICAgICAgICB4czogaG9yaXpvbnRhbE9yaWVudGF0aW9uID8gJ3JvdycgOiAnY29sdW1uJyxcbiAgICAgIH19XG4gICAgICBtaW5IZWlnaHQ9e21pbmltdW1IZWlnaHR9XG4gICAgICBtaW5XaWR0aD17bWluV2lkdGh9XG4gICAgICB2YXJpYW50PXtib3hWYXJpYW50ID8/ICd3aGl0ZSd9XG4gICAgICBzaGFkb3c9XCJtZWRpdW1cIlxuICAgICAgcG9zaXRpb249XCJyZWxhdGl2ZVwiXG4gICAgPlxuICAgICAgPEJveFxuICAgICAgICBtYXhXaWR0aD17aG9yaXpvbnRhbE9yaWVudGF0aW9uID8gNDE4IDogJ25vbmUnfVxuICAgICAgICBwcj17eyBfOiAwLCB4czogaG9yaXpvbnRhbE9yaWVudGF0aW9uID8gNDAgOiAwIH19XG4gICAgICA+XG4gICAgICAgIDxUZXh0XG4gICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICAgIGZvbnRTaXplPXsxNH1cbiAgICAgICAgICBtYj17MTJ9XG4gICAgICAgICAgZm9udEZhbWlseT1cImFjY2VudFwiXG4gICAgICAgICAgdGV4dFRyYW5zZm9ybT1cImNhcGl0YWxpemVcIlxuICAgICAgICA+XG4gICAgICAgICAge3Nob3dQcm9Mb2dvICYmIDxQcm9MYWJlbCBhbGlnblNlbGY9XCJjZW50ZXJcIiBtcj17OH0gbW9kZT17bW9kZX0gLz59XG4gICAgICAgICAge3RleHR9XG4gICAgICAgIDwvVGV4dD5cbiAgICAgICAgPFRleHQgYXM9e2hlYWRpbmdMZXZlbH0gbWI9ezR9IGZvbnRTaXplPXsyMH0+XG4gICAgICAgICAge3RpdGxlfVxuICAgICAgICA8L1RleHQ+XG4gICAgICAgIHshcHJvZ3Jlc3NTdGF0ZSAmJiAoXG4gICAgICAgICAgPEZsZXhCb3ggZmxleFdyYXA9XCJ3cmFwXCIgYWxpZ25JdGVtcz1cImNlbnRlclwiPlxuICAgICAgICAgICAgPFN1YnRpdGxlXG4gICAgICAgICAgICAgIHNjb3BlPXtzY29wZX1cbiAgICAgICAgICAgICAgZGlmZmljdWx0eT17ZGlmZmljdWx0eX1cbiAgICAgICAgICAgICAgc2hvd0FsdFN1YnRpdGxlPXtzaG93QWx0U3VidGl0bGV9XG4gICAgICAgICAgICAgIGRpZmZpY3VsdHlWYXJpYW50PXtkaWZmaWN1bHR5VmFyaWFudH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9GbGV4Qm94PlxuICAgICAgICApfVxuICAgICAgICB7aXNDYXJlZXJQYXRoVmFyaWFudCAmJiAoXG4gICAgICAgICAgPExpbmVEZWNvcmF0aW9uIGluUHJvZ3Jlc3M9e3Byb2dyZXNzU3RhdGUgPT09ICdpblByb2dyZXNzJ30gbXk9ezh9IC8+XG4gICAgICAgICl9XG4gICAgICAgIHsoaXNDYXJlZXJQYXRoVmFyaWFudCB8fCBzaG93RGVzY3JpcHRpb24pICYmIChcbiAgICAgICAgICA8VGV4dCBwdD17OH0gcGI9ezE2fSBmb250U2l6ZT17MTR9PlxuICAgICAgICAgICAge2Rlc2NyaXB0aW9ufVxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgKX1cbiAgICAgIDwvQm94PlxuICAgICAge2lzRnVsbFNpemUgJiYgaW1hZ2UgJiYgKFxuICAgICAgICA8RmxleEJveFxuICAgICAgICAgIG15PVwiYXV0b1wiXG4gICAgICAgICAgbWw9XCJhdXRvXCJcbiAgICAgICAgICBtcj17aG9yaXpvbnRhbE9yaWVudGF0aW9uID8gMCA6ICdhdXRvJ31cbiAgICAgICAgICBwdD17MTZ9XG4gICAgICAgICAgcGI9e2lzQ2FyZWVyUGF0aFZhcmlhbnQgPyAzMiA6IDB9XG4gICAgICAgICAgcHI9e3sgXzogMCwgeHM6IGhvcml6b250YWxPcmllbnRhdGlvbiA/IDI0IDogMCB9fVxuICAgICAgICA+XG4gICAgICAgICAgPEltYWdlXG4gICAgICAgICAgICBpc1NtYWxsPXtpc0NhcmVlclBhdGhWYXJpYW50fVxuICAgICAgICAgICAgaW1hZ2U9e2ltYWdlfVxuICAgICAgICAgICAgcHJvZ3Jlc3NTdGF0ZT17cHJvZ3Jlc3NTdGF0ZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0ZsZXhCb3g+XG4gICAgICApfVxuICAgICAgPEZvb3RlclxuICAgICAgICBiZXRhPXtiZXRhfVxuICAgICAgICBwcm9ncmVzc1N0YXRlPXtwcm9ncmVzc1N0YXRlfVxuICAgICAgICB0YWc9e3RhZ31cbiAgICAgICAgdGFnQ29sb3I9e3RhZ0NvbG9yfVxuICAgICAgICBmb290ZXJUZXh0VmFyaWFudD17Zm9vdGVyVGV4dFZhcmlhbnR9XG4gICAgICAvPlxuICAgIDwvQ2FyZD5cbiAgKTtcbn07XG4iXX0= */"));

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
      showProLogo = _ref2.showProLogo,
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
      minWidth = _ref2.minWidth;
  var boxVariant = progressState && cardStyles[progressState];
  var mode = progressState === 'completed' ? 'dark' : 'light';
  var isCareerPathVariant = text.toLowerCase() === 'career path' && showCareerPathVariant;
  var minimumHeight = useMemo(function () {
    if (minHeight) return minHeight;
    return isStaticSize ? pxRem(285) : isFullSize ? pxRem(cardHeight * 2 + 32) : pxRem(cardHeight);
  }, [isFullSize, isStaticSize, minHeight]);
  return /*#__PURE__*/React.createElement(Card, {
    display: "flex",
    flexDirection: {
      _: 'column',
      xs: horizontalOrientation ? 'row' : 'column'
    },
    minHeight: minimumHeight,
    minWidth: minWidth,
    variant: boxVariant !== null && boxVariant !== void 0 ? boxVariant : 'white',
    shadow: "medium",
    position: "relative"
  }, /*#__PURE__*/React.createElement(Box, {
    maxWidth: horizontalOrientation ? 418 : 'none',
    pr: {
      _: 0,
      xs: horizontalOrientation ? 40 : 0
    }
  }, /*#__PURE__*/React.createElement(Text, {
    display: "flex",
    fontSize: 14,
    mb: 12,
    fontFamily: "accent",
    textTransform: "capitalize"
  }, showProLogo && /*#__PURE__*/React.createElement(ProLabel, {
    alignSelf: "center",
    mr: 8,
    mode: mode
  }), text), /*#__PURE__*/React.createElement(Text, {
    as: headingLevel,
    mb: 4,
    fontSize: 20
  }, title), !progressState && /*#__PURE__*/React.createElement(FlexBox, {
    flexWrap: "wrap",
    alignItems: "center"
  }, /*#__PURE__*/React.createElement(Subtitle, {
    scope: scope,
    difficulty: difficulty,
    showAltSubtitle: showAltSubtitle,
    difficultyVariant: difficultyVariant
  })), isCareerPathVariant && /*#__PURE__*/React.createElement(LineDecoration, {
    inProgress: progressState === 'inProgress',
    my: 8
  }), (isCareerPathVariant || showDescription) && /*#__PURE__*/React.createElement(Text, {
    pt: 8,
    pb: 16,
    fontSize: 14
  }, description)), isFullSize && image && /*#__PURE__*/React.createElement(FlexBox, {
    my: "auto",
    ml: "auto",
    mr: horizontalOrientation ? 0 : 'auto',
    pt: 16,
    pb: isCareerPathVariant ? 32 : 0,
    pr: {
      _: 0,
      xs: horizontalOrientation ? 24 : 0
    }
  }, /*#__PURE__*/React.createElement(Image, {
    isSmall: isCareerPathVariant,
    image: image,
    progressState: progressState
  })), /*#__PURE__*/React.createElement(Footer, {
    beta: beta,
    progressState: progressState,
    tag: tag,
    tagColor: tagColor,
    footerTextVariant: footerTextVariant
  }));
};