import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { ComponentProps, forwardRef, HTMLProps, MutableRefObject } from 'react';

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
  HOVER = '&:hover',
  ACTIVE = '&:active',
  FOCUS = '&:focus',
  DISABLED = "[disabled], &:disabled, &[aria-disabled='true']",
  FOCUS_VISIBLE = ' &:focus-visible',
  OUTLINE = '&:before',
  OUTLINE_FOCUS_VISIBLE = '&:focus-visible:before',
  SHADOW = '&:after',
  SHADOW_HOVER = '&:hover:after',
  SHADOW_ACTIVE = '&:active:after',
  SHADOW_DISABLED = "[disabled]:after, &:disabled:after, &[aria-disabled='true']:after",
}

export enum Selectors {
  BEFORE = '&::before',
  HOVER = '&:hover',
  FOCUS = '&:focus',
  DISABLED = '&[disabled], &:disabled',
  FOCUS_VISIBLE = '&:focus-visible',
}

export const resetStyles = css({
  background: 'none',
  boxShadow: 'none',
  border: 'none',
  textColor: 'text',
  p: 0,
  fontSize: 'inherit',
  cursor: 'pointer',
  textDecoration: 'none',
  [Selectors.HOVER]: {
    textDecoration: 'none',
  },
  [Selectors.FOCUS]: {
    outline: 'none',
  },
});

const ResetElement = styled('button', styledOptions<'button'>())(resetStyles);
const ResetElementAnchor = styled('a', styledOptions<'a'>())(resetStyles);

type ButtonBaseProps =
  | ComponentProps<typeof ResetElement>
  | (Exclude<ComponentProps<typeof ResetElement>, 'ref'> &
      ComponentProps<typeof ResetElementAnchor>);

export const ButtonBase = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonBaseProps
>(({ disabled, children, role, type = 'button', ...rest }, ref) => {
  if (!('href' in rest) || rest?.href === null || disabled) {
    return (
      <ResetElement
        {...rest}
        ref={ref as MutableRefObject<HTMLButtonElement>}
        as="button"
        type={type}
        role={role ?? 'button'}
        disabled={!!disabled}
      >
        {children}
      </ResetElement>
    );
  }

  return (
    <ResetElementAnchor
      {...rest}
      ref={ref as MutableRefObject<HTMLAnchorElement>}
      as="a"
      href={rest?.href}
      role={role}
    >
      {children}
    </ResetElementAnchor>
  );
});
