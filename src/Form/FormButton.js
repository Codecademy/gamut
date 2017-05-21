import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from '../Button';
import s from './styles/index.scss';

class FormButton extends PureComponent {
  render() {
    const className = cx(s.FormButton, this.props.className);
    return (
      <Button
        {...this.props}
        type={this.props.type}
        value={this.props.value}
        theme={this.props.theme}
        className={className}
      />
    );
  }
}

FormButton.defaultProps = {
  type: 'submit',
  theme: 'blue'
};

FormButton.propTypes = {
  type: PropTypes.string,
  value: PropTypes.any,
  theme: PropTypes.string,
  className: PropTypes.string
};

export default FormButton;
