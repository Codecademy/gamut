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

var _LayeredComponentMixin = require('./LayeredComponentMixin');

var _LayeredComponentMixin2 = _interopRequireDefault(_LayeredComponentMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var overlayTypes = ['transparent'];

var Modal = _reactAddons2['default'].createClass({
  displayName: 'Modal',

  mixins: [_LayeredComponentMixin2['default']],

  propTypes: {
    children: _reactAddons2['default'].PropTypes.oneOfType([_reactAddons2['default'].PropTypes.arrayOf(_reactAddons2['default'].PropTypes.element), _reactAddons2['default'].PropTypes.element]),
    onOutsideClick: _reactAddons2['default'].PropTypes.func,
    overlayType: _reactAddons2['default'].PropTypes.oneOf(overlayTypes)
  },

  componentDidMount: function componentDidMount() {
    document.body.classList.add('modal-overlay-active');
  },

  componentWillUnmount: function componentWillUnmount() {
    document.body.classList.remove('modal-overlay-active');
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onOutsideClick: _lodash2['default'].noop
    };
  },

  // stop clicks on the content from triggering onOverlayClick
  onContentClick: function onContentClick(e) {
    e.stopPropagation();
  },

  onOverlayClick: function onOverlayClick() {
    this.props.onOutsideClick();
  },

  renderLayer: function renderLayer() {
    var overlayClasses = (0, _classnames2['default'])(_defineProperty({
      'ModalOverlay': true
    }, 'ModalOverlay--' + this.props.overlayType, overlayTypes.indexOf(this.props.overlayType) !== -1));

    return _reactAddons2['default'].createElement(
      'div',
      { className: overlayClasses, onClick: this.onOverlayClick },
      _reactAddons2['default'].createElement(
        'div',
        { className: 'ModalOverlay__content', onClick: this.onContentClick },
        this.props.children
      )
    );
  },

  // render is a noop, modal is rendered through renderLayer.
  render: function render() {
    return null;
  }

});

exports['default'] = Modal;
module.exports = exports['default'];
//# sourceMappingURL=modal.js.map