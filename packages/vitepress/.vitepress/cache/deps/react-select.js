import {
  Select,
  components,
  createFilter,
  defaultTheme,
  mergeStyles,
  useStateManager,
} from './chunk-JCZIUCUV.js';
import './chunk-Y4QXJQIJ.js';
import './chunk-6LF7RJNR.js';
import './chunk-I6C66VMN.js';
import './chunk-V7XVH3XH.js';
import { CacheProvider } from './chunk-OQDD5VNB.js';
import { createCache } from './chunk-LOR335JX.js';
import './chunk-WF25XW2W.js';
import './chunk-7KURRFS5.js';
import { _extends } from './chunk-VMQKBCTX.js';
import { require_react_dom } from './chunk-FO7RYXPS.js';
import { require_react } from './chunk-QBXGYTN6.js';
import { __toESM } from './chunk-4B2QHNJT.js';

// ../../node_modules/react-select/dist/react-select.esm.js
var React = __toESM(require_react());
var import_react = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
var StateManagedSelect = (0, import_react.forwardRef)(function (props, ref) {
  var baseSelectProps = useStateManager(props);
  return React.createElement(
    Select,
    _extends(
      {
        ref,
      },
      baseSelectProps
    )
  );
});
var StateManagedSelect$1 = StateManagedSelect;
var NonceProvider = function (_ref) {
  var nonce = _ref.nonce,
    children = _ref.children,
    cacheKey = _ref.cacheKey;
  var emotionCache = (0, import_react.useMemo)(
    function () {
      return createCache({
        key: cacheKey,
        nonce,
      });
    },
    [cacheKey, nonce]
  );
  return React.createElement(
    CacheProvider,
    {
      value: emotionCache,
    },
    children
  );
};
export {
  NonceProvider,
  components,
  createFilter,
  StateManagedSelect$1 as default,
  defaultTheme,
  mergeStyles,
  useStateManager,
};
//# sourceMappingURL=react-select.js.map
