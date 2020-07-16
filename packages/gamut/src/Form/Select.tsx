import React, { ReactNode, SelectHTMLAttributes } from 'react';
import { isArray, isObject, each } from 'lodash';
import cx from 'classnames';
import s from './styles/Select.module.scss';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
  htmlFor?: string;
  options?: string[] | Record<string, number | string>;
  id?: string;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const className = cx(s.Select, props.className, props.error && s.error);
    const { options, error, id, required, ...rest } = props;

    let selectOptions: ReactNode[] = [];

    if (isArray(options)) {
      selectOptions = options.map((option) => (
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
          <path
            d="M1.175 0L5 3.825 8.825 0 10 1.183l-5 5-5-5z"
            fill="#3E3E40"
          />
        </svg>
        <select
          {...rest}
          className={s.selectInput}
          defaultValue={props.defaultValue || ''}
          id={id || props.htmlFor}
          ref={ref}
          aria-required={required}
        >
          {selectOptions}
        </select>
      </div>
    );
  }
);

export default Select;
