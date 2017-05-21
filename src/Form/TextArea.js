import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import s from './styles/index.scss'

class TextArea extends PureComponent {
  render() {
    const className = cx(s.TextArea, this.props.className);
    return (
      <textarea
        {...this.props}
        id={this.props.htmlFor}
        name={this.props.name}
        required={this.props.required}
        className={className}
      />
    )
  }
}

TextArea.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  name: PropTypes.string,
  required: PropTypes.bool
}

export default TextArea
