import {
  init_memoize_one_esm,
  memoize_one_esm_default,
} from './chunk-B6OQJQLG.js';
import { require_prop_types } from './chunk-XNUU7QYF.js';
import { require_react } from './chunk-QBXGYTN6.js';
import { __commonJS, __toESM } from './chunk-4B2QHNJT.js';

// ../../node_modules/computed-style/dist/computedStyle.commonjs.js
var require_computedStyle_commonjs = __commonJS({
  '../../node_modules/computed-style/dist/computedStyle.commonjs.js'(
    exports,
    module
  ) {
    var computedStyle = function (el, prop, getComputedStyle) {
      getComputedStyle = window.getComputedStyle;
      return (
        // If we have getComputedStyle
        (
          getComputedStyle
            ? // Query it
              // TODO: From CSS-Query notes, we might need (node, null) for FF
              getComputedStyle(el)
            : // Otherwise, we are in IE and use currentStyle
              el.currentStyle
        )[
          // Switch to camelCase for CSSOM
          // DEV: Grabbed from jQuery
          // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
          // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
          prop.replace(/-(\w)/gi, function (word, letter) {
            return letter.toUpperCase();
          })
        ]
      );
    };
    module.exports = computedStyle;
  },
});

// ../../node_modules/line-height/lib/line-height.js
var require_line_height = __commonJS({
  '../../node_modules/line-height/lib/line-height.js'(exports, module) {
    var computedStyle = require_computedStyle_commonjs();
    function lineHeight(node) {
      var lnHeightStr = computedStyle(node, 'line-height');
      var lnHeight = parseFloat(lnHeightStr, 10);
      if (lnHeightStr === lnHeight + '') {
        var _lnHeightStyle = node.style.lineHeight;
        node.style.lineHeight = lnHeightStr + 'em';
        lnHeightStr = computedStyle(node, 'line-height');
        lnHeight = parseFloat(lnHeightStr, 10);
        if (_lnHeightStyle) {
          node.style.lineHeight = _lnHeightStyle;
        } else {
          delete node.style.lineHeight;
        }
      }
      if (lnHeightStr.indexOf('pt') !== -1) {
        lnHeight *= 4;
        lnHeight /= 3;
      } else if (lnHeightStr.indexOf('mm') !== -1) {
        lnHeight *= 96;
        lnHeight /= 25.4;
      } else if (lnHeightStr.indexOf('cm') !== -1) {
        lnHeight *= 96;
        lnHeight /= 2.54;
      } else if (lnHeightStr.indexOf('in') !== -1) {
        lnHeight *= 96;
      } else if (lnHeightStr.indexOf('pc') !== -1) {
        lnHeight *= 16;
      }
      lnHeight = Math.round(lnHeight);
      if (lnHeightStr === 'normal') {
        var nodeName = node.nodeName;
        var _node = document.createElement(nodeName);
        _node.innerHTML = '&nbsp;';
        if (nodeName.toUpperCase() === 'TEXTAREA') {
          _node.setAttribute('rows', '1');
        }
        var fontSizeStr = computedStyle(node, 'font-size');
        _node.style.fontSize = fontSizeStr;
        _node.style.padding = '0px';
        _node.style.border = '0px';
        var body = document.body;
        body.appendChild(_node);
        var height = _node.offsetHeight;
        lnHeight = height;
        body.removeChild(_node);
      }
      return lnHeight;
    }
    module.exports = lineHeight;
  },
});

// ../../node_modules/react-truncate-markup/es/index.js
var import_react = __toESM(require_react());
init_memoize_one_esm();
var import_prop_types = __toESM(require_prop_types());
var import_line_height = __toESM(require_line_height());

// ../../node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js
var MapShim = (function () {
  if (typeof Map !== 'undefined') {
    return Map;
  }
  function getIndex(arr, key) {
    var result = -1;
    arr.some(function (entry, index2) {
      if (entry[0] === key) {
        result = index2;
        return true;
      }
      return false;
    });
    return result;
  }
  return (
    /** @class */
    (function () {
      function class_1() {
        this.__entries__ = [];
      }
      Object.defineProperty(class_1.prototype, 'size', {
        /**
         * @returns {boolean}
         */
        get: function () {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true,
      });
      class_1.prototype.get = function (key) {
        var index2 = getIndex(this.__entries__, key);
        var entry = this.__entries__[index2];
        return entry && entry[1];
      };
      class_1.prototype.set = function (key, value) {
        var index2 = getIndex(this.__entries__, key);
        if (~index2) {
          this.__entries__[index2][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      class_1.prototype.delete = function (key) {
        var entries = this.__entries__;
        var index2 = getIndex(entries, key);
        if (~index2) {
          entries.splice(index2, 1);
        }
      };
      class_1.prototype.has = function (key) {
        return !!~getIndex(this.__entries__, key);
      };
      class_1.prototype.clear = function () {
        this.__entries__.splice(0);
      };
      class_1.prototype.forEach = function (callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }
        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };
      return class_1;
    })()
  );
})();
var isBrowser =
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  window.document === document;
var global$1 = (function () {
  if (typeof global !== 'undefined' && global.Math === Math) {
    return global;
  }
  if (typeof self !== 'undefined' && self.Math === Math) {
    return self;
  }
  if (typeof window !== 'undefined' && window.Math === Math) {
    return window;
  }
  return Function('return this')();
})();
var requestAnimationFrame$1 = (function () {
  if (typeof requestAnimationFrame === 'function') {
    return requestAnimationFrame.bind(global$1);
  }
  return function (callback) {
    return setTimeout(function () {
      return callback(Date.now());
    }, 1e3 / 60);
  };
})();
var trailingTimeout = 2;
function throttle(callback, delay) {
  var leadingCall = false,
    trailingCall = false,
    lastCallTime = 0;
  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;
      callback();
    }
    if (trailingCall) {
      proxy();
    }
  }
  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending);
  }
  function proxy() {
    var timeStamp = Date.now();
    if (leadingCall) {
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      }
      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(timeoutCallback, delay);
    }
    lastCallTime = timeStamp;
  }
  return proxy;
}
var REFRESH_DELAY = 20;
var transitionKeys = [
  'top',
  'right',
  'bottom',
  'left',
  'width',
  'height',
  'size',
  'weight',
];
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
var ResizeObserverController =
  /** @class */
  (function () {
    function ResizeObserverController2() {
      this.connected_ = false;
      this.mutationEventsAdded_ = false;
      this.mutationsObserver_ = null;
      this.observers_ = [];
      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    ResizeObserverController2.prototype.addObserver = function (observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }
      if (!this.connected_) {
        this.connect_();
      }
    };
    ResizeObserverController2.prototype.removeObserver = function (observer) {
      var observers2 = this.observers_;
      var index2 = observers2.indexOf(observer);
      if (~index2) {
        observers2.splice(index2, 1);
      }
      if (!observers2.length && this.connected_) {
        this.disconnect_();
      }
    };
    ResizeObserverController2.prototype.refresh = function () {
      var changesDetected = this.updateObservers_();
      if (changesDetected) {
        this.refresh();
      }
    };
    ResizeObserverController2.prototype.updateObservers_ = function () {
      var activeObservers = this.observers_.filter(function (observer) {
        return observer.gatherActive(), observer.hasActive();
      });
      activeObservers.forEach(function (observer) {
        return observer.broadcastActive();
      });
      return activeObservers.length > 0;
    };
    ResizeObserverController2.prototype.connect_ = function () {
      if (!isBrowser || this.connected_) {
        return;
      }
      document.addEventListener('transitionend', this.onTransitionEnd_);
      window.addEventListener('resize', this.refresh);
      if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);
        this.mutationsObserver_.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true,
        });
      } else {
        document.addEventListener('DOMSubtreeModified', this.refresh);
        this.mutationEventsAdded_ = true;
      }
      this.connected_ = true;
    };
    ResizeObserverController2.prototype.disconnect_ = function () {
      if (!isBrowser || !this.connected_) {
        return;
      }
      document.removeEventListener('transitionend', this.onTransitionEnd_);
      window.removeEventListener('resize', this.refresh);
      if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
      }
      if (this.mutationEventsAdded_) {
        document.removeEventListener('DOMSubtreeModified', this.refresh);
      }
      this.mutationsObserver_ = null;
      this.mutationEventsAdded_ = false;
      this.connected_ = false;
    };
    ResizeObserverController2.prototype.onTransitionEnd_ = function (_a) {
      var _b = _a.propertyName,
        propertyName = _b === void 0 ? '' : _b;
      var isReflowProperty = transitionKeys.some(function (key) {
        return !!~propertyName.indexOf(key);
      });
      if (isReflowProperty) {
        this.refresh();
      }
    };
    ResizeObserverController2.getInstance = function () {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController2();
      }
      return this.instance_;
    };
    ResizeObserverController2.instance_ = null;
    return ResizeObserverController2;
  })();
var defineConfigurable = function (target, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var key = _a[_i];
    Object.defineProperty(target, key, {
      value: props[key],
      enumerable: false,
      writable: false,
      configurable: true,
    });
  }
  return target;
};
var getWindowOf = function (target) {
  var ownerGlobal =
    target && target.ownerDocument && target.ownerDocument.defaultView;
  return ownerGlobal || global$1;
};
var emptyRect = createRectInit(0, 0, 0, 0);
function toFloat(value) {
  return parseFloat(value) || 0;
}
function getBordersSize(styles) {
  var positions = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    positions[_i - 1] = arguments[_i];
  }
  return positions.reduce(function (size, position) {
    var value = styles['border-' + position + '-width'];
    return size + toFloat(value);
  }, 0);
}
function getPaddings(styles) {
  var positions = ['top', 'right', 'bottom', 'left'];
  var paddings = {};
  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
    var position = positions_1[_i];
    var value = styles['padding-' + position];
    paddings[position] = toFloat(value);
  }
  return paddings;
}
function getSVGContentRect(target) {
  var bbox = target.getBBox();
  return createRectInit(0, 0, bbox.width, bbox.height);
}
function getHTMLElementContentRect(target) {
  var clientWidth = target.clientWidth,
    clientHeight = target.clientHeight;
  if (!clientWidth && !clientHeight) {
    return emptyRect;
  }
  var styles = getWindowOf(target).getComputedStyle(target);
  var paddings = getPaddings(styles);
  var horizPad = paddings.left + paddings.right;
  var vertPad = paddings.top + paddings.bottom;
  var width = toFloat(styles.width),
    height = toFloat(styles.height);
  if (styles.boxSizing === 'border-box') {
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, 'left', 'right') + horizPad;
    }
    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
    }
  }
  if (!isDocumentElement(target)) {
    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
    var horizScrollbar = Math.round(height + vertPad) - clientHeight;
    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar;
    }
    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar;
    }
  }
  return createRectInit(paddings.left, paddings.top, width, height);
}
var isSVGGraphicsElement = (function () {
  if (typeof SVGGraphicsElement !== 'undefined') {
    return function (target) {
      return target instanceof getWindowOf(target).SVGGraphicsElement;
    };
  }
  return function (target) {
    return (
      target instanceof getWindowOf(target).SVGElement &&
      typeof target.getBBox === 'function'
    );
  };
})();
function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement;
}
function getContentRect(target) {
  if (!isBrowser) {
    return emptyRect;
  }
  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target);
  }
  return getHTMLElementContentRect(target);
}
function createReadOnlyRect(_a) {
  var x = _a.x,
    y = _a.y,
    width = _a.width,
    height = _a.height;
  var Constr =
    typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype);
  defineConfigurable(rect, {
    x,
    y,
    width,
    height,
    top: y,
    right: x + width,
    bottom: height + y,
    left: x,
  });
  return rect;
}
function createRectInit(x, y, width, height) {
  return { x, y, width, height };
}
var ResizeObservation =
  /** @class */
  (function () {
    function ResizeObservation2(target) {
      this.broadcastWidth = 0;
      this.broadcastHeight = 0;
      this.contentRect_ = createRectInit(0, 0, 0, 0);
      this.target = target;
    }
    ResizeObservation2.prototype.isActive = function () {
      var rect = getContentRect(this.target);
      this.contentRect_ = rect;
      return (
        rect.width !== this.broadcastWidth ||
        rect.height !== this.broadcastHeight
      );
    };
    ResizeObservation2.prototype.broadcastRect = function () {
      var rect = this.contentRect_;
      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;
      return rect;
    };
    return ResizeObservation2;
  })();
var ResizeObserverEntry =
  /** @class */
  /* @__PURE__ */ (function () {
    function ResizeObserverEntry2(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);
      defineConfigurable(this, { target, contentRect });
    }
    return ResizeObserverEntry2;
  })();
var ResizeObserverSPI =
  /** @class */
  (function () {
    function ResizeObserverSPI2(callback, controller, callbackCtx) {
      this.activeObservations_ = [];
      this.observations_ = new MapShim();
      if (typeof callback !== 'function') {
        throw new TypeError(
          'The callback provided as parameter 1 is not a function.'
        );
      }
      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    }
    ResizeObserverSPI2.prototype.observe = function (target) {
      if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
      }
      if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (observations.has(target)) {
        return;
      }
      observations.set(target, new ResizeObservation(target));
      this.controller_.addObserver(this);
      this.controller_.refresh();
    };
    ResizeObserverSPI2.prototype.unobserve = function (target) {
      if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
      }
      if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (!observations.has(target)) {
        return;
      }
      observations.delete(target);
      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };
    ResizeObserverSPI2.prototype.disconnect = function () {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };
    ResizeObserverSPI2.prototype.gatherActive = function () {
      var _this = this;
      this.clearActive();
      this.observations_.forEach(function (observation) {
        if (observation.isActive()) {
          _this.activeObservations_.push(observation);
        }
      });
    };
    ResizeObserverSPI2.prototype.broadcastActive = function () {
      if (!this.hasActive()) {
        return;
      }
      var ctx = this.callbackCtx_;
      var entries = this.activeObservations_.map(function (observation) {
        return new ResizeObserverEntry(
          observation.target,
          observation.broadcastRect()
        );
      });
      this.callback_.call(ctx, entries, ctx);
      this.clearActive();
    };
    ResizeObserverSPI2.prototype.clearActive = function () {
      this.activeObservations_.splice(0);
    };
    ResizeObserverSPI2.prototype.hasActive = function () {
      return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI2;
  })();
var observers =
  typeof WeakMap !== 'undefined'
    ? /* @__PURE__ */ new WeakMap()
    : new MapShim();
var ResizeObserver =
  /** @class */
  /* @__PURE__ */ (function () {
    function ResizeObserver2(callback) {
      if (!(this instanceof ResizeObserver2)) {
        throw new TypeError('Cannot call a class as a function.');
      }
      if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
      }
      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }
    return ResizeObserver2;
  })();
['observe', 'unobserve', 'disconnect'].forEach(function (method) {
  ResizeObserver.prototype[method] = function () {
    var _a;
    return (_a = observers.get(this))[method].apply(_a, arguments);
  };
});
var index = (function () {
  if (typeof global$1.ResizeObserver !== 'undefined') {
    return global$1.ResizeObserver;
  }
  return ResizeObserver;
})();
var ResizeObserver_es_default = index;

// ../../node_modules/react-truncate-markup/es/tokenize-rules.js
var TOKENIZE_POLICY = {
  characters: {
    tokenizeString: null,
    isAtomic: function isAtomic(str) {
      return str.length <= 1;
    },
  },
  words: {
    tokenizeString: function tokenizeString(str) {
      return str.match(/(\s*\S[\S\xA0]*)/g);
    },
    isAtomic: function isAtomic2(str) {
      return /^\s*[\S\xA0]*\s*$/.test(str);
    },
  },
};
var tokenize_rules_default = TOKENIZE_POLICY;

// ../../node_modules/react-truncate-markup/es/atom.js
var Atom = function Atom2(props) {
  return props.children || null;
};
Atom.__rtm_atom = true;
var isAtomComponent = function isAtomComponent2(reactEl) {
  return !!(reactEl && reactEl.type && reactEl.type.__rtm_atom === true);
};
var ATOM_STRING_ID = '<Atom>';

// ../../node_modules/react-truncate-markup/es/index.js
var _createClass = /* @__PURE__ */ (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
var _class;
var _temp;
var _typeof =
  typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? function (obj) {
        return typeof obj;
      }
    : function (obj) {
        return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj;
      };
var _extends =
  Object.assign ||
  function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
function _possibleConstructorReturn(self2, call) {
  if (!self2) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self2;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}
var SPLIT = {
  LEFT: true,
  RIGHT: false,
};
var toString = function toString2(node) {
  var string =
    arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : '';
  if (!node) {
    return string;
  } else if (typeof node === 'string') {
    return string + node;
  } else if (isAtomComponent(node)) {
    return string + ATOM_STRING_ID;
  }
  var children = Array.isArray(node) ? node : node.props.children || '';
  return (
    string +
    import_react.default.Children.map(children, function (child) {
      return toString2(child);
    }).join('')
  );
};
var cloneWithChildren = function cloneWithChildren2(
  node,
  children,
  isRootEl,
  level
) {
  var getDisplayStyle = function getDisplayStyle2() {
    if (isRootEl) {
      return {
        // root element cannot be an inline element because of the line calculation
        display: (node.props.style || {}).display || 'block',
      };
    } else if (level === 2) {
      return {
        // level 2 elements (direct children of the root element) need to be inline because of the ellipsis.
        // if level 2 element was a block element, ellipsis would get rendered on a new line, breaking the max number of lines
        display: (node.props.style || {}).display || 'inline-block',
      };
    } else return {};
  };
  return _extends({}, node, {
    props: _extends({}, node.props, {
      style: _extends({}, node.props.style, getDisplayStyle()),
      children,
    }),
  });
};
var validateTree = function validateTree2(node) {
  if (
    node == null ||
    ['string', 'number'].includes(
      typeof node === 'undefined' ? 'undefined' : _typeof(node)
    ) ||
    isAtomComponent(node)
  ) {
    return true;
  } else if (typeof node.type === 'function') {
    if (true) {
      console.error(
        'ReactTruncateMarkup tried to render <' +
          node.type.name +
          ' />, but truncating React components is not supported, the full content is rendered instead. Only DOM elements are supported. Alternatively, you can take advantage of the <TruncateMarkup.Atom /> component (see more in the docs https://github.com/patrik-piskay/react-truncate-markup/blob/master/README.md#truncatemarkupatom-).'
      );
    }
    return false;
  }
  if (node.props && node.props.children) {
    return import_react.default.Children.toArray(node.props.children).reduce(
      function (isValid, child) {
        return isValid && validateTree2(child);
      },
      true
    );
  }
  return true;
};
var TruncateMarkup =
  ((_temp = _class =
    (function (_React$Component) {
      _inherits(TruncateMarkup2, _React$Component);
      function TruncateMarkup2(props) {
        _classCallCheck(this, TruncateMarkup2);
        var _this = _possibleConstructorReturn(
          this,
          _React$Component.call(this, props)
        );
        _this.lineHeight = null;
        _this.splitDirectionSeq = [];
        _this.shouldTruncate = true;
        _this.wasLastCharTested = false;
        _this.endFound = false;
        _this.latestThatFits = null;
        _this.onTruncateCalled = false;
        _this.toStringMemo = memoize_one_esm_default(toString);
        _this.childrenWithRefMemo = memoize_one_esm_default(
          _this.childrenElementWithRef
        );
        _this.validateTreeMemo = memoize_one_esm_default(validateTree);
        _this.onTruncate = function (wasTruncated) {
          if (!_this.onTruncateCalled) {
            _this.onTruncateCalled = true;
            _this.props.onTruncate(wasTruncated);
          }
        };
        _this.handleResize = function (el, prevResizeObserver) {
          if (prevResizeObserver) {
            prevResizeObserver.disconnect();
          }
          if (!el) return null;
          var initialRender = true;
          var resizeCallback = function resizeCallback2() {
            if (initialRender) {
              initialRender = false;
            } else {
              _this.shouldTruncate = false;
              _this.latestThatFits = null;
              _this.setState(
                {
                  text: _this.origText,
                },
                function () {
                  _this.shouldTruncate = true;
                  _this.onTruncateCalled = false;
                  _this.truncate();
                }
              );
            }
          };
          var resizeObserver =
            prevResizeObserver || new ResizeObserver_es_default(resizeCallback);
          resizeObserver.observe(el);
          return resizeObserver;
        };
        _this.setRef = function (el) {
          var isNewEl = _this.el !== el;
          _this.el = el;
          if (isNewEl) {
            _this.resizeObserver = _this.handleResize(el, _this.resizeObserver);
          }
        };
        _this.state = {
          text: _this.childrenWithRefMemo(_this.props.children),
        };
        return _this;
      }
      TruncateMarkup2.prototype.componentDidMount =
        function componentDidMount() {
          if (!this.isValid) {
            return;
          }
          this.lineHeight =
            this.props.lineHeight || (0, import_line_height.default)(this.el);
          this.truncate();
        };
      TruncateMarkup2.prototype.UNSAFE_componentWillReceiveProps =
        function UNSAFE_componentWillReceiveProps(nextProps) {
          var _this2 = this;
          this.shouldTruncate = false;
          this.latestThatFits = null;
          this.setState(
            {
              text: this.childrenWithRefMemo(nextProps.children),
            },
            function () {
              if (!_this2.isValid) {
                return;
              }
              _this2.lineHeight =
                nextProps.lineHeight ||
                (0, import_line_height.default)(_this2.el);
              _this2.shouldTruncate = true;
              _this2.truncate();
            }
          );
        };
      TruncateMarkup2.prototype.componentDidUpdate =
        function componentDidUpdate() {
          if (this.shouldTruncate === false || this.isValid === false) {
            return;
          }
          if (this.endFound) {
            if (
              this.latestThatFits !== null &&
              this.state.text !== this.latestThatFits
            ) {
              this.setState({
                text: this.latestThatFits,
              });
              return;
            }
            this.onTruncate(
              /* wasTruncated */
              true
            );
            return;
          }
          if (this.splitDirectionSeq.length) {
            if (this.fits()) {
              this.latestThatFits = this.state.text;
              this.splitDirectionSeq.splice(
                this.splitDirectionSeq.length - 1,
                1,
                SPLIT.RIGHT,
                SPLIT.LEFT
              );
            } else {
              this.splitDirectionSeq.push(SPLIT.LEFT);
            }
            this.tryToFit(this.origText, this.splitDirectionSeq);
          }
        };
      TruncateMarkup2.prototype.componentWillUnmount =
        function componentWillUnmount() {
          this.lineHeight = null;
          this.latestThatFits = null;
          this.splitDirectionSeq = [];
        };
      TruncateMarkup2.prototype.truncate = function truncate() {
        if (this.fits()) {
          this.shouldTruncate = false;
          this.onTruncate(
            /* wasTruncated */
            false
          );
          return;
        }
        this.truncateOriginalText();
      };
      TruncateMarkup2.prototype.childrenElementWithRef =
        function childrenElementWithRef(children) {
          var child = import_react.default.Children.only(children);
          return import_react.default.cloneElement(child, {
            ref: this.setRef,
            style: _extends(
              {
                wordWrap: 'break-word',
              },
              child.props.style
            ),
          });
        };
      TruncateMarkup2.prototype.truncateOriginalText =
        function truncateOriginalText() {
          this.endFound = false;
          this.splitDirectionSeq = [SPLIT.LEFT];
          this.wasLastCharTested = false;
          this.tryToFit(this.origText, this.splitDirectionSeq);
        };
      TruncateMarkup2.prototype.tryToFit = function tryToFit(
        rootEl,
        splitDirections
      ) {
        if (!rootEl.props.children) {
          return;
        }
        var newRootEl = this.split(
          rootEl,
          splitDirections,
          /* isRootEl */
          true
        );
        var ellipsis =
          typeof this.props.ellipsis === 'function'
            ? this.props.ellipsis(newRootEl)
            : this.props.ellipsis;
        ellipsis =
          (typeof ellipsis === 'undefined'
            ? 'undefined'
            : _typeof(ellipsis)) === 'object'
            ? import_react.default.cloneElement(ellipsis, { key: 'ellipsis' })
            : ellipsis;
        var newChildren = newRootEl.props.children;
        var newChildrenWithEllipsis = [].concat(newChildren, ellipsis);
        var shouldRenderEllipsis =
          toString(newChildren) !== this.toStringMemo(this.props.children);
        this.setState({
          text: _extends({}, newRootEl, {
            props: _extends({}, newRootEl.props, {
              children: shouldRenderEllipsis
                ? newChildrenWithEllipsis
                : newChildren,
            }),
          }),
        });
      };
      TruncateMarkup2.prototype.split = function split(node, splitDirections) {
        var isRoot =
          arguments.length > 2 && arguments[2] !== void 0
            ? arguments[2]
            : false;
        var level =
          arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
        if (!node || isAtomComponent(node)) {
          this.endFound = true;
          return node;
        } else if (typeof node === 'string') {
          return this.splitString(node, splitDirections, level);
        } else if (Array.isArray(node)) {
          return this.splitArray(node, splitDirections, level);
        }
        var newChildren = this.split(
          node.props.children,
          splitDirections,
          /* isRoot */
          false,
          level + 1
        );
        return cloneWithChildren(node, newChildren, isRoot, level);
      };
      TruncateMarkup2.prototype.splitString = function splitString(string) {
        var splitDirections =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
        var level = arguments[2];
        if (!splitDirections.length) {
          return string;
        }
        if (splitDirections.length && this.policy.isAtomic(string)) {
          if (!this.wasLastCharTested) {
            this.wasLastCharTested = true;
          } else {
            this.endFound = true;
          }
          return string;
        }
        if (this.policy.tokenizeString) {
          var wordsArray = this.splitArray(
            this.policy.tokenizeString(string),
            splitDirections,
            level
          );
          return wordsArray.join('');
        }
        var splitDirection = splitDirections[0],
          restSplitDirections = splitDirections.slice(1);
        var pivotIndex = Math.ceil(string.length / 2);
        var beforeString = string.substring(0, pivotIndex);
        if (splitDirection === SPLIT.LEFT) {
          return this.splitString(beforeString, restSplitDirections, level);
        }
        var afterString = string.substring(pivotIndex);
        return (
          beforeString +
          this.splitString(afterString, restSplitDirections, level)
        );
      };
      TruncateMarkup2.prototype.splitArray = function splitArray(array) {
        var splitDirections =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
        var level = arguments[2];
        if (!splitDirections.length) {
          return array;
        }
        if (array.length === 1) {
          return [
            this.split(
              array[0],
              splitDirections,
              /* isRoot */
              false,
              level
            ),
          ];
        }
        var splitDirection = splitDirections[0],
          restSplitDirections = splitDirections.slice(1);
        var pivotIndex = Math.ceil(array.length / 2);
        var beforeArray = array.slice(0, pivotIndex);
        if (splitDirection === SPLIT.LEFT) {
          return this.splitArray(beforeArray, restSplitDirections, level);
        }
        var afterArray = array.slice(pivotIndex);
        return beforeArray.concat(
          this.splitArray(afterArray, restSplitDirections, level)
        );
      };
      TruncateMarkup2.prototype.fits = function fits() {
        var maxLines = this.props.lines;
        var _el$getBoundingClient = this.el.getBoundingClientRect(),
          height = _el$getBoundingClient.height;
        var computedLines = Math.round(height / parseFloat(this.lineHeight));
        return maxLines >= computedLines;
      };
      TruncateMarkup2.prototype.render = function render() {
        return this.state.text;
      };
      _createClass(TruncateMarkup2, [
        {
          key: 'isValid',
          get: function get() {
            return this.validateTreeMemo(this.props.children);
          },
        },
        {
          key: 'origText',
          get: function get() {
            return this.childrenWithRefMemo(this.props.children);
          },
        },
        {
          key: 'policy',
          get: function get() {
            return (
              tokenize_rules_default[this.props.tokenize] ||
              tokenize_rules_default.characters
            );
          },
        },
      ]);
      return TruncateMarkup2;
    })(import_react.default.Component)),
  (_class.Atom = Atom),
  (_class.defaultProps = {
    lines: 1,
    ellipsis: '...',
    lineHeight: '',
    onTruncate: function onTruncate() {},
    tokenize: 'characters',
  }),
  _temp);
TruncateMarkup.propTypes = true
  ? {
      children: import_prop_types.default.element.isRequired,
      lines: import_prop_types.default.number,
      ellipsis: import_prop_types.default.oneOfType([
        import_prop_types.default.element,
        import_prop_types.default.string,
        import_prop_types.default.func,
      ]),
      lineHeight: import_prop_types.default.oneOfType([
        import_prop_types.default.string,
        import_prop_types.default.number,
      ]),
      onTruncate: import_prop_types.default.func,
      // eslint-disable-next-line
      onAfterTruncate: function onAfterTruncate(
        props,
        propName,
        componentName
      ) {
        if (props[propName]) {
          return new Error(
            componentName +
              ': Setting `onAfterTruncate` prop is deprecated, use `onTruncate` instead.'
          );
        }
      },
      tokenize: function tokenize(props, propName, componentName) {
        var tokenizeValue = props[propName];
        if (typeof tokenizeValue !== 'undefined') {
          if (!tokenize_rules_default[tokenizeValue]) {
            return new Error(
              componentName +
                ": Unknown option for prop 'tokenize': '" +
                tokenizeValue +
                "'. Option 'characters' will be used instead."
            );
          }
        }
      },
    }
  : {};
export { TruncateMarkup as default };
//# sourceMappingURL=react-truncate-markup.js.map
