import React, { ReactNode, HTMLAttributes } from 'react';
import s from './styles/Checkbox.module.scss';

export type CheckboxProps = HTMLAttributes<HTMLInputElement> & {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  htmlFor: string;
  label: ReactNode;
  name?: string;
  onChange?: () => void;
  required?: boolean;
  value?: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  label,
  htmlFor,
  ...inputProps
}) => (
  <div className={className}>
    <input
      id={htmlFor}
      type="checkbox"
      className={s.invisible}
      {...inputProps}
    />
    <label className={s.checkboxLabel} htmlFor={htmlFor}>
      <div className={s.checkbox}>
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
      <span>{label}</span>
    </label>
  </div>
);

export default Checkbox;
