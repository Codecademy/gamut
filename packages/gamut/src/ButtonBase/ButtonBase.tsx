import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import {
  ComponentProps,
  forwardRef,
  ForwardRefExoticComponent,
  HTMLProps,
  MutableRefObject,
  RefAttributes,
  RefObject,
} from 'react';

export type ButtonBaseElements = HTMLAnchorElement | HTMLButtonElement;
export type ButtonBaseRef =
  | ((instance: ButtonBaseElements | null) => void)
  | MutableRefObject<ButtonBaseElements | null>
  | RefObject<ButtonBaseElements | null>
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

type ButtonBasePropsUnion =
  | ComponentProps<typeof ResetElement>
  | (Exclude<ComponentProps<typeof ResetElement>, 'ref'> &
      ComponentProps<typeof ResetElementAnchor>);

/** Ref override so RefObject<T | null> is accepted (React 19 / strict refs). */
export type ButtonBaseProps = Omit<ButtonBasePropsUnion, 'ref'> & {
  ref?: ButtonBaseRef;
};

export const ButtonBase = forwardRef<
  ButtonBaseElements | null,
  ButtonBaseProps
>(({ disabled, children, role, type = 'button', ...rest }, ref) => {
  if (!('href' in rest) || rest?.href === undefined || disabled) {
    // @ts-expect-error we need this to turn a disabled anchor into a button without passing on the href prop
    // eslint-disable-next-line
    const { href, ...filteredProps } = rest;

    return (
      <ResetElement
        {...filteredProps}
        as="button"
        disabled={!!disabled}
        ref={ref as MutableRefObject<HTMLButtonElement>}
        role={role}
        type={type}
      >
        {children}
      </ResetElement>
    );
  }

  return (
    <ResetElementAnchor
      {...(rest as ComponentProps<typeof ResetElementAnchor>)}
      as="a"
      href={typeof rest?.href === 'string' ? rest.href : undefined}
      ref={ref as MutableRefObject<HTMLAnchorElement>}
      role={typeof role === 'string' ? role : undefined}
    >
      {children}
    </ResetElementAnchor>
  );
}) as ForwardRefExoticComponent<
  Omit<ButtonBasePropsUnion, 'ref'> &
    RefAttributes<ButtonBaseElements | null>
>;
