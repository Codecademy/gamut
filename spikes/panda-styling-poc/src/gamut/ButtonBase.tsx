import {
  type ComponentPropsWithoutRef,
  type MutableRefObject,
  type ReactNode,
  forwardRef,
} from 'react';

/* Analog of gamut ButtonBase: polymorphic button/anchor. Renders an <a> when
 * `href` is set (and not disabled), otherwise a <button> (a disabled anchor
 * becomes a real disabled button). Accepts `className` so Panda's `styled`
 * factory can attach recipe classes. */
export type ButtonBaseElements = HTMLAnchorElement | HTMLButtonElement;

type AnchorProps = ComponentPropsWithoutRef<'a'>;
type ButtonProps = ComponentPropsWithoutRef<'button'>;
export type ButtonBaseProps = {
  href?: string;
  disabled?: boolean;
  children?: ReactNode;
} & Omit<AnchorProps & ButtonProps, 'ref'>;

export const ButtonBase = forwardRef<ButtonBaseElements, ButtonBaseProps>(
  ({ href, disabled, children, role, type = 'button', ...rest }, ref) => {
    if (href === undefined || disabled) {
      const { href: _omit, ...buttonProps } = rest as AnchorProps & ButtonProps;
      return (
        <button
          {...(buttonProps as ButtonProps)}
          disabled={!!disabled}
          ref={ref as MutableRefObject<HTMLButtonElement>}
          role={role}
          type={type as ButtonProps['type']}
        >
          {children}
        </button>
      );
    }
    return (
      <a
        {...(rest as AnchorProps)}
        href={href}
        ref={ref as MutableRefObject<HTMLAnchorElement>}
        role={role}
      >
        {children}
      </a>
    );
  }
);
