import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isArray, isObject, each } from 'lodash';
import cx from 'classnames';
// import { Icon } from '../Icon';
import s from './styles/index.scss';

class Select extends PureComponent {
  render() {
    const className = cx(s.Select, this.props.className);

    // Generate list of options
    const { options, ...propsToTransfer } = this.props;

    let selectOptions = [];

    if (isArray(options)) {
      selectOptions = options.map((option) => {
        return (
          <option key={option} value={option}>{option}</option>
        );
      });
    } else if (isObject(options)) {
      each(options, (val, key) => {
        selectOptions.push(<option key={key} value={key}>{val}</option>);
      });
    }

    return (
      <fieldset className={className}>
        <svg className={s.selectIcon}>
          <path d="M1.175 0L5 3.825 8.825 0 10 1.183l-5 5-5-5z" fill="#3E3E40" />
        </svg>
        <select
          {...propsToTransfer}
          className={s.selectInput}
          defaultValue={this.props.defaultValue || ''}
          id={this.props.htmlFor}
        >
          {selectOptions}
        </select>
      </fieldset>
    );
  }
}

Select.propTypes = {
  className: PropTypes.string,
  options: PropTypes.oneOf([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object
  ]),
  defaultValue: PropTypes.string,
  htmlFor: PropTypes.string.isRequired
};

export default Select;
