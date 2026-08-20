import { _defineProperty } from './chunk-I6C66VMN.js';
import { getNonce } from './chunk-2HZ2NS2Y.js';
import { _inheritsLoose } from './chunk-4GHE5XSE.js';
import './chunk-V7XVH3XH.js';
import { require_prop_types } from './chunk-XNUU7QYF.js';
import { _extends } from './chunk-VMQKBCTX.js';
import { require_react } from './chunk-QBXGYTN6.js';
import { __toESM } from './chunk-4B2QHNJT.js';

// ../../node_modules/react-focus-on/node_modules/tslib/tslib.es6.mjs
var __assign = function () {
  __assign =
    Object.assign ||
    function __assign4(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === 'function')
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (
        e.indexOf(p[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(s, p[i])
      )
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}

// ../../node_modules/react-focus-on/dist/es2015/Combination.js
var React19 = __toESM(require_react());

// ../../node_modules/react-focus-on/dist/es2015/UI.js
var React11 = __toESM(require_react());

// ../../node_modules/react-remove-scroll/node_modules/tslib/tslib.es6.mjs
var __assign2 = function () {
  __assign2 =
    Object.assign ||
    function __assign4(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign2.apply(this, arguments);
};
function __rest2(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === 'function')
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (
        e.indexOf(p[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(s, p[i])
      )
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}

// ../../node_modules/react-remove-scroll/dist/es2015/UI.js
var React5 = __toESM(require_react());

// ../../node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var zeroRightClassName = 'right-scroll-bar-position';
var fullWidthClassName = 'width-before-scroll-bar';
var noScrollbarsClassName = 'with-scroll-bars-hidden';
var removedBarSizeVariable = '--removed-body-scroll-bar-size';

// ../../node_modules/use-callback-ref/dist/es2015/assignRef.js
function assignRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
  return ref;
}

// ../../node_modules/use-callback-ref/dist/es2015/useRef.js
var import_react = __toESM(require_react());
function useCallbackRef(initialValue, callback) {
  var ref = (0, import_react.useState)(function () {
    return {
      // value
      value: initialValue,
      // last callback
      callback,
      // "memoized" public interface
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          var last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        },
      },
    };
  })[0];
  ref.callback = callback;
  return ref.facade;
}

// ../../node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var React = __toESM(require_react());
var useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
var currentValues = /* @__PURE__ */ new WeakMap();
function useMergeRefs(refs, defaultValue) {
  var callbackRef = useCallbackRef(defaultValue || null, function (newValue) {
    return refs.forEach(function (ref) {
      return assignRef(ref, newValue);
    });
  });
  useIsomorphicLayoutEffect(
    function () {
      var oldValue = currentValues.get(callbackRef);
      if (oldValue) {
        var prevRefs_1 = new Set(oldValue);
        var nextRefs_1 = new Set(refs);
        var current_1 = callbackRef.current;
        prevRefs_1.forEach(function (ref) {
          if (!nextRefs_1.has(ref)) {
            assignRef(ref, null);
          }
        });
        nextRefs_1.forEach(function (ref) {
          if (!prevRefs_1.has(ref)) {
            assignRef(ref, current_1);
          }
        });
      }
      currentValues.set(callbackRef, refs);
    },
    [refs]
  );
  return callbackRef;
}

// ../../node_modules/use-sidecar/node_modules/tslib/tslib.es6.mjs
var __assign3 = function () {
  __assign3 =
    Object.assign ||
    function __assign4(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign3.apply(this, arguments);
};
function __rest3(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === 'function')
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (
        e.indexOf(p[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(s, p[i])
      )
        t[p[i]] = s[p[i]];
    }
  return t;
}

// ../../node_modules/use-sidecar/dist/es2015/hoc.js
var React2 = __toESM(require_react());

// ../../node_modules/use-sidecar/dist/es2015/hook.js
var import_react2 = __toESM(require_react());

// ../../node_modules/use-sidecar/dist/es2015/medium.js
function ItoI(a) {
  return a;
}
function innerCreateMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  var buffer = [];
  var assigned = false;
  var medium = {
    read: function () {
      if (assigned) {
        throw new Error(
          'Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.'
        );
      }
      if (buffer.length) {
        return buffer[buffer.length - 1];
      }
      return defaults;
    },
    useMedium: function (data) {
      var item = middleware(data, assigned);
      buffer.push(item);
      return function () {
        buffer = buffer.filter(function (x) {
          return x !== item;
        });
      };
    },
    assignSyncMedium: function (cb) {
      assigned = true;
      while (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
      }
      buffer = {
        push: function (x) {
          return cb(x);
        },
        filter: function () {
          return buffer;
        },
      };
    },
    assignMedium: function (cb) {
      assigned = true;
      var pendingQueue = [];
      if (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
        pendingQueue = buffer;
      }
      var executeQueue = function () {
        var cbs2 = pendingQueue;
        pendingQueue = [];
        cbs2.forEach(cb);
      };
      var cycle = function () {
        return Promise.resolve().then(executeQueue);
      };
      cycle();
      buffer = {
        push: function (x) {
          pendingQueue.push(x);
          cycle();
        },
        filter: function (filter) {
          pendingQueue = pendingQueue.filter(filter);
          return buffer;
        },
      };
    },
  };
  return medium;
}
function createMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  return innerCreateMedium(defaults, middleware);
}
function createSidecarMedium(options) {
  if (options === void 0) {
    options = {};
  }
  var medium = innerCreateMedium(null);
  medium.options = __assign3({ async: true, ssr: false }, options);
  return medium;
}

// ../../node_modules/use-sidecar/dist/es2015/renderProp.js
var React3 = __toESM(require_react());
var import_react3 = __toESM(require_react());

// ../../node_modules/use-sidecar/dist/es2015/exports.js
var React4 = __toESM(require_react());
var SideCar = function (_a) {
  var sideCar = _a.sideCar,
    rest = __rest3(_a, ['sideCar']);
  if (!sideCar) {
    throw new Error(
      'Sidecar: please provide `sideCar` property to import the right car'
    );
  }
  var Target = sideCar.read();
  if (!Target) {
    throw new Error('Sidecar medium not found');
  }
  return React4.createElement(Target, __assign3({}, rest));
};
SideCar.isSideCarExport = true;
function exportSidecar(medium, exported) {
  medium.useMedium(exported);
  return SideCar;
}

// ../../node_modules/react-remove-scroll/dist/es2015/medium.js
var effectCar = createSidecarMedium();

// ../../node_modules/react-remove-scroll/dist/es2015/UI.js
var nothing = function () {
  return;
};
var RemoveScroll = React5.forwardRef(function (props, parentRef) {
  var ref = React5.useRef(null);
  var _a = React5.useState({
      onScrollCapture: nothing,
      onWheelCapture: nothing,
      onTouchMoveCapture: nothing,
    }),
    callbacks = _a[0],
    setCallbacks = _a[1];
  var forwardProps = props.forwardProps,
    children = props.children,
    className = props.className,
    removeScrollBar = props.removeScrollBar,
    enabled = props.enabled,
    shards = props.shards,
    sideCar = props.sideCar,
    noRelative = props.noRelative,
    noIsolation = props.noIsolation,
    inert = props.inert,
    allowPinchZoom = props.allowPinchZoom,
    _b = props.as,
    Container = _b === void 0 ? 'div' : _b,
    gapMode = props.gapMode,
    rest = __rest2(props, [
      'forwardProps',
      'children',
      'className',
      'removeScrollBar',
      'enabled',
      'shards',
      'sideCar',
      'noRelative',
      'noIsolation',
      'inert',
      'allowPinchZoom',
      'as',
      'gapMode',
    ]);
  var SideCar2 = sideCar;
  var containerRef = useMergeRefs([ref, parentRef]);
  var containerProps = __assign2(__assign2({}, rest), callbacks);
  return React5.createElement(
    React5.Fragment,
    null,
    enabled &&
      React5.createElement(SideCar2, {
        sideCar: effectCar,
        removeScrollBar,
        shards,
        noRelative,
        noIsolation,
        inert,
        setCallbacks,
        allowPinchZoom: !!allowPinchZoom,
        lockRef: ref,
        gapMode,
      }),
    forwardProps
      ? React5.cloneElement(
          React5.Children.only(children),
          __assign2(__assign2({}, containerProps), { ref: containerRef })
        )
      : React5.createElement(
          Container,
          __assign2({}, containerProps, { className, ref: containerRef }),
          children
        )
  );
});
RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false,
};
RemoveScroll.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName,
};

// ../../node_modules/react-focus-lock/dist/es2015/Lock.js
var import_react6 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());

// ../../node_modules/focus-lock/dist/es2015/constants.js
var FOCUS_GROUP = 'data-focus-lock';
var FOCUS_DISABLED = 'data-focus-lock-disabled';
var FOCUS_ALLOW = 'data-no-focus-lock';
var FOCUS_AUTO = 'data-autofocus-inside';
var FOCUS_NO_AUTOFOCUS = 'data-no-autofocus';

// ../../node_modules/react-focus-lock/dist/es2015/FocusGuard.js
var import_react4 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var hiddenGuard = {
  width: '1px',
  height: '0px',
  padding: 0,
  overflow: 'hidden',
  position: 'fixed',
  top: '1px',
  left: '1px',
};
var InFocusGuard = function InFocusGuard2(_ref) {
  var _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  return import_react4.default.createElement(
    import_react4.Fragment,
    null,
    import_react4.default.createElement('div', {
      key: 'guard-first',
      'data-focus-guard': true,
      'data-focus-auto-guard': true,
      style: hiddenGuard,
    }),
    children,
    children &&
      import_react4.default.createElement('div', {
        key: 'guard-last',
        'data-focus-guard': true,
        'data-focus-auto-guard': true,
        style: hiddenGuard,
      })
  );
};
InFocusGuard.propTypes = true
  ? {
      children: import_prop_types.default.node,
    }
  : {};
var FocusGuard_default = InFocusGuard;

// ../../node_modules/react-focus-lock/dist/es2015/medium.js
var mediumFocus = createMedium({}, function (_ref) {
  var target = _ref.target,
    currentTarget = _ref.currentTarget;
  return {
    target,
    currentTarget,
  };
});
var mediumBlur = createMedium();
var mediumEffect = createMedium();
var mediumSidecar = createSidecarMedium({
  async: true,
  ssr: typeof document !== 'undefined',
});

// ../../node_modules/react-focus-lock/dist/es2015/scope.js
var import_react5 = __toESM(require_react());
var focusScope = (0, import_react5.createContext)(void 0);

// ../../node_modules/react-focus-lock/dist/es2015/Lock.js
var emptyArray = [];
var FocusLock = (0, import_react6.forwardRef)(function FocusLockUI(
  props,
  parentRef
) {
  var _extends2;
  var _useState = (0, import_react6.useState)(),
    realObserved = _useState[0],
    setObserved = _useState[1];
  var observed = (0, import_react6.useRef)();
  var isActive = (0, import_react6.useRef)(false);
  var originalFocusedElement = (0, import_react6.useRef)(null);
  var _useState2 = (0, import_react6.useState)({}),
    update = _useState2[1];
  var children = props.children,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$noFocusGuards = props.noFocusGuards,
    noFocusGuards =
      _props$noFocusGuards === void 0 ? false : _props$noFocusGuards,
    _props$persistentFocu = props.persistentFocus,
    persistentFocus =
      _props$persistentFocu === void 0 ? false : _props$persistentFocu,
    _props$crossFrame = props.crossFrame,
    crossFrame = _props$crossFrame === void 0 ? true : _props$crossFrame,
    _props$autoFocus = props.autoFocus,
    autoFocus = _props$autoFocus === void 0 ? true : _props$autoFocus,
    allowTextSelection = props.allowTextSelection,
    group = props.group,
    className = props.className,
    whiteList = props.whiteList,
    hasPositiveIndices = props.hasPositiveIndices,
    _props$shards = props.shards,
    shards = _props$shards === void 0 ? emptyArray : _props$shards,
    _props$as = props.as,
    Container = _props$as === void 0 ? 'div' : _props$as,
    _props$lockProps = props.lockProps,
    containerProps = _props$lockProps === void 0 ? {} : _props$lockProps,
    SideCar2 = props.sideCar,
    _props$returnFocus = props.returnFocus,
    shouldReturnFocus =
      _props$returnFocus === void 0 ? false : _props$returnFocus,
    focusOptions = props.focusOptions,
    onActivationCallback = props.onActivation,
    onDeactivationCallback = props.onDeactivation;
  var _useState3 = (0, import_react6.useState)({}),
    id = _useState3[0];
  var onActivation = (0, import_react6.useCallback)(
    function (_ref) {
      var captureFocusRestore2 = _ref.captureFocusRestore;
      if (!originalFocusedElement.current) {
        var _document;
        var activeElement =
          (_document = document) == null ? void 0 : _document.activeElement;
        originalFocusedElement.current = activeElement;
        if (activeElement !== document.body) {
          originalFocusedElement.current = captureFocusRestore2(activeElement);
        }
      }
      if (observed.current && onActivationCallback) {
        onActivationCallback(observed.current);
      }
      isActive.current = true;
      update();
    },
    [onActivationCallback]
  );
  var onDeactivation = (0, import_react6.useCallback)(
    function () {
      isActive.current = false;
      if (onDeactivationCallback) {
        onDeactivationCallback(observed.current);
      }
      update();
    },
    [onDeactivationCallback]
  );
  var returnFocus = (0, import_react6.useCallback)(
    function (allowDefer) {
      var focusRestore = originalFocusedElement.current;
      if (focusRestore) {
        var returnFocusTo =
          (typeof focusRestore === 'function'
            ? focusRestore()
            : focusRestore) || document.body;
        var howToReturnFocus =
          typeof shouldReturnFocus === 'function'
            ? shouldReturnFocus(returnFocusTo)
            : shouldReturnFocus;
        if (howToReturnFocus) {
          var returnFocusOptions =
            typeof howToReturnFocus === 'object' ? howToReturnFocus : void 0;
          originalFocusedElement.current = null;
          if (allowDefer) {
            Promise.resolve().then(function () {
              return returnFocusTo.focus(returnFocusOptions);
            });
          } else {
            returnFocusTo.focus(returnFocusOptions);
          }
        }
      }
    },
    [shouldReturnFocus]
  );
  var onFocus3 = (0, import_react6.useCallback)(function (event) {
    if (isActive.current) {
      mediumFocus.useMedium(event);
    }
  }, []);
  var onBlur3 = mediumBlur.useMedium;
  var setObserveNode = (0, import_react6.useCallback)(function (newObserved) {
    if (observed.current !== newObserved) {
      observed.current = newObserved;
      setObserved(newObserved);
    }
  }, []);
  if (true) {
    if (typeof allowTextSelection !== 'undefined') {
      console.warn(
        'React-Focus-Lock: allowTextSelection is deprecated and enabled by default'
      );
    }
    (0, import_react6.useEffect)(function () {
      if (!observed.current && typeof Container !== 'string') {
        console.error('FocusLock: could not obtain ref to internal node');
      }
    }, []);
  }
  var lockProps = _extends(
    ((_extends2 = {}),
    (_extends2[FOCUS_DISABLED] = disabled && 'disabled'),
    (_extends2[FOCUS_GROUP] = group),
    _extends2),
    containerProps
  );
  var hasLeadingGuards = noFocusGuards !== true;
  var hasTailingGuards = hasLeadingGuards && noFocusGuards !== 'tail';
  var mergedRef = useMergeRefs([parentRef, setObserveNode]);
  var focusScopeValue = (0, import_react6.useMemo)(
    function () {
      return {
        observed,
        shards,
        enabled: !disabled,
        active: isActive.current,
      };
    },
    [disabled, isActive.current, shards, realObserved]
  );
  return import_react6.default.createElement(
    import_react6.Fragment,
    null,
    hasLeadingGuards && [
      import_react6.default.createElement('div', {
        key: 'guard-first',
        'data-focus-guard': true,
        tabIndex: disabled ? -1 : 0,
        style: hiddenGuard,
      }),
      hasPositiveIndices
        ? import_react6.default.createElement('div', {
            key: 'guard-nearest',
            'data-focus-guard': true,
            tabIndex: disabled ? -1 : 1,
            style: hiddenGuard,
          })
        : null,
    ],
    !disabled &&
      import_react6.default.createElement(SideCar2, {
        id,
        sideCar: mediumSidecar,
        observed: realObserved,
        disabled,
        persistentFocus,
        crossFrame,
        autoFocus,
        whiteList,
        shards,
        onActivation,
        onDeactivation,
        returnFocus,
        focusOptions,
        noFocusGuards,
      }),
    import_react6.default.createElement(
      Container,
      _extends(
        {
          ref: mergedRef,
        },
        lockProps,
        {
          className,
          onBlur: onBlur3,
          onFocus: onFocus3,
        }
      ),
      import_react6.default.createElement(
        focusScope.Provider,
        {
          value: focusScopeValue,
        },
        children
      )
    ),
    hasTailingGuards &&
      import_react6.default.createElement('div', {
        'data-focus-guard': true,
        tabIndex: disabled ? -1 : 0,
        style: hiddenGuard,
      })
  );
});
FocusLock.propTypes = true
  ? {
      children: import_prop_types2.node,
      disabled: import_prop_types2.bool,
      returnFocus: (0, import_prop_types2.oneOfType)([
        import_prop_types2.bool,
        import_prop_types2.object,
        import_prop_types2.func,
      ]),
      focusOptions: import_prop_types2.object,
      noFocusGuards: import_prop_types2.bool,
      hasPositiveIndices: import_prop_types2.bool,
      allowTextSelection: import_prop_types2.bool,
      autoFocus: import_prop_types2.bool,
      persistentFocus: import_prop_types2.bool,
      crossFrame: import_prop_types2.bool,
      group: import_prop_types2.string,
      className: import_prop_types2.string,
      whiteList: import_prop_types2.func,
      shards: (0, import_prop_types2.arrayOf)(import_prop_types2.any),
      as: (0, import_prop_types2.oneOfType)([
        import_prop_types2.string,
        import_prop_types2.func,
        import_prop_types2.object,
      ]),
      lockProps: import_prop_types2.object,
      onActivation: import_prop_types2.func,
      onDeactivation: import_prop_types2.func,
      sideCar: import_prop_types2.any.isRequired,
    }
  : {};
var Lock_default = FocusLock;

// ../../node_modules/react-focus-lock/dist/es2015/AutoFocusInside.js
var import_react7 = __toESM(require_react());
var import_prop_types3 = __toESM(require_prop_types());

// ../../node_modules/react-focus-lock/dist/es2015/util.js
function deferAction(action) {
  setTimeout(action, 1);
}
var inlineProp = function inlineProp2(name, value) {
  var obj = {};
  obj[name] = value;
  return obj;
};
var extractRef = function extractRef2(ref) {
  return ref && 'current' in ref ? ref.current : ref;
};

// ../../node_modules/react-focus-lock/dist/es2015/AutoFocusInside.js
var AutoFocusInside = function AutoFocusInside2(_ref) {
  var _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    children = _ref.children,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? void 0 : _ref$className;
  return import_react7.default.createElement(
    'div',
    _extends({}, inlineProp(FOCUS_AUTO, !disabled), {
      className,
    }),
    children
  );
};
AutoFocusInside.propTypes = true
  ? {
      children: import_prop_types3.default.node.isRequired,
      disabled: import_prop_types3.default.bool,
      className: import_prop_types3.default.string,
    }
  : {};
var AutoFocusInside_default = AutoFocusInside;

// ../../node_modules/react-focus-lock/dist/es2015/MoveFocusInside.js
var import_react8 = __toESM(require_react());
var import_prop_types4 = __toESM(require_prop_types());
var useFocusInside = function useFocusInside2(observedRef) {
  (0, import_react8.useEffect)(
    function () {
      var enabled = true;
      mediumEffect.useMedium(function (car) {
        var observed = observedRef && observedRef.current;
        if (enabled && observed) {
          if (!car.focusInside(observed)) {
            car.moveFocusInside(observed, null);
          }
        }
      });
      return function () {
        enabled = false;
      };
    },
    [observedRef]
  );
};
function MoveFocusInside(_ref) {
  var _ref$disabled = _ref.disabled,
    isDisabled = _ref$disabled === void 0 ? false : _ref$disabled,
    className = _ref.className,
    children = _ref.children;
  var ref = (0, import_react8.useRef)(null);
  useFocusInside(isDisabled ? void 0 : ref);
  return import_react8.default.createElement(
    'div',
    _extends({}, inlineProp(FOCUS_AUTO, !isDisabled), {
      ref,
      className,
    }),
    children
  );
}
MoveFocusInside.propTypes = true
  ? {
      children: import_prop_types4.default.node.isRequired,
      disabled: import_prop_types4.default.bool,
      className: import_prop_types4.default.string,
    }
  : {};
var MoveFocusInside_default = MoveFocusInside;

// ../../node_modules/react-focus-lock/dist/es2015/FreeFocusInside.js
var import_react9 = __toESM(require_react());
var import_prop_types5 = __toESM(require_prop_types());
var FreeFocusInside = function FreeFocusInside2(_ref) {
  var children = _ref.children,
    className = _ref.className;
  return import_react9.default.createElement(
    'div',
    _extends({}, inlineProp(FOCUS_ALLOW, true), {
      className,
    }),
    children
  );
};
FreeFocusInside.propTypes = true
  ? {
      children: import_prop_types5.default.node.isRequired,
      className: import_prop_types5.default.string,
    }
  : {};

// ../../node_modules/react-focus-lock/dist/es2015/use-focus-scope.js
var import_react10 = __toESM(require_react());

// ../../node_modules/react-focus-lock/dist/es2015/use-focus-state.js
var import_react11 = __toESM(require_react());

// ../../node_modules/react-focus-lock/dist/es2015/nano-events.js
var createNanoEvents = function createNanoEvents2() {
  return {
    emit: function emit(event) {
      for (
        var _len = arguments.length,
          args = new Array(_len > 1 ? _len - 1 : 0),
          _key = 1;
        _key < _len;
        _key++
      ) {
        args[_key - 1] = arguments[_key];
      }
      for (
        var i = 0,
          callbacks = this.events[event] || [],
          length = callbacks.length;
        i < length;
        i++
      ) {
        callbacks[i].apply(callbacks, args);
      }
    },
    events: {},
    on: function on(event, cb) {
      var _this$events,
        _this = this;
      ((_this$events = this.events)[event] || (_this$events[event] = [])).push(
        cb
      );
      return function () {
        var _this$events$event;
        _this.events[event] =
          (_this$events$event = _this.events[event]) == null
            ? void 0
            : _this$events$event.filter(function (i) {
                return cb !== i;
              });
      };
    },
  };
};

// ../../node_modules/react-focus-lock/dist/es2015/use-focus-state.js
var mainbus = createNanoEvents();

// ../../node_modules/react-focus-lock/dist/es2015/UI.js
var UI_default = Lock_default;

// ../../node_modules/react-focus-on/dist/es2015/medium.js
var effectCar2 = createSidecarMedium();
var focusHiddenMarker = 'data-focus-on-hidden';

// ../../node_modules/react-focus-on/dist/es2015/reExports.js
var classNames = __assign({}, RemoveScroll.classNames);

// ../../node_modules/react-focus-on/dist/es2015/UI.js
var PREVENT_SCROLL = { preventScroll: true };
var FocusOn = React11.forwardRef(function (props, parentRef) {
  var _a = React11.useState(false),
    lockProps = _a[0],
    setLockProps = _a[1];
  var children = props.children,
    autoFocus = props.autoFocus,
    shards = props.shards,
    crossFrame = props.crossFrame,
    _b = props.enabled,
    enabled = _b === void 0 ? true : _b,
    _c = props.scrollLock,
    scrollLock = _c === void 0 ? true : _c,
    _d = props.focusLock,
    focusLock = _d === void 0 ? true : _d,
    _e = props.returnFocus,
    returnFocus = _e === void 0 ? true : _e,
    inert = props.inert,
    allowPinchZoom = props.allowPinchZoom,
    sideCar = props.sideCar,
    className = props.className,
    shouldIgnore = props.shouldIgnore,
    preventScrollOnFocus = props.preventScrollOnFocus,
    style = props.style,
    as = props.as,
    gapMode = props.gapMode,
    rest = __rest(props, [
      'children',
      'autoFocus',
      'shards',
      'crossFrame',
      'enabled',
      'scrollLock',
      'focusLock',
      'returnFocus',
      'inert',
      'allowPinchZoom',
      'sideCar',
      'className',
      'shouldIgnore',
      'preventScrollOnFocus',
      'style',
      'as',
      'gapMode',
    ]);
  var SideCar2 = sideCar;
  var onActivation = lockProps.onActivation,
    onDeactivation = lockProps.onDeactivation,
    restProps = __rest(lockProps, ['onActivation', 'onDeactivation']);
  var appliedLockProps = __assign(__assign({}, restProps), {
    as,
    style,
    sideCar,
    shards,
    allowPinchZoom,
    gapMode,
    inert,
    enabled: enabled && scrollLock,
  });
  return React11.createElement(
    React11.Fragment,
    null,
    React11.createElement(
      UI_default,
      {
        ref: parentRef,
        sideCar,
        disabled: !(lockProps && enabled && focusLock),
        returnFocus,
        autoFocus,
        shards,
        crossFrame,
        onActivation,
        onDeactivation,
        className,
        whiteList: shouldIgnore,
        lockProps: appliedLockProps,
        focusOptions: preventScrollOnFocus ? PREVENT_SCROLL : void 0,
        as: RemoveScroll,
      },
      children
    ),
    enabled &&
      React11.createElement(
        SideCar2,
        __assign({}, rest, { sideCar: effectCar2, setLockProps, shards })
      )
  );
});

// ../../node_modules/react-focus-lock/dist/es2015/Trap.js
var import_react13 = __toESM(require_react());
var import_prop_types6 = __toESM(require_prop_types());

// ../../node_modules/react-clientside-effect/lib/index.es.js
var import_react12 = __toESM(require_react());
function withSideEffect(reducePropsToState2, handleStateChangeOnClient2) {
  if (true) {
    if (typeof reducePropsToState2 !== 'function') {
      throw new Error('Expected reducePropsToState to be a function.');
    }
    if (typeof handleStateChangeOnClient2 !== 'function') {
      throw new Error('Expected handleStateChangeOnClient to be a function.');
    }
  }
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }
  return function wrap(WrappedComponent) {
    if (true) {
      if (typeof WrappedComponent !== 'function') {
        throw new Error('Expected WrappedComponent to be a React component.');
      }
    }
    var mountedInstances = [];
    var state;
    function emitChange() {
      state = reducePropsToState2(
        mountedInstances.map(function (instance) {
          return instance.props;
        })
      );
      handleStateChangeOnClient2(state);
    }
    var SideEffect = (function (_PureComponent) {
      _inheritsLoose(SideEffect2, _PureComponent);
      function SideEffect2() {
        return _PureComponent.apply(this, arguments) || this;
      }
      SideEffect2.peek = function peek() {
        return state;
      };
      var _proto = SideEffect2.prototype;
      _proto.componentDidMount = function componentDidMount() {
        mountedInstances.push(this);
        emitChange();
      };
      _proto.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };
      _proto.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };
      _proto.render = function render() {
        return import_react12.default.createElement(
          WrappedComponent,
          this.props
        );
      };
      return SideEffect2;
    })(import_react12.PureComponent);
    _defineProperty(
      SideEffect,
      'displayName',
      'SideEffect(' + getDisplayName(WrappedComponent) + ')'
    );
    return SideEffect;
  };
}
var index_es_default = withSideEffect;

// ../../node_modules/focus-lock/dist/es2015/utils/array.js
var toArray = function (a) {
  var ret = Array(a.length);
  for (var i = 0; i < a.length; ++i) {
    ret[i] = a[i];
  }
  return ret;
};
var asArray = function (a) {
  return Array.isArray(a) ? a : [a];
};
var getFirst = function (a) {
  return Array.isArray(a) ? a[0] : a;
};

// ../../node_modules/focus-lock/dist/es2015/utils/is.js
var isElementHidden = function (node2) {
  if (node2.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }
  var computedStyle = window.getComputedStyle(node2, null);
  if (!computedStyle || !computedStyle.getPropertyValue) {
    return false;
  }
  return (
    computedStyle.getPropertyValue('display') === 'none' ||
    computedStyle.getPropertyValue('visibility') === 'hidden'
  );
};
var getParentNode = function (node2) {
  return node2.parentNode &&
    node2.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      node2.parentNode.host
    : node2.parentNode;
};
var isTopNode = function (node2) {
  return node2 === document || (node2 && node2.nodeType === Node.DOCUMENT_NODE);
};
var isInert = function (node2) {
  return node2.hasAttribute('inert');
};
var isVisibleUncached = function (node2, checkParent) {
  return (
    !node2 ||
    isTopNode(node2) ||
    (!isElementHidden(node2) &&
      !isInert(node2) &&
      checkParent(getParentNode(node2)))
  );
};
var isVisibleCached = function (visibilityCache, node2) {
  var cached = visibilityCache.get(node2);
  if (cached !== void 0) {
    return cached;
  }
  var result = isVisibleUncached(
    node2,
    isVisibleCached.bind(void 0, visibilityCache)
  );
  visibilityCache.set(node2, result);
  return result;
};
var isAutoFocusAllowedUncached = function (node2, checkParent) {
  return node2 && !isTopNode(node2)
    ? isAutoFocusAllowed(node2)
      ? checkParent(getParentNode(node2))
      : false
    : true;
};
var isAutoFocusAllowedCached = function (cache, node2) {
  var cached = cache.get(node2);
  if (cached !== void 0) {
    return cached;
  }
  var result = isAutoFocusAllowedUncached(
    node2,
    isAutoFocusAllowedCached.bind(void 0, cache)
  );
  cache.set(node2, result);
  return result;
};
var getDataset = function (node2) {
  return node2.dataset;
};
var isHTMLButtonElement = function (node2) {
  return node2.tagName === 'BUTTON';
};
var isHTMLInputElement = function (node2) {
  return node2.tagName === 'INPUT';
};
var isRadioElement = function (node2) {
  return isHTMLInputElement(node2) && node2.type === 'radio';
};
var notHiddenInput = function (node2) {
  return !(
    (isHTMLInputElement(node2) || isHTMLButtonElement(node2)) &&
    (node2.type === 'hidden' || node2.disabled)
  );
};
var isAutoFocusAllowed = function (node2) {
  var attribute = node2.getAttribute(FOCUS_NO_AUTOFOCUS);
  return ![true, 'true', ''].includes(attribute);
};
var isGuard = function (node2) {
  var _a;
  return Boolean(
    node2 &&
      ((_a = getDataset(node2)) === null || _a === void 0
        ? void 0
        : _a.focusGuard)
  );
};
var isNotAGuard = function (node2) {
  return !isGuard(node2);
};
var isDefined = function (x) {
  return Boolean(x);
};

// ../../node_modules/focus-lock/dist/es2015/utils/tabOrder.js
var tabSort = function (a, b) {
  var aTab = Math.max(0, a.tabIndex);
  var bTab = Math.max(0, b.tabIndex);
  var tabDiff = aTab - bTab;
  var indexDiff = a.index - b.index;
  if (tabDiff) {
    if (!aTab) {
      return 1;
    }
    if (!bTab) {
      return -1;
    }
  }
  return tabDiff || indexDiff;
};
var getTabIndex = function (node2) {
  if (node2.tabIndex < 0) {
    if (!node2.hasAttribute('tabindex')) {
      return 0;
    }
  }
  return node2.tabIndex;
};
var orderByTabIndex = function (nodes, filterNegative, keepGuards) {
  return toArray(nodes)
    .map(function (node2, index) {
      var tabIndex = getTabIndex(node2);
      return {
        node: node2,
        index,
        tabIndex:
          keepGuards && tabIndex === -1
            ? (node2.dataset || {}).focusGuard
              ? 0
              : -1
            : tabIndex,
      };
    })
    .filter(function (data) {
      return !filterNegative || data.tabIndex >= 0;
    })
    .sort(tabSort);
};

// ../../node_modules/focus-lock/dist/es2015/utils/tabbables.js
var tabbables = [
  'button:enabled',
  'select:enabled',
  'textarea:enabled',
  'input:enabled',
  // elements with explicit roles will also use explicit tabindex
  // '[role="button"]',
  'a[href]',
  'area[href]',
  'summary',
  'iframe',
  'object',
  'embed',
  'audio[controls]',
  'video[controls]',
  '[tabindex]',
  '[contenteditable]',
  '[autofocus]',
];

// ../../node_modules/focus-lock/dist/es2015/utils/tabUtils.js
var queryTabbables = tabbables.join(',');
var queryGuardTabbables = ''.concat(queryTabbables, ', [data-focus-guard]');
var getFocusablesWithShadowDom = function (parent, withGuards) {
  return toArray((parent.shadowRoot || parent).children).reduce(function (
    acc,
    child
  ) {
    return acc.concat(
      child.matches(withGuards ? queryGuardTabbables : queryTabbables)
        ? [child]
        : [],
      getFocusablesWithShadowDom(child)
    );
  },
  []);
};
var getFocusablesWithIFrame = function (parent, withGuards) {
  var _a;
  if (
    parent instanceof HTMLIFrameElement &&
    ((_a = parent.contentDocument) === null || _a === void 0 ? void 0 : _a.body)
  ) {
    return getFocusables([parent.contentDocument.body], withGuards);
  }
  return [parent];
};
var getFocusables = function (parents, withGuards) {
  return parents.reduce(function (acc, parent) {
    var _a;
    var focusableWithShadowDom = getFocusablesWithShadowDom(parent, withGuards);
    var focusableWithIframes = (_a = []).concat.apply(
      _a,
      focusableWithShadowDom.map(function (node2) {
        return getFocusablesWithIFrame(node2, withGuards);
      })
    );
    return acc.concat(
      // add all tabbables inside and within shadow DOMs in DOM order
      focusableWithIframes,
      // add if node is tabbable itself
      parent.parentNode
        ? toArray(parent.parentNode.querySelectorAll(queryTabbables)).filter(
            function (node2) {
              return node2 === parent;
            }
          )
        : []
    );
  }, []);
};
var getParentAutofocusables = function (parent) {
  var parentFocus = parent.querySelectorAll('['.concat(FOCUS_AUTO, ']'));
  return toArray(parentFocus)
    .map(function (node2) {
      return getFocusables([node2]);
    })
    .reduce(function (acc, nodes) {
      return acc.concat(nodes);
    }, []);
};

// ../../node_modules/focus-lock/dist/es2015/utils/DOMutils.js
var filterFocusable = function (nodes, visibilityCache) {
  return toArray(nodes)
    .filter(function (node2) {
      return isVisibleCached(visibilityCache, node2);
    })
    .filter(function (node2) {
      return notHiddenInput(node2);
    });
};
var filterAutoFocusable = function (nodes, cache) {
  if (cache === void 0) {
    cache = /* @__PURE__ */ new Map();
  }
  return toArray(nodes).filter(function (node2) {
    return isAutoFocusAllowedCached(cache, node2);
  });
};
var getTabbableNodes = function (topNodes, visibilityCache, withGuards) {
  return orderByTabIndex(
    filterFocusable(getFocusables(topNodes, withGuards), visibilityCache),
    true,
    withGuards
  );
};
var getFocusableNodes = function (topNodes, visibilityCache) {
  return orderByTabIndex(
    filterFocusable(getFocusables(topNodes), visibilityCache),
    false
  );
};
var parentAutofocusables = function (topNode, visibilityCache) {
  return filterFocusable(getParentAutofocusables(topNode), visibilityCache);
};
var contains = function (scope, element) {
  if (scope.shadowRoot) {
    return contains(scope.shadowRoot, element);
  } else {
    if (
      Object.getPrototypeOf(scope).contains !== void 0 &&
      Object.getPrototypeOf(scope).contains.call(scope, element)
    ) {
      return true;
    }
    return toArray(scope.children).some(function (child) {
      var _a;
      if (child instanceof HTMLIFrameElement) {
        var iframeBody =
          (_a = child.contentDocument) === null || _a === void 0
            ? void 0
            : _a.body;
        if (iframeBody) {
          return contains(iframeBody, element);
        }
        return false;
      }
      return contains(child, element);
    });
  }
};

// ../../node_modules/focus-lock/dist/es2015/utils/all-affected.js
var filterNested = function (nodes) {
  var contained = /* @__PURE__ */ new Set();
  var l = nodes.length;
  for (var i = 0; i < l; i += 1) {
    for (var j = i + 1; j < l; j += 1) {
      var position = nodes[i].compareDocumentPosition(nodes[j]);
      if ((position & Node.DOCUMENT_POSITION_CONTAINED_BY) > 0) {
        contained.add(j);
      }
      if ((position & Node.DOCUMENT_POSITION_CONTAINS) > 0) {
        contained.add(i);
      }
    }
  }
  return nodes.filter(function (_, index) {
    return !contained.has(index);
  });
};
var getTopParent = function (node2) {
  return node2.parentNode ? getTopParent(node2.parentNode) : node2;
};
var getAllAffectedNodes = function (node2) {
  var nodes = asArray(node2);
  return nodes.filter(Boolean).reduce(function (acc, currentNode) {
    var group = currentNode.getAttribute(FOCUS_GROUP);
    acc.push.apply(
      acc,
      group
        ? filterNested(
            toArray(
              getTopParent(currentNode).querySelectorAll(
                '['
                  .concat(FOCUS_GROUP, '="')
                  .concat(group, '"]:not([')
                  .concat(FOCUS_DISABLED, '="disabled"])')
              )
            )
          )
        : [currentNode]
    );
    return acc;
  }, []);
};

// ../../node_modules/focus-lock/dist/es2015/utils/safe.js
var safeProbe = function (cb) {
  try {
    return cb();
  } catch (e) {
    return void 0;
  }
};

// ../../node_modules/focus-lock/dist/es2015/utils/getActiveElement.js
var getActiveElement = function (inDocument) {
  if (inDocument === void 0) {
    inDocument = document;
  }
  if (!inDocument || !inDocument.activeElement) {
    return void 0;
  }
  var activeElement = inDocument.activeElement;
  return activeElement.shadowRoot
    ? getActiveElement(activeElement.shadowRoot)
    : activeElement instanceof HTMLIFrameElement &&
      safeProbe(function () {
        return activeElement.contentWindow.document;
      })
    ? getActiveElement(activeElement.contentWindow.document)
    : activeElement;
};

// ../../node_modules/focus-lock/dist/es2015/focusInside.js
var focusInFrame = function (frame, activeElement) {
  return frame === activeElement;
};
var focusInsideIframe = function (topNode, activeElement) {
  return Boolean(
    toArray(topNode.querySelectorAll('iframe')).some(function (node2) {
      return focusInFrame(node2, activeElement);
    })
  );
};
var focusInside = function (topNode, activeElement) {
  if (activeElement === void 0) {
    activeElement = getActiveElement(getFirst(topNode).ownerDocument);
  }
  if (
    !activeElement ||
    (activeElement.dataset && activeElement.dataset.focusGuard)
  ) {
    return false;
  }
  return getAllAffectedNodes(topNode).some(function (node2) {
    return (
      contains(node2, activeElement) || focusInsideIframe(node2, activeElement)
    );
  });
};

// ../../node_modules/focus-lock/dist/es2015/focusIsHidden.js
var focusIsHidden = function (inDocument) {
  if (inDocument === void 0) {
    inDocument = document;
  }
  var activeElement = getActiveElement(inDocument);
  if (!activeElement) {
    return false;
  }
  return toArray(
    inDocument.querySelectorAll('['.concat(FOCUS_ALLOW, ']'))
  ).some(function (node2) {
    return contains(node2, activeElement);
  });
};

// ../../node_modules/focus-lock/dist/es2015/utils/correctFocus.js
var findSelectedRadio = function (node2, nodes) {
  return (
    nodes
      .filter(isRadioElement)
      .filter(function (el) {
        return el.name === node2.name;
      })
      .filter(function (el) {
        return el.checked;
      })[0] || node2
  );
};
var correctNode = function (node2, nodes) {
  if (isRadioElement(node2) && node2.name) {
    return findSelectedRadio(node2, nodes);
  }
  return node2;
};
var correctNodes = function (nodes) {
  var resultSet = /* @__PURE__ */ new Set();
  nodes.forEach(function (node2) {
    return resultSet.add(correctNode(node2, nodes));
  });
  return nodes.filter(function (node2) {
    return resultSet.has(node2);
  });
};

// ../../node_modules/focus-lock/dist/es2015/utils/firstFocus.js
var pickFirstFocus = function (nodes) {
  if (nodes[0] && nodes.length > 1) {
    return correctNode(nodes[0], nodes);
  }
  return nodes[0];
};
var pickFocusable = function (nodes, node2) {
  return nodes.indexOf(correctNode(node2, nodes));
};

// ../../node_modules/focus-lock/dist/es2015/solver.js
var NEW_FOCUS = 'NEW_FOCUS';
var newFocus = function (
  innerNodes,
  innerTabbables,
  outerNodes,
  activeElement,
  lastNode
) {
  var cnt = innerNodes.length;
  var firstFocus = innerNodes[0];
  var lastFocus = innerNodes[cnt - 1];
  var isOnGuard = isGuard(activeElement);
  if (activeElement && innerNodes.indexOf(activeElement) >= 0) {
    return void 0;
  }
  var activeIndex =
    activeElement !== void 0 ? outerNodes.indexOf(activeElement) : -1;
  var lastIndex = lastNode ? outerNodes.indexOf(lastNode) : activeIndex;
  var lastNodeInside = lastNode ? innerNodes.indexOf(lastNode) : -1;
  if (activeIndex === -1) {
    if (lastNodeInside !== -1) {
      return lastNodeInside;
    }
    return NEW_FOCUS;
  }
  if (lastNodeInside === -1) {
    return NEW_FOCUS;
  }
  var indexDiff = activeIndex - lastIndex;
  var firstNodeIndex = outerNodes.indexOf(firstFocus);
  var lastNodeIndex = outerNodes.indexOf(lastFocus);
  var correctedNodes = correctNodes(outerNodes);
  var currentFocusableIndex =
    activeElement !== void 0 ? correctedNodes.indexOf(activeElement) : -1;
  var previousFocusableIndex = lastNode
    ? correctedNodes.indexOf(lastNode)
    : currentFocusableIndex;
  var tabbableNodes = correctedNodes.filter(function (node2) {
    return node2.tabIndex >= 0;
  });
  var currentTabbableIndex =
    activeElement !== void 0 ? tabbableNodes.indexOf(activeElement) : -1;
  var previousTabbableIndex = lastNode
    ? tabbableNodes.indexOf(lastNode)
    : currentTabbableIndex;
  var focusIndexDiff =
    currentTabbableIndex >= 0 && previousTabbableIndex >= 0
      ? // old/new are tabbables, measure distance in tabbable space
        previousTabbableIndex - currentTabbableIndex
      : // or else measure in focusable space
        previousFocusableIndex - currentFocusableIndex;
  if (!indexDiff && lastNodeInside >= 0) {
    return lastNodeInside;
  }
  if (innerTabbables.length === 0) {
    return lastNodeInside;
  }
  var returnFirstNode = pickFocusable(innerNodes, innerTabbables[0]);
  var returnLastNode = pickFocusable(
    innerNodes,
    innerTabbables[innerTabbables.length - 1]
  );
  if (activeIndex <= firstNodeIndex && isOnGuard && Math.abs(indexDiff) > 1) {
    return returnLastNode;
  }
  if (activeIndex >= lastNodeIndex && isOnGuard && Math.abs(indexDiff) > 1) {
    return returnFirstNode;
  }
  if (indexDiff && Math.abs(focusIndexDiff) > 1) {
    return lastNodeInside;
  }
  if (activeIndex <= firstNodeIndex) {
    return returnLastNode;
  }
  if (activeIndex > lastNodeIndex) {
    return returnFirstNode;
  }
  if (indexDiff) {
    if (Math.abs(indexDiff) > 1) {
      return lastNodeInside;
    }
    return (cnt + lastNodeInside + indexDiff) % cnt;
  }
  return void 0;
};

// ../../node_modules/focus-lock/dist/es2015/utils/auto-focus.js
var findAutoFocused = function (autoFocusables) {
  return function (node2) {
    var _a;
    var autofocus =
      (_a = getDataset(node2)) === null || _a === void 0
        ? void 0
        : _a.autofocus;
    return (
      // @ts-expect-error
      node2.autofocus || //
      (autofocus !== void 0 && autofocus !== 'false') || //
      autoFocusables.indexOf(node2) >= 0
    );
  };
};
var pickAutofocus = function (nodesIndexes, orderedNodes, groups) {
  var nodes = nodesIndexes.map(function (_a) {
    var node2 = _a.node;
    return node2;
  });
  var autoFocusable = filterAutoFocusable(
    nodes.filter(findAutoFocused(groups))
  );
  if (autoFocusable && autoFocusable.length) {
    return pickFirstFocus(autoFocusable);
  }
  return pickFirstFocus(filterAutoFocusable(orderedNodes));
};

// ../../node_modules/focus-lock/dist/es2015/utils/parenting.js
var getParents = function (node2, parents) {
  if (parents === void 0) {
    parents = [];
  }
  parents.push(node2);
  if (node2.parentNode) {
    getParents(node2.parentNode.host || node2.parentNode, parents);
  }
  return parents;
};
var getCommonParent = function (nodeA, nodeB) {
  var parentsA = getParents(nodeA);
  var parentsB = getParents(nodeB);
  for (var i = 0; i < parentsA.length; i += 1) {
    var currentParent = parentsA[i];
    if (parentsB.indexOf(currentParent) >= 0) {
      return currentParent;
    }
  }
  return false;
};
var getTopCommonParent = function (baseActiveElement, leftEntry, rightEntries) {
  var activeElements = asArray(baseActiveElement);
  var leftEntries = asArray(leftEntry);
  var activeElement = activeElements[0];
  var topCommon = false;
  leftEntries.filter(Boolean).forEach(function (entry) {
    topCommon = getCommonParent(topCommon || entry, entry) || topCommon;
    rightEntries.filter(Boolean).forEach(function (subEntry) {
      var common = getCommonParent(activeElement, subEntry);
      if (common) {
        if (!topCommon || contains(common, topCommon)) {
          topCommon = common;
        } else {
          topCommon = getCommonParent(common, topCommon);
        }
      }
    });
  });
  return topCommon;
};
var allParentAutofocusables = function (entries, visibilityCache) {
  return entries.reduce(function (acc, node2) {
    return acc.concat(parentAutofocusables(node2, visibilityCache));
  }, []);
};

// ../../node_modules/focus-lock/dist/es2015/focusSolver.js
var reorderNodes = function (srcNodes, dstNodes) {
  var remap = /* @__PURE__ */ new Map();
  dstNodes.forEach(function (entity) {
    return remap.set(entity.node, entity);
  });
  return srcNodes
    .map(function (node2) {
      return remap.get(node2);
    })
    .filter(isDefined);
};
var focusSolver = function (topNode, lastNode) {
  var activeElement = getActiveElement(
    asArray(topNode).length > 0 ? document : getFirst(topNode).ownerDocument
  );
  var entries = getAllAffectedNodes(topNode).filter(isNotAGuard);
  var commonParent = getTopCommonParent(
    activeElement || topNode,
    topNode,
    entries
  );
  var visibilityCache = /* @__PURE__ */ new Map();
  var anyFocusable = getFocusableNodes(entries, visibilityCache);
  var innerElements = anyFocusable.filter(function (_a) {
    var node2 = _a.node;
    return isNotAGuard(node2);
  });
  if (!innerElements[0]) {
    return void 0;
  }
  var outerNodes = getFocusableNodes([commonParent], visibilityCache).map(
    function (_a) {
      var node2 = _a.node;
      return node2;
    }
  );
  var orderedInnerElements = reorderNodes(outerNodes, innerElements);
  var innerFocusables = orderedInnerElements.map(function (_a) {
    var node2 = _a.node;
    return node2;
  });
  var innerTabbable = orderedInnerElements
    .filter(function (_a) {
      var tabIndex = _a.tabIndex;
      return tabIndex >= 0;
    })
    .map(function (_a) {
      var node2 = _a.node;
      return node2;
    });
  var newId = newFocus(
    innerFocusables,
    innerTabbable,
    outerNodes,
    activeElement,
    lastNode
  );
  if (newId === NEW_FOCUS) {
    var focusNode =
      // first try only tabbable, and the fallback to all focusable, as long as at least one element should be picked for focus
      pickAutofocus(
        anyFocusable,
        innerTabbable,
        allParentAutofocusables(entries, visibilityCache)
      ) ||
      pickAutofocus(
        anyFocusable,
        innerFocusables,
        allParentAutofocusables(entries, visibilityCache)
      );
    if (focusNode) {
      return { node: focusNode };
    } else {
      console.warn('focus-lock: cannot find any node to move focus into');
      return void 0;
    }
  }
  if (newId === void 0) {
    return newId;
  }
  return orderedInnerElements[newId];
};

// ../../node_modules/focus-lock/dist/es2015/focusables.js
var expandFocusableNodes = function (topNode) {
  var entries = getAllAffectedNodes(topNode).filter(isNotAGuard);
  var commonParent = getTopCommonParent(topNode, topNode, entries);
  var outerNodes = orderByTabIndex(
    getFocusables([commonParent], true),
    true,
    true
  );
  var innerElements = getFocusables(entries, false);
  return outerNodes.map(function (_a) {
    var node2 = _a.node,
      index = _a.index;
    return {
      node: node2,
      index,
      lockItem: innerElements.indexOf(node2) >= 0,
      guard: isGuard(node2),
    };
  });
};

// ../../node_modules/focus-lock/dist/es2015/commands.js
var focusOn = function (target, focusOptions) {
  if (!target) {
    return;
  }
  if ('focus' in target) {
    target.focus(focusOptions);
  }
  if ('contentWindow' in target && target.contentWindow) {
    target.contentWindow.focus();
  }
};

// ../../node_modules/focus-lock/dist/es2015/moveFocusInside.js
var guardCount = 0;
var lockDisabled = false;
var moveFocusInside = function (topNode, lastNode, options) {
  if (options === void 0) {
    options = {};
  }
  var focusable = focusSolver(topNode, lastNode);
  if (lockDisabled) {
    return;
  }
  if (focusable) {
    if (guardCount > 2) {
      console.error(
        'FocusLock: focus-fighting detected. Only one focus management system could be active. See https://github.com/theKashey/focus-lock/#focus-fighting'
      );
      lockDisabled = true;
      setTimeout(function () {
        lockDisabled = false;
      }, 1);
      return;
    }
    guardCount++;
    focusOn(focusable.node, options.focusOptions);
    guardCount--;
  }
};

// ../../node_modules/focus-lock/dist/es2015/return-focus.js
function weakRef(value) {
  if (!value) return null;
  if (typeof WeakRef === 'undefined') {
    return function () {
      return value || null;
    };
  }
  var w = value ? new WeakRef(value) : null;
  return function () {
    return (w === null || w === void 0 ? void 0 : w.deref()) || null;
  };
}
var recordElementLocation = function (element) {
  if (!element) {
    return null;
  }
  var stack = [];
  var currentElement = element;
  while (currentElement && currentElement !== document.body) {
    stack.push({
      current: weakRef(currentElement),
      parent: weakRef(currentElement.parentElement),
      left: weakRef(currentElement.previousElementSibling),
      right: weakRef(currentElement.nextElementSibling),
    });
    currentElement = currentElement.parentElement;
  }
  return {
    element: weakRef(element),
    stack,
    ownerDocument: element.ownerDocument,
  };
};
var restoreFocusTo = function (location) {
  var _a, _b, _c, _d, _e;
  if (!location) {
    return void 0;
  }
  var stack = location.stack,
    ownerDocument = location.ownerDocument;
  var visibilityCache = /* @__PURE__ */ new Map();
  for (var _i = 0, stack_1 = stack; _i < stack_1.length; _i++) {
    var line = stack_1[_i];
    var parent_1 =
      (_a = line.parent) === null || _a === void 0 ? void 0 : _a.call(line);
    if (parent_1 && ownerDocument.contains(parent_1)) {
      var left =
        (_b = line.left) === null || _b === void 0 ? void 0 : _b.call(line);
      var savedCurrent = line.current();
      var current = parent_1.contains(savedCurrent) ? savedCurrent : void 0;
      var right =
        (_c = line.right) === null || _c === void 0 ? void 0 : _c.call(line);
      var focusables = getTabbableNodes([parent_1], visibilityCache);
      var aim =
        // that is element itself
        (_e =
          (_d =
            current !== null && current !== void 0
              ? current
              : // or something in it's place
              left === null || left === void 0
              ? void 0
              : left.nextElementSibling) !== null && _d !== void 0
            ? _d
            : // or somebody to the right, still close enough
              right) !== null && _e !== void 0
          ? _e
          : // or somebody to the left, something?
            left;
      while (aim) {
        for (
          var _f = 0, focusables_1 = focusables;
          _f < focusables_1.length;
          _f++
        ) {
          var focusable = focusables_1[_f];
          if (
            aim === null || aim === void 0
              ? void 0
              : aim.contains(focusable.node)
          ) {
            return focusable.node;
          }
        }
        aim = aim.nextElementSibling;
      }
      if (focusables.length) {
        return focusables[0].node;
      }
    }
  }
  return void 0;
};
var captureFocusRestore = function (targetElement) {
  var location = recordElementLocation(targetElement);
  return function () {
    return restoreFocusTo(location);
  };
};

// ../../node_modules/focus-lock/dist/es2015/sibling.js
var getRelativeFocusable = function (element, scope, useTabbables) {
  if (!element || !scope) {
    console.error('no element or scope given');
    return {};
  }
  var shards = asArray(scope);
  if (
    shards.every(function (shard) {
      return !contains(shard, element);
    })
  ) {
    console.error('Active element is not contained in the scope');
    return {};
  }
  var focusables = useTabbables
    ? getTabbableNodes(shards, /* @__PURE__ */ new Map())
    : getFocusableNodes(shards, /* @__PURE__ */ new Map());
  var current = focusables.findIndex(function (_a) {
    var node2 = _a.node;
    return node2 === element;
  });
  if (current === -1) {
    return void 0;
  }
  return {
    prev: focusables[current - 1],
    next: focusables[current + 1],
    first: focusables[0],
    last: focusables[focusables.length - 1],
  };
};
var getBoundary = function (shards, useTabbables) {
  var set = useTabbables
    ? getTabbableNodes(asArray(shards), /* @__PURE__ */ new Map())
    : getFocusableNodes(asArray(shards), /* @__PURE__ */ new Map());
  return {
    first: set[0],
    last: set[set.length - 1],
  };
};
var defaultOptions = function (options) {
  return Object.assign(
    {
      scope: document.body,
      cycle: true,
      onlyTabbable: true,
    },
    options
  );
};
var moveFocus = function (fromElement, options, cb) {
  if (options === void 0) {
    options = {};
  }
  var newOptions = defaultOptions(options);
  var solution = getRelativeFocusable(
    fromElement,
    newOptions.scope,
    newOptions.onlyTabbable
  );
  if (!solution) {
    return;
  }
  var target = cb(solution, newOptions.cycle);
  if (target) {
    focusOn(target.node, newOptions.focusOptions);
  }
};
var focusNextElement = function (fromElement, options) {
  if (options === void 0) {
    options = {};
  }
  moveFocus(fromElement, options, function (_a, cycle) {
    var next = _a.next,
      first = _a.first;
    return next || (cycle && first);
  });
};
var focusPrevElement = function (fromElement, options) {
  if (options === void 0) {
    options = {};
  }
  moveFocus(fromElement, options, function (_a, cycle) {
    var prev = _a.prev,
      last = _a.last;
    return prev || (cycle && last);
  });
};
var pickBoundary = function (scope, options, what) {
  var _a;
  var boundary = getBoundary(
    scope,
    (_a = options.onlyTabbable) !== null && _a !== void 0 ? _a : true
  );
  var node2 = boundary[what];
  if (node2) {
    focusOn(node2.node, options.focusOptions);
  }
};
var focusFirstElement = function (scope, options) {
  if (options === void 0) {
    options = {};
  }
  pickBoundary(scope, options, 'first');
};
var focusLastElement = function (scope, options) {
  if (options === void 0) {
    options = {};
  }
  pickBoundary(scope, options, 'last');
};

// ../../node_modules/react-focus-lock/dist/es2015/Trap.js
var focusOnBody = function focusOnBody2() {
  return document && document.activeElement === document.body;
};
var isFreeFocus = function isFreeFocus2() {
  return focusOnBody() || focusIsHidden();
};
var lastActiveTrap = null;
var lastActiveFocus = null;
var tryRestoreFocus = function tryRestoreFocus2() {
  return null;
};
var lastPortaledElement = null;
var focusWasOutsideWindow = false;
var windowFocused = false;
var defaultWhitelist = function defaultWhitelist2() {
  return true;
};
var focusWhitelisted = function focusWhitelisted2(activeElement) {
  return (lastActiveTrap.whiteList || defaultWhitelist)(activeElement);
};
var recordPortal = function recordPortal2(observerNode, portaledElement) {
  lastPortaledElement = {
    observerNode,
    portaledElement,
  };
};
var focusIsPortaledPair = function focusIsPortaledPair2(element) {
  return lastPortaledElement && lastPortaledElement.portaledElement === element;
};
function autoGuard(startIndex, end, step, allNodes) {
  var lastGuard = null;
  var i = startIndex;
  do {
    var item = allNodes[i];
    if (item.guard) {
      if (item.node.dataset.focusAutoGuard) {
        lastGuard = item;
      }
    } else if (item.lockItem) {
      if (i !== startIndex) {
        return;
      }
      lastGuard = null;
    } else {
      break;
    }
  } while ((i += step) !== end);
  if (lastGuard) {
    lastGuard.node.tabIndex = 0;
  }
}
var focusWasOutside = function focusWasOutside2(crossFrameOption) {
  if (crossFrameOption) {
    return Boolean(focusWasOutsideWindow);
  }
  return focusWasOutsideWindow === 'meanwhile';
};
var checkInHost = function checkInHost2(check, el, boundary) {
  return (
    el &&
    ((el.host === check &&
      (!el.activeElement || boundary.contains(el.activeElement))) ||
      (el.parentNode && checkInHost2(check, el.parentNode, boundary)))
  );
};
var withinHost = function withinHost2(activeElement, workingArea) {
  return workingArea.some(function (area) {
    return checkInHost(activeElement, area, area);
  });
};
var getNodeFocusables = function getNodeFocusables2(nodes) {
  return getFocusableNodes(nodes, /* @__PURE__ */ new Map());
};
var isNotFocusable = function isNotFocusable2(node2) {
  return !getNodeFocusables([node2.parentNode]).some(function (el) {
    return el.node === node2;
  });
};
var activateTrap = function activateTrap2() {
  var result = false;
  if (lastActiveTrap) {
    var _lastActiveTrap = lastActiveTrap,
      observed = _lastActiveTrap.observed,
      persistentFocus = _lastActiveTrap.persistentFocus,
      autoFocus = _lastActiveTrap.autoFocus,
      shards = _lastActiveTrap.shards,
      crossFrame = _lastActiveTrap.crossFrame,
      focusOptions = _lastActiveTrap.focusOptions,
      noFocusGuards = _lastActiveTrap.noFocusGuards;
    var workingNode =
      observed || (lastPortaledElement && lastPortaledElement.portaledElement);
    if (focusOnBody() && lastActiveFocus && lastActiveFocus !== document.body) {
      if (
        !document.body.contains(lastActiveFocus) ||
        isNotFocusable(lastActiveFocus)
      ) {
        var newTarget = tryRestoreFocus();
        if (newTarget) {
          newTarget.focus();
        }
      }
    }
    var activeElement = document && document.activeElement;
    if (workingNode) {
      var workingArea = [workingNode].concat(
        shards.map(extractRef).filter(Boolean)
      );
      var shouldForceRestoreFocus = function shouldForceRestoreFocus2() {
        if (
          !focusWasOutside(crossFrame) ||
          !noFocusGuards ||
          !lastActiveFocus ||
          windowFocused
        ) {
          return false;
        }
        var nodes = getNodeFocusables(workingArea);
        var lastIndex = nodes.findIndex(function (_ref) {
          var node2 = _ref.node;
          return node2 === lastActiveFocus;
        });
        return lastIndex === 0 || lastIndex === nodes.length - 1;
      };
      if (!activeElement || focusWhitelisted(activeElement)) {
        if (
          persistentFocus ||
          shouldForceRestoreFocus() ||
          !isFreeFocus() ||
          (!lastActiveFocus && autoFocus)
        ) {
          if (
            workingNode &&
            !(
              focusInside(workingArea) ||
              (activeElement && withinHost(activeElement, workingArea)) ||
              focusIsPortaledPair(activeElement, workingNode)
            )
          ) {
            if (document && !lastActiveFocus && activeElement && !autoFocus) {
              if (activeElement.blur) {
                activeElement.blur();
              }
              document.body.focus();
            } else {
              result = moveFocusInside(workingArea, lastActiveFocus, {
                focusOptions,
              });
              lastPortaledElement = {};
            }
          }
          lastActiveFocus = document && document.activeElement;
          if (lastActiveFocus !== document.body) {
            tryRestoreFocus = captureFocusRestore(lastActiveFocus);
          }
          focusWasOutsideWindow = false;
        }
      }
      if (
        document &&
        activeElement !== document.activeElement &&
        document.querySelector('[data-focus-auto-guard]')
      ) {
        var newActiveElement = document && document.activeElement;
        var allNodes = expandFocusableNodes(workingArea);
        var focusedIndex = allNodes
          .map(function (_ref2) {
            var node2 = _ref2.node;
            return node2;
          })
          .indexOf(newActiveElement);
        if (focusedIndex > -1) {
          allNodes
            .filter(function (_ref3) {
              var guard = _ref3.guard,
                node2 = _ref3.node;
              return guard && node2.dataset.focusAutoGuard;
            })
            .forEach(function (_ref4) {
              var node2 = _ref4.node;
              return node2.removeAttribute('tabIndex');
            });
          autoGuard(focusedIndex, allNodes.length, 1, allNodes);
          autoGuard(focusedIndex, -1, -1, allNodes);
        }
      }
    }
  }
  return result;
};
var onTrap = function onTrap2(event) {
  if (activateTrap() && event) {
    event.stopPropagation();
    event.preventDefault();
  }
};
var onBlur = function onBlur2() {
  return deferAction(activateTrap);
};
var onFocus = function onFocus2(event) {
  var source = event.target;
  var currentNode = event.currentTarget;
  if (!currentNode.contains(source)) {
    recordPortal(currentNode, source);
  }
};
var FocusWatcher = function FocusWatcher2() {
  return null;
};
var FocusTrap = function FocusTrap2(_ref5) {
  var children = _ref5.children;
  return import_react13.default.createElement(
    'div',
    {
      onBlur,
      onFocus,
    },
    children
  );
};
FocusTrap.propTypes = true
  ? {
      children: import_prop_types6.default.node.isRequired,
    }
  : {};
var onWindowFocus = function onWindowFocus2() {
  windowFocused = true;
};
var onWindowBlur = function onWindowBlur2() {
  windowFocused = false;
  focusWasOutsideWindow = 'just';
  deferAction(function () {
    focusWasOutsideWindow = 'meanwhile';
  });
};
var attachHandler = function attachHandler2() {
  document.addEventListener('focusin', onTrap);
  document.addEventListener('focusout', onBlur);
  window.addEventListener('focus', onWindowFocus);
  window.addEventListener('blur', onWindowBlur);
};
var detachHandler = function detachHandler2() {
  document.removeEventListener('focusin', onTrap);
  document.removeEventListener('focusout', onBlur);
  window.removeEventListener('focus', onWindowFocus);
  window.removeEventListener('blur', onWindowBlur);
};
function reducePropsToState(propsList) {
  return propsList.filter(function (_ref6) {
    var disabled = _ref6.disabled;
    return !disabled;
  });
}
var focusLockAPI = {
  moveFocusInside,
  focusInside,
  focusNextElement,
  focusPrevElement,
  focusFirstElement,
  focusLastElement,
  captureFocusRestore,
};
function handleStateChangeOnClient(traps) {
  var trap = traps.slice(-1)[0];
  if (trap && !lastActiveTrap) {
    attachHandler();
  }
  var lastTrap = lastActiveTrap;
  var sameTrap = lastTrap && trap && trap.id === lastTrap.id;
  lastActiveTrap = trap;
  if (lastTrap && !sameTrap) {
    lastTrap.onDeactivation();
    if (
      !traps.filter(function (_ref7) {
        var id = _ref7.id;
        return id === lastTrap.id;
      }).length
    ) {
      lastTrap.returnFocus(!trap);
    }
  }
  if (trap) {
    lastActiveFocus = null;
    if (!sameTrap || lastTrap.observed !== trap.observed) {
      trap.onActivation(focusLockAPI);
    }
    activateTrap(true);
    deferAction(activateTrap);
  } else {
    detachHandler();
    lastActiveFocus = null;
  }
}
mediumFocus.assignSyncMedium(onFocus);
mediumBlur.assignMedium(onBlur);
mediumEffect.assignMedium(function (cb) {
  return cb(focusLockAPI);
});
var Trap_default = index_es_default(
  reducePropsToState,
  handleStateChangeOnClient
)(FocusWatcher);

// ../../node_modules/react-focus-lock/dist/es2015/sidecar.js
var sidecar_default = exportSidecar(mediumSidecar, Trap_default);

// ../../node_modules/react-remove-scroll/dist/es2015/SideEffect.js
var React16 = __toESM(require_react());

// ../../node_modules/react-remove-scroll-bar/dist/es2015/component.js
var React15 = __toESM(require_react());

// ../../node_modules/react-style-singleton/dist/es2015/hook.js
var React14 = __toESM(require_react());

// ../../node_modules/react-style-singleton/dist/es2015/singleton.js
function makeStyleTag() {
  if (!document) return null;
  var tag = document.createElement('style');
  tag.type = 'text/css';
  var nonce = getNonce();
  if (nonce) {
    tag.setAttribute('nonce', nonce);
  }
  return tag;
}
function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}
function insertStyleTag(tag) {
  var head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(tag);
}
var stylesheetSingleton = function () {
  var counter = 0;
  var stylesheet = null;
  return {
    add: function (style) {
      if (counter == 0) {
        if ((stylesheet = makeStyleTag())) {
          injectStyles(stylesheet, style);
          insertStyleTag(stylesheet);
        }
      }
      counter++;
    },
    remove: function () {
      counter--;
      if (!counter && stylesheet) {
        stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
        stylesheet = null;
      }
    },
  };
};

// ../../node_modules/react-style-singleton/dist/es2015/hook.js
var styleHookSingleton = function () {
  var sheet = stylesheetSingleton();
  return function (styles2, isDynamic) {
    React14.useEffect(
      function () {
        sheet.add(styles2);
        return function () {
          sheet.remove();
        };
      },
      [styles2 && isDynamic]
    );
  };
};

// ../../node_modules/react-style-singleton/dist/es2015/component.js
var styleSingleton = function () {
  var useStyle = styleHookSingleton();
  var Sheet = function (_a) {
    var styles2 = _a.styles,
      dynamic = _a.dynamic;
    useStyle(styles2, dynamic);
    return null;
  };
  return Sheet;
};

// ../../node_modules/react-remove-scroll-bar/dist/es2015/utils.js
var zeroGap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0,
};
var parse = function (x) {
  return parseInt(x || '', 10) || 0;
};
var getOffset = function (gapMode) {
  var cs = window.getComputedStyle(document.body);
  var left = cs[gapMode === 'padding' ? 'paddingLeft' : 'marginLeft'];
  var top = cs[gapMode === 'padding' ? 'paddingTop' : 'marginTop'];
  var right = cs[gapMode === 'padding' ? 'paddingRight' : 'marginRight'];
  return [parse(left), parse(top), parse(right)];
};
var getGapWidth = function (gapMode) {
  if (gapMode === void 0) {
    gapMode = 'margin';
  }
  if (typeof window === 'undefined') {
    return zeroGap;
  }
  var offsets = getOffset(gapMode);
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;
  return {
    left: offsets[0],
    top: offsets[1],
    right: offsets[2],
    gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0]),
  };
};

// ../../node_modules/react-remove-scroll-bar/dist/es2015/component.js
var Style = styleSingleton();
var lockAttribute = 'data-scroll-locked';
var getStyles = function (_a, allowRelative, gapMode, important) {
  var left = _a.left,
    top = _a.top,
    right = _a.right,
    gap = _a.gap;
  if (gapMode === void 0) {
    gapMode = 'margin';
  }
  return '\n  .'
    .concat(noScrollbarsClassName, ' {\n   overflow: hidden ')
    .concat(important, ';\n   padding-right: ')
    .concat(gap, 'px ')
    .concat(important, ';\n  }\n  body[')
    .concat(lockAttribute, '] {\n    overflow: hidden ')
    .concat(important, ';\n    overscroll-behavior: contain;\n    ')
    .concat(
      [
        allowRelative && 'position: relative '.concat(important, ';'),
        gapMode === 'margin' &&
          '\n    padding-left: '
            .concat(left, 'px;\n    padding-top: ')
            .concat(top, 'px;\n    padding-right: ')
            .concat(
              right,
              'px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: '
            )
            .concat(gap, 'px ')
            .concat(important, ';\n    '),
        gapMode === 'padding' &&
          'padding-right: '.concat(gap, 'px ').concat(important, ';'),
      ]
        .filter(Boolean)
        .join(''),
      '\n  }\n  \n  .'
    )
    .concat(zeroRightClassName, ' {\n    right: ')
    .concat(gap, 'px ')
    .concat(important, ';\n  }\n  \n  .')
    .concat(fullWidthClassName, ' {\n    margin-right: ')
    .concat(gap, 'px ')
    .concat(important, ';\n  }\n  \n  .')
    .concat(zeroRightClassName, ' .')
    .concat(zeroRightClassName, ' {\n    right: 0 ')
    .concat(important, ';\n  }\n  \n  .')
    .concat(fullWidthClassName, ' .')
    .concat(fullWidthClassName, ' {\n    margin-right: 0 ')
    .concat(important, ';\n  }\n  \n  body[')
    .concat(lockAttribute, '] {\n    ')
    .concat(removedBarSizeVariable, ': ')
    .concat(gap, 'px;\n  }\n');
};
var getCurrentUseCounter = function () {
  var counter = parseInt(document.body.getAttribute(lockAttribute) || '0', 10);
  return isFinite(counter) ? counter : 0;
};
var useLockAttribute = function () {
  React15.useEffect(function () {
    document.body.setAttribute(
      lockAttribute,
      (getCurrentUseCounter() + 1).toString()
    );
    return function () {
      var newCounter = getCurrentUseCounter() - 1;
      if (newCounter <= 0) {
        document.body.removeAttribute(lockAttribute);
      } else {
        document.body.setAttribute(lockAttribute, newCounter.toString());
      }
    };
  }, []);
};
var RemoveScrollBar = function (_a) {
  var noRelative = _a.noRelative,
    noImportant = _a.noImportant,
    _b = _a.gapMode,
    gapMode = _b === void 0 ? 'margin' : _b;
  useLockAttribute();
  var gap = React15.useMemo(
    function () {
      return getGapWidth(gapMode);
    },
    [gapMode]
  );
  return React15.createElement(Style, {
    styles: getStyles(
      gap,
      !noRelative,
      gapMode,
      !noImportant ? '!important' : ''
    ),
  });
};

// ../../node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js
var passiveSupported = false;
if (typeof window !== 'undefined') {
  try {
    options = Object.defineProperty({}, 'passive', {
      get: function () {
        passiveSupported = true;
        return true;
      },
    });
    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
var options;
var nonPassive = passiveSupported ? { passive: false } : false;

// ../../node_modules/react-remove-scroll/dist/es2015/handleScroll.js
var alwaysContainsScroll = function (node2) {
  return node2.tagName === 'TEXTAREA';
};
var elementCanBeScrolled = function (node2, overflow) {
  if (!(node2 instanceof Element)) {
    return false;
  }
  var styles2 = window.getComputedStyle(node2);
  return (
    // not-not-scrollable
    styles2[overflow] !== 'hidden' && // contains scroll inside self
    !(
      styles2.overflowY === styles2.overflowX &&
      !alwaysContainsScroll(node2) &&
      styles2[overflow] === 'visible'
    )
  );
};
var elementCouldBeVScrolled = function (node2) {
  return elementCanBeScrolled(node2, 'overflowY');
};
var elementCouldBeHScrolled = function (node2) {
  return elementCanBeScrolled(node2, 'overflowX');
};
var locationCouldBeScrolled = function (axis, node2) {
  var ownerDocument = node2.ownerDocument;
  var current = node2;
  do {
    if (typeof ShadowRoot !== 'undefined' && current instanceof ShadowRoot) {
      current = current.host;
    }
    var isScrollable = elementCouldBeScrolled(axis, current);
    if (isScrollable) {
      var _a = getScrollVariables(axis, current),
        scrollHeight = _a[1],
        clientHeight = _a[2];
      if (scrollHeight > clientHeight) {
        return true;
      }
    }
    current = current.parentNode;
  } while (current && current !== ownerDocument.body);
  return false;
};
var getVScrollVariables = function (_a) {
  var scrollTop = _a.scrollTop,
    scrollHeight = _a.scrollHeight,
    clientHeight = _a.clientHeight;
  return [scrollTop, scrollHeight, clientHeight];
};
var getHScrollVariables = function (_a) {
  var scrollLeft = _a.scrollLeft,
    scrollWidth = _a.scrollWidth,
    clientWidth = _a.clientWidth;
  return [scrollLeft, scrollWidth, clientWidth];
};
var elementCouldBeScrolled = function (axis, node2) {
  return axis === 'v'
    ? elementCouldBeVScrolled(node2)
    : elementCouldBeHScrolled(node2);
};
var getScrollVariables = function (axis, node2) {
  return axis === 'v' ? getVScrollVariables(node2) : getHScrollVariables(node2);
};
var getDirectionFactor = function (axis, direction) {
  return axis === 'h' && direction === 'rtl' ? -1 : 1;
};
var handleScroll = function (
  axis,
  endTarget,
  event,
  sourceDelta,
  noOverscroll
) {
  var directionFactor = getDirectionFactor(
    axis,
    window.getComputedStyle(endTarget).direction
  );
  var delta = directionFactor * sourceDelta;
  var target = event.target;
  var targetInLock = endTarget.contains(target);
  var shouldCancelScroll = false;
  var isDeltaPositive = delta > 0;
  var availableScroll = 0;
  var availableScrollTop = 0;
  do {
    if (!target) {
      break;
    }
    var _a = getScrollVariables(axis, target),
      position = _a[0],
      scroll_1 = _a[1],
      capacity = _a[2];
    var elementScroll = scroll_1 - capacity - directionFactor * position;
    if (position || elementScroll) {
      if (elementCouldBeScrolled(axis, target)) {
        availableScroll += elementScroll;
        availableScrollTop += position;
      }
    }
    var parent_1 = target.parentNode;
    target =
      parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE
        ? parent_1.host
        : parent_1;
  } while (
    // portaled content
    (!targetInLock && target !== document.body) || // self content
    (targetInLock && (endTarget.contains(target) || endTarget === target))
  );
  if (
    isDeltaPositive &&
    ((noOverscroll && Math.abs(availableScroll) < 1) ||
      (!noOverscroll && delta > availableScroll))
  ) {
    shouldCancelScroll = true;
  } else if (
    !isDeltaPositive &&
    ((noOverscroll && Math.abs(availableScrollTop) < 1) ||
      (!noOverscroll && -delta > availableScrollTop))
  ) {
    shouldCancelScroll = true;
  }
  return shouldCancelScroll;
};

// ../../node_modules/react-remove-scroll/dist/es2015/SideEffect.js
var getTouchXY = function (event) {
  return 'changedTouches' in event
    ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY]
    : [0, 0];
};
var getDeltaXY = function (event) {
  return [event.deltaX, event.deltaY];
};
var extractRef3 = function (ref) {
  return ref && 'current' in ref ? ref.current : ref;
};
var deltaCompare = function (x, y) {
  return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function (id) {
  return '\n  .block-interactivity-'
    .concat(id, ' {pointer-events: none;}\n  .allow-interactivity-')
    .concat(id, ' {pointer-events: all;}\n');
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
  var shouldPreventQueue = React16.useRef([]);
  var touchStartRef = React16.useRef([0, 0]);
  var activeAxis = React16.useRef();
  var id = React16.useState(idCounter++)[0];
  var Style3 = React16.useState(styleSingleton)[0];
  var lastProps = React16.useRef(props);
  React16.useEffect(
    function () {
      lastProps.current = props;
    },
    [props]
  );
  React16.useEffect(
    function () {
      if (props.inert) {
        document.body.classList.add('block-interactivity-'.concat(id));
        var allow_1 = __spreadArray(
          [props.lockRef.current],
          (props.shards || []).map(extractRef3),
          true
        ).filter(Boolean);
        allow_1.forEach(function (el) {
          return el.classList.add('allow-interactivity-'.concat(id));
        });
        return function () {
          document.body.classList.remove('block-interactivity-'.concat(id));
          allow_1.forEach(function (el) {
            return el.classList.remove('allow-interactivity-'.concat(id));
          });
        };
      }
      return;
    },
    [props.inert, props.lockRef.current, props.shards]
  );
  var shouldCancelEvent = React16.useCallback(function (event, parent) {
    if (
      ('touches' in event && event.touches.length === 2) ||
      (event.type === 'wheel' && event.ctrlKey)
    ) {
      return !lastProps.current.allowPinchZoom;
    }
    var touch = getTouchXY(event);
    var touchStart = touchStartRef.current;
    var deltaX = 'deltaX' in event ? event.deltaX : touchStart[0] - touch[0];
    var deltaY = 'deltaY' in event ? event.deltaY : touchStart[1] - touch[1];
    var currentAxis;
    var target = event.target;
    var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? 'h' : 'v';
    if (
      'touches' in event &&
      moveDirection === 'h' &&
      target.type === 'range'
    ) {
      return false;
    }
    var canBeScrolledInMainDirection = locationCouldBeScrolled(
      moveDirection,
      target
    );
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === 'v' ? 'h' : 'v';
      canBeScrolledInMainDirection = locationCouldBeScrolled(
        moveDirection,
        target
      );
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (
      !activeAxis.current &&
      'changedTouches' in event &&
      (deltaX || deltaY)
    ) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    var cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(
      cancelingAxis,
      parent,
      event,
      cancelingAxis === 'h' ? deltaX : deltaY,
      true
    );
  }, []);
  var shouldPrevent = React16.useCallback(function (_event) {
    var event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style3) {
      return;
    }
    var delta = 'deltaY' in event ? getDeltaXY(event) : getTouchXY(event);
    var sourceEvent = shouldPreventQueue.current.filter(function (e) {
      return (
        e.name === event.type &&
        (e.target === event.target || event.target === e.shadowParent) &&
        deltaCompare(e.delta, delta)
      );
    })[0];
    if (sourceEvent && sourceEvent.should) {
      if (event.cancelable) {
        event.preventDefault();
      }
      return;
    }
    if (!sourceEvent) {
      var shardNodes = (lastProps.current.shards || [])
        .map(extractRef3)
        .filter(Boolean)
        .filter(function (node2) {
          return node2.contains(event.target);
        });
      var shouldStop =
        shardNodes.length > 0
          ? shouldCancelEvent(event, shardNodes[0])
          : !lastProps.current.noIsolation;
      if (shouldStop) {
        if (event.cancelable) {
          event.preventDefault();
        }
      }
    }
  }, []);
  var shouldCancel = React16.useCallback(function (
    name,
    delta,
    target,
    should
  ) {
    var event = {
      name,
      delta,
      target,
      should,
      shadowParent: getOutermostShadowParent(target),
    };
    shouldPreventQueue.current.push(event);
    setTimeout(function () {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(function (
        e
      ) {
        return e !== event;
      });
    }, 1);
  },
  []);
  var scrollTouchStart = React16.useCallback(function (event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = void 0;
  }, []);
  var scrollWheel = React16.useCallback(function (event) {
    shouldCancel(
      event.type,
      getDeltaXY(event),
      event.target,
      shouldCancelEvent(event, props.lockRef.current)
    );
  }, []);
  var scrollTouchMove = React16.useCallback(function (event) {
    shouldCancel(
      event.type,
      getTouchXY(event),
      event.target,
      shouldCancelEvent(event, props.lockRef.current)
    );
  }, []);
  React16.useEffect(function () {
    lockStack.push(Style3);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove,
    });
    document.addEventListener('wheel', shouldPrevent, nonPassive);
    document.addEventListener('touchmove', shouldPrevent, nonPassive);
    document.addEventListener('touchstart', scrollTouchStart, nonPassive);
    return function () {
      lockStack = lockStack.filter(function (inst) {
        return inst !== Style3;
      });
      document.removeEventListener('wheel', shouldPrevent, nonPassive);
      document.removeEventListener('touchmove', shouldPrevent, nonPassive);
      document.removeEventListener('touchstart', scrollTouchStart, nonPassive);
    };
  }, []);
  var removeScrollBar = props.removeScrollBar,
    inert = props.inert;
  return React16.createElement(
    React16.Fragment,
    null,
    inert ? React16.createElement(Style3, { styles: generateStyle(id) }) : null,
    removeScrollBar
      ? React16.createElement(RemoveScrollBar, {
          noRelative: props.noRelative,
          gapMode: props.gapMode,
        })
      : null
  );
}
function getOutermostShadowParent(node2) {
  var shadowParent = null;
  while (node2 !== null) {
    if (node2 instanceof ShadowRoot) {
      shadowParent = node2.host;
      node2 = node2.host;
    }
    node2 = node2.parentNode;
  }
  return shadowParent;
}

// ../../node_modules/react-remove-scroll/dist/es2015/sidecar.js
var sidecar_default2 = exportSidecar(effectCar, RemoveScrollSideCar);

// ../../node_modules/react-focus-on/dist/es2015/Effect.js
var React18 = __toESM(require_react());

// ../../node_modules/aria-hidden/dist/es2015/index.js
var getDefaultParent = function (originalTarget) {
  if (typeof document === 'undefined') {
    return null;
  }
  var sampleTarget = Array.isArray(originalTarget)
    ? originalTarget[0]
    : originalTarget;
  return sampleTarget.ownerDocument.body;
};
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function (node2) {
  return node2 && (node2.host || unwrapHost(node2.parentNode));
};
var correctTargets = function (parent, targets) {
  return targets
    .map(function (target) {
      if (parent.contains(target)) {
        return target;
      }
      var correctedTarget = unwrapHost(target);
      if (correctedTarget && parent.contains(correctedTarget)) {
        return correctedTarget;
      }
      console.error(
        'aria-hidden',
        target,
        'in not contained inside',
        parent,
        '. Doing nothing'
      );
      return null;
    })
    .filter(function (x) {
      return Boolean(x);
    });
};
var applyAttributeToOthers = function (
  originalTarget,
  parentNode,
  markerName,
  controlAttribute
) {
  var targets = correctTargets(
    parentNode,
    Array.isArray(originalTarget) ? originalTarget : [originalTarget]
  );
  if (!markerMap[markerName]) {
    markerMap[markerName] = /* @__PURE__ */ new WeakMap();
  }
  var markerCounter = markerMap[markerName];
  var hiddenNodes = [];
  var elementsToKeep = /* @__PURE__ */ new Set();
  var elementsToStop = new Set(targets);
  var keep = function (el) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    keep(el.parentNode);
  };
  targets.forEach(keep);
  var deep = function (parent) {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }
    Array.prototype.forEach.call(parent.children, function (node2) {
      if (elementsToKeep.has(node2)) {
        deep(node2);
      } else {
        try {
          var attr = node2.getAttribute(controlAttribute);
          var alreadyHidden = attr !== null && attr !== 'false';
          var counterValue = (counterMap.get(node2) || 0) + 1;
          var markerValue = (markerCounter.get(node2) || 0) + 1;
          counterMap.set(node2, counterValue);
          markerCounter.set(node2, markerValue);
          hiddenNodes.push(node2);
          if (counterValue === 1 && alreadyHidden) {
            uncontrolledNodes.set(node2, true);
          }
          if (markerValue === 1) {
            node2.setAttribute(markerName, 'true');
          }
          if (!alreadyHidden) {
            node2.setAttribute(controlAttribute, 'true');
          }
        } catch (e) {
          console.error('aria-hidden: cannot operate on ', node2, e);
        }
      }
    });
  };
  deep(parentNode);
  elementsToKeep.clear();
  lockCount++;
  return function () {
    hiddenNodes.forEach(function (node2) {
      var counterValue = counterMap.get(node2) - 1;
      var markerValue = markerCounter.get(node2) - 1;
      counterMap.set(node2, counterValue);
      markerCounter.set(node2, markerValue);
      if (!counterValue) {
        if (!uncontrolledNodes.has(node2)) {
          node2.removeAttribute(controlAttribute);
        }
        uncontrolledNodes.delete(node2);
      }
      if (!markerValue) {
        node2.removeAttribute(markerName);
      }
    });
    lockCount--;
    if (!lockCount) {
      counterMap = /* @__PURE__ */ new WeakMap();
      counterMap = /* @__PURE__ */ new WeakMap();
      uncontrolledNodes = /* @__PURE__ */ new WeakMap();
      markerMap = {};
    }
  };
};
var hideOthers = function (originalTarget, parentNode, markerName) {
  if (markerName === void 0) {
    markerName = 'data-aria-hidden';
  }
  var targets = Array.from(
    Array.isArray(originalTarget) ? originalTarget : [originalTarget]
  );
  var activeParentNode = parentNode || getDefaultParent(originalTarget);
  if (!activeParentNode) {
    return function () {
      return null;
    };
  }
  targets.push.apply(
    targets,
    Array.from(activeParentNode.querySelectorAll('[aria-live], script'))
  );
  return applyAttributeToOthers(
    targets,
    activeParentNode,
    markerName,
    'aria-hidden'
  );
};

// ../../node_modules/react-focus-on/dist/es2015/InteractivityDisabler.js
var React17 = __toESM(require_react());
var Style2 = styleSingleton();
var styles =
  '\n [' + focusHiddenMarker + '] {\n   pointer-events: none !important;\n }\n';
var InteractivityDisabler = function () {
  return React17.createElement(Style2, { styles });
};

// ../../node_modules/react-focus-on/dist/es2015/Effect.js
var import_react14 = __toESM(require_react());
var extractRef4 = function (ref) {
  return 'current' in ref ? ref.current : ref;
};
function Effect(_a) {
  var setLockProps = _a.setLockProps,
    onEscapeKey = _a.onEscapeKey,
    onClickOutside = _a.onClickOutside,
    shards = _a.shards,
    onActivation = _a.onActivation,
    onDeactivation = _a.onDeactivation,
    noIsolation = _a.noIsolation;
  var _b = (0, import_react14.useState)(void 0),
    activeNode = _b[0],
    setActiveNode = _b[1];
  var lastEventTarget = (0, import_react14.useRef)(null);
  var mouseTouches = (0, import_react14.useRef)(0);
  React18.useEffect(
    function () {
      var onKeyDown = function (event) {
        if (!event.defaultPrevented) {
          if (
            (event.code === 'Escape' ||
              event.key === 'Escape' ||
              event.keyCode === 27) &&
            onEscapeKey
          ) {
            onEscapeKey(event);
          }
        }
      };
      var onMouseDown = function (event) {
        if (
          event.defaultPrevented ||
          event.target === lastEventTarget.current ||
          (event instanceof MouseEvent && event.button !== 0)
        ) {
          return;
        }
        if (
          shards &&
          shards.map(extractRef4).some(function (node2) {
            return (
              (node2 && node2.contains(event.target)) || node2 === event.target
            );
          })
        ) {
          return;
        }
        if (onClickOutside) {
          onClickOutside(event);
        }
      };
      var onTouchStart = function (event) {
        onMouseDown(event);
        mouseTouches.current = event.touches.length;
      };
      var onTouchEnd = function (event) {
        mouseTouches.current = event.touches.length;
      };
      if (activeNode) {
        activeNode.ownerDocument.addEventListener('keydown', onKeyDown);
        activeNode.ownerDocument.addEventListener('mousedown', onMouseDown);
        activeNode.ownerDocument.addEventListener('touchstart', onTouchStart);
        activeNode.ownerDocument.addEventListener('touchend', onTouchEnd);
        return function () {
          activeNode.ownerDocument.removeEventListener('keydown', onKeyDown);
          activeNode.ownerDocument.removeEventListener(
            'mousedown',
            onMouseDown
          );
          activeNode.ownerDocument.removeEventListener(
            'touchstart',
            onTouchStart
          );
          activeNode.ownerDocument.removeEventListener('touchend', onTouchEnd);
        };
      }
    },
    [activeNode, onClickOutside, onEscapeKey]
  );
  (0, import_react14.useEffect)(
    function () {
      if (activeNode) {
        if (onActivation) {
          onActivation(activeNode);
        }
        return function () {
          if (onDeactivation) {
            onDeactivation();
          }
        };
      }
    },
    [!!activeNode]
  );
  (0, import_react14.useEffect)(function () {
    var _undo = function () {
      return null;
    };
    var unmounted = false;
    var onNodeActivation = function (node2) {
      if (!noIsolation) {
        _undo = hideOthers(
          __spreadArrays([node2], (shards || []).map(extractRef4)),
          node2.ownerDocument.body,
          focusHiddenMarker
        );
      }
      setActiveNode(function () {
        return node2;
      });
    };
    var onNodeDeactivation = function () {
      _undo();
      if (!unmounted) {
        setActiveNode(null);
      }
    };
    setLockProps({
      onMouseDown: function (e) {
        lastEventTarget.current = e.target;
      },
      onTouchStart: function (e) {
        lastEventTarget.current = e.target;
      },
      onActivation: onNodeActivation,
      onDeactivation: onNodeDeactivation,
    });
    return function () {
      unmounted = true;
      setLockProps(false);
    };
  }, []);
  return React18.createElement(InteractivityDisabler, null);
}

// ../../node_modules/react-focus-on/dist/es2015/sidecar.js
var sidecar_default3 = exportSidecar(effectCar2, Effect);

// ../../node_modules/react-focus-on/dist/es2015/Combination.js
var RequireSideCar = function (props) {
  return React19.createElement(sidecar_default3, __assign({}, props));
};
var FocusOn2 = React19.forwardRef(function (props, ref) {
  return React19.createElement(
    FocusOn,
    __assign({}, props, { ref, sideCar: RequireSideCar })
  );
});
export {
  AutoFocusInside_default as AutoFocusInside,
  FocusOn2 as FocusOn,
  FocusGuard_default as InFocusGuard,
  MoveFocusInside_default as MoveFocusInside,
  classNames,
};
//# sourceMappingURL=react-focus-on.js.map
