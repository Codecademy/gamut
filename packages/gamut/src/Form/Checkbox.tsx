import React, { ReactNode, InputHTMLAttributes } from 'react';
import styles from './styles/Checkbox.module.scss';
import cx from 'classnames';

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  htmlFor: string;
  label: ReactNode;
  multiline?: boolean;
  name?: string;
  required?: boolean;
  value?: string;
  id?: string;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, htmlFor, multiline, id, ...rest }, ref) => (
    <div className={className}>
      <input
        id={id || htmlFor}
        type="checkbox"
        className={styles.invisible}
        {...rest}
        ref={ref}
      />
      <label className={styles.checkboxLabel} htmlFor={id || htmlFor}>
        <div
          className={cx(styles.checkbox, multiline && styles.checkboxMultiline)}
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 20 20"
            className={styles.checkboxVector}
          >
            <path
              d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"
              className={styles.squareVector}
              fill="none"
            />
            <polyline points="4 11 8 15 16 6" className={styles.checkVector} />
          </svg>
        </div>
        <span
          className={cx(
            styles.checkboxText,
            multiline && styles.checkboxTextMultiline
          )}
        >
          {label}
        </span>
      </label>
    </div>
  )
);
