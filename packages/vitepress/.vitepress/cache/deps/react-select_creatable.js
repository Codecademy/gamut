import {
  Select,
  _objectSpread2,
  _objectWithoutProperties,
  _toConsumableArray,
  cleanValue,
  getOptionLabel$1,
  getOptionValue$1,
  useStateManager,
  valueTernary,
} from './chunk-JCZIUCUV.js';
import './chunk-Y4QXJQIJ.js';
import './chunk-6LF7RJNR.js';
import './chunk-I6C66VMN.js';
import './chunk-V7XVH3XH.js';
import './chunk-OQDD5VNB.js';
import './chunk-LOR335JX.js';
import './chunk-WF25XW2W.js';
import './chunk-7KURRFS5.js';
import { _extends } from './chunk-VMQKBCTX.js';
import { require_react_dom } from './chunk-FO7RYXPS.js';
import { require_react } from './chunk-QBXGYTN6.js';
import { __toESM } from './chunk-4B2QHNJT.js';

// ../../node_modules/react-select/creatable/dist/react-select-creatable.esm.js
var React = __toESM(require_react());
var import_react2 = __toESM(require_react());

// ../../node_modules/react-select/dist/useCreatable-ed0b936d.esm.js
var import_react = __toESM(require_react());
var _excluded = [
  'allowCreateWhileLoading',
  'createOptionPosition',
  'formatCreateLabel',
  'isValidNewOption',
  'getNewOptionData',
  'onCreateOption',
  'options',
  'onChange',
];
var compareOption = function compareOption2() {
  var inputValue =
    arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '';
  var option = arguments.length > 1 ? arguments[1] : void 0;
  var accessors = arguments.length > 2 ? arguments[2] : void 0;
  var candidate = String(inputValue).toLowerCase();
  var optionValue = String(accessors.getOptionValue(option)).toLowerCase();
  var optionLabel = String(accessors.getOptionLabel(option)).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
};
var builtins = {
  formatCreateLabel: function formatCreateLabel(inputValue) {
    return 'Create "'.concat(inputValue, '"');
  },
  isValidNewOption: function isValidNewOption(
    inputValue,
    selectValue,
    selectOptions,
    accessors
  ) {
    return !(
      !inputValue ||
      selectValue.some(function (option) {
        return compareOption(inputValue, option, accessors);
      }) ||
      selectOptions.some(function (option) {
        return compareOption(inputValue, option, accessors);
      })
    );
  },
  getNewOptionData: function getNewOptionData(inputValue, optionLabel) {
    return {
      label: optionLabel,
      value: inputValue,
      __isNew__: true,
    };
  },
};
function useCreatable(_ref) {
  var _ref$allowCreateWhile = _ref.allowCreateWhileLoading,
    allowCreateWhileLoading =
      _ref$allowCreateWhile === void 0 ? false : _ref$allowCreateWhile,
    _ref$createOptionPosi = _ref.createOptionPosition,
    createOptionPosition =
      _ref$createOptionPosi === void 0 ? 'last' : _ref$createOptionPosi,
    _ref$formatCreateLabe = _ref.formatCreateLabel,
    formatCreateLabel2 =
      _ref$formatCreateLabe === void 0
        ? builtins.formatCreateLabel
        : _ref$formatCreateLabe,
    _ref$isValidNewOption = _ref.isValidNewOption,
    isValidNewOption2 =
      _ref$isValidNewOption === void 0
        ? builtins.isValidNewOption
        : _ref$isValidNewOption,
    _ref$getNewOptionData = _ref.getNewOptionData,
    getNewOptionData2 =
      _ref$getNewOptionData === void 0
        ? builtins.getNewOptionData
        : _ref$getNewOptionData,
    onCreateOption = _ref.onCreateOption,
    _ref$options = _ref.options,
    propsOptions = _ref$options === void 0 ? [] : _ref$options,
    propsOnChange = _ref.onChange,
    restSelectProps = _objectWithoutProperties(_ref, _excluded);
  var _restSelectProps$getO = restSelectProps.getOptionValue,
    getOptionValue$12 =
      _restSelectProps$getO === void 0
        ? getOptionValue$1
        : _restSelectProps$getO,
    _restSelectProps$getO2 = restSelectProps.getOptionLabel,
    getOptionLabel$12 =
      _restSelectProps$getO2 === void 0
        ? getOptionLabel$1
        : _restSelectProps$getO2,
    inputValue = restSelectProps.inputValue,
    isLoading = restSelectProps.isLoading,
    isMulti = restSelectProps.isMulti,
    value = restSelectProps.value,
    name = restSelectProps.name;
  var newOption = (0, import_react.useMemo)(
    function () {
      return isValidNewOption2(inputValue, cleanValue(value), propsOptions, {
        getOptionValue: getOptionValue$12,
        getOptionLabel: getOptionLabel$12,
      })
        ? getNewOptionData2(inputValue, formatCreateLabel2(inputValue))
        : void 0;
    },
    [
      formatCreateLabel2,
      getNewOptionData2,
      getOptionLabel$12,
      getOptionValue$12,
      inputValue,
      isValidNewOption2,
      propsOptions,
      value,
    ]
  );
  var options = (0, import_react.useMemo)(
    function () {
      return (allowCreateWhileLoading || !isLoading) && newOption
        ? createOptionPosition === 'first'
          ? [newOption].concat(_toConsumableArray(propsOptions))
          : [].concat(_toConsumableArray(propsOptions), [newOption])
        : propsOptions;
    },
    [
      allowCreateWhileLoading,
      createOptionPosition,
      isLoading,
      newOption,
      propsOptions,
    ]
  );
  var onChange = (0, import_react.useCallback)(
    function (newValue, actionMeta) {
      if (actionMeta.action !== 'select-option') {
        return propsOnChange(newValue, actionMeta);
      }
      var valueArray = Array.isArray(newValue) ? newValue : [newValue];
      if (valueArray[valueArray.length - 1] === newOption) {
        if (onCreateOption) onCreateOption(inputValue);
        else {
          var newOptionData = getNewOptionData2(inputValue, inputValue);
          var newActionMeta = {
            action: 'create-option',
            name,
            option: newOptionData,
          };
          propsOnChange(
            valueTernary(
              isMulti,
              [].concat(_toConsumableArray(cleanValue(value)), [newOptionData]),
              newOptionData
            ),
            newActionMeta
          );
        }
        return;
      }
      propsOnChange(newValue, actionMeta);
    },
    [
      getNewOptionData2,
      inputValue,
      isMulti,
      name,
      newOption,
      onCreateOption,
      propsOnChange,
      value,
    ]
  );
  return _objectSpread2(
    _objectSpread2({}, restSelectProps),
    {},
    {
      options,
      onChange,
    }
  );
}

// ../../node_modules/react-select/creatable/dist/react-select-creatable.esm.js
var import_react_dom = __toESM(require_react_dom());
var CreatableSelect = (0, import_react2.forwardRef)(function (props, ref) {
  var creatableProps = useStateManager(props);
  var selectProps = useCreatable(creatableProps);
  return React.createElement(
    Select,
    _extends(
      {
        ref,
      },
      selectProps
    )
  );
});
var CreatableSelect$1 = CreatableSelect;
export { CreatableSelect$1 as default, useCreatable };
//# sourceMappingURL=react-select_creatable.js.map
