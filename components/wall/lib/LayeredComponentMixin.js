// taken from https://github.com/Khan/react-components/blob/master/js/layered-component-mixin.jsx

/* Create a new "layer" on the page, like a modal or overlay.
 *
 * var LayeredComponent = React.createClass({
 *     mixins: [LayeredComponentMixin],
 *     render: function() {
 *         // render like usual
 *     },
 *     renderLayer: function() {
 *         // render a separate layer (the modal or overlay)
 *     }
 * });
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var LayeredComponentMixin = {
  componentDidMount: function componentDidMount() {
    // Appending to the body is easier than managing the z-index of
    // everything on the page.  It's also better for accessibility and
    // makes stacking a snap (since components will stack in mount order).
    this._layer = document.createElement('div');
    document.body.appendChild(this._layer);
    this._renderLayer();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._renderLayer();
  },

  componentWillUnmount: function componentWillUnmount() {
    this._unrenderLayer();
    document.body.removeChild(this._layer);
  },

  _renderLayer: function _renderLayer() {
    // By calling this method in componentDidMount() and
    // componentDidUpdate(), you're effectively creating a "wormhole" that
    // funnels React's hierarchical updates through to a DOM node on an
    // entirely different part of the page.

    var layerElement = this.renderLayer();
    // Renders can return null, but React.render() doesn't like being asked
    // to render null. If we get null back from renderLayer(), just render
    // a noscript element, like React does when an element's render returns
    // null.
    if (layerElement === null) {
      _reactAddons2['default'].render(_reactAddons2['default'].createElement('noscript', null), this._layer);
    } else {
      _reactAddons2['default'].render(layerElement, this._layer);
    }

    if (this.layerDidMount) {
      this.layerDidMount(this._layer);
    }
  },

  _unrenderLayer: function _unrenderLayer() {
    if (this.layerWillUnmount) {
      this.layerWillUnmount(this._layer);
    }

    _reactAddons2['default'].unmountComponentAtNode(this._layer);
  }
};

exports['default'] = LayeredComponentMixin;
module.exports = exports['default'];
//# sourceMappingURL=LayeredComponentMixin.js.map