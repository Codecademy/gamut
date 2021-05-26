import { MiniInfoOutlineIcon } from '@codecademy/gamut-icons';
import cx from 'classnames';
import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import { Box, ToolTip, ToolTipProps } from '..';
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
  tooltip?: ToolTipProps;
  value?: string;
  readOnly?: boolean;
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
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
      tooltip,
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
          {tooltip && (
            <Box pl={8}>
              <ToolTip
                alignment="bottom-right"
                target={<MiniInfoOutlineIcon size="0.8rem" />}
                {...tooltip}
              />
            </Box>
          )}
        </label>
      </div>
    );
  }
);
