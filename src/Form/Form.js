import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/index.scss';

class Form extends PureComponent {
  render() {
    const className = cx(s.Form, this.props.className);

    return (
      <form {...this.props} className={className} />
    );
  }
}

Form.propTypes = {
  className: PropTypes.string
};

export default Form;
