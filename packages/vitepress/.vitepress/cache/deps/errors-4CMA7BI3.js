import { ParseError, ParseErrorCode } from './chunk-A5G7GA7F.js';
import './chunk-4B2QHNJT.js';

// ../../node_modules/media-captions/dist/dev/errors.js
var ParseErrorBuilder = {
  _badVTTHeader() {
    return new ParseError({
      code: ParseErrorCode.BadSignature,
      reason: 'missing WEBVTT file header',
      line: 1,
    });
  },
  _badStartTimestamp(startTime, line) {
    return new ParseError({
      code: ParseErrorCode.BadTimestamp,
      reason: `cue start timestamp \`${startTime}\` is invalid on line ${line}`,
      line,
    });
  },
  _badEndTimestamp(endTime, line) {
    return new ParseError({
      code: ParseErrorCode.BadTimestamp,
      reason: `cue end timestamp \`${endTime}\` is invalid on line ${line}`,
      line,
    });
  },
  _badRangeTimestamp(startTime, endTime, line) {
    return new ParseError({
      code: ParseErrorCode.BadTimestamp,
      reason: `cue end timestamp \`${endTime}\` is greater than start \`${startTime}\` on line ${line}`,
      line,
    });
  },
  _badCueSetting(name, value, line) {
    return new ParseError({
      code: ParseErrorCode.BadSettingValue,
      reason: `invalid value for cue setting \`${name}\` on line ${line} (value: ${value})`,
      line,
    });
  },
  _unknownCueSetting(name, value, line) {
    return new ParseError({
      code: ParseErrorCode.UnknownSetting,
      reason: `unknown cue setting \`${name}\` on line ${line} (value: ${value})`,
      line,
    });
  },
  _badRegionSetting(name, value, line) {
    return new ParseError({
      code: ParseErrorCode.BadSettingValue,
      reason: `invalid value for region setting \`${name}\` on line ${line} (value: ${value})`,
      line,
    });
  },
  _unknownRegionSetting(name, value, line) {
    return new ParseError({
      code: ParseErrorCode.UnknownSetting,
      reason: `unknown region setting \`${name}\` on line ${line} (value: ${value})`,
      line,
    });
  },
  // SSA-specific errors
  _missingFormat(type, line) {
    return new ParseError({
      code: ParseErrorCode.BadFormat,
      reason: `format missing for \`${type}\` block on line ${line}`,
      line,
    });
  },
};
export { ParseErrorBuilder };
//# sourceMappingURL=errors-4CMA7BI3.js.map
