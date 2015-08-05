import _ from 'lodash';
import React from 'react/addons';
import Modal from './modal';

import cx from 'classnames';

const ESCAPE_KEY = 27;

// Reusable class for 'walls' in the LE.
var Wall = React.createClass({
  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.element),
      React.PropTypes.element
    ]),
    type: React.PropTypes.string,
    dismiss: React.PropTypes.func,
    responseRequired: React.PropTypes.bool,
    padding: React.PropTypes.bool,
    width: React.PropTypes.string,
    height: React.PropTypes.string,
  },

  componentDidMount: function() {
    window.addEventListener('keydown', this.onEscape);
  },

  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.onEscape);
  },

  onEscape: function (e) {
    if (e.keyCode === ESCAPE_KEY) {
      this.closeIfNotRequired();
    }
  },

  closeIfNotRequired() {
    if (!this.props.responseRequired && _.isFunction(this.props.dismiss)) {
      this.props.dismiss();
    }
  },

  render() {

    let wallClasses = cx({
      'fcn-wall': true,
      [`fcn-wall--${this.props.type}`]: this.props.type,
      'fcn-wall--no-padding': this.props.padding === false
    });

    let wallStyles = {};
    if (this.props.width) wallStyles.width = this.props.width;
    if (this.props.height) wallStyles.height = this.props.height;

    return (
      <Modal onOutsideClick={this.closeIfNotRequired}>
        <div className={wallClasses} style={wallStyles}>
         {this.props.children}
        </div>
      </Modal>
    );
  }
});

export default Wall;
