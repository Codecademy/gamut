var SORT = {
  A_BEFORE_B: -1,
  B_BEFORE_A: 1,
  EQUAL: 1
};
/**
 * Orders all properties by the most dependent props
 * @param config
 */

export var orderPropNames = function orderPropNames(config) {
  return Object.keys(config).sort(function (a, b) {
    var _config$a$properties$, _config$a$properties, _config$b$properties$, _config$b$properties;

    var aProps = (_config$a$properties$ = config === null || config === void 0 ? void 0 : (_config$a$properties = config[a].properties) === null || _config$a$properties === void 0 ? void 0 : _config$a$properties.length) !== null && _config$a$properties$ !== void 0 ? _config$a$properties$ : 0;
    var bProps = (_config$b$properties$ = config === null || config === void 0 ? void 0 : (_config$b$properties = config[b].properties) === null || _config$b$properties === void 0 ? void 0 : _config$b$properties.length) !== null && _config$b$properties$ !== void 0 ? _config$b$properties$ : 0;

    switch (Math.sign(aProps - bProps)) {
      case -1:
        return SORT.A_BEFORE_B;

      case 1:
        return SORT.B_BEFORE_A;

      default:
        return SORT.EQUAL;
    }
  });
};