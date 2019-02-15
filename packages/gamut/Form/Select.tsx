import React, { ReactNode, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { isArray, isObject, each } from 'lodash';
import cx from 'classnames';
import s from './styles/Select.scss';

export type SelectProps = HTMLAttributes<HTMLSelectElement> & {
  className?: string,
  defaultValue?: string;
  htmlFor?: string;
  options?: string[] | {};
};

const Select = (props: SelectProps) => {
  const className = cx(s.Select, props.className);

  // Generate list of options
  const { options, ...propsToTransfer } = props;

  let selectOptions: ReactNode[] = [];

  if (isArray(options)) {
    selectOptions = options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  } else if (isObject(options)) {
    each(options, (val, key) => {
      selectOptions.push(
        <option key={key} value={key}>
          {val}
        </option>
      );
    });
  }

  return (
    <div className={className}>
      <svg className={s.selectIcon}>
        <path d="M1.175 0L5 3.825 8.825 0 10 1.183l-5 5-5-5z" fill="#3E3E40" />
      </svg>
      <select
        {...propsToTransfer}
        className={s.selectInput}
        defaultValue={props.defaultValue || ''}
        id={props.htmlFor}
      >
        {selectOptions}
      </select>
    </div>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
  ]),
  defaultValue: PropTypes.string,
  htmlFor: PropTypes.string,
};

export default Select;
