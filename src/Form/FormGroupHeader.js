import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/index.scss';

class FormGroupHeader extends PureComponent {
  render() {
    const className = cx(s.FormGroupHeader, this.props.className);
    return (
      <div
        {...this.props}
        className={className}
      />
    );
  }
}

FormGroupHeader.propTypes = {
  className: PropTypes.string
};

export default FormGroupHeader;
