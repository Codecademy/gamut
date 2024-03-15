function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { bookmarks, businessSolutions, catalogDropdown, communityDropdown, courseCatalog, favorites, freeProfile, login, logo, myHome, pricingDropdown, pricingLink, proProfile, refreshedResourcesDropdown, resourcesDropdown, signUp, tryProForFree, unpausePro, upgradeToPro } from './GlobalHeaderItems';

var catalogComponent = function catalogComponent(user) {
  return user !== null && user !== void 0 && user.useNewCatalogDropdown ? catalogDropdown(user === null || user === void 0 ? void 0 : user.hideCareerPaths) : courseCatalog;
};

var resourcesComponent = function resourcesComponent(user) {
  return user !== null && user !== void 0 && user.useNewCatalogDropdown ? refreshedResourcesDropdown : resourcesDropdown;
}; // Simplify pricing dropdown to a normal link for users in India


var pricingComponent = function pricingComponent(user) {
  return (user === null || user === void 0 ? void 0 : user.geo) === 'IN' ? pricingLink : pricingDropdown;
};

var anonHeaderItems = function anonHeaderItems(renderLogin, renderSignUp, hidePricing, user, renderBookmarks) {
  var leftItems = [logo, catalogComponent(user), resourcesComponent(user), communityDropdown].concat(_toConsumableArray(hidePricing ? [] : [pricingComponent(user)]), [businessSolutions]);
  var rightItems = [];

  if (renderBookmarks) {
    rightItems.push(bookmarks(renderBookmarks));
  }

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

var anonMobileHeaderItems = function anonMobileHeaderItems(renderLogin, renderSignUp, hidePricing, user, renderBookmarks) {
  var leftItems = [logo];
  var rightItems = [];

  if (renderBookmarks) {
    rightItems.push(bookmarks(renderBookmarks));
  }

  if (renderLogin) {
    rightItems.push(login);
  }

  if (renderSignUp) {
    rightItems.push(signUp);
  }

  var mainMenuItems = [catalogComponent(user), resourcesComponent(user), communityDropdown].concat(_toConsumableArray(hidePricing ? [] : [pricingComponent(user)]), [businessSolutions]);
  return {
    left: leftItems,
    right: rightItems,
    mainMenu: mainMenuItems
  };
};

export var anonDefaultHeaderItems = function anonDefaultHeaderItems(hidePricing, user, renderBookmarks) {
  return anonHeaderItems(true, true, hidePricing, user, renderBookmarks);
};
export var anonDefaultMobileHeaderItems = function anonDefaultMobileHeaderItems(hidePricing, user, renderBookmarks) {
  return anonMobileHeaderItems(true, true, hidePricing, user, renderBookmarks);
};
export var anonLandingHeaderItems = function anonLandingHeaderItems(hidePricing, user, renderBookmarks) {
  return anonHeaderItems(true, false, hidePricing, user, renderBookmarks);
};
export var anonLandingMobileHeaderItems = function anonLandingMobileHeaderItems(hidePricing, user, renderBookmarks) {
  return anonMobileHeaderItems(true, false, hidePricing, user, renderBookmarks);
};
export var anonLoginHeaderItems = function anonLoginHeaderItems(hidePricing, user, renderBookmarks) {
  return anonHeaderItems(false, true, hidePricing, user, renderBookmarks);
};
export var anonLoginMobileHeaderItems = function anonLoginMobileHeaderItems(hidePricing, user, renderBookmarks) {
  return anonMobileHeaderItems(false, true, hidePricing, user, renderBookmarks);
};
export var anonSignupHeaderItems = function anonSignupHeaderItems(hidePricing, user, renderBookmarks) {
  return anonHeaderItems(true, false, hidePricing, user, renderBookmarks);
};
export var anonSignupMobileHeaderItems = function anonSignupMobileHeaderItems(hidePricing, user, renderBookmarks) {
  return anonMobileHeaderItems(true, false, hidePricing, user, renderBookmarks);
};
export var freeHeaderItems = function freeHeaderItems(user, hidePricing, renderFavorites, renderBookmarks) {
  var specialLogo = _objectSpread(_objectSpread({}, logo), {}, {
    checkMini: true
  });

  var leftItems = [specialLogo, myHome, catalogComponent(user), resourcesComponent(user), communityDropdown].concat(_toConsumableArray(hidePricing ? [] : [pricingComponent(user)]), [businessSolutions]);
  var rightItems = [];

  if (renderFavorites) {
    rightItems.push(favorites(renderFavorites));
  } else if (renderBookmarks) {
    // only allow bookmarks render if user wasn't also part of favs
    rightItems.push(bookmarks(renderBookmarks));
  }

  rightItems.push(freeProfile(user));
  rightItems.push(user.showProUpgrade ? upgradeToPro(user.proCheckoutUrl) : tryProForFree(user.proCheckoutUrl));
  return {
    left: leftItems,
    right: rightItems
  };
};
export var freeMobileHeaderItems = function freeMobileHeaderItems(user, hidePricing, renderBookmarks) {
  var specialLogo = _objectSpread(_objectSpread({}, logo), {}, {
    checkMini: true
  });

  var leftItems = [specialLogo];
  var rightItems = [];
  var mainMenuItems = [myHome, catalogComponent(user), resourcesComponent(user), communityDropdown].concat(_toConsumableArray(hidePricing ? [] : [pricingComponent(user)]), [businessSolutions, freeProfile(user, true), user.showProUpgrade ? upgradeToPro(user.proCheckoutUrl) : tryProForFree(user.proCheckoutUrl)]);

  if (renderBookmarks) {
    rightItems.push(bookmarks(renderBookmarks));
  }

  return {
    left: leftItems,
    right: rightItems,
    mainMenu: mainMenuItems
  };
};
export var proHeaderItems = function proHeaderItems(user, renderFavorites, renderBookmarks) {
  var leftItems = [logo, myHome, catalogComponent(user), resourcesComponent(user), communityDropdown, businessSolutions];
  var rightItems = [];

  if (renderFavorites) {
    rightItems.push(favorites(renderFavorites));
  } else if (renderBookmarks) {
    // only allow bookmarks render if user wasn't also part of favs
    rightItems.push(bookmarks(renderBookmarks));
  }

  rightItems.push(proProfile(user));

  if (user.isPaused) {
    rightItems.push(unpausePro);
  }

  return {
    left: leftItems,
    right: rightItems
  };
};
export var proMobileHeaderItems = function proMobileHeaderItems(user, renderBookmarks) {
  var leftItems = [logo];
  var rightItems = [];
  var mainMenuItems = [myHome, catalogComponent(user), resourcesComponent(user), communityDropdown, businessSolutions, proProfile(user)];

  if (user.isPaused) {
    mainMenuItems.push(unpausePro);
  }

  if (renderBookmarks) {
    rightItems.push(bookmarks(renderBookmarks));
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