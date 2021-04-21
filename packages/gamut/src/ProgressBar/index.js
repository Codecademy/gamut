"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.ProgressBar = void 0;
var gamut_patterns_1 = require("@codecademy/gamut-patterns");
var gamut_styles_1 = require("@codecademy/gamut-styles");
var styled_1 = require("@emotion/styled");
var react_1 = require("react");
var progressBarSizeVariants = gamut_styles_1.variant({
    "default": 'small',
    prop: 'size',
    variants: {
        small: {
            height: '6px',
            borderRadius: '3px'
        },
        medium: {
            height: '8px',
            borderRadius: '80px'
        },
        large: {
            height: '36px',
            borderRadius: '18px'
        }
    }
});
var progressBarBackgroundVariants = gamut_styles_1.variant({
    "default": 'blue',
    variants: {
        blue: {
            backgroundColor: 'navy'
        },
        yellow: {
            backgroundColor: "gray-100"
        },
        dark: {
            textColor: 'white'
        },
        light: {
            textColor: 'navy'
        }
    }
});
var progressBarBorderVariants = gamut_styles_1.variant({
    "default": 'basic',
    prop: 'border',
    variants: {
        basic: {
            borderWidth: '0'
        },
        bordered: {
            borderWidth: '1px',
            borderStyle: 'solid'
        }
    }
});
var progressBarForegroundVariants = gamut_styles_1.variant({
    "default": 'blue',
    variants: {
        blue: {
            backgroundColor: 'blue',
            textColor: 'white'
        },
        yellow: {
            backgroundColor: "yellow",
            textColor: "black"
        },
        light: {
            backgroundColor: 'navy',
            textColor: 'navy'
        },
        dark: {
            backgroundColor: 'white',
            textColor: 'white'
        }
    }
});
var ProgressBarWrapper = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  overflow: hidden;\n  position: relative;\n  ", ";\n  ", ";\n  ", ";\n"], ["\n  overflow: hidden;\n  position: relative;\n  ", ";\n  ", ";\n  ", ";\n"])), progressBarBackgroundVariants, progressBarSizeVariants, progressBarBorderVariants);
var Bar = styled_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  align-items: center;\n  display: flex;\n  height: 100%;\n  transition: width 0.5s;\n  position: relative;\n  border-radius: inherit;\n  ", ";\n"], ["\n  align-items: center;\n  display: flex;\n  height: 100%;\n  transition: width 0.5s;\n  position: relative;\n  border-radius: inherit;\n  ", ";\n"])), progressBarForegroundVariants);
var DisplayedPercent = styled_1["default"].span(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-weight: bold;\n  padding: 0.5rem;\n  text-align: right;\n  width: 100%;\n"], ["\n  font-weight: bold;\n  padding: 0.5rem;\n  text-align: right;\n  width: 100%;\n"])));
var ProgressBar = function (_a) {
    var _b = _a.minimumPercent, minimumPercent = _b === void 0 ? 0 : _b, percent = _a.percent, pattern = _a.pattern, bordered = _a.bordered, _c = _a.size, size = _c === void 0 ? 'small' : _c, _d = _a.variant, variant = _d === void 0 ? 'blue' : _d;
    var PatternComponent = pattern ? gamut_patterns_1.getPattern(pattern) : null;
    return (<ProgressBarWrapper aria-label={"Progress: " + percent + "%"} aria-live="polite" role="figure" border={bordered ? 'bordered' : 'basic'} size={size} variant={variant}>
      {pattern && (<PatternComponent width="100%" position="absolute" zIndex={0}/>)}
      <Bar variant={variant} data-testid="progress-bar-bar" style={{
            width: Math.max(minimumPercent, percent) + "%"
        }}>
        {size === 'large' && <DisplayedPercent>{percent}%</DisplayedPercent>}
      </Bar>
    </ProgressBarWrapper>);
};
exports.ProgressBar = ProgressBar;
var templateObject_1, templateObject_2, templateObject_3;
