import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import s from './styles/index.scss'

class Radio extends PureComponent {
  render() {
    const className = cx(s.Radio, this.props.className)
    return (
      <fieldset
        className={className}
      >
        <input
          className={s.radioInput}
          id={this.props.htmlFor}
          name={this.props.name}
          required={this.props.required}
          type="radio"
          label={this.props.label}
        />
        <label
          htmlFor={this.props.htmlFor}
          className={s.radioLabel}
        >
          <span
            className={s.radioSpan}
          >
            {this.props.label}
          </span>
        </label>
      </fieldset>
    )
  }
}

Radio.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  name: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string
}

export default Radio
