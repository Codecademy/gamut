var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../../cc/gamut/node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "../../../cc/gamut/node_modules/lodash/isArray.js"(exports, module) {
    var isArray3 = Array.isArray;
    module.exports = isArray3;
  }
});

// ../../../cc/gamut/node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_freeGlobal.js"(exports, module) {
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// ../../../cc/gamut/node_modules/lodash/_root.js
var require_root = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_root.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});

// ../../../cc/gamut/node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_Symbol.js"(exports, module) {
    var root = require_root();
    var Symbol2 = root.Symbol;
    module.exports = Symbol2;
  }
});

// ../../../cc/gamut/node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_getRawTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module.exports = getRawTag;
  }
});

// ../../../cc/gamut/node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_objectToString.js"(exports, module) {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseGetTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// ../../../cc/gamut/node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "../../../cc/gamut/node_modules/lodash/isObjectLike.js"(exports, module) {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// ../../../cc/gamut/node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "../../../cc/gamut/node_modules/lodash/isSymbol.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

// ../../../cc/gamut/node_modules/lodash/_isKey.js
var require_isKey = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_isKey.js"(exports, module) {
    var isArray3 = require_isArray();
    var isSymbol = require_isSymbol();
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    function isKey(value, object) {
      if (isArray3(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    module.exports = isKey;
  }
});

// ../../../cc/gamut/node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "../../../cc/gamut/node_modules/lodash/isObject.js"(exports, module) {
    function isObject5(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject5;
  }
});

// ../../../cc/gamut/node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "../../../cc/gamut/node_modules/lodash/isFunction.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObject5 = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject5(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction;
  }
});

// ../../../cc/gamut/node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_coreJsData.js"(exports, module) {
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module.exports = coreJsData;
  }
});

// ../../../cc/gamut/node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_isMasked.js"(exports, module) {
    var coreJsData = require_coreJsData();
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    })();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module.exports = isMasked;
  }
});

// ../../../cc/gamut/node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_toSource.js"(exports, module) {
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    module.exports = toSource;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseIsNative.js"(exports, module) {
    var isFunction = require_isFunction();
    var isMasked = require_isMasked();
    var isObject5 = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject5(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module.exports = baseIsNative;
  }
});

// ../../../cc/gamut/node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_getValue.js"(exports, module) {
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module.exports = getValue;
  }
});

// ../../../cc/gamut/node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_getNative.js"(exports, module) {
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module.exports = getNative;
  }
});

// ../../../cc/gamut/node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_nativeCreate.js"(exports, module) {
    var getNative = require_getNative();
    var nativeCreate = getNative(Object, "create");
    module.exports = nativeCreate;
  }
});

// ../../../cc/gamut/node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_hashClear.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    module.exports = hashClear;
  }
});

// ../../../cc/gamut/node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_hashDelete.js"(exports, module) {
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = hashDelete;
  }
});

// ../../../cc/gamut/node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_hashGet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    module.exports = hashGet;
  }
});

// ../../../cc/gamut/node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_hashHas.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    module.exports = hashHas;
  }
});

// ../../../cc/gamut/node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_hashSet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    module.exports = hashSet;
  }
});

// ../../../cc/gamut/node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_Hash.js"(exports, module) {
    var hashClear = require_hashClear();
    var hashDelete = require_hashDelete();
    var hashGet = require_hashGet();
    var hashHas = require_hashHas();
    var hashSet = require_hashSet();
    function Hash(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module.exports = Hash;
  }
});

// ../../../cc/gamut/node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_listCacheClear.js"(exports, module) {
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    module.exports = listCacheClear;
  }
});

// ../../../cc/gamut/node_modules/lodash/eq.js
var require_eq = __commonJS({
  "../../../cc/gamut/node_modules/lodash/eq.js"(exports, module) {
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});

// ../../../cc/gamut/node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_assocIndexOf.js"(exports, module) {
    var eq = require_eq();
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    module.exports = assocIndexOf;
  }
});

// ../../../cc/gamut/node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_listCacheDelete.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    var arrayProto = Array.prototype;
    var splice = arrayProto.splice;
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }
    module.exports = listCacheDelete;
  }
});

// ../../../cc/gamut/node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_listCacheGet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    module.exports = listCacheGet;
  }
});

// ../../../cc/gamut/node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_listCacheHas.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module.exports = listCacheHas;
  }
});

// ../../../cc/gamut/node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_listCacheSet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    module.exports = listCacheSet;
  }
});

// ../../../cc/gamut/node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_ListCache.js"(exports, module) {
    var listCacheClear = require_listCacheClear();
    var listCacheDelete = require_listCacheDelete();
    var listCacheGet = require_listCacheGet();
    var listCacheHas = require_listCacheHas();
    var listCacheSet = require_listCacheSet();
    function ListCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module.exports = ListCache;
  }
});

// ../../../cc/gamut/node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_Map.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Map2 = getNative(root, "Map");
    module.exports = Map2;
  }
});

// ../../../cc/gamut/node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_mapCacheClear.js"(exports, module) {
    var Hash = require_Hash();
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    module.exports = mapCacheClear;
  }
});

// ../../../cc/gamut/node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_isKeyable.js"(exports, module) {
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    module.exports = isKeyable;
  }
});

// ../../../cc/gamut/node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_getMapData.js"(exports, module) {
    var isKeyable = require_isKeyable();
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module.exports = getMapData;
  }
});

// ../../../cc/gamut/node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_mapCacheDelete.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = mapCacheDelete;
  }
});

// ../../../cc/gamut/node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_mapCacheGet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module.exports = mapCacheGet;
  }
});

// ../../../cc/gamut/node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_mapCacheHas.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module.exports = mapCacheHas;
  }
});

// ../../../cc/gamut/node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_mapCacheSet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    module.exports = mapCacheSet;
  }
});

// ../../../cc/gamut/node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_MapCache.js"(exports, module) {
    var mapCacheClear = require_mapCacheClear();
    var mapCacheDelete = require_mapCacheDelete();
    var mapCacheGet = require_mapCacheGet();
    var mapCacheHas = require_mapCacheHas();
    var mapCacheSet = require_mapCacheSet();
    function MapCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module.exports = MapCache;
  }
});

// ../../../cc/gamut/node_modules/lodash/memoize.js
var require_memoize = __commonJS({
  "../../../cc/gamut/node_modules/lodash/memoize.js"(exports, module) {
    var MapCache = require_MapCache();
    var FUNC_ERROR_TEXT = "Expected a function";
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver != null && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    module.exports = memoize;
  }
});

// ../../../cc/gamut/node_modules/lodash/_memoizeCapped.js
var require_memoizeCapped = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_memoizeCapped.js"(exports, module) {
    var memoize = require_memoize();
    var MAX_MEMOIZE_SIZE = 500;
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });
      var cache = result.cache;
      return result;
    }
    module.exports = memoizeCapped;
  }
});

// ../../../cc/gamut/node_modules/lodash/_stringToPath.js
var require_stringToPath = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_stringToPath.js"(exports, module) {
    var memoizeCapped = require_memoizeCapped();
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46) {
        result.push("");
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
      });
      return result;
    });
    module.exports = stringToPath;
  }
});

// ../../../cc/gamut/node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_arrayMap.js"(exports, module) {
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    module.exports = arrayMap;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseToString.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray3 = require_isArray();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray3(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = baseToString;
  }
});

// ../../../cc/gamut/node_modules/lodash/toString.js
var require_toString = __commonJS({
  "../../../cc/gamut/node_modules/lodash/toString.js"(exports, module) {
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module.exports = toString;
  }
});

// ../../../cc/gamut/node_modules/lodash/_castPath.js
var require_castPath = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_castPath.js"(exports, module) {
    var isArray3 = require_isArray();
    var isKey = require_isKey();
    var stringToPath = require_stringToPath();
    var toString = require_toString();
    function castPath(value, object) {
      if (isArray3(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }
    module.exports = castPath;
  }
});

// ../../../cc/gamut/node_modules/lodash/_toKey.js
var require_toKey = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_toKey.js"(exports, module) {
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = toKey;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseGet.js
var require_baseGet = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseGet.js"(exports, module) {
    var castPath = require_castPath();
    var toKey = require_toKey();
    function baseGet(object, path) {
      path = castPath(path, object);
      var index = 0, length = path.length;
      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return index && index == length ? object : void 0;
    }
    module.exports = baseGet;
  }
});

// ../../../cc/gamut/node_modules/lodash/get.js
var require_get = __commonJS({
  "../../../cc/gamut/node_modules/lodash/get.js"(exports, module) {
    var baseGet = require_baseGet();
    function get3(object, path, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path);
      return result === void 0 ? defaultValue : result;
    }
    module.exports = get3;
  }
});

// ../../../cc/gamut/node_modules/lodash/identity.js
var require_identity = __commonJS({
  "../../../cc/gamut/node_modules/lodash/identity.js"(exports, module) {
    function identity2(value) {
      return value;
    }
    module.exports = identity2;
  }
});

// ../../../cc/gamut/node_modules/lodash/isUndefined.js
var require_isUndefined = __commonJS({
  "../../../cc/gamut/node_modules/lodash/isUndefined.js"(exports, module) {
    function isUndefined2(value) {
      return value === void 0;
    }
    module.exports = isUndefined2;
  }
});

// ../../../cc/gamut/node_modules/lodash/_stackClear.js
var require_stackClear = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_stackClear.js"(exports, module) {
    var ListCache = require_ListCache();
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    module.exports = stackClear;
  }
});

// ../../../cc/gamut/node_modules/lodash/_stackDelete.js
var require_stackDelete = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_stackDelete.js"(exports, module) {
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    module.exports = stackDelete;
  }
});

// ../../../cc/gamut/node_modules/lodash/_stackGet.js
var require_stackGet = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_stackGet.js"(exports, module) {
    function stackGet(key) {
      return this.__data__.get(key);
    }
    module.exports = stackGet;
  }
});

// ../../../cc/gamut/node_modules/lodash/_stackHas.js
var require_stackHas = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_stackHas.js"(exports, module) {
    function stackHas(key) {
      return this.__data__.has(key);
    }
    module.exports = stackHas;
  }
});

// ../../../cc/gamut/node_modules/lodash/_stackSet.js
var require_stackSet = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_stackSet.js"(exports, module) {
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    var MapCache = require_MapCache();
    var LARGE_ARRAY_SIZE = 200;
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    module.exports = stackSet;
  }
});

// ../../../cc/gamut/node_modules/lodash/_Stack.js
var require_Stack = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_Stack.js"(exports, module) {
    var ListCache = require_ListCache();
    var stackClear = require_stackClear();
    var stackDelete = require_stackDelete();
    var stackGet = require_stackGet();
    var stackHas = require_stackHas();
    var stackSet = require_stackSet();
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    module.exports = Stack;
  }
});

// ../../../cc/gamut/node_modules/lodash/_defineProperty.js
var require_defineProperty = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_defineProperty.js"(exports, module) {
    var getNative = require_getNative();
    var defineProperty = (function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    })();
    module.exports = defineProperty;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseAssignValue.js
var require_baseAssignValue = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseAssignValue.js"(exports, module) {
    var defineProperty = require_defineProperty();
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    module.exports = baseAssignValue;
  }
});

// ../../../cc/gamut/node_modules/lodash/_assignMergeValue.js
var require_assignMergeValue = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_assignMergeValue.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var eq = require_eq();
    function assignMergeValue(object, key, value) {
      if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    module.exports = assignMergeValue;
  }
});

// ../../../cc/gamut/node_modules/lodash/_createBaseFor.js
var require_createBaseFor = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_createBaseFor.js"(exports, module) {
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    module.exports = createBaseFor;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseFor.js
var require_baseFor = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseFor.js"(exports, module) {
    var createBaseFor = require_createBaseFor();
    var baseFor = createBaseFor();
    module.exports = baseFor;
  }
});

// ../../../cc/gamut/node_modules/lodash/_cloneBuffer.js
var require_cloneBuffer = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_cloneBuffer.js"(exports, module) {
    var root = require_root();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      buffer.copy(result);
      return result;
    }
    module.exports = cloneBuffer;
  }
});

// ../../../cc/gamut/node_modules/lodash/_Uint8Array.js
var require_Uint8Array = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_Uint8Array.js"(exports, module) {
    var root = require_root();
    var Uint8Array2 = root.Uint8Array;
    module.exports = Uint8Array2;
  }
});

// ../../../cc/gamut/node_modules/lodash/_cloneArrayBuffer.js
var require_cloneArrayBuffer = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_cloneArrayBuffer.js"(exports, module) {
    var Uint8Array2 = require_Uint8Array();
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
      return result;
    }
    module.exports = cloneArrayBuffer;
  }
});

// ../../../cc/gamut/node_modules/lodash/_cloneTypedArray.js
var require_cloneTypedArray = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_cloneTypedArray.js"(exports, module) {
    var cloneArrayBuffer = require_cloneArrayBuffer();
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    module.exports = cloneTypedArray;
  }
});

// ../../../cc/gamut/node_modules/lodash/_copyArray.js
var require_copyArray = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_copyArray.js"(exports, module) {
    function copyArray(source, array) {
      var index = -1, length = source.length;
      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }
    module.exports = copyArray;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseCreate.js
var require_baseCreate = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseCreate.js"(exports, module) {
    var isObject5 = require_isObject();
    var objectCreate = Object.create;
    var baseCreate = /* @__PURE__ */ (function() {
      function object() {
      }
      return function(proto) {
        if (!isObject5(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object();
        object.prototype = void 0;
        return result;
      };
    })();
    module.exports = baseCreate;
  }
});

// ../../../cc/gamut/node_modules/lodash/_overArg.js
var require_overArg = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_overArg.js"(exports, module) {
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    module.exports = overArg;
  }
});

// ../../../cc/gamut/node_modules/lodash/_getPrototype.js
var require_getPrototype = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_getPrototype.js"(exports, module) {
    var overArg = require_overArg();
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    module.exports = getPrototype;
  }
});

// ../../../cc/gamut/node_modules/lodash/_isPrototype.js
var require_isPrototype = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_isPrototype.js"(exports, module) {
    var objectProto = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    module.exports = isPrototype;
  }
});

// ../../../cc/gamut/node_modules/lodash/_initCloneObject.js
var require_initCloneObject = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_initCloneObject.js"(exports, module) {
    var baseCreate = require_baseCreate();
    var getPrototype = require_getPrototype();
    var isPrototype = require_isPrototype();
    function initCloneObject(object) {
      return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
    }
    module.exports = initCloneObject;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseIsArguments.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module.exports = baseIsArguments;
  }
});

// ../../../cc/gamut/node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "../../../cc/gamut/node_modules/lodash/isArguments.js"(exports, module) {
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module.exports = isArguments;
  }
});

// ../../../cc/gamut/node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  "../../../cc/gamut/node_modules/lodash/isLength.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module.exports = isLength;
  }
});

// ../../../cc/gamut/node_modules/lodash/isArrayLike.js
var require_isArrayLike = __commonJS({
  "../../../cc/gamut/node_modules/lodash/isArrayLike.js"(exports, module) {
    var isFunction = require_isFunction();
    var isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    module.exports = isArrayLike;
  }
});

// ../../../cc/gamut/node_modules/lodash/isArrayLikeObject.js
var require_isArrayLikeObject = __commonJS({
  "../../../cc/gamut/node_modules/lodash/isArrayLikeObject.js"(exports, module) {
    var isArrayLike = require_isArrayLike();
    var isObjectLike = require_isObjectLike();
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    module.exports = isArrayLikeObject;
  }
});

// ../../../cc/gamut/node_modules/lodash/stubFalse.js
var require_stubFalse = __commonJS({
  "../../../cc/gamut/node_modules/lodash/stubFalse.js"(exports, module) {
    function stubFalse() {
      return false;
    }
    module.exports = stubFalse;
  }
});

// ../../../cc/gamut/node_modules/lodash/isBuffer.js
var require_isBuffer = __commonJS({
  "../../../cc/gamut/node_modules/lodash/isBuffer.js"(exports, module) {
    var root = require_root();
    var stubFalse = require_stubFalse();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    module.exports = isBuffer;
  }
});

// ../../../cc/gamut/node_modules/lodash/isPlainObject.js
var require_isPlainObject = __commonJS({
  "../../../cc/gamut/node_modules/lodash/isPlainObject.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var getPrototype = require_getPrototype();
    var isObjectLike = require_isObjectLike();
    var objectTag = "[object Object]";
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectCtorString = funcToString.call(Object);
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }
    module.exports = isPlainObject;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseIsTypedArray.js
var require_baseIsTypedArray = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseIsTypedArray.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    module.exports = baseIsTypedArray;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseUnary.js
var require_baseUnary = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseUnary.js"(exports, module) {
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module.exports = baseUnary;
  }
});

// ../../../cc/gamut/node_modules/lodash/_nodeUtil.js
var require_nodeUtil = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_nodeUtil.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = (function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    })();
    module.exports = nodeUtil;
  }
});

// ../../../cc/gamut/node_modules/lodash/isTypedArray.js
var require_isTypedArray = __commonJS({
  "../../../cc/gamut/node_modules/lodash/isTypedArray.js"(exports, module) {
    var baseIsTypedArray = require_baseIsTypedArray();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    module.exports = isTypedArray;
  }
});

// ../../../cc/gamut/node_modules/lodash/_safeGet.js
var require_safeGet = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_safeGet.js"(exports, module) {
    function safeGet(object, key) {
      if (key === "constructor" && typeof object[key] === "function") {
        return;
      }
      if (key == "__proto__") {
        return;
      }
      return object[key];
    }
    module.exports = safeGet;
  }
});

// ../../../cc/gamut/node_modules/lodash/_assignValue.js
var require_assignValue = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_assignValue.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var eq = require_eq();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    module.exports = assignValue;
  }
});

// ../../../cc/gamut/node_modules/lodash/_copyObject.js
var require_copyObject = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_copyObject.js"(exports, module) {
    var assignValue = require_assignValue();
    var baseAssignValue = require_baseAssignValue();
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});
      var index = -1, length = props.length;
      while (++index < length) {
        var key = props[index];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
        if (newValue === void 0) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }
    module.exports = copyObject;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseTimes.js
var require_baseTimes = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseTimes.js"(exports, module) {
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    module.exports = baseTimes;
  }
});

// ../../../cc/gamut/node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_isIndex.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module.exports = isIndex;
  }
});

// ../../../cc/gamut/node_modules/lodash/_arrayLikeKeys.js
var require_arrayLikeKeys = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
    var baseTimes = require_baseTimes();
    var isArguments = require_isArguments();
    var isArray3 = require_isArray();
    var isBuffer = require_isBuffer();
    var isIndex = require_isIndex();
    var isTypedArray = require_isTypedArray();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray3(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = arrayLikeKeys;
  }
});

// ../../../cc/gamut/node_modules/lodash/_nativeKeysIn.js
var require_nativeKeysIn = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_nativeKeysIn.js"(exports, module) {
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = nativeKeysIn;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseKeysIn.js
var require_baseKeysIn = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseKeysIn.js"(exports, module) {
    var isObject5 = require_isObject();
    var isPrototype = require_isPrototype();
    var nativeKeysIn = require_nativeKeysIn();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeysIn(object) {
      if (!isObject5(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object), result = [];
      for (var key in object) {
        if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeysIn;
  }
});

// ../../../cc/gamut/node_modules/lodash/keysIn.js
var require_keysIn = __commonJS({
  "../../../cc/gamut/node_modules/lodash/keysIn.js"(exports, module) {
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeysIn = require_baseKeysIn();
    var isArrayLike = require_isArrayLike();
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }
    module.exports = keysIn;
  }
});

// ../../../cc/gamut/node_modules/lodash/toPlainObject.js
var require_toPlainObject = __commonJS({
  "../../../cc/gamut/node_modules/lodash/toPlainObject.js"(exports, module) {
    var copyObject = require_copyObject();
    var keysIn = require_keysIn();
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }
    module.exports = toPlainObject;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseMergeDeep.js
var require_baseMergeDeep = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseMergeDeep.js"(exports, module) {
    var assignMergeValue = require_assignMergeValue();
    var cloneBuffer = require_cloneBuffer();
    var cloneTypedArray = require_cloneTypedArray();
    var copyArray = require_copyArray();
    var initCloneObject = require_initCloneObject();
    var isArguments = require_isArguments();
    var isArray3 = require_isArray();
    var isArrayLikeObject = require_isArrayLikeObject();
    var isBuffer = require_isBuffer();
    var isFunction = require_isFunction();
    var isObject5 = require_isObject();
    var isPlainObject = require_isPlainObject();
    var isTypedArray = require_isTypedArray();
    var safeGet = require_safeGet();
    var toPlainObject = require_toPlainObject();
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
      var isCommon = newValue === void 0;
      if (isCommon) {
        var isArr = isArray3(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray3(objValue)) {
            newValue = objValue;
          } else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          } else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          } else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          } else {
            newValue = [];
          }
        } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          } else if (!isObject5(objValue) || isFunction(objValue)) {
            newValue = initCloneObject(srcValue);
          }
        } else {
          isCommon = false;
        }
      }
      if (isCommon) {
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack["delete"](srcValue);
      }
      assignMergeValue(object, key, newValue);
    }
    module.exports = baseMergeDeep;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseMerge.js
var require_baseMerge = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseMerge.js"(exports, module) {
    var Stack = require_Stack();
    var assignMergeValue = require_assignMergeValue();
    var baseFor = require_baseFor();
    var baseMergeDeep = require_baseMergeDeep();
    var isObject5 = require_isObject();
    var keysIn = require_keysIn();
    var safeGet = require_safeGet();
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      baseFor(source, function(srcValue, key) {
        stack || (stack = new Stack());
        if (isObject5(srcValue)) {
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        } else {
          var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
          if (newValue === void 0) {
            newValue = srcValue;
          }
          assignMergeValue(object, key, newValue);
        }
      }, keysIn);
    }
    module.exports = baseMerge;
  }
});

// ../../../cc/gamut/node_modules/lodash/_apply.js
var require_apply = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_apply.js"(exports, module) {
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    module.exports = apply;
  }
});

// ../../../cc/gamut/node_modules/lodash/_overRest.js
var require_overRest = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_overRest.js"(exports, module) {
    var apply = require_apply();
    var nativeMax = Math.max;
    function overRest(func, start, transform) {
      start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
      return function() {
        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }
    module.exports = overRest;
  }
});

// ../../../cc/gamut/node_modules/lodash/constant.js
var require_constant = __commonJS({
  "../../../cc/gamut/node_modules/lodash/constant.js"(exports, module) {
    function constant(value) {
      return function() {
        return value;
      };
    }
    module.exports = constant;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseSetToString.js
var require_baseSetToString = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseSetToString.js"(exports, module) {
    var constant = require_constant();
    var defineProperty = require_defineProperty();
    var identity2 = require_identity();
    var baseSetToString = !defineProperty ? identity2 : function(func, string) {
      return defineProperty(func, "toString", {
        "configurable": true,
        "enumerable": false,
        "value": constant(string),
        "writable": true
      });
    };
    module.exports = baseSetToString;
  }
});

// ../../../cc/gamut/node_modules/lodash/_shortOut.js
var require_shortOut = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_shortOut.js"(exports, module) {
    var HOT_COUNT = 800;
    var HOT_SPAN = 16;
    var nativeNow = Date.now;
    function shortOut(func) {
      var count = 0, lastCalled = 0;
      return function() {
        var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(void 0, arguments);
      };
    }
    module.exports = shortOut;
  }
});

// ../../../cc/gamut/node_modules/lodash/_setToString.js
var require_setToString = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_setToString.js"(exports, module) {
    var baseSetToString = require_baseSetToString();
    var shortOut = require_shortOut();
    var setToString = shortOut(baseSetToString);
    module.exports = setToString;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseRest.js
var require_baseRest = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseRest.js"(exports, module) {
    var identity2 = require_identity();
    var overRest = require_overRest();
    var setToString = require_setToString();
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity2), func + "");
    }
    module.exports = baseRest;
  }
});

// ../../../cc/gamut/node_modules/lodash/_isIterateeCall.js
var require_isIterateeCall = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_isIterateeCall.js"(exports, module) {
    var eq = require_eq();
    var isArrayLike = require_isArrayLike();
    var isIndex = require_isIndex();
    var isObject5 = require_isObject();
    function isIterateeCall(value, index, object) {
      if (!isObject5(object)) {
        return false;
      }
      var type = typeof index;
      if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
        return eq(object[index], value);
      }
      return false;
    }
    module.exports = isIterateeCall;
  }
});

// ../../../cc/gamut/node_modules/lodash/_createAssigner.js
var require_createAssigner = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_createAssigner.js"(exports, module) {
    var baseRest = require_baseRest();
    var isIterateeCall = require_isIterateeCall();
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
        customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? void 0 : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }
    module.exports = createAssigner;
  }
});

// ../../../cc/gamut/node_modules/lodash/merge.js
var require_merge = __commonJS({
  "../../../cc/gamut/node_modules/lodash/merge.js"(exports, module) {
    var baseMerge = require_baseMerge();
    var createAssigner = require_createAssigner();
    var merge4 = createAssigner(function(object, source, srcIndex) {
      baseMerge(object, source, srcIndex);
    });
    module.exports = merge4;
  }
});

// ../../../cc/gamut/node_modules/lodash/isString.js
var require_isString = __commonJS({
  "../../../cc/gamut/node_modules/lodash/isString.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isArray3 = require_isArray();
    var isObjectLike = require_isObjectLike();
    var stringTag = "[object String]";
    function isString2(value) {
      return typeof value == "string" || !isArray3(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
    }
    module.exports = isString2;
  }
});

// ../../../cc/gamut/node_modules/lodash/_nativeKeys.js
var require_nativeKeys = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_nativeKeys.js"(exports, module) {
    var overArg = require_overArg();
    var nativeKeys = overArg(Object.keys, Object);
    module.exports = nativeKeys;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseKeys.js
var require_baseKeys = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseKeys.js"(exports, module) {
    var isPrototype = require_isPrototype();
    var nativeKeys = require_nativeKeys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeys;
  }
});

// ../../../cc/gamut/node_modules/lodash/keys.js
var require_keys = __commonJS({
  "../../../cc/gamut/node_modules/lodash/keys.js"(exports, module) {
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeys = require_baseKeys();
    var isArrayLike = require_isArrayLike();
    function keys2(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    module.exports = keys2;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseSet.js
var require_baseSet = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseSet.js"(exports, module) {
    var assignValue = require_assignValue();
    var castPath = require_castPath();
    var isIndex = require_isIndex();
    var isObject5 = require_isObject();
    var toKey = require_toKey();
    function baseSet(object, path, value, customizer) {
      if (!isObject5(object)) {
        return object;
      }
      path = castPath(path, object);
      var index = -1, length = path.length, lastIndex = length - 1, nested = object;
      while (nested != null && ++index < length) {
        var key = toKey(path[index]), newValue = value;
        if (key === "__proto__" || key === "constructor" || key === "prototype") {
          return object;
        }
        if (index != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : void 0;
          if (newValue === void 0) {
            newValue = isObject5(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }
    module.exports = baseSet;
  }
});

// ../../../cc/gamut/node_modules/lodash/_basePickBy.js
var require_basePickBy = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_basePickBy.js"(exports, module) {
    var baseGet = require_baseGet();
    var baseSet = require_baseSet();
    var castPath = require_castPath();
    function basePickBy(object, paths, predicate) {
      var index = -1, length = paths.length, result = {};
      while (++index < length) {
        var path = paths[index], value = baseGet(object, path);
        if (predicate(value, path)) {
          baseSet(result, castPath(path, object), value);
        }
      }
      return result;
    }
    module.exports = basePickBy;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseHasIn.js
var require_baseHasIn = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseHasIn.js"(exports, module) {
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    module.exports = baseHasIn;
  }
});

// ../../../cc/gamut/node_modules/lodash/_hasPath.js
var require_hasPath = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_hasPath.js"(exports, module) {
    var castPath = require_castPath();
    var isArguments = require_isArguments();
    var isArray3 = require_isArray();
    var isIndex = require_isIndex();
    var isLength = require_isLength();
    var toKey = require_toKey();
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);
      var index = -1, length = path.length, result = false;
      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) && (isArray3(object) || isArguments(object));
    }
    module.exports = hasPath;
  }
});

// ../../../cc/gamut/node_modules/lodash/hasIn.js
var require_hasIn = __commonJS({
  "../../../cc/gamut/node_modules/lodash/hasIn.js"(exports, module) {
    var baseHasIn = require_baseHasIn();
    var hasPath = require_hasPath();
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }
    module.exports = hasIn;
  }
});

// ../../../cc/gamut/node_modules/lodash/_basePick.js
var require_basePick = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_basePick.js"(exports, module) {
    var basePickBy = require_basePickBy();
    var hasIn = require_hasIn();
    function basePick(object, paths) {
      return basePickBy(object, paths, function(value, path) {
        return hasIn(object, path);
      });
    }
    module.exports = basePick;
  }
});

// ../../../cc/gamut/node_modules/lodash/_arrayPush.js
var require_arrayPush = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_arrayPush.js"(exports, module) {
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    module.exports = arrayPush;
  }
});

// ../../../cc/gamut/node_modules/lodash/_isFlattenable.js
var require_isFlattenable = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_isFlattenable.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var isArguments = require_isArguments();
    var isArray3 = require_isArray();
    var spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : void 0;
    function isFlattenable(value) {
      return isArray3(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
    }
    module.exports = isFlattenable;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseFlatten.js
var require_baseFlatten = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseFlatten.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var isFlattenable = require_isFlattenable();
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1, length = array.length;
      predicate || (predicate = isFlattenable);
      result || (result = []);
      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }
    module.exports = baseFlatten;
  }
});

// ../../../cc/gamut/node_modules/lodash/flatten.js
var require_flatten = __commonJS({
  "../../../cc/gamut/node_modules/lodash/flatten.js"(exports, module) {
    var baseFlatten = require_baseFlatten();
    function flatten(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, 1) : [];
    }
    module.exports = flatten;
  }
});

// ../../../cc/gamut/node_modules/lodash/_flatRest.js
var require_flatRest = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_flatRest.js"(exports, module) {
    var flatten = require_flatten();
    var overRest = require_overRest();
    var setToString = require_setToString();
    function flatRest(func) {
      return setToString(overRest(func, void 0, flatten), func + "");
    }
    module.exports = flatRest;
  }
});

// ../../../cc/gamut/node_modules/lodash/pick.js
var require_pick = __commonJS({
  "../../../cc/gamut/node_modules/lodash/pick.js"(exports, module) {
    var basePick = require_basePick();
    var flatRest = require_flatRest();
    var pick2 = flatRest(function(object, paths) {
      return object == null ? {} : basePick(object, paths);
    });
    module.exports = pick2;
  }
});

// ../../../cc/gamut/node_modules/lodash/_setCacheAdd.js
var require_setCacheAdd = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_setCacheAdd.js"(exports, module) {
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    module.exports = setCacheAdd;
  }
});

// ../../../cc/gamut/node_modules/lodash/_setCacheHas.js
var require_setCacheHas = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_setCacheHas.js"(exports, module) {
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    module.exports = setCacheHas;
  }
});

// ../../../cc/gamut/node_modules/lodash/_SetCache.js
var require_SetCache = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_SetCache.js"(exports, module) {
    var MapCache = require_MapCache();
    var setCacheAdd = require_setCacheAdd();
    var setCacheHas = require_setCacheHas();
    function SetCache(values) {
      var index = -1, length = values == null ? 0 : values.length;
      this.__data__ = new MapCache();
      while (++index < length) {
        this.add(values[index]);
      }
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    module.exports = SetCache;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseFindIndex.js
var require_baseFindIndex = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseFindIndex.js"(exports, module) {
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    module.exports = baseFindIndex;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseIsNaN.js
var require_baseIsNaN = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseIsNaN.js"(exports, module) {
    function baseIsNaN(value) {
      return value !== value;
    }
    module.exports = baseIsNaN;
  }
});

// ../../../cc/gamut/node_modules/lodash/_strictIndexOf.js
var require_strictIndexOf = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_strictIndexOf.js"(exports, module) {
    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    module.exports = strictIndexOf;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseIndexOf.js
var require_baseIndexOf = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseIndexOf.js"(exports, module) {
    var baseFindIndex = require_baseFindIndex();
    var baseIsNaN = require_baseIsNaN();
    var strictIndexOf = require_strictIndexOf();
    function baseIndexOf(array, value, fromIndex) {
      return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
    }
    module.exports = baseIndexOf;
  }
});

// ../../../cc/gamut/node_modules/lodash/_arrayIncludes.js
var require_arrayIncludes = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_arrayIncludes.js"(exports, module) {
    var baseIndexOf = require_baseIndexOf();
    function arrayIncludes(array, value) {
      var length = array == null ? 0 : array.length;
      return !!length && baseIndexOf(array, value, 0) > -1;
    }
    module.exports = arrayIncludes;
  }
});

// ../../../cc/gamut/node_modules/lodash/_arrayIncludesWith.js
var require_arrayIncludesWith = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_arrayIncludesWith.js"(exports, module) {
    function arrayIncludesWith(array, value, comparator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (comparator(value, array[index])) {
          return true;
        }
      }
      return false;
    }
    module.exports = arrayIncludesWith;
  }
});

// ../../../cc/gamut/node_modules/lodash/_cacheHas.js
var require_cacheHas = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_cacheHas.js"(exports, module) {
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    module.exports = cacheHas;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseIntersection.js
var require_baseIntersection = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseIntersection.js"(exports, module) {
    var SetCache = require_SetCache();
    var arrayIncludes = require_arrayIncludes();
    var arrayIncludesWith = require_arrayIncludesWith();
    var arrayMap = require_arrayMap();
    var baseUnary = require_baseUnary();
    var cacheHas = require_cacheHas();
    var nativeMin = Math.min;
    function baseIntersection(arrays, iteratee, comparator) {
      var includes = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array(othLength), maxLength = Infinity, result = [];
      while (othIndex--) {
        var array = arrays[othIndex];
        if (othIndex && iteratee) {
          array = arrayMap(array, baseUnary(iteratee));
        }
        maxLength = nativeMin(array.length, maxLength);
        caches[othIndex] = !comparator && (iteratee || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : void 0;
      }
      array = arrays[0];
      var index = -1, seen = caches[0];
      outer:
        while (++index < length && result.length < maxLength) {
          var value = array[index], computed = iteratee ? iteratee(value) : value;
          value = comparator || value !== 0 ? value : 0;
          if (!(seen ? cacheHas(seen, computed) : includes(result, computed, comparator))) {
            othIndex = othLength;
            while (--othIndex) {
              var cache = caches[othIndex];
              if (!(cache ? cacheHas(cache, computed) : includes(arrays[othIndex], computed, comparator))) {
                continue outer;
              }
            }
            if (seen) {
              seen.push(computed);
            }
            result.push(value);
          }
        }
      return result;
    }
    module.exports = baseIntersection;
  }
});

// ../../../cc/gamut/node_modules/lodash/_castArrayLikeObject.js
var require_castArrayLikeObject = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_castArrayLikeObject.js"(exports, module) {
    var isArrayLikeObject = require_isArrayLikeObject();
    function castArrayLikeObject(value) {
      return isArrayLikeObject(value) ? value : [];
    }
    module.exports = castArrayLikeObject;
  }
});

// ../../../cc/gamut/node_modules/lodash/intersection.js
var require_intersection = __commonJS({
  "../../../cc/gamut/node_modules/lodash/intersection.js"(exports, module) {
    var arrayMap = require_arrayMap();
    var baseIntersection = require_baseIntersection();
    var baseRest = require_baseRest();
    var castArrayLikeObject = require_castArrayLikeObject();
    var intersection2 = baseRest(function(arrays) {
      var mapped = arrayMap(arrays, castArrayLikeObject);
      return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
    });
    module.exports = intersection2;
  }
});

// ../../../cc/gamut/node_modules/lodash/_arrayEach.js
var require_arrayEach = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_arrayEach.js"(exports, module) {
    function arrayEach(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    module.exports = arrayEach;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseAssign.js
var require_baseAssign = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseAssign.js"(exports, module) {
    var copyObject = require_copyObject();
    var keys2 = require_keys();
    function baseAssign(object, source) {
      return object && copyObject(source, keys2(source), object);
    }
    module.exports = baseAssign;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseAssignIn.js
var require_baseAssignIn = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseAssignIn.js"(exports, module) {
    var copyObject = require_copyObject();
    var keysIn = require_keysIn();
    function baseAssignIn(object, source) {
      return object && copyObject(source, keysIn(source), object);
    }
    module.exports = baseAssignIn;
  }
});

// ../../../cc/gamut/node_modules/lodash/_arrayFilter.js
var require_arrayFilter = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_arrayFilter.js"(exports, module) {
    function arrayFilter(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    module.exports = arrayFilter;
  }
});

// ../../../cc/gamut/node_modules/lodash/stubArray.js
var require_stubArray = __commonJS({
  "../../../cc/gamut/node_modules/lodash/stubArray.js"(exports, module) {
    function stubArray() {
      return [];
    }
    module.exports = stubArray;
  }
});

// ../../../cc/gamut/node_modules/lodash/_getSymbols.js
var require_getSymbols = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_getSymbols.js"(exports, module) {
    var arrayFilter = require_arrayFilter();
    var stubArray = require_stubArray();
    var objectProto = Object.prototype;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };
    module.exports = getSymbols;
  }
});

// ../../../cc/gamut/node_modules/lodash/_copySymbols.js
var require_copySymbols = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_copySymbols.js"(exports, module) {
    var copyObject = require_copyObject();
    var getSymbols = require_getSymbols();
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }
    module.exports = copySymbols;
  }
});

// ../../../cc/gamut/node_modules/lodash/_getSymbolsIn.js
var require_getSymbolsIn = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_getSymbolsIn.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var getPrototype = require_getPrototype();
    var getSymbols = require_getSymbols();
    var stubArray = require_stubArray();
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
      var result = [];
      while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
      }
      return result;
    };
    module.exports = getSymbolsIn;
  }
});

// ../../../cc/gamut/node_modules/lodash/_copySymbolsIn.js
var require_copySymbolsIn = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_copySymbolsIn.js"(exports, module) {
    var copyObject = require_copyObject();
    var getSymbolsIn = require_getSymbolsIn();
    function copySymbolsIn(source, object) {
      return copyObject(source, getSymbolsIn(source), object);
    }
    module.exports = copySymbolsIn;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseGetAllKeys.js
var require_baseGetAllKeys = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseGetAllKeys.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var isArray3 = require_isArray();
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray3(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    module.exports = baseGetAllKeys;
  }
});

// ../../../cc/gamut/node_modules/lodash/_getAllKeys.js
var require_getAllKeys = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_getAllKeys.js"(exports, module) {
    var baseGetAllKeys = require_baseGetAllKeys();
    var getSymbols = require_getSymbols();
    var keys2 = require_keys();
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys2, getSymbols);
    }
    module.exports = getAllKeys;
  }
});

// ../../../cc/gamut/node_modules/lodash/_getAllKeysIn.js
var require_getAllKeysIn = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_getAllKeysIn.js"(exports, module) {
    var baseGetAllKeys = require_baseGetAllKeys();
    var getSymbolsIn = require_getSymbolsIn();
    var keysIn = require_keysIn();
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn, getSymbolsIn);
    }
    module.exports = getAllKeysIn;
  }
});

// ../../../cc/gamut/node_modules/lodash/_DataView.js
var require_DataView = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_DataView.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var DataView = getNative(root, "DataView");
    module.exports = DataView;
  }
});

// ../../../cc/gamut/node_modules/lodash/_Promise.js
var require_Promise = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_Promise.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Promise2 = getNative(root, "Promise");
    module.exports = Promise2;
  }
});

// ../../../cc/gamut/node_modules/lodash/_Set.js
var require_Set = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_Set.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Set = getNative(root, "Set");
    module.exports = Set;
  }
});

// ../../../cc/gamut/node_modules/lodash/_WeakMap.js
var require_WeakMap = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_WeakMap.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var WeakMap = getNative(root, "WeakMap");
    module.exports = WeakMap;
  }
});

// ../../../cc/gamut/node_modules/lodash/_getTag.js
var require_getTag = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_getTag.js"(exports, module) {
    var DataView = require_DataView();
    var Map2 = require_Map();
    var Promise2 = require_Promise();
    var Set = require_Set();
    var WeakMap = require_WeakMap();
    var baseGetTag = require_baseGetTag();
    var toSource = require_toSource();
    var mapTag = "[object Map]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var setTag = "[object Set]";
    var weakMapTag = "[object WeakMap]";
    var dataViewTag = "[object DataView]";
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set);
    var weakMapCtorString = toSource(WeakMap);
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    module.exports = getTag;
  }
});

// ../../../cc/gamut/node_modules/lodash/_initCloneArray.js
var require_initCloneArray = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_initCloneArray.js"(exports, module) {
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function initCloneArray(array) {
      var length = array.length, result = new array.constructor(length);
      if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }
    module.exports = initCloneArray;
  }
});

// ../../../cc/gamut/node_modules/lodash/_cloneDataView.js
var require_cloneDataView = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_cloneDataView.js"(exports, module) {
    var cloneArrayBuffer = require_cloneArrayBuffer();
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }
    module.exports = cloneDataView;
  }
});

// ../../../cc/gamut/node_modules/lodash/_cloneRegExp.js
var require_cloneRegExp = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_cloneRegExp.js"(exports, module) {
    var reFlags = /\w*$/;
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }
    module.exports = cloneRegExp;
  }
});

// ../../../cc/gamut/node_modules/lodash/_cloneSymbol.js
var require_cloneSymbol = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_cloneSymbol.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }
    module.exports = cloneSymbol;
  }
});

// ../../../cc/gamut/node_modules/lodash/_initCloneByTag.js
var require_initCloneByTag = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_initCloneByTag.js"(exports, module) {
    var cloneArrayBuffer = require_cloneArrayBuffer();
    var cloneDataView = require_cloneDataView();
    var cloneRegExp = require_cloneRegExp();
    var cloneSymbol = require_cloneSymbol();
    var cloneTypedArray = require_cloneTypedArray();
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);
        case boolTag:
        case dateTag:
          return new Ctor(+object);
        case dataViewTag:
          return cloneDataView(object, isDeep);
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
          return cloneTypedArray(object, isDeep);
        case mapTag:
          return new Ctor();
        case numberTag:
        case stringTag:
          return new Ctor(object);
        case regexpTag:
          return cloneRegExp(object);
        case setTag:
          return new Ctor();
        case symbolTag:
          return cloneSymbol(object);
      }
    }
    module.exports = initCloneByTag;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseIsMap.js
var require_baseIsMap = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseIsMap.js"(exports, module) {
    var getTag = require_getTag();
    var isObjectLike = require_isObjectLike();
    var mapTag = "[object Map]";
    function baseIsMap(value) {
      return isObjectLike(value) && getTag(value) == mapTag;
    }
    module.exports = baseIsMap;
  }
});

// ../../../cc/gamut/node_modules/lodash/isMap.js
var require_isMap = __commonJS({
  "../../../cc/gamut/node_modules/lodash/isMap.js"(exports, module) {
    var baseIsMap = require_baseIsMap();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsMap = nodeUtil && nodeUtil.isMap;
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
    module.exports = isMap;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseIsSet.js
var require_baseIsSet = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseIsSet.js"(exports, module) {
    var getTag = require_getTag();
    var isObjectLike = require_isObjectLike();
    var setTag = "[object Set]";
    function baseIsSet(value) {
      return isObjectLike(value) && getTag(value) == setTag;
    }
    module.exports = baseIsSet;
  }
});

// ../../../cc/gamut/node_modules/lodash/isSet.js
var require_isSet = __commonJS({
  "../../../cc/gamut/node_modules/lodash/isSet.js"(exports, module) {
    var baseIsSet = require_baseIsSet();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsSet = nodeUtil && nodeUtil.isSet;
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
    module.exports = isSet;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseClone.js
var require_baseClone = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseClone.js"(exports, module) {
    var Stack = require_Stack();
    var arrayEach = require_arrayEach();
    var assignValue = require_assignValue();
    var baseAssign = require_baseAssign();
    var baseAssignIn = require_baseAssignIn();
    var cloneBuffer = require_cloneBuffer();
    var copyArray = require_copyArray();
    var copySymbols = require_copySymbols();
    var copySymbolsIn = require_copySymbolsIn();
    var getAllKeys = require_getAllKeys();
    var getAllKeysIn = require_getAllKeysIn();
    var getTag = require_getTag();
    var initCloneArray = require_initCloneArray();
    var initCloneByTag = require_initCloneByTag();
    var initCloneObject = require_initCloneObject();
    var isArray3 = require_isArray();
    var isBuffer = require_isBuffer();
    var isMap = require_isMap();
    var isObject5 = require_isObject();
    var isSet = require_isSet();
    var keys2 = require_keys();
    var keysIn = require_keysIn();
    var CLONE_DEEP_FLAG = 1;
    var CLONE_FLAT_FLAG = 2;
    var CLONE_SYMBOLS_FLAG = 4;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== void 0) {
        return result;
      }
      if (!isObject5(value)) {
        return value;
      }
      var isArr = isArray3(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || isFunc && !object) {
          result = isFlat || isFunc ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, isDeep);
        }
      }
      stack || (stack = new Stack());
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);
      if (isSet(value)) {
        value.forEach(function(subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });
      } else if (isMap(value)) {
        value.forEach(function(subValue, key2) {
          result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
        });
      }
      var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys2;
      var props = isArr ? void 0 : keysFunc(value);
      arrayEach(props || value, function(subValue, key2) {
        if (props) {
          key2 = subValue;
          subValue = value[key2];
        }
        assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
      });
      return result;
    }
    module.exports = baseClone;
  }
});

// ../../../cc/gamut/node_modules/lodash/last.js
var require_last = __commonJS({
  "../../../cc/gamut/node_modules/lodash/last.js"(exports, module) {
    function last(array) {
      var length = array == null ? 0 : array.length;
      return length ? array[length - 1] : void 0;
    }
    module.exports = last;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseSlice.js
var require_baseSlice = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseSlice.js"(exports, module) {
    function baseSlice(array, start, end) {
      var index = -1, length = array.length;
      if (start < 0) {
        start = -start > length ? 0 : length + start;
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : end - start >>> 0;
      start >>>= 0;
      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }
    module.exports = baseSlice;
  }
});

// ../../../cc/gamut/node_modules/lodash/_parent.js
var require_parent = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_parent.js"(exports, module) {
    var baseGet = require_baseGet();
    var baseSlice = require_baseSlice();
    function parent(object, path) {
      return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
    }
    module.exports = parent;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseUnset.js
var require_baseUnset = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseUnset.js"(exports, module) {
    var castPath = require_castPath();
    var last = require_last();
    var parent = require_parent();
    var toKey = require_toKey();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseUnset(object, path) {
      path = castPath(path, object);
      var index = -1, length = path.length;
      if (!length) {
        return true;
      }
      while (++index < length) {
        var key = toKey(path[index]);
        if (key === "__proto__" && !hasOwnProperty.call(object, "__proto__")) {
          return false;
        }
        if ((key === "constructor" || key === "prototype") && index < length - 1) {
          return false;
        }
      }
      var obj = parent(object, path);
      return obj == null || delete obj[toKey(last(path))];
    }
    module.exports = baseUnset;
  }
});

// ../../../cc/gamut/node_modules/lodash/_customOmitClone.js
var require_customOmitClone = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_customOmitClone.js"(exports, module) {
    var isPlainObject = require_isPlainObject();
    function customOmitClone(value) {
      return isPlainObject(value) ? void 0 : value;
    }
    module.exports = customOmitClone;
  }
});

// ../../../cc/gamut/node_modules/lodash/omit.js
var require_omit = __commonJS({
  "../../../cc/gamut/node_modules/lodash/omit.js"(exports, module) {
    var arrayMap = require_arrayMap();
    var baseClone = require_baseClone();
    var baseUnset = require_baseUnset();
    var castPath = require_castPath();
    var copyObject = require_copyObject();
    var customOmitClone = require_customOmitClone();
    var flatRest = require_flatRest();
    var getAllKeysIn = require_getAllKeysIn();
    var CLONE_DEEP_FLAG = 1;
    var CLONE_FLAT_FLAG = 2;
    var CLONE_SYMBOLS_FLAG = 4;
    var omit2 = flatRest(function(object, paths) {
      var result = {};
      if (object == null) {
        return result;
      }
      var isDeep = false;
      paths = arrayMap(paths, function(path) {
        path = castPath(path, object);
        isDeep || (isDeep = path.length > 1);
        return path;
      });
      copyObject(object, getAllKeysIn(object), result);
      if (isDeep) {
        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
      }
      var length = paths.length;
      while (length--) {
        baseUnset(result, paths[length]);
      }
      return result;
    });
    module.exports = omit2;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseForOwn.js
var require_baseForOwn = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseForOwn.js"(exports, module) {
    var baseFor = require_baseFor();
    var keys2 = require_keys();
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys2);
    }
    module.exports = baseForOwn;
  }
});

// ../../../cc/gamut/node_modules/lodash/_arraySome.js
var require_arraySome = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_arraySome.js"(exports, module) {
    function arraySome(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    module.exports = arraySome;
  }
});

// ../../../cc/gamut/node_modules/lodash/_equalArrays.js
var require_equalArrays = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_equalArrays.js"(exports, module) {
    var SetCache = require_SetCache();
    var arraySome = require_arraySome();
    var cacheHas = require_cacheHas();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var arrStacked = stack.get(array);
      var othStacked = stack.get(other);
      if (arrStacked && othStacked) {
        return arrStacked == other && othStacked == array;
      }
      var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
      stack.set(array, other);
      stack.set(other, array);
      while (++index < arrLength) {
        var arrValue = array[index], othValue = other[index];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array);
      stack["delete"](other);
      return result;
    }
    module.exports = equalArrays;
  }
});

// ../../../cc/gamut/node_modules/lodash/_mapToArray.js
var require_mapToArray = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_mapToArray.js"(exports, module) {
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    module.exports = mapToArray;
  }
});

// ../../../cc/gamut/node_modules/lodash/_setToArray.js
var require_setToArray = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_setToArray.js"(exports, module) {
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    module.exports = setToArray;
  }
});

// ../../../cc/gamut/node_modules/lodash/_equalByTag.js
var require_equalByTag = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_equalByTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var Uint8Array2 = require_Uint8Array();
    var eq = require_eq();
    var equalArrays = require_equalArrays();
    var mapToArray = require_mapToArray();
    var setToArray = require_setToArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    module.exports = equalByTag;
  }
});

// ../../../cc/gamut/node_modules/lodash/_equalObjects.js
var require_equalObjects = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_equalObjects.js"(exports, module) {
    var getAllKeys = require_getAllKeys();
    var COMPARE_PARTIAL_FLAG = 1;
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var objStacked = stack.get(object);
      var othStacked = stack.get(other);
      if (objStacked && othStacked) {
        return objStacked == other && othStacked == object;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    module.exports = equalObjects;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseIsEqualDeep.js
var require_baseIsEqualDeep = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseIsEqualDeep.js"(exports, module) {
    var Stack = require_Stack();
    var equalArrays = require_equalArrays();
    var equalByTag = require_equalByTag();
    var equalObjects = require_equalObjects();
    var getTag = require_getTag();
    var isArray3 = require_isArray();
    var isBuffer = require_isBuffer();
    var isTypedArray = require_isTypedArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var objectTag = "[object Object]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray3(object), othIsArr = isArray3(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }
    module.exports = baseIsEqualDeep;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseIsEqual.js
var require_baseIsEqual = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseIsEqual.js"(exports, module) {
    var baseIsEqualDeep = require_baseIsEqualDeep();
    var isObjectLike = require_isObjectLike();
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    module.exports = baseIsEqual;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseIsMatch.js
var require_baseIsMatch = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseIsMatch.js"(exports, module) {
    var Stack = require_Stack();
    var baseIsEqual = require_baseIsEqual();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length, length = index, noCustomizer = !customizer;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
          if (objValue === void 0 && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack();
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
            return false;
          }
        }
      }
      return true;
    }
    module.exports = baseIsMatch;
  }
});

// ../../../cc/gamut/node_modules/lodash/_isStrictComparable.js
var require_isStrictComparable = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_isStrictComparable.js"(exports, module) {
    var isObject5 = require_isObject();
    function isStrictComparable(value) {
      return value === value && !isObject5(value);
    }
    module.exports = isStrictComparable;
  }
});

// ../../../cc/gamut/node_modules/lodash/_getMatchData.js
var require_getMatchData = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_getMatchData.js"(exports, module) {
    var isStrictComparable = require_isStrictComparable();
    var keys2 = require_keys();
    function getMatchData(object) {
      var result = keys2(object), length = result.length;
      while (length--) {
        var key = result[length], value = object[key];
        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }
    module.exports = getMatchData;
  }
});

// ../../../cc/gamut/node_modules/lodash/_matchesStrictComparable.js
var require_matchesStrictComparable = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_matchesStrictComparable.js"(exports, module) {
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
      };
    }
    module.exports = matchesStrictComparable;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseMatches.js
var require_baseMatches = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseMatches.js"(exports, module) {
    var baseIsMatch = require_baseIsMatch();
    var getMatchData = require_getMatchData();
    var matchesStrictComparable = require_matchesStrictComparable();
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }
    module.exports = baseMatches;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseMatchesProperty.js
var require_baseMatchesProperty = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseMatchesProperty.js"(exports, module) {
    var baseIsEqual = require_baseIsEqual();
    var get3 = require_get();
    var hasIn = require_hasIn();
    var isKey = require_isKey();
    var isStrictComparable = require_isStrictComparable();
    var matchesStrictComparable = require_matchesStrictComparable();
    var toKey = require_toKey();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get3(object, path);
        return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }
    module.exports = baseMatchesProperty;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseProperty.js
var require_baseProperty = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseProperty.js"(exports, module) {
    function baseProperty(key) {
      return function(object) {
        return object == null ? void 0 : object[key];
      };
    }
    module.exports = baseProperty;
  }
});

// ../../../cc/gamut/node_modules/lodash/_basePropertyDeep.js
var require_basePropertyDeep = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_basePropertyDeep.js"(exports, module) {
    var baseGet = require_baseGet();
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }
    module.exports = basePropertyDeep;
  }
});

// ../../../cc/gamut/node_modules/lodash/property.js
var require_property = __commonJS({
  "../../../cc/gamut/node_modules/lodash/property.js"(exports, module) {
    var baseProperty = require_baseProperty();
    var basePropertyDeep = require_basePropertyDeep();
    var isKey = require_isKey();
    var toKey = require_toKey();
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }
    module.exports = property;
  }
});

// ../../../cc/gamut/node_modules/lodash/_baseIteratee.js
var require_baseIteratee = __commonJS({
  "../../../cc/gamut/node_modules/lodash/_baseIteratee.js"(exports, module) {
    var baseMatches = require_baseMatches();
    var baseMatchesProperty = require_baseMatchesProperty();
    var identity2 = require_identity();
    var isArray3 = require_isArray();
    var property = require_property();
    function baseIteratee(value) {
      if (typeof value == "function") {
        return value;
      }
      if (value == null) {
        return identity2;
      }
      if (typeof value == "object") {
        return isArray3(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
      }
      return property(value);
    }
    module.exports = baseIteratee;
  }
});

// ../../../cc/gamut/node_modules/lodash/mapValues.js
var require_mapValues = __commonJS({
  "../../../cc/gamut/node_modules/lodash/mapValues.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var baseForOwn = require_baseForOwn();
    var baseIteratee = require_baseIteratee();
    function mapValues2(object, iteratee) {
      var result = {};
      iteratee = baseIteratee(iteratee, 3);
      baseForOwn(object, function(value, key, object2) {
        baseAssignValue(result, key, iteratee(value, key, object2));
      });
      return result;
    }
    module.exports = mapValues2;
  }
});

// ../../../cc/gamut/node_modules/lodash/isNumber.js
var require_isNumber = __commonJS({
  "../../../cc/gamut/node_modules/lodash/isNumber.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var numberTag = "[object Number]";
    function isNumber2(value) {
      return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
    }
    module.exports = isNumber2;
  }
});

// ../../../cc/gamut/node_modules/@babel/runtime/helpers/extends.js
var require_extends = __commonJS({
  "../../../cc/gamut/node_modules/@babel/runtime/helpers/extends.js"(exports, module) {
    function _extends() {
      return module.exports = _extends = Object.assign ? Object.assign.bind() : function(n) {
        for (var e = 1; e < arguments.length; e++) {
          var t = arguments[e];
          for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
        }
        return n;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports, _extends.apply(null, arguments);
    }
    module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// ../../../cc/gamut/node_modules/@babel/runtime/helpers/assertThisInitialized.js
var require_assertThisInitialized = __commonJS({
  "../../../cc/gamut/node_modules/@babel/runtime/helpers/assertThisInitialized.js"(exports, module) {
    function _assertThisInitialized(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }
    module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// ../../../cc/gamut/node_modules/@babel/runtime/helpers/setPrototypeOf.js
var require_setPrototypeOf = __commonJS({
  "../../../cc/gamut/node_modules/@babel/runtime/helpers/setPrototypeOf.js"(exports, module) {
    function _setPrototypeOf(t, e) {
      return module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
        return t2.__proto__ = e2, t2;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports, _setPrototypeOf(t, e);
    }
    module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// ../../../cc/gamut/node_modules/@babel/runtime/helpers/inheritsLoose.js
var require_inheritsLoose = __commonJS({
  "../../../cc/gamut/node_modules/@babel/runtime/helpers/inheritsLoose.js"(exports, module) {
    var setPrototypeOf = require_setPrototypeOf();
    function _inheritsLoose(t, o) {
      t.prototype = Object.create(o.prototype), t.prototype.constructor = t, setPrototypeOf(t, o);
    }
    module.exports = _inheritsLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// ../../../cc/gamut/node_modules/@babel/runtime/helpers/getPrototypeOf.js
var require_getPrototypeOf = __commonJS({
  "../../../cc/gamut/node_modules/@babel/runtime/helpers/getPrototypeOf.js"(exports, module) {
    function _getPrototypeOf(t) {
      return module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
        return t2.__proto__ || Object.getPrototypeOf(t2);
      }, module.exports.__esModule = true, module.exports["default"] = module.exports, _getPrototypeOf(t);
    }
    module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// ../../../cc/gamut/node_modules/@babel/runtime/helpers/isNativeFunction.js
var require_isNativeFunction = __commonJS({
  "../../../cc/gamut/node_modules/@babel/runtime/helpers/isNativeFunction.js"(exports, module) {
    function _isNativeFunction(t) {
      try {
        return -1 !== Function.toString.call(t).indexOf("[native code]");
      } catch (n) {
        return "function" == typeof t;
      }
    }
    module.exports = _isNativeFunction, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// ../../../cc/gamut/node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js
var require_isNativeReflectConstruct = __commonJS({
  "../../../cc/gamut/node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js"(exports, module) {
    function _isNativeReflectConstruct() {
      try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
      } catch (t2) {
      }
      return (module.exports = _isNativeReflectConstruct = function _isNativeReflectConstruct2() {
        return !!t;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
    }
    module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// ../../../cc/gamut/node_modules/@babel/runtime/helpers/construct.js
var require_construct = __commonJS({
  "../../../cc/gamut/node_modules/@babel/runtime/helpers/construct.js"(exports, module) {
    var isNativeReflectConstruct = require_isNativeReflectConstruct();
    var setPrototypeOf = require_setPrototypeOf();
    function _construct(t, e, r) {
      if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
      var o = [null];
      o.push.apply(o, e);
      var p = new (t.bind.apply(t, o))();
      return r && setPrototypeOf(p, r.prototype), p;
    }
    module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// ../../../cc/gamut/node_modules/@babel/runtime/helpers/wrapNativeSuper.js
var require_wrapNativeSuper = __commonJS({
  "../../../cc/gamut/node_modules/@babel/runtime/helpers/wrapNativeSuper.js"(exports, module) {
    var getPrototypeOf = require_getPrototypeOf();
    var setPrototypeOf = require_setPrototypeOf();
    var isNativeFunction = require_isNativeFunction();
    var construct = require_construct();
    function _wrapNativeSuper(t) {
      var r = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
      return module.exports = _wrapNativeSuper = function _wrapNativeSuper2(t2) {
        if (null === t2 || !isNativeFunction(t2)) return t2;
        if ("function" != typeof t2) throw new TypeError("Super expression must either be null or a function");
        if (void 0 !== r) {
          if (r.has(t2)) return r.get(t2);
          r.set(t2, Wrapper);
        }
        function Wrapper() {
          return construct(t2, arguments, getPrototypeOf(this).constructor);
        }
        return Wrapper.prototype = Object.create(t2.prototype, {
          constructor: {
            value: Wrapper,
            enumerable: false,
            writable: true,
            configurable: true
          }
        }), setPrototypeOf(Wrapper, t2);
      }, module.exports.__esModule = true, module.exports["default"] = module.exports, _wrapNativeSuper(t);
    }
    module.exports = _wrapNativeSuper, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// ../../../cc/gamut/node_modules/@babel/runtime/helpers/taggedTemplateLiteralLoose.js
var require_taggedTemplateLiteralLoose = __commonJS({
  "../../../cc/gamut/node_modules/@babel/runtime/helpers/taggedTemplateLiteralLoose.js"(exports, module) {
    function _taggedTemplateLiteralLoose(e, t) {
      return t || (t = e.slice(0)), e.raw = t, e;
    }
    module.exports = _taggedTemplateLiteralLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// ../../../cc/gamut/node_modules/polished/dist/polished.cjs.js
var require_polished_cjs = __commonJS({
  "../../../cc/gamut/node_modules/polished/dist/polished.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _extends = require_extends();
    var _assertThisInitialized = require_assertThisInitialized();
    var _inheritsLoose = require_inheritsLoose();
    var _wrapNativeSuper = require_wrapNativeSuper();
    var _taggedTemplateLiteralLoose = require_taggedTemplateLiteralLoose();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    var _extends__default = /* @__PURE__ */ _interopDefaultLegacy(_extends);
    var _assertThisInitialized__default = /* @__PURE__ */ _interopDefaultLegacy(_assertThisInitialized);
    var _inheritsLoose__default = /* @__PURE__ */ _interopDefaultLegacy(_inheritsLoose);
    var _wrapNativeSuper__default = /* @__PURE__ */ _interopDefaultLegacy(_wrapNativeSuper);
    var _taggedTemplateLiteralLoose__default = /* @__PURE__ */ _interopDefaultLegacy(_taggedTemplateLiteralLoose);
    function last() {
      var _ref;
      return _ref = arguments.length - 1, _ref < 0 || arguments.length <= _ref ? void 0 : arguments[_ref];
    }
    function negation(a) {
      return -a;
    }
    function addition(a, b) {
      return a + b;
    }
    function subtraction(a, b) {
      return a - b;
    }
    function multiplication(a, b) {
      return a * b;
    }
    function division(a, b) {
      return a / b;
    }
    function max() {
      return Math.max.apply(Math, arguments);
    }
    function min() {
      return Math.min.apply(Math, arguments);
    }
    function comma() {
      return Array.of.apply(Array, arguments);
    }
    var defaultSymbols = {
      symbols: {
        "*": {
          infix: {
            symbol: "*",
            f: multiplication,
            notation: "infix",
            precedence: 4,
            rightToLeft: 0,
            argCount: 2
          },
          symbol: "*",
          regSymbol: "\\*"
        },
        "/": {
          infix: {
            symbol: "/",
            f: division,
            notation: "infix",
            precedence: 4,
            rightToLeft: 0,
            argCount: 2
          },
          symbol: "/",
          regSymbol: "/"
        },
        "+": {
          infix: {
            symbol: "+",
            f: addition,
            notation: "infix",
            precedence: 2,
            rightToLeft: 0,
            argCount: 2
          },
          prefix: {
            symbol: "+",
            f: last,
            notation: "prefix",
            precedence: 3,
            rightToLeft: 0,
            argCount: 1
          },
          symbol: "+",
          regSymbol: "\\+"
        },
        "-": {
          infix: {
            symbol: "-",
            f: subtraction,
            notation: "infix",
            precedence: 2,
            rightToLeft: 0,
            argCount: 2
          },
          prefix: {
            symbol: "-",
            f: negation,
            notation: "prefix",
            precedence: 3,
            rightToLeft: 0,
            argCount: 1
          },
          symbol: "-",
          regSymbol: "-"
        },
        ",": {
          infix: {
            symbol: ",",
            f: comma,
            notation: "infix",
            precedence: 1,
            rightToLeft: 0,
            argCount: 2
          },
          symbol: ",",
          regSymbol: ","
        },
        "(": {
          prefix: {
            symbol: "(",
            f: last,
            notation: "prefix",
            precedence: 0,
            rightToLeft: 0,
            argCount: 1
          },
          symbol: "(",
          regSymbol: "\\("
        },
        ")": {
          postfix: {
            symbol: ")",
            f: void 0,
            notation: "postfix",
            precedence: 0,
            rightToLeft: 0,
            argCount: 1
          },
          symbol: ")",
          regSymbol: "\\)"
        },
        min: {
          func: {
            symbol: "min",
            f: min,
            notation: "func",
            precedence: 0,
            rightToLeft: 0,
            argCount: 1
          },
          symbol: "min",
          regSymbol: "min\\b"
        },
        max: {
          func: {
            symbol: "max",
            f: max,
            notation: "func",
            precedence: 0,
            rightToLeft: 0,
            argCount: 1
          },
          symbol: "max",
          regSymbol: "max\\b"
        }
      }
    };
    var defaultSymbolMap = defaultSymbols;
    var ERRORS = {
      "1": "Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).\n\n",
      "2": "Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).\n\n",
      "3": "Passed an incorrect argument to a color function, please pass a string representation of a color.\n\n",
      "4": "Couldn't generate valid rgb string from %s, it returned %s.\n\n",
      "5": "Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.\n\n",
      "6": "Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).\n\n",
      "7": "Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).\n\n",
      "8": "Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.\n\n",
      "9": "Please provide a number of steps to the modularScale helper.\n\n",
      "10": "Please pass a number or one of the predefined scales to the modularScale helper as the ratio.\n\n",
      "11": 'Invalid value passed as base to modularScale, expected number or em string but got "%s"\n\n',
      "12": 'Expected a string ending in "px" or a number passed as the first argument to %s(), got "%s" instead.\n\n',
      "13": 'Expected a string ending in "px" or a number passed as the second argument to %s(), got "%s" instead.\n\n',
      "14": 'Passed invalid pixel value ("%s") to %s(), please pass a value like "12px" or 12.\n\n',
      "15": 'Passed invalid base value ("%s") to %s(), please pass a value like "12px" or 12.\n\n',
      "16": "You must provide a template to this method.\n\n",
      "17": "You passed an unsupported selector state to this method.\n\n",
      "18": "minScreen and maxScreen must be provided as stringified numbers with the same units.\n\n",
      "19": "fromSize and toSize must be provided as stringified numbers with the same units.\n\n",
      "20": "expects either an array of objects or a single object with the properties prop, fromSize, and toSize.\n\n",
      "21": "expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
      "22": "expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
      "23": "fontFace expects a name of a font-family.\n\n",
      "24": "fontFace expects either the path to the font file(s) or a name of a local copy.\n\n",
      "25": "fontFace expects localFonts to be an array.\n\n",
      "26": "fontFace expects fileFormats to be an array.\n\n",
      "27": "radialGradient requries at least 2 color-stops to properly render.\n\n",
      "28": "Please supply a filename to retinaImage() as the first argument.\n\n",
      "29": "Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.\n\n",
      "30": "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
      "31": "The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation\n\n",
      "32": "To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')\n\n",
      "33": "The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation\n\n",
      "34": "borderRadius expects a radius value as a string or number as the second argument.\n\n",
      "35": 'borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.\n\n',
      "36": "Property must be a string value.\n\n",
      "37": "Syntax Error at %s.\n\n",
      "38": "Formula contains a function that needs parentheses at %s.\n\n",
      "39": "Formula is missing closing parenthesis at %s.\n\n",
      "40": "Formula has too many closing parentheses at %s.\n\n",
      "41": "All values in a formula must have the same unit or be unitless.\n\n",
      "42": "Please provide a number of steps to the modularScale helper.\n\n",
      "43": "Please pass a number or one of the predefined scales to the modularScale helper as the ratio.\n\n",
      "44": "Invalid value passed as base to modularScale, expected number or em/rem string but got %s.\n\n",
      "45": "Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.\n\n",
      "46": "Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.\n\n",
      "47": "minScreen and maxScreen must be provided as stringified numbers with the same units.\n\n",
      "48": "fromSize and toSize must be provided as stringified numbers with the same units.\n\n",
      "49": "Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.\n\n",
      "50": "Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.\n\n",
      "51": "Expects the first argument object to have the properties prop, fromSize, and toSize.\n\n",
      "52": "fontFace expects either the path to the font file(s) or a name of a local copy.\n\n",
      "53": "fontFace expects localFonts to be an array.\n\n",
      "54": "fontFace expects fileFormats to be an array.\n\n",
      "55": "fontFace expects a name of a font-family.\n\n",
      "56": "linearGradient requries at least 2 color-stops to properly render.\n\n",
      "57": "radialGradient requries at least 2 color-stops to properly render.\n\n",
      "58": "Please supply a filename to retinaImage() as the first argument.\n\n",
      "59": "Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.\n\n",
      "60": "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
      "61": "Property must be a string value.\n\n",
      "62": "borderRadius expects a radius value as a string or number as the second argument.\n\n",
      "63": 'borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.\n\n',
      "64": "The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.\n\n",
      "65": "To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').\n\n",
      "66": "The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.\n\n",
      "67": "You must provide a template to this method.\n\n",
      "68": "You passed an unsupported selector state to this method.\n\n",
      "69": 'Expected a string ending in "px" or a number passed as the first argument to %s(), got %s instead.\n\n',
      "70": 'Expected a string ending in "px" or a number passed as the second argument to %s(), got %s instead.\n\n',
      "71": 'Passed invalid pixel value %s to %s(), please pass a value like "12px" or 12.\n\n',
      "72": 'Passed invalid base value %s to %s(), please pass a value like "12px" or 12.\n\n',
      "73": "Please provide a valid CSS variable.\n\n",
      "74": "CSS variable not found and no default was provided.\n\n",
      "75": "important requires a valid style object, got a %s instead.\n\n",
      "76": "fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.\n\n",
      "77": 'remToPx expects a value in "rem" but you provided it in "%s".\n\n',
      "78": 'base must be set in "px" or "%" but you set it in "%s".\n'
    };
    function format() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var a = args[0];
      var b = [];
      var c;
      for (c = 1; c < args.length; c += 1) {
        b.push(args[c]);
      }
      b.forEach(function(d) {
        a = a.replace(/%[a-z]/, d);
      });
      return a;
    }
    var PolishedError = /* @__PURE__ */ (function(_Error) {
      _inheritsLoose__default["default"](PolishedError2, _Error);
      function PolishedError2(code) {
        var _this;
        if (process.env.NODE_ENV === "production") {
          _this = _Error.call(this, "An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#" + code + " for more information.") || this;
        } else {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          _this = _Error.call(this, format.apply(void 0, [ERRORS[code]].concat(args))) || this;
        }
        return _assertThisInitialized__default["default"](_this);
      }
      return PolishedError2;
    })(/* @__PURE__ */ _wrapNativeSuper__default["default"](Error));
    var unitRegExp = /((?!\w)a|na|hc|mc|dg|me[r]?|xe|ni(?![a-zA-Z])|mm|cp|tp|xp|q(?!s)|hv|xamv|nimv|wv|sm|s(?!\D|$)|ged|darg?|nrut)/g;
    function mergeSymbolMaps(additionalSymbols) {
      var symbolMap = {};
      symbolMap.symbols = additionalSymbols ? _extends__default["default"]({}, defaultSymbolMap.symbols, additionalSymbols.symbols) : _extends__default["default"]({}, defaultSymbolMap.symbols);
      return symbolMap;
    }
    function exec(operators, values) {
      var _ref;
      var op = operators.pop();
      values.push(op.f.apply(op, (_ref = []).concat.apply(_ref, values.splice(-op.argCount))));
      return op.precedence;
    }
    function calculate(expression, additionalSymbols) {
      var symbolMap = mergeSymbolMaps(additionalSymbols);
      var match;
      var operators = [symbolMap.symbols["("].prefix];
      var values = [];
      var pattern = new RegExp(
        // Pattern for numbers
        "\\d+(?:\\.\\d+)?|" + // ...and patterns for individual operators/function names
        Object.keys(symbolMap.symbols).map(function(key) {
          return symbolMap.symbols[key];
        }).sort(function(a, b) {
          return b.symbol.length - a.symbol.length;
        }).map(function(val) {
          return val.regSymbol;
        }).join("|") + "|(\\S)",
        "g"
      );
      pattern.lastIndex = 0;
      var afterValue = false;
      do {
        match = pattern.exec(expression);
        var _ref2 = match || [")", void 0], token = _ref2[0], bad = _ref2[1];
        var notNumber = symbolMap.symbols[token];
        var notNewValue = notNumber && !notNumber.prefix && !notNumber.func;
        var notAfterValue = !notNumber || !notNumber.postfix && !notNumber.infix;
        if (bad || (afterValue ? notAfterValue : notNewValue)) {
          throw new PolishedError(37, match ? match.index : expression.length, expression);
        }
        if (afterValue) {
          var curr = notNumber.postfix || notNumber.infix;
          do {
            var prev = operators[operators.length - 1];
            if ((curr.precedence - prev.precedence || prev.rightToLeft) > 0) break;
          } while (exec(operators, values));
          afterValue = curr.notation === "postfix";
          if (curr.symbol !== ")") {
            operators.push(curr);
            if (afterValue) exec(operators, values);
          }
        } else if (notNumber) {
          operators.push(notNumber.prefix || notNumber.func);
          if (notNumber.func) {
            match = pattern.exec(expression);
            if (!match || match[0] !== "(") {
              throw new PolishedError(38, match ? match.index : expression.length, expression);
            }
          }
        } else {
          values.push(+token);
          afterValue = true;
        }
      } while (match && operators.length);
      if (operators.length) {
        throw new PolishedError(39, match ? match.index : expression.length, expression);
      } else if (match) {
        throw new PolishedError(40, match ? match.index : expression.length, expression);
      } else {
        return values.pop();
      }
    }
    function reverseString(str) {
      return str.split("").reverse().join("");
    }
    function math(formula, additionalSymbols) {
      var reversedFormula = reverseString(formula);
      var formulaMatch = reversedFormula.match(unitRegExp);
      if (formulaMatch && !formulaMatch.every(function(unit) {
        return unit === formulaMatch[0];
      })) {
        throw new PolishedError(41);
      }
      var cleanFormula = reverseString(reversedFormula.replace(unitRegExp, ""));
      return "" + calculate(cleanFormula, additionalSymbols) + (formulaMatch ? reverseString(formulaMatch[0]) : "");
    }
    var cssVariableRegex = /--[\S]*/g;
    function cssVar(cssVariable, defaultValue) {
      if (!cssVariable || !cssVariable.match(cssVariableRegex)) {
        throw new PolishedError(73);
      }
      var variableValue;
      if (typeof document !== "undefined" && document.documentElement !== null) {
        variableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariable);
      }
      if (variableValue) {
        return variableValue.trim();
      } else if (defaultValue) {
        return defaultValue;
      }
      throw new PolishedError(74);
    }
    function capitalizeString(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    var positionMap$1 = ["Top", "Right", "Bottom", "Left"];
    function generateProperty(property, position2) {
      if (!property) return position2.toLowerCase();
      var splitProperty = property.split("-");
      if (splitProperty.length > 1) {
        splitProperty.splice(1, 0, position2);
        return splitProperty.reduce(function(acc, val) {
          return "" + acc + capitalizeString(val);
        });
      }
      var joinedProperty = property.replace(/([a-z])([A-Z])/g, "$1" + position2 + "$2");
      return property === joinedProperty ? "" + property + position2 : joinedProperty;
    }
    function generateStyles(property, valuesWithDefaults) {
      var styles = {};
      for (var i = 0; i < valuesWithDefaults.length; i += 1) {
        if (valuesWithDefaults[i] || valuesWithDefaults[i] === 0) {
          styles[generateProperty(property, positionMap$1[i])] = valuesWithDefaults[i];
        }
      }
      return styles;
    }
    function directionalProperty(property) {
      for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
      }
      var firstValue = values[0], _values$ = values[1], secondValue = _values$ === void 0 ? firstValue : _values$, _values$2 = values[2], thirdValue = _values$2 === void 0 ? firstValue : _values$2, _values$3 = values[3], fourthValue = _values$3 === void 0 ? secondValue : _values$3;
      var valuesWithDefaults = [firstValue, secondValue, thirdValue, fourthValue];
      return generateStyles(property, valuesWithDefaults);
    }
    function endsWith(string, suffix) {
      return string.substr(-suffix.length) === suffix;
    }
    var cssRegex$1 = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
    function stripUnit(value) {
      if (typeof value !== "string") return value;
      var matchedValue = value.match(cssRegex$1);
      return matchedValue ? parseFloat(value) : value;
    }
    var pxtoFactory = function pxtoFactory2(to) {
      return function(pxval, base) {
        if (base === void 0) {
          base = "16px";
        }
        var newPxval = pxval;
        var newBase = base;
        if (typeof pxval === "string") {
          if (!endsWith(pxval, "px")) {
            throw new PolishedError(69, to, pxval);
          }
          newPxval = stripUnit(pxval);
        }
        if (typeof base === "string") {
          if (!endsWith(base, "px")) {
            throw new PolishedError(70, to, base);
          }
          newBase = stripUnit(base);
        }
        if (typeof newPxval === "string") {
          throw new PolishedError(71, pxval, to);
        }
        if (typeof newBase === "string") {
          throw new PolishedError(72, base, to);
        }
        return "" + newPxval / newBase + to;
      };
    };
    var pixelsto = pxtoFactory;
    var em = pixelsto("em");
    var em$1 = em;
    var cssRegex = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
    function getValueAndUnit(value) {
      if (typeof value !== "string") return [value, ""];
      var matchedValue = value.match(cssRegex);
      if (matchedValue) return [parseFloat(value), matchedValue[2]];
      return [value, void 0];
    }
    function important(styleBlock, rules) {
      if (typeof styleBlock !== "object" || styleBlock === null) {
        throw new PolishedError(75, typeof styleBlock);
      }
      var newStyleBlock = {};
      Object.keys(styleBlock).forEach(function(key) {
        if (typeof styleBlock[key] === "object" && styleBlock[key] !== null) {
          newStyleBlock[key] = important(styleBlock[key], rules);
        } else if (!rules || rules && (rules === key || rules.indexOf(key) >= 0)) {
          newStyleBlock[key] = styleBlock[key] + " !important";
        } else {
          newStyleBlock[key] = styleBlock[key];
        }
      });
      return newStyleBlock;
    }
    var ratioNames = {
      minorSecond: 1.067,
      majorSecond: 1.125,
      minorThird: 1.2,
      majorThird: 1.25,
      perfectFourth: 1.333,
      augFourth: 1.414,
      perfectFifth: 1.5,
      minorSixth: 1.6,
      goldenSection: 1.618,
      majorSixth: 1.667,
      minorSeventh: 1.778,
      majorSeventh: 1.875,
      octave: 2,
      majorTenth: 2.5,
      majorEleventh: 2.667,
      majorTwelfth: 3,
      doubleOctave: 4
    };
    function getRatio(ratioName) {
      return ratioNames[ratioName];
    }
    function modularScale(steps, base, ratio) {
      if (base === void 0) {
        base = "1em";
      }
      if (ratio === void 0) {
        ratio = 1.333;
      }
      if (typeof steps !== "number") {
        throw new PolishedError(42);
      }
      if (typeof ratio === "string" && !ratioNames[ratio]) {
        throw new PolishedError(43);
      }
      var _ref = typeof base === "string" ? getValueAndUnit(base) : [base, ""], realBase = _ref[0], unit = _ref[1];
      var realRatio = typeof ratio === "string" ? getRatio(ratio) : ratio;
      if (typeof realBase === "string") {
        throw new PolishedError(44, base);
      }
      return "" + realBase * Math.pow(realRatio, steps) + (unit || "");
    }
    var rem = pixelsto("rem");
    var rem$1 = rem;
    var defaultFontSize = 16;
    function convertBase(base) {
      var deconstructedValue = getValueAndUnit(base);
      if (deconstructedValue[1] === "px") {
        return parseFloat(base);
      }
      if (deconstructedValue[1] === "%") {
        return parseFloat(base) / 100 * defaultFontSize;
      }
      throw new PolishedError(78, deconstructedValue[1]);
    }
    function getBaseFromDoc() {
      if (typeof document !== "undefined" && document.documentElement !== null) {
        var rootFontSize = getComputedStyle(document.documentElement).fontSize;
        return rootFontSize ? convertBase(rootFontSize) : defaultFontSize;
      }
      return defaultFontSize;
    }
    function remToPx(value, base) {
      var deconstructedValue = getValueAndUnit(value);
      if (deconstructedValue[1] !== "rem" && deconstructedValue[1] !== "") {
        throw new PolishedError(77, deconstructedValue[1]);
      }
      var newBase = base ? convertBase(base) : getBaseFromDoc();
      return deconstructedValue[0] * newBase + "px";
    }
    var functionsMap$3 = {
      back: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
      circ: "cubic-bezier(0.600,  0.040, 0.980, 0.335)",
      cubic: "cubic-bezier(0.550,  0.055, 0.675, 0.190)",
      expo: "cubic-bezier(0.950,  0.050, 0.795, 0.035)",
      quad: "cubic-bezier(0.550,  0.085, 0.680, 0.530)",
      quart: "cubic-bezier(0.895,  0.030, 0.685, 0.220)",
      quint: "cubic-bezier(0.755,  0.050, 0.855, 0.060)",
      sine: "cubic-bezier(0.470,  0.000, 0.745, 0.715)"
    };
    function easeIn(functionName) {
      return functionsMap$3[functionName.toLowerCase().trim()];
    }
    var functionsMap$2 = {
      back: "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
      circ: "cubic-bezier(0.785,  0.135, 0.150, 0.860)",
      cubic: "cubic-bezier(0.645,  0.045, 0.355, 1.000)",
      expo: "cubic-bezier(1.000,  0.000, 0.000, 1.000)",
      quad: "cubic-bezier(0.455,  0.030, 0.515, 0.955)",
      quart: "cubic-bezier(0.770,  0.000, 0.175, 1.000)",
      quint: "cubic-bezier(0.860,  0.000, 0.070, 1.000)",
      sine: "cubic-bezier(0.445,  0.050, 0.550, 0.950)"
    };
    function easeInOut(functionName) {
      return functionsMap$2[functionName.toLowerCase().trim()];
    }
    var functionsMap$1 = {
      back: "cubic-bezier(0.175,  0.885, 0.320, 1.275)",
      cubic: "cubic-bezier(0.215,  0.610, 0.355, 1.000)",
      circ: "cubic-bezier(0.075,  0.820, 0.165, 1.000)",
      expo: "cubic-bezier(0.190,  1.000, 0.220, 1.000)",
      quad: "cubic-bezier(0.250,  0.460, 0.450, 0.940)",
      quart: "cubic-bezier(0.165,  0.840, 0.440, 1.000)",
      quint: "cubic-bezier(0.230,  1.000, 0.320, 1.000)",
      sine: "cubic-bezier(0.390,  0.575, 0.565, 1.000)"
    };
    function easeOut(functionName) {
      return functionsMap$1[functionName.toLowerCase().trim()];
    }
    function between(fromSize, toSize, minScreen, maxScreen) {
      if (minScreen === void 0) {
        minScreen = "320px";
      }
      if (maxScreen === void 0) {
        maxScreen = "1200px";
      }
      var _getValueAndUnit = getValueAndUnit(fromSize), unitlessFromSize = _getValueAndUnit[0], fromSizeUnit = _getValueAndUnit[1];
      var _getValueAndUnit2 = getValueAndUnit(toSize), unitlessToSize = _getValueAndUnit2[0], toSizeUnit = _getValueAndUnit2[1];
      var _getValueAndUnit3 = getValueAndUnit(minScreen), unitlessMinScreen = _getValueAndUnit3[0], minScreenUnit = _getValueAndUnit3[1];
      var _getValueAndUnit4 = getValueAndUnit(maxScreen), unitlessMaxScreen = _getValueAndUnit4[0], maxScreenUnit = _getValueAndUnit4[1];
      if (typeof unitlessMinScreen !== "number" || typeof unitlessMaxScreen !== "number" || !minScreenUnit || !maxScreenUnit || minScreenUnit !== maxScreenUnit) {
        throw new PolishedError(47);
      }
      if (typeof unitlessFromSize !== "number" || typeof unitlessToSize !== "number" || fromSizeUnit !== toSizeUnit) {
        throw new PolishedError(48);
      }
      if (fromSizeUnit !== minScreenUnit || toSizeUnit !== maxScreenUnit) {
        throw new PolishedError(76);
      }
      var slope = (unitlessFromSize - unitlessToSize) / (unitlessMinScreen - unitlessMaxScreen);
      var base = unitlessToSize - slope * unitlessMaxScreen;
      return "calc(" + base.toFixed(2) + (fromSizeUnit || "") + " + " + (100 * slope).toFixed(2) + "vw)";
    }
    function clearFix(parent) {
      var _ref;
      if (parent === void 0) {
        parent = "&";
      }
      var pseudoSelector = parent + "::after";
      return _ref = {}, _ref[pseudoSelector] = {
        clear: "both",
        content: '""',
        display: "table"
      }, _ref;
    }
    function cover(offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return {
        position: "absolute",
        top: offset,
        right: offset,
        bottom: offset,
        left: offset
      };
    }
    function ellipsis(width, lines) {
      if (lines === void 0) {
        lines = 1;
      }
      var styles = {
        display: "inline-block",
        maxWidth: width || "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        wordWrap: "normal"
      };
      return lines > 1 ? _extends__default["default"]({}, styles, {
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: lines,
        display: "-webkit-box",
        whiteSpace: "normal"
      }) : styles;
    }
    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (it) return (it = it.call(o)).next.bind(it);
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        return function() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function fluidRange(cssProp, minScreen, maxScreen) {
      if (minScreen === void 0) {
        minScreen = "320px";
      }
      if (maxScreen === void 0) {
        maxScreen = "1200px";
      }
      if (!Array.isArray(cssProp) && typeof cssProp !== "object" || cssProp === null) {
        throw new PolishedError(49);
      }
      if (Array.isArray(cssProp)) {
        var mediaQueries2 = {};
        var fallbacks = {};
        for (var _iterator = _createForOfIteratorHelperLoose(cssProp), _step; !(_step = _iterator()).done; ) {
          var _extends2, _extends3;
          var obj = _step.value;
          if (!obj.prop || !obj.fromSize || !obj.toSize) {
            throw new PolishedError(50);
          }
          fallbacks[obj.prop] = obj.fromSize;
          mediaQueries2["@media (min-width: " + minScreen + ")"] = _extends__default["default"]({}, mediaQueries2["@media (min-width: " + minScreen + ")"], (_extends2 = {}, _extends2[obj.prop] = between(obj.fromSize, obj.toSize, minScreen, maxScreen), _extends2));
          mediaQueries2["@media (min-width: " + maxScreen + ")"] = _extends__default["default"]({}, mediaQueries2["@media (min-width: " + maxScreen + ")"], (_extends3 = {}, _extends3[obj.prop] = obj.toSize, _extends3));
        }
        return _extends__default["default"]({}, fallbacks, mediaQueries2);
      } else {
        var _ref, _ref2, _ref3;
        if (!cssProp.prop || !cssProp.fromSize || !cssProp.toSize) {
          throw new PolishedError(51);
        }
        return _ref3 = {}, _ref3[cssProp.prop] = cssProp.fromSize, _ref3["@media (min-width: " + minScreen + ")"] = (_ref = {}, _ref[cssProp.prop] = between(cssProp.fromSize, cssProp.toSize, minScreen, maxScreen), _ref), _ref3["@media (min-width: " + maxScreen + ")"] = (_ref2 = {}, _ref2[cssProp.prop] = cssProp.toSize, _ref2), _ref3;
      }
    }
    var dataURIRegex = /^\s*data:([a-z]+\/[a-z-]+(;[a-z-]+=[a-z-]+)?)?(;charset=[a-z0-9-]+)?(;base64)?,[a-z0-9!$&',()*+,;=\-._~:@/?%\s]*\s*$/i;
    var formatHintMap = {
      woff: "woff",
      woff2: "woff2",
      ttf: "truetype",
      otf: "opentype",
      eot: "embedded-opentype",
      svg: "svg",
      svgz: "svg"
    };
    function generateFormatHint(format2, formatHint) {
      if (!formatHint) return "";
      return ' format("' + formatHintMap[format2] + '")';
    }
    function isDataURI(fontFilePath) {
      return !!fontFilePath.replace(/\s+/g, " ").match(dataURIRegex);
    }
    function generateFileReferences(fontFilePath, fileFormats, formatHint) {
      if (isDataURI(fontFilePath)) {
        return 'url("' + fontFilePath + '")' + generateFormatHint(fileFormats[0], formatHint);
      }
      var fileFontReferences = fileFormats.map(function(format2) {
        return 'url("' + fontFilePath + "." + format2 + '")' + generateFormatHint(format2, formatHint);
      });
      return fileFontReferences.join(", ");
    }
    function generateLocalReferences(localFonts) {
      var localFontReferences = localFonts.map(function(font) {
        return 'local("' + font + '")';
      });
      return localFontReferences.join(", ");
    }
    function generateSources(fontFilePath, localFonts, fileFormats, formatHint) {
      var fontReferences = [];
      if (localFonts) fontReferences.push(generateLocalReferences(localFonts));
      if (fontFilePath) {
        fontReferences.push(generateFileReferences(fontFilePath, fileFormats, formatHint));
      }
      return fontReferences.join(", ");
    }
    function fontFace(_ref) {
      var fontFamily2 = _ref.fontFamily, fontFilePath = _ref.fontFilePath, fontStretch = _ref.fontStretch, fontStyle = _ref.fontStyle, fontVariant = _ref.fontVariant, fontWeight2 = _ref.fontWeight, _ref$fileFormats = _ref.fileFormats, fileFormats = _ref$fileFormats === void 0 ? ["eot", "woff2", "woff", "ttf", "svg"] : _ref$fileFormats, _ref$formatHint = _ref.formatHint, formatHint = _ref$formatHint === void 0 ? false : _ref$formatHint, _ref$localFonts = _ref.localFonts, localFonts = _ref$localFonts === void 0 ? [fontFamily2] : _ref$localFonts, unicodeRange = _ref.unicodeRange, fontDisplay = _ref.fontDisplay, fontVariationSettings = _ref.fontVariationSettings, fontFeatureSettings = _ref.fontFeatureSettings;
      if (!fontFamily2) throw new PolishedError(55);
      if (!fontFilePath && !localFonts) {
        throw new PolishedError(52);
      }
      if (localFonts && !Array.isArray(localFonts)) {
        throw new PolishedError(53);
      }
      if (!Array.isArray(fileFormats)) {
        throw new PolishedError(54);
      }
      var fontFaceDeclaration = {
        "@font-face": {
          fontFamily: fontFamily2,
          src: generateSources(fontFilePath, localFonts, fileFormats, formatHint),
          unicodeRange,
          fontStretch,
          fontStyle,
          fontVariant,
          fontWeight: fontWeight2,
          fontDisplay,
          fontVariationSettings,
          fontFeatureSettings
        }
      };
      return JSON.parse(JSON.stringify(fontFaceDeclaration));
    }
    function hideText() {
      return {
        textIndent: "101%",
        overflow: "hidden",
        whiteSpace: "nowrap"
      };
    }
    function hideVisually() {
      return {
        border: "0",
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: "0",
        position: "absolute",
        whiteSpace: "nowrap",
        width: "1px"
      };
    }
    function hiDPI(ratio) {
      if (ratio === void 0) {
        ratio = 1.3;
      }
      return "\n    @media only screen and (-webkit-min-device-pixel-ratio: " + ratio + "),\n    only screen and (min--moz-device-pixel-ratio: " + ratio + "),\n    only screen and (-o-min-device-pixel-ratio: " + ratio + "/1),\n    only screen and (min-resolution: " + Math.round(ratio * 96) + "dpi),\n    only screen and (min-resolution: " + ratio + "dppx)\n  ";
    }
    function constructGradientValue(literals) {
      var template2 = "";
      for (var _len = arguments.length, substitutions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        substitutions[_key - 1] = arguments[_key];
      }
      for (var i = 0; i < literals.length; i += 1) {
        template2 += literals[i];
        if (i === substitutions.length - 1 && substitutions[i]) {
          var definedValues = substitutions.filter(function(substitute) {
            return !!substitute;
          });
          if (definedValues.length > 1) {
            template2 = template2.slice(0, -1);
            template2 += ", " + substitutions[i];
          } else if (definedValues.length === 1) {
            template2 += "" + substitutions[i];
          }
        } else if (substitutions[i]) {
          template2 += substitutions[i] + " ";
        }
      }
      return template2.trim();
    }
    var _templateObject$1;
    function linearGradient(_ref) {
      var colorStops = _ref.colorStops, fallback = _ref.fallback, _ref$toDirection = _ref.toDirection, toDirection = _ref$toDirection === void 0 ? "" : _ref$toDirection;
      if (!colorStops || colorStops.length < 2) {
        throw new PolishedError(56);
      }
      return {
        backgroundColor: fallback || colorStops[0].replace(/,\s+/g, ",").split(" ")[0].replace(/,(?=\S)/g, ", "),
        backgroundImage: constructGradientValue(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteralLoose__default["default"](["linear-gradient(", "", ")"])), toDirection, colorStops.join(", ").replace(/,(?=\S)/g, ", "))
      };
    }
    function normalize() {
      var _ref;
      return [(_ref = {
        html: {
          lineHeight: "1.15",
          textSizeAdjust: "100%"
        },
        body: {
          margin: "0"
        },
        main: {
          display: "block"
        },
        h1: {
          fontSize: "2em",
          margin: "0.67em 0"
        },
        hr: {
          boxSizing: "content-box",
          height: "0",
          overflow: "visible"
        },
        pre: {
          fontFamily: "monospace, monospace",
          fontSize: "1em"
        },
        a: {
          backgroundColor: "transparent"
        },
        "abbr[title]": {
          borderBottom: "none",
          textDecoration: "underline"
        }
      }, _ref["b,\n    strong"] = {
        fontWeight: "bolder"
      }, _ref["code,\n    kbd,\n    samp"] = {
        fontFamily: "monospace, monospace",
        fontSize: "1em"
      }, _ref.small = {
        fontSize: "80%"
      }, _ref["sub,\n    sup"] = {
        fontSize: "75%",
        lineHeight: "0",
        position: "relative",
        verticalAlign: "baseline"
      }, _ref.sub = {
        bottom: "-0.25em"
      }, _ref.sup = {
        top: "-0.5em"
      }, _ref.img = {
        borderStyle: "none"
      }, _ref["button,\n    input,\n    optgroup,\n    select,\n    textarea"] = {
        fontFamily: "inherit",
        fontSize: "100%",
        lineHeight: "1.15",
        margin: "0"
      }, _ref["button,\n    input"] = {
        overflow: "visible"
      }, _ref["button,\n    select"] = {
        textTransform: "none"
      }, _ref['button,\n    html [type="button"],\n    [type="reset"],\n    [type="submit"]'] = {
        WebkitAppearance: "button"
      }, _ref['button::-moz-focus-inner,\n    [type="button"]::-moz-focus-inner,\n    [type="reset"]::-moz-focus-inner,\n    [type="submit"]::-moz-focus-inner'] = {
        borderStyle: "none",
        padding: "0"
      }, _ref['button:-moz-focusring,\n    [type="button"]:-moz-focusring,\n    [type="reset"]:-moz-focusring,\n    [type="submit"]:-moz-focusring'] = {
        outline: "1px dotted ButtonText"
      }, _ref.fieldset = {
        padding: "0.35em 0.625em 0.75em"
      }, _ref.legend = {
        boxSizing: "border-box",
        color: "inherit",
        display: "table",
        maxWidth: "100%",
        padding: "0",
        whiteSpace: "normal"
      }, _ref.progress = {
        verticalAlign: "baseline"
      }, _ref.textarea = {
        overflow: "auto"
      }, _ref['[type="checkbox"],\n    [type="radio"]'] = {
        boxSizing: "border-box",
        padding: "0"
      }, _ref['[type="number"]::-webkit-inner-spin-button,\n    [type="number"]::-webkit-outer-spin-button'] = {
        height: "auto"
      }, _ref['[type="search"]'] = {
        WebkitAppearance: "textfield",
        outlineOffset: "-2px"
      }, _ref['[type="search"]::-webkit-search-decoration'] = {
        WebkitAppearance: "none"
      }, _ref["::-webkit-file-upload-button"] = {
        WebkitAppearance: "button",
        font: "inherit"
      }, _ref.details = {
        display: "block"
      }, _ref.summary = {
        display: "list-item"
      }, _ref.template = {
        display: "none"
      }, _ref["[hidden]"] = {
        display: "none"
      }, _ref), {
        "abbr[title]": {
          textDecoration: "underline dotted"
        }
      }];
    }
    var _templateObject;
    function radialGradient(_ref) {
      var colorStops = _ref.colorStops, _ref$extent = _ref.extent, extent = _ref$extent === void 0 ? "" : _ref$extent, fallback = _ref.fallback, _ref$position = _ref.position, position2 = _ref$position === void 0 ? "" : _ref$position, _ref$shape = _ref.shape, shape = _ref$shape === void 0 ? "" : _ref$shape;
      if (!colorStops || colorStops.length < 2) {
        throw new PolishedError(57);
      }
      return {
        backgroundColor: fallback || colorStops[0].split(" ")[0],
        backgroundImage: constructGradientValue(_templateObject || (_templateObject = _taggedTemplateLiteralLoose__default["default"](["radial-gradient(", "", "", "", ")"])), position2, shape, extent, colorStops.join(", "))
      };
    }
    function retinaImage(filename, backgroundSize, extension, retinaFilename, retinaSuffix) {
      var _ref;
      if (extension === void 0) {
        extension = "png";
      }
      if (retinaSuffix === void 0) {
        retinaSuffix = "_2x";
      }
      if (!filename) {
        throw new PolishedError(58);
      }
      var ext = extension.replace(/^\./, "");
      var rFilename = retinaFilename ? retinaFilename + "." + ext : "" + filename + retinaSuffix + "." + ext;
      return _ref = {
        backgroundImage: "url(" + filename + "." + ext + ")"
      }, _ref[hiDPI()] = _extends__default["default"]({
        backgroundImage: "url(" + rFilename + ")"
      }, backgroundSize ? {
        backgroundSize
      } : {}), _ref;
    }
    var functionsMap = {
      easeInBack: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
      easeInCirc: "cubic-bezier(0.600,  0.040, 0.980, 0.335)",
      easeInCubic: "cubic-bezier(0.550,  0.055, 0.675, 0.190)",
      easeInExpo: "cubic-bezier(0.950,  0.050, 0.795, 0.035)",
      easeInQuad: "cubic-bezier(0.550,  0.085, 0.680, 0.530)",
      easeInQuart: "cubic-bezier(0.895,  0.030, 0.685, 0.220)",
      easeInQuint: "cubic-bezier(0.755,  0.050, 0.855, 0.060)",
      easeInSine: "cubic-bezier(0.470,  0.000, 0.745, 0.715)",
      easeOutBack: "cubic-bezier(0.175,  0.885, 0.320, 1.275)",
      easeOutCubic: "cubic-bezier(0.215,  0.610, 0.355, 1.000)",
      easeOutCirc: "cubic-bezier(0.075,  0.820, 0.165, 1.000)",
      easeOutExpo: "cubic-bezier(0.190,  1.000, 0.220, 1.000)",
      easeOutQuad: "cubic-bezier(0.250,  0.460, 0.450, 0.940)",
      easeOutQuart: "cubic-bezier(0.165,  0.840, 0.440, 1.000)",
      easeOutQuint: "cubic-bezier(0.230,  1.000, 0.320, 1.000)",
      easeOutSine: "cubic-bezier(0.390,  0.575, 0.565, 1.000)",
      easeInOutBack: "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
      easeInOutCirc: "cubic-bezier(0.785,  0.135, 0.150, 0.860)",
      easeInOutCubic: "cubic-bezier(0.645,  0.045, 0.355, 1.000)",
      easeInOutExpo: "cubic-bezier(1.000,  0.000, 0.000, 1.000)",
      easeInOutQuad: "cubic-bezier(0.455,  0.030, 0.515, 0.955)",
      easeInOutQuart: "cubic-bezier(0.770,  0.000, 0.175, 1.000)",
      easeInOutQuint: "cubic-bezier(0.860,  0.000, 0.070, 1.000)",
      easeInOutSine: "cubic-bezier(0.445,  0.050, 0.550, 0.950)"
    };
    function getTimingFunction(functionName) {
      return functionsMap[functionName];
    }
    function timingFunctions(timingFunction) {
      return getTimingFunction(timingFunction);
    }
    var getBorderWidth = function getBorderWidth2(pointingDirection, height, width) {
      var fullWidth = "" + width[0] + (width[1] || "");
      var halfWidth = "" + width[0] / 2 + (width[1] || "");
      var fullHeight = "" + height[0] + (height[1] || "");
      var halfHeight = "" + height[0] / 2 + (height[1] || "");
      switch (pointingDirection) {
        case "top":
          return "0 " + halfWidth + " " + fullHeight + " " + halfWidth;
        case "topLeft":
          return fullWidth + " " + fullHeight + " 0 0";
        case "left":
          return halfHeight + " " + fullWidth + " " + halfHeight + " 0";
        case "bottomLeft":
          return fullWidth + " 0 0 " + fullHeight;
        case "bottom":
          return fullHeight + " " + halfWidth + " 0 " + halfWidth;
        case "bottomRight":
          return "0 0 " + fullWidth + " " + fullHeight;
        case "right":
          return halfHeight + " 0 " + halfHeight + " " + fullWidth;
        case "topRight":
        default:
          return "0 " + fullWidth + " " + fullHeight + " 0";
      }
    };
    var getBorderColor = function getBorderColor2(pointingDirection, foregroundColor) {
      switch (pointingDirection) {
        case "top":
        case "bottomRight":
          return {
            borderBottomColor: foregroundColor
          };
        case "right":
        case "bottomLeft":
          return {
            borderLeftColor: foregroundColor
          };
        case "bottom":
        case "topLeft":
          return {
            borderTopColor: foregroundColor
          };
        case "left":
        case "topRight":
          return {
            borderRightColor: foregroundColor
          };
        default:
          throw new PolishedError(59);
      }
    };
    function triangle(_ref) {
      var pointingDirection = _ref.pointingDirection, height = _ref.height, width = _ref.width, foregroundColor = _ref.foregroundColor, _ref$backgroundColor = _ref.backgroundColor, backgroundColor = _ref$backgroundColor === void 0 ? "transparent" : _ref$backgroundColor;
      var widthAndUnit = getValueAndUnit(width);
      var heightAndUnit = getValueAndUnit(height);
      if (isNaN(heightAndUnit[0]) || isNaN(widthAndUnit[0])) {
        throw new PolishedError(60);
      }
      return _extends__default["default"]({
        width: "0",
        height: "0",
        borderColor: backgroundColor
      }, getBorderColor(pointingDirection, foregroundColor), {
        borderStyle: "solid",
        borderWidth: getBorderWidth(pointingDirection, heightAndUnit, widthAndUnit)
      });
    }
    function wordWrap(wrap) {
      if (wrap === void 0) {
        wrap = "break-word";
      }
      var wordBreak = wrap === "break-word" ? "break-all" : wrap;
      return {
        overflowWrap: wrap,
        wordWrap: wrap,
        wordBreak
      };
    }
    function colorToInt(color3) {
      return Math.round(color3 * 255);
    }
    function convertToInt(red, green, blue) {
      return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
    }
    function hslToRgb(hue, saturation, lightness, convert) {
      if (convert === void 0) {
        convert = convertToInt;
      }
      if (saturation === 0) {
        return convert(lightness, lightness, lightness);
      }
      var huePrime = (hue % 360 + 360) % 360 / 60;
      var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
      var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
      var red = 0;
      var green = 0;
      var blue = 0;
      if (huePrime >= 0 && huePrime < 1) {
        red = chroma;
        green = secondComponent;
      } else if (huePrime >= 1 && huePrime < 2) {
        red = secondComponent;
        green = chroma;
      } else if (huePrime >= 2 && huePrime < 3) {
        green = chroma;
        blue = secondComponent;
      } else if (huePrime >= 3 && huePrime < 4) {
        green = secondComponent;
        blue = chroma;
      } else if (huePrime >= 4 && huePrime < 5) {
        red = secondComponent;
        blue = chroma;
      } else if (huePrime >= 5 && huePrime < 6) {
        red = chroma;
        blue = secondComponent;
      }
      var lightnessModification = lightness - chroma / 2;
      var finalRed = red + lightnessModification;
      var finalGreen = green + lightnessModification;
      var finalBlue = blue + lightnessModification;
      return convert(finalRed, finalGreen, finalBlue);
    }
    var namedColorMap = {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "00ffff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000",
      blanchedalmond: "ffebcd",
      blue: "0000ff",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "00ffff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "ff00ff",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "789",
      lightslategrey: "789",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "0f0",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "f0f",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "639",
      red: "f00",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "fff",
      whitesmoke: "f5f5f5",
      yellow: "ff0",
      yellowgreen: "9acd32"
    };
    function nameToHex(color3) {
      if (typeof color3 !== "string") return color3;
      var normalizedColorName = color3.toLowerCase();
      return namedColorMap[normalizedColorName] ? "#" + namedColorMap[normalizedColorName] : color3;
    }
    var hexRegex = /^#[a-fA-F0-9]{6}$/;
    var hexRgbaRegex = /^#[a-fA-F0-9]{8}$/;
    var reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
    var reducedRgbaHexRegex = /^#[a-fA-F0-9]{4}$/;
    var rgbRegex = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i;
    var rgbaRegex = /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
    var hslRegex = /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i;
    var hslaRegex = /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
    function parseToRgb(color3) {
      if (typeof color3 !== "string") {
        throw new PolishedError(3);
      }
      var normalizedColor = nameToHex(color3);
      if (normalizedColor.match(hexRegex)) {
        return {
          red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
          green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
          blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16)
        };
      }
      if (normalizedColor.match(hexRgbaRegex)) {
        var alpha = parseFloat((parseInt("" + normalizedColor[7] + normalizedColor[8], 16) / 255).toFixed(2));
        return {
          red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
          green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
          blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16),
          alpha
        };
      }
      if (normalizedColor.match(reducedHexRegex)) {
        return {
          red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
          green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
          blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16)
        };
      }
      if (normalizedColor.match(reducedRgbaHexRegex)) {
        var _alpha = parseFloat((parseInt("" + normalizedColor[4] + normalizedColor[4], 16) / 255).toFixed(2));
        return {
          red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
          green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
          blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16),
          alpha: _alpha
        };
      }
      var rgbMatched = rgbRegex.exec(normalizedColor);
      if (rgbMatched) {
        return {
          red: parseInt("" + rgbMatched[1], 10),
          green: parseInt("" + rgbMatched[2], 10),
          blue: parseInt("" + rgbMatched[3], 10)
        };
      }
      var rgbaMatched = rgbaRegex.exec(normalizedColor.substring(0, 50));
      if (rgbaMatched) {
        return {
          red: parseInt("" + rgbaMatched[1], 10),
          green: parseInt("" + rgbaMatched[2], 10),
          blue: parseInt("" + rgbaMatched[3], 10),
          alpha: parseFloat("" + rgbaMatched[4]) > 1 ? parseFloat("" + rgbaMatched[4]) / 100 : parseFloat("" + rgbaMatched[4])
        };
      }
      var hslMatched = hslRegex.exec(normalizedColor);
      if (hslMatched) {
        var hue = parseInt("" + hslMatched[1], 10);
        var saturation = parseInt("" + hslMatched[2], 10) / 100;
        var lightness = parseInt("" + hslMatched[3], 10) / 100;
        var rgbColorString = "rgb(" + hslToRgb(hue, saturation, lightness) + ")";
        var hslRgbMatched = rgbRegex.exec(rgbColorString);
        if (!hslRgbMatched) {
          throw new PolishedError(4, normalizedColor, rgbColorString);
        }
        return {
          red: parseInt("" + hslRgbMatched[1], 10),
          green: parseInt("" + hslRgbMatched[2], 10),
          blue: parseInt("" + hslRgbMatched[3], 10)
        };
      }
      var hslaMatched = hslaRegex.exec(normalizedColor.substring(0, 50));
      if (hslaMatched) {
        var _hue = parseInt("" + hslaMatched[1], 10);
        var _saturation = parseInt("" + hslaMatched[2], 10) / 100;
        var _lightness = parseInt("" + hslaMatched[3], 10) / 100;
        var _rgbColorString = "rgb(" + hslToRgb(_hue, _saturation, _lightness) + ")";
        var _hslRgbMatched = rgbRegex.exec(_rgbColorString);
        if (!_hslRgbMatched) {
          throw new PolishedError(4, normalizedColor, _rgbColorString);
        }
        return {
          red: parseInt("" + _hslRgbMatched[1], 10),
          green: parseInt("" + _hslRgbMatched[2], 10),
          blue: parseInt("" + _hslRgbMatched[3], 10),
          alpha: parseFloat("" + hslaMatched[4]) > 1 ? parseFloat("" + hslaMatched[4]) / 100 : parseFloat("" + hslaMatched[4])
        };
      }
      throw new PolishedError(5);
    }
    function rgbToHsl(color3) {
      var red = color3.red / 255;
      var green = color3.green / 255;
      var blue = color3.blue / 255;
      var max2 = Math.max(red, green, blue);
      var min2 = Math.min(red, green, blue);
      var lightness = (max2 + min2) / 2;
      if (max2 === min2) {
        if (color3.alpha !== void 0) {
          return {
            hue: 0,
            saturation: 0,
            lightness,
            alpha: color3.alpha
          };
        } else {
          return {
            hue: 0,
            saturation: 0,
            lightness
          };
        }
      }
      var hue;
      var delta = max2 - min2;
      var saturation = lightness > 0.5 ? delta / (2 - max2 - min2) : delta / (max2 + min2);
      switch (max2) {
        case red:
          hue = (green - blue) / delta + (green < blue ? 6 : 0);
          break;
        case green:
          hue = (blue - red) / delta + 2;
          break;
        default:
          hue = (red - green) / delta + 4;
          break;
      }
      hue *= 60;
      if (color3.alpha !== void 0) {
        return {
          hue,
          saturation,
          lightness,
          alpha: color3.alpha
        };
      }
      return {
        hue,
        saturation,
        lightness
      };
    }
    function parseToHsl(color3) {
      return rgbToHsl(parseToRgb(color3));
    }
    var reduceHexValue = function reduceHexValue2(value) {
      if (value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
        return "#" + value[1] + value[3] + value[5];
      }
      return value;
    };
    var reduceHexValue$1 = reduceHexValue;
    function numberToHex(value) {
      var hex = value.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }
    function colorToHex(color3) {
      return numberToHex(Math.round(color3 * 255));
    }
    function convertToHex(red, green, blue) {
      return reduceHexValue$1("#" + colorToHex(red) + colorToHex(green) + colorToHex(blue));
    }
    function hslToHex(hue, saturation, lightness) {
      return hslToRgb(hue, saturation, lightness, convertToHex);
    }
    function hsl(value, saturation, lightness) {
      if (typeof value === "number" && typeof saturation === "number" && typeof lightness === "number") {
        return hslToHex(value, saturation, lightness);
      } else if (typeof value === "object" && saturation === void 0 && lightness === void 0) {
        return hslToHex(value.hue, value.saturation, value.lightness);
      }
      throw new PolishedError(1);
    }
    function hsla(value, saturation, lightness, alpha) {
      if (typeof value === "number" && typeof saturation === "number" && typeof lightness === "number" && typeof alpha === "number") {
        return alpha >= 1 ? hslToHex(value, saturation, lightness) : "rgba(" + hslToRgb(value, saturation, lightness) + "," + alpha + ")";
      } else if (typeof value === "object" && saturation === void 0 && lightness === void 0 && alpha === void 0) {
        return value.alpha >= 1 ? hslToHex(value.hue, value.saturation, value.lightness) : "rgba(" + hslToRgb(value.hue, value.saturation, value.lightness) + "," + value.alpha + ")";
      }
      throw new PolishedError(2);
    }
    function rgb(value, green, blue) {
      if (typeof value === "number" && typeof green === "number" && typeof blue === "number") {
        return reduceHexValue$1("#" + numberToHex(value) + numberToHex(green) + numberToHex(blue));
      } else if (typeof value === "object" && green === void 0 && blue === void 0) {
        return reduceHexValue$1("#" + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
      }
      throw new PolishedError(6);
    }
    function rgba2(firstValue, secondValue, thirdValue, fourthValue) {
      if (typeof firstValue === "string" && typeof secondValue === "number") {
        var rgbValue = parseToRgb(firstValue);
        return "rgba(" + rgbValue.red + "," + rgbValue.green + "," + rgbValue.blue + "," + secondValue + ")";
      } else if (typeof firstValue === "number" && typeof secondValue === "number" && typeof thirdValue === "number" && typeof fourthValue === "number") {
        return fourthValue >= 1 ? rgb(firstValue, secondValue, thirdValue) : "rgba(" + firstValue + "," + secondValue + "," + thirdValue + "," + fourthValue + ")";
      } else if (typeof firstValue === "object" && secondValue === void 0 && thirdValue === void 0 && fourthValue === void 0) {
        return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : "rgba(" + firstValue.red + "," + firstValue.green + "," + firstValue.blue + "," + firstValue.alpha + ")";
      }
      throw new PolishedError(7);
    }
    var isRgb = function isRgb2(color3) {
      return typeof color3.red === "number" && typeof color3.green === "number" && typeof color3.blue === "number" && (typeof color3.alpha !== "number" || typeof color3.alpha === "undefined");
    };
    var isRgba = function isRgba2(color3) {
      return typeof color3.red === "number" && typeof color3.green === "number" && typeof color3.blue === "number" && typeof color3.alpha === "number";
    };
    var isHsl = function isHsl2(color3) {
      return typeof color3.hue === "number" && typeof color3.saturation === "number" && typeof color3.lightness === "number" && (typeof color3.alpha !== "number" || typeof color3.alpha === "undefined");
    };
    var isHsla = function isHsla2(color3) {
      return typeof color3.hue === "number" && typeof color3.saturation === "number" && typeof color3.lightness === "number" && typeof color3.alpha === "number";
    };
    function toColorString(color3) {
      if (typeof color3 !== "object") throw new PolishedError(8);
      if (isRgba(color3)) return rgba2(color3);
      if (isRgb(color3)) return rgb(color3);
      if (isHsla(color3)) return hsla(color3);
      if (isHsl(color3)) return hsl(color3);
      throw new PolishedError(8);
    }
    function curried(f, length, acc) {
      return function fn() {
        var combined = acc.concat(Array.prototype.slice.call(arguments));
        return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
      };
    }
    function curry(f) {
      return curried(f, f.length, []);
    }
    function adjustHue(degree, color3) {
      if (color3 === "transparent") return color3;
      var hslColor = parseToHsl(color3);
      return toColorString(_extends__default["default"]({}, hslColor, {
        hue: hslColor.hue + parseFloat(degree)
      }));
    }
    var curriedAdjustHue = curry(adjustHue);
    var curriedAdjustHue$1 = curriedAdjustHue;
    function complement(color3) {
      if (color3 === "transparent") return color3;
      var hslColor = parseToHsl(color3);
      return toColorString(_extends__default["default"]({}, hslColor, {
        hue: (hslColor.hue + 180) % 360
      }));
    }
    function guard(lowerBoundary, upperBoundary, value) {
      return Math.max(lowerBoundary, Math.min(upperBoundary, value));
    }
    function darken(amount, color3) {
      if (color3 === "transparent") return color3;
      var hslColor = parseToHsl(color3);
      return toColorString(_extends__default["default"]({}, hslColor, {
        lightness: guard(0, 1, hslColor.lightness - parseFloat(amount))
      }));
    }
    var curriedDarken = curry(darken);
    var curriedDarken$1 = curriedDarken;
    function desaturate(amount, color3) {
      if (color3 === "transparent") return color3;
      var hslColor = parseToHsl(color3);
      return toColorString(_extends__default["default"]({}, hslColor, {
        saturation: guard(0, 1, hslColor.saturation - parseFloat(amount))
      }));
    }
    var curriedDesaturate = curry(desaturate);
    var curriedDesaturate$1 = curriedDesaturate;
    function getLuminance(color3) {
      if (color3 === "transparent") return 0;
      var rgbColor = parseToRgb(color3);
      var _Object$keys$map = Object.keys(rgbColor).map(function(key) {
        var channel = rgbColor[key] / 255;
        return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
      }), r = _Object$keys$map[0], g = _Object$keys$map[1], b = _Object$keys$map[2];
      return parseFloat((0.2126 * r + 0.7152 * g + 0.0722 * b).toFixed(3));
    }
    function getContrast(color1, color22) {
      var luminance1 = getLuminance(color1);
      var luminance2 = getLuminance(color22);
      return parseFloat((luminance1 > luminance2 ? (luminance1 + 0.05) / (luminance2 + 0.05) : (luminance2 + 0.05) / (luminance1 + 0.05)).toFixed(2));
    }
    function grayscale(color3) {
      if (color3 === "transparent") return color3;
      return toColorString(_extends__default["default"]({}, parseToHsl(color3), {
        saturation: 0
      }));
    }
    function hslToColorString(color3) {
      if (typeof color3 === "object" && typeof color3.hue === "number" && typeof color3.saturation === "number" && typeof color3.lightness === "number") {
        if (color3.alpha && typeof color3.alpha === "number") {
          return hsla({
            hue: color3.hue,
            saturation: color3.saturation,
            lightness: color3.lightness,
            alpha: color3.alpha
          });
        }
        return hsl({
          hue: color3.hue,
          saturation: color3.saturation,
          lightness: color3.lightness
        });
      }
      throw new PolishedError(45);
    }
    function invert(color3) {
      if (color3 === "transparent") return color3;
      var value = parseToRgb(color3);
      return toColorString(_extends__default["default"]({}, value, {
        red: 255 - value.red,
        green: 255 - value.green,
        blue: 255 - value.blue
      }));
    }
    function lighten(amount, color3) {
      if (color3 === "transparent") return color3;
      var hslColor = parseToHsl(color3);
      return toColorString(_extends__default["default"]({}, hslColor, {
        lightness: guard(0, 1, hslColor.lightness + parseFloat(amount))
      }));
    }
    var curriedLighten = curry(lighten);
    var curriedLighten$1 = curriedLighten;
    function meetsContrastGuidelines(color1, color22) {
      var contrastRatio = getContrast(color1, color22);
      return {
        AA: contrastRatio >= 4.5,
        AALarge: contrastRatio >= 3,
        AAA: contrastRatio >= 7,
        AAALarge: contrastRatio >= 4.5
      };
    }
    function mix(weight, color3, otherColor) {
      if (color3 === "transparent") return otherColor;
      if (otherColor === "transparent") return color3;
      if (weight === 0) return otherColor;
      var parsedColor1 = parseToRgb(color3);
      var color1 = _extends__default["default"]({}, parsedColor1, {
        alpha: typeof parsedColor1.alpha === "number" ? parsedColor1.alpha : 1
      });
      var parsedColor2 = parseToRgb(otherColor);
      var color22 = _extends__default["default"]({}, parsedColor2, {
        alpha: typeof parsedColor2.alpha === "number" ? parsedColor2.alpha : 1
      });
      var alphaDelta = color1.alpha - color22.alpha;
      var x = parseFloat(weight) * 2 - 1;
      var y = x * alphaDelta === -1 ? x : x + alphaDelta;
      var z = 1 + x * alphaDelta;
      var weight1 = (y / z + 1) / 2;
      var weight2 = 1 - weight1;
      var mixedColor = {
        red: Math.floor(color1.red * weight1 + color22.red * weight2),
        green: Math.floor(color1.green * weight1 + color22.green * weight2),
        blue: Math.floor(color1.blue * weight1 + color22.blue * weight2),
        alpha: color1.alpha * parseFloat(weight) + color22.alpha * (1 - parseFloat(weight))
      };
      return rgba2(mixedColor);
    }
    var curriedMix = curry(mix);
    var mix$1 = curriedMix;
    function opacify(amount, color3) {
      if (color3 === "transparent") return color3;
      var parsedColor = parseToRgb(color3);
      var alpha = typeof parsedColor.alpha === "number" ? parsedColor.alpha : 1;
      var colorWithAlpha = _extends__default["default"]({}, parsedColor, {
        alpha: guard(0, 1, (alpha * 100 + parseFloat(amount) * 100) / 100)
      });
      return rgba2(colorWithAlpha);
    }
    var curriedOpacify = curry(opacify);
    var curriedOpacify$1 = curriedOpacify;
    var defaultReturnIfLightColor = "#000";
    var defaultReturnIfDarkColor = "#fff";
    function readableColor(color3, returnIfLightColor, returnIfDarkColor, strict) {
      if (returnIfLightColor === void 0) {
        returnIfLightColor = defaultReturnIfLightColor;
      }
      if (returnIfDarkColor === void 0) {
        returnIfDarkColor = defaultReturnIfDarkColor;
      }
      if (strict === void 0) {
        strict = true;
      }
      var isColorLight = getLuminance(color3) > 0.179;
      var preferredReturnColor = isColorLight ? returnIfLightColor : returnIfDarkColor;
      if (!strict || getContrast(color3, preferredReturnColor) >= 4.5) {
        return preferredReturnColor;
      }
      return isColorLight ? defaultReturnIfLightColor : defaultReturnIfDarkColor;
    }
    function rgbToColorString(color3) {
      if (typeof color3 === "object" && typeof color3.red === "number" && typeof color3.green === "number" && typeof color3.blue === "number") {
        if (typeof color3.alpha === "number") {
          return rgba2({
            red: color3.red,
            green: color3.green,
            blue: color3.blue,
            alpha: color3.alpha
          });
        }
        return rgb({
          red: color3.red,
          green: color3.green,
          blue: color3.blue
        });
      }
      throw new PolishedError(46);
    }
    function saturate(amount, color3) {
      if (color3 === "transparent") return color3;
      var hslColor = parseToHsl(color3);
      return toColorString(_extends__default["default"]({}, hslColor, {
        saturation: guard(0, 1, hslColor.saturation + parseFloat(amount))
      }));
    }
    var curriedSaturate = curry(saturate);
    var curriedSaturate$1 = curriedSaturate;
    function setHue(hue, color3) {
      if (color3 === "transparent") return color3;
      return toColorString(_extends__default["default"]({}, parseToHsl(color3), {
        hue: parseFloat(hue)
      }));
    }
    var curriedSetHue = curry(setHue);
    var curriedSetHue$1 = curriedSetHue;
    function setLightness(lightness, color3) {
      if (color3 === "transparent") return color3;
      return toColorString(_extends__default["default"]({}, parseToHsl(color3), {
        lightness: parseFloat(lightness)
      }));
    }
    var curriedSetLightness = curry(setLightness);
    var curriedSetLightness$1 = curriedSetLightness;
    function setSaturation(saturation, color3) {
      if (color3 === "transparent") return color3;
      return toColorString(_extends__default["default"]({}, parseToHsl(color3), {
        saturation: parseFloat(saturation)
      }));
    }
    var curriedSetSaturation = curry(setSaturation);
    var curriedSetSaturation$1 = curriedSetSaturation;
    function shade(percentage, color3) {
      if (color3 === "transparent") return color3;
      return mix$1(parseFloat(percentage), "rgb(0, 0, 0)", color3);
    }
    var curriedShade = curry(shade);
    var curriedShade$1 = curriedShade;
    function tint(percentage, color3) {
      if (color3 === "transparent") return color3;
      return mix$1(parseFloat(percentage), "rgb(255, 255, 255)", color3);
    }
    var curriedTint = curry(tint);
    var curriedTint$1 = curriedTint;
    function transparentize(amount, color3) {
      if (color3 === "transparent") return color3;
      var parsedColor = parseToRgb(color3);
      var alpha = typeof parsedColor.alpha === "number" ? parsedColor.alpha : 1;
      var colorWithAlpha = _extends__default["default"]({}, parsedColor, {
        alpha: guard(0, 1, +(alpha * 100 - parseFloat(amount) * 100).toFixed(2) / 100)
      });
      return rgba2(colorWithAlpha);
    }
    var curriedTransparentize = curry(transparentize);
    var curriedTransparentize$1 = curriedTransparentize;
    function animation() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var multiMode = Array.isArray(args[0]);
      if (!multiMode && args.length > 8) {
        throw new PolishedError(64);
      }
      var code = args.map(function(arg) {
        if (multiMode && !Array.isArray(arg) || !multiMode && Array.isArray(arg)) {
          throw new PolishedError(65);
        }
        if (Array.isArray(arg) && arg.length > 8) {
          throw new PolishedError(66);
        }
        return Array.isArray(arg) ? arg.join(" ") : arg;
      }).join(", ");
      return {
        animation: code
      };
    }
    function backgroundImages() {
      for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++) {
        properties[_key] = arguments[_key];
      }
      return {
        backgroundImage: properties.join(", ")
      };
    }
    function backgrounds() {
      for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++) {
        properties[_key] = arguments[_key];
      }
      return {
        background: properties.join(", ")
      };
    }
    var sideMap = ["top", "right", "bottom", "left"];
    function border3(sideKeyword) {
      for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
      }
      if (typeof sideKeyword === "string" && sideMap.indexOf(sideKeyword) >= 0) {
        var _ref;
        return _ref = {}, _ref["border" + capitalizeString(sideKeyword) + "Width"] = values[0], _ref["border" + capitalizeString(sideKeyword) + "Style"] = values[1], _ref["border" + capitalizeString(sideKeyword) + "Color"] = values[2], _ref;
      } else {
        values.unshift(sideKeyword);
        return {
          borderWidth: values[0],
          borderStyle: values[1],
          borderColor: values[2]
        };
      }
    }
    function borderColor() {
      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }
      return directionalProperty.apply(void 0, ["borderColor"].concat(values));
    }
    function borderRadius(side, radius) {
      var uppercaseSide = capitalizeString(side);
      if (!radius && radius !== 0) {
        throw new PolishedError(62);
      }
      if (uppercaseSide === "Top" || uppercaseSide === "Bottom") {
        var _ref;
        return _ref = {}, _ref["border" + uppercaseSide + "RightRadius"] = radius, _ref["border" + uppercaseSide + "LeftRadius"] = radius, _ref;
      }
      if (uppercaseSide === "Left" || uppercaseSide === "Right") {
        var _ref2;
        return _ref2 = {}, _ref2["borderTop" + uppercaseSide + "Radius"] = radius, _ref2["borderBottom" + uppercaseSide + "Radius"] = radius, _ref2;
      }
      throw new PolishedError(63);
    }
    function borderStyle() {
      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }
      return directionalProperty.apply(void 0, ["borderStyle"].concat(values));
    }
    function borderWidth() {
      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }
      return directionalProperty.apply(void 0, ["borderWidth"].concat(values));
    }
    function generateSelectors(template2, state) {
      var stateSuffix = state ? ":" + state : "";
      return template2(stateSuffix);
    }
    function statefulSelectors(states2, template2, stateMap2) {
      if (!template2) throw new PolishedError(67);
      if (states2.length === 0) return generateSelectors(template2, null);
      var selectors = [];
      for (var i = 0; i < states2.length; i += 1) {
        if (stateMap2 && stateMap2.indexOf(states2[i]) < 0) {
          throw new PolishedError(68);
        }
        selectors.push(generateSelectors(template2, states2[i]));
      }
      selectors = selectors.join(",");
      return selectors;
    }
    var stateMap$1 = [void 0, null, "active", "focus", "hover"];
    function template$1(state) {
      return "button" + state + ',\n  input[type="button"]' + state + ',\n  input[type="reset"]' + state + ',\n  input[type="submit"]' + state;
    }
    function buttons() {
      for (var _len = arguments.length, states2 = new Array(_len), _key = 0; _key < _len; _key++) {
        states2[_key] = arguments[_key];
      }
      return statefulSelectors(states2, template$1, stateMap$1);
    }
    function margin3() {
      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }
      return directionalProperty.apply(void 0, ["margin"].concat(values));
    }
    function padding3() {
      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }
      return directionalProperty.apply(void 0, ["padding"].concat(values));
    }
    var positionMap = ["absolute", "fixed", "relative", "static", "sticky"];
    function position(firstValue) {
      for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
      }
      if (positionMap.indexOf(firstValue) >= 0 && firstValue) {
        return _extends__default["default"]({}, directionalProperty.apply(void 0, [""].concat(values)), {
          position: firstValue
        });
      } else {
        return directionalProperty.apply(void 0, ["", firstValue].concat(values));
      }
    }
    function size(height, width) {
      if (width === void 0) {
        width = height;
      }
      return {
        height,
        width
      };
    }
    var stateMap = [void 0, null, "active", "focus", "hover"];
    function template(state) {
      return 'input[type="color"]' + state + ',\n    input[type="date"]' + state + ',\n    input[type="datetime"]' + state + ',\n    input[type="datetime-local"]' + state + ',\n    input[type="email"]' + state + ',\n    input[type="month"]' + state + ',\n    input[type="number"]' + state + ',\n    input[type="password"]' + state + ',\n    input[type="search"]' + state + ',\n    input[type="tel"]' + state + ',\n    input[type="text"]' + state + ',\n    input[type="time"]' + state + ',\n    input[type="url"]' + state + ',\n    input[type="week"]' + state + ",\n    input:not([type])" + state + ",\n    textarea" + state;
    }
    function textInputs() {
      for (var _len = arguments.length, states2 = new Array(_len), _key = 0; _key < _len; _key++) {
        states2[_key] = arguments[_key];
      }
      return statefulSelectors(states2, template, stateMap);
    }
    function transitions() {
      for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++) {
        properties[_key] = arguments[_key];
      }
      if (Array.isArray(properties[0]) && properties.length === 2) {
        var value = properties[1];
        if (typeof value !== "string") {
          throw new PolishedError(61);
        }
        var transitionsString = properties[0].map(function(property) {
          return property + " " + value;
        }).join(", ");
        return {
          transition: transitionsString
        };
      } else {
        return {
          transition: properties.join(", ")
        };
      }
    }
    exports.adjustHue = curriedAdjustHue$1;
    exports.animation = animation;
    exports.backgroundImages = backgroundImages;
    exports.backgrounds = backgrounds;
    exports.between = between;
    exports.border = border3;
    exports.borderColor = borderColor;
    exports.borderRadius = borderRadius;
    exports.borderStyle = borderStyle;
    exports.borderWidth = borderWidth;
    exports.buttons = buttons;
    exports.clearFix = clearFix;
    exports.complement = complement;
    exports.cover = cover;
    exports.cssVar = cssVar;
    exports.darken = curriedDarken$1;
    exports.desaturate = curriedDesaturate$1;
    exports.directionalProperty = directionalProperty;
    exports.easeIn = easeIn;
    exports.easeInOut = easeInOut;
    exports.easeOut = easeOut;
    exports.ellipsis = ellipsis;
    exports.em = em$1;
    exports.fluidRange = fluidRange;
    exports.fontFace = fontFace;
    exports.getContrast = getContrast;
    exports.getLuminance = getLuminance;
    exports.getValueAndUnit = getValueAndUnit;
    exports.grayscale = grayscale;
    exports.hiDPI = hiDPI;
    exports.hideText = hideText;
    exports.hideVisually = hideVisually;
    exports.hsl = hsl;
    exports.hslToColorString = hslToColorString;
    exports.hsla = hsla;
    exports.important = important;
    exports.invert = invert;
    exports.lighten = curriedLighten$1;
    exports.linearGradient = linearGradient;
    exports.margin = margin3;
    exports.math = math;
    exports.meetsContrastGuidelines = meetsContrastGuidelines;
    exports.mix = mix$1;
    exports.modularScale = modularScale;
    exports.normalize = normalize;
    exports.opacify = curriedOpacify$1;
    exports.padding = padding3;
    exports.parseToHsl = parseToHsl;
    exports.parseToRgb = parseToRgb;
    exports.position = position;
    exports.radialGradient = radialGradient;
    exports.readableColor = readableColor;
    exports.rem = rem$1;
    exports.remToPx = remToPx;
    exports.retinaImage = retinaImage;
    exports.rgb = rgb;
    exports.rgbToColorString = rgbToColorString;
    exports.rgba = rgba2;
    exports.saturate = curriedSaturate$1;
    exports.setHue = curriedSetHue$1;
    exports.setLightness = curriedSetLightness$1;
    exports.setSaturation = curriedSetSaturation$1;
    exports.shade = curriedShade$1;
    exports.size = size;
    exports.stripUnit = stripUnit;
    exports.textInputs = textInputs;
    exports.timingFunctions = timingFunctions;
    exports.tint = curriedTint$1;
    exports.toColorString = toColorString;
    exports.transitions = transitions;
    exports.transparentize = curriedTransparentize$1;
    exports.triangle = triangle;
    exports.wordWrap = wordWrap;
  }
});

// ../../../cc/gamut/packages/variance/dist/core.js
var import_get2 = __toESM(require_get());
var import_identity = __toESM(require_identity());
var import_isArray2 = __toESM(require_isArray());
var import_isObject2 = __toESM(require_isObject());
var import_isUndefined = __toESM(require_isUndefined());
var import_merge = __toESM(require_merge());

// ../../../cc/gamut/packages/variance/dist/scales/createScaleLookup.js
var import_get = __toESM(require_get());
var import_isArray = __toESM(require_isArray());
var import_isObject = __toESM(require_isObject());
var import_isString = __toESM(require_isString());
var createScaleLookup = (scale) => {
  if ((0, import_isString.default)(scale)) {
    return (val, props) => (0, import_get.default)(props, ["theme", scale, val]);
  }
  if ((0, import_isArray.default)(scale)) {
    return (val) => val;
  }
  if ((0, import_isObject.default)(scale)) {
    return (val) => (0, import_get.default)(scale, val);
  }
  return () => void 0;
};

// ../../../cc/gamut/packages/variance/dist/utils/getStaticProperties.js
var import_keys = __toESM(require_keys());
var import_pick = __toESM(require_pick());
var getStaticCss = (props, filteredKeys) => (0, import_pick.default)(props, (0, import_keys.default)(props).filter((key) => !filteredKeys.includes(key)));

// ../../../cc/gamut/packages/variance/dist/utils/propNames.js
var SHORTHAND_PROPERTIES = ["border", "borderTop", "borderBottom", "borderLeft", "borderRight", "borderWidth", "borderStyle", "borderColor", "background", "flex", "margin", "padding", "transition", "gap", "grid", "gridArea", "gridColumn", "gridRow", "gridTemplate", "overflow", "transition"];
var SORT = {
  A_BEFORE_B: -1,
  B_BEFORE_A: 1,
  EQUAL: 1
};
var compare = (a, b) => {
  if (a < b) return SORT.A_BEFORE_B;
  if (b < a) return SORT.B_BEFORE_A;
  return SORT.EQUAL;
};
var isShorthand = (prop) => typeof prop === "string" && SHORTHAND_PROPERTIES.includes(prop);
var getShorthandIndex = (prop) => typeof prop === "string" ? SHORTHAND_PROPERTIES.indexOf(prop) : -1;
var getPropertiesCount = (properties) => {
  if (!properties) return 0;
  if (Array.isArray(properties)) return properties.length;
  return properties.physical?.length ?? 0;
};
var orderPropNames = (config) => Object.keys(config).sort((a, b) => {
  const {
    [a]: aConf,
    [b]: bConf
  } = config;
  const {
    property: aProp,
    properties: aProperties
  } = aConf;
  const {
    property: bProp,
    properties: bProperties
  } = bConf;
  const aIsShorthand = isShorthand(aProp);
  const bIsShorthand = isShorthand(bProp);
  if (aIsShorthand && bIsShorthand) {
    const aNum = getPropertiesCount(aProperties);
    const bNum = getPropertiesCount(bProperties);
    if (aProp !== bProp) {
      return compare(getShorthandIndex(aProp), getShorthandIndex(bProp));
    }
    if (aProp === bProp) {
      if (aNum === 0) return SORT.A_BEFORE_B;
      if (bNum === 0) return SORT.B_BEFORE_A;
    }
    return compare(bNum, aNum);
  }
  if (aIsShorthand) return SORT.A_BEFORE_B;
  if (bIsShorthand) return SORT.B_BEFORE_A;
  return SORT.EQUAL;
});

// ../../../cc/gamut/packages/variance/dist/utils/responsive.js
var import_intersection = __toESM(require_intersection());
var import_omit = __toESM(require_omit());
var BREAKPOINT_KEYS = ["_", "xs", "sm", "md", "lg", "xl", "c_base", "c_xs", "c_sm", "c_md", "c_lg", "c_xl"];
var parseBreakpoints = (breakpoints2) => {
  if (breakpoints2 === void 0) return null;
  const {
    xs,
    sm,
    md,
    lg,
    xl,
    c_base,
    c_xs,
    c_sm,
    c_md,
    c_lg,
    c_xl
  } = breakpoints2 ?? {};
  return {
    map: breakpoints2,
    array: [xs, sm, md, lg, xl, c_base, c_xs, c_sm, c_md, c_lg, c_xl]
  };
};
var isMediaArray = (val) => Array.isArray(val);
var isMediaMap = (val) => (0, import_intersection.default)(Object.keys(val), BREAKPOINT_KEYS).length > 0;
var objectParser = (value, props, config, breakpoints2) => {
  const styles = {};
  const {
    styleFn,
    prop
  } = config;
  const {
    _,
    ...rest
  } = value;
  if (_) Object.assign(styles, styleFn(_, prop, props));
  Object.keys(breakpoints2).forEach((breakpointKey) => {
    const bpStyles = rest[breakpointKey];
    if (typeof bpStyles === "undefined") return;
    Object.assign(styles, {
      [breakpoints2[breakpointKey]]: styleFn(bpStyles, prop, props)
    });
  });
  return styles;
};
var arrayParser = (value, props, config, breakpoints2) => {
  const styles = {};
  const {
    styleFn,
    prop
  } = config;
  const [_, ...rest] = value;
  if (_) Object.assign(styles, styleFn(_, prop, props));
  rest.forEach((val, i) => {
    const breakpointKey = breakpoints2[i];
    if (!breakpointKey || typeof val === "undefined") return;
    Object.assign(styles, {
      [breakpointKey]: styleFn(val, prop, props)
    });
  });
  return styles;
};
var orderBreakpoints = (styles, breakpoints2) => {
  const orderedStyles = (0, import_omit.default)(styles, breakpoints2);
  breakpoints2.forEach((bp) => {
    if (styles[bp]) {
      orderedStyles[bp] = styles[bp];
    }
  });
  return orderedStyles;
};

// ../../../cc/gamut/packages/variance/dist/core.js
var variance = {
  // Parser to handle any set of configured props
  createParser(config) {
    const propNames = orderPropNames(config);
    let breakpoints2;
    const parser = (props) => {
      const styles = {};
      const {
        theme
      } = props;
      if (breakpoints2 === void 0 || breakpoints2 === null && theme?.breakpoints) {
        breakpoints2 = parseBreakpoints(theme?.breakpoints);
      }
      propNames.forEach((prop) => {
        const property = config[prop];
        const value = (0, import_get2.default)(props, prop);
        switch (typeof value) {
          case "string":
          case "number":
          case "function":
            return Object.assign(styles, property.styleFn(value, prop, props));
          // handle any props configured with the responsive notation
          case "object":
            if (!breakpoints2) {
              return;
            }
            if (isMediaArray(value)) {
              return (0, import_merge.default)(styles, arrayParser(value, props, property, breakpoints2.array));
            }
            if (isMediaMap(value)) {
              return (0, import_merge.default)(styles, objectParser(value, props, property, breakpoints2.map));
            }
        }
      });
      return breakpoints2 ? orderBreakpoints(styles, breakpoints2.array) : styles;
    };
    return Object.assign(parser, {
      propNames,
      config
    });
  },
  // Given a single property configuration enrich the config with a transform function
  // that traverses the properties the function is responsible for.
  createTransform(prop, config) {
    const {
      transform = import_identity.default,
      property,
      properties: configProperties,
      scale,
      resolveProperty
    } = config;
    const getScaleValue = createScaleLookup(scale);
    const alwaysTransform = scale === void 0 || (0, import_isArray2.default)(scale);
    const isDirectionalProperties = (props) => props !== void 0 && !(0, import_isArray2.default)(props) && "physical" in props && "logical" in props;
    return {
      ...config,
      prop,
      styleFn: (value, prop2, props) => {
        const styles = {};
        if ((0, import_isUndefined.default)(value)) {
          return styles;
        }
        let useTransform = false;
        let intermediateValue;
        let scaleValue;
        switch (typeof value) {
          case "number":
          case "string":
            scaleValue = getScaleValue(value, props);
            useTransform = scaleValue !== void 0 || alwaysTransform;
            intermediateValue = scaleValue ?? value;
            break;
          case "function":
            if (props.theme) {
              intermediateValue = value(props.theme);
            }
            break;
          default:
            return styles;
        }
        const useLogicalProperties = props.theme?.useLogicalProperties ?? true;
        let resolvedProperties;
        if (isDirectionalProperties(configProperties)) {
          const mode = resolveProperty ? resolveProperty(useLogicalProperties) : useLogicalProperties ? "logical" : "physical";
          resolvedProperties = configProperties[mode];
        } else {
          resolvedProperties = configProperties ?? [property];
        }
        resolvedProperties.forEach((property2) => {
          let resolvedProperty;
          if (resolveProperty && typeof property2 === "object") {
            const mode = resolveProperty(useLogicalProperties);
            resolvedProperty = property2[mode];
          } else {
            resolvedProperty = property2;
          }
          let styleValue = intermediateValue;
          if (useTransform && !(0, import_isUndefined.default)(styleValue)) {
            styleValue = transform(styleValue, resolvedProperty, props);
          }
          switch (typeof styleValue) {
            case "number":
            case "string":
              return styles[resolvedProperty] = styleValue;
            case "object":
              return Object.assign(styles, styleValue);
            default:
          }
        });
        return styles;
      }
    };
  },
  compose(...parsers) {
    return this.createParser(parsers.reduce((carry, parser) => ({
      ...carry,
      ...parser.config
    }), {}));
  },
  createCss(config) {
    const parser = this.create(config);
    const filteredProps = parser.propNames;
    return (cssProps) => {
      let cache;
      const allKeys = Object.keys(cssProps);
      const selectors = allKeys.filter((key) => !filteredProps.includes(key) && (0, import_isObject2.default)(cssProps[key]));
      const staticCss = getStaticCss(cssProps, [
        "theme",
        // Just in case this gets passed somehow
        ...selectors,
        ...filteredProps
      ]);
      return ({
        theme
      }) => {
        if (cache) return cache;
        const css2 = parser({
          ...cssProps,
          theme
        });
        selectors.forEach((selector) => {
          const selectorConfig = cssProps[selector] ?? {};
          css2[selector] = {
            ...getStaticCss(selectorConfig, filteredProps),
            ...parser({
              ...selectorConfig,
              theme
            })
          };
        });
        cache = {
          ...staticCss,
          ...css2
        };
        return cache;
      };
    };
  },
  createVariant(config) {
    const css2 = this.createCss(config);
    return ({
      prop = "variant",
      defaultVariant,
      base = {},
      variants
    }) => {
      const baseFn = css2(base);
      const variantFns = {};
      Object.keys(variants).forEach((key) => {
        const variantKey = key;
        const cssProps = variants[variantKey];
        variantFns[variantKey] = css2(cssProps);
      });
      return (props) => {
        const {
          [prop]: selected = defaultVariant
        } = props;
        const styles = {};
        if (!selected) return styles;
        return (0, import_merge.default)(styles, baseFn(props), variantFns?.[selected]?.(props));
      };
    };
  },
  createStates(config) {
    const css2 = this.createCss(config);
    return (states2) => {
      const orderedStates = Object.keys(states2);
      const stateFns = {};
      orderedStates.forEach((key) => {
        const stateKey = key;
        const cssProps = states2[stateKey];
        stateFns[stateKey] = css2(cssProps);
      });
      return (props) => {
        const styles = {};
        orderedStates.forEach((state) => {
          (0, import_merge.default)(styles, props[state] && stateFns[state](props));
        });
        return styles;
      };
    };
  },
  create(config) {
    const transforms = {};
    for (const prop in config) {
      if (typeof prop === "string") {
        transforms[prop] = this.createTransform(prop, config[prop]);
      }
    }
    return this.createParser(transforms);
  }
};

// ../../../cc/gamut/packages/variance/dist/createTheme/createTheme.js
var import_mapValues = __toESM(require_mapValues());
var import_merge3 = __toESM(require_merge());

// ../../../cc/gamut/packages/variance/dist/utils/flattenScale.js
var import_isObject3 = __toESM(require_isObject());
function flattenScale(object, path) {
  return Object.keys(object).reduce((carry, key) => {
    const nextKey = path ? `${path}${key === "_" ? "" : `-${key}`}` : key;
    const current = object[key];
    if ((0, import_isObject3.default)(current)) {
      return {
        ...carry,
        ...flattenScale(current, nextKey)
      };
    }
    return {
      ...carry,
      [nextKey]: object[key]
    };
  }, {});
}

// ../../../cc/gamut/packages/variance/dist/utils/serializeTokens.js
var import_isObject4 = __toESM(require_isObject());
var import_merge2 = __toESM(require_merge());
var templateBreakpoints = (value, alias, theme) => {
  if ((0, import_isObject4.default)(value)) {
    const {
      _,
      base,
      ...rest
    } = value;
    const css2 = {
      [alias]: _ ?? base
    };
    if (theme) {
      const {
        breakpoints: breakpoints2
      } = theme;
      Object.keys(breakpoints2).forEach((key) => {
        const breakpointValue = rest[key];
        if (breakpointValue !== void 0) {
          css2[breakpoints2[key]] = {
            [alias]: breakpointValue
          };
        }
      });
    }
    return css2;
  }
  return {
    [alias]: value
  };
};
var serializeTokens = (tokens, prefix, theme) => {
  const tokenReferences = {};
  const tokenVariables = {};
  Object.keys(tokens).forEach((key) => {
    const varName = `--${prefix}-${key}`;
    tokenReferences[key] = `var(${varName})`;
    (0, import_merge2.default)(tokenVariables, templateBreakpoints(tokens[key], varName, theme));
  });
  return {
    tokens: tokenReferences,
    variables: tokenVariables
  };
};

// ../../../cc/gamut/packages/variance/dist/createTheme/createTheme.js
var ThemeBuilder = class {
  #theme = {};
  constructor(baseTheme) {
    this.#theme = baseTheme;
  }
  /**
   *
   * @param key A key of the current theme to transform into CSS Variables and Variable References
   * @example .createScaleVariables('fontSize')
   */
  createScaleVariables(key) {
    const {
      variables,
      tokens
    } = serializeTokens(this.#theme[key], key, this.#theme);
    this.#theme = (0, import_merge3.default)({}, this.#theme, {
      [key]: tokens,
      _variables: {
        root: variables
      },
      _tokens: {
        [key]: this.#theme[key]
      }
    });
    return this;
  }
  /**
   *
   * @param colors A map of color tokens to add to the theme. These tokens are immediately converted to CSS Variables `--color-${key}`.
   * @example .addColors({ navy: 'navy', hyper: 'purple' })
   */
  addColors(colors) {
    const flatColors = flattenScale(colors);
    const {
      variables,
      tokens
    } = serializeTokens(
      // TS 5.9+ no longer resolves LiteralPaths<> as assignable to SerializedTokensInput; flattened scales are plain token maps at runtime.
      flatColors,
      "color",
      this.#theme
    );
    this.#theme = (0, import_merge3.default)({}, this.#theme, {
      colors: tokens,
      _variables: {
        root: variables
      },
      _tokens: {
        colors: flatColors
      }
    });
    return this;
  }
  /**
   *
   * @param initialMode A key of the object passed for modes.  This sets the default state for the theme and transforms the correct variables.
   * @param modes A map of color modes with keys of each possible mode with a value of alias to color keys.  This must be called after `addColors`
   * @example .addColorModes('light', { light: { primary: 'hyper' }, { dark: { primary: 'navy' } } })
   */
  addColorModes(initialMode, modeConfig) {
    const modes = (0, import_mapValues.default)(modeConfig, (mode) => flattenScale(mode));
    const {
      tokens: colors,
      variables
    } = serializeTokens((0, import_mapValues.default)((0, import_merge3.default)({}, this.#theme.modes?.[initialMode], modes[initialMode]), (color3) => this.#theme.colors[color3]), "color", this.#theme);
    const getColorValue = (color3) => this.#theme._tokens?.colors?.[color3];
    this.#theme = (0, import_merge3.default)({}, this.#theme, {
      colors,
      modes,
      mode: initialMode,
      _getColorValue: getColorValue,
      _variables: {
        mode: variables
      },
      _tokens: {
        modes: (0, import_mapValues.default)(modes, (mode) => (0, import_mapValues.default)(mode, getColorValue))
      }
    });
    return this;
  }
  /**
   *
   * @param key A new key of theme
   * @param createScale A function that accepts the current theme and returns a new object of scale values.
   * @example .addScale('fonts', () => ({ basic: 'Gotham', cool: 'Wingdings' }))
   */
  addScale(key, createScale) {
    this.#theme = (0, import_merge3.default)({}, this.#theme, {
      [key]: flattenScale(createScale(this.#theme))
    });
    return this;
  }
  /**
   *
   * @param key A current key of theme to be updated with new or computed values
   * @param updateFn A function that accepts an argument of the current values at the specified keys an returns a map of new values to merge.
   * @example .updateScale('fonts', ({ basic }) => ({ basicFallback: `{basic}, Montserrat` }))
   */
  updateScale(key, updateFn) {
    this.#theme = (0, import_merge3.default)({}, this.#theme, {
      [key]: updateFn(this.#theme[key])
    });
    return this;
  }
  /**
   *
   * @param name Adds a name to the theme
   * This is used for referencing the theme for replacing default fonts.
   * @example .addName('core')
   */
  addName(name) {
    this.#theme = (0, import_merge3.default)({}, this.#theme, {
      name
    });
    return this;
  }
  /**
   * This finalizes the theme build and returns the final theme and variables to be provided.
   */
  build() {
    return (0, import_merge3.default)({}, this.#theme, {
      _variables: {},
      _tokens: {}
    });
  }
};
function createTheme(base) {
  return new ThemeBuilder(base);
}

// ../../../cc/gamut/packages/variance/dist/transforms/transformSize.js
var import_isNumber = __toESM(require_isNumber());
var percentageOrAbsolute = (coordinate) => {
  if (coordinate === 0) {
    return coordinate;
  }
  if (coordinate <= 1 && coordinate >= -1) {
    return `${coordinate * 100}%`;
  }
  return `${coordinate}px`;
};
var valueWithUnit = /(-?\d*\.?\d+)(%|\w*)/;
var transformSize = (value) => {
  if ((0, import_isNumber.default)(value)) {
    return percentageOrAbsolute(value);
  }
  if (value.includes("calc")) {
    return value;
  }
  const [match, number, unit] = valueWithUnit.exec(value) || [];
  if (match === void 0) {
    return value;
  }
  const numericValue = parseFloat(number);
  return !unit ? percentageOrAbsolute(numericValue) : `${numericValue}${unit}`;
};

// ../../../cc/gamut/packages/variance/dist/getPropertyMode/getPropertyMode.js
var getPropertyMode = (useLogicalProperties) => {
  return useLogicalProperties ? "logical" : "physical";
};

// ../../../cc/gamut/packages/gamut-styles/dist/variance/config.js
var color = {
  color: {
    property: "color",
    scale: "colors"
  },
  textColor: {
    property: "color",
    scale: "colors"
  },
  bg: {
    property: "backgroundColor",
    scale: "colors"
  },
  borderColor: {
    property: "borderColor",
    scale: "colors"
  },
  borderColorX: {
    property: "borderColor",
    properties: {
      physical: ["borderLeftColor", "borderRightColor"],
      logical: ["borderInlineStartColor", "borderInlineEndColor"]
    },
    resolveProperty: getPropertyMode,
    scale: "colors"
  },
  borderColorY: {
    property: "borderColor",
    properties: {
      physical: ["borderTopColor", "borderBottomColor"],
      logical: ["borderBlockStartColor", "borderBlockEndColor"]
    },
    resolveProperty: getPropertyMode,
    scale: "colors"
  },
  borderColorLeft: {
    property: "borderLeftColor",
    resolveProperty: getPropertyMode,
    scale: "colors"
  },
  borderColorRight: {
    property: "borderRightColor",
    resolveProperty: getPropertyMode,
    scale: "colors"
  },
  borderColorTop: {
    property: "borderTopColor",
    resolveProperty: getPropertyMode,
    scale: "colors"
  },
  borderColorBottom: {
    property: "borderBottomColor",
    resolveProperty: getPropertyMode,
    scale: "colors"
  }
};
var border = {
  // Border
  border: {
    property: "border",
    scale: "borders"
  },
  borderX: {
    property: "border",
    properties: {
      physical: ["borderLeft", "borderRight"],
      logical: ["borderInlineStart", "borderInlineEnd"]
    },
    resolveProperty: getPropertyMode,
    scale: "borders"
  },
  borderY: {
    property: "border",
    properties: {
      physical: ["borderTop", "borderBottom"],
      logical: ["borderBlockStart", "borderBlockEnd"]
    },
    resolveProperty: getPropertyMode,
    scale: "borders"
  },
  borderTop: {
    property: {
      physical: "borderTop",
      logical: "borderBlockStart"
    },
    resolveProperty: getPropertyMode,
    scale: "borders"
  },
  borderRight: {
    property: {
      physical: "borderRight",
      logical: "borderInlineEnd"
    },
    resolveProperty: getPropertyMode,
    scale: "borders"
  },
  borderBottom: {
    property: {
      physical: "borderBottom",
      logical: "borderBlockEnd"
    },
    resolveProperty: getPropertyMode,
    scale: "borders"
  },
  borderLeft: {
    property: {
      physical: "borderLeft",
      logical: "borderInlineStart"
    },
    resolveProperty: getPropertyMode,
    scale: "borders"
  },
  // Width
  borderWidth: {
    property: "borderWidth"
  },
  borderWidthX: {
    property: "borderWidth",
    properties: {
      physical: ["borderLeftWidth", "borderRightWidth"],
      logical: ["borderInlineStartWidth", "borderInlineEndWidth"]
    },
    resolveProperty: getPropertyMode
  },
  borderWidthY: {
    property: "borderWidth",
    properties: {
      physical: ["borderTopWidth", "borderBottomWidth"],
      logical: ["borderBlockStartWidth", "borderBlockEndWidth"]
    },
    resolveProperty: getPropertyMode
  },
  borderWidthLeft: {
    property: {
      physical: "borderLeftWidth",
      logical: "borderInlineStartWidth"
    },
    resolveProperty: getPropertyMode
  },
  borderWidthRight: {
    property: {
      physical: "borderRightWidth",
      logical: "borderInlineEndWidth"
    },
    resolveProperty: getPropertyMode
  },
  borderWidthTop: {
    property: {
      physical: "borderTopWidth",
      logical: "borderBlockStartWidth"
    },
    resolveProperty: getPropertyMode
  },
  borderWidthBottom: {
    property: {
      physical: "borderBottomWidth",
      logical: "borderBlockEndWidth"
    },
    resolveProperty: getPropertyMode
  },
  // Radius
  borderRadius: {
    property: "borderRadius",
    scale: "borderRadii"
  },
  borderRadiusLeft: {
    property: "borderRadius",
    properties: {
      physical: ["borderTopLeftRadius", "borderBottomLeftRadius"],
      logical: ["borderStartStartRadius", "borderEndStartRadius"]
    },
    resolveProperty: getPropertyMode,
    scale: "borderRadii"
  },
  borderRadiusTop: {
    property: "borderRadius",
    properties: {
      physical: ["borderTopLeftRadius", "borderTopRightRadius"],
      logical: ["borderStartStartRadius", "borderStartEndRadius"]
    },
    resolveProperty: getPropertyMode,
    scale: "borderRadii"
  },
  borderRadiusBottom: {
    property: "borderRadius",
    properties: {
      physical: ["borderBottomLeftRadius", "borderBottomRightRadius"],
      logical: ["borderEndStartRadius", "borderEndEndRadius"]
    },
    resolveProperty: getPropertyMode,
    scale: "borderRadii"
  },
  borderRadiusRight: {
    property: "borderRadius",
    properties: {
      physical: ["borderTopRightRadius", "borderBottomRightRadius"],
      logical: ["borderStartEndRadius", "borderEndEndRadius"]
    },
    resolveProperty: getPropertyMode,
    scale: "borderRadii"
  },
  borderRadiusTopLeft: {
    property: {
      physical: "borderTopLeftRadius",
      logical: "borderStartStartRadius"
    },
    resolveProperty: getPropertyMode,
    scale: "borderRadii"
  },
  borderRadiusTopRight: {
    property: {
      physical: "borderTopRightRadius",
      logical: "borderStartEndRadius"
    },
    resolveProperty: getPropertyMode,
    scale: "borderRadii"
  },
  borderRadiusBottomRight: {
    property: {
      physical: "borderBottomRightRadius",
      logical: "borderEndEndRadius"
    },
    resolveProperty: getPropertyMode,
    scale: "borderRadii"
  },
  borderRadiusBottomLeft: {
    property: {
      physical: "borderBottomLeftRadius",
      logical: "borderEndStartRadius"
    },
    resolveProperty: getPropertyMode,
    scale: "borderRadii"
  },
  // Style
  borderStyle: {
    property: "borderStyle"
  },
  borderStyleX: {
    property: "borderStyle",
    properties: {
      physical: ["borderLeftStyle", "borderRightStyle"],
      logical: ["borderInlineStartStyle", "borderInlineEndStyle"]
    },
    resolveProperty: getPropertyMode
  },
  borderStyleY: {
    property: "borderStyle",
    properties: {
      physical: ["borderTopStyle", "borderBottomStyle"],
      logical: ["borderBlockStartStyle", "borderBlockEndStyle"]
    },
    resolveProperty: getPropertyMode
  },
  borderStyleLeft: {
    property: {
      physical: "borderLeftStyle",
      logical: "borderInlineStartStyle"
    },
    resolveProperty: getPropertyMode
  },
  borderStyleRight: {
    property: {
      physical: "borderRightStyle",
      logical: "borderInlineEndStyle"
    },
    resolveProperty: getPropertyMode
  },
  borderStyleTop: {
    property: {
      physical: "borderTopStyle",
      logical: "borderBlockStartStyle"
    },
    resolveProperty: getPropertyMode
  },
  borderStyleBottom: {
    property: {
      physical: "borderBottomStyle",
      logical: "borderBlockEndStyle"
    },
    resolveProperty: getPropertyMode
  }
};
var selfAlignments = {
  justifySelf: {
    property: "justifySelf"
  },
  alignSelf: {
    property: "alignSelf"
  },
  gridArea: {
    property: "gridArea"
  }
};
var alignments = {
  justifyContent: {
    property: "justifyContent"
  },
  justifyItems: {
    property: "justifyItems"
  },
  alignItems: {
    property: "alignItems"
  },
  alignContent: {
    property: "alignContent"
  },
  ...selfAlignments
};
var flexItems = {
  flexBasis: {
    property: "flexBasis"
  },
  flexShrink: {
    property: "flexShrink"
  },
  flexGrow: {
    property: "flexGrow"
  },
  order: {
    property: "order"
  }
};
var flex = {
  flexDirection: {
    property: "flexDirection"
  },
  flexWrap: {
    property: "flexWrap"
  },
  flex: {
    property: "flex"
  },
  ...alignments,
  ...flexItems
};
var gridItems = {
  gridColumn: {
    property: "gridColumn"
  },
  gridRow: {
    property: "gridRow"
  },
  gridColumnStart: {
    property: "gridColumnStart"
  },
  gridRowStart: {
    property: "gridRowStart"
  },
  gridColumnEnd: {
    property: "gridColumnEnd"
  },
  gridRowEnd: {
    property: "gridRowEnd"
  }
};
var grid = {
  gridAutoColumns: {
    property: "gridAutoColumns"
  },
  gridAutoRows: {
    property: "gridAutoRows"
  },
  gridTemplateColumns: {
    property: "gridTemplateColumns"
  },
  gridTemplateRows: {
    property: "gridTemplateRows"
  },
  gridTemplateAreas: {
    property: "gridTemplateAreas"
  },
  gridAutoFlow: {
    property: "gridAutoFlow"
  },
  gap: {
    property: "gap",
    scale: "spacing"
  },
  rowGap: {
    property: "rowGap",
    scale: "spacing"
  },
  columnGap: {
    property: "columnGap",
    scale: "spacing"
  },
  ...alignments,
  ...gridItems
};
var background = {
  background: {
    property: "background"
  },
  backgroundImage: {
    property: "backgroundImage"
  },
  backgroundSize: {
    property: "backgroundSize"
  },
  backgroundRepeat: {
    property: "backgroundRepeat"
  },
  backgroundPosition: {
    property: "backgroundPosition"
  }
};
var positioning = {
  position: {
    property: "position"
  },
  inset: {
    property: "inset",
    properties: {
      physical: ["top", "right", "bottom", "left"],
      logical: ["insetBlockStart", "insetInlineEnd", "insetBlockEnd", "insetInlineStart"]
    },
    resolveProperty: getPropertyMode,
    transform: transformSize
  },
  top: {
    property: {
      physical: "top",
      logical: "insetBlockStart"
    },
    resolveProperty: getPropertyMode,
    transform: transformSize
  },
  right: {
    property: {
      physical: "right",
      logical: "insetInlineEnd"
    },
    resolveProperty: getPropertyMode,
    transform: transformSize
  },
  bottom: {
    property: {
      physical: "bottom",
      logical: "insetBlockEnd"
    },
    resolveProperty: getPropertyMode,
    transform: transformSize
  },
  left: {
    property: {
      physical: "left",
      logical: "insetInlineStart"
    },
    resolveProperty: getPropertyMode,
    transform: transformSize
  },
  zIndex: {
    property: "zIndex"
  },
  opacity: {
    property: "opacity"
  }
};
var shadows = {
  boxShadow: {
    property: "boxShadow"
  },
  textShadow: {
    property: "textShadow"
  }
};
var layout = {
  containerType: {
    property: "containerType"
  },
  display: {
    property: "display"
  },
  overflow: {
    property: "overflow"
  },
  overflowX: {
    property: {
      physical: "overflowX",
      logical: "overflowInline"
    },
    resolveProperty: getPropertyMode
  },
  overflowY: {
    property: {
      physical: "overflowY",
      logical: "overflowBlock"
    },
    resolveProperty: getPropertyMode
  },
  dimensions: {
    property: "width",
    properties: {
      physical: ["width", "height"],
      logical: ["inlineSize", "blockSize"]
    },
    resolveProperty: getPropertyMode,
    transform: transformSize
  },
  width: {
    property: {
      physical: "width",
      logical: "inlineSize"
    },
    resolveProperty: getPropertyMode,
    transform: transformSize
  },
  minWidth: {
    property: {
      physical: "minWidth",
      logical: "minInlineSize"
    },
    resolveProperty: getPropertyMode,
    transform: transformSize
  },
  maxWidth: {
    property: {
      physical: "maxWidth",
      logical: "maxInlineSize"
    },
    resolveProperty: getPropertyMode,
    transform: transformSize
  },
  height: {
    property: {
      physical: "height",
      logical: "blockSize"
    },
    resolveProperty: getPropertyMode,
    transform: transformSize
  },
  minHeight: {
    property: {
      physical: "minHeight",
      logical: "minBlockSize"
    },
    resolveProperty: getPropertyMode,
    transform: transformSize
  },
  maxHeight: {
    property: {
      physical: "maxHeight",
      logical: "maxBlockSize"
    },
    resolveProperty: getPropertyMode,
    transform: transformSize
  },
  verticalAlign: {
    property: "verticalAlign"
  },
  direction: {
    property: "direction"
  },
  ...selfAlignments,
  ...gridItems,
  ...flexItems
};
var list = {
  listStyle: {
    property: "listStyle"
  },
  listStyleType: {
    property: "listStyleType"
  },
  listStylePosition: {
    property: "listStylePosition"
  },
  listStyleImage: {
    property: "listStyleImage"
  }
};
var typography = {
  fontFamily: {
    property: "fontFamily",
    scale: "fontFamily"
  },
  fontWeight: {
    property: "fontWeight",
    scale: "fontWeight"
  },
  lineHeight: {
    property: "lineHeight",
    scale: "lineHeight"
  },
  fontSize: {
    property: "fontSize",
    scale: "fontSize"
  },
  letterSpacing: {
    property: "letterSpacing"
  },
  textAlign: {
    property: "textAlign"
  },
  fontStyle: {
    property: "fontStyle"
  },
  textDecoration: {
    property: "textDecoration"
  },
  textTransform: {
    property: "textTransform"
  },
  whiteSpace: {
    property: "whiteSpace"
  }
};
var margin = {
  m: {
    property: "margin",
    scale: "spacing"
  },
  mx: {
    property: "margin",
    properties: {
      physical: ["marginLeft", "marginRight"],
      logical: ["marginInlineStart", "marginInlineEnd"]
    },
    resolveProperty: getPropertyMode,
    scale: "spacing"
  },
  my: {
    property: "margin",
    properties: {
      physical: ["marginTop", "marginBottom"],
      logical: ["marginBlockStart", "marginBlockEnd"]
    },
    resolveProperty: getPropertyMode,
    scale: "spacing"
  },
  mt: {
    property: {
      physical: "marginTop",
      logical: "marginBlockStart"
    },
    scale: "spacing",
    resolveProperty: getPropertyMode
  },
  mb: {
    property: {
      physical: "marginBottom",
      logical: "marginBlockEnd"
    },
    scale: "spacing",
    resolveProperty: getPropertyMode
  },
  mr: {
    property: {
      physical: "marginRight",
      logical: "marginInlineEnd"
    },
    scale: "spacing",
    resolveProperty: getPropertyMode
  },
  ml: {
    property: {
      physical: "marginLeft",
      logical: "marginInlineStart"
    },
    scale: "spacing",
    resolveProperty: getPropertyMode
  }
};
var padding = {
  p: {
    property: "padding",
    scale: "spacing"
  },
  px: {
    property: "padding",
    properties: {
      physical: ["paddingLeft", "paddingRight"],
      logical: ["paddingInlineStart", "paddingInlineEnd"]
    },
    scale: "spacing",
    resolveProperty: getPropertyMode
  },
  py: {
    property: "padding",
    properties: {
      physical: ["paddingTop", "paddingBottom"],
      logical: ["paddingBlockStart", "paddingBlockEnd"]
    },
    scale: "spacing",
    resolveProperty: getPropertyMode
  },
  pt: {
    property: {
      physical: "paddingTop",
      logical: "paddingBlockStart"
    },
    scale: "spacing",
    resolveProperty: getPropertyMode
  },
  pb: {
    property: {
      physical: "paddingBottom",
      logical: "paddingBlockEnd"
    },
    scale: "spacing",
    resolveProperty: getPropertyMode
  },
  pr: {
    property: {
      physical: "paddingRight",
      logical: "paddingInlineEnd"
    },
    scale: "spacing",
    resolveProperty: getPropertyMode
  },
  pl: {
    property: {
      physical: "paddingLeft",
      logical: "paddingInlineStart"
    },
    scale: "spacing",
    resolveProperty: getPropertyMode
  }
};
var space = {
  ...margin,
  ...padding
};
var all = {
  ...typography,
  ...space,
  ...shadows,
  ...grid,
  ...flex,
  ...layout,
  ...positioning,
  ...border,
  ...background,
  ...color,
  ...list
};

// ../../../cc/gamut/packages/gamut-styles/dist/variance/props.js
var typography2 = variance.create(typography);
var grid2 = variance.create(grid);
var flex2 = variance.create(flex);
var layout2 = variance.create(layout);
var positioning2 = variance.create(positioning);
var background2 = variance.create(background);
var color2 = variance.create(color);
var shadow = variance.create(shadows);
var space2 = variance.create(space);
var border2 = variance.create(border);
var list2 = variance.create(list);
var padding2 = variance.create(padding);
var margin2 = variance.create(margin);
var css = variance.createCss(all);
var variant = variance.createVariant(all);
var states = variance.createStates(all);

// ../../../cc/gamut/packages/gamut-styles/dist/variables/borderRadii.js
var borderRadii = {
  none: "0px",
  sm: "2px",
  md: "4px",
  lg: "8px",
  xl: "16px",
  full: "999px"
};

// ../../../cc/gamut/packages/gamut-styles/dist/variables/colors.js
var import_polished = __toESM(require_polished_cjs());
var black = "#000000";
var white = "#ffffff";
var navy = "#10162F";
var coreSwatches = {
  beige: {
    "100": "#FFF0E5"
  },
  blue: {
    "0": "#F5FCFF",
    "100": "#D3F2FF",
    "300": "#66C4FF",
    "400": "#3388FF",
    "500": "#1557FF",
    "800": "#1D2340"
  },
  navy: {
    "100": (0, import_polished.rgba)(navy, 0.04),
    "200": (0, import_polished.rgba)(navy, 0.12),
    "300": (0, import_polished.rgba)(navy, 0.28),
    "400": (0, import_polished.rgba)(navy, 0.47),
    "500": (0, import_polished.rgba)(navy, 0.63),
    "600": (0, import_polished.rgba)(navy, 0.75),
    "700": (0, import_polished.rgba)(navy, 0.86),
    "800": navy,
    "900": "#0A0D1C"
  },
  green: {
    "0": "#F5FFE3",
    "100": "#EAFDC6",
    "400": "#AEE938",
    "700": "#008A27",
    "900": "#151C07"
  },
  yellow: {
    "0": "#FFFAE5",
    "400": "#CCA900",
    "500": "#FFD300",
    "900": "#211B00"
  },
  pink: {
    "0": "#FFF5FF",
    "400": "#F966FF"
  },
  red: {
    "0": "#FBF1F0",
    "300": "#E85D7F",
    "400": "#DC5879",
    "500": "#E91C11",
    "600": "#BE1809",
    "900": "#280503"
  },
  orange: {
    "100": "#FFE8CC",
    "500": "#FF8C00"
  },
  hyper: {
    "400": "#5533FF",
    "500": "#3A10E5"
  },
  gray: {
    "100": "#F5F5F5",
    "200": "#EEEEEE",
    "300": "#E0E0E0",
    "600": "#9E9E9E",
    "800": "#616161",
    "900": "#424242"
  },
  white: {
    "100": (0, import_polished.rgba)(white, 0.04),
    "200": (0, import_polished.rgba)(white, 0.09),
    "300": (0, import_polished.rgba)(white, 0.2),
    "400": (0, import_polished.rgba)(white, 0.35),
    "500": (0, import_polished.rgba)(white, 0.5),
    "600": (0, import_polished.rgba)(white, 0.65),
    "700": (0, import_polished.rgba)(white, 0.8)
  }
};
var trueColors = {
  beige: coreSwatches.beige[100],
  blue: coreSwatches.blue[500],
  green: coreSwatches.green[700],
  hyper: coreSwatches.hyper[500],
  lightBlue: coreSwatches.blue[300],
  lightGreen: coreSwatches.green[400],
  navy: coreSwatches.navy[800],
  orange: coreSwatches.orange[500],
  paleBlue: coreSwatches.blue[0],
  paleGreen: coreSwatches.green[0],
  palePink: coreSwatches.pink[0],
  paleYellow: coreSwatches.yellow[0],
  pink: coreSwatches.pink[400],
  paleRed: coreSwatches.red[400],
  red: coreSwatches.red[500],
  yellow: coreSwatches.yellow[500],
  black,
  white
};
var corePalette = {
  ...flattenScale(coreSwatches),
  ...trueColors
};
var platformSwatches = {
  beige: {
    "0": "#FFFBF8"
  },
  gold: {
    "800": "#8A7300"
  },
  orange: {
    "800": "#D14900"
  },
  pink: {
    "800": "#CA00D1"
  },
  teal: {
    "500": "#006D82"
  },
  purple: {
    "300": "#B3CCFF"
  }
};
var truePlatformColors = {
  lightBeige: platformSwatches.beige[0],
  gold: platformSwatches.gold[800],
  teal: platformSwatches.teal[500],
  purple: platformSwatches.purple[300]
};
var platformEditorColors = {
  "comment-light": "#686C7B",
  "comment-dark": "#84868D",
  "indent-active-light": "#BCBDC4",
  "indent-active-dark": "#3B3D49",
  "indent-inactive-light": "#8E919D",
  "indent-inactive-dark": "#5F616B",
  "line-number-active-light": "#31374C",
  "line-number-active-dark": "#CECFD2",
  "line-number-inactive-light": "#686C7B",
  "line-number-inactive-dark": "#84868D"
};
var platformPalette = {
  ...flattenScale(platformSwatches),
  ...platformEditorColors,
  ...truePlatformColors
};
var sapphire = "#1C50BB";
var lxStudioColors = {
  lxStudioSuccess: "#06844F",
  lxStudioBgPrimary: "#FAFBFC",
  sapphire
};
var lxStudioPalette = {
  ...corePalette,
  ...lxStudioColors
};
var percipioColors = {
  // Text colors
  percipioTextPrimary: "#222325",
  percipioTextSecondary: "rgba(34, 35, 37, 0.75)",
  percipioTextDisabled: "#AFB6C2",
  percipioTextAccent: "#222325",
  // Background colors
  percipioBgPrimary: "#FAFBFC",
  percipioBgSuccess: "#EEF7F3",
  percipioBgWarning: "#FFF7E0",
  percipioBgError: "#FFF1F5",
  // Action colors
  sapphire,
  percipioActionPrimaryHover: "#141C36",
  percipioActionSecondary: "#6A6E75",
  percipioActionSecondaryHover: "rgba(106, 110, 117, 0.86)",
  percipioActionDangerHover: "#A52020",
  // Feedback colors
  percipioFeedbackSuccess: "#1B8057",
  percipioFeedbackWarning: "#EF5B0D",
  // Multiuse colors
  percipioDanger: "#B83C3C"
  /** Shared with LX Studio; `primary` color mode resolves here */
};
var percipioPalette = {
  ...corePalette,
  ...percipioColors
};

// ../../../cc/gamut/packages/gamut-styles/dist/variables/elements.js
var elements = {
  headerHeight: {
    base: "4rem",
    md: "5rem"
  },
  /**
   * Semi-arbitrary z-index for global page headers.
   * @remarks PLEASE talk to web platform before adding new z-index constants!
   */
  headerZ: 15
};

// ../../../cc/gamut/packages/gamut-styles/dist/variables/responsive.js
var breakpoints = {
  xs: "480px",
  sm: "768px",
  md: "1024px",
  lg: "1200px",
  xl: "1440px"
};
var createMediaQuery = (size, direction) => `@media only screen and (${direction}-width: ${breakpoints[size]})`;
var createContainerQuery = (size, direction) => `@container (${direction}-width: ${breakpoints[size]})`;
var mediaQueries = {
  xs: createMediaQuery("xs", "min"),
  sm: createMediaQuery("sm", "min"),
  md: createMediaQuery("md", "min"),
  lg: createMediaQuery("lg", "min"),
  xl: createMediaQuery("xl", "min")
};
var containerQueries = {
  c_base: "@container (min-width: 1px)",
  c_xs: createContainerQuery("xs", "min"),
  c_sm: createContainerQuery("sm", "min"),
  c_md: createContainerQuery("md", "min"),
  c_lg: createContainerQuery("lg", "min"),
  c_xl: createContainerQuery("xl", "min")
};
var contentWidths = {
  md: breakpoints.lg,
  max: breakpoints.xl
};

// ../../../cc/gamut/packages/gamut-styles/dist/styles/pxRem.js
var pxRem = (pixelValue) => {
  const parsedValue = typeof pixelValue === "string" ? parseInt(pixelValue, 10) : pixelValue;
  return `${parsedValue / 16}rem`;
};

// ../../../cc/gamut/packages/gamut-styles/dist/variables/spacing.js
var spacing = {
  0: 0,
  4: pxRem(4),
  8: pxRem(8),
  12: pxRem(12),
  16: pxRem(16),
  24: pxRem(24),
  32: pxRem(32),
  40: pxRem(40),
  48: pxRem(48),
  64: pxRem(64),
  96: pxRem(96)
};

// ../../../cc/gamut/packages/gamut-styles/dist/variables/timing.js
var timingValues = {
  fast: 150,
  medium: 200,
  base: 300,
  slow: 350
};
var timing = {
  fast: `${timingValues.fast}ms`,
  medium: `${timingValues.medium}ms`,
  base: `${timingValues.base}ms`,
  slow: `${timingValues.slow}ms`
};

// ../../../cc/gamut/packages/gamut-styles/dist/variables/typography.js
var fontAccent = `"Suisse", "Apercu", -apple-system, BlinkMacSystemFont,
"Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
"Helvetica Neue", sans-serif`;
var fontBase = `"Apercu", -apple-system, BlinkMacSystemFont, "Segoe UI",
"Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
sans-serif`;
var fontMonospace = `Monaco, Menlo, "Ubuntu Mono", "Droid Sans Mono", Consolas,
monospace`;
var fontSystem = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu",
"Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`;
var fontFamily = {
  accent: fontAccent,
  base: fontBase,
  monospace: fontMonospace,
  system: fontSystem
};
var fontSize = {
  64: pxRem(64),
  44: pxRem(44),
  34: pxRem(34),
  26: pxRem(26),
  22: pxRem(22),
  20: pxRem(20),
  18: pxRem(18),
  16: pxRem(16),
  14: pxRem(14)
};
var lineHeight = {
  base: 1.5,
  spacedTitle: 1.3,
  title: 1.2
};
var fontWeight = {
  base: 400,
  title: 700,
  700: 700,
  400: 400
};
var fontWeightMediumTitle = {
  ...fontWeight,
  title: 500,
  bold: 500,
  500: 500
};

// ../../../cc/gamut/packages/gamut-styles/dist/themes/core.js
var coreTheme = createTheme({
  breakpoints: {
    ...mediaQueries,
    ...containerQueries
  },
  borderRadii,
  fontSize,
  fontFamily,
  lineHeight,
  fontWeight,
  spacing,
  elements
}).addColors(corePalette).addColorModes("light", {
  light: {
    text: {
      _: "navy-800",
      accent: "navy-900",
      disabled: "navy-500",
      secondary: "navy-600"
    },
    feedback: {
      error: "red-600",
      success: "green-700",
      warning: "yellow"
    },
    background: {
      _: "white",
      contrast: "white",
      current: "white",
      primary: "beige",
      selected: "navy-100",
      disabled: "navy-200",
      hover: "navy-200",
      success: "green-0",
      warning: "yellow-0",
      error: "red-0"
    },
    shadow: {
      primary: "navy-800",
      secondary: "navy-600"
    },
    primary: {
      _: "hyper-500",
      hover: "hyper-400",
      inverse: "yellow-500"
    },
    secondary: {
      _: "navy-800",
      hover: "navy-700"
    },
    danger: {
      _: "red-500",
      hover: "red-600"
    },
    interface: {
      _: "hyper-500",
      hover: "hyper-400"
    },
    border: {
      primary: "navy-800",
      secondary: "navy-600",
      tertiary: "navy-300",
      disabled: "navy-500"
    }
  },
  dark: {
    text: {
      _: "white",
      accent: "beige",
      disabled: "white-500",
      secondary: "white-600"
    },
    feedback: {
      error: "red-300",
      success: "green-400",
      warning: "yellow-0"
    },
    background: {
      _: "navy-800",
      contrast: "black",
      current: "navy-800",
      primary: "navy-900",
      selected: "white-100",
      disabled: "white-200",
      hover: "white-200",
      success: "green-900",
      warning: "yellow-900",
      error: "red-900"
    },
    shadow: {
      primary: "white",
      secondary: "white-600"
    },
    primary: {
      _: "yellow-500",
      hover: "yellow-400",
      inverse: "hyper-500"
    },
    secondary: {
      _: "white",
      hover: "white-700"
    },
    danger: {
      _: "red-300",
      hover: "red-400"
    },
    interface: {
      _: "yellow-500",
      hover: "yellow-400"
    },
    border: {
      primary: "white",
      secondary: "white-600",
      tertiary: "white-300",
      disabled: "white-500"
    }
  }
}).addScale("borders", ({
  colors
}) => ({
  1: `1px solid ${colors["border-primary"]}`,
  2: `2px solid ${colors["border-primary"]}`
})).createScaleVariables("elements").addName("core").build();

// gamut-source.mjs
var closedProps = Object.entries(all).filter(([, config]) => config && config.scale).map(([prop, config]) => ({ prop, ...config }));
var SCALE_TO_PANDA_CATEGORY = {
  colors: "colors",
  spacing: "spacing",
  borderRadii: "radii",
  fontSize: "fontSizes",
  fontWeight: "fontWeights",
  lineHeight: "lineHeights",
  fontFamily: "fonts",
  borders: "borders"
};
var MIN_WIDTH = /min-width:\s*([\d.]+px)/;
var viewportBreakpoints = Object.fromEntries(
  Object.entries(coreTheme.breakpoints).filter(([key]) => !key.startsWith("c_")).map(([key, query]) => {
    const match = MIN_WIDTH.exec(query);
    if (!match) throw new Error(`no min-width in breakpoint ${key}: ${query}`);
    return [key, match[1]];
  })
);
var containerBreakpointCount = Object.keys(coreTheme.breakpoints).filter(
  (key) => key.startsWith("c_")
).length;
var GAMUT_BASE_KEY = "_";
var scaleValues = (scale) => {
  const values = coreTheme[scale];
  if (!values) throw new Error(`Core theme has no scale '${scale}'`);
  return values;
};
export {
  GAMUT_BASE_KEY,
  all as GAMUT_PROPS,
  SCALE_TO_PANDA_CATEGORY,
  closedProps,
  containerBreakpointCount,
  coreTheme,
  css as gamutCss,
  scaleValues,
  viewportBreakpoints
};
