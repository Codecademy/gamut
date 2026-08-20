import {
  ThemeContext,
  getRegisteredStyles,
  insertStyles,
  registerStyles,
  serializeStyles,
  useInsertionEffectAlwaysWithSyncFallback,
  withEmotionCache,
} from './chunk-OQDD5VNB.js';
import {
  init_emotion_is_prop_valid_esm,
  isPropValid,
} from './chunk-2SWAUOI7.js';
import { _extends } from './chunk-VMQKBCTX.js';
import { require_react } from './chunk-QBXGYTN6.js';
import { __toESM } from './chunk-4B2QHNJT.js';

// ../../node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.development.esm.js
var React = __toESM(require_react());
init_emotion_is_prop_valid_esm();
var isDevelopment = true;
var testOmitPropsOnStringTag = isPropValid;
var testOmitPropsOnComponent = function testOmitPropsOnComponent2(key) {
  return key !== 'theme';
};
var getDefaultShouldForwardProp = function getDefaultShouldForwardProp2(tag) {
  return typeof tag === 'string' && // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    tag.charCodeAt(0) > 96
    ? testOmitPropsOnStringTag
    : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps2(
  tag,
  options,
  isReal
) {
  var shouldForwardProp;
  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp =
      tag.__emotion_forwardProp && optionsShouldForwardProp
        ? function (propName) {
            return (
              tag.__emotion_forwardProp(propName) &&
              optionsShouldForwardProp(propName)
            );
          }
        : optionsShouldForwardProp;
  }
  if (typeof shouldForwardProp !== 'function' && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }
  return shouldForwardProp;
};
var ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
var Insertion = function Insertion2(_ref) {
  var cache = _ref.cache,
    serialized = _ref.serialized,
    isStringTag = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag);
  useInsertionEffectAlwaysWithSyncFallback(function () {
    return insertStyles(cache, serialized, isStringTag);
  });
  return null;
};
var createStyled = function createStyled2(tag, options) {
  {
    if (tag === void 0) {
      throw new Error(
        'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
      );
    }
  }
  var isReal = tag.__emotion_real === tag;
  var baseTag = (isReal && tag.__emotion_base) || tag;
  var identifierName;
  var targetClassName;
  if (options !== void 0) {
    identifierName = options.label;
    targetClassName = options.target;
  }
  var shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp =
    shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp('as');
  return function () {
    var args = arguments;
    var styles =
      isReal && tag.__emotion_styles !== void 0
        ? tag.__emotion_styles.slice(0)
        : [];
    if (identifierName !== void 0) {
      styles.push('label:' + identifierName + ';');
    }
    if (args[0] == null || args[0].raw === void 0) {
      styles.push.apply(styles, args);
    } else {
      var templateStringsArr = args[0];
      if (templateStringsArr[0] === void 0) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles.push(templateStringsArr[0]);
      var len = args.length;
      var i = 1;
      for (; i < len; i++) {
        if (templateStringsArr[i] === void 0) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }
        styles.push(args[i], templateStringsArr[i]);
      }
    }
    var Styled = withEmotionCache(function (props, cache, ref) {
      var FinalTag = (shouldUseAs && props.as) || baseTag;
      var className = '';
      var classInterpolations = [];
      var mergedProps = props;
      if (props.theme == null) {
        mergedProps = {};
        for (var key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = React.useContext(ThemeContext);
      }
      if (typeof props.className === 'string') {
        className = getRegisteredStyles(
          cache.registered,
          classInterpolations,
          props.className
        );
      } else if (props.className != null) {
        className = props.className + ' ';
      }
      var serialized = serializeStyles(
        styles.concat(classInterpolations),
        cache.registered,
        mergedProps
      );
      className += cache.key + '-' + serialized.name;
      if (targetClassName !== void 0) {
        className += ' ' + targetClassName;
      }
      var finalShouldForwardProp =
        shouldUseAs && shouldForwardProp === void 0
          ? getDefaultShouldForwardProp(FinalTag)
          : defaultShouldForwardProp;
      var newProps = {};
      for (var _key in props) {
        if (shouldUseAs && _key === 'as') continue;
        if (finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }
      newProps.className = className;
      if (ref) {
        newProps.ref = ref;
      }
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(Insertion, {
          cache,
          serialized,
          isStringTag: typeof FinalTag === 'string',
        }),
        React.createElement(FinalTag, newProps)
      );
    });
    Styled.displayName =
      identifierName !== void 0
        ? identifierName
        : 'Styled(' +
          (typeof baseTag === 'string'
            ? baseTag
            : baseTag.displayName || baseTag.name || 'Component') +
          ')';
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, 'toString', {
      value: function value() {
        if (targetClassName === void 0 && isDevelopment) {
          return 'NO_COMPONENT_SELECTOR';
        }
        return '.' + targetClassName;
      },
    });
    Styled.withComponent = function (nextTag, nextOptions) {
      var newStyled = createStyled2(
        nextTag,
        _extends({}, options, nextOptions, {
          shouldForwardProp: composeShouldForwardProps(
            Styled,
            nextOptions,
            true
          ),
        })
      );
      return newStyled.apply(void 0, styles);
    };
    return Styled;
  };
};

export { createStyled };
//# sourceMappingURL=chunk-HK3FFENB.js.map
