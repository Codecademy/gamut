import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import s from './styles/index.scss'

class Input extends PureComponent {
  render() {
    const className = cx(s.Input, this.props.className)
    return (
      <input
        {...this.props}
        id={this.props.htmlFor}
        name={this.props.name}
        placeholder={this.props.placeholder}
        required={this.props.required}
        type={this.props.type}
        className={className}
      />
    )
  }
}

Input.defaultProps = {
  type: 'text'
}

Input.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string
}

export default Input
