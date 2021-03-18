import { MiniInfoOutlineIcon } from '@codecademy/gamut-icons';
import { theme, variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { HTMLAttributes, ReactNode } from 'react';

import { ToolTip, ToolTipProps } from '..';
import { ToolTipPosition } from '../ToolTip';
import { formBaseStyles } from './styles/shared';

type StyledToolTipProps = {
  zIndex: number;
};

const StyledToolTip = styled.span<StyledToolTipProps>`
  position: absolute;
  left: calc(100% - 1.1rem);

  div {
    > *:last-child {
      z-index: ${({ zIndex }) => zIndex};
      left: calc(100% - 1.7rem);
    }
    &::after,
    &::before {
      z-index: ${({ zIndex }) => zIndex};
    }
  }
`;

export type FormGroupLabelProps = HTMLAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLLabelElement> & {
    disabled?: boolean;
    htmlFor?: string;
    tooltip?: ToolTipProps;
    children: ReactNode;
    showRequired?: boolean;
    size?: 'small' | 'large';
  };

type disabledLabelStyleProps = {
  disabled?: boolean;
};

const labelSizeVariants = variant({
  default: 'small',
  prop: 'size',
  variants: {
    small: {
      lineHeight: 'title',
      marginBottom: 4,
    },
    large: {
      fontSize: 22,
      lineHeight: 'base',
      fontWeight: 'title',
    },
  },
});

const disabledLabelStyle = ({ disabled }: disabledLabelStyleProps) => {
  if (disabled) {
    return css`
      color: ${theme.colors[`gray-400`]};
    `;
  }
};

const formLabelStyles = ({ size, disabled }: FormGroupLabelProps) => css`
  ${formBaseStyles}
  ${disabledLabelStyle({ disabled })}
  ${labelSizeVariants({ size })}
  display: block;
`;

const Label = styled
  .label(formLabelStyles)
  .withComponent((props: FormGroupLabelProps) => {
    if (props.htmlFor) {
      return <label {...props} />;
    }
    return <div {...props} />;
  });

export const FormGroupLabel: React.FC<FormGroupLabelProps> = ({
  children,
  className,
  disabled,
  htmlFor,
  tooltip,
  showRequired,
  size,
  ...rest
}) => {
  return (
    <Label
      {...rest}
      htmlFor={htmlFor}
      disabled={disabled}
      className={className}
      size={size}
    >
      {children}
      {showRequired ? ' *' : ''}
      {tooltip && (
        <StyledToolTip zIndex={1}>
          <ToolTip
            {...tooltip}
            id={`${htmlFor}-tooltip`}
            position={ToolTipPosition.BottomRight}
            target={<MiniInfoOutlineIcon height="0.8rem" width="0.8rem" />}
          />
        </StyledToolTip>
      )}
    </Label>
  );
};
