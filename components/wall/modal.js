
import _ from 'lodash';
import React from 'react/addons';
import layeredComponentMixin from './mixins/LayeredComponentMixin';

import cx from 'classnames';

const overlayTypes = [
  'transparent'
];

var Modal = React.createClass({
  mixins: [layeredComponentMixin],

  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.element),
      React.PropTypes.element
    ]),
    onOutsideClick: React.PropTypes.func,
    overlayType: React.PropTypes.oneOf(overlayTypes)
  },

  componentDidMount() {
    document.body.classList.add('modal-overlay-active');
  },

  componentWillUnmount() {
    document.body.classList.remove('modal-overlay-active');
  },

  getDefaultProps() {
    return {
      onOutsideClick: _.noop
    };
  },

  // stop clicks on the content from triggering onOverlayClick
  onContentClick(e) {
    e.stopPropagation();
  },

  onOverlayClick() {
    this.props.onOutsideClick();
  },

  renderLayer() {
    let overlayClasses = cx({
      'ModalOverlay': true,
      [`ModalOverlay--${this.props.overlayType}`]: (overlayTypes.indexOf(this.props.overlayType) !== -1)
    });

    return (
      <div className={overlayClasses} onClick={this.onOverlayClick}>
        <div className='ModalOverlay__content' onClick={this.onContentClick}>
          {this.props.children}
        </div>
      </div>
    );
  },

  // render is a noop, modal is rendered through renderLayer.
  render() {
    return null;
  }

});

export default Modal;
