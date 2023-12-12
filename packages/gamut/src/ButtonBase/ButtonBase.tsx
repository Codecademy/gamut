import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { forwardRef, HTMLProps, MutableRefObject } from 'react';

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

export type ButtonBasicProps = JSX.IntrinsicElements['button'] & {
  href?: undefined;
};

type AnchorProps = JSX.IntrinsicElements['a'] & {
  href: string;
  disabled?: boolean;
};

export type PolymorphicProps = ButtonBasicProps | AnchorProps;

const isAnchorElement = (props: PolymorphicProps): props is AnchorProps => {
  return props.href !== undefined;
};

export const ButtonBase = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  PolymorphicProps
>((props, ref) => {
  if (isAnchorElement(props)) {
    const { href, children, role, ...rest } = props;

    return (
      <ResetElementAnchor
        ref={ref as MutableRefObject<HTMLAnchorElement>}
        as="a"
        href={href}
        role={role}
        {...rest}
      >
        {children}
      </ResetElementAnchor>
    );
  }
  const { type, children, disabled, role, ...rest } = props;

  return (
    <ResetElement
      ref={ref as MutableRefObject<HTMLButtonElement>}
      as="button"
      type={type}
      role={role ?? 'button'}
      disabled={!!disabled}
      {...rest}
    >
      {children}
    </ResetElement>
  );
});
