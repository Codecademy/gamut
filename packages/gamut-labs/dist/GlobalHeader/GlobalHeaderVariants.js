function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
import { businessSolutions, catalogDropdown, communityDropdown, freeProfile, login, logo, myHome, pricingDropdown, proProfile, resourcesDropdown, signUp, tryProForFree, unpausePro, upgradeToPro } from './GlobalHeaderItems';
var anonHeaderItems = function anonHeaderItems(renderLogin, renderSignUp, hidePricing, user) {
  var leftItems = [logo, catalogDropdown(user === null || user === void 0 ? void 0 : user.hideCareerPaths), resourcesDropdown, communityDropdown].concat(_toConsumableArray(hidePricing ? [] : [pricingDropdown]), [businessSolutions]);
  var rightItems = [];
  if (renderLogin) {
    rightItems.push(login);
  }
  if (renderSignUp) {
    rightItems.push(signUp);
  }
  return {
    left: leftItems,
    right: rightItems
  };
};
var anonMobileHeaderItems = function anonMobileHeaderItems(renderLogin, renderSignUp, hidePricing, user) {
  var leftItems = [logo];
  var rightItems = [];
  if (renderLogin) {
    rightItems.push(login);
  }
  if (renderSignUp) {
    rightItems.push(signUp);
  }
  var mainMenuItems = [catalogDropdown(user === null || user === void 0 ? void 0 : user.hideCareerPaths), resourcesDropdown, communityDropdown].concat(_toConsumableArray(hidePricing ? [] : [pricingDropdown]), [businessSolutions]);
  return {
    left: leftItems,
    right: rightItems,
    mainMenu: mainMenuItems
  };
};
export var anonDefaultHeaderItems = function anonDefaultHeaderItems(hidePricing, user) {
  return anonHeaderItems(true, true, hidePricing, user);
};
export var anonDefaultMobileHeaderItems = function anonDefaultMobileHeaderItems(hidePricing, user) {
  return anonMobileHeaderItems(true, true, hidePricing, user);
};
export var anonLandingHeaderItems = function anonLandingHeaderItems(hidePricing, user) {
  return anonHeaderItems(true, false, hidePricing, user);
};
export var anonLandingMobileHeaderItems = function anonLandingMobileHeaderItems(hidePricing, user) {
  return anonMobileHeaderItems(true, false, hidePricing, user);
};
export var anonLoginHeaderItems = function anonLoginHeaderItems(hidePricing, user) {
  return anonHeaderItems(false, true, hidePricing, user);
};
export var anonLoginMobileHeaderItems = function anonLoginMobileHeaderItems(hidePricing, user) {
  return anonMobileHeaderItems(false, true, hidePricing, user);
};
export var anonSignupHeaderItems = function anonSignupHeaderItems(hidePricing, user) {
  return anonHeaderItems(true, false, hidePricing, user);
};
export var anonSignupMobileHeaderItems = function anonSignupMobileHeaderItems(hidePricing, user) {
  return anonMobileHeaderItems(true, false, hidePricing, user);
};
export var freeHeaderItems = function freeHeaderItems(user, hidePricing) {
  var specialLogo = _objectSpread(_objectSpread({}, logo), {}, {
    checkMini: true
  });
  var leftItems = [specialLogo, myHome, catalogDropdown(user === null || user === void 0 ? void 0 : user.hideCareerPaths), resourcesDropdown, communityDropdown].concat(_toConsumableArray(hidePricing ? [] : [pricingDropdown]), [businessSolutions]);
  var rightItems = [];
  rightItems.push(freeProfile(user));
  rightItems.push(user.showProUpgrade ? upgradeToPro(user.proCheckoutUrl) : tryProForFree(user.proCheckoutUrl));
  return {
    left: leftItems,
    right: rightItems
  };
};
export var freeMobileHeaderItems = function freeMobileHeaderItems(user, hidePricing) {
  var specialLogo = _objectSpread(_objectSpread({}, logo), {}, {
    checkMini: true
  });
  var leftItems = [specialLogo];
  var rightItems = [];
  var mainMenuItems = [myHome, catalogDropdown(user === null || user === void 0 ? void 0 : user.hideCareerPaths), resourcesDropdown, communityDropdown].concat(_toConsumableArray(hidePricing ? [] : [pricingDropdown]), [businessSolutions, freeProfile(user, true), user.showProUpgrade ? upgradeToPro(user.proCheckoutUrl) : tryProForFree(user.proCheckoutUrl)]);
  return {
    left: leftItems,
    right: rightItems,
    mainMenu: mainMenuItems
  };
};
export var proHeaderItems = function proHeaderItems(user) {
  var leftItems = [logo, myHome, catalogDropdown(user === null || user === void 0 ? void 0 : user.hideCareerPaths), resourcesDropdown, communityDropdown, businessSolutions];
  var rightItems = [];
  rightItems.push(proProfile(user));
  if (user.isPaused) {
    rightItems.push(unpausePro);
  }
  return {
    left: leftItems,
    right: rightItems
  };
};
export var proMobileHeaderItems = function proMobileHeaderItems(user) {
  var leftItems = [logo];
  var rightItems = [];
  var mainMenuItems = [myHome, catalogDropdown(user === null || user === void 0 ? void 0 : user.hideCareerPaths), resourcesDropdown, communityDropdown, businessSolutions, proProfile(user)];
  if (user.isPaused) {
    mainMenuItems.push(unpausePro);
  }
  return {
    left: leftItems,
    right: rightItems,
    mainMenu: mainMenuItems
  };
};
export var loadingHeaderItems = {
  left: [logo],
  right: []
};
export var loadingMobileHeaderItems = {
  left: [logo],
  right: [],
  mainMenu: []
};