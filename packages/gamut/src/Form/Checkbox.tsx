import React, { ReactNode, InputHTMLAttributes } from 'react';
import s from './styles/Checkbox.module.scss';
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
  showLabel?: boolean;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, htmlFor, multiline, id, showLabel, ...rest }, ref) => {
    return (
      <div className={className}>
        <input
          id={id || htmlFor}
          type="checkbox"
          className={s.invisible}
          {...rest}
          ref={ref}
        />
        <label
          className={cx(s.checkboxLabel, !showLabel && s.noLabelText)}
          htmlFor={id || htmlFor}
        >
          <div className={cx(s.checkbox, multiline && s.checkboxMultiline)}>
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 20 20"
              className={s.checkboxVector}
            >
              <path
                d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"
                className={s.squareVector}
                fill="none"
              />
              <polyline points="4 11 8 15 16 6" className={s.checkVector} />
            </svg>
          </div>
          <span
            className={cx(s.checkboxText, multiline && s.checkboxTextMultiline)}
          >
            {label}
          </span>
        </label>
      </div>
    );
  }
);

export default Checkbox;
