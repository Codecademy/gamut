import { system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { forwardRef, HTMLProps, MutableRefObject } from 'react';

export type ButtonBaseElements = HTMLAnchorElement | HTMLButtonElement;

export type ButtonBaseElementProps = HTMLProps<
  HTMLAnchorElement | HTMLButtonElement
> & {
  as?: never;
  ref?:
    | ((instance: ButtonBaseElements | null) => void)
    | MutableRefObject<ButtonBaseElements | null>
    | null;
};

export type SafeButtonProps<T> = T & Omit<ButtonBaseElementProps, keyof T>;

export type ButtonBaseProps<T> = React.ForwardRefExoticComponent<
  SafeButtonProps<T> & React.RefAttributes<ButtonBaseElements>
>;

const reset = system.css({
  background: 'none',
  boxShadow: 'none',
  border: 'none',
  p: 0,
  fontSize: 'inherit',
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none',
  },
});

const ResetElement = styled.button(reset);

export const ButtonBase = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  any
>(
  (
    { href, disabled, children, as, role = 'button', type = 'button', ...rest },
    ref
  ) => {
    if (href == null) {
      return (
        <ResetElement
          {...rest}
          ref={ref as MutableRefObject<HTMLButtonElement>}
          as="button"
          type={type}
          role={role}
          disabled={disabled}
        >
          {children}
        </ResetElement>
      );
    }

    return (
      <ResetElement
        {...rest}
        ref={ref as MutableRefObject<HTMLAnchorElement>}
        as="a"
        href={href}
        disabled={disabled}
        aria-disabled={disabled}
      >
        {children}
      </ResetElement>
    );
  }
);
