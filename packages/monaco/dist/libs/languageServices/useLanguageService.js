function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { useEffect, useState } from 'react';
import { getLanguageForFile } from '../getLanguage';
import { importedLanguages } from '.';
import { LanguageServices } from './LanguageService';
var languageServices = new LanguageServices(importedLanguages);
var useLanguageService = function useLanguageService(fileName, editor, monaco) {
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    id = _useState2[0],
    setId = _useState2[1];
  var _useState3 = useState(),
    _useState4 = _slicedToArray(_useState3, 2),
    registration = _useState4[0],
    setRegistration = _useState4[1];
  useEffect(function () {
    if (!editor || !monaco) {
      return;
    }
    var model = editor.getModel();
    var previousId = id;
    var newId = getLanguageForFile(monaco, fileName);
    setId(newId);
    if (!newId) {
      return;
    }
    if (newId !== previousId) {
      monaco.editor.setModelLanguage(model, newId);
      model.setEOL(monaco.editor.EndOfLineSequence.LF);
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    languageServices.use(newId, monaco).then(setRegistration);
  }, [editor, fileName, id, monaco]);
  return {
    id: id,
    registration: registration
  };
};
export default useLanguageService;