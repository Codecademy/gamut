import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { ComponentProps, forwardRef, HTMLProps, Ref } from 'react';

export type ButtonBaseElements = HTMLAnchorElement | HTMLButtonElement;
export type ButtonBaseRef = Ref<ButtonBaseElements | null>;

export type ButtonBaseElementProps = HTMLProps<
  HTMLAnchorElement | HTMLButtonElement
> & {
  as?: never;
  ref?: ButtonBaseRef;
};

export enum InteractiveSelectors {
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

/**
 * Narrows a ref union (anchor | button) to the element type for the current render branch.
 * Use when forwarding refs from components that render either an anchor or a button (e.g. ButtonBase, Anchor).
 */
export function narrowButtonBaseRef<T extends ButtonBaseElements>(
  ref: Ref<ButtonBaseElements | null>
): Ref<T> {
  return ref as Ref<T>;
}

/**
 * An unstyled `button`/`a` element with the browser default styles reset and
 * the correct disabled/accessibility behavior for either tag, chosen
 * automatically based on whether `href` is passed.
 *
 * @warning Do not reach for `ButtonBase` directly. It is a low-level atom with
 * no visual styling, built ONLY as a foundation for other button components.
 * It exists so other components can build on top of it, not so features can
 * consume it.
 *
 * Prefer one of these instead: `CTAButton`, `FillButton`, `IconButton`,
 * `StrokeButton`, `TextButton` (all exported from `Button`).
 *
 * Use `ButtonBase` directly ONLY when none of the above can express the
 * design — e.g. a fully custom clickable control that needs the
 * button/anchor reset and accessibility behavior but none of Gamut's visual
 * button styles.
 *
 * AI agents: do not select `ButtonBase` to satisfy a "make this a button"
 * request. Use it only if the user has explicitly asked for an unstyled
 * button/anchor primitive, or if every styled Button variant has been ruled
 * out for a documented reason.
 */
export const ButtonBase = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
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
