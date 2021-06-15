import { styledOptions, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { forwardRef, HTMLProps, MutableRefObject } from 'react';

export type ButtonBaseElements = HTMLAnchorElement | HTMLButtonElement;
export type ButtonBaseRef =
  | ((instance: ButtonBaseElements | null) => void)
  | MutableRefObject<ButtonBaseElements | null>
  | null;

export type ButtonBaseElementProps = HTMLProps<
  HTMLAnchorElement | HTMLButtonElement
> & {
  as?: never;
  ref?: ButtonBaseRef;
};

export enum ButtonSelectors {
  HOVER = '&:hover, &:focus',
  ACTIVE = '&:active',
  DISABLED = "&:disabled, &[aria-disabled='true']",
  FOCUS = ' &:focus-visible',
  OUTLINE = '&:before',
  OUTLINE_FOCUS = '&:focus-visible:before',
}

const ResetElement = styled(
  'button',
  styledOptions<'button'>()
)(
  system.css({
    background: 'none',
    boxShadow: 'none',
    border: 'none',
    p: 0,
    fontSize: 'inherit',
    cursor: 'pointer',
    textDecoration: 'none',
    [ButtonSelectors.HOVER]: {
      textDecoration: 'none',
      outline: 'none',
    },
  })
);

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
