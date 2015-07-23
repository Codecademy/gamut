'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

var _classnames = require('classnames');

// Reusable class for 'walls' in the LE.

var _classnames2 = _interopRequireDefault(_classnames);

var Wall = _reactAddons2['default'].createClass({
  displayName: 'Wall',

  mixins: [KeyboardEvents],

  propTypes: {
    children: _reactAddons2['default'].PropTypes.oneOfType([_reactAddons2['default'].PropTypes.arrayOf(_reactAddons2['default'].PropTypes.element), _reactAddons2['default'].PropTypes.element]),
    type: _reactAddons2['default'].PropTypes.string,
    dismiss: _reactAddons2['default'].PropTypes.func,
    responseRequired: _reactAddons2['default'].PropTypes.bool,
    padding: _reactAddons2['default'].PropTypes.bool,
    width: _reactAddons2['default'].PropTypes.string,
    height: _reactAddons2['default'].PropTypes.string
  },

  closeIfNotRequired: function closeIfNotRequired() {
    if (!this.props.responseRequired && _lodash2['default'].isFunction(this.props.dismiss)) {
      this.props.dismiss();
    }
  },

  render: function render() {
    var _cx;

    var wallClasses = (0, _classnames2['default'])((_cx = {
      'fcn-wall': true
    }, _defineProperty(_cx, 'fcn-wall--' + this.props.type, this.props.type), _defineProperty(_cx, 'fcn-wall--no-padding', this.props.padding === false), _cx));

    var wallStyles = {};
    if (this.props.width) wallStyles.width = this.props.width;
    if (this.props.height) wallStyles.height = this.props.height;

    return _reactAddons2['default'].createElement(
      _modal2['default'],
      { onOutsideClick: this.closeIfNotRequired },
      _reactAddons2['default'].createElement(
        'div',
        { className: wallClasses, style: wallStyles },
        this.props.children
      )
    );
  }
});

exports['default'] = Wall;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map