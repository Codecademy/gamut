import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import type {
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import { ComponentProps, forwardRef, HTMLProps, Ref } from 'react';

export type ButtonBaseElements = HTMLAnchorElement | HTMLButtonElement;
export type ButtonBaseRef = Ref<ButtonBaseElements | null>;

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

/** Props for ButtonBase. Use this type when wrapping or composing ButtonBase. */
export type ButtonBaseProps = ComponentPropsWithoutRef<'button'> &
  Partial<ComponentPropsWithoutRef<'a'>> & { as?: never };

type ButtonBasePropsInternal =
  | ComponentProps<typeof ResetElement>
  | (Exclude<ComponentProps<typeof ResetElement>, 'ref'> &
      ComponentProps<typeof ResetElementAnchor>);

/**
 * Narrows a ref union (anchor | button) to the element type for the current render branch.
 * Use when forwarding refs from components that render either an anchor or a button (e.g. ButtonBase, Anchor).
 */
export function narrowButtonBaseRef<T extends ButtonBaseElements>(
  ref: Ref<ButtonBaseElements | null>
): Ref<T> {
  return ref as Ref<T>;
}

const ButtonBaseComponent = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonBasePropsInternal
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
        ref={narrowButtonBaseRef<HTMLButtonElement>(ref)}
        role={role}
        type={type}
      >
        {children}
      </ResetElement>
    );
  }

  return (
    <ResetElementAnchor
      {...rest}
      as="a"
      href={rest?.href}
      ref={narrowButtonBaseRef<HTMLAnchorElement>(ref)}
      role={role}
    >
      {children}
    </ResetElementAnchor>
  );
});

export const ButtonBase =
  ButtonBaseComponent as unknown as ForwardRefExoticComponent<
    ButtonBaseProps & RefAttributes<HTMLButtonElement | HTMLAnchorElement>
  >;
