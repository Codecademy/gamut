import React, { ReactNode, InputHTMLAttributes } from 'react';
import cx from 'classnames';
import styles from './styles/Radio.module.scss';

export type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  checked?: boolean;
  disabled?: boolean;
  htmlFor?: string;
  id?: string;
  label?: ReactNode;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  tabIndex?: number;
  value?: string;
  readOnly?: boolean;
};

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      name,
      value,
      label,
      checked,
      className,
      disabled,
      htmlFor,
      onChange,
      required,
      id,
      ...rest
    },
    ref
  ) => {
    const classNames = cx(styles.Radio, className);

    const inputId = id ? `${htmlFor}-${id}` : htmlFor;

    return (
      <div className={classNames}>
        <input
          className={styles.radioInput}
          id={inputId}
          name={name}
          required={required}
          type="radio"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          ref={ref}
          value={value}
          {...rest}
        />
        <label htmlFor={htmlFor} className={styles.radioLabel}>
          {label}
        </label>
      </div>
    );
  }
);
