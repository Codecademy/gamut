import styled from '@emotion/styled';
import React, { forwardRef, HTMLProps, MutableRefObject } from 'react';

export type ButtonBaseElements = HTMLAnchorElement | HTMLButtonElement;

export type ButtonBaseElementProps = HTMLProps<
  HTMLAnchorElement | HTMLButtonElement
> & { as?: never };

export type SafeButtonProps<T> = T & Omit<ButtonBaseElementProps, keyof T>;

export type ButtonBaseProps<T> = React.ForwardRefExoticComponent<
  SafeButtonProps<T> & React.RefAttributes<ButtonBaseElements>
>;

const ButtonReset = styled.button`
  background: none;
  box-shadow: none;
  border: none;
  padding: 0;
  font-size: inherit;
`;

export const ButtonBase = forwardRef<ButtonBaseElements, any>(
  ({ href, disabled, children, as, role = 'button', ...rest }, ref) => {
    if (href == null) {
      return (
        <ButtonReset
          {...rest}
          disabled={disabled}
          ref={ref as MutableRefObject<HTMLButtonElement>}
          type="button"
          role={role}
        >
          {children}
        </ButtonReset>
      );
    }

    return (
      <a
        {...rest}
        href={href}
        ref={ref as MutableRefObject<HTMLAnchorElement>}
        disabled={disabled}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }
);
