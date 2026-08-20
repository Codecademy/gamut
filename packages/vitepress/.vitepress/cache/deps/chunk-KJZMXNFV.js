import { require_react } from './chunk-QBXGYTN6.js';
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __publicField,
  __toESM,
} from './chunk-4B2QHNJT.js';

// ../../node_modules/@vidstack/react/dev/chunks/vidstack-CH225ns1.js
var React = __toESM(require_react(), 1);
var IS_SERVER = typeof document === 'undefined';
var SCOPE = Symbol('SCOPE');
var scheduledEffects = false;
var runningEffects = false;
var currentScope = null;
var currentObserver = null;
var currentObservers = null;
var currentObserversIndex = 0;
var effects = [];
var defaultContext = {};
var NOOP = () => {};
var STATE_CLEAN = 0;
var STATE_CHECK = 1;
var STATE_DIRTY = 2;
var STATE_DISPOSED = 3;
function flushEffects() {
  scheduledEffects = true;
  queueMicrotask(runEffects);
}
function runEffects() {
  if (!effects.length) {
    scheduledEffects = false;
    return;
  }
  runningEffects = true;
  for (let i = 0; i < effects.length; i++) {
    if (effects[i]._state !== STATE_CLEAN) runTop(effects[i]);
  }
  effects = [];
  scheduledEffects = false;
  runningEffects = false;
}
function runTop(node) {
  let ancestors = [node];
  while ((node = node[SCOPE])) {
    if (node._effect && node._state !== STATE_CLEAN) ancestors.push(node);
  }
  for (let i = ancestors.length - 1; i >= 0; i--) {
    updateCheck(ancestors[i]);
  }
}
function root(init) {
  const scope = createScope();
  return compute(
    scope,
    !init.length ? init : init.bind(null, dispose.bind(scope)),
    null
  );
}
function peek(fn) {
  return compute(currentScope, fn, null);
}
function untrack(fn) {
  return compute(null, fn, null);
}
function tick() {
  if (!runningEffects) runEffects();
}
function getScope() {
  return currentScope;
}
function scoped(run2, scope) {
  try {
    return compute(scope, run2, null);
  } catch (error) {
    handleError(scope, error);
    return;
  }
}
function getContext(key2, scope = currentScope) {
  return scope == null ? void 0 : scope._context[key2];
}
function setContext(key2, value, scope = currentScope) {
  if (scope) scope._context = { ...scope._context, [key2]: value };
}
function onDispose(disposable) {
  if (!disposable || !currentScope) return disposable || NOOP;
  const node = currentScope;
  if (!node._disposal) {
    node._disposal = disposable;
  } else if (Array.isArray(node._disposal)) {
    node._disposal.push(disposable);
  } else {
    node._disposal = [node._disposal, disposable];
  }
  return function removeDispose() {
    if (node._state === STATE_DISPOSED) return;
    disposable.call(null);
    if (isFunction$1(node._disposal)) {
      node._disposal = null;
    } else if (Array.isArray(node._disposal)) {
      node._disposal.splice(node._disposal.indexOf(disposable), 1);
    }
  };
}
function dispose(self = true) {
  if (this._state === STATE_DISPOSED) return;
  if (this._children) {
    if (Array.isArray(this._children)) {
      for (let i = this._children.length - 1; i >= 0; i--) {
        dispose.call(this._children[i]);
      }
    } else {
      dispose.call(this._children);
    }
  }
  if (self) {
    const parent = this[SCOPE];
    if (parent) {
      if (Array.isArray(parent._children)) {
        parent._children.splice(parent._children.indexOf(this), 1);
      } else {
        parent._children = null;
      }
    }
    disposeNode(this);
  }
}
function disposeNode(node) {
  node._state = STATE_DISPOSED;
  if (node._disposal) emptyDisposal(node);
  if (node._sources) removeSourceObservers(node, 0);
  node[SCOPE] = null;
  node._sources = null;
  node._observers = null;
  node._children = null;
  node._context = defaultContext;
  node._handlers = null;
}
function emptyDisposal(scope) {
  try {
    if (Array.isArray(scope._disposal)) {
      for (let i = scope._disposal.length - 1; i >= 0; i--) {
        const callable = scope._disposal[i];
        callable.call(callable);
      }
    } else {
      scope._disposal.call(scope._disposal);
    }
    scope._disposal = null;
  } catch (error) {
    handleError(scope, error);
  }
}
function compute(scope, compute2, observer) {
  const prevScope = currentScope,
    prevObserver = currentObserver;
  currentScope = scope;
  currentObserver = observer;
  try {
    return compute2.call(scope);
  } finally {
    currentScope = prevScope;
    currentObserver = prevObserver;
  }
}
function handleError(scope, error) {
  if (!scope || !scope._handlers) throw error;
  let i = 0,
    len = scope._handlers.length,
    currentError = error;
  for (i = 0; i < len; i++) {
    try {
      scope._handlers[i](currentError);
      break;
    } catch (error2) {
      currentError = error2;
    }
  }
  if (i === len) throw currentError;
}
function read() {
  if (this._state === STATE_DISPOSED) return this._value;
  if (currentObserver && !this._effect) {
    if (
      !currentObservers &&
      currentObserver._sources &&
      currentObserver._sources[currentObserversIndex] == this
    ) {
      currentObserversIndex++;
    } else if (!currentObservers) currentObservers = [this];
    else currentObservers.push(this);
  }
  if (this._compute) updateCheck(this);
  return this._value;
}
function write(newValue) {
  const value = isFunction$1(newValue) ? newValue(this._value) : newValue;
  if (this._changed(this._value, value)) {
    this._value = value;
    if (this._observers) {
      for (let i = 0; i < this._observers.length; i++) {
        notify(this._observers[i], STATE_DIRTY);
      }
    }
  }
  return this._value;
}
var ScopeNode = function Scope() {
  this[SCOPE] = null;
  this._children = null;
  if (currentScope) currentScope.append(this);
};
var ScopeProto = ScopeNode.prototype;
ScopeProto._context = defaultContext;
ScopeProto._handlers = null;
ScopeProto._compute = null;
ScopeProto._disposal = null;
ScopeProto.append = function (child) {
  child[SCOPE] = this;
  if (!this._children) {
    this._children = child;
  } else if (Array.isArray(this._children)) {
    this._children.push(child);
  } else {
    this._children = [this._children, child];
  }
  child._context =
    child._context === defaultContext
      ? this._context
      : { ...this._context, ...child._context };
  if (this._handlers) {
    child._handlers = !child._handlers
      ? this._handlers
      : [...child._handlers, ...this._handlers];
  }
};
ScopeProto.dispose = function () {
  dispose.call(this);
};
function createScope() {
  return new ScopeNode();
}
var ComputeNode = function Computation(initialValue, compute2, options) {
  ScopeNode.call(this);
  this._state = compute2 ? STATE_DIRTY : STATE_CLEAN;
  this._init = false;
  this._effect = false;
  this._sources = null;
  this._observers = null;
  this._value = initialValue;
  this.id =
    (options == null ? void 0 : options.id) ??
    (this._compute ? 'computed' : 'signal');
  if (compute2) this._compute = compute2;
  if (options && options.dirty) this._changed = options.dirty;
};
var ComputeProto = ComputeNode.prototype;
Object.setPrototypeOf(ComputeProto, ScopeProto);
ComputeProto._changed = isNotEqual;
ComputeProto.call = read;
function createComputation(initialValue, compute2, options) {
  return new ComputeNode(initialValue, compute2, options);
}
function isNotEqual(a, b) {
  return a !== b;
}
function isFunction$1(value) {
  return typeof value === 'function';
}
function updateCheck(node) {
  if (node._state === STATE_CHECK) {
    for (let i = 0; i < node._sources.length; i++) {
      updateCheck(node._sources[i]);
      if (node._state === STATE_DIRTY) {
        break;
      }
    }
  }
  if (node._state === STATE_DIRTY) update(node);
  else node._state = STATE_CLEAN;
}
function cleanup(node) {
  if (node._children) dispose.call(node, false);
  if (node._disposal) emptyDisposal(node);
  node._handlers = node[SCOPE] ? node[SCOPE]._handlers : null;
}
function update(node) {
  let prevObservers = currentObservers,
    prevObserversIndex = currentObserversIndex;
  currentObservers = null;
  currentObserversIndex = 0;
  try {
    cleanup(node);
    const result = compute(node, node._compute, node);
    updateObservers(node);
    if (!node._effect && node._init) {
      write.call(node, result);
    } else {
      node._value = result;
      node._init = true;
    }
  } catch (error) {
    if (!node._init && typeof node._value === 'undefined') {
      console.error(
        `computed \`${node.id}\` threw error during first run, this can be fatal.

Solutions:

1. Set the \`initial\` option to silence this error`,
        '\n2. Or, use an `effect` if the return value is not being used',
        '\n\n',
        error
      );
    }
    updateObservers(node);
    handleError(node, error);
  } finally {
    currentObservers = prevObservers;
    currentObserversIndex = prevObserversIndex;
    node._state = STATE_CLEAN;
  }
}
function updateObservers(node) {
  if (currentObservers) {
    if (node._sources) removeSourceObservers(node, currentObserversIndex);
    if (node._sources && currentObserversIndex > 0) {
      node._sources.length = currentObserversIndex + currentObservers.length;
      for (let i = 0; i < currentObservers.length; i++) {
        node._sources[currentObserversIndex + i] = currentObservers[i];
      }
    } else {
      node._sources = currentObservers;
    }
    let source;
    for (let i = currentObserversIndex; i < node._sources.length; i++) {
      source = node._sources[i];
      if (!source._observers) source._observers = [node];
      else source._observers.push(node);
    }
  } else if (node._sources && currentObserversIndex < node._sources.length) {
    removeSourceObservers(node, currentObserversIndex);
    node._sources.length = currentObserversIndex;
  }
}
function notify(node, state) {
  if (node._state >= state) return;
  if (node._effect && node._state === STATE_CLEAN) {
    effects.push(node);
    if (!scheduledEffects) flushEffects();
  }
  node._state = state;
  if (node._observers) {
    for (let i = 0; i < node._observers.length; i++) {
      notify(node._observers[i], STATE_CHECK);
    }
  }
}
function removeSourceObservers(node, index) {
  let source, swap;
  for (let i = index; i < node._sources.length; i++) {
    source = node._sources[i];
    if (source._observers) {
      swap = source._observers.indexOf(node);
      source._observers[swap] = source._observers[source._observers.length - 1];
      source._observers.pop();
    }
  }
}
function signal(initialValue, options) {
  const node = createComputation(initialValue, null, options),
    signal2 = read.bind(node);
  signal2.node = node;
  signal2[SCOPE] = true;
  signal2.set = write.bind(node);
  return signal2;
}
function isReadSignal(fn) {
  return isFunction$1(fn) && SCOPE in fn;
}
function computed(compute2, options) {
  const node = createComputation(
      options == null ? void 0 : options.initial,
      compute2,
      options
    ),
    signal2 = read.bind(node);
  signal2[SCOPE] = true;
  signal2.node = node;
  return signal2;
}
function effect$1(effect2, options) {
  const signal2 = createComputation(
    null,
    function runEffect() {
      let effectResult = effect2();
      isFunction$1(effectResult) && onDispose(effectResult);
      return null;
    },
    { id: (options == null ? void 0 : options.id) ?? 'effect' }
  );
  signal2._effect = true;
  update(signal2);
  {
    return function stopEffect() {
      dispose.call(signal2, true);
    };
  }
}
function isWriteSignal(fn) {
  return isReadSignal(fn) && 'set' in fn;
}
function noop(...args) {}
function isNull(value) {
  return value === null;
}
function isUndefined(value) {
  return typeof value === 'undefined';
}
function isNil(value) {
  return isNull(value) || isUndefined(value);
}
function isObject(value) {
  return (value == null ? void 0 : value.constructor) === Object;
}
function isNumber(value) {
  return typeof value === 'number' && !Number.isNaN(value);
}
function isString(value) {
  return typeof value === 'string';
}
function isBoolean(value) {
  return typeof value === 'boolean';
}
function isFunction(value) {
  return typeof value === 'function';
}
function isArray(value) {
  return Array.isArray(value);
}
var effect = IS_SERVER ? serverEffect : effect$1;
function serverEffect(effect2, options) {
  if (typeof process !== 'undefined' && false) {
    return effect$1(effect2, options);
  }
  return noop;
}
var EVENT = IS_SERVER ? class Event2 {} : Event;
var DOM_EVENT = Symbol('DOM_EVENT');
var _a, _b;
var DOMEvent = class extends ((_b = EVENT), (_a = DOM_EVENT), _b) {
  constructor(type, ...init) {
    var _a3, _b2;
    super(type, init[0]);
    __publicField(this, _a, true);
    /**
     * The event detail.
     */
    __publicField(this, 'detail');
    /**
     * The event trigger chain.
     */
    __publicField(this, 'triggers', new EventTriggers());
    this.detail = (_a3 = init[0]) == null ? void 0 : _a3.detail;
    const trigger = (_b2 = init[0]) == null ? void 0 : _b2.trigger;
    if (trigger) this.triggers.add(trigger);
  }
  /**
   * The preceding event that was responsible for this event being fired.
   */
  get trigger() {
    return this.triggers.source;
  }
  /**
   * The origin event that lead to this event being fired.
   */
  get originEvent() {
    return this.triggers.origin;
  }
  /**
   * Whether the origin event was triggered by the user.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted}
   */
  get isOriginTrusted() {
    var _a3;
    return (
      ((_a3 = this.triggers.origin) == null ? void 0 : _a3.isTrusted) ?? false
    );
  }
};
var EventTriggers = class {
  constructor() {
    __publicField(this, 'chain', []);
  }
  get source() {
    return this.chain[0];
  }
  get origin() {
    return this.chain[this.chain.length - 1];
  }
  /**
   * Appends the event to the end of the chain.
   */
  add(event) {
    this.chain.push(event);
    if (isDOMEvent(event)) {
      this.chain.push(...event.triggers);
    }
  }
  /**
   * Removes the event from the chain and returns it (if found).
   */
  remove(event) {
    return this.chain.splice(this.chain.indexOf(event), 1)[0];
  }
  /**
   * Returns whether the chain contains the given `event`.
   */
  has(event) {
    return this.chain.some((e2) => e2 === event);
  }
  /**
   * Returns whether the chain contains the given event type.
   */
  hasType(type) {
    return !!this.findType(type);
  }
  /**
   * Returns the first event with the given `type` found in the chain.
   */
  findType(type) {
    return this.chain.find((e2) => e2.type === type);
  }
  /**
   * Walks an event chain on a given `event`, and invokes the given `callback` for each trigger event.
   */
  walk(callback) {
    for (const event of this.chain) {
      const returnValue = callback(event);
      if (returnValue) return [event, returnValue];
    }
  }
  [Symbol.iterator]() {
    return this.chain.values();
  }
};
function isDOMEvent(event) {
  return !!(event == null ? void 0 : event[DOM_EVENT]);
}
function walkTriggerEventChain(event, callback) {
  if (!isDOMEvent(event)) return;
  return event.triggers.walk(callback);
}
function findTriggerEvent(event, type) {
  return isDOMEvent(event) ? event.triggers.findType(type) : void 0;
}
function hasTriggerEvent(event, type) {
  return !!findTriggerEvent(event, type);
}
function appendTriggerEvent(event, trigger) {
  if (trigger) event.triggers.add(trigger);
}
var EventsTarget = class extends EventTarget {
  constructor() {
    super(...arguments);
    /** @internal type only */
    __publicField(this, '$ts__events');
  }
  addEventListener(type, callback, options) {
    return super.addEventListener(type, callback, options);
  }
  removeEventListener(type, callback, options) {
    return super.removeEventListener(type, callback, options);
  }
};
function listenEvent(target, type, handler, options) {
  if (IS_SERVER) return noop;
  target.addEventListener(type, handler, options);
  return onDispose(() => target.removeEventListener(type, handler, options));
}
var _target, _controller;
var EventsController = class {
  constructor(target) {
    __privateAdd(this, _target);
    __privateAdd(this, _controller);
    __privateSet(this, _target, target);
    __privateSet(this, _controller, new AbortController());
    onDispose(this.abort.bind(this));
  }
  get signal() {
    return __privateGet(this, _controller).signal;
  }
  add(type, handler, options) {
    if (this.signal.aborted) throw Error('aborted');
    __privateGet(this, _target).addEventListener(type, handler, {
      ...options,
      signal: (options == null ? void 0 : options.signal)
        ? anySignal(this.signal, options.signal)
        : this.signal,
    });
    return this;
  }
  remove(type, handler) {
    __privateGet(this, _target).removeEventListener(type, handler);
    return this;
  }
  abort(reason) {
    __privateGet(this, _controller).abort(reason);
  }
};
_target = new WeakMap();
_controller = new WeakMap();
function anySignal(...signals) {
  const controller = new AbortController(),
    options = { signal: controller.signal };
  function onAbort(event) {
    controller.abort(event.target.reason);
  }
  for (const signal2 of signals) {
    if (signal2.aborted) {
      controller.abort(signal2.reason);
      break;
    }
    signal2.addEventListener('abort', onAbort, options);
  }
  return controller.signal;
}
function isPointerEvent(event) {
  return !!(event == null ? void 0 : event.type.startsWith('pointer'));
}
function isTouchEvent(event) {
  return !!(event == null ? void 0 : event.type.startsWith('touch'));
}
function isMouseEvent(event) {
  return /^(click|mouse)/.test((event == null ? void 0 : event.type) ?? '');
}
function isKeyboardEvent(event) {
  return !!(event == null ? void 0 : event.type.startsWith('key'));
}
function wasEnterKeyPressed(event) {
  return isKeyboardEvent(event) && event.key === 'Enter';
}
function isKeyboardClick(event) {
  return isKeyboardEvent(event) && (event.key === 'Enter' || event.key === ' ');
}
function isDOMNode(node) {
  return node instanceof Node;
}
function setAttribute(host, name, value) {
  if (!host) return;
  else if (!value && value !== '' && value !== 0) {
    host.removeAttribute(name);
  } else {
    const attrValue = value === true ? '' : value + '';
    if (host.getAttribute(name) !== attrValue) {
      host.setAttribute(name, attrValue);
    }
  }
}
function setStyle(host, property, value) {
  if (!host) return;
  else if (!value && value !== 0) {
    host.style.removeProperty(property);
  } else {
    host.style.setProperty(property, value + '');
  }
}
function toggleClass(host, name, value) {
  host.classList[value ? 'add' : 'remove'](name);
}
function unwrapDeep(fn) {
  let value = fn;
  while (typeof value === 'function') value = value.call(this);
  return value;
}
function createContext2(provide) {
  return { id: Symbol(), provide };
}
function provideContext(context, value, scope = getScope()) {
  var _a3;
  if (!scope) {
    throw Error('[maverick] attempting to provide context outside root');
  }
  const hasProvidedValue = !isUndefined(value);
  if (!hasProvidedValue && !context.provide) {
    throw Error(
      '[maverick] context can not be provided without a value or `provide` function'
    );
  }
  setContext(
    context.id,
    hasProvidedValue
      ? value
      : (_a3 = context.provide) == null
      ? void 0
      : _a3.call(context),
    scope
  );
}
function useContext2(context) {
  const value = getContext(context.id);
  if (isUndefined(value)) {
    throw Error('[maverick] attempting to use context without providing first');
  }
  return value;
}
function hasProvidedContext(context) {
  return !isUndefined(getContext(context.id));
}
var PROPS = Symbol('PROPS');
var METHODS = Symbol('METHODS');
var ON_DISPATCH = Symbol('ON_DISPATCH');
var EMPTY_PROPS = {};
var _a2,
  _setupCallbacks,
  _attachCallbacks,
  _connectCallbacks,
  _destroyCallbacks,
  _Instance_instances,
  attachAttrs_fn,
  attachStyles_fn,
  setAttr_fn,
  setStyle_fn;
_a2 = ON_DISPATCH;
var Instance = class {
  constructor(Component2, scope, init) {
    __privateAdd(this, _Instance_instances);
    /** @internal type only */
    __publicField(this, '$ts__events');
    /** @internal type only */
    __publicField(this, '$ts__vars');
    /* @internal */
    __publicField(this, _a2, null);
    __publicField(this, '$el', signal(null));
    __publicField(this, 'el', null);
    __publicField(this, 'scope', null);
    __publicField(this, 'attachScope', null);
    __publicField(this, 'connectScope', null);
    __publicField(this, 'component', null);
    __publicField(this, 'destroyed', false);
    __publicField(this, 'props', EMPTY_PROPS);
    __publicField(this, 'attrs', null);
    __publicField(this, 'styles', null);
    __publicField(this, 'state');
    __publicField(this, '$state');
    __privateAdd(this, _setupCallbacks, []);
    __privateAdd(this, _attachCallbacks, []);
    __privateAdd(this, _connectCallbacks, []);
    __privateAdd(this, _destroyCallbacks, []);
    var _a3;
    this.scope = scope;
    if (init == null ? void 0 : init.scope) init.scope.append(scope);
    let stateFactory = Component2.state,
      props = Component2.props;
    if (stateFactory) {
      this.$state = stateFactory.create();
      this.state = new Proxy(this.$state, {
        get: (_, prop2) => this.$state[prop2](),
      });
      provideContext(stateFactory, this.$state);
    }
    if (props) {
      this.props = createInstanceProps(props);
      if (init == null ? void 0 : init.props) {
        for (const prop2 of Object.keys(init.props)) {
          (_a3 = this.props[prop2]) == null
            ? void 0
            : _a3.set(init.props[prop2]);
        }
      }
    }
    onDispose(this.destroy.bind(this));
  }
  setup() {
    scoped(() => {
      for (const callback of __privateGet(this, _setupCallbacks)) callback();
    }, this.scope);
  }
  attach(el) {
    var _a3;
    if (this.el) return;
    this.el = el;
    this.$el.set(el);
    {
      el.$$COMPONENT_NAME =
        (_a3 = this.component) == null ? void 0 : _a3.constructor.name;
    }
    scoped(() => {
      this.attachScope = createScope();
      scoped(() => {
        for (const callback of __privateGet(this, _attachCallbacks))
          callback(this.el);
        __privateMethod(this, _Instance_instances, attachAttrs_fn).call(this);
        __privateMethod(this, _Instance_instances, attachStyles_fn).call(this);
      }, this.attachScope);
    }, this.scope);
    el.dispatchEvent(new Event('attached'));
  }
  detach() {
    var _a3;
    (_a3 = this.attachScope) == null ? void 0 : _a3.dispose();
    this.attachScope = null;
    this.connectScope = null;
    if (this.el) {
      this.el.$$COMPONENT_NAME = null;
    }
    this.el = null;
    this.$el.set(null);
  }
  connect() {
    if (
      !this.el ||
      !this.attachScope ||
      !__privateGet(this, _connectCallbacks).length
    )
      return;
    scoped(() => {
      this.connectScope = createScope();
      scoped(() => {
        for (const callback of __privateGet(this, _connectCallbacks))
          callback(this.el);
      }, this.connectScope);
    }, this.attachScope);
  }
  disconnect() {
    var _a3;
    (_a3 = this.connectScope) == null ? void 0 : _a3.dispose();
    this.connectScope = null;
  }
  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    scoped(() => {
      for (const callback of __privateGet(this, _destroyCallbacks))
        callback(this.el);
    }, this.scope);
    const el = this.el;
    this.detach();
    this.scope.dispose();
    __privateGet(this, _setupCallbacks).length = 0;
    __privateGet(this, _attachCallbacks).length = 0;
    __privateGet(this, _connectCallbacks).length = 0;
    __privateGet(this, _destroyCallbacks).length = 0;
    this.component = null;
    this.attrs = null;
    this.styles = null;
    this.props = EMPTY_PROPS;
    this.scope = null;
    this.state = EMPTY_PROPS;
    this.$state = null;
    if (el) delete el.$;
  }
  addHooks(target) {
    if (target.onSetup)
      __privateGet(this, _setupCallbacks).push(target.onSetup.bind(target));
    if (target.onAttach)
      __privateGet(this, _attachCallbacks).push(target.onAttach.bind(target));
    if (target.onConnect)
      __privateGet(this, _connectCallbacks).push(target.onConnect.bind(target));
    if (target.onDestroy)
      __privateGet(this, _destroyCallbacks).push(target.onDestroy.bind(target));
  }
};
_setupCallbacks = new WeakMap();
_attachCallbacks = new WeakMap();
_connectCallbacks = new WeakMap();
_destroyCallbacks = new WeakMap();
_Instance_instances = new WeakSet();
attachAttrs_fn = function () {
  if (!this.attrs) return;
  for (const name of Object.keys(this.attrs)) {
    if (IS_SERVER) {
      setAttribute(
        this.el,
        name,
        unwrapDeep.call(this.component, this.attrs[name])
      );
    } else if (isFunction(this.attrs[name])) {
      effect(
        __privateMethod(this, _Instance_instances, setAttr_fn).bind(this, name)
      );
    } else {
      setAttribute(this.el, name, this.attrs[name]);
    }
  }
};
attachStyles_fn = function () {
  if (!this.styles) return;
  for (const name of Object.keys(this.styles)) {
    if (IS_SERVER) {
      setStyle(
        this.el,
        name,
        unwrapDeep.call(this.component, this.styles[name])
      );
    } else if (isFunction(this.styles[name])) {
      effect(
        __privateMethod(this, _Instance_instances, setStyle_fn).bind(this, name)
      );
    } else {
      setStyle(this.el, name, this.styles[name]);
    }
  }
};
setAttr_fn = function (name) {
  setAttribute(this.el, name, this.attrs[name].call(this.component));
};
setStyle_fn = function (name) {
  setStyle(this.el, name, this.styles[name].call(this.component));
};
function createInstanceProps(props) {
  const $props = {};
  for (const name of Object.keys(props)) {
    const def = props[name];
    $props[name] = signal(def, def);
  }
  return $props;
}
var currentInstance = { $$: null };
function createComponent(Component2, init) {
  return root(() => {
    currentInstance.$$ = new Instance(Component2, getScope(), init);
    const component = new Component2();
    currentInstance.$$.component = component;
    currentInstance.$$ = null;
    return component;
  });
}
var ViewController = class extends EventTarget {
  constructor() {
    super();
    /** @internal */
    __publicField(this, '$$');
    if (currentInstance.$$) this.attach(currentInstance);
  }
  get el() {
    return this.$$.el;
  }
  get $el() {
    return this.$$.$el();
  }
  get scope() {
    return this.$$.scope;
  }
  get attachScope() {
    return this.$$.attachScope;
  }
  get connectScope() {
    return this.$$.connectScope;
  }
  /** @internal */
  get $props() {
    return this.$$.props;
  }
  /** @internal */
  get $state() {
    return this.$$.$state;
  }
  get state() {
    return this.$$.state;
  }
  attach({ $$ }) {
    this.$$ = $$;
    $$.addHooks(this);
    return this;
  }
  addEventListener(type, callback, options) {
    if (!this.el) {
      const name = this.constructor.name;
      console.warn(
        `[maverick] adding event listener to \`${name}\` before element is attached`
      );
    }
    this.listen(type, callback, options);
  }
  removeEventListener(type, callback, options) {
    var _a3;
    (_a3 = this.el) == null
      ? void 0
      : _a3.removeEventListener(type, callback, options);
  }
  /**
   * The given callback is invoked when the component is ready to be set up.
   *
   * - This hook will run once.
   * - This hook is called both client-side and server-side.
   * - It's safe to use context inside this hook.
   * - The host element has not attached yet - wait for `onAttach`.
   */
  /**
   * This method can be used to specify attributes that should be set on the host element. Any
   * attributes that are assigned to a function will be considered a signal and updated accordingly.
   */
  setAttributes(attributes) {
    if (!this.$$.attrs) this.$$.attrs = {};
    Object.assign(this.$$.attrs, attributes);
  }
  /**
   * This method can be used to specify styles that should set be set on the host element. Any
   * styles that are assigned to a function will be considered a signal and updated accordingly.
   */
  setStyles(styles) {
    if (!this.$$.styles) this.$$.styles = {};
    Object.assign(this.$$.styles, styles);
  }
  /**
   * This method is used to satisfy the CSS variables contract specified on the current
   * component. Other CSS variables can be set via the `setStyles` method.
   */
  setCSSVars(vars) {
    this.setStyles(vars);
  }
  /**
   * Type-safe utility for creating component DOM events.
   */
  createEvent(type, ...init) {
    return new DOMEvent(type, init[0]);
  }
  /**
   * Creates a `DOMEvent` and dispatches it from the host element. This method is typed to
   * match all component events.
   */
  dispatch(type, ...init) {
    if (IS_SERVER || !this.el) return false;
    const event = type instanceof Event ? type : new DOMEvent(type, init[0]);
    Object.defineProperty(event, 'target', {
      get: () => this.$$.component,
    });
    return untrack(() => {
      var _a3, _b2;
      (_b2 = (_a3 = this.$$)[ON_DISPATCH]) == null
        ? void 0
        : _b2.call(_a3, event);
      return this.el.dispatchEvent(event);
    });
  }
  dispatchEvent(event) {
    return this.dispatch(event);
  }
  /**
   * Adds an event listener for the given `type` and returns a function which can be invoked to
   * remove the event listener.
   *
   * - The listener is removed if the current scope is disposed.
   * - This method is safe to use on the server (noop).
   */
  listen(type, handler, options) {
    if (IS_SERVER || !this.el) return noop;
    return listenEvent(this.el, type, handler, options);
  }
};
var Component = class extends ViewController {
  subscribe(callback) {
    if (!this.state) {
      const name = this.constructor.name;
      throw Error(
        `[maverick] component \`${name}\` can not be subscribed to because it has no internal state`
      );
    }
    return scoped(() => effect(() => callback(this.state)), this.$$.scope);
  }
  destroy() {
    this.$$.destroy();
  }
};
function prop(target, propertyKey, descriptor) {
  if (!target[PROPS]) target[PROPS] = /* @__PURE__ */ new Set();
  target[PROPS].add(propertyKey);
}
function method(target, propertyKey, descriptor) {
  if (!target[METHODS]) target[METHODS] = /* @__PURE__ */ new Set();
  target[METHODS].add(propertyKey);
}
var _descriptors;
var State = class {
  constructor(record) {
    __publicField(this, 'id', Symbol('STATE'));
    __publicField(this, 'record');
    __privateAdd(this, _descriptors);
    this.record = record;
    __privateSet(this, _descriptors, Object.getOwnPropertyDescriptors(record));
  }
  create() {
    const store = {},
      state = new Proxy(store, { get: (_, prop2) => store[prop2]() });
    for (const name of Object.keys(this.record)) {
      const getter = __privateGet(this, _descriptors)[name].get;
      store[name] = getter
        ? computed(getter.bind(state))
        : signal(this.record[name]);
    }
    return store;
  }
  reset(record, filter) {
    for (const name of Object.keys(record)) {
      if (
        !__privateGet(this, _descriptors)[name].get &&
        (!filter || filter(name))
      ) {
        record[name].set(this.record[name]);
      }
    }
  }
};
_descriptors = new WeakMap();
function useState2(state) {
  return useContext2(state);
}
function camelToKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function kebabToCamelCase(str) {
  return str.replace(/-./g, (x) => x[1].toUpperCase());
}
function kebabToPascalCase(str) {
  return kebabToTitleCase(str).replace(/\s/g, '');
}
function kebabToTitleCase(str) {
  return uppercaseFirstChar(
    str.replace(/-./g, (x) => ' ' + x[1].toUpperCase())
  );
}
function uppercaseFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
var ReactScopeContext = React.createContext({ current: null });
ReactScopeContext.displayName = 'Scope';
function WithScope(scope, ...children) {
  return React.createElement(
    ReactScopeContext.Provider,
    { value: scope },
    ...children
  );
}
function useReactScope() {
  return React.useContext(ReactScopeContext).current;
}
function useReactContext(context) {
  const scope = useReactScope();
  return React.useMemo(() => getContext(context.id, scope), [scope]);
}
function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => refs.forEach((ref) => setRef(ref, node));
}
function createClientComponent(Component2, options) {
  const forwardComponent = React.forwardRef((props, forwardRef2) => {
    var _a3, _b2, _c, _d, _e, _f, _g, _h;
    let parentScopeRef = React.useContext(ReactScopeContext),
      scopeRef = React.useRef(null),
      stateRef = React.useRef();
    if (!stateRef.current) {
      const state2 = createInternalState(),
        component = initComponent(
          Component2,
          state2,
          props,
          parentScopeRef.current
        );
      state2.component = component;
      stateRef.current = state2;
      scopeRef.current = component.scope;
    }
    function onAttach() {
      let state2 = stateRef.current,
        scope = parentScopeRef.current;
      window.cancelAnimationFrame(state2.destroyId);
      state2.destroyId = -1;
      if (state2.component.$$.destroyed) {
        const component = initComponent(Component2, state2, props, scope);
        state2.component = component;
        state2.attached = false;
        state2.forwardRef = false;
        scopeRef.current = component.scope;
      }
      if (state2.el) {
        attachToHost(state2, state2.el);
      }
      if (!state2.forwardRef) {
        setRef(forwardRef2, state2.component);
        state2.forwardRef = true;
      }
      return () => detachFromHost(state2);
    }
    function onRefChange(el) {
      const state2 = stateRef.current;
      if (!state2.forwardRef) {
        state2.el = el;
        return;
      }
      window.cancelAnimationFrame(state2.refChangeId);
      state2.refChangeId = window.requestAnimationFrame(() => {
        const state3 = stateRef.current;
        state3.refChangeId = -1;
        if (state3.el === el) return;
        detachFromHost(state3);
        if (el) attachToHost(state3, el);
        state3.el = el;
      });
    }
    React.useEffect(() => {
      const state2 = stateRef.current;
      window.cancelAnimationFrame(state2.destroyId);
      state2.destroyId = -1;
      return function onDestroy() {
        if (!isFunction(props.children)) return;
        window.cancelAnimationFrame(state2.refChangeId);
        state2.refChangeId = -1;
        window.cancelAnimationFrame(state2.connectId);
        state2.connectId = -1;
        window.cancelAnimationFrame(state2.destroyId);
        state2.destroyId = window.requestAnimationFrame(() => {
          state2.destroyId = -1;
          detachFromHost(state2);
          state2.component.$$.destroy();
          state2.component.$$[ON_DISPATCH] = null;
          state2.callbacks = {};
          state2.domCallbacks = {};
          scopeRef.current = null;
        });
      };
    }, []);
    React.useEffect(tick);
    let state = stateRef.current,
      { children, ...renderProps } = props,
      attrs = {},
      prevPropNames = state.prevProps,
      newPropNames = Object.keys(renderProps);
    state.callbacks = {};
    for (const name of [...prevPropNames, ...newPropNames]) {
      if (options.props.has(name)) {
        state.component.$props[name].set(
          // If the prop was removed we'll use the default value provided on Component creation.
          isUndefined(renderProps[name])
            ? (_a3 = Component2.props) == null
              ? void 0
              : _a3[name]
            : renderProps[name]
        );
      } else if (
        ((_b2 = options.events) == null ? void 0 : _b2.has(name)) ||
        ((_c = options.eventsRE) == null ? void 0 : _c.test(name))
      ) {
        state.callbacks[name] = renderProps[name];
      } else if (
        ((_d = options.domEvents) == null ? void 0 : _d.has(name)) ||
        ((_e = options.domEventsRE) == null ? void 0 : _e.test(name))
      ) {
        let type = camelToKebabCase(name.slice(2));
        state.domCallbacks[type] = renderProps[name];
        if (!newPropNames.includes(name)) {
          (_f = state.el) == null
            ? void 0
            : _f.removeEventListener(type, state.onDOMEvent);
          (_g = state.listening) == null ? void 0 : _g.delete(type);
        } else if (
          state.el &&
          !((_h = state.listening) == null ? void 0 : _h.has(type))
        ) {
          if (!state.listening) state.listening = /* @__PURE__ */ new Set();
          state.listening.add(type);
          state.el.addEventListener(type, state.onDOMEvent);
        }
      } else {
        attrs[name] = renderProps[name];
      }
    }
    state.prevProps = newPropNames;
    return WithScope(
      scopeRef,
      React.createElement(AttachEffect, {
        effect: onAttach,
      }),
      isFunction(children)
        ? children == null
          ? void 0
          : children(
              {
                ...attrs,
                suppressHydrationWarning: true,
                ref: onRefChange,
              },
              state.component
            )
        : children
    );
  });
  forwardComponent.displayName = Component2.name + 'Bridge';
  return forwardComponent;
}
function AttachEffect({ effect: effect2 }) {
  React.useEffect(effect2, []);
  return null;
}
var eventTypeToCallbackName = /* @__PURE__ */ new Map();
function createInternalState() {
  const state = {
    el: null,
    prevProps: [],
    callbacks: {},
    domCallbacks: {},
    refChangeId: -1,
    connectId: -1,
    destroyId: -1,
    attached: false,
    forwardRef: false,
    listening: null,
    onDOMEvent(event) {
      var _a3, _b2;
      const args = !isUndefined(event.detail) ? [event.detail, event] : [event];
      (_b2 = (_a3 = state.domCallbacks)[event.type]) == null
        ? void 0
        : _b2.call(_a3, ...args);
    },
  };
  return state;
}
function attachToHost(state, el) {
  if (state.el === el && state.attached) return;
  else if (state.attached) detachFromHost(state);
  if (state.domCallbacks) {
    if (!state.listening) state.listening = /* @__PURE__ */ new Set();
    for (const type of Object.keys(state.domCallbacks)) {
      if (state.listening.has(type)) continue;
      el.addEventListener(type, state.onDOMEvent);
      state.listening.add(type);
    }
  }
  state.component.$$.attach(el);
  state.connectId = window.requestAnimationFrame(() => {
    state.component.$$.connect();
    state.connectId = -1;
  });
  state.attached = true;
}
function detachFromHost(state) {
  if (!state.attached) return;
  window.cancelAnimationFrame(state.connectId);
  state.connectId = -1;
  state.component.$$.detach();
  state.attached = false;
  if (state.el && state.listening) {
    for (const type of state.listening) {
      state.el.removeEventListener(type, state.onDOMEvent);
    }
    state.listening.clear();
  }
}
function onDispatch(event) {
  var _a3, _b2;
  let callbackProp = eventTypeToCallbackName.get(event.type),
    args = !isUndefined(event.detail) ? [event.detail, event] : [event];
  if (!callbackProp) {
    eventTypeToCallbackName.set(
      event.type,
      (callbackProp = `on${kebabToPascalCase(event.type)}`)
    );
  }
  (_b2 = (_a3 = this.callbacks)[callbackProp]) == null
    ? void 0
    : _b2.call(_a3, ...args);
}
function initComponent(Component2, state, props, scope) {
  const component = createComponent(Component2, { props, scope });
  component.$$[ON_DISPATCH] = onDispatch.bind(state);
  component.$$.setup();
  return component;
}
function escape(value, isAttr = false) {
  const type = typeof value;
  if (type !== 'string') {
    if (!isAttr && type === 'function') return escape(value());
    if (isAttr && type === 'boolean') return value + '';
    return value;
  }
  const delimeter = isAttr ? '"' : '<',
    escapeDelimeter = isAttr ? '&quot;' : '&lt;';
  let iDelimeter = value.indexOf(delimeter),
    isAmpersand = value.indexOf('&');
  if (iDelimeter < 0 && isAmpersand < 0) return value;
  let left = 0,
    out = '';
  while (iDelimeter >= 0 && isAmpersand >= 0) {
    if (iDelimeter < isAmpersand) {
      if (left < iDelimeter) out += value.substring(left, iDelimeter);
      out += escapeDelimeter;
      left = iDelimeter + 1;
      iDelimeter = value.indexOf(delimeter, left);
    } else {
      if (left < isAmpersand) out += value.substring(left, isAmpersand);
      out += '&amp;';
      left = isAmpersand + 1;
      isAmpersand = value.indexOf('&', left);
    }
  }
  if (iDelimeter >= 0) {
    do {
      if (left < iDelimeter) out += value.substring(left, iDelimeter);
      out += escapeDelimeter;
      left = iDelimeter + 1;
      iDelimeter = value.indexOf(delimeter, left);
    } while (iDelimeter >= 0);
  } else
    while (isAmpersand >= 0) {
      if (left < isAmpersand) out += value.substring(left, isAmpersand);
      out += '&amp;';
      left = isAmpersand + 1;
      isAmpersand = value.indexOf('&', left);
    }
  return left < value.length ? out + value.substring(left) : out;
}
var SETUP = Symbol('SETUP');
var classSplitRE = /\s+/;
function parseClassAttr(tokens, attrValue) {
  const classes = attrValue.trim().split(classSplitRE);
  for (const token of classes) tokens.add(token);
}
var styleSplitRE = /\s*:\s*/;
var stylesDelimeterRE = /\s*;\s*/;
function parseStyleAttr(tokens, attrValue) {
  const styles = attrValue.trim().split(stylesDelimeterRE);
  for (let i = 0; i < styles.length; i++) {
    if (styles[i] === '') continue;
    const [name, value] = styles[i].split(styleSplitRE);
    tokens.set(name, value);
  }
}
var MaverickServerElement = class {
  constructor(component) {
    __publicField(this, 'keepAlive', false);
    __publicField(this, 'forwardKeepAlive', true);
    __publicField(this, '$');
    __publicField(this, 'attributes', new ServerAttributes());
    __publicField(this, 'style', new ServerStyle());
    __publicField(this, 'classList', new ServerClassList());
    this.$ = component;
  }
  get $props() {
    return this.$.$$.props;
  }
  get $state() {
    return this.$.$$.$state;
  }
  get state() {
    return this.$.state;
  }
  setup() {
    const instance = this.$.$$;
    scoped(() => {
      if (this.hasAttribute('class')) {
        parseClassAttr(this.classList.tokens, this.getAttribute('class'));
      }
      if (this.hasAttribute('style')) {
        parseStyleAttr(this.style.tokens, this.getAttribute('style'));
      }
      instance.setup();
      instance.attach(this);
      if (this.classList.length > 0) {
        this.setAttribute('class', this.classList.toString());
      }
      if (this.style.length > 0) {
        this.setAttribute('style', this.style.toString());
      }
      if (this.keepAlive) {
        this.setAttribute('keep-alive', '');
      }
    }, instance.scope);
  }
  getAttribute(name) {
    return this.attributes.getAttribute(name);
  }
  setAttribute(name, value) {
    this.attributes.setAttribute(name, value);
  }
  hasAttribute(name) {
    return this.attributes.hasAttribute(name);
  }
  removeAttribute(name) {
    return this.attributes.removeAttribute(name);
  }
  [SETUP]() {}
  addEventListener() {}
  removeEventListener() {}
  dispatchEvent() {
    return false;
  }
  subscribe() {
    return noop;
  }
  destroy() {
    this.$.destroy();
  }
};
var _tokens;
var ServerAttributes = class {
  constructor() {
    __privateAdd(this, _tokens, /* @__PURE__ */ new Map());
  }
  get length() {
    return __privateGet(this, _tokens).size;
  }
  get tokens() {
    return __privateGet(this, _tokens);
  }
  getAttribute(name) {
    return __privateGet(this, _tokens).get(name) ?? null;
  }
  hasAttribute(name) {
    return __privateGet(this, _tokens).has(name);
  }
  setAttribute(name, value) {
    __privateGet(this, _tokens).set(name, value + '');
  }
  removeAttribute(name) {
    __privateGet(this, _tokens).delete(name);
  }
  toString() {
    if (__privateGet(this, _tokens).size === 0) return '';
    let result = '';
    for (const [name, value] of __privateGet(this, _tokens)) {
      result += ` ${name}="${escape(value, true)}"`;
    }
    return result;
  }
};
_tokens = new WeakMap();
var _tokens2;
var ServerStyle = class {
  constructor() {
    __privateAdd(this, _tokens2, /* @__PURE__ */ new Map());
  }
  get length() {
    return __privateGet(this, _tokens2).size;
  }
  get tokens() {
    return __privateGet(this, _tokens2);
  }
  getPropertyValue(prop2) {
    return __privateGet(this, _tokens2).get(prop2) ?? '';
  }
  setProperty(prop2, value) {
    __privateGet(this, _tokens2).set(prop2, value ?? '');
  }
  removeProperty(prop2) {
    const value = __privateGet(this, _tokens2).get(prop2);
    __privateGet(this, _tokens2).delete(prop2);
    return value ?? '';
  }
  toString() {
    if (__privateGet(this, _tokens2).size === 0) return '';
    let result = '';
    for (const [name, value] of __privateGet(this, _tokens2)) {
      result += `${name}: ${value};`;
    }
    return result;
  }
};
_tokens2 = new WeakMap();
var _tokens3;
var ServerClassList = class {
  constructor() {
    __privateAdd(this, _tokens3, /* @__PURE__ */ new Set());
  }
  get length() {
    return __privateGet(this, _tokens3).size;
  }
  get tokens() {
    return __privateGet(this, _tokens3);
  }
  add(...tokens) {
    for (const token of tokens) {
      __privateGet(this, _tokens3).add(token);
    }
  }
  contains(token) {
    return __privateGet(this, _tokens3).has(token);
  }
  remove(token) {
    __privateGet(this, _tokens3).delete(token);
  }
  replace(token, newToken) {
    if (!__privateGet(this, _tokens3).has(token)) return false;
    __privateGet(this, _tokens3).delete(token);
    __privateGet(this, _tokens3).add(newToken);
    return true;
  }
  toggle(token, force) {
    if (
      force !== true &&
      (__privateGet(this, _tokens3).has(token) || force === false)
    ) {
      __privateGet(this, _tokens3).delete(token);
      return false;
    } else {
      __privateGet(this, _tokens3).add(token);
      return true;
    }
  }
  toString() {
    return Array.from(__privateGet(this, _tokens3)).join(' ');
  }
};
_tokens3 = new WeakMap();
var attrsToProps = {
  acceptcharset: 'acceptCharset',
  'accept-charset': 'acceptCharset',
  accesskey: 'accessKey',
  allowfullscreen: 'allowFullScreen',
  autocapitalize: 'autoCapitalize',
  autocomplete: 'autoComplete',
  autocorrect: 'autoCorrect',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  autosave: 'autoSave',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  charset: 'charSet',
  class: 'className',
  classid: 'classID',
  classname: 'className',
  colspan: 'colSpan',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  controlslist: 'controlsList',
  crossorigin: 'crossOrigin',
  dangerouslysetinnerhtml: 'dangerouslySetInnerHTML',
  datetime: 'dateTime',
  defaultchecked: 'defaultChecked',
  defaultvalue: 'defaultValue',
  disablepictureinpicture: 'disablePictureInPicture',
  disableremoteplayback: 'disableRemotePlayback',
  enctype: 'encType',
  enterkeyhint: 'enterKeyHint',
  fetchpriority: 'fetchPriority',
  for: 'htmlFor',
  formmethod: 'formMethod',
  formaction: 'formAction',
  formenctype: 'formEncType',
  formnovalidate: 'formNoValidate',
  formtarget: 'formTarget',
  frameborder: 'frameBorder',
  hreflang: 'hrefLang',
  htmlfor: 'htmlFor',
  httpequiv: 'httpEquiv',
  'http-equiv': 'httpEquiv',
  imagesizes: 'imageSizes',
  imagesrcset: 'imageSrcSet',
  innerhtml: 'innerHTML',
  inputmode: 'inputMode',
  itemid: 'itemID',
  itemprop: 'itemProp',
  itemref: 'itemRef',
  itemscope: 'itemScope',
  itemtype: 'itemType',
  keyparams: 'keyParams',
  keytype: 'keyType',
  marginwidth: 'marginWidth',
  marginheight: 'marginHeight',
  maxlength: 'maxLength',
  mediagroup: 'mediaGroup',
  minlength: 'minLength',
  nomodule: 'noModule',
  novalidate: 'noValidate',
  playsinline: 'playsInline',
  radiogroup: 'radioGroup',
  readonly: 'readOnly',
  referrerpolicy: 'referrerPolicy',
  rowspan: 'rowSpan',
  spellcheck: 'spellCheck',
  srcdoc: 'srcDoc',
  srclang: 'srcLang',
  srcset: 'srcSet',
  tabindex: 'tabIndex',
  usemap: 'useMap',
};
function createServerComponent(Component2, options) {
  function ServerComponent(props) {
    let scope = React.useContext(ReactScopeContext),
      component = createComponent(Component2, {
        props,
        scope: scope.current,
      }),
      host = new MaverickServerElement(component),
      attrs = {},
      { style = {}, children, forwardRef: forwardRef2, ...renderProps } = props;
    if (options.props.size) {
      for (const prop2 of Object.keys(renderProps)) {
        if (!options.props.has(prop2)) attrs[prop2] = renderProps[prop2];
      }
    } else {
      attrs = renderProps;
    }
    host.setup();
    if (host.hasAttribute('style')) {
      for (const [name, value] of host.style.tokens) {
        style[name.startsWith('--') ? name : kebabToCamelCase(name)] = value;
      }
      host.removeAttribute('style');
    }
    for (const [attrName, attrValue] of host.attributes.tokens) {
      const propName = attrsToProps[attrName];
      if (propName) {
        if (!(propName in attrs)) {
          attrs[propName] = attrValue;
        }
        host.removeAttribute(attrName);
      }
    }
    return WithScope(
      { current: component.$$.scope },
      isFunction(children)
        ? children == null
          ? void 0
          : children(
              {
                ...Object.fromEntries(host.attributes.tokens),
                ...attrs,
                style,
              },
              component
            )
        : children,
      React.createElement(() => {
        host.destroy();
        return null;
      })
    );
  }
  ServerComponent.displayName = Component2.name + 'Bridge';
  return ServerComponent;
}
function useStateContext(state) {
  return useReactContext(state);
}
function useSignal(signal2, key2) {
  const [, scheduleReactUpdate] = React.useState();
  React.useEffect(() => {
    return effect$1(() => {
      signal2();
      scheduleReactUpdate({});
    });
  }, [key2 ?? signal2]);
  return signal2();
}
function ariaBool(value) {
  return value ? 'true' : 'false';
}
function createDisposalBin() {
  const disposal = /* @__PURE__ */ new Set();
  return {
    add(...callbacks) {
      for (const callback of callbacks) disposal.add(callback);
    },
    empty() {
      for (const callback of disposal) callback();
      disposal.clear();
    },
  };
}
function keysOf(obj) {
  return Object.keys(obj);
}
function deferredPromise() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
function waitTimeout(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
function animationFrameThrottle(func) {
  if (IS_SERVER) return noop;
  let id = -1,
    lastArgs;
  function throttle2(...args) {
    lastArgs = args;
    if (id >= 0) return;
    id = window.requestAnimationFrame(() => {
      func.apply(this, lastArgs);
      id = -1;
      lastArgs = void 0;
    });
  }
  return throttle2;
}
var requestIdleCallback = IS_SERVER
  ? noop
  : typeof window !== 'undefined'
  ? 'requestIdleCallback' in window
    ? window.requestIdleCallback
    : (cb) => window.setTimeout(cb, 1)
  : noop;
function waitIdlePeriod(callback, options) {
  if (IS_SERVER) return Promise.resolve();
  return new Promise((resolve) => {
    requestIdleCallback((deadline) => {
      callback == null ? void 0 : callback(deadline);
      resolve();
    }, options);
  });
}
function useSignalRecord($state) {
  const [, scheduleReactUpdate] = React.useState(),
    tracking = React.useRef(null);
  if (tracking.current == null) {
    tracking.current = {
      state: {},
      $update: signal({}),
      props: /* @__PURE__ */ new Set(),
    };
  }
  React.useEffect(() => {
    let { state, $update, props } = tracking.current;
    return effect(() => {
      for (const prop2 of props) {
        const value = $state[prop2]();
        state[prop2] = isArray(value) ? [...value] : value;
      }
      $update();
      scheduleReactUpdate({});
    });
  }, [$state]);
  return React.useMemo(() => {
    let { state, $update, props } = tracking.current,
      scheduledUpdate = false;
    props.clear();
    return new Proxy(state, {
      get(_, prop2) {
        if (!props.has(prop2) && prop2 in $state) {
          props.add(prop2);
          const value = $state[prop2]();
          state[prop2] = isArray(value) ? [...value] : value;
          if (!scheduledUpdate) {
            $update.set({});
            scheduledUpdate = true;
            queueMicrotask(() => (scheduledUpdate = false));
          }
        }
        return state[prop2];
      },
      set(_, prop2, newValue) {
        if (!(prop2 in $state)) state[prop2] = newValue;
        return true;
      },
    });
  }, [$state]);
}
function createReactComponent(Component2, options) {
  if (IS_SERVER) {
    return createServerComponent(Component2, {
      props: new Set(Object.keys(Component2.props || {})),
    });
  } else {
    return createClientComponent(Component2, {
      props: new Set(Object.keys(Component2.props || {})),
      events: new Set(options == null ? void 0 : options.events),
      eventsRE: options == null ? void 0 : options.eventsRegex,
      domEvents: options == null ? void 0 : options.domEvents,
      domEventsRE: options == null ? void 0 : options.domEventsRegex,
    });
  }
}
var key = {
  fullscreenEnabled: 0,
  fullscreenElement: 1,
  requestFullscreen: 2,
  exitFullscreen: 3,
  fullscreenchange: 4,
  fullscreenerror: 5,
  fullscreen: 6,
};
var webkit = [
  'webkitFullscreenEnabled',
  'webkitFullscreenElement',
  'webkitRequestFullscreen',
  'webkitExitFullscreen',
  'webkitfullscreenchange',
  'webkitfullscreenerror',
  '-webkit-full-screen',
];
var moz = [
  'mozFullScreenEnabled',
  'mozFullScreenElement',
  'mozRequestFullScreen',
  'mozCancelFullScreen',
  'mozfullscreenchange',
  'mozfullscreenerror',
  '-moz-full-screen',
];
var ms = [
  'msFullscreenEnabled',
  'msFullscreenElement',
  'msRequestFullscreen',
  'msExitFullscreen',
  'MSFullscreenChange',
  'MSFullscreenError',
  '-ms-fullscreen',
];
var document$1 =
  typeof window !== 'undefined' && typeof window.document !== 'undefined'
    ? window.document
    : {};
var vendor =
  ('fullscreenEnabled' in document$1 && Object.keys(key)) ||
  (webkit[0] in document$1 && webkit) ||
  (moz[0] in document$1 && moz) ||
  (ms[0] in document$1 && ms) ||
  [];
var fscreen = {
  requestFullscreen: function (element) {
    return element[vendor[key.requestFullscreen]]();
  },
  requestFullscreenFunction: function (element) {
    return element[vendor[key.requestFullscreen]];
  },
  get exitFullscreen() {
    return document$1[vendor[key.exitFullscreen]].bind(document$1);
  },
  get fullscreenPseudoClass() {
    return ':' + vendor[key.fullscreen];
  },
  addEventListener: function (type, handler, options) {
    return document$1.addEventListener(vendor[key[type]], handler, options);
  },
  removeEventListener: function (type, handler, options) {
    return document$1.removeEventListener(vendor[key[type]], handler, options);
  },
  get fullscreenEnabled() {
    return Boolean(document$1[vendor[key.fullscreenEnabled]]);
  },
  set fullscreenEnabled(val) {},
  get fullscreenElement() {
    return document$1[vendor[key.fullscreenElement]];
  },
  set fullscreenElement(val) {},
  get onfullscreenchange() {
    return document$1[('on' + vendor[key.fullscreenchange]).toLowerCase()];
  },
  set onfullscreenchange(handler) {
    return (document$1[('on' + vendor[key.fullscreenchange]).toLowerCase()] =
      handler);
  },
  get onfullscreenerror() {
    return document$1[('on' + vendor[key.fullscreenerror]).toLowerCase()];
  },
  set onfullscreenerror(handler) {
    return (document$1[('on' + vendor[key.fullscreenerror]).toLowerCase()] =
      handler);
  },
};
var functionThrottle = throttle;
function throttle(fn, interval, options) {
  var timeoutId = null;
  var throttledFn = null;
  var leading = options && options.leading;
  var trailing = options && options.trailing;
  if (leading == null) {
    leading = true;
  }
  if (trailing == null) {
    trailing = !leading;
  }
  if (leading == true) {
    trailing = false;
  }
  var cancel = function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  var flush = function () {
    var call = throttledFn;
    cancel();
    if (call) {
      call();
    }
  };
  var throttleWrapper = function () {
    var callNow = leading && !timeoutId;
    var context = this;
    var args = arguments;
    throttledFn = function () {
      return fn.apply(context, args);
    };
    if (!timeoutId) {
      timeoutId = setTimeout(function () {
        timeoutId = null;
        if (trailing) {
          return throttledFn();
        }
      }, interval);
    }
    if (callNow) {
      callNow = false;
      return throttledFn();
    }
  };
  throttleWrapper.cancel = cancel;
  throttleWrapper.flush = flush;
  return throttleWrapper;
}
var functionDebounce = debounce;
function debounce(fn, wait, callFirst) {
  var timeout = null;
  var debouncedFn = null;
  var clear = function () {
    if (timeout) {
      clearTimeout(timeout);
      debouncedFn = null;
      timeout = null;
    }
  };
  var flush = function () {
    var call = debouncedFn;
    clear();
    if (call) {
      call();
    }
  };
  var debounceWrapper = function () {
    if (!wait) {
      return fn.apply(this, arguments);
    }
    var context = this;
    var args = arguments;
    var callNow = callFirst && !timeout;
    clear();
    debouncedFn = function () {
      fn.apply(context, args);
    };
    timeout = setTimeout(function () {
      timeout = null;
      if (!callNow) {
        var call = debouncedFn;
        debouncedFn = null;
        return call();
      }
    }, wait);
    if (callNow) {
      return debouncedFn();
    }
  };
  debounceWrapper.cancel = clear;
  debounceWrapper.flush = flush;
  return debounceWrapper;
}
var t = (t2) => 'object' == typeof t2 && null != t2 && 1 === t2.nodeType;
var e = (t2, e2) =>
  (!e2 || 'hidden' !== t2) && 'visible' !== t2 && 'clip' !== t2;
var n = (t2, n2) => {
  if (t2.clientHeight < t2.scrollHeight || t2.clientWidth < t2.scrollWidth) {
    const o2 = getComputedStyle(t2, null);
    return (
      e(o2.overflowY, n2) ||
      e(o2.overflowX, n2) ||
      ((t3) => {
        const e2 = ((t4) => {
          if (!t4.ownerDocument || !t4.ownerDocument.defaultView) return null;
          try {
            return t4.ownerDocument.defaultView.frameElement;
          } catch (t5) {
            return null;
          }
        })(t3);
        return (
          !!e2 &&
          (e2.clientHeight < t3.scrollHeight || e2.clientWidth < t3.scrollWidth)
        );
      })(t2)
    );
  }
  return false;
};
var o = (t2, e2, n2, o2, l2, r2, i, s) =>
  (r2 < t2 && i > e2) || (r2 > t2 && i < e2)
    ? 0
    : (r2 <= t2 && s <= n2) || (i >= e2 && s >= n2)
    ? r2 - t2 - o2
    : (i > e2 && s < n2) || (r2 < t2 && s > n2)
    ? i - e2 + l2
    : 0;
var l = (t2) => {
  const e2 = t2.parentElement;
  return null == e2 ? t2.getRootNode().host || null : e2;
};
var r = (e2, r2) => {
  var i, s, d, h;
  if ('undefined' == typeof document) return [];
  const {
      scrollMode: c,
      block: f,
      inline: u,
      boundary: a,
      skipOverflowHiddenElements: g,
    } = r2,
    p = 'function' == typeof a ? a : (t2) => t2 !== a;
  if (!t(e2)) throw new TypeError('Invalid target');
  const m = document.scrollingElement || document.documentElement,
    w = [];
  let W = e2;
  for (; t(W) && p(W); ) {
    if (((W = l(W)), W === m)) {
      w.push(W);
      break;
    }
    (null != W &&
      W === document.body &&
      n(W) &&
      !n(document.documentElement)) ||
      (null != W && n(W, g) && w.push(W));
  }
  const b =
      null != (s = null == (i = window.visualViewport) ? void 0 : i.width)
        ? s
        : innerWidth,
    H =
      null != (h = null == (d = window.visualViewport) ? void 0 : d.height)
        ? h
        : innerHeight,
    { scrollX: y, scrollY: M } = window,
    {
      height: v,
      width: E,
      top: x,
      right: C,
      bottom: I,
      left: R,
    } = e2.getBoundingClientRect(),
    {
      top: T,
      right: B,
      bottom: F,
      left: V,
    } = ((t2) => {
      const e3 = window.getComputedStyle(t2);
      return {
        top: parseFloat(e3.scrollMarginTop) || 0,
        right: parseFloat(e3.scrollMarginRight) || 0,
        bottom: parseFloat(e3.scrollMarginBottom) || 0,
        left: parseFloat(e3.scrollMarginLeft) || 0,
      };
    })(e2);
  let k =
      'start' === f || 'nearest' === f
        ? x - T
        : 'end' === f
        ? I + F
        : x + v / 2 - T + F,
    D = 'center' === u ? R + E / 2 - V + B : 'end' === u ? C + B : R - V;
  const L = [];
  for (let t2 = 0; t2 < w.length; t2++) {
    const e3 = w[t2],
      {
        height: n2,
        width: l2,
        top: r3,
        right: i2,
        bottom: s2,
        left: d2,
      } = e3.getBoundingClientRect();
    if (
      'if-needed' === c &&
      x >= 0 &&
      R >= 0 &&
      I <= H &&
      C <= b &&
      x >= r3 &&
      I <= s2 &&
      R >= d2 &&
      C <= i2
    )
      return L;
    const h2 = getComputedStyle(e3),
      a2 = parseInt(h2.borderLeftWidth, 10),
      g2 = parseInt(h2.borderTopWidth, 10),
      p2 = parseInt(h2.borderRightWidth, 10),
      W2 = parseInt(h2.borderBottomWidth, 10);
    let T2 = 0,
      B2 = 0;
    const F2 =
        'offsetWidth' in e3 ? e3.offsetWidth - e3.clientWidth - a2 - p2 : 0,
      V2 =
        'offsetHeight' in e3 ? e3.offsetHeight - e3.clientHeight - g2 - W2 : 0,
      S =
        'offsetWidth' in e3
          ? 0 === e3.offsetWidth
            ? 0
            : l2 / e3.offsetWidth
          : 0,
      X =
        'offsetHeight' in e3
          ? 0 === e3.offsetHeight
            ? 0
            : n2 / e3.offsetHeight
          : 0;
    if (m === e3)
      (T2 =
        'start' === f
          ? k
          : 'end' === f
          ? k - H
          : 'nearest' === f
          ? o(M, M + H, H, g2, W2, M + k, M + k + v, v)
          : k - H / 2),
        (B2 =
          'start' === u
            ? D
            : 'center' === u
            ? D - b / 2
            : 'end' === u
            ? D - b
            : o(y, y + b, b, a2, p2, y + D, y + D + E, E)),
        (T2 = Math.max(0, T2 + M)),
        (B2 = Math.max(0, B2 + y));
    else {
      (T2 =
        'start' === f
          ? k - r3 - g2
          : 'end' === f
          ? k - s2 + W2 + V2
          : 'nearest' === f
          ? o(r3, s2, n2, g2, W2 + V2, k, k + v, v)
          : k - (r3 + n2 / 2) + V2 / 2),
        (B2 =
          'start' === u
            ? D - d2 - a2
            : 'center' === u
            ? D - (d2 + l2 / 2) + F2 / 2
            : 'end' === u
            ? D - i2 + p2 + F2
            : o(d2, i2, l2, a2, p2 + F2, D, D + E, E));
      const { scrollLeft: t3, scrollTop: h3 } = e3;
      (T2 =
        0 === X
          ? 0
          : Math.max(0, Math.min(h3 + T2 / X, e3.scrollHeight - n2 / X + V2))),
        (B2 =
          0 === S
            ? 0
            : Math.max(0, Math.min(t3 + B2 / S, e3.scrollWidth - l2 / S + F2))),
        (k += h3 - T2),
        (D += t3 - B2);
    }
    L.push({ el: e3, top: T2, left: B2 });
  }
  return L;
};
var Icon$0 = `<path fill-rule="evenodd" clip-rule="evenodd" d="M15.0007 28.7923C15.0007 29.0152 14.9774 29.096 14.9339 29.1775C14.8903 29.259 14.8263 29.323 14.7449 29.3665C14.6634 29.4101 14.5826 29.4333 14.3597 29.4333H12.575C12.3521 29.4333 12.2713 29.4101 12.1898 29.3665C12.1083 29.323 12.0443 29.259 12.0008 29.1775C11.9572 29.096 11.934 29.0152 11.934 28.7923V12.2993L5.97496 12.3C5.75208 12.3 5.67125 12.2768 5.58977 12.2332C5.50829 12.1896 5.44434 12.1257 5.40077 12.0442C5.35719 11.9627 5.33398 11.8819 5.33398 11.659V9.87429C5.33398 9.65141 5.35719 9.57059 5.40077 9.48911C5.44434 9.40762 5.50829 9.34368 5.58977 9.3001C5.67125 9.25652 5.75208 9.23332 5.97496 9.23332H26.0263C26.2492 9.23332 26.33 9.25652 26.4115 9.3001C26.493 9.34368 26.557 9.40762 26.6005 9.48911C26.6441 9.57059 26.6673 9.65141 26.6673 9.87429V11.659C26.6673 11.8819 26.6441 11.9627 26.6005 12.0442C26.557 12.1257 26.493 12.1896 26.4115 12.2332C26.33 12.2768 26.2492 12.3 26.0263 12.3L20.067 12.2993L20.0673 28.7923C20.0673 29.0152 20.0441 29.096 20.0005 29.1775C19.957 29.259 19.893 29.323 19.8115 29.3665C19.73 29.4101 19.6492 29.4333 19.4263 29.4333H17.6416C17.4187 29.4333 17.3379 29.4101 17.2564 29.3665C17.175 29.323 17.111 29.259 17.0674 29.1775C17.0239 29.096 17.0007 29.0152 17.0007 28.7923L17 22.7663H15L15.0007 28.7923Z" fill="currentColor"/> <path d="M16.0007 7.89998C17.4734 7.89998 18.6673 6.70608 18.6673 5.23332C18.6673 3.76056 17.4734 2.56665 16.0007 2.56665C14.5279 2.56665 13.334 3.76056 13.334 5.23332C13.334 6.70608 14.5279 7.89998 16.0007 7.89998Z" fill="currentColor"/>`;
var Icon$5 = `<path d="M5.33334 6.00001C5.33334 5.63182 5.63181 5.33334 6 5.33334H26C26.3682 5.33334 26.6667 5.63182 26.6667 6.00001V20.6667C26.6667 21.0349 26.3682 21.3333 26 21.3333H23.7072C23.4956 21.3333 23.2966 21.233 23.171 21.0628L22.1859 19.7295C21.8607 19.2894 22.1749 18.6667 22.7221 18.6667H23.3333C23.7015 18.6667 24 18.3682 24 18V8.66668C24 8.29849 23.7015 8.00001 23.3333 8.00001H8.66667C8.29848 8.00001 8 8.29849 8 8.66668V18C8 18.3682 8.29848 18.6667 8.66667 18.6667H9.29357C9.84072 18.6667 10.1549 19.2894 9.82976 19.7295L8.84467 21.0628C8.71898 21.233 8.52 21.3333 8.30848 21.3333H6C5.63181 21.3333 5.33334 21.0349 5.33334 20.6667V6.00001Z" fill="currentColor"/> <path d="M8.78528 25.6038C8.46013 26.0439 8.77431 26.6667 9.32147 26.6667L22.6785 26.6667C23.2256 26.6667 23.5398 26.0439 23.2146 25.6038L16.5358 16.5653C16.2693 16.2046 15.73 16.2047 15.4635 16.5653L8.78528 25.6038Z" fill="currentColor"/>`;
var Icon$8 = `<path d="M17.4853 18.9093C17.4853 19.0281 17.6289 19.0875 17.7129 19.0035L22.4185 14.2979C22.6788 14.0376 23.1009 14.0376 23.3613 14.2979L24.7755 15.7122C25.0359 15.9725 25.0359 16.3946 24.7755 16.655L16.2902 25.1403C16.0299 25.4006 15.6078 25.4006 15.3474 25.1403L13.9332 23.726L13.9319 23.7247L6.86189 16.6547C6.60154 16.3944 6.60154 15.9723 6.86189 15.7119L8.2761 14.2977C8.53645 14.0373 8.95856 14.0373 9.21891 14.2977L13.9243 19.0031C14.0083 19.0871 14.1519 19.0276 14.1519 18.9088L14.1519 6.00004C14.1519 5.63185 14.4504 5.33337 14.8186 5.33337L16.8186 5.33337C17.1868 5.33337 17.4853 5.63185 17.4853 6.00004L17.4853 18.9093Z" fill="currentColor"/>`;
var Icon$11 = `<path d="M13.0908 14.3334C12.972 14.3334 12.9125 14.1898 12.9965 14.1058L17.7021 9.40022C17.9625 9.13987 17.9625 8.71776 17.7021 8.45741L16.2879 7.04319C16.0275 6.78284 15.6054 6.78284 15.3451 7.04319L6.8598 15.5285C6.59945 15.7888 6.59945 16.2109 6.8598 16.4713L8.27401 17.8855L8.27536 17.8868L15.3453 24.9568C15.6057 25.2172 16.0278 25.2172 16.2881 24.9568L17.7024 23.5426C17.9627 23.2822 17.9627 22.8601 17.7024 22.5998L12.9969 17.8944C12.9129 17.8104 12.9724 17.6668 13.0912 17.6668L26 17.6668C26.3682 17.6668 26.6667 17.3683 26.6667 17.0001V15.0001C26.6667 14.6319 26.3682 14.3334 26 14.3334L13.0908 14.3334Z" fill="currentColor"/>`;
var Icon$13 = `<path d="M14.1521 13.0929C14.1521 12.9741 14.0085 12.9147 13.9245 12.9987L9.21891 17.7043C8.95856 17.9646 8.53645 17.9646 8.2761 17.7043L6.86189 16.29C6.60154 16.0297 6.60154 15.6076 6.86189 15.3472L15.3472 6.86195C15.6075 6.6016 16.0296 6.6016 16.29 6.86195L17.7042 8.27616L17.7055 8.27751L24.7755 15.3475C25.0359 15.6078 25.0359 16.0299 24.7755 16.2903L23.3613 17.7045C23.1009 17.9649 22.6788 17.9649 22.4185 17.7045L17.7131 12.9991C17.6291 12.9151 17.4855 12.9746 17.4855 13.0934V26.0022C17.4855 26.3704 17.187 26.6688 16.8188 26.6688H14.8188C14.4506 26.6688 14.1521 26.3704 14.1521 26.0022L14.1521 13.0929Z" fill="currentColor"/>`;
var Icon$16 = `<path d="M16.6927 25.3346C16.3245 25.3346 16.026 25.0361 16.026 24.6679L16.026 7.3346C16.026 6.96641 16.3245 6.66794 16.6927 6.66794L18.6927 6.66794C19.0609 6.66794 19.3594 6.96642 19.3594 7.3346L19.3594 24.6679C19.3594 25.0361 19.0609 25.3346 18.6927 25.3346H16.6927Z" fill="currentColor"/> <path d="M24.026 25.3346C23.6578 25.3346 23.3594 25.0361 23.3594 24.6679L23.3594 7.3346C23.3594 6.96641 23.6578 6.66794 24.026 6.66794L26.026 6.66794C26.3942 6.66794 26.6927 6.96642 26.6927 7.3346V24.6679C26.6927 25.0361 26.3942 25.3346 26.026 25.3346H24.026Z" fill="currentColor"/> <path d="M5.48113 23.9407C5.38584 24.2963 5.59689 24.6619 5.95254 24.7572L7.88439 25.2748C8.24003 25.3701 8.60559 25.159 8.70089 24.8034L13.1871 8.06067C13.2824 7.70503 13.0713 7.33947 12.7157 7.24417L10.7838 6.72654C10.4282 6.63124 10.0626 6.8423 9.96733 7.19794L5.48113 23.9407Z" fill="currentColor"/>`;
var Icon$19 = `<path fill-rule="evenodd" clip-rule="evenodd" d="M24.9266 7.57992C25.015 7.60672 25.0886 7.64746 25.2462 7.80506L26.956 9.51488C27.1136 9.67248 27.1543 9.74604 27.1811 9.83447C27.2079 9.9229 27.2079 10.0133 27.1811 10.1018C27.1543 10.1902 27.1136 10.2638 26.956 10.4214L13.1822 24.1951C13.0246 24.3527 12.951 24.3935 12.8626 24.4203C12.797 24.4402 12.7304 24.4453 12.6642 24.4357L12.7319 24.4203C12.6435 24.4471 12.553 24.4471 12.4646 24.4203C12.3762 24.3935 12.3026 24.3527 12.145 24.1951L5.04407 17.0942C4.88647 16.9366 4.84573 16.863 4.81893 16.7746C4.79213 16.6862 4.79213 16.5957 4.81893 16.5073C4.84573 16.4189 4.88647 16.3453 5.04407 16.1877L6.7539 14.4779C6.9115 14.3203 6.98506 14.2796 7.07349 14.2528C7.16191 14.226 7.25235 14.226 7.34078 14.2528C7.42921 14.2796 7.50277 14.3203 7.66037 14.4779L12.6628 19.4808L24.3397 7.80506C24.4973 7.64746 24.5709 7.60672 24.6593 7.57992C24.7477 7.55311 24.8382 7.55311 24.9266 7.57992Z" fill="currentColor"/>`;
var Icon$22 = `<path d="M17.947 16.095C17.999 16.043 17.999 15.9585 17.947 15.9065L11.6295 9.58899C11.3691 9.32864 11.3691 8.90653 11.6295 8.64618L13.2323 7.04341C13.4926 6.78306 13.9147 6.78306 14.1751 7.04341L21.0289 13.8973C21.0392 13.9064 21.0493 13.9158 21.0591 13.9257L22.6619 15.5285C22.9223 15.7888 22.9223 16.2109 22.6619 16.4713L14.1766 24.9565C13.9163 25.2169 13.4942 25.2169 13.2338 24.9565L11.631 23.3538C11.3707 23.0934 11.3707 22.6713 11.631 22.411L17.947 16.095Z" fill="currentColor"/>`;
var Icon$24 = `<path fill-rule="evenodd" clip-rule="evenodd" d="M6 7C5.63181 7 5.33333 7.29848 5.33333 7.66667V14.8667C5.33333 14.9403 5.39361 14.9999 5.46724 15.0009C10.8844 15.0719 15.2614 19.449 15.3325 24.8661C15.3334 24.9397 15.393 25 15.4667 25H26C26.3682 25 26.6667 24.7015 26.6667 24.3333V7.66667C26.6667 7.29848 26.3682 7 26 7H6ZM17.0119 22.2294C17.0263 22.29 17.0802 22.3333 17.1425 22.3333H23.3333C23.7015 22.3333 24 22.0349 24 21.6667V10.3333C24 9.96514 23.7015 9.66667 23.3333 9.66667H8.66667C8.29848 9.66667 8 9.96514 8 10.3333V13.1909C8 13.2531 8.04332 13.3071 8.10392 13.3214C12.5063 14.3618 15.9715 17.827 17.0119 22.2294Z" fill="currentColor"/> <path d="M13.2 25C13.2736 25 13.3334 24.9398 13.3322 24.8661C13.2615 20.5544 9.77889 17.0718 5.46718 17.0011C5.39356 16.9999 5.33333 17.0597 5.33333 17.1333V18.8667C5.33333 18.9403 5.39348 18.9999 5.4671 19.0015C8.67465 19.0716 11.2617 21.6587 11.3319 24.8662C11.3335 24.9399 11.393 25 11.4667 25H13.2Z" fill="currentColor"/> <path d="M5.33333 21.1333C5.33333 21.0597 5.39332 20.9998 5.46692 21.0022C7.57033 21.0712 9.26217 22.763 9.33114 24.8664C9.33356 24.94 9.27364 25 9.2 25H6C5.63181 25 5.33333 24.7015 5.33333 24.3333V21.1333Z" fill="currentColor"/>`;
var chromecast = Object.freeze({
  __proto__: null,
  default: Icon$24,
});
var Icon$26 = `<path d="M8 28.0003C8 27.6321 8.29848 27.3336 8.66667 27.3336H23.3333C23.7015 27.3336 24 27.6321 24 28.0003V29.3336C24 29.7018 23.7015 30.0003 23.3333 30.0003H8.66667C8.29848 30.0003 8 29.7018 8 29.3336V28.0003Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.66602 6.66699C4.29783 6.66699 3.99935 6.96547 3.99935 7.33366V24.667C3.99935 25.0352 4.29783 25.3337 4.66602 25.3337H27.3327C27.7009 25.3337 27.9994 25.0352 27.9994 24.667V7.33366C27.9994 6.96547 27.7009 6.66699 27.3327 6.66699H4.66602ZM8.66659 21.3333C8.2984 21.3333 7.99992 21.0349 7.99992 20.6667V11.3333C7.99992 10.9651 8.2984 10.6667 8.66659 10.6667H13.9999C14.3681 10.6667 14.6666 10.9651 14.6666 11.3333V12.6667C14.6666 13.0349 14.3681 13.3333 13.9999 13.3333H10.7999C10.7263 13.3333 10.6666 13.393 10.6666 13.4667V18.5333C10.6666 18.607 10.7263 18.6667 10.7999 18.6667H13.9999C14.3681 18.6667 14.6666 18.9651 14.6666 19.3333V20.6667C14.6666 21.0349 14.3681 21.3333 13.9999 21.3333H8.66659ZM17.9999 21.3333C17.6317 21.3333 17.3333 21.0349 17.3333 20.6667V11.3333C17.3333 10.9651 17.6317 10.6667 17.9999 10.6667H23.3333C23.7014 10.6667 23.9999 10.9651 23.9999 11.3333V12.6667C23.9999 13.0349 23.7014 13.3333 23.3333 13.3333H20.1333C20.0596 13.3333 19.9999 13.393 19.9999 13.4667V18.5333C19.9999 18.607 20.0596 18.6667 20.1333 18.6667H23.3333C23.7014 18.6667 23.9999 18.9651 23.9999 19.3333V20.6667C23.9999 21.0349 23.7014 21.3333 23.3333 21.3333H17.9999Z" fill="currentColor"/>`;
var Icon$27 = `<path fill-rule="evenodd" clip-rule="evenodd" d="M4.6661 6.66699C4.29791 6.66699 3.99943 6.96547 3.99943 7.33366V24.667C3.99943 25.0352 4.29791 25.3337 4.6661 25.3337H27.3328C27.701 25.3337 27.9994 25.0352 27.9994 24.667V7.33366C27.9994 6.96547 27.701 6.66699 27.3328 6.66699H4.6661ZM8.66667 21.3333C8.29848 21.3333 8 21.0349 8 20.6667V11.3333C8 10.9651 8.29848 10.6667 8.66667 10.6667H14C14.3682 10.6667 14.6667 10.9651 14.6667 11.3333V12.6667C14.6667 13.0349 14.3682 13.3333 14 13.3333H10.8C10.7264 13.3333 10.6667 13.393 10.6667 13.4667V18.5333C10.6667 18.607 10.7264 18.6667 10.8 18.6667H14C14.3682 18.6667 14.6667 18.9651 14.6667 19.3333V20.6667C14.6667 21.0349 14.3682 21.3333 14 21.3333H8.66667ZM18 21.3333C17.6318 21.3333 17.3333 21.0349 17.3333 20.6667V11.3333C17.3333 10.9651 17.6318 10.6667 18 10.6667H23.3333C23.7015 10.6667 24 10.9651 24 11.3333V12.6667C24 13.0349 23.7015 13.3333 23.3333 13.3333H20.1333C20.0597 13.3333 20 13.393 20 13.4667V18.5333C20 18.607 20.0597 18.6667 20.1333 18.6667H23.3333C23.7015 18.6667 24 18.9651 24 19.3333V20.6667C24 21.0349 23.7015 21.3333 23.3333 21.3333H18Z" fill="currentColor"/>`;
var Icon$31 = `<path d="M14.2225 13.7867C14.3065 13.8706 14.4501 13.8112 14.4501 13.6924V5.99955C14.4501 5.63136 14.7486 5.33289 15.1167 5.33289H16.8501C17.2183 5.33289 17.5167 5.63136 17.5167 5.99955V13.6916C17.5167 13.8104 17.6604 13.8699 17.7444 13.7859L19.9433 11.5869C20.2037 11.3266 20.6258 11.3266 20.8861 11.5869L22.1118 12.8126C22.3722 13.0729 22.3722 13.4951 22.1118 13.7554L16.4549 19.4123C16.1946 19.6726 15.772 19.6731 15.5116 19.4128L9.85479 13.7559C9.59444 13.4956 9.59444 13.0734 9.85479 12.8131L11.0804 11.5874C11.3408 11.3271 11.7629 11.3271 12.0233 11.5874L14.2225 13.7867Z" fill="currentColor"/> <path d="M5.99998 20.267C5.63179 20.267 5.33331 20.5654 5.33331 20.9336V25.9997C5.33331 26.3678 5.63179 26.6663 5.99998 26.6663H26C26.3682 26.6663 26.6666 26.3678 26.6666 25.9997V20.9336C26.6666 20.5654 26.3682 20.267 26 20.267H24.2666C23.8985 20.267 23.6 20.5654 23.6 20.9336V22.9333C23.6 23.3014 23.3015 23.5999 22.9333 23.5999H9.06638C8.69819 23.5999 8.39972 23.3014 8.39972 22.9333V20.9336C8.39972 20.5654 8.10124 20.267 7.73305 20.267H5.99998Z" fill="currentColor"/>`;
var Icon$33 = `<path d="M16 20C18.2091 20 20 18.2092 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2092 13.7909 20 16 20Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M28 16.0058C28 18.671 23.5 25.3334 16 25.3334C8.5 25.3334 4 18.6762 4 16.0058C4 13.3354 8.50447 6.66669 16 6.66669C23.4955 6.66669 28 13.3406 28 16.0058ZM25.3318 15.9934C25.3328 16.0017 25.3328 16.0099 25.3318 16.0182C25.3274 16.0571 25.3108 16.1728 25.2485 16.3708C25.1691 16.6229 25.0352 16.9462 24.8327 17.3216C24.4264 18.0749 23.7969 18.9398 22.9567 19.754C21.2791 21.3798 18.9148 22.6667 16 22.6667C13.0845 22.6667 10.7202 21.3805 9.04298 19.7557C8.20295 18.9419 7.57362 18.0773 7.16745 17.3241C6.96499 16.9486 6.83114 16.6252 6.75172 16.3729C6.67942 16.1431 6.66856 16.0243 6.66695 16.0066L6.66695 16.005C6.66859 15.9871 6.67951 15.8682 6.75188 15.6383C6.83145 15.3854 6.96554 15.0614 7.16831 14.6853C7.57507 13.9306 8.20514 13.0644 9.04577 12.249C10.7245 10.6208 13.0886 9.33335 16 9.33335C18.9108 9.33335 21.2748 10.6215 22.9539 12.2507C23.7947 13.0664 24.4249 13.933 24.8318 14.6877C25.0346 15.0639 25.1688 15.3878 25.2483 15.6404C25.3107 15.8386 25.3274 15.9545 25.3318 15.9934Z" fill="currentColor"/>`;
var Icon$34 = `<path d="M15.8747 8.11857C16.3148 7.79342 16.9375 8.10759 16.9375 8.65476V14.2575C16.9375 14.3669 17.0621 14.4297 17.1501 14.3647L25.6038 8.11857C26.0439 7.79342 26.6667 8.10759 26.6667 8.65476V23.3451C26.6667 23.8923 26.0439 24.2064 25.6038 23.8813L17.1501 17.6346C17.0621 17.5695 16.9375 17.6324 16.9375 17.7418L16.9375 23.3451C16.9375 23.8923 16.3147 24.2064 15.8747 23.8813L5.93387 16.5358C5.57322 16.2693 5.57323 15.7299 5.93389 15.4634L15.8747 8.11857Z" fill="currentColor"/>`;
var Icon$35 = `<path d="M16.1253 8.11866C15.6852 7.7935 15.0625 8.10768 15.0625 8.65484V14.2576C15.0625 14.367 14.9379 14.4298 14.8499 14.3648L6.39615 8.11866C5.95607 7.7935 5.33331 8.10768 5.33331 8.65484V23.3452C5.33331 23.8923 5.9561 24.2065 6.39617 23.8813L14.8499 17.6347C14.9379 17.5696 15.0625 17.6325 15.0625 17.7419L15.0625 23.3452C15.0625 23.8923 15.6853 24.2065 16.1253 23.8813L26.0661 16.5358C26.4268 16.2694 26.4268 15.73 26.0661 15.4635L16.1253 8.11866Z" fill="currentColor"/>`;
var Icon$39 = `<path d="M19.3334 13.3333C18.9652 13.3333 18.6667 13.0349 18.6667 12.6667L18.6667 7.33333C18.6667 6.96514 18.9652 6.66666 19.3334 6.66666H21.3334C21.7015 6.66666 22 6.96514 22 7.33333V9.86666C22 9.9403 22.0597 10 22.1334 10L24.6667 10C25.0349 10 25.3334 10.2985 25.3334 10.6667V12.6667C25.3334 13.0349 25.0349 13.3333 24.6667 13.3333L19.3334 13.3333Z" fill="currentColor"/> <path d="M13.3334 19.3333C13.3334 18.9651 13.0349 18.6667 12.6667 18.6667H7.33335C6.96516 18.6667 6.66669 18.9651 6.66669 19.3333V21.3333C6.66669 21.7015 6.96516 22 7.33335 22H9.86669C9.94032 22 10 22.0597 10 22.1333L10 24.6667C10 25.0349 10.2985 25.3333 10.6667 25.3333H12.6667C13.0349 25.3333 13.3334 25.0349 13.3334 24.6667L13.3334 19.3333Z" fill="currentColor"/> <path d="M18.6667 24.6667C18.6667 25.0349 18.9652 25.3333 19.3334 25.3333H21.3334C21.7015 25.3333 22 25.0349 22 24.6667V22.1333C22 22.0597 22.0597 22 22.1334 22H24.6667C25.0349 22 25.3334 21.7015 25.3334 21.3333V19.3333C25.3334 18.9651 25.0349 18.6667 24.6667 18.6667L19.3334 18.6667C18.9652 18.6667 18.6667 18.9651 18.6667 19.3333L18.6667 24.6667Z" fill="currentColor"/> <path d="M10.6667 13.3333H12.6667C13.0349 13.3333 13.3334 13.0349 13.3334 12.6667L13.3334 10.6667V7.33333C13.3334 6.96514 13.0349 6.66666 12.6667 6.66666H10.6667C10.2985 6.66666 10 6.96514 10 7.33333L10 9.86666C10 9.9403 9.94033 10 9.86669 10L7.33335 10C6.96516 10 6.66669 10.2985 6.66669 10.6667V12.6667C6.66669 13.0349 6.96516 13.3333 7.33335 13.3333L10.6667 13.3333Z" fill="currentColor"/>`;
var Icon$40 = `<path d="M25.3299 7.26517C25.2958 6.929 25.0119 6.66666 24.6667 6.66666H19.3334C18.9652 6.66666 18.6667 6.96514 18.6667 7.33333V9.33333C18.6667 9.70152 18.9652 10 19.3334 10L21.8667 10C21.9403 10 22 10.0597 22 10.1333V12.6667C22 13.0349 22.2985 13.3333 22.6667 13.3333H24.6667C25.0349 13.3333 25.3334 13.0349 25.3334 12.6667V7.33333C25.3334 7.31032 25.3322 7.28758 25.3299 7.26517Z" fill="currentColor"/> <path d="M22 21.8667C22 21.9403 21.9403 22 21.8667 22L19.3334 22C18.9652 22 18.6667 22.2985 18.6667 22.6667V24.6667C18.6667 25.0349 18.9652 25.3333 19.3334 25.3333L24.6667 25.3333C25.0349 25.3333 25.3334 25.0349 25.3334 24.6667V19.3333C25.3334 18.9651 25.0349 18.6667 24.6667 18.6667H22.6667C22.2985 18.6667 22 18.9651 22 19.3333V21.8667Z" fill="currentColor"/> <path d="M12.6667 22H10.1334C10.0597 22 10 21.9403 10 21.8667V19.3333C10 18.9651 9.70154 18.6667 9.33335 18.6667H7.33335C6.96516 18.6667 6.66669 18.9651 6.66669 19.3333V24.6667C6.66669 25.0349 6.96516 25.3333 7.33335 25.3333H12.6667C13.0349 25.3333 13.3334 25.0349 13.3334 24.6667V22.6667C13.3334 22.2985 13.0349 22 12.6667 22Z" fill="currentColor"/> <path d="M10 12.6667V10.1333C10 10.0597 10.0597 10 10.1334 10L12.6667 10C13.0349 10 13.3334 9.70152 13.3334 9.33333V7.33333C13.3334 6.96514 13.0349 6.66666 12.6667 6.66666H7.33335C6.96516 6.66666 6.66669 6.96514 6.66669 7.33333V12.6667C6.66669 13.0349 6.96516 13.3333 7.33335 13.3333H9.33335C9.70154 13.3333 10 13.0349 10 12.6667Z" fill="currentColor"/>`;
var Icon$53 = `<path fill-rule="evenodd" clip-rule="evenodd" d="M26.6667 5.99998C26.6667 5.63179 26.3682 5.33331 26 5.33331H11.3333C10.9651 5.33331 10.6667 5.63179 10.6667 5.99998V17.5714C10.6667 17.6694 10.5644 17.7342 10.4741 17.6962C9.91823 17.4625 9.30754 17.3333 8.66667 17.3333C6.08934 17.3333 4 19.4226 4 22C4 24.5773 6.08934 26.6666 8.66667 26.6666C11.244 26.6666 13.3333 24.5773 13.3333 22V8.66665C13.3333 8.29846 13.6318 7.99998 14 7.99998L23.3333 7.99998C23.7015 7.99998 24 8.29846 24 8.66665V14.9048C24 15.0027 23.8978 15.0675 23.8075 15.0296C23.2516 14.7958 22.6409 14.6666 22 14.6666C19.4227 14.6666 17.3333 16.756 17.3333 19.3333C17.3333 21.9106 19.4227 24 22 24C24.5773 24 26.6667 21.9106 26.6667 19.3333V5.99998ZM22 21.3333C23.1046 21.3333 24 20.4379 24 19.3333C24 18.2287 23.1046 17.3333 22 17.3333C20.8954 17.3333 20 18.2287 20 19.3333C20 20.4379 20.8954 21.3333 22 21.3333ZM8.66667 24C9.77124 24 10.6667 23.1045 10.6667 22C10.6667 20.8954 9.77124 20 8.66667 20C7.5621 20 6.66667 20.8954 6.66667 22C6.66667 23.1045 7.5621 24 8.66667 24Z" fill="currentColor"/>`;
var Icon$54 = `<path d="M17.5091 24.6594C17.5091 25.2066 16.8864 25.5208 16.4463 25.1956L9.44847 20.0252C9.42553 20.0083 9.39776 19.9991 9.36923 19.9991H4.66667C4.29848 19.9991 4 19.7006 4 19.3325V12.6658C4 12.2976 4.29848 11.9991 4.66667 11.9991H9.37115C9.39967 11.9991 9.42745 11.99 9.45039 11.973L16.4463 6.8036C16.8863 6.47842 17.5091 6.79259 17.5091 7.33977L17.5091 24.6594Z" fill="currentColor"/> <path d="M28.8621 13.6422C29.1225 13.3818 29.1225 12.9597 28.8621 12.6994L27.9193 11.7566C27.659 11.4962 27.2368 11.4962 26.9765 11.7566L24.7134 14.0197C24.6613 14.0717 24.5769 14.0717 24.5248 14.0197L22.262 11.7568C22.0016 11.4964 21.5795 11.4964 21.3191 11.7568L20.3763 12.6996C20.116 12.9599 20.116 13.382 20.3763 13.6424L22.6392 15.9053C22.6913 15.9573 22.6913 16.0418 22.6392 16.0938L20.3768 18.3562C20.1165 18.6166 20.1165 19.0387 20.3768 19.299L21.3196 20.2419C21.58 20.5022 22.0021 20.5022 22.2624 20.2418L24.5248 17.9795C24.5769 17.9274 24.6613 17.9274 24.7134 17.9795L26.976 20.2421C27.2363 20.5024 27.6585 20.5024 27.9188 20.2421L28.8616 19.2992C29.122 19.0389 29.122 18.6168 28.8616 18.3564L26.599 16.0938C26.547 16.0418 26.547 15.9573 26.599 15.9053L28.8621 13.6422Z" fill="currentColor"/>`;
var Icon$56 = `<path d="M26.6009 16.0725C26.6009 16.424 26.4302 17.1125 25.9409 18.0213C25.4676 18.8976 24.7542 19.8715 23.8182 20.7783C21.9489 22.5905 19.2662 24.0667 15.9342 24.0667C12.6009 24.0667 9.91958 22.5915 8.04891 20.78C7.11424 19.8736 6.40091 18.9 5.92758 18.0236C5.43824 17.1149 5.26758 16.4257 5.26758 16.0725C5.26758 15.7193 5.43824 15.0293 5.92891 14.1193C6.40224 13.2416 7.11558 12.2665 8.05158 11.3587C9.92224 9.54398 12.6049 8.06665 15.9342 8.06665C19.2636 8.06665 21.9449 9.54505 23.8169 11.3604C24.7529 12.2687 25.4662 13.2441 25.9396 14.1216C26.4302 15.0317 26.6009 15.7209 26.6009 16.0725Z" stroke="currentColor" stroke-width="3"/> <path d="M15.9336 20.0667C18.1427 20.0667 19.9336 18.2758 19.9336 16.0667C19.9336 13.8575 18.1427 12.0667 15.9336 12.0667C13.7245 12.0667 11.9336 13.8575 11.9336 16.0667C11.9336 18.2758 13.7245 20.0667 15.9336 20.0667Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M27.2323 25.0624L6.93878 4.76886C6.78118 4.61126 6.70762 4.57052 6.61919 4.54372C6.53077 4.51692 6.44033 4.51691 6.3519 4.54372C6.26347 4.57052 6.18991 4.61126 6.03231 4.76886L4.77032 6.03085C4.61272 6.18845 4.57198 6.26201 4.54518 6.35044C4.51838 6.43887 4.51838 6.5293 4.54518 6.61773C4.57198 6.70616 4.61272 6.77972 4.77032 6.93732L25.0639 27.2308C25.2215 27.3884 25.295 27.4292 25.3834 27.456C25.4719 27.4828 25.5623 27.4828 25.6507 27.456C25.7392 27.4292 25.8127 27.3885 25.9703 27.2309L27.2323 25.9689C27.3899 25.8113 27.4307 25.7377 27.4575 25.6493C27.4843 25.5608 27.4843 25.4704 27.4575 25.382C27.4307 25.2935 27.3899 25.22 27.2323 25.0624Z" fill="currentColor"/>`;
var Icon$59 = `<path d="M8.66667 6.66667C8.29848 6.66667 8 6.96514 8 7.33333V24.6667C8 25.0349 8.29848 25.3333 8.66667 25.3333H12.6667C13.0349 25.3333 13.3333 25.0349 13.3333 24.6667V7.33333C13.3333 6.96514 13.0349 6.66667 12.6667 6.66667H8.66667Z" fill="currentColor"/> <path d="M19.3333 6.66667C18.9651 6.66667 18.6667 6.96514 18.6667 7.33333V24.6667C18.6667 25.0349 18.9651 25.3333 19.3333 25.3333H23.3333C23.7015 25.3333 24 25.0349 24 24.6667V7.33333C24 6.96514 23.7015 6.66667 23.3333 6.66667H19.3333Z" fill="currentColor"/>`;
var Icon$60 = `<path d="M5.33334 26V19.4667C5.33334 19.393 5.39304 19.3333 5.46668 19.3333H7.86668C7.94031 19.3333 8.00001 19.393 8.00001 19.4667V23.3333C8.00001 23.7015 8.29849 24 8.66668 24H23.3333C23.7015 24 24 23.7015 24 23.3333V8.66666C24 8.29847 23.7015 7.99999 23.3333 7.99999H19.4667C19.393 7.99999 19.3333 7.9403 19.3333 7.86666V5.46666C19.3333 5.39302 19.393 5.33333 19.4667 5.33333H26C26.3682 5.33333 26.6667 5.63181 26.6667 5.99999V26C26.6667 26.3682 26.3682 26.6667 26 26.6667H6.00001C5.63182 26.6667 5.33334 26.3682 5.33334 26Z" fill="currentColor"/> <path d="M14.0098 8.42359H10.806C10.6872 8.42359 10.6277 8.56721 10.7117 8.6512L16.5491 14.4886C16.8094 14.7489 16.8094 15.171 16.5491 15.4314L15.3234 16.657C15.0631 16.9174 14.641 16.9174 14.3806 16.657L8.63739 10.9138C8.55339 10.8298 8.40978 10.8893 8.40978 11.0081V14.0236C8.40978 14.3918 8.1113 14.6903 7.74311 14.6903H6.00978C5.64159 14.6903 5.34311 14.3918 5.34311 14.0236L5.34311 6.02359C5.34311 5.6554 5.64159 5.35692 6.00978 5.35692L14.0098 5.35692C14.378 5.35692 14.6764 5.6554 14.6764 6.02359V7.75692C14.6764 8.12511 14.378 8.42359 14.0098 8.42359Z" fill="currentColor"/>`;
var Icon$61 = `<path d="M16 15.3333C15.6318 15.3333 15.3333 15.6318 15.3333 16V20C15.3333 20.3682 15.6318 20.6667 16 20.6667H21.3333C21.7015 20.6667 22 20.3682 22 20V16C22 15.6318 21.7015 15.3333 21.3333 15.3333H16Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.33333 7.33334C5.33333 6.96515 5.63181 6.66667 5.99999 6.66667H26C26.3682 6.66667 26.6667 6.96515 26.6667 7.33334V24.6667C26.6667 25.0349 26.3682 25.3333 26 25.3333H5.99999C5.63181 25.3333 5.33333 25.0349 5.33333 24.6667V7.33334ZM7.99999 10C7.99999 9.63182 8.29847 9.33334 8.66666 9.33334H23.3333C23.7015 9.33334 24 9.63182 24 10V22C24 22.3682 23.7015 22.6667 23.3333 22.6667H8.66666C8.29847 22.6667 7.99999 22.3682 7.99999 22V10Z" fill="currentColor"/>`;
var Icon$62 = `<path d="M10.6667 6.6548C10.6667 6.10764 11.2894 5.79346 11.7295 6.11862L24.377 15.4634C24.7377 15.7298 24.7377 16.2692 24.3771 16.5357L11.7295 25.8813C11.2895 26.2065 10.6667 25.8923 10.6667 25.3451L10.6667 6.6548Z" fill="currentColor"/>`;
var Icon$63 = `<path d="M13.9213 5.53573C14.3146 5.45804 14.6666 5.76987 14.6666 6.17079V7.57215C14.6666 7.89777 14.4305 8.17277 14.114 8.24925C12.5981 8.61559 11.2506 9.41368 10.2091 10.506C9.98474 10.7414 9.62903 10.8079 9.34742 10.6453L8.14112 9.94885C7.79394 9.7484 7.69985 9.28777 7.96359 8.98585C9.48505 7.24409 11.5636 6.00143 13.9213 5.53573Z" fill="currentColor"/> <path d="M5.88974 12.5908C6.01805 12.2101 6.46491 12.0603 6.81279 12.2611L8.01201 12.9535C8.29379 13.1162 8.41396 13.4577 8.32238 13.7699C8.11252 14.4854 7.99998 15.2424 7.99998 16.0257C7.99998 16.809 8.11252 17.566 8.32238 18.2814C8.41396 18.5936 8.29378 18.9352 8.01201 19.0979L6.82742 19.7818C6.48051 19.9821 6.03488 19.8337 5.90521 19.4547C5.5345 18.3712 5.33331 17.2091 5.33331 16C5.33331 14.8078 5.5289 13.6613 5.88974 12.5908Z" fill="currentColor"/> <path d="M8.17106 22.0852C7.82291 22.2862 7.72949 22.7486 7.99532 23.0502C9.51387 24.773 11.5799 26.0017 13.9213 26.4642C14.3146 26.5419 14.6666 26.2301 14.6666 25.8291V24.4792C14.6666 24.1536 14.4305 23.8786 14.114 23.8021C12.5981 23.4358 11.2506 22.6377 10.2091 21.5453C9.98474 21.31 9.62903 21.2435 9.34742 21.4061L8.17106 22.0852Z" fill="currentColor"/> <path d="M17.3333 25.8291C17.3333 26.2301 17.6857 26.5418 18.079 26.4641C22.9748 25.4969 26.6666 21.1796 26.6666 16C26.6666 10.8204 22.9748 6.50302 18.079 5.5358C17.6857 5.4581 17.3333 5.76987 17.3333 6.17079V7.57215C17.3333 7.89777 17.5697 8.17282 17.8862 8.24932C21.3942 9.09721 24 12.2572 24 16.0257C24 19.7942 21.3942 22.9542 17.8862 23.802C17.5697 23.8785 17.3333 24.1536 17.3333 24.4792V25.8291Z" fill="currentColor"/> <path d="M14.3961 10.4163C13.9561 10.0911 13.3333 10.4053 13.3333 10.9525L13.3333 21.0474C13.3333 21.5946 13.9561 21.9087 14.3962 21.5836L21.2273 16.5359C21.5879 16.2694 21.5879 15.73 21.2273 15.4635L14.3961 10.4163Z" fill="currentColor"/>`;
var Icon$74 = `<path d="M15.6038 12.2147C16.0439 12.5399 16.6667 12.2257 16.6667 11.6786V10.1789C16.6667 10.1001 16.7351 10.0384 16.8134 10.0479C20.1116 10.4494 22.6667 13.2593 22.6667 16.6659C22.6667 20.3481 19.6817 23.3332 15.9995 23.3332C12.542 23.3332 9.69927 20.7014 9.36509 17.332C9.32875 16.9655 9.03371 16.6662 8.66548 16.6662L6.66655 16.6666C6.29841 16.6666 5.99769 16.966 6.02187 17.3334C6.36494 22.5454 10.7012 26.6667 16 26.6667C21.5228 26.6667 26 22.1895 26 16.6667C26 11.4103 21.9444 7.10112 16.7916 6.69757C16.7216 6.69209 16.6667 6.63396 16.6667 6.56372V4.98824C16.6667 4.44106 16.0439 4.12689 15.6038 4.45206L11.0765 7.79738C10.7159 8.06387 10.7159 8.60326 11.0766 8.86973L15.6038 12.2147Z" fill="currentColor"/>`;
var Icon$77 = `<path d="M16.6667 10.3452C16.6667 10.8924 16.0439 11.2066 15.6038 10.8814L11.0766 7.5364C10.7159 7.26993 10.7159 6.73054 11.0766 6.46405L15.6038 3.11873C16.0439 2.79356 16.6667 3.10773 16.6667 3.6549V5.22682C16.6667 5.29746 16.7223 5.35579 16.7927 5.36066C22.6821 5.76757 27.3333 10.674 27.3333 16.6667C27.3333 22.9259 22.2592 28 16 28C9.96483 28 5.03145 23.2827 4.68601 17.3341C4.66466 16.9665 4.96518 16.6673 5.33339 16.6673H7.3334C7.70157 16.6673 7.99714 16.9668 8.02743 17.3337C8.36638 21.4399 11.8064 24.6667 16 24.6667C20.4183 24.6667 24 21.085 24 16.6667C24 12.5225 20.8483 9.11428 16.8113 8.70739C16.7337 8.69957 16.6667 8.76096 16.6667 8.83893V10.3452Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0879 19.679C17.4553 19.9195 17.8928 20.0398 18.4004 20.0398C18.9099 20.0398 19.3474 19.9205 19.7129 19.6818C20.0803 19.4413 20.3635 19.0938 20.5623 18.6392C20.7612 18.1847 20.8606 17.6373 20.8606 16.9972C20.8625 16.3608 20.764 15.8192 20.5652 15.3722C20.3663 14.9252 20.0822 14.5853 19.7129 14.3523C19.3455 14.1175 18.908 14 18.4004 14C17.8928 14 17.4553 14.1175 17.0879 14.3523C16.7224 14.5853 16.4402 14.9252 16.2413 15.3722C16.0443 15.8173 15.9449 16.3589 15.943 16.9972C15.9411 17.6354 16.0396 18.1818 16.2385 18.6364C16.4373 19.089 16.7205 19.4366 17.0879 19.679ZM19.1362 18.4262C18.9487 18.7349 18.7034 18.8892 18.4004 18.8892C18.1996 18.8892 18.0226 18.8211 17.8691 18.6847C17.7157 18.5464 17.5964 18.3372 17.5112 18.0568C17.4279 17.7765 17.3871 17.4233 17.389 16.9972C17.3909 16.3684 17.4847 15.9025 17.6703 15.5995C17.8559 15.2945 18.0993 15.1421 18.4004 15.1421C18.603 15.1421 18.7801 15.2093 18.9316 15.3438C19.0832 15.4782 19.2015 15.6828 19.2868 15.9574C19.372 16.2301 19.4146 16.5767 19.4146 16.9972C19.4165 17.6392 19.3237 18.1156 19.1362 18.4262Z" fill="currentColor"/> <path d="M13.7746 19.8978C13.8482 19.8978 13.9079 19.8381 13.9079 19.7644V14.2129C13.9079 14.1393 13.8482 14.0796 13.7746 14.0796H12.642C12.6171 14.0796 12.5927 14.0865 12.5716 14.0997L11.2322 14.9325C11.1931 14.9568 11.1693 14.9996 11.1693 15.0457V15.9497C11.1693 16.0539 11.2833 16.1178 11.3722 16.0635L12.464 15.396C12.4682 15.3934 12.473 15.3921 12.4779 15.3921C12.4926 15.3921 12.5045 15.404 12.5045 15.4187V19.7644C12.5045 19.8381 12.5642 19.8978 12.6378 19.8978H13.7746Z" fill="currentColor"/>`;
var Icon$81 = `<path d="M15.3333 10.3452C15.3333 10.8924 15.9561 11.2066 16.3962 10.8814L20.9234 7.5364C21.2841 7.26993 21.2841 6.73054 20.9235 6.46405L16.3962 3.11873C15.9561 2.79356 15.3333 3.10773 15.3333 3.6549V5.22682C15.3333 5.29746 15.2778 5.35579 15.2073 5.36066C9.31791 5.76757 4.66667 10.674 4.66667 16.6667C4.66667 22.9259 9.74078 28 16 28C22.0352 28 26.9686 23.2827 27.314 17.3341C27.3354 16.9665 27.0348 16.6673 26.6666 16.6673H24.6666C24.2984 16.6673 24.0029 16.9668 23.9726 17.3337C23.6336 21.4399 20.1937 24.6667 16 24.6667C11.5817 24.6667 8 21.085 8 16.6667C8 12.5225 11.1517 9.11428 15.1887 8.70739C15.2663 8.69957 15.3333 8.76096 15.3333 8.83893V10.3452Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0879 19.679C17.4553 19.9195 17.8928 20.0398 18.4004 20.0398C18.9099 20.0398 19.3474 19.9205 19.7129 19.6818C20.0803 19.4413 20.3635 19.0938 20.5623 18.6392C20.7612 18.1847 20.8606 17.6373 20.8606 16.9972C20.8625 16.3608 20.764 15.8192 20.5652 15.3722C20.3663 14.9252 20.0822 14.5853 19.7129 14.3523C19.3455 14.1175 18.908 14 18.4004 14C17.8928 14 17.4553 14.1175 17.0879 14.3523C16.7224 14.5853 16.4402 14.9252 16.2413 15.3722C16.0443 15.8173 15.9449 16.3589 15.943 16.9972C15.9411 17.6354 16.0396 18.1818 16.2385 18.6364C16.4373 19.089 16.7205 19.4366 17.0879 19.679ZM19.1362 18.4262C18.9487 18.7349 18.7034 18.8892 18.4004 18.8892C18.1996 18.8892 18.0225 18.8211 17.8691 18.6847C17.7157 18.5464 17.5964 18.3372 17.5112 18.0568C17.4278 17.7765 17.3871 17.4233 17.389 16.9972C17.3909 16.3684 17.4847 15.9025 17.6703 15.5995C17.8559 15.2945 18.0992 15.1421 18.4004 15.1421C18.603 15.1421 18.7801 15.2093 18.9316 15.3438C19.0831 15.4782 19.2015 15.6828 19.2867 15.9574C19.372 16.2301 19.4146 16.5767 19.4146 16.9972C19.4165 17.6392 19.3237 18.1156 19.1362 18.4262Z" fill="currentColor"/> <path d="M13.7746 19.8978C13.8482 19.8978 13.9079 19.8381 13.9079 19.7644V14.2129C13.9079 14.1393 13.8482 14.0796 13.7746 14.0796H12.642C12.6171 14.0796 12.5927 14.0865 12.5716 14.0997L11.2322 14.9325C11.1931 14.9568 11.1693 14.9996 11.1693 15.0457V15.9497C11.1693 16.0539 11.2833 16.1178 11.3722 16.0635L12.464 15.396C12.4682 15.3934 12.473 15.3921 12.4779 15.3921C12.4926 15.3921 12.5045 15.404 12.5045 15.4187V19.7644C12.5045 19.8381 12.5642 19.8978 12.6378 19.8978H13.7746Z" fill="currentColor"/>`;
var Icon$88 = `<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5722 5.33333C13.2429 5.33333 12.9629 5.57382 12.9132 5.89938L12.4063 9.21916C12.4 9.26058 12.3746 9.29655 12.3378 9.31672C12.2387 9.37118 12.1409 9.42779 12.0444 9.48648C12.0086 9.5083 11.9646 9.51242 11.9255 9.49718L8.79572 8.27692C8.48896 8.15732 8.14083 8.27958 7.9762 8.56472L5.5491 12.7686C5.38444 13.0538 5.45271 13.4165 5.70981 13.6223L8.33308 15.7225C8.3658 15.7487 8.38422 15.7887 8.38331 15.8306C8.38209 15.8867 8.38148 15.9429 8.38148 15.9993C8.38148 16.0558 8.3821 16.1121 8.38332 16.1684C8.38423 16.2102 8.36582 16.2503 8.33313 16.2765L5.7103 18.3778C5.45334 18.5836 5.38515 18.9462 5.54978 19.2314L7.97688 23.4352C8.14155 23.7205 8.48981 23.8427 8.79661 23.723L11.926 22.5016C11.9651 22.4864 12.009 22.4905 12.0449 22.5123C12.1412 22.5709 12.2388 22.6274 12.3378 22.6818C12.3745 22.7019 12.4 22.7379 12.4063 22.7793L12.9132 26.0993C12.9629 26.4249 13.2429 26.6654 13.5722 26.6654H18.4264C18.7556 26.6654 19.0356 26.425 19.0854 26.0995L19.5933 22.7801C19.5997 22.7386 19.6252 22.7027 19.6619 22.6825C19.7614 22.6279 19.8596 22.5711 19.9564 22.5121C19.9923 22.4903 20.0362 22.4862 20.0754 22.5015L23.2035 23.7223C23.5103 23.842 23.8585 23.7198 24.0232 23.4346L26.4503 19.2307C26.6149 18.9456 26.5467 18.583 26.2898 18.3771L23.6679 16.2766C23.6352 16.2504 23.6168 16.2104 23.6177 16.1685C23.619 16.1122 23.6196 16.0558 23.6196 15.9993C23.6196 15.9429 23.619 15.8866 23.6177 15.8305C23.6168 15.7886 23.6353 15.7486 23.668 15.7224L26.2903 13.623C26.5474 13.4172 26.6156 13.0544 26.451 12.7692L24.0239 8.56537C23.8592 8.28023 23.5111 8.15797 23.2043 8.27757L20.0758 9.49734C20.0367 9.51258 19.9927 9.50846 19.9569 9.48664C19.8599 9.42762 19.7616 9.37071 19.6618 9.31596C19.6251 9.2958 19.5997 9.25984 19.5933 9.21843L19.0854 5.89915C19.0356 5.57369 18.7556 5.33333 18.4264 5.33333H13.5722ZM16.0001 20.2854C18.3672 20.2854 20.2862 18.3664 20.2862 15.9993C20.2862 13.6322 18.3672 11.7132 16.0001 11.7132C13.6329 11.7132 11.714 13.6322 11.714 15.9993C11.714 18.3664 13.6329 20.2854 16.0001 20.2854Z" fill="currentColor"/>`;
var Icon$104 = `<path d="M17.5091 24.6595C17.5091 25.2066 16.8864 25.5208 16.4463 25.1956L9.44847 20.0252C9.42553 20.0083 9.39776 19.9992 9.36923 19.9992H4.66667C4.29848 19.9992 4 19.7007 4 19.3325V12.6658C4 12.2976 4.29848 11.9992 4.66667 11.9992H9.37115C9.39967 11.9992 9.42745 11.99 9.45039 11.9731L16.4463 6.80363C16.8863 6.47845 17.5091 6.79262 17.5091 7.3398L17.5091 24.6595Z" fill="currentColor"/> <path d="M27.5091 9.33336C27.8773 9.33336 28.1758 9.63184 28.1758 10V22C28.1758 22.3682 27.8773 22.6667 27.5091 22.6667H26.1758C25.8076 22.6667 25.5091 22.3682 25.5091 22V10C25.5091 9.63184 25.8076 9.33336 26.1758 9.33336L27.5091 9.33336Z" fill="currentColor"/> <path d="M22.1758 12C22.544 12 22.8424 12.2985 22.8424 12.6667V19.3334C22.8424 19.7016 22.544 20 22.1758 20H20.8424C20.4743 20 20.1758 19.7016 20.1758 19.3334V12.6667C20.1758 12.2985 20.4743 12 20.8424 12H22.1758Z" fill="currentColor"/>`;
var Icon$105 = `<path d="M17.5091 24.6594C17.5091 25.2066 16.8864 25.5207 16.4463 25.1956L9.44847 20.0252C9.42553 20.0083 9.39776 19.9991 9.36923 19.9991H4.66667C4.29848 19.9991 4 19.7006 4 19.3324V12.6658C4 12.2976 4.29848 11.9991 4.66667 11.9991H9.37115C9.39967 11.9991 9.42745 11.99 9.45039 11.973L16.4463 6.80358C16.8863 6.4784 17.5091 6.79258 17.5091 7.33975L17.5091 24.6594Z" fill="currentColor"/> <path d="M22.8424 12.6667C22.8424 12.2985 22.544 12 22.1758 12H20.8424C20.4743 12 20.1758 12.2985 20.1758 12.6667V19.3333C20.1758 19.7015 20.4743 20 20.8424 20H22.1758C22.544 20 22.8424 19.7015 22.8424 19.3333V12.6667Z" fill="currentColor"/>`;

export {
  peek,
  untrack,
  tick,
  getScope,
  scoped,
  onDispose,
  createScope,
  signal,
  computed,
  isWriteSignal,
  noop,
  isNull,
  isUndefined,
  isNil,
  isObject,
  isNumber,
  isString,
  isBoolean,
  isFunction,
  isArray,
  effect,
  DOMEvent,
  walkTriggerEventChain,
  findTriggerEvent,
  hasTriggerEvent,
  appendTriggerEvent,
  EventsTarget,
  listenEvent,
  EventsController,
  isPointerEvent,
  isTouchEvent,
  isMouseEvent,
  isKeyboardEvent,
  wasEnterKeyPressed,
  isKeyboardClick,
  isDOMNode,
  setAttribute,
  setStyle,
  toggleClass,
  createContext2 as createContext,
  provideContext,
  useContext2 as useContext,
  hasProvidedContext,
  ViewController,
  Component,
  prop,
  method,
  State,
  useState2 as useState,
  camelToKebabCase,
  kebabToCamelCase,
  uppercaseFirstChar,
  useReactScope,
  useReactContext,
  composeRefs,
  useStateContext,
  useSignal,
  ariaBool,
  createDisposalBin,
  keysOf,
  deferredPromise,
  waitTimeout,
  animationFrameThrottle,
  waitIdlePeriod,
  useSignalRecord,
  createReactComponent,
  fscreen,
  functionThrottle,
  functionDebounce,
  r,
  Icon$0,
  Icon$5,
  Icon$8,
  Icon$11,
  Icon$13,
  Icon$16,
  Icon$19,
  Icon$22,
  Icon$24,
  chromecast,
  Icon$26,
  Icon$27,
  Icon$31,
  Icon$33,
  Icon$34,
  Icon$35,
  Icon$39,
  Icon$40,
  Icon$53,
  Icon$54,
  Icon$56,
  Icon$59,
  Icon$60,
  Icon$61,
  Icon$62,
  Icon$63,
  Icon$74,
  Icon$77,
  Icon$81,
  Icon$88,
  Icon$104,
  Icon$105,
};
//# sourceMappingURL=chunk-KJZMXNFV.js.map
