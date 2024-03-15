import _styled from "@emotion/styled/base";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { Box, IconButton, Markdown, TextButton } from '@codecademy/gamut';
import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { Background, system } from '@codecademy/gamut-styles';
import React, { useMemo } from 'react';
var bannerVariants = ['navy', 'yellow'];

var isAllowedVariant = function isAllowedVariant(variant) {
  return bannerVariants.includes(variant);
};

var BannerContainer = /*#__PURE__*/_styled(Background, {
  target: "e1aspl8w1",
  label: "BannerContainer"
})(system.css({
  width: '100%',
  p: 4,
  display: 'grid',
  gridTemplateColumns: '2rem minmax(0, 1fr) 2rem',
  gridTemplateAreas: "'empty content close'",
  columnGap: 8,
  alignItems: 'center',
  textAlign: 'center'
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9CYW5uZXIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdCd0IiLCJmaWxlIjoiLi4vLi4vc3JjL0Jhbm5lci9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3gsIEljb25CdXR0b24sIE1hcmtkb3duLCBUZXh0QnV0dG9uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgTWluaURlbGV0ZUljb24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgeyBCYWNrZ3JvdW5kLCBCYWNrZ3JvdW5kUHJvcHMsIHN5c3RlbSB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IHR5cGUgQmFubmVyVmFyaWFudCA9IHR5cGVvZiBiYW5uZXJWYXJpYW50c1tudW1iZXJdO1xuY29uc3QgYmFubmVyVmFyaWFudHMgPSBbJ25hdnknLCAneWVsbG93J10gYXMgY29uc3Q7XG5cbmNvbnN0IGlzQWxsb3dlZFZhcmlhbnQgPSAoXG4gIHZhcmlhbnQ6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGxcbik6IHZhcmlhbnQgaXMgQmFubmVyVmFyaWFudCA9PlxuICBiYW5uZXJWYXJpYW50cy5pbmNsdWRlcyh2YXJpYW50IGFzIEJhbm5lclZhcmlhbnQpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJhbm5lclByb3BzIGV4dGVuZHMgT21pdDxCYWNrZ3JvdW5kUHJvcHMsICdiZyc+IHtcbiAgY2hpbGRyZW46IHN0cmluZztcbiAgLyoqIFZpc3VhbCB2YXJpYXRpb24gZm9yIGJhbm5lcnMsIGRlZmF1bHRzIHRvIG5hdnkgKi9cbiAgdmFyaWFudD86IEJhbm5lclZhcmlhbnQgfCBudWxsO1xuICAvKiogIENhbGxiYWNrIGNhbGxlZCB3aGVuIHRoZSB1c2VyIGNsb3NlcyB0aGUgYmFubmVyLiAqL1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICAvKiogQ2FsbCB0byBhY3Rpb24gY2xpY2sgY2FsbGJhY2sgKi9cbiAgb25DdGFDbGljaz86ICgpID0+IHZvaWQ7XG59XG5cbmNvbnN0IEJhbm5lckNvbnRhaW5lciA9IHN0eWxlZChCYWNrZ3JvdW5kKShcbiAgc3lzdGVtLmNzcyh7XG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBwOiA0LFxuICAgIGRpc3BsYXk6ICdncmlkJyxcbiAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiAnMnJlbSBtaW5tYXgoMCwgMWZyKSAycmVtJyxcbiAgICBncmlkVGVtcGxhdGVBcmVhczogXCInZW1wdHkgY29udGVudCBjbG9zZSdcIixcbiAgICBjb2x1bW5HYXA6IDgsXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgfSlcbik7XG5cbmNvbnN0IEJhbm5lck1hcmtkb3duID0gc3R5bGVkKE1hcmtkb3duKShzeXN0ZW0uY3NzKHsgZm9udFNpemU6ICdpbmhlcml0JyB9KSk7XG5cbmNvbnN0IGJpbmRCYW5uZXJBbmNob3IgPSAob25DdGFDbGljaz86IEJhbm5lclByb3BzWydvbkN0YUNsaWNrJ10pID0+ICh7XG4gIGFsbG93ZWRBdHRyaWJ1dGVzOiBbJ2hyZWYnLCAndGFyZ2V0J10sXG4gIGNvbXBvbmVudDogVGV4dEJ1dHRvbixcbiAgcHJvY2Vzc05vZGU6IChub2RlOiB1bmtub3duLCBwcm9wczogeyBvbkNsaWNrPzogKCkgPT4gdm9pZCB9KSA9PiAoXG4gICAgPFRleHRCdXR0b25cbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgb25DdGFDbGljaz8uKCk7XG4gICAgICAgIHByb3BzPy5vbkNsaWNrPy4oKTtcbiAgICAgIH19XG4gICAgICBteD17NH1cbiAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICB0YXJnZXQ9XCJfQkxBTktcIlxuICAgIC8+XG4gICksXG59KTtcblxuZXhwb3J0IGNvbnN0IEJhbm5lcjogUmVhY3QuRkM8QmFubmVyUHJvcHM+ID0gKHtcbiAgY2hpbGRyZW4sXG4gIHZhcmlhbnQ6IHJhd1ZhcmlhbnQsXG4gIG9uQ3RhQ2xpY2ssXG4gIG9uQ2xvc2UsXG4gIC4uLnJlc3Rcbn06IEJhbm5lclByb3BzKSA9PiB7XG4gIGNvbnN0IG92ZXJyaWRlcyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGE6IGJpbmRCYW5uZXJBbmNob3Iob25DdGFDbGljayksXG4gICAgfSksXG4gICAgW29uQ3RhQ2xpY2tdXG4gICk7XG5cbiAgLy8gQ29udGVudGZ1bCBpcyB1bmFibGUgdG8gcHJvZ3JhbW1hdGljYWxseSBjb21tdW5pY2F0ZSB3aGF0IHZhbHVlcyBpdCBkb2VzL2RvZXNuJ3QgYWxsb3cgaW4gdGhlc2Uga2luZHMgb2YgZmllbGRzLFxuICAvLyB3aGljaCBtYWtlcyBpdCBkaWZmaWN1bHQgZm9yIHVzIHRvIGVuc3VyZSB0aGUgQ29udGVudGZ1bCBjb25maWd1cmF0aW9uIGhhc24ndCBkaXZlcmdlZCBmcm9tIEdhbXV0IHJlc3RyaWN0aW9ucy5cbiAgY29uc3QgdmFyaWFudCA9IGlzQWxsb3dlZFZhcmlhbnQocmF3VmFyaWFudCkgPyByYXdWYXJpYW50IDogJ25hdnknO1xuXG4gIHJldHVybiAoXG4gICAgPEJhbm5lckNvbnRhaW5lciB7Li4ucmVzdH0gYmc9e3ZhcmlhbnR9PlxuICAgICAgPEJveCBncmlkQXJlYT1cImNvbnRlbnRcIiBmb250U2l6ZT1cImluaGVyaXRcIj5cbiAgICAgICAgPEJhbm5lck1hcmtkb3duXG4gICAgICAgICAgb3ZlcnJpZGVzPXtvdmVycmlkZXN9XG4gICAgICAgICAgdGV4dD17Y2hpbGRyZW59XG4gICAgICAgICAgc2tpcERlZmF1bHRPdmVycmlkZXM9e3sgYTogdHJ1ZSB9fVxuICAgICAgICAvPlxuICAgICAgPC9Cb3g+XG4gICAgICA8Qm94IGdyaWRBcmVhPVwiY2xvc2VcIj5cbiAgICAgICAgPEljb25CdXR0b25cbiAgICAgICAgICB2YXJpYW50PVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgIGFyaWEtbGFiZWw9XCJkaXNtaXNzXCJcbiAgICAgICAgICBpY29uPXtNaW5pRGVsZXRlSWNvbn1cbiAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAvPlxuICAgICAgPC9Cb3g+XG4gICAgPC9CYW5uZXJDb250YWluZXI+XG4gICk7XG59O1xuIl19 */");

var BannerMarkdown = /*#__PURE__*/_styled(Markdown, {
  target: "e1aspl8w0",
  label: "BannerMarkdown"
})(system.css({
  fontSize: 'inherit'
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9CYW5uZXIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFDdUIiLCJmaWxlIjoiLi4vLi4vc3JjL0Jhbm5lci9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3gsIEljb25CdXR0b24sIE1hcmtkb3duLCBUZXh0QnV0dG9uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgTWluaURlbGV0ZUljb24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgeyBCYWNrZ3JvdW5kLCBCYWNrZ3JvdW5kUHJvcHMsIHN5c3RlbSB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlTWVtbyB9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IHR5cGUgQmFubmVyVmFyaWFudCA9IHR5cGVvZiBiYW5uZXJWYXJpYW50c1tudW1iZXJdO1xuY29uc3QgYmFubmVyVmFyaWFudHMgPSBbJ25hdnknLCAneWVsbG93J10gYXMgY29uc3Q7XG5cbmNvbnN0IGlzQWxsb3dlZFZhcmlhbnQgPSAoXG4gIHZhcmlhbnQ6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGxcbik6IHZhcmlhbnQgaXMgQmFubmVyVmFyaWFudCA9PlxuICBiYW5uZXJWYXJpYW50cy5pbmNsdWRlcyh2YXJpYW50IGFzIEJhbm5lclZhcmlhbnQpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJhbm5lclByb3BzIGV4dGVuZHMgT21pdDxCYWNrZ3JvdW5kUHJvcHMsICdiZyc+IHtcbiAgY2hpbGRyZW46IHN0cmluZztcbiAgLyoqIFZpc3VhbCB2YXJpYXRpb24gZm9yIGJhbm5lcnMsIGRlZmF1bHRzIHRvIG5hdnkgKi9cbiAgdmFyaWFudD86IEJhbm5lclZhcmlhbnQgfCBudWxsO1xuICAvKiogIENhbGxiYWNrIGNhbGxlZCB3aGVuIHRoZSB1c2VyIGNsb3NlcyB0aGUgYmFubmVyLiAqL1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICAvKiogQ2FsbCB0byBhY3Rpb24gY2xpY2sgY2FsbGJhY2sgKi9cbiAgb25DdGFDbGljaz86ICgpID0+IHZvaWQ7XG59XG5cbmNvbnN0IEJhbm5lckNvbnRhaW5lciA9IHN0eWxlZChCYWNrZ3JvdW5kKShcbiAgc3lzdGVtLmNzcyh7XG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBwOiA0LFxuICAgIGRpc3BsYXk6ICdncmlkJyxcbiAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiAnMnJlbSBtaW5tYXgoMCwgMWZyKSAycmVtJyxcbiAgICBncmlkVGVtcGxhdGVBcmVhczogXCInZW1wdHkgY29udGVudCBjbG9zZSdcIixcbiAgICBjb2x1bW5HYXA6IDgsXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgfSlcbik7XG5cbmNvbnN0IEJhbm5lck1hcmtkb3duID0gc3R5bGVkKE1hcmtkb3duKShzeXN0ZW0uY3NzKHsgZm9udFNpemU6ICdpbmhlcml0JyB9KSk7XG5cbmNvbnN0IGJpbmRCYW5uZXJBbmNob3IgPSAob25DdGFDbGljaz86IEJhbm5lclByb3BzWydvbkN0YUNsaWNrJ10pID0+ICh7XG4gIGFsbG93ZWRBdHRyaWJ1dGVzOiBbJ2hyZWYnLCAndGFyZ2V0J10sXG4gIGNvbXBvbmVudDogVGV4dEJ1dHRvbixcbiAgcHJvY2Vzc05vZGU6IChub2RlOiB1bmtub3duLCBwcm9wczogeyBvbkNsaWNrPzogKCkgPT4gdm9pZCB9KSA9PiAoXG4gICAgPFRleHRCdXR0b25cbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgb25DdGFDbGljaz8uKCk7XG4gICAgICAgIHByb3BzPy5vbkNsaWNrPy4oKTtcbiAgICAgIH19XG4gICAgICBteD17NH1cbiAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICB0YXJnZXQ9XCJfQkxBTktcIlxuICAgIC8+XG4gICksXG59KTtcblxuZXhwb3J0IGNvbnN0IEJhbm5lcjogUmVhY3QuRkM8QmFubmVyUHJvcHM+ID0gKHtcbiAgY2hpbGRyZW4sXG4gIHZhcmlhbnQ6IHJhd1ZhcmlhbnQsXG4gIG9uQ3RhQ2xpY2ssXG4gIG9uQ2xvc2UsXG4gIC4uLnJlc3Rcbn06IEJhbm5lclByb3BzKSA9PiB7XG4gIGNvbnN0IG92ZXJyaWRlcyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGE6IGJpbmRCYW5uZXJBbmNob3Iob25DdGFDbGljayksXG4gICAgfSksXG4gICAgW29uQ3RhQ2xpY2tdXG4gICk7XG5cbiAgLy8gQ29udGVudGZ1bCBpcyB1bmFibGUgdG8gcHJvZ3JhbW1hdGljYWxseSBjb21tdW5pY2F0ZSB3aGF0IHZhbHVlcyBpdCBkb2VzL2RvZXNuJ3QgYWxsb3cgaW4gdGhlc2Uga2luZHMgb2YgZmllbGRzLFxuICAvLyB3aGljaCBtYWtlcyBpdCBkaWZmaWN1bHQgZm9yIHVzIHRvIGVuc3VyZSB0aGUgQ29udGVudGZ1bCBjb25maWd1cmF0aW9uIGhhc24ndCBkaXZlcmdlZCBmcm9tIEdhbXV0IHJlc3RyaWN0aW9ucy5cbiAgY29uc3QgdmFyaWFudCA9IGlzQWxsb3dlZFZhcmlhbnQocmF3VmFyaWFudCkgPyByYXdWYXJpYW50IDogJ25hdnknO1xuXG4gIHJldHVybiAoXG4gICAgPEJhbm5lckNvbnRhaW5lciB7Li4ucmVzdH0gYmc9e3ZhcmlhbnR9PlxuICAgICAgPEJveCBncmlkQXJlYT1cImNvbnRlbnRcIiBmb250U2l6ZT1cImluaGVyaXRcIj5cbiAgICAgICAgPEJhbm5lck1hcmtkb3duXG4gICAgICAgICAgb3ZlcnJpZGVzPXtvdmVycmlkZXN9XG4gICAgICAgICAgdGV4dD17Y2hpbGRyZW59XG4gICAgICAgICAgc2tpcERlZmF1bHRPdmVycmlkZXM9e3sgYTogdHJ1ZSB9fVxuICAgICAgICAvPlxuICAgICAgPC9Cb3g+XG4gICAgICA8Qm94IGdyaWRBcmVhPVwiY2xvc2VcIj5cbiAgICAgICAgPEljb25CdXR0b25cbiAgICAgICAgICB2YXJpYW50PVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgIGFyaWEtbGFiZWw9XCJkaXNtaXNzXCJcbiAgICAgICAgICBpY29uPXtNaW5pRGVsZXRlSWNvbn1cbiAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAvPlxuICAgICAgPC9Cb3g+XG4gICAgPC9CYW5uZXJDb250YWluZXI+XG4gICk7XG59O1xuIl19 */");

var bindBannerAnchor = function bindBannerAnchor(onCtaClick) {
  return {
    allowedAttributes: ['href', 'target'],
    component: TextButton,
    processNode: function processNode(node, props) {
      return /*#__PURE__*/React.createElement(TextButton, _extends({}, props, {
        onClick: function onClick() {
          var _props$onClick;

          onCtaClick === null || onCtaClick === void 0 ? void 0 : onCtaClick();
          props === null || props === void 0 ? void 0 : (_props$onClick = props.onClick) === null || _props$onClick === void 0 ? void 0 : _props$onClick.call(props);
        },
        mx: 4,
        size: "small",
        target: "_BLANK"
      }));
    }
  };
};

export var Banner = function Banner(_ref) {
  var children = _ref.children,
      rawVariant = _ref.variant,
      onCtaClick = _ref.onCtaClick,
      onClose = _ref.onClose,
      rest = _objectWithoutProperties(_ref, ["children", "variant", "onCtaClick", "onClose"]);

  var overrides = useMemo(function () {
    return {
      a: bindBannerAnchor(onCtaClick)
    };
  }, [onCtaClick]); // Contentful is unable to programmatically communicate what values it does/doesn't allow in these kinds of fields,
  // which makes it difficult for us to ensure the Contentful configuration hasn't diverged from Gamut restrictions.

  var variant = isAllowedVariant(rawVariant) ? rawVariant : 'navy';
  return /*#__PURE__*/React.createElement(BannerContainer, _extends({}, rest, {
    bg: variant
  }), /*#__PURE__*/React.createElement(Box, {
    gridArea: "content",
    fontSize: "inherit"
  }, /*#__PURE__*/React.createElement(BannerMarkdown, {
    overrides: overrides,
    text: children,
    skipDefaultOverrides: {
      a: true
    }
  })), /*#__PURE__*/React.createElement(Box, {
    gridArea: "close"
  }, /*#__PURE__*/React.createElement(IconButton, {
    variant: "secondary",
    size: "small",
    "aria-label": "dismiss",
    icon: MiniDeleteIcon,
    onClick: onClose
  })));
};