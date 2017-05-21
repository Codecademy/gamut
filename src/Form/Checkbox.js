import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/index.scss';

class Checkbox extends PureComponent {
  render() {
    const tag = this.props.tag;
    const className = cx(s.Checkbox, this.props.className, {
      [s.tags]: tag
    });
    return (
      <fieldset className={className}>
        <input
          {...this.props}
          id={this.props.htmlFor}
          name={this.props.name}
          required={this.props.required}
          type="checkbox"
          className={s.checkboxInput}
        />
        <label
          htmlFor={this.props.htmlFor}
          label={this.props.label}
          className={s.checkboxLabel}
        >
          <span className={s.checkboxSpan}>
            {this.props.label}
          </span>
        </label>
      </fieldset>
    );
  }
}

Checkbox.defaultProps = {
  required: false
};

Checkbox.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  name: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
  tag: PropTypes.bool
};

export default Checkbox;
