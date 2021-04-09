import { styledConfig, system } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { forwardRef, HTMLProps, MutableRefObject } from 'react';

export type AnchorStyleProps = Parameters<typeof anchorProps>[0];
export type LinkElements = HTMLAnchorElement | HTMLButtonElement;
export interface AnchorProps extends AnchorStyleProps {
  href?: string;
  as?: never;
  mode?: 'light' | 'dark';
  variant?: 'standard' | 'inline' | 'interface';
}
export interface ForwardedProps
  extends Omit<HTMLProps<LinkElements>, keyof AnchorProps>,
    AnchorProps {}

const anchorVariants = system.variant({
  base: {
    display: 'inline-block',
    bg: 'transparent',
    boxShadow: 'none',
    border: 'none',
    p: 0,
    fontSize: 'inherit',
    position: 'relative',
    textColor: 'primary',
    whiteSpace: 'nowrap',
    '&:after': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: -4,
      width: `calc(100% + 0.5rem)`,
      height: '100%',
      borderRadius: '4px',
      border: '2px solid',
      borderColor: 'primary',
      opacity: 0,
    },
    '&:hover, &:focus': {
      textDecoration: 'none',
      cursor: 'pointer',
    },
    '&:disabled, &[disabled]': {
      cursor: 'not-allowed',
      textDecoration: 'none',
      color: 'gray-700',
    },
    '&:focus, &:focus-visible': {
      outline: 'none',
    },
    '&:focus-visible:after': {
      opacity: 1,
    },
  },
  variants: {
    standard: {
      textColor: 'primary',
      '&:hover': {
        textDecoration: 'underline',
      },
      '&:focus-visible': {
        textColor: 'text',
        textDecoration: 'none',
      },
    },
    inline: {
      textDecoration: 'underline',
    },
    interface: {
      textColor: 'text',
      whiteSpace: 'initial',
      '&:after': {},
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
});

const anchorProps = variance.compose(
  system.layout,
  system.typography,
  system.space
);

const AnchorElement = forwardRef<LinkElements, ForwardedProps>(
  ({ href, disabled, children, as, ...rest }, ref) => {
    if (href == null) {
      return (
        <button
          {...rest}
          ref={ref as MutableRefObject<HTMLButtonElement>}
          type="button"
          aria-disabled={disabled}
        >
          {children}
        </button>
      );
    }

    return (
      <a {...rest} href={href} ref={ref as MutableRefObject<HTMLAnchorElement>}>
        {children}
      </a>
    );
  }
);

export const AnchorBase = styled('a', styledConfig)<AnchorProps>(
  anchorVariants,
  anchorProps
);

export const Anchor = AnchorBase.withComponent(AnchorElement);

Anchor.defaultProps = {
  variant: 'inline',
};
