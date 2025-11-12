import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { ComponentProps, forwardRef, MouseEvent } from 'react';
import * as React from 'react';

const resetStyles = css({
  appearance: 'none',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'block',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  margin: 0,
  padding: 0,
  textAlign: 'inherit',
  textDecoration: 'none',
  width: '100%',
  color: 'inherit',
  '&:focus': {
    outline: 'none',
  },
});

const ResetDiv = styled('div', styledOptions<'div'>())(resetStyles);
const ResetButton = styled('button', styledOptions<'button'>())(resetStyles);
const ResetAnchor = styled('a', styledOptions<'a'>())(resetStyles);

type DivProps = ComponentProps<typeof ResetDiv>;
type ButtonProps = ComponentProps<typeof ResetButton>;
type AnchorProps = ComponentProps<typeof ResetAnchor>;

type RowBaseProps =
  | (DivProps & { href?: never; onClick?: never })
  | (ButtonProps & { href?: never })
  | AnchorProps;

export const RowBase = forwardRef<
  HTMLDivElement | HTMLButtonElement | HTMLAnchorElement,
  RowBaseProps
>((props, ref) => {
  const { onClick, ...rest } = props;

  // Render as anchor if href is provided
  if ('href' in rest && rest.href !== undefined) {
    return (
      <ResetAnchor
        {...rest}
        ref={ref as React.MutableRefObject<HTMLAnchorElement>}
      />
    );
  }

  // Render as button if onClick is provided (without href)
  if (onClick) {
    return (
      <ResetButton
        {...rest}
        ref={ref as React.MutableRefObject<HTMLButtonElement>}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onClick(e as unknown as MouseEvent<HTMLButtonElement>);
          }
        }}
        type="button"
      />
    );
  }

  // Otherwise render as div
  return (
    <ResetDiv {...rest} ref={ref as React.MutableRefObject<HTMLDivElement>} />
  );
});

RowBase.displayName = 'RowBase';

