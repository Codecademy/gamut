import {
  COMMENT,
  DECLARATION,
  KEYFRAMES,
  MOZ,
  MS,
  RULESET,
  WEBKIT,
  alloc,
  charat,
  combine,
  compile,
  copy,
  dealloc,
  delimit,
  from,
  hash,
  indexof,
  match,
  middleware,
  next,
  peek,
  position,
  replace,
  serialize,
  slice,
  stringify,
  strlen,
  token,
} from './chunk-WF25XW2W.js';
import { init_emotion_memoize_esm } from './chunk-7KURRFS5.js';

// ../../node_modules/@emotion/sheet/dist/emotion-sheet.development.esm.js
var isDevelopment = true;
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
  return void 0;
}
function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute('nonce', options.nonce);
  }
  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}
var StyleSheet = (function () {
  function StyleSheet2(options) {
    var _this = this;
    this._insertTag = function (tag) {
      var before;
      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }
      _this.container.insertBefore(tag, before);
      _this.tags.push(tag);
    };
    this.isSpeedy = options.speedy === void 0 ? !isDevelopment : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce;
    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }
  var _proto = StyleSheet2.prototype;
  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };
  _proto.insert = function insert(rule) {
    if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }
    var tag = this.tags[this.tags.length - 1];
    {
      var isImportRule3 =
        rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
      if (isImportRule3 && this._alreadyInsertedOrderInsensitiveRule) {
        console.error(
          "You're attempting to insert the following rule:\n" +
            rule +
            '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.'
        );
      }
      this._alreadyInsertedOrderInsensitiveRule =
        this._alreadyInsertedOrderInsensitiveRule || !isImportRule3;
    }
    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if (
          !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(
            rule
          )
        ) {
          console.error(
            'There was a problem inserting the following rule: "' + rule + '"',
            e
          );
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }
    this.ctr++;
  };
  _proto.flush = function flush() {
    this.tags.forEach(function (tag) {
      var _tag$parentNode;
      return (_tag$parentNode = tag.parentNode) == null
        ? void 0
        : _tag$parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
    {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };
  return StyleSheet2;
})();

// ../../node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js
var weakMemoize = function weakMemoize2(func) {
  var cache = /* @__PURE__ */ new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

// ../../node_modules/@emotion/cache/dist/emotion-cache.browser.development.esm.js
init_emotion_memoize_esm();
var identifierWithPointTracking = function identifierWithPointTracking2(
  begin,
  points,
  index
) {
  var previous = 0;
  var character = 0;
  while (true) {
    previous = character;
    character = peek();
    if (previous === 38 && character === 12) {
      points[index] = 1;
    }
    if (token(character)) {
      break;
    }
    next();
  }
  return slice(begin, position);
};
var toRules = function toRules2(parsed, points) {
  var index = -1;
  var character = 44;
  do {
    switch (token(character)) {
      case 0:
        if (character === 38 && peek() === 12) {
          points[index] = 1;
        }
        parsed[index] += identifierWithPointTracking(
          position - 1,
          points,
          index
        );
        break;
      case 2:
        parsed[index] += delimit(character);
        break;
      case 4:
        if (character === 44) {
          parsed[++index] = peek() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }
      default:
        parsed[index] += from(character);
    }
  } while ((character = next()));
  return parsed;
};
var getRules = function getRules2(value, points) {
  return dealloc(toRules(alloc(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat2(element) {
  if (
    element.type !== 'rule' ||
    !element.parent || // positive .length indicates that this rule contains pseudo
    // negative .length indicates that this rule has been already prefixed
    element.length < 1
  ) {
    return;
  }
  var value = element.value;
  var parent = element.parent;
  var isImplicitRule =
    element.column === parent.column && element.line === parent.line;
  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  }
  if (
    element.props.length === 1 &&
    value.charCodeAt(0) !== 58 &&
    !fixedElements.get(parent)
  ) {
    return;
  }
  if (isImplicitRule) {
    return;
  }
  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;
  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i]
        ? rules[i].replace(/&\f/g, parentRules[j])
        : parentRules[j] + ' ' + rules[i];
    }
  }
};
var removeLabel = function removeLabel2(element) {
  if (element.type === 'decl') {
    var value = element.value;
    if (
      // charcode for l
      value.charCodeAt(0) === 108 && // charcode for b
      value.charCodeAt(2) === 98
    ) {
      element['return'] = '';
      element.value = '';
    }
  }
};
var ignoreFlag =
  'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';
var isIgnoringComment = function isIgnoringComment2(element) {
  return element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};
var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm2(cache) {
  return function (element, index, children) {
    if (element.type !== 'rule' || cache.compat) return;
    var unsafePseudoClasses = element.value.match(
      /(:first|:nth|:nth-last)-child/g
    );
    if (unsafePseudoClasses) {
      var isNested = !!element.parent;
      var commentContainer = isNested
        ? element.parent.children
        : // global rule at the root level
          children;
      for (var i = commentContainer.length - 1; i >= 0; i--) {
        var node = commentContainer[i];
        if (node.line < element.line) {
          break;
        }
        if (node.column < element.column) {
          if (isIgnoringComment(node)) {
            return;
          }
          break;
        }
      }
      unsafePseudoClasses.forEach(function (unsafePseudoClass) {
        console.error(
          'The pseudo class "' +
            unsafePseudoClass +
            '" is potentially unsafe when doing server-side rendering. Try changing it to "' +
            unsafePseudoClass.split('-child')[0] +
            '-of-type".'
        );
      });
    }
  };
};
var isImportRule = function isImportRule2(element) {
  return (
    element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64
  );
};
var isPrependedWithRegularRules = function isPrependedWithRegularRules2(
  index,
  children
) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }
  return false;
};
var nullifyElement = function nullifyElement2(element) {
  element.type = '';
  element.value = '';
  element['return'] = '';
  element.children = '';
  element.props = '';
};
var incorrectImportAlarm = function incorrectImportAlarm2(
  element,
  index,
  children
) {
  if (!isImportRule(element)) {
    return;
  }
  if (element.parent) {
    console.error(
      "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."
    );
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error(
      "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."
    );
    nullifyElement(element);
  }
};
function prefix(value, length) {
  switch (hash(value, length)) {
    case 5103:
      return WEBKIT + 'print-' + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + 'flex-' + value + value;
    case 5187:
      return (
        WEBKIT +
        value +
        replace(
          value,
          /(\w+).+(:[^]+)/,
          WEBKIT + 'box-$1$2' + MS + 'flex-$1$2'
        ) +
        value
      );
    case 5443:
      return (
        WEBKIT +
        value +
        MS +
        'flex-item-' +
        replace(value, /flex-|-self/, '') +
        value
      );
    case 4675:
      return (
        WEBKIT +
        value +
        MS +
        'flex-line-pack' +
        replace(value, /align-content|flex-|-self/, '') +
        value
      );
    case 5548:
      return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value;
    case 5292:
      return (
        WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value
      );
    case 6060:
      return (
        WEBKIT +
        'box-' +
        replace(value, '-grow', '') +
        WEBKIT +
        value +
        MS +
        replace(value, 'grow', 'positive') +
        value
      );
    case 4554:
      return (
        WEBKIT +
        replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') +
        value
      );
    case 6187:
      return (
        replace(
          replace(
            replace(value, /(zoom-|grab)/, WEBKIT + '$1'),
            /(image-set)/,
            WEBKIT + '$1'
          ),
          value,
          ''
        ) + value
      );
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + '$1$`$1');
    case 4968:
      return (
        replace(
          replace(
            value,
            /(.+:)(flex-)?(.*)/,
            WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'
          ),
          /s.+-b[^;]+/,
          'justify'
        ) +
        WEBKIT +
        value +
        value
      );
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length > 6)
        switch (charat(value, length + 1)) {
          case 109:
            if (charat(value, length + 4) !== 45) break;
          case 102:
            return (
              replace(
                value,
                /(.+:)(.+)-([^]+)/,
                '$1' +
                  WEBKIT +
                  '$2-$3$1' +
                  MOZ +
                  (charat(value, length + 3) == 108 ? '$3' : '$2-$3')
              ) + value
            );
          case 115:
            return ~indexof(value, 'stretch')
              ? prefix(replace(value, 'stretch', 'fill-available'), length) +
                  value
              : value;
        }
      break;
    case 4949:
      if (charat(value, length + 1) !== 115) break;
    case 6444:
      switch (
        charat(value, strlen(value) - 3 - (~indexof(value, '!important') && 10))
      ) {
        case 107:
          return replace(value, ':', ':' + WEBKIT) + value;
        case 101:
          return (
            replace(
              value,
              /(.+:)([^;!]+)(;|!.+)?/,
              '$1' +
                WEBKIT +
                (charat(value, 14) === 45 ? 'inline-' : '') +
                'box$3$1' +
                WEBKIT +
                '$2$3$1' +
                MS +
                '$2box$3'
            ) + value
          );
      }
      break;
    case 5936:
      switch (charat(value, length + 11)) {
        case 114:
          return (
            WEBKIT +
            value +
            MS +
            replace(value, /[svh]\w+-[tblr]{2}/, 'tb') +
            value
          );
        case 108:
          return (
            WEBKIT +
            value +
            MS +
            replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') +
            value
          );
        case 45:
          return (
            WEBKIT +
            value +
            MS +
            replace(value, /[svh]\w+-[tblr]{2}/, 'lr') +
            value
          );
      }
      return WEBKIT + value + MS + value + value;
  }
  return value;
}
var prefixer = function prefixer2(element, index, children, callback) {
  if (element.length > -1) {
    if (!element['return'])
      switch (element.type) {
        case DECLARATION:
          element['return'] = prefix(element.value, element.length);
          break;
        case KEYFRAMES:
          return serialize(
            [
              copy(element, {
                value: replace(element.value, '@', '@' + WEBKIT),
              }),
            ],
            callback
          );
        case RULESET:
          if (element.length)
            return combine(element.props, function (value) {
              switch (match(value, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return serialize(
                    [
                      copy(element, {
                        props: [
                          replace(value, /:(read-\w+)/, ':' + MOZ + '$1'),
                        ],
                      }),
                    ],
                    callback
                  );
                case '::placeholder':
                  return serialize(
                    [
                      copy(element, {
                        props: [
                          replace(
                            value,
                            /:(plac\w+)/,
                            ':' + WEBKIT + 'input-$1'
                          ),
                        ],
                      }),
                      copy(element, {
                        props: [replace(value, /:(plac\w+)/, ':' + MOZ + '$1')],
                      }),
                      copy(element, {
                        props: [replace(value, /:(plac\w+)/, MS + 'input-$1')],
                      }),
                    ],
                    callback
                  );
              }
              return '';
            });
      }
  }
};
var defaultStylisPlugins = [prefixer];
var getSourceMap;
{
  sourceMapPattern =
    /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
  getSourceMap = function getSourceMap2(styles) {
    var matches = styles.match(sourceMapPattern);
    if (!matches) return;
    return matches[matches.length - 1];
  };
}
var sourceMapPattern;
var createCache = function createCache2(options) {
  var key = options.key;
  if (!key) {
    throw new Error(
      "You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements."
    );
  }
  if (key === 'css') {
    var ssrStyles = document.querySelectorAll(
      'style[data-emotion]:not([data-s])'
    );
    Array.prototype.forEach.call(ssrStyles, function (node) {
      var dataEmotionAttribute = node.getAttribute('data-emotion');
      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }
      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }
  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
  {
    if (/[^a-z-]/.test(key)) {
      throw new Error(
        'Emotion key must only contain lower case alphabetical characters and - but "' +
          key +
          '" was passed'
      );
    }
  }
  var inserted = {};
  var container;
  var nodesToHydrate = [];
  {
    container = options.container || document.head;
    Array.prototype.forEach.call(
      // this means we will ignore elements which don't have a space in them which
      // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
      document.querySelectorAll('style[data-emotion^="' + key + ' "]'),
      function (node) {
        var attrib = node.getAttribute('data-emotion').split(' ');
        for (var i = 1; i < attrib.length; i++) {
          inserted[attrib[i]] = true;
        }
        nodesToHydrate.push(node);
      }
    );
  }
  var _insert;
  var omnipresentPlugins = [compat, removeLabel];
  {
    omnipresentPlugins.push(
      createUnsafeSelectorsAlarm({
        get compat() {
          return cache.compat;
        },
      }),
      incorrectImportAlarm
    );
  }
  {
    var currentSheet;
    var finalizingPlugins = [
      stringify,
      function (element) {
        if (!element.root) {
          if (element['return']) {
            currentSheet.insert(element['return']);
          } else if (element.value && element.type !== COMMENT) {
            currentSheet.insert(element.value + '{}');
          }
        }
      },
    ];
    var serializer = middleware(
      omnipresentPlugins.concat(stylisPlugins, finalizingPlugins)
    );
    var stylis = function stylis2(styles) {
      return serialize(compile(styles), serializer);
    };
    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;
      if (getSourceMap) {
        var sourceMap = getSourceMap(serialized.styles);
        if (sourceMap) {
          currentSheet = {
            insert: function insert2(rule) {
              sheet.insert(rule + sourceMap);
            },
          };
        }
      }
      stylis(
        selector ? selector + '{' + serialized.styles + '}' : serialized.styles
      );
      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }
  var cache = {
    key,
    sheet: new StyleSheet({
      key,
      container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint,
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert: _insert,
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

export { weakMemoize, createCache };
//# sourceMappingURL=chunk-LOR335JX.js.map
