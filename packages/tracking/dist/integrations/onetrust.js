import _regeneratorRuntime from "@babel/runtime/regenerator";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

export var initializeOneTrust = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref) {
    var production, scope, script, style;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            production = _ref.production, scope = _ref.scope;
            script = document.createElement('script');
            script.setAttribute('async', 'true');
            script.setAttribute('src', 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('data-domain-script', "cfa7b129-f37b-4f5a-9991-3f75ba7b85fb".concat(production ? '' : '-test'));
            document.body.appendChild(script);
            style = document.createElement('style');
            style.textContent = rawStyles;
            document.body.appendChild(style);
            return _context.abrupt("return", new Promise(function (resolve) {
              scope.OptanonWrapper = function () {
                var _scope$dataLayer, _script$parentNode;

                (_scope$dataLayer = scope.dataLayer) !== null && _scope$dataLayer !== void 0 ? _scope$dataLayer : scope.dataLayer = [];
                scope.dataLayer.push({
                  event: 'OneTrustGroupsUpdated'
                });
                resolve();
                (_script$parentNode = script.parentNode) === null || _script$parentNode === void 0 ? void 0 : _script$parentNode.removeChild(script);
              };
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initializeOneTrust(_x) {
    return _ref2.apply(this, arguments);
  };
}(); // For now, these three values duplicate theme colors from gamut-styles
// We don't want to take a full dependency on that package here...

var rawStyles = "\n:root {\n  --onetrust-brand-purple: #3A10E5;\n  --onetrust-color-gray-500: #828285;\n  --onetrust-color-white: #fff;\n}\n\n#onetrust-banner-sdk {\n  padding: 1rem !important;\n}\n#onetrust-banner-sdk > .ot-sdk-container {\n  width: 100% !important;\n}\n#onetrust-banner-sdk > .ot-sdk-container > .ot-sdk-row {\n  display: flex !important;\n  flex-direction: column !important;\n  align-items: center !important;\n  max-width: 1436px !important;\n  margin: 0 auto !important;\n}\n#onetrust-banner-sdk > .ot-sdk-container > .ot-sdk-row:after {\n  content: none !important;\n}\n#onetrust-group-container {\n  display: flex !important;\n  justify-content: center;\n  float: none !important;\n  width: 100% !important;\n  max-width: 1148px !important;\n  margin-left: 0 !important;\n  margin-bottom: 0.625rem !important;\n}\n#onetrust-policy,\n#onetrust-policy-text {\n  margin: 0 !important;\n  font-size: 0.875rem !important;\n  line-height: 1.375rem !important;\n  text-align: center !important;\n  float: none !important;\n}\n#onetrust-policy-text a {\n  text-decoration: none;\n  line-height: 26px !important;\n  margin-left: 0 !important;\n}\n#onetrust-button-group-parent {\n  position: relative !important;\n  top: initial !important;\n  left: initial !important;\n  transform: initial !important;\n  width: 264px !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  float: none !important;\n}\n#onetrust-button-group {\n  display: flex !important;\n  margin: 0 !important;\n}\n#onetrust-pc-btn-handler, #onetrust-accept-btn-handler {\n  min-width: initial !important;\n  padding: 0.375rem 1rem !important;\n  margin: 0 !important;\n  opacity: 1 !important;\n  border-radius: 2px !important;\n  line-height: 1.5 !important;\n  user-select: none !important;\n  font-size: 1rem !important;\n}\n#onetrust-pc-btn-handler:focus, #onetrust-accept-btn-handler:focus {\n  box-shadow: 0 0 0 2px var(--onetrust-color-white), 0 0 0 4px var(--onetrust-brand-purple);\n  text-decoration: none !important;\n  outline: none !important;\n}\n#onetrust-pc-btn-handler{\n  color: var(--onetrust-brand-purple) !important;\n  border: 1px solid var(--onetrust-brand-purple)!important;\n  background: var(--onetrust-color-white) !important\n}\n#onetrust-accept-btn-handler {\n  color: var(--onetrust-color-white) !important;\n  background: var(--onetrust-brand-purple)!important;\n  margin-left: 1rem !important;\n}\n#onetrust-close-btn-container {\n  display: none !important;\n}\n\n.pc-logo {\n  display: none !important;\n}\n\n#accept-recommended-btn-handler,\n.ot-pc-refuse-all-handler,\n.save-preference-btn-handler {\n  margin-left: 4px !important;\n  font-size: 14px !important;\n}\n\n#accept-recommended-btn-handler:focus,\n#onetrust-pc-sdk .ot-pc-refuse-all-handler:focus,\n#onetrust-pc-sdk .save-preference-btn-handler:focus {\n  box-shadow: 0 0 0 2px var(--onetrust-color-white), 0 0 0 4px var(--onetrust-brand-purple);\n  text-decoration: none !important;\n  outline: none !important;\n  opacity: 1 !important;\n}\n\n.ot-switch-label {\n  border: 1px solid var(--onetrust-color-gray-500) !important;\n  background-color: var(--onetrust-color-gray-500) !important;\n}\n\n.ot-switch-nob {\n  background: var(--onetrust-color-white) !important;\n}\n\n.ot-switch-inner:before {\n  background-color: var(--onetrust-brand-purple) !important;\n}\n\n.switch-checkbox:checked+.ot-switch-label .ot-switch-nob {\n  border-color: var(--onetrust-brand-purple) !important;\n}\n\n.ot-pc-footer-logo {\n  display: none !important;\n}\n\n#onetrust-banner-sdk>.ot-sdk-container {\n  overflow: visible !important;\n}\n\n@media (max-width: 30rem) {\n  #accept-recommended-btn-handler,\n  .ot-pc-refuse-all-handler,\n  .save-preference-btn-handler {\n    width: 96% !important;\n  }\n}\n\n@media (min-width: 37.5rem) {\n  #onetrust-banner-sdk {\n    padding: 0.875rem 1rem !important;\n  }\n}\n@media (min-width: 48rem) {\n  #onetrust-banner-sdk {\n    padding: 0.875rem 1.25rem !important;\n  }\n}\n@media (min-width: 1650px) {\n  #onetrust-banner-sdk > .ot-sdk-container > .ot-sdk-row {\n    flex-direction: row !important;\n    justify-content: space-between !important;\n  }\n  #onetrust-group-container {\n    margin-bottom: 0 !important;\n  }\n  #onetrust-button-group {\n    flex-direction: row !important;\n  }\n}\n";